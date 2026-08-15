import React, { useState } from 'react';
import {
  Database,
  Check,
  Copy,
  Server,
  ShieldCheck,
  Code
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export const Settings: React.FC = () => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

  const userSqlSchema = `-- Esquema Ativo no Supabase:
-- 1. TABELA DE CARROS (ESTOQUE)
-- public.cars (id, brand, model, version, year, km, color, price, accepts_trade, financing_available, fuel, transmission, body_type, avg_consumption_city, avg_consumption_road, monthly_cost_estimate, notes, active)

-- 2. TABELA DE HISTÓRICO DE MENSAGENS (LANGCHAIN / N8N MEMORY)
-- public.chat_history (id, session_id, message [jsonb], created_at)

-- 3. TABELA DE LEADS (QUALIFICAÇÃO & PROFILE DATA)
-- public.leads (id, phone, name, city, stage, lead_quality, profile_data [jsonb], mapa_ranking [jsonb], ctm_estimate, ownership_period_years, ctp_estimate, consultant_notes, created_at, updated_at)`;

  const copySchema = () => {
    navigator.clipboard.writeText(userSqlSchema);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1000px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Integrações & Banco de Dados Supabase</h1>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Configurações ativas conectadas diretamente às tabelas <code>public.cars</code>, <code>public.chat_history</code> e <code>public.leads</code>
        </p>
      </div>

      {/* Card: Status do Supabase */}
      <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)', color: '#0f172a' }}>
              <Database size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Conexão com Banco de Dados Supabase</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Leitura e escrita em tempo real nas tabelas do seu projeto</p>
            </div>
          </div>

          <span className={`badge ${isSupabaseConfigured ? 'badge-success' : 'badge-neutral'}`}>
            {isSupabaseConfigured ? 'Supabase Conectado' : 'Modo Dados Locais Ativo'}
          </span>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '18px' }}>
          O AutoGO já está 100% mapeado para as suas tabelas oficiais. Basta inserir as credenciais do seu Supabase no arquivo <code>.env</code> na raiz do projeto:
        </p>

        {/* Variáveis necessárias */}
        <div style={{
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          padding: '14px 16px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.82rem',
          fontFamily: 'monospace',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: '18px'
        }}>
          <div><strong style={{ color: '#0f172a' }}>VITE_SUPABASE_URL</strong>=https://seu-projeto.supabase.co</div>
          <div><strong style={{ color: '#0f172a' }}>VITE_SUPABASE_ANON_KEY</strong>=eyJhbGciOiJIUzI1NiIsInR5cCI6...</div>
        </div>

        {/* Estrutura das Tabelas Mapeadas */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Tabelas Mapeadas no Painel:</span>
            <button onClick={copySchema} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
              {copiedSchema ? <Check size={14} color="var(--status-success)" /> : <Copy size={14} />}
              {copiedSchema ? 'Copiado!' : 'Copiar Estrutura'}
            </button>
          </div>
          <pre style={{
            backgroundColor: '#0f172a',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.75rem',
            color: '#e2e8f0',
            overflowX: 'auto',
            maxHeight: '180px'
          }}>
            {userSqlSchema}
          </pre>
        </div>
      </div>

      {/* Card: Conexão com o n8n */}
      <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--status-info-bg)', color: '#0284c7' }}>
              <Server size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>Agente no n8n & LangChain Memory</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mapeamento de <code>chat_history</code> e tags <code>[[STAGE:...|QUALITY:...]]</code></p>
            </div>
          </div>

          <span className={`badge ${n8nWebhookUrl ? 'badge-success' : 'badge-neutral'}`}>
            {n8nWebhookUrl ? 'Webhook n8n Configurado' : 'Fallback IA Ativo'}
          </span>
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>
            <strong>Como o painel lê seu fluxo do n8n:</strong>
          </p>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>As conversas do WhatsApp são salvas pelo seu nó do n8n diretamente na tabela <code>public.chat_history</code> (com <code>session_id</code> = telefone do lead).</li>
            <li>O painel AutoGO lê as mensagens em formato LangChain, limpa e destaca as tags <code>[[STAGE:...|QUALITY:...]]</code> para você acompanhar o avanço do lead.</li>
            <li>O objeto <code>profile_data</code> e o <code>mapa_ranking</code> são renderizados no Drawer de detalhes de cada comprador.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
