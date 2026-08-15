import React from 'react';
import { Car, Shield, Award, Sparkles, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#ffffff',
      borderTop: '1px solid var(--border-subtle)',
      padding: '56px 0 28px 0',
      marginTop: '80px'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Coluna 1: Sobre */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Car size={16} />
              </div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                AutoGO
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
              Consultoria independente de inteligência automotiva. Cruzamos dados oficiais da Tabela FIPE e Inmetro para encontrar a melhor compra veicular do mercado brasileiro.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge badge-neutral" style={{ fontSize: '0.7rem' }}>
                <Sparkles size={11} /> Base FIPE 2026
              </span>
              <span className="badge badge-whatsapp" style={{ fontSize: '0.7rem' }}>
                <MessageSquare size={11} /> WhatsApp Business API
              </span>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Navegação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
              <li><a href="#como-funciona" style={{ transition: 'color 0.2s' }}>Como Funciona a Recomendação</a></li>
              <li><a href="#chat-ia" style={{ transition: 'color 0.2s' }}>Fazer Consulta com o Consultor</a></li>
              <li><a href="#relatorio-showcase" style={{ transition: 'color 0.2s' }}>Exemplo de Relatório Técnico</a></li>
              <li><a href="#diferenciais" style={{ transition: 'color 0.2s' }}>Por que o AutoGO é Imparcial</a></li>
            </ul>
          </div>

          {/* Coluna 3: Confiabilidade */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Metodologia & Dados
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Shield size={15} color="var(--status-success)" />
                <span>Zero comissionamento tendencioso</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Award size={15} color="#0f172a" />
                <span>Mapeamento de 2.400+ modelos e versões</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Car size={15} color="#0f172a" />
                <span>Cálculo real de Custo Total de Propriedade (TCO)</span>
              </div>
            </div>
          </div>

          {/* Coluna 4: Área Restrita */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '14px', color: 'var(--text-primary)' }}>
              Área de Gestão
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Acesso administrativo para monitoramento de conversas e clientes.
            </p>
            <Link to="/login" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Acessar Painel de Controle
            </Link>
          </div>
        </div>

        {/* Linha Inferior */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            © {new Date().getFullYear()} AutoGO Technologies. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', gap: '18px' }}>
            <Link to="/termos" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Termos de Uso
            </Link>
            <Link to="/privacidade" style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Privacidade & LGPD
            </Link>
            <span style={{ color: 'var(--status-success)', fontWeight: 600 }}>
              ● Meta API Verified
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
