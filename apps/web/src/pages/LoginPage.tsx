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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
            <div className="brand-title">Avante School Management</div>
          </div>
          <div className="auth-header-action">
            <p className="auth-header-question">¿No tienes escuela registrada?</p>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-ghost"
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
            <div className="badge badge-sky">
              <Building2 />
              Portal Institucional Escolar
            </div>
            <h1 className="auth-title">
              Iniciar Sesión
            </h1>
            <p className="auth-subtitle">
              Ingresa al sistema con la cuenta asignada por tu institución educativa.
            </p>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">
              <AlertCircle />
              <div>
                <p>{errorMessage}</p>
                {errorMessage.includes('Super Administrador') && (
                  <div>
                    <button
                      type="button"
                      onClick={() => onNavigate('superadmin')}
                      className="btn btn-ghost btn-sm"
                    >
                      Ir a la Consola Super Admin &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex-col gap-4">
            <div className="form-group">
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

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="auth-input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
            >
              {loading ? (
                'Comprobando acceso...'
              ) : (
                <>
                  Acceder al Sistema
                  <ArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Cuentas Institucionales de Demostración */}
          <div className="auth-presets">
            <div className="presets-title">Cuentas Escolares de Demostración</div>
            <div className="presets-grid">
              <button
                type="button"
                onClick={() => handleQuickFill('contacto@chanovera.com')}
                className="preset-btn"
              >
                <div className="preset-role">🏫 Director Logos</div>
                <div className="preset-email">contacto@chanovera.com</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('caja@colegiohidalgo.edu.mx')}
                className="preset-btn"
              >
                <div className="preset-role">💵 Finanzas / Caja</div>
                <div className="preset-email">caja@colegiohidalgo.edu.mx</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('control@colegiohidalgo.edu.mx')}
                className="preset-btn"
              >
                <div className="preset-role">🎓 Control Escolar</div>
                <div className="preset-email">control@colegiohidalgo.edu.mx</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('docente@colegiohidalgo.edu.mx')}
                className="preset-btn"
              >
                <div className="preset-role">👨‍🏫 Docente Titular</div>
                <div className="preset-email">docente@colegiohidalgo.edu.mx</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('padre@familia.com')}
                className="preset-btn"
              >
                <div className="preset-role">👨‍👩‍👧 Portal Familiar (Tutor Titular)</div>
                <div className="preset-email">padre@familia.com</div>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer con enlace discreto a consola master */}
      <footer className="auth-footer">
        <div className="container-app auth-footer-inner">
          <p>Avante School Management (ASM) • Plataforma Escolar Multi-Tenant</p>
          <button
            onClick={() => onNavigate('superadmin')}
            className="auth-footer-btn"
          >
            Consola Global Operativa (SaaS Master) &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
};
