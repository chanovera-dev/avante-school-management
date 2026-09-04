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
      <header className="auth-header">
        <div className="container-app auth-header-inner">
          <div className="auth-header-brand">
            <div className="auth-header-brand-icon">
              <Cpu />
            </div>
            <div>
              <div className="auth-header-brand-title">
                <h2>Avante Core Ops</h2>
                <div className="badge badge-purple badge-xs">
                  Admin Console
                </div>
              </div>
              <p className="auth-header-brand-desc">
                Consola Central de Gestión de Infraestructura & Multi-Tenant
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="btn btn-outline btn-sm"
          >
            <ArrowLeft />
            Volver al Login Escolar
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="auth-main">
        <div className="auth-card auth-card-purple">
          <div className="auth-card-header">
            <div>
              <div className="badge badge-purple mb-3">
                <ShieldCheck />
                Acceso Restringido • Nivel 0
              </div>
              <h1 className="auth-title">
                Super Administrador
              </h1>
              <p className="auth-subtitle">
                Portal para operadores de la red de colegios Avante School Management.
              </p>
            </div>
            <div className="auth-card-header-icon">
              <Server />
            </div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">
              <AlertCircle />
              <p className="m-0">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group mb-0">
              <label className="form-label">Credencial de Operador (Email)</label>
              <div className="auth-input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input font-mono"
                  placeholder="superadmin@avanteschoolmanagement.com"
                />
              </div>
            </div>

            <div className="form-group mb-0">
              <label className="form-label">Contraseña Maestra</label>
              <div className="auth-input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-purple btn-lg w-full mt-2"
            >
              {loading ? (
                'Validando Credenciales...'
              ) : (
                <>
                  Ingresar a Consola Master
                  <ArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Caja Informativa de Seguridad */}
          <div className="auth-card-demo-box">
            <div className="auth-demo-card">
              <div className="auth-demo-card-left">
                <KeyRound />
                <p>
                  Cuenta Demo: superadmin@...
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('superadmin@avanteschoolmanagement.com');
                  setPassword('Admin123!');
                }}
                className="auth-demo-card-btn"
              >
                Rellenar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer text-center font-mono">
        <div className="container-app">
          Avante Global Infrastructure • TLS 1.3 Strict • PostgreSQL asm_db
        </div>
      </footer>
    </div>
  );
};
