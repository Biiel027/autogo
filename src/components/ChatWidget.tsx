import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Car as CarIcon, RefreshCw, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { sendMessageToAgent } from '../lib/n8nClient';
import { dataStore } from '../lib/supabase';

export interface WebChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  metadata?: {
    quickReplies?: string[];
    stage?: string;
    quality?: string;
  };
}

const MAX_USER_MESSAGES = 12;
const MESSAGE_COOLDOWN_MS = 2000;
const MAX_INPUT_CHARS = 500;

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
  const [cooldownActive, setCooldownActive] = useState(false);
  const [sessionId, setSessionId] = useState(() => `web-${Date.now()}`);
  const lastSendTimeRef = useRef<number>(0);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const userMessagesCount = messages.filter(m => m.sender === 'user').length;
  const isLimitReached = userMessagesCount >= MAX_USER_MESSAGES;

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    if (isLimitReached) return;

    const text = (textToSend || inputText).trim().slice(0, MAX_INPUT_CHARS);
    if (!text || isTyping) return;

    // Trava de Cooldown Antispam (2 segundos)
    const now = Date.now();
    if (now - lastSendTimeRef.current < MESSAGE_COOLDOWN_MS) {
      setCooldownActive(true);
      setTimeout(() => setCooldownActive(false), 1500);
      return;
    }
    lastSendTimeRef.current = now;

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
    setSessionId(`web-${Date.now()}`);
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
      <div
        ref={messagesContainerRef}
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
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
            <span>Consultor AutoGO analisando as melhores opções do mercado...</span>
          </div>
        )}
      </div>

      {/* Input de Mensagem ou Handoff por Limite */}
      {isLimitReached ? (
        <div style={{
          padding: '16px 20px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
            🚀 <strong>Pré-diagnóstico web concluído!</strong> Para aprofundar seu dossiê automotivo personalizado e tirar dúvidas com nosso time especialista:
          </div>
          <div style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'center' }}>
            <a
              href="https://wa.me/5527988741555?text=Ol%C3%A1!%20Fiz%20o%20pr%C3%A9-diagn%C3%B3stico%20no%20site%20do%20AutoGO%20e%20gostaria%20de%20continuar%20a%20consultoria%20no%20WhatsApp."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{
                flex: 1,
                justifyContent: 'center',
                gap: '8px',
                padding: '10px 16px',
                fontSize: '0.85rem'
              }}
            >
              <MessageCircle size={16} />
              <span>Continuar no WhatsApp Grátis</span>
              <ArrowRight size={14} />
            </a>
            <button
              onClick={handleResetChat}
              className="btn btn-secondary"
              title="Reiniciar chat web"
              style={{ padding: '10px', borderRadius: 'var(--radius-md)' }}
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: '12px 16px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: Procuro uma perua ou Volvo até R$ 90 mil..."
              className="input-control"
              maxLength={MAX_INPUT_CHARS}
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
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <span>
              {cooldownActive ? (
                <span style={{ color: '#d97706', fontWeight: 600 }}>Aguarde 2s para a próxima mensagem...</span>
              ) : (
                <span>{userMessagesCount}/{MAX_USER_MESSAGES} mensagens na sessão web</span>
              )}
            </span>
            {inputText.length > 350 && (
              <span style={{ color: inputText.length >= MAX_INPUT_CHARS ? '#ef4444' : 'var(--text-muted)' }}>
                {inputText.length}/{MAX_INPUT_CHARS}
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
