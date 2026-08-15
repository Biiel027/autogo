import React, { useEffect, useState } from 'react';
import {
  MessageSquare,
  Users,
  Car as CarIcon,
  TrendingUp,
  Flame,
  Clock,
  Sparkles,
  Phone
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { dataStore } from '../../lib/supabase';
import { Lead, Car, ChatHistoryRecord } from '../../types';

export const Overview: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [chatRecords, setChatRecords] = useState<ChatHistoryRecord[]>([]);

  useEffect(() => {
    const loadAll = async () => {
      const [l, c, ch] = await Promise.all([
        dataStore.getLeads(),
        dataStore.getCars(),
        dataStore.getChatHistory()
      ]);
      setLeads(l);
      setCars(c);
      setChatRecords(ch);
    };
    loadAll();
  }, []);

  // Contagem por Estágio do Funil (stage)
  const stageCounts = {
    new: leads.filter(l => l.stage === 'new').length,
    interviewing: leads.filter(l => l.stage === 'interviewing').length,
    profile_confirmed: leads.filter(l => l.stage === 'profile_confirmed').length,
    recommendation_sent: leads.filter(l => l.stage === 'recommendation_sent').length,
    handoff_requested: leads.filter(l => l.stage === 'handoff_requested').length,
    closed: leads.filter(l => l.stage === 'closed').length
  };

  const hotLeadsCount = leads.filter(l => l.lead_quality === 'hot').length;
  const warmLeadsCount = leads.filter(l => l.lead_quality === 'warm').length;

  // Gráfico do Funil de Atendimento (n8n IA)
  const funnelData = [
    { stage: 'Entrevistando', count: stageCounts.interviewing, fill: '#0284c7' },
    { stage: 'Perfil Mapeado', count: stageCounts.profile_confirmed, fill: '#6366f1' },
    { stage: 'Recomendação', count: stageCounts.recommendation_sent, fill: '#b45309' },
    { stage: 'Handoff Consultor', count: stageCounts.handoff_requested, fill: '#dc2626' },
    { stage: 'Fechado', count: stageCounts.closed, fill: '#059669' }
  ];

  // Gráfico de Estoque por Carroceria
  const bodyTypeCounts = cars.reduce((acc, car) => {
    acc[car.body_type] = (acc[car.body_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const bodyTypeData = Object.keys(bodyTypeCounts).map(type => ({
    name: type.toUpperCase(),
    value: bodyTypeCounts[type]
  }));

  // Agrupa sessões únicas
  const uniqueSessions = Array.from(new Set(chatRecords.map(c => c.session_id)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Título */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Visão Geral de Operação</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Monitoramento do agente no WhatsApp (n8n), leads qualificados e estoque integrado ao Supabase
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            ● Supabase Live Sync
          </span>
          <span className="badge badge-whatsapp" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            WhatsApp n8n Ativo
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px'
      }}>
        {/* KPI 1: Leads no Banco */}
        <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Total de Leads</span>
            <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)', color: '#0f172a' }}>
              <Users size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{leads.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
            <TrendingUp size={13} /> {hotLeadsCount} Leads Quentes (Hot)
          </div>
        </div>

        {/* KPI 2: Sessões no WhatsApp */}
        <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sessões (chat_history)</span>
            <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--whatsapp-bg)', color: 'var(--whatsapp-color)' }}>
              <MessageSquare size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{uniqueSessions.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {chatRecords.length} mensagens no histórico
          </div>
        </div>

        {/* KPI 3: Handoff para Consultor */}
        <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Handoff Solicitado</span>
            <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--status-danger-bg)', color: 'var(--status-danger)' }}>
              <Flame size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{stageCounts.handoff_requested}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--status-danger)', marginTop: '6px', fontWeight: 600 }}>
            Aguardando contato humano
          </div>
        </div>

        {/* KPI 4: Veículos em Estoque */}
        <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Veículos no Estoque (cars)</span>
            <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)', color: '#0f172a' }}>
              <CarIcon size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{cars.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {cars.filter(c => c.active).length} veículos ativos para venda
          </div>
        </div>
      </div>

      {/* Gráficos de Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Gráfico 1: Funil de Estágios n8n */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Estágios dos Leads no Funil</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Classificação automática via tags n8n (stage)</p>
            </div>
            <span className="badge badge-neutral">IA Pipeline</span>
          </div>

          <div style={{ height: '230px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical">
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis dataKey="stage" type="category" stroke="#475569" fontSize={11} tickLine={false} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Categorias em Estoque */}
        <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Estoque por Tipo de Carroceria</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Veículos cadastrados em public.cars</p>
            </div>
          </div>

          <div style={{ height: '230px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bodyTypeData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                  formatter={(val) => [`${val} veículos`, 'Disponíveis']}
                />
                <Bar dataKey="value" fill="#0f172a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Leads Recentes em Destaque */}
      <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} /> Últimos Leads Capturados pela IA
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sincronizado com public.leads</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '14px' }}>
          {leads.slice(0, 3).map((lead) => (
            <div
              key={lead.id}
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  {lead.name || 'Lead sem nome'}
                </div>
                <span className={`badge ${lead.lead_quality === 'hot' ? 'badge-danger' : lead.lead_quality === 'warm' ? 'badge-warning' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                  {lead.lead_quality ? `${lead.lead_quality.toUpperCase()} QUALITY` : 'NOVA'}
                </span>
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Cidade:</strong> {lead.city || lead.profile_data?.city || 'Não informada'}</div>
                <div><strong>Orçamento:</strong> {lead.profile_data?.total_budget ? `R$ ${lead.profile_data.total_budget.toLocaleString('pt-BR')}` : 'A definir'}</div>
                <div><strong>Estágio:</strong> <span style={{ color: '#0f172a', fontWeight: 600 }}>{lead.stage}</span></div>
                {lead.profile_data?.mapa_top3 && (
                  <div style={{ marginTop: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Top 3 MAPA: {lead.profile_data.mapa_top3.join(', ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
