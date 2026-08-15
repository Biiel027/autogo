import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import { MOCK_CARS } from '../lib/mockData';
import {
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingDown,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Layers,
  Fuel
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('Olá! Gostaria de receber uma recomendação de carro com a consultoria do AutoGO.');
    window.open(`https://wa.me/5511987654321?text=${text}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION - Executivo & Limpo (Sem névoas amarelas de IA) */}
        <section style={{
          position: 'relative',
          padding: '80px 0 60px 0',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '920px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '18px' }}>
              <span className="badge badge-neutral" style={{ padding: '6px 14px', fontSize: '0.82rem', gap: '8px' }}>
                <ShieldCheck size={14} color="var(--status-success)" /> Consultoria Independente com Inteligência Analítica
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '20px',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)'
            }}>
              A Decisão Certa na Compra do Seu Próximo Carro.
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '740px',
              margin: '0 auto 32px auto'
            }}>
              Sem pressão de concessionária. O <strong>AutoGO</strong> analisa suas necessidades de espaço, rotina de uso, consumo e orçamento, cruzando dados da Tabela FIPE e histórico de mercado para entregar um dossiê técnico de compra em minutos.
            </p>

            {/* CTAs Principais */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
              marginBottom: '44px'
            }}>
              <a href="#chat-ia" className="btn btn-primary btn-lg">
                <Sparkles size={17} />
                Iniciar Consulta Online
              </a>
              <button onClick={handleWhatsAppDirect} className="btn btn-whatsapp btn-lg">
                <MessageSquare size={17} />
                Atendimento no WhatsApp
              </button>
            </div>

            {/* Métricas Concessionária Premium */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>2.400+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Veículos FIPE Mapeados</div>
              </div>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--status-success)' }}>96.8%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Índice de Assertividade</div>
              </div>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)' }}>R$ 4.800</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Economia Média em TCO</div>
              </div>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#0284c7' }}>100%</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Agnóstico a Montadoras</div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DO CHAT COM A IA */}
        <section id="chat-ia" style={{ padding: '72px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              {/* Coluna Esquerda: Contexto & Critérios */}
              <div>
                <div className="badge badge-neutral" style={{ marginBottom: '12px' }}>
                  <Sparkles size={12} /> Assistente Inteligente
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Faça sua Consulta em Poucos Segundos
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Informe o que você busca: o limite de investimento, se precisa de porta-malas para cadeirinhas ou se roda muito na cidade. Nosso motor técnico cruza os dados na hora.
                </p>

                {/* Tópicos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ color: '#0f172a' }}><Fuel size={22} /></div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Híbrido vs 100% Elétrico</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Descubra se a sua quilometragem urbana justifica a migração para eletrificação.</p>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ color: 'var(--status-success)' }}><Layers size={22} /></div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Espaço para Família e Bagagem</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cálculo real de litragem de porta-malas e facilidade de fixação ISOFIX.</p>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ color: '#0284c7' }}><TrendingDown size={22} /></div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Custo Total de Propriedade (TCO)</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Estimativa de IPVA, seguro médio e depreciação média após 2 anos.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: O Chat Widget Interativo */}
              <div>
                <ChatWidget />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DO SHOWCASE DO ESTOQUE / VEÍCULOS */}
        <section id="relatorio-showcase" style={{ padding: '72px 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 44px auto' }}>
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                <FileSpreadsheet size={12} /> Estoque & Oportunidades
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                Veículos em Destaque no Estoque
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Modelos revisados e catalogados com análise de consumo Inmetro e Custo Total Mensal estimado.
              </p>
            </div>

            {/* Card de Demonstração do Estoque */}
            <div className="card" style={{ maxWidth: '900px', margin: '0 auto', padding: '28px', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
                <div>
                  <span className="badge badge-success" style={{ marginBottom: '6px' }}>Estoque Selecionado</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Destaques com Laudo Cautelar & Procedência</h3>
                </div>
                <a href="#chat-ia" className="btn btn-primary btn-sm">
                  Consultar com o Assistente <ArrowRight size={14} />
                </a>
              </div>

              {/* Preview dos 2 carros principais */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
                {MOCK_CARS.slice(0, 2).map((car) => (
                  <div key={car.id} style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-neutral" style={{ fontWeight: 700 }}>{car.body_type.toUpperCase()} • {car.year}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{car.fuel}</span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{car.brand} {car.model}</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{car.version || ''}</div>
                    
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '4px', backgroundColor: '#ffffff', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <div><strong>Preço:</strong> R$ {car.price.toLocaleString('pt-BR')}</div>
                      <div><strong>Quilometragem:</strong> {car.km ? `${car.km.toLocaleString('pt-BR')} km` : '0 km'}</div>
                      <div><strong>Consumo Urbano:</strong> {car.avg_consumption_city ? `${car.avg_consumption_city} km/l` : 'Econômico'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO COMO FUNCIONA */}
        <section id="como-funciona" style={{ padding: '72px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                <Zap size={12} /> Processo Simples
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                Como Funciona a Consultoria AutoGO
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Uma jornada transparente do primeiro contato até o test-drive.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '20px'
            }}>
              <div className="card">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '14px'
                }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Você Conversa</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  No WhatsApp ou no site, você detalha sua rotina, faixa de valor e exigências indispensáveis.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '14px'
                }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Cruzamento de Dados</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  O sistema analisa consumo, desvalorização FIPE, histórico mecânico e custo de manutenção.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '14px'
                }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Dossiê com Prós e Contras</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Você recebe os 2 ou 3 melhores modelos com números claros e pontos de atenção para não errar.
                </p>
              </div>

              <div className="card">
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  marginBottom: '14px'
                }}>
                  4
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Agendamento Sem Fila</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Agende sua visita em concessionária parceira ou receba a orientação para fechar negócio com segurança.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO SOBRE NÓS / DIFERENCIAIS */}
        <section id="diferenciais" style={{ padding: '72px 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div>
                <span className="badge badge-neutral" style={{ marginBottom: '12px' }}>
                  <ShieldCheck size={12} /> Nosso Compromisso
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
                  Por Que o AutoGO é Imparcial?
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  Comprar um veículo é um dos maiores investimentos de uma família. Lojas tradicionais tendem a direcionar o cliente para os estoques encalhados ou de maior comissão.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  O AutoGO opera com total independência algorítmica: nossos relatórios priorizam a segurança do seu patrimônio e a adequação real à sua rotina.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>Algoritmo 100% independente de montadoras</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>Dados de consumo homologados pelo Inmetro</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>Atendimento rápido no WhatsApp e na Web</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '32px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-tertiary)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)' }}>
                  Pronto para encontrar o seu carro ideal?
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                  Receba seu primeiro relatório personalizado direto no WhatsApp em menos de 2 minutos.
                </p>

                <button
                  onClick={handleWhatsAppDirect}
                  className="btn btn-whatsapp btn-lg"
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <MessageSquare size={18} />
                  Falar no WhatsApp
                </button>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Atendimento gratuito • Sem necessidade de cadastro prévio
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
