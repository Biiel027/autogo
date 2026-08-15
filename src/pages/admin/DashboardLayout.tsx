import React from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileSpreadsheet,
  Calendar,
  Settings,
  LogOut,
  Car,
  ExternalLink,
  Sparkles,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user, signOut, isSupabaseLive } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { to: '/admin', label: 'Visão Geral', icon: LayoutDashboard, end: true },
    { to: '/admin/conversations', label: 'Monitor de Conversas', icon: MessageSquare, badge: 'WhatsApp & Web' },
    { to: '/admin/leads', label: 'Perfis de Leads', icon: Users },
    { to: '/admin/cars', label: 'Estoque de Carros', icon: Car },
    { to: '/admin/settings', label: 'Integrações & Supabase', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Sidebar Executiva */}
      <aside style={{
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Top Logo */}
        <div style={{
          height: '70px',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
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
            <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
              AutoGO
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              PAINEL DE GESTÃO
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isActive ? '#0f172a' : 'transparent',
                  transition: 'all var(--transition-fast)'
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} color={isActive ? '#ffffff' : 'var(--text-secondary)'} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{
                        fontSize: '0.65rem',
                        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-tertiary)',
                        color: isActive ? '#ffffff' : 'var(--text-muted)',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Status da Conexão Supabase */}
        <div style={{
          margin: '0 14px 14px 14px',
          padding: '12px',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.75rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <Database size={13} color={isSupabaseLive ? 'var(--status-success)' : 'var(--status-warning)'} />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              {isSupabaseLive ? 'Supabase Conectado' : 'Modo Demonstração'}
            </span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
            {isSupabaseLive ? 'Sincronização em tempo real ativa' : 'Dados simulados ativos'}
          </div>
        </div>

        {/* User Info & Logout */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-tertiary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#0f172a',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}>
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ maxWidth: '120px', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {user?.role === 'admin' ? 'Administrador' : 'Consultor'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Encerrar Sessão"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--status-danger)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Header */}
        <header style={{
          height: '70px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-success">
              <Sparkles size={11} /> Agente AutoGO Online
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Monitorando WhatsApp & Web
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link
              to="/"
              target="_blank"
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px', fontSize: '0.82rem' }}
            >
              <ExternalLink size={14} />
              Ver Site Público
            </Link>
          </div>
        </header>

        {/* Body Rendered via React Router */}
        <main style={{ flex: 1, padding: '32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
