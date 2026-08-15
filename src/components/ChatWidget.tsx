import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Car as CarIcon, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sendMessageToAgent } from '../lib/n8nClient';
import { dataStore } from '../lib/supabase';
import { Car } from '../types';

export interface WebChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  metadata?: {
    suggestedCars?: Car[];
    quickReplies?: string[];
    stage?: string;
    quality?: string;
  };
}

export const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<WebChatMessage[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: 'Olá! Sou o consultor automotivo do AutoGO. 🚗\n\nEstou pronto para analisar os dados de mercado e encontrar o veículo ideal para o seu perfil e orçamento.\n\nQual faixa de valor você planeja investir e qual será o foco de uso do carro?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      metadata: {
        quickReplies: [
          'Uso Pessoal até R$ 90 mil',
          'Uso Pessoal até R$ 160 mil',
          'Família / SUV até R$ 200 mil',
          'Quero um carro 100% Elétrico'
        ]
      }
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => `web-${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    setInputText('');

    const userMsg: WebChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setIsTyping(true);

    // Grava mensagem humana no chat_history do Supabase
    dataStore.saveChatMessage(sessionId, {
      type: 'human',
      content: text
    });

    try {
      const historyFormatted = newHistory.map(m => ({
        type: m.sender === 'user' ? 'human' as const : 'ai' as const,
        content: m.text
      }));

      const agentRes = await sendMessageToAgent(text, historyFormatted, sessionId);

      const agentMsg: WebChatMessage = {
        id: `msg-agent-${Date.now()}`,
        sender: 'agent',
        text: agentRes.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          suggestedCars: agentRes.suggestedCars,
          quickReplies: agentRes.quickReplies,
          stage: agentRes.stage,
          quality: agentRes.quality
        }
      };

      setMessages(prev => [...prev, agentMsg]);

      // Grava mensagem da IA no chat_history do Supabase
      dataStore.saveChatMessage(sessionId, {
        type: 'ai',
        content: `${agentRes.text}\n\n---\n\n[[STAGE:${agentRes.stage || 'interviewing'}|QUALITY:${agentRes.quality || 'warm'}]]`
      });
    } catch (err) {
      console.error('Erro no envio da mensagem:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'agent',
        text: 'Reiniciamos a conversa! Me conte: qual é o seu perfil de uso ou o modelo de carro que você gostaria de analisar?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        metadata: {
          quickReplies: [
            'Quero um SUV para viajar com a família',
            'Carro elétrico para rodar na cidade',
            'Sedã confortável até R$ 160 mil'
          ]
        }
      }
    ]);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-medium)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      height: '620px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Header do Chat */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <CarIcon size={18} strokeWidth={2.2} />
            </div>
            <div style={{
              position: 'absolute',
              bottom: -1,
              right: -1,
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: 'var(--status-success)',
              border: '2px solid #ffffff'
            }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                Consultor AutoGO
              </span>
              <span className="badge badge-success" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                Online
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Recomendações técnicas em tempo real
            </div>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          title="Reiniciar Conversa"
          style={{
            background: 'transparent',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            transition: 'all 0.2s'
          }}
          onMouseOver={e => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--border-medium)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.color = 'var(--text-muted)';
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
        >
          <RefreshCw size={12} />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Área de Mensagens */}
      <div style={{
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        backgroundColor: 'var(--bg-primary)'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '100%'
              }}
            >
              {/* Balão de Mensagem */}
              <div
                style={{
                  maxWidth: '85%',
                  backgroundColor: isUser ? '#0f172a' : '#ffffff',
                  color: isUser ? '#ffffff' : 'var(--text-primary)',
                  padding: '12px 16px',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize: '0.88rem',
                  lineHeight: '1.5',
                  boxShadow: 'var(--shadow-sm)',
                  border: isUser ? 'none' : '1px solid var(--border-subtle)',
                  whiteSpace: 'pre-line'
                }}
              >
                {msg.text}
              </div>

              {/* Timestamp */}
              <span style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                marginTop: '3px',
                padding: '0 4px'
              }}>
                {msg.timestamp}
              </span>

              {/* Cards de Carros Recomendados inline */}
              {msg.metadata?.suggestedCars && msg.metadata.suggestedCars.length > 0 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: '8px',
                  width: '100%',
                  maxWidth: '92%'
                }}>
                  {msg.metadata.suggestedCars.map((car: Car) => (
                    <div
                      key={car.id}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '12px',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="badge badge-neutral" style={{ fontSize: '0.68rem', fontWeight: 700 }}>
                            {car.body_type.toUpperCase()} • {car.year}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            • {car.fuel}
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', marginTop: '2px', color: 'var(--text-primary)' }}>
                          {car.brand} {car.model} {car.version ? `(${car.version})` : ''}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          R$ {car.price.toLocaleString('pt-BR')} {car.avg_consumption_city ? `• Consumo: ${car.avg_consumption_city} km/l` : ''}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          const text = encodeURIComponent(`Olá! Tenho interesse no ${car.brand} ${car.model} (${car.year}) anunciado no AutoGO.`);
                          window.open(`https://wa.me/5511987654321?text=${text}`, '_blank');
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                      >
                        Tenho Interesse
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Replies */}
              {msg.metadata?.quickReplies && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginTop: '8px'
                }}>
                  {msg.metadata.quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(reply)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Indicador de Digitação */}
        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <Sparkles size={13} color="#0f172a" />
            <span>Consultor AutoGO buscando no estoque...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input de Mensagem */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        style={{
          padding: '14px 16px',
          backgroundColor: '#ffffff',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center'
        }}
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ex: Procuro uma perua ou Volvo até R$ 90 mil..."
          className="input-control"
          style={{ flex: 1, fontSize: '0.88rem' }}
          disabled={isTyping}
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="btn btn-primary"
          style={{
            padding: '9px 14px',
            opacity: (!inputText.trim() || isTyping) ? 0.5 : 1,
            cursor: (!inputText.trim() || isTyping) ? 'not-allowed' : 'pointer'
          }}
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};
