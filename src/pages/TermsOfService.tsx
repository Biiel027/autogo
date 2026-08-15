import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, Mail, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  const lastUpdated = "14 de Agosto de 2026";

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '48px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          {/* Breadcrumb / Voltar */}
          <div style={{ marginBottom: '24px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <ArrowLeft size={16} /> Voltar para a Página Inicial
            </Link>
          </div>

          {/* Header */}
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <span className="badge badge-neutral">
                <FileText size={14} color="#0f172a" /> Termos Legais & Uso do Serviço
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Termos de Uso do Serviço
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Última atualização: {lastUpdated} • Regulamenta o uso do portal Web e do Assistente WhatsApp AutoGO
            </p>
          </div>

          {/* Conteúdo dos Termos */}
          <div className="card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: '1.7', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            
            {/* 1. Aceitação dos Termos */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                1. Aceitação dos Termos
              </h2>
              <p>
                Bem-vindo ao <strong>AutoGO</strong>. Ao acessar ou utilizar nosso site, utilizar o assistente conversacional de Inteligência Artificial integrado ou interagir com nosso agente no <strong>WhatsApp (via Meta Cloud API)</strong>, você declara ter lido, compreendido e concordado integralmente com estes Termos de Uso e com a nossa <Link to="/privacidade" style={{ color: 'var(--accent-light)', textDecoration: 'underline' }}>Política de Privacidade</Link>.
              </p>
              <p style={{ marginTop: '8px' }}>
                Caso você não concorde com qualquer disposição destes termos, solicitamos que não utilize os serviços da plataforma.
              </p>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 2. Descrição dos Serviços */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                2. Descrição da Plataforma e dos Serviços
              </h2>
              <p>
                O AutoGO é uma plataforma de tecnologia voltada à <strong>consultoria e recomendação inteligente de compra de veículos automotores</strong>. Nossos serviços englobam:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Atendimento conversacional automatizado via inteligência artificial para mapeamento de necessidades e orçamento do comprador;</li>
                <li>Geração de dossiês técnicos e relatórios analíticos de comparação de veículos com base em dados públicos de mercado (como Tabela FIPE e Programa Brasileiro de Etiquetagem Veicular - PBEV/Inmetro);</li>
                <li>Facilitação no agendamento de test-drives ou consultorias em concessionárias e revendas parceiras.</li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 3. Comunicação via WhatsApp e Consentimento */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={18} color="var(--whatsapp-color)" /> 3. Comunicações e Consentimento via WhatsApp (Meta API)
              </h2>
              <p>
                Ao enviar uma mensagem inicial para o número oficial do AutoGO no WhatsApp ou ao solicitar o envio do relatório veicular através de nossos formulários no site:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong style={{ color: '#fff' }}>Opt-in e Comunicação Transacional:</strong> Você consente em receber mensagens automáticas no WhatsApp para responder suas dúvidas, conduzir a consultoria veicular e entregar os dossiês solicitados.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Política de Mensagens Não Solicitadas:</strong> O AutoGO não envia spam. As mensagens são estritamente contextuais e decorrentes de sua interação ativa.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Cancelamento / Opt-out:</strong> Você pode interromper as comunicações a qualquer momento simplesmente enviando as palavras <code>PARAR</code>, <code>SAIR</code> ou solicitando o cancelamento no chat.
                </li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 4. Natureza Consultiva e Isenção de Venda Direta */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                4. Natureza Consultiva e Limites de Responsabilidade
              </h2>
              <div style={{ backgroundColor: 'rgba(229, 155, 44, 0.08)', border: '1px solid rgba(229, 155, 44, 0.25)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '14px' }}>
                <p style={{ color: '#e2e8f0', fontSize: '0.88rem' }}>
                  <strong>Aviso Importante:</strong> O AutoGO atua como um facilitador analítico e consultivo independente. Não somos uma concessionária de veículos, instituição financeira nem seguradora.
                </p>
              </div>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Os valores de veículos citados (como faixas FIPE e preços médios anunciados) são referências informativas de mercado e podem variar conforme a região, estado de conservação e política comercial de cada concessionária.</li>
                <li>A decisão final de compra, negociação de preço, financiamento e conferência do estado mecânico do veículo é de exclusiva responsabilidade do comprador e da loja vendedora.</li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 5. Uso Aceitável */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                5. Conduta do Usuário e Uso Aceitável
              </h2>
              <p>Ao utilizar nossos canais, você se compromete a:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Fornecer informações verdadeiras e atualizadas ao interagir com o agente;</li>
                <li>Não tentar burlar, invadir ou sobrecarregar a infraestrutura da API ou do site através de bots maliciosos ou ataques de negação de serviço;</li>
                <li>Não utilizar o serviço para qualquer finalidade ilícita, fraudulenta ou difamatória.</li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 6. Propriedade Intelectual */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                6. Propriedade Intelectual
              </h2>
              <p>
                Todos os elementos da plataforma AutoGO, incluindo código-fonte, algoritmos de inteligência artificial, interfaces de usuário, marcas, logotipos e conteúdos dos relatórios são de propriedade exclusiva da AutoGO Technologies, protegidos pelas leis de propriedade intelectual e direitos autorais do Brasil e tratados internacionais.
              </p>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 7. Foro e Legislação Aplicável */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                7. Legislação Aplicável e Foro
              </h2>
              <p>
                Estes Termos de Uso são regidos e interpretados segundo as leis da República Federativa do Brasil, em especial o Código Civil Brasileiro, o Marco Civil da Internet (Lei nº 12.965/2014) e a LGPD (Lei nº 13.709/2018). Fica eleito o Foro da Comarca de São Paulo, Estado de São Paulo, para dirimir quaisquer controvérsias decorrentes destes Termos.
              </p>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 8. Contato */}
            <section style={{ backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} /> Dúvidas e Suporte
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Para suporte legal ou esclarecimento sobre os Termos de Uso do AutoGO:
              </p>
              <div style={{ marginTop: '10px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                <div><strong>E-mail de Contato:</strong> suporte@autogo.com.br / juridico@autogo.com.br</div>
                <div><strong>AutoGO Technologies</strong> • São Paulo/SP - Brasil</div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
