import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Phone,
  MapPin,
  ChevronRight,
  X,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Flame,
  FileText,
  DollarSign,
  Car,
  Save
} from 'lucide-react';
import { dataStore } from '../../lib/supabase';
import { Lead, LeadStage, LeadQuality } from '../../types';
import { useNavigate } from 'react-router-dom';

export const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [qualityFilter, setQualityFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notesInput, setNotesInput] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await dataStore.getLeads();
      setLeads(data);
    };
    load();
  }, []);

  const filteredLeads = leads.filter(l => {
    const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
    const matchesQuality = qualityFilter === 'all' || l.lead_quality === qualityFilter;
    const name = l.name || '';
    const phone = l.phone || '';
    const city = l.city || l.profile_data?.city || '';
    const bodyPref = l.profile_data?.body_preference?.join(' ') || '';

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phone.includes(searchTerm) ||
                          city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          bodyPref.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStage && matchesQuality && matchesSearch;
  });

  const handleStageChange = async (leadId: string, newStage: LeadStage) => {
    await dataStore.updateLeadStage(leadId, newStage);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, stage: newStage } : null);
    }
  };

  const handleQualityChange = async (leadId: string, newQuality: LeadQuality) => {
    if (!selectedLead) return;
    await dataStore.updateLeadStage(leadId, selectedLead.stage, newQuality);
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, lead_quality: newQuality } : l));
    setSelectedLead(prev => prev ? { ...prev, lead_quality: newQuality } : null);
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await dataStore.updateConsultantNotes(selectedLead.id, notesInput);
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, consultant_notes: notesInput } : l));
    setSelectedLead(prev => prev ? { ...prev, consultant_notes: notesInput } : null);
    alert('Notas do consultor atualizadas no Supabase com sucesso!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Perfis de Compradores (leads)</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Base de dados qualificada com <code>profile_data</code>, <code>mapa_ranking</code>, CTM e CTP gerados pela IA
          </p>
        </div>

        <span className="badge badge-neutral" style={{ padding: '6px 14px', fontSize: '0.82rem', fontWeight: 600 }}>
          <Users size={14} /> Total: {leads.length} compradores mapeados
        </span>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, telefone, cidade ou preferência..."
            className="input-control"
            style={{ paddingLeft: '38px' }}
          />
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Filtro por Estágio */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estágio:</span>
          {['all', 'interviewing', 'profile_confirmed', 'recommendation_sent', 'handoff_requested', 'closed'].map(st => (
            <button
              key={st}
              onClick={() => setStageFilter(st)}
              className={`btn btn-sm ${stageFilter === st ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              {st === 'all' ? 'Todos' : st}
            </button>
          ))}
        </div>

        {/* Filtro por Qualidade */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Qualidade:</span>
          {['all', 'hot', 'warm', 'cold'].map(q => (
            <button
              key={q}
              onClick={() => setQualityFilter(q)}
              className={`btn btn-sm ${qualityFilter === q ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              {q === 'all' ? 'Todas' : q.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Leads */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', backgroundColor: '#ffffff' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Comprador / Telefone</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Cidade</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Orçamento Total</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Top 3 MAPA</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Troca (Trade-in)</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Qualidade</th>
                <th style={{ padding: '14px 20px', fontWeight: 600 }}>Estágio (Stage)</th>
                <th style={{ padding: '14px 20px', textAlign: 'right', fontWeight: 600 }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map(lead => {
                const budget = lead.profile_data?.total_budget;
                const mapa = lead.mapa_ranking || lead.profile_data?.mapa_top3 || [];
                const tradeIn = lead.profile_data?.trade_in_model;

                return (
                  <tr
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setNotesInput(lead.consultant_notes || '');
                    }}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{lead.name || 'Lead sem nome'}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <Phone size={11} /> {lead.phone}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} color="var(--text-muted)" />
                        <span>{lead.city || lead.profile_data?.city || 'N/A'}</span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                        {budget ? `R$ ${budget.toLocaleString('pt-BR')}` : 'Não informado'}
                      </div>
                      {lead.profile_data?.max_monthly_cost && (
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          Máx CTM: R$ {lead.profile_data.max_monthly_cost}/mês
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {mapa.map((m, idx) => (
                          <span key={idx} className="badge badge-neutral" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: tradeIn ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {tradeIn || (lead.profile_data?.has_trade_in ? 'Sim' : 'Não')}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <span className={`badge ${lead.lead_quality === 'hot' ? 'badge-danger' : lead.lead_quality === 'warm' ? 'badge-warning' : 'badge-neutral'}`}>
                        {lead.lead_quality ? lead.lead_quality.toUpperCase() : 'N/A'}
                      </span>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <span className={`badge ${lead.stage === 'handoff_requested' ? 'badge-danger' : lead.stage === 'recommendation_sent' ? 'badge-warning' : 'badge-neutral'}`}>
                        {lead.stage}
                      </span>
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                          setNotesInput(lead.consultant_notes || '');
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '5px 10px' }}
                      >
                        Ver Perfil <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Lateral com Perfil Completo Extraído pela IA (profile_data jsonb) */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '680px', padding: '0', overflow: 'hidden', backgroundColor: '#ffffff' }}
          >
            {/* Header do Drawer */}
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '22px 26px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className={`badge ${selectedLead.lead_quality === 'hot' ? 'badge-danger' : 'badge-warning'}`}>
                    <Flame size={12} /> {selectedLead.lead_quality ? `${selectedLead.lead_quality.toUpperCase()} QUALITY` : 'LEAD'}
                  </span>
                  <span className="badge badge-neutral">
                    Estágio: {selectedLead.stage}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedLead.name || 'Lead sem nome'}
                </h2>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Telefone: <strong>{selectedLead.phone}</strong> • Cidade: {selectedLead.city || selectedLead.profile_data?.city || 'Não informada'}
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Conteúdo do Perfil JSONB */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: '68vh', overflowY: 'auto' }}>
              {/* Orçamento, CTM e CTP */}
              <div style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Orçamento Total</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedLead.profile_data?.total_budget ? `R$ ${selectedLead.profile_data.total_budget.toLocaleString('pt-BR')}` : 'A definir'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CTM Estimado (Mensal)</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--status-success)' }}>
                    {selectedLead.ctm_estimate ? `R$ ${selectedLead.ctm_estimate.toLocaleString('pt-BR')}/mês` : 'Calculando'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>CTP Estimado (Total)</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedLead.ctp_estimate ? `R$ ${selectedLead.ctp_estimate.toLocaleString('pt-BR')}` : 'Calculando'}
                  </div>
                </div>
              </div>

              {/* MAPA Ranking Top 3 */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Prioridades (MAPA Top 3)
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {(selectedLead.mapa_ranking || selectedLead.profile_data?.mapa_top3 || []).map((m, idx) => (
                    <span key={idx} className="badge badge-neutral" style={{ padding: '6px 12px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid var(--border-medium)' }}>
                      #{idx + 1} {m.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detalhes do Perfil (profile_data) */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  Critérios Mapeados no profile_data
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                  <div className="card" style={{ padding: '12px', backgroundColor: '#ffffff' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Tipo de Uso / Terreno</div>
                    <div style={{ fontWeight: 600 }}>{selectedLead.profile_data?.use_type || 'PF'} • Terreno: {selectedLead.profile_data?.terrain || 'misto'}</div>
                  </div>
                  <div className="card" style={{ padding: '12px', backgroundColor: '#ffffff' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Carroceria Preferida</div>
                    <div style={{ fontWeight: 600 }}>{selectedLead.profile_data?.body_preference?.join(', ') || 'Sem preferência'}</div>
                  </div>
                  <div className="card" style={{ padding: '12px', backgroundColor: '#ffffff' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Veículo na Troca (Trade-in)</div>
                    <div style={{ fontWeight: 600 }}>{selectedLead.profile_data?.trade_in_model || (selectedLead.profile_data?.has_trade_in ? 'Sim' : 'Não')}</div>
                  </div>
                  <div className="card" style={{ padding: '12px', backgroundColor: '#ffffff' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Marcas de Interesse (Whitelist)</div>
                    <div style={{ fontWeight: 600 }}>{selectedLead.profile_data?.brand_whitelist?.join(', ') || 'Todas'}</div>
                  </div>
                  <div className="card" style={{ padding: '12px', backgroundColor: '#ffffff' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Passageiros & Cadeirinha</div>
                    <div style={{ fontWeight: 600 }}>
                      {selectedLead.profile_data?.passengers || 1} pessoas • Cadeirinha: {selectedLead.profile_data?.needs_car_seat ? 'Sim' : 'Não'}
                    </div>
                  </div>
                  <div className="card" style={{ padding: '12px', backgroundColor: '#ffffff' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Quilometragem Mensal Estimada</div>
                    <div style={{ fontWeight: 600 }}>{selectedLead.profile_data?.monthly_km ? `${selectedLead.profile_data.monthly_km} km/mês` : 'Média padrão'}</div>
                  </div>
                </div>
              </div>

              {/* Notas do Consultor */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Notas do Consultor (consultant_notes)
                  </h4>
                  <button onClick={handleSaveNotes} className="btn btn-primary btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                    <Save size={13} /> Salvar Notas
                  </button>
                </div>
                <textarea
                  value={notesInput}
                  onChange={e => setNotesInput(e.target.value)}
                  placeholder="Escreva notas e orientações sobre este lead para a equipe comercial..."
                  rows={3}
                  className="input-control"
                  style={{ fontSize: '0.84rem' }}
                />
              </div>

              {/* Alterar Qualidade e Estágio */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <h5 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Qualidade (lead_quality)</h5>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {(['hot', 'warm', 'cold'] as LeadQuality[]).map(q => (
                      <button
                        key={q}
                        onClick={() => handleQualityChange(selectedLead.id, q)}
                        className={`btn btn-sm ${selectedLead.lead_quality === q ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ fontSize: '0.72rem', flex: 1 }}
                      >
                        {q.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-muted)' }}>Estágio (stage)</h5>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {(['interviewing', 'profile_confirmed', 'recommendation_sent', 'handoff_requested', 'closed'] as LeadStage[]).map(st => (
                      <button
                        key={st}
                        onClick={() => handleStageChange(selectedLead.id, st)}
                        className={`btn btn-sm ${selectedLead.stage === st ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ fontSize: '0.68rem', padding: '3px 6px' }}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé com Ações */}
            <div style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderTop: '1px solid var(--border-subtle)',
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => {
                  setSelectedLead(null);
                  navigate('/admin/conversations');
                }}
                className="btn btn-secondary btn-sm"
              >
                <MessageSquare size={14} /> Ver Transcrição da IA
              </button>

              <button
                onClick={() => {
                  const num = selectedLead.phone.replace(/\D/g, '');
                  window.open(`https://wa.me/${num}`, '_blank');
                }}
                className="btn btn-whatsapp btn-sm"
              >
                Chamar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
