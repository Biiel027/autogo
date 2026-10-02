import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChatWidget } from '../components/ChatWidget';
import {
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Zap,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  Layers,
  Fuel,
  Check,
  AlertTriangle,
  HeartHandshake,
  DollarSign,
  Car
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('Olá! Gostaria de uma recomendação imparcial para escolher meu próximo carro com o AutoGO.');
    window.open(`https://wa.me/5527988741555?text=${text}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION - Foco B2C: Confiança, Economia e Decisão Segura */}
        <section style={{
          position: 'relative',
          padding: '80px 0 60px 0',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '920px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '18px' }}>
              <span className="badge badge-neutral" style={{ padding: '6px 14px', fontSize: '0.82rem', gap: '8px' }}>
                <ShieldCheck size={14} color="var(--status-success)" /> Consultoria Automotiva 100% Independente
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
              Compre o carro ideal para a sua rotina — sem pressão e sem surpresas no bolso.
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              maxWidth: '740px',
              margin: '0 auto 32px auto'
            }}>
              Não temos estoque para empurrar. O <strong>AutoGO</strong> analisa suas necessidades de espaço familiar, trajeto diário e orçamento para encontrar a melhor compra do mercado, evitando carros com manutenção cara ou desvalorização excessiva.
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
                Fazer Consulta Gratuita
              </a>
              <button onClick={handleWhatsAppDirect} className="btn btn-whatsapp btn-lg">
                <MessageSquare size={17} />
                Atendimento no WhatsApp
              </button>
            </div>

            {/* Destaques de Benefício para o Comprador */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>2.400+</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Modelos e Versões no Mercado</div>
              </div>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--status-success)' }}>100% Imparcial</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Zero Comissão de Vendedores</div>
              </div>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Custo Total (TCO)</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Seguro, Peças & Depreciação</div>
              </div>
              <div className="card" style={{ padding: '16px 20px', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284c7' }}>Em Minutos</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dossiê com Prós e Contras</div>
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
                  <Sparkles size={12} /> Consultoria Rápida
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
                  Descubra o Carro Ideal em Poucos Passos
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                  Conte para nosso assistente o que você precisa: tamanho do porta-malas para a família, economia de combustível para o dia a dia ou o limite de orçamento. Nós filtramos as melhores opções do mercado para você.
                </p>

                {/* Tópicos */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ color: '#0f172a' }}><Fuel size={22} /></div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Economia Real de Combustível</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Consumo urbano e rodoviário oficial pelo Inmetro para não ter surpresa no posto.</p>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ color: 'var(--status-success)' }}><Layers size={22} /></div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Espaço e Segurança para a Família</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Litragem de porta-malas, fixação ISOFIX para cadeirinhas e pontuação de segurança.</p>
                    </div>
                  </div>

                  <div className="card" style={{ padding: '14px 18px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ color: '#0284c7' }}><TrendingDown size={22} /></div>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700 }}>Custo de Manutenção & Seguro</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preço médio das revisões periódicas, facilidade de peças e estimativa de IPVA.</p>
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

        {/* SEÇÃO DO EXEMPLO DE DOSSIÊ (Substituindo o antigo estoque) */}
        <section id="relatorio-showcase" style={{ padding: '72px 0', backgroundColor: '#ffffff', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 44px auto' }}>
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                <ShieldCheck size={12} color="var(--status-success)" /> Dossiê de Recomendação
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                Como Funciona na Prática?
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Veja um exemplo real de como o AutoGO compara veículos no mercado com clareza para você tomar uma decisão inteligente:
              </p>
            </div>

            {/* Card Demonstrativo do Dossiê */}
            <div className="card" style={{ maxWidth: '920px', margin: '0 auto', padding: '32px', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
                <div>
                  <span className="badge badge-neutral" style={{ marginBottom: '6px' }}>Cenário Simulado: Família (4 pessoas) • Orçamento até R$ 95.000</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Comparativo de Compra: SUV Urbano vs Sedan Médio</h3>
                </div>
                <a href="#chat-ia" className="btn btn-primary btn-sm">
                  Fazer Meu Diagnóstico <ArrowRight size={14} />
                </a>
              </div>

              {/* Comparativo Lado a Lado de 2 Opções de Mercado */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Opção 1 */}
                <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-success" style={{ fontWeight: 700 }}>OPÇÃO A • FOCO ECONOMIA</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>FIPE: ~R$ 88.000</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>Sedan Médio Flex (2020)</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Excelente porta-malas e baixa desvalorização</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.83rem', color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                      <Check size={16} /> <strong>Porta-malas:</strong> 470 Litros (ideal para malas e carrinho)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                      <Check size={16} /> <strong>Consumo Cidade:</strong> 11,8 km/l (gasolina)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                      <Check size={16} /> <strong>Manutenção:</strong> Peças baratas e mecânica simples
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: '#b45309', marginTop: '6px', backgroundColor: '#fef3c7', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                      <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Ponto de atenção:</strong> Posição de dirigir mais baixa que um SUV.</span>
                    </div>
                  </div>
                </div>

                {/* Opção 2 */}
                <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="badge badge-neutral" style={{ fontWeight: 700 }}>OPÇÃO B • FOCO CONFORTO</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>FIPE: ~R$ 93.000</span>
                  </div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '4px' }}>SUV Compacto Turbo (2019)</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>Posição elevada e facilidade em lombadas/buracos</div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.83rem', color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                      <Check size={16} /> <strong>Dirigibilidade:</strong> Altura do solo de 20cm
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                      <Check size={16} /> <strong>Consumo Cidade:</strong> 10,2 km/l (gasolina)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-success)' }}>
                      <Check size={16} /> <strong>Porta-malas:</strong> 390 Litros
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', color: '#b45309', marginTop: '6px', backgroundColor: '#fef3c7', padding: '8px 10px', borderRadius: 'var(--radius-sm)' }}>
                      <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Ponto de atenção:</strong> Seguro médio ~15% mais alto que a Opção A.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO COMO FUNCIONA */}
        <section id="como-funciona" style={{ padding: '72px 0', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px auto' }}>
              <span className="badge badge-neutral" style={{ marginBottom: '10px' }}>
                <Zap size={12} /> Passo a Passo
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                Como Funciona a Consultoria AutoGO
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                Uma jornada transparente do diagnóstico até a escolha do carro certo.
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Você Conta Sua Rotina</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  No WhatsApp ou no site, você informa sua rotina de uso, tamanho da família, limite de valor e preferências.
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Análise de Mercado</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Cruzamos consumo real, histórico de manutenção, custo médio de seguro e desvalorização FIPE.
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
                  Você recebe as melhores opções com números claros e pontos de atenção para não errar na compra.
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
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>Decisão Segura</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Você negocia o carro que realmente faz sentido para você, com tranquilidade e sem cair na lábia de vendedores.
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
                  <HeartHandshake size={12} /> Nosso Compromisso
                </span>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>
                  Por Que o AutoGO é 100% Imparcial?
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>
                  Comprar um carro é uma das decisões financeiras mais importantes de uma família. Lojas e concessionárias tradicionais naturalmente tentam direcionar você para os estoques parados no pátio ou que pagam a maior comissão.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                  No AutoGO, <strong>não vendemos carros próprios</strong>. Nosso único objetivo é encontrar a melhor compra em todo o mercado nacional para o seu perfil e o seu bolso.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>Zero comissão de lojistas ou montadoras</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>Dados de consumo e histórico mecânico verificados</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={16} color="var(--status-success)" />
                    <span>Atendimento rápido e descomplicado no WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '32px', border: '1px solid var(--border-medium)', backgroundColor: 'var(--bg-tertiary)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '14px', color: 'var(--text-primary)' }}>
                  Pronto para encontrar o seu próximo carro?
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                  Converse agora com o consultor AutoGO no WhatsApp e receba sua recomendação em minutos.
                </p>

                <button
                  onClick={handleWhatsAppDirect}
                  className="btn btn-whatsapp btn-lg"
                  style={{ width: '100%', marginBottom: '10px' }}
                >
                  <MessageSquare size={18} />
                  Falar com Consultor no WhatsApp
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
