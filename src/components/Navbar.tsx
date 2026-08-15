import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Sparkles, LogIn, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'all var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.15)'
          }}>
            <Car size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-primary)'
            }}>
              AutoGO
              <span style={{
                fontSize: '0.65rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '1px 6px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700
              }}>
                CONCIERGE
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.01em' }}>
              Consultoria Automotiva de Precisão
            </div>
          </div>
        </Link>

        {/* Public Nav Links (if on homepage) */}
        {isHome && (
          <nav style={{
            display: 'none',
            gap: '28px',
            fontSize: '0.88rem',
            fontWeight: 500,
            color: 'var(--text-secondary)'
          }} className="desktop-nav">
            <a href="#como-funciona" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Como Funciona
            </a>
            <a href="#chat-ia" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Consultoria Web
            </a>
            <a href="#relatorio-showcase" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Exemplo de Dossiê
            </a>
            <a href="#diferenciais" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
              Sobre Nós
            </a>
          </nav>
        )}

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {user ? (
            <Link to="/admin" className="btn btn-primary btn-sm">
              <LayoutDashboard size={15} />
              Painel de Gestão
            </Link>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={14} />
                Painel Restrito
              </Link>
              <a
                href="#chat-ia"
                className="btn btn-primary btn-sm"
              >
                <Sparkles size={14} />
                Consultar Agora
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
