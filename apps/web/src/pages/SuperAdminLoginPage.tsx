import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Server,
  KeyRound,
  ShieldCheck,
  Cpu,
  AlertCircle
} from 'lucide-react';

interface SuperAdminLoginPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal' | 'superadmin') => void;
  onLoginSuccess: (
    userRole: 'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR',
    userData?: any,
    tenantData?: any
  ) => void;
}

export const SuperAdminLoginPage: React.FC<SuperAdminLoginPageProps> = ({
  onNavigate,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('superadmin@avanteschoolmanagement.com');
  const [password, setPassword] = useState('Admin123!');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Credenciales no autorizadas en la consola master.');
        setLoading(false);
        return;
      }

      // Validar estrictamente que sea SUPER_ADMIN
      if (data.user?.role !== 'SUPER_ADMIN') {
        setErrorMessage(
          'Acceso denegado: Esta cuenta pertenece a una escuela y no tiene privilegios de Super Administrador de infraestructura.'
        );
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('asm_token', data.token);
      }

      onLoginSuccess('SUPER_ADMIN', data.user, data.tenant);
      onNavigate('dashboard');
    } catch (err: any) {
      setErrorMessage('Error al conectar con el servidor de autenticación central.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background glow effects */}
      <div className="auth-glow-top-left" />
      <div className="auth-glow-bottom-right" />

      {/* Header Corporativo SaaS */}
      <header className="auth-header" style={{ backdropFilter: 'blur(12px)', background: 'rgba(255, 255, 255, 0.95)' }}>
        <div className="container-app auth-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, var(--color-purple), #4338ca)',
                color: '#ffffff',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px var(--color-purple-glow)'
              }}
            >
              <Cpu style={{ width: '1.25rem', height: '1.25rem' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main)' }}>Avante Core Ops</span>
                <span className="badge badge-purple" style={{ fontSize: '0.625rem' }}>
                  Admin Console
                </span>
              </div>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                Consola Central de Gestión de Infraestructura & Multi-Tenant
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="btn btn-outline btn-sm"
          >
            <ArrowLeft style={{ width: '0.875rem', height: '0.875rem' }} />
            <span>Volver al Login Escolar</span>
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="auth-main">
        <div className="auth-card auth-card-purple">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
                <ShieldCheck style={{ width: '0.875rem', height: '0.875rem' }} />
                <span>Acceso Restringido • Nivel 0</span>
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                Super Administrador
              </h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                Portal para operadores de la red de colegios Avante School Management.
              </p>
            </div>
            <div
              style={{
                padding: '0.625rem',
                background: 'var(--color-purple-bg)',
                border: '1px solid var(--color-purple-border)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--color-purple)'
              }}
            >
              <Server style={{ width: '1.5rem', height: '1.5rem' }} />
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">
              <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0, marginTop: '0.125rem' }} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Credencial de Operador (Email)</label>
              <div className="auth-input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)' }}
                  placeholder="superadmin@avanteschoolmanagement.com"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Contraseña Maestra</label>
              <div className="auth-input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-purple btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? (
                <span>Validando Credenciales...</span>
              ) : (
                <>
                  <span>Ingresar a Consola Master</span>
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </>
              )}
            </button>
          </form>

          {/* Caja Informativa de Seguridad */}
          <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border-subtle)' }}>
            <div
              style={{
                background: 'var(--color-bg-base)',
                border: '1px solid var(--color-border-subtle)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                <KeyRound style={{ width: '1rem', height: '1rem', color: 'var(--color-purple)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
                  Cuenta Demo: superadmin@...
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('superadmin@avanteschoolmanagement.com');
                  setPassword('Admin123!');
                }}
                style={{ color: 'var(--color-purple)', fontWeight: 700, fontSize: '0.6875rem', textDecoration: 'underline' }}
              >
                Rellenar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer" style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
        <div className="container-app">
          Avante Global Infrastructure • TLS 1.3 Strict • PostgreSQL asm_db
        </div>
      </footer>
    </div>
  );
};
