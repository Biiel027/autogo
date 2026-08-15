import React, { useState, useEffect } from 'react';
import {
  Search,
  Send,
  Phone,
  User,
  Sparkles,
  MapPin,
  Flame,
  CheckCircle2,
  FileText,
  Clock
} from 'lucide-react';
import { dataStore, parseAIMessageContent } from '../../lib/supabase';
import { Lead, ChatHistoryRecord, LeadStage, LeadQuality } from '../../types';

export const Conversations: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryRecord[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [consultantNote, setConsultantNote] = useState('');
  const [manualMessage, setManualMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const [history, allLeads] = await Promise.all([
        dataStore.getChatHistory(),
        dataStore.getLeads()
      ]);
      setChatHistory(history);
      setLeads(allLeads);

      if (history.length > 0 && !selectedSessionId) {
        setSelectedSessionId(history[0].session_id);
      }
    };
    load();
  }, []);

  // Agrupa sessões únicas com a última mensagem e dados do lead associado
  const sessionList = Array.from(new Set(chatHistory.map(c => c.session_id))).map(sessionId => {
    const sessionMessages = chatHistory.filter(c => c.session_id === sessionId);
    const lastMsgRecord = sessionMessages[sessionMessages.length - 1];
    const lead = leads.find(l => l.phone === sessionId) || null;

    const parsedLast = parseAIMessageContent(lastMsgRecord?.message?.content || '');

    return {
      sessionId,
      lead,
      totalMessages: sessionMessages.length,
      lastMessage: parsedLast.cleanContent || lastMsgRecord?.message?.content || '',
      lastTimestamp: lastMsgRecord?.created_at || '',
      stage: lead?.stage || parsedLast.stage || 'interviewing',
      quality: lead?.lead_quality || parsedLast.quality || null
    };
  });

  const filteredSessions = sessionList.filter(s => {
    const name = s.lead?.name || s.sessionId;
    const city = s.lead?.city || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           s.sessionId.includes(searchTerm) ||
           city.toLowerCase().includes(searchTerm.toLowerCase()) ||
           s.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const activeSession = sessionList.find(s => s.sessionId === selectedSessionId) || sessionList[0];
  const activeMessages = chatHistory.filter(c => c.session_id === activeSession?.sessionId);
  const activeLead = activeSession?.lead;

  const handleSendManualMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualMessage.trim() || !activeSession) return;

    const content = `[Consultor Humano]: ${manualMessage}`;
    const newRecord = await dataStore.saveChatMessage(activeSession.sessionId, {
      type: 'ai',
      content
    });

    setChatHistory(prev => [...prev, newRecord]);
    setManualMessage('');
  };

  const handleUpdateNotes = async () => {
    if (!activeLead) return;
    await dataStore.updateConsultantNotes(activeLead.id, consultantNote);
    setLeads(prev => prev.map(l => l.id === activeLead.id ? { ...l, consultant_notes: consultantNote } : l));
    alert('Notas do consultor salvas no Supabase!');
  };

  const handleStageChange = async (newStage: LeadStage) => {
    if (!activeLead) return;
    await dataStore.updateLeadStage(activeLead.id, newStage);
    setLeads(prev => prev.map(l => l.id === activeLead.id ? { ...l, stage: newStage } : l));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'calc(100vh - 136px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Monitor de Conversas (WhatsApp / n8n)</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Histórico completo sincronizado com a tabela <code>public.chat_history</code> e vinculado a <code>public.leads</code>
          </p>
        </div>
      </div>

      {/* Split View Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        gap: '0px',
        flex: 1,
        minHeight: 0,
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        {/* Painel Esquerdo: Lista de Sessões */}
        <div style={{
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }}>
          {/* Busca */}
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar por telefone, nome ou mensagem..."
                className="input-control"
                style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
              />
              <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {/* Lista de Sessões */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredSessions.map((sess) => {
              const isSelected = activeSession?.sessionId === sess.sessionId;
              const leadName = sess.lead?.name || `WhatsApp ${sess.sessionId}`;

              return (
                <div
                  key={sess.sessionId}
                  onClick={() => {
                    setSelectedSessionId(sess.sessionId);
                    if (sess.lead?.consultant_notes) {
                      setConsultantNote(sess.lead.consultant_notes);
                    } else {
                      setConsultantNote('');
                    }
                  }}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #0f172a' : '3px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      {leadName}
                    </span>
                    <span className={`badge ${sess.quality === 'hot' ? 'badge-danger' : sess.quality === 'warm' ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '0.65rem' }}>
                      {sess.quality ? `${sess.quality.toUpperCase()}` : 'LEAD'}
                    </span>
                  </div>

                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '6px'
                  }}>
                    {sess.lastMessage}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <span>{sess.lead?.city ? `${sess.lead.city}` : sess.sessionId}</span>
                    <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                      {sess.stage}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Painel Direito: Transcrição e Perfil do Lead */}
        {activeSession ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            {/* Header da Sessão */}
            <div style={{
              padding: '14px 20px',
              backgroundColor: '#ffffff',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}>
                  {activeLead?.name ? activeLead.name.charAt(0).toUpperCase() : 'W'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {activeLead?.name || 'Cliente WhatsApp'}
                    </h3>
                    <span className={`badge ${activeLead?.lead_quality === 'hot' ? 'badge-danger' : activeLead?.lead_quality === 'warm' ? 'badge-warning' : 'badge-neutral'}`}>
                      {activeLead?.lead_quality ? `${activeLead.lead_quality.toUpperCase()} QUALITY` : 'NEW'}
                    </span>
                    <span className="badge badge-neutral">
                      Estágio: {activeLead?.stage || 'interviewing'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', marginTop: '2px' }}>
                    <span>Telefone: {activeSession.sessionId}</span>
                    {activeLead?.city && <span>Cidade: {activeLead.city}</span>}
                    {activeLead?.profile_data?.total_budget && (
                      <span>Orçamento: R$ {activeLead.profile_data.total_budget.toLocaleString('pt-BR')}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Ações Rápidas */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => window.open(`https://wa.me/${activeSession.sessionId.replace(/\D/g, '')}`, '_blank')}
                  className="btn btn-whatsapp btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Phone size={13} />
                  Chamar no WhatsApp
                </button>
              </div>
            </div>

            {/* Stream de Mensagens (LangChain format) */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              backgroundColor: 'var(--bg-primary)'
            }}>
              <div style={{ textAlign: 'center', margin: '4px 0' }}>
                <span className="badge badge-neutral" style={{ fontSize: '0.68rem' }}>
                  Sessão: {activeSession.sessionId} • {activeMessages.length} mensagens no banco
                </span>
              </div>

              {activeMessages.map((record) => {
                const isHuman = record.message.type === 'human';
                const parsed = parseAIMessageContent(record.message.content);

                return (
                  <div
                    key={record.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isHuman ? 'flex-start' : 'flex-end',
                      maxWidth: '100%'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      <span>{isHuman ? activeLead?.name || 'Cliente (WhatsApp)' : 'IA AutoGO (n8n Agent)'}</span>
                      <span>• {new Date(record.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      {parsed.stage && (
                        <span className="badge badge-neutral" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                          tag: {parsed.stage} {parsed.quality ? `(${parsed.quality})` : ''}
                        </span>
                      )}
                    </div>

                    <div style={{
                      maxWidth: '78%',
                      backgroundColor: isHuman ? '#ffffff' : '#0f172a',
                      color: isHuman ? 'var(--text-primary)' : '#ffffff',
                      border: isHuman ? '1px solid var(--border-subtle)' : 'none',
                      padding: '12px 16px',
                      borderRadius: isHuman ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                      fontSize: '0.86rem',
                      lineHeight: '1.55',
                      boxShadow: 'var(--shadow-sm)',
                      whiteSpace: 'pre-line'
                    }}>
                      {parsed.cleanContent}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Painel Inferior: Notas do Consultor & Envio */}
            <div style={{
              padding: '14px 18px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {/* Estágios rápidos */}
              {activeLead && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Mudar Estágio:</span>
                  {(['interviewing', 'profile_confirmed', 'recommendation_sent', 'handoff_requested', 'closed'] as LeadStage[]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleStageChange(st)}
                      className={`btn btn-sm ${activeLead.stage === st ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}

              {/* Form de Envio Manual */}
              <form
                onSubmit={handleSendManualMessage}
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
              >
                <input
                  type="text"
                  value={manualMessage}
                  onChange={e => setManualMessage(e.target.value)}
                  placeholder="Enviar mensagem ou instrução como consultor humano no chat_history..."
                  className="input-control"
                  style={{ flex: 1, fontSize: '0.86rem' }}
                />
                <button
                  type="submit"
                  disabled={!manualMessage.trim()}
                  className="btn btn-primary btn-sm"
                  style={{ padding: '9px 14px' }}
                >
                  <Send size={14} />
                  Gravar
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Nenhuma conversa selecionada.
          </div>
        )}
      </div>
    </div>
  );
};
