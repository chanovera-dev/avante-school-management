import React, { useState } from 'react';
import {
  ShieldAlert,
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Corporativo SaaS */}
      <header className="border-b border-slate-800/80 py-4 backdrop-blur-md bg-slate-950/60 z-10">
        <div className="container-app flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-lg w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight">Avante Core Ops</span>
                <span className="bg-purple-900/60 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-700/60 tracking-wider uppercase">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Consola Central de Gestión de Infraestructura & Multi-Tenant</p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Login Escolar</span>
          </button>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 z-10">
        <div className="max-w-md w-full bg-slate-900/90 border border-purple-900/40 p-8 rounded-3xl shadow-2xl shadow-purple-950/40 backdrop-blur-xl space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/60 px-2.5 py-1 rounded-full mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Acceso Restringido • Nivel 0</span>
              </div>
              <h1 className="text-2xl font-black text-white">Super Administrador</h1>
              <p className="text-slate-400 text-xs mt-1">
                Portal para operadores de la red de colegios Avante School Management.
              </p>
            </div>
            <div className="p-2.5 bg-purple-900/30 border border-purple-800/50 rounded-2xl text-purple-400">
              <Server className="w-6 h-6" />
            </div>
          </div>

          {errorMessage && (
            <div className="bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 tracking-wider">
                Credencial de Operador (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-mono"
                  placeholder="superadmin@avanteschoolmanagement.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 tracking-wider">
                Contraseña Maestra
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm py-3 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Validando Credenciales...</span>
              ) : (
                <>
                  <span>Ingresar a Consola Master</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Caja Informativa de Seguridad */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <KeyRound className="w-4 h-4 text-purple-400" />
                <span className="font-mono text-[11px]">Cuenta Demo: superadmin@...</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEmail('superadmin@avanteschoolmanagement.com');
                  setPassword('Admin123!');
                }}
                className="text-purple-400 hover:text-purple-300 font-bold text-[11px] hover:underline"
              >
                Rellenar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500 z-10 font-mono">
        <div className="container-app">
          Avante Global Infrastructure • TLS 1.3 Strict • PostgreSQL asm_db
        </div>
      </footer>
    </div>
  );
};
