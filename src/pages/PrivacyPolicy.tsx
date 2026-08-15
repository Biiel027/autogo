import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShieldCheck, Lock, Eye, FileText, Server, UserCheck, Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
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
                <ShieldCheck size={14} color="var(--status-success)" /> Conformidade LGPD & Meta API
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
              Política de Privacidade
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Última atualização: {lastUpdated} • Aplicável aos serviços do AutoGO (Web & WhatsApp Business API)
            </p>
          </div>

          {/* Conteúdo Legal */}
          <div className="card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px', lineHeight: '1.7', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            
            {/* 1. Introdução */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                1. Visão Geral e Controlador de Dados
              </h2>
              <p>
                A <strong>AutoGO Technologies</strong> ("AutoGO", "nós" ou "nosso") está comprometida com a proteção da privacidade e dos dados pessoais de seus usuários ("você"), em total conformidade com a Lei Geral de Proteção de Dados Pessoais do Brasil (<strong>LGPD - Lei nº 13.709/2018</strong>) e com os requisitos de conformidade da <strong>Meta Platforms, Inc. (WhatsApp Business API / Meta Cloud API)</strong>.
              </p>
              <p style={{ marginTop: '8px' }}>
                Esta Política de Privacidade descreve de forma transparente como coletamos, utilizamos, armazenamos, compartilhamos e protegemos os seus dados quando você interage com a nossa plataforma web e com o nosso assistente inteligente no WhatsApp.
              </p>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 2. Dados Coletados */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                2. Dados Pessoais Coletados
              </h2>
              <p>Podemos coletar e processar as seguintes categorias de informações:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong style={{ color: '#fff' }}>Dados de Identificação e Contato:</strong> Nome, número de telefone celular / WhatsApp ID, endereço de e-mail e cidade/estado.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Dados Conversacionais e Preferências Automotivas:</strong> Mensagens enviadas nas conversas com a IA (no WhatsApp e no site), faixas de orçamento pretendido, perfil de uso do veículo (familiar, urbano, viagens), número de passageiros, marcas de preferência e histórico de carros anteriores.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Dados de Agendamento:</strong> Data, horário e concessionária parceira ou link de videochamada selecionados para test-drives ou consultorias.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Dados Técnicos e de Navegação:</strong> Endereço IP, data e hora de acesso, tipo de navegador e identificadores de sessão técnica para segurança.
                </li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 3. Finalidade e Base Legal */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                3. Finalidades do Tratamento e Bases Legais (LGPD)
              </h2>
              <p>Seus dados são tratados exclusivamente para propósitos legítimos e transparentes:</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginTop: '14px' }}>
                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-light)', fontSize: '0.85rem' }}>Geração de Recomendações</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Processar suas preferências para gerar dossiês veiculares imparciais (Execução de Contrato / Procedimentos Preliminares - Art. 7º, V).
                  </p>
                </div>
                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--status-success)', fontSize: '0.85rem' }}>Atendimento no WhatsApp</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Envio de respostas interativas e relatórios solicitados via WhatsApp Cloud API (Consentimento / Legítimo Interesse - Art. 7º, I e IX).
                  </p>
                </div>
                <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.85rem' }}>Agendamento de Test-Drives</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Conectar você à concessionária parceira mediante sua solicitação explícita.
                  </p>
                </div>
              </div>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 4. Compartilhamento e Operadores */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                4. Compartilhamento com Terceiros e Operadores de Dados
              </h2>
              <p>
                O AutoGO <strong>NÃO vende, aluga ou comercializa</strong> seus dados pessoais com corretores ou terceiros para fins de marketing não autorizado. Compartilhamos dados estritamente com os seguintes provedores de infraestrutura essencial:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong style={{ color: '#fff' }}>Meta Platforms, Inc. (WhatsApp Cloud API):</strong> Para a transmissão e entrega segura de mensagens via WhatsApp oficial.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Supabase Inc. & Provedores de Cloud:</strong> Para o armazenamento criptografado do banco de dados relacional.
                </li>
                <li>
                  <strong style={{ color: '#fff' }}>Concessionárias Parceiras Oficiais:</strong> Apenas os dados de contato necessários para realização do test-drive agendado com sua autorização prévia.
                </li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 5. Direitos do Titular */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                5. Seus Direitos como Titular de Dados (Art. 18 da LGPD)
              </h2>
              <p>Você possui o direito de, a qualquer momento e mediante requisição gratuita:</p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Confirmar a existência de tratamento e acessar seus dados pessoais;</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>Revogar o consentimento ou solicitar a exclusão definitiva de seu histórico;</li>
                <li><strong>Opt-out imediato no WhatsApp:</strong> Você pode interromper as mensagens no WhatsApp a qualquer instante digitando <code>PARAR</code>, <code>SAIR</code> ou solicitando diretamente à IA.</li>
              </ul>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 6. Segurança e Retenção */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                6. Segurança da Informação e Retenção
              </h2>
              <p>
                Adotamos medidas técnicas e organizacionais de padrão internacional, incluindo criptografia de dados em trânsito (HTTPS / TLS 1.3), criptografia em repouso nos bancos de dados Supabase e controle de acesso estrito com autenticação em duas etapas para administradores. Os dados são retidos apenas pelo período necessário para cumprimento das finalidades descritas ou prazos legais vigentes.
              </p>
            </section>

            <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)' }} />

            {/* 7. Contato e Encarregado (DPO) */}
            <section style={{ backgroundColor: 'var(--bg-tertiary)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-medium)' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} /> Canal de Contato com o Encarregado de Proteção de Dados (DPO)
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Para exercer qualquer um de seus direitos ou esclarecer dúvidas sobre esta Política, entre em contato diretamente com nosso Encarregado de Proteção de Dados:
              </p>
              <div style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                <div><strong>E-mail de Privacidade:</strong> privacidade@autogo.com.br</div>
                <div><strong>Encarregado (DPO):</strong> Equipe de Conformidade & Privacidade AutoGO</div>
                <div><strong>Endereço:</strong> São Paulo/SP - Brasil</div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
