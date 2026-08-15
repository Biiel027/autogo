import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Car, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { signInWithGoogle, signInWithEmail, loginAsDemo, isSupabaseLive } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Por favor, informe e-mail e senha.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const res = await signInWithEmail(email, password);
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else {
      navigate('/admin');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');
    const res = await signInWithGoogle();
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else if (!isSupabaseLive) {
      navigate('/admin');
    }
  };

  const handleDemoAccess = () => {
    loginAsDemo();
    navigate('/admin');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)'
            }}>
              <Car size={22} strokeWidth={2.4} />
            </div>
            <span style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              AutoGO <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>ADMIN</span>
            </span>
          </Link>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
            Painel de Gestão & Monitoramento
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Acesso administrativo para acompanhamento de leads e conversas
          </p>
        </div>

        {/* Card do Login */}
        <div className="card" style={{ padding: '32px', backgroundColor: '#ffffff', border: '1px solid var(--border-medium)', boxShadow: 'var(--shadow-md)' }}>
          {errorMsg && (
            <div style={{
              backgroundColor: 'var(--status-danger-bg)',
              border: '1px solid #fecaca',
              color: 'var(--status-danger)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Botão do Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="btn btn-secondary"
            style={{
              width: '100%',
              padding: '11px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '18px',
              border: '1px solid var(--border-medium)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7C.6 9 0 10.4 0 12s.6 3 1.6 5l3.7-2.3z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"/>
            </svg>
            Entrar com Google
          </button>

          {/* Divisor */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '14px 0',
            color: 'var(--text-muted)',
            fontSize: '0.78rem'
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
            <span>ou com e-mail cadastrado</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border-subtle)' }} />
          </div>

          {/* Form E-mail / Senha */}
          <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                E-mail Corporativo
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@autogo.com.br"
                  className="input-control"
                  style={{ paddingLeft: '36px' }}
                />
                <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-control"
                  style={{ paddingLeft: '36px' }}
                />
                <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '11px', marginTop: '4px' }}
            >
              {isLoading ? 'Acessando...' : 'Acessar Painel'}
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Acesso Demo Rápido */}
          <div style={{
            marginTop: '20px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center'
          }}>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', border: '1px solid var(--border-medium)' }}
            >
              <Sparkles size={14} />
              Acesso Rápido de Demonstração
            </button>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              Permite navegar em todas as telas com dados simulados.
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            ← Voltar para o site principal do AutoGO
          </Link>
        </div>
      </div>
    </div>
  );
};
