import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal' | 'superadmin') => void;
  onLoginSuccess: (
    userRole: 'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR',
    userData?: any,
    tenantData?: any
  ) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('contacto@chanovera.com');
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
        setErrorMessage(data.message || 'Correo o contraseña incorrectos.');
        setLoading(false);
        return;
      }

      // Proteger la frontera: SuperAdmin debe usar la consola master dedicada
      if (data.user?.role === 'SUPER_ADMIN') {
        setErrorMessage(
          'Esta cuenta corresponde al Super Administrador Global. Por seguridad, debes ingresar por la Consola Master dedicada.'
        );
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('asm_token', data.token);
      }

      onLoginSuccess(data.user.role, data.user, data.tenant);
      onNavigate('dashboard');
    } catch (err) {
      setErrorMessage('Error al comunicarse con el servidor de autenticación.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('Admin123!');
    setErrorMessage(null);
  };

  return (
    <div className="auth-page">
      {/* Header Institucional */}
      <header className="auth-header">
        <div className="container-app auth-header-inner">
          <div className="brand-logo" onClick={() => onNavigate('home')}>
            <div className="brand-icon">ASM</div>
            <span className="brand-title">Avante School Management</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>¿No tienes escuela registrada?</span>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-ghost"
              style={{ color: 'var(--color-primary-hover)', fontWeight: 700 }}
            >
              Registrar mi Escuela Gratis
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="auth-main">
        <div className="auth-card">
          <div>
            <div className="badge badge-sky" style={{ marginBottom: '0.75rem' }}>
              <Building2 style={{ width: '0.875rem', height: '0.875rem' }} />
              <span>Portal Institucional Escolar</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
              Iniciar Sesión
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
              Ingresa al sistema con la cuenta asignada por tu institución educativa.
            </p>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">
              <AlertCircle style={{ width: '1rem', height: '1rem', flexShrink: 0, marginTop: '0.125rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <span>{errorMessage}</span>
                {errorMessage.includes('Super Administrador') && (
                  <div>
                    <button
                      type="button"
                      onClick={() => onNavigate('superadmin')}
                      style={{ color: '#d8b4fe', fontWeight: 700, textDecoration: 'underline' }}
                    >
                      Ir a la Consola Super Admin &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Correo Electrónico Institucional</label>
              <div className="auth-input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="ejemplo@colegio.edu.mx"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Contraseña</label>
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
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? (
                <span>Comprobando acceso...</span>
              ) : (
                <>
                  <span>Acceder al Sistema</span>
                  <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </>
              )}
            </button>
          </form>

          {/* Cuentas Institucionales de Demostración */}
          <div className="auth-presets">
            <span className="presets-title">Cuentas Escolares de Demostración</span>
            <div className="presets-grid">
              <button
                type="button"
                onClick={() => handleQuickFill('contacto@chanovera.com')}
                className="preset-btn"
              >
                <span className="preset-role">🏫 Director Logos</span>
                <span className="preset-email">contacto@chanovera.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('caja@colegiohidalgo.edu.mx')}
                className="preset-btn"
              >
                <span className="preset-role">💵 Finanzas / Caja</span>
                <span className="preset-email">caja@colegiohidalgo.edu.mx</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('control@colegiohidalgo.edu.mx')}
                className="preset-btn"
              >
                <span className="preset-role">🎓 Control Escolar</span>
                <span className="preset-email">control@colegiohidalgo.edu.mx</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('docente@colegiohidalgo.edu.mx')}
                className="preset-btn"
              >
                <span className="preset-role">👨‍🏫 Docente Titular</span>
                <span className="preset-email">docente@colegiohidalgo.edu.mx</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('padre@familia.com')}
                className="preset-btn"
                style={{ gridColumn: 'span 2' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="preset-role">👨‍👩‍👧 Portal Familiar (Tutor Titular)</span>
                  <span className="preset-email">padre@familia.com</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer con enlace discreto a consola master */}
      <footer className="auth-footer">
        <div className="container-app" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span>Avante School Management (ASM) • Plataforma Escolar Multi-Tenant</span>
          <button
            onClick={() => onNavigate('superadmin')}
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <span>Consola Global Operativa (SaaS Master)</span>
            <span>&rarr;</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
