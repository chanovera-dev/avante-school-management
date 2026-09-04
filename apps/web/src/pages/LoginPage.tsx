import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  UserCheck,
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Header Institucional */}
      <header className="border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-sky-600 text-white font-black text-xl w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-sky-600/30">
            ASM
          </div>
          <span className="font-extrabold text-lg text-white tracking-tight">Avante School Management</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-400">¿No tienes escuela registrada?</span>
          <button
            onClick={() => onNavigate('register')}
            className="text-sky-400 hover:text-sky-300 font-bold hover:underline cursor-pointer"
          >
            Registrar mi Escuela Gratis
          </button>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2.5 py-1 rounded-full mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Portal Institucional Escolar</span>
            </div>
            <h1 className="text-2xl font-black text-white">Iniciar Sesión</h1>
            <p className="text-slate-400 text-xs mt-1">
              Ingresa al sistema con la cuenta asignada por tu institución educativa.
            </p>
          </div>

          {errorMessage && (
            <div className="bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <span>{errorMessage}</span>
                {errorMessage.includes('Super Administrador') && (
                  <div>
                    <button
                      type="button"
                      onClick={() => onNavigate('superadmin')}
                      className="text-purple-300 font-bold underline hover:text-white"
                    >
                      Ir a la Consola Super Admin &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Correo Electrónico Institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none transition-all"
                  placeholder="ejemplo@colegio.edu.mx"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none font-mono transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm py-3 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Comprobando acceso...</span>
              ) : (
                <>
                  <span>Acceder al Sistema</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Cuentas Institucionales de Demostración */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase block text-center">
              Cuentas Escolares de Demostración
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('contacto@chanovera.com')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700 transition-colors"
              >
                🏫 Director Logos
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('caja@colegiohidalgo.edu.mx')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700 transition-colors"
              >
                💵 Finanzas / Caja
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('control@colegiohidalgo.edu.mx')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700 transition-colors"
              >
                🎓 Control Escolar
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('docente@colegiohidalgo.edu.mx')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700 transition-colors"
              >
                👨‍🏫 Docente Titular
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('padre@familia.com')}
                className="col-span-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700 transition-colors flex items-center justify-between"
              >
                <span>👨‍👩‍👧 Portal Familiar (Tutor Titular)</span>
                <span className="text-[10px] text-slate-400">padre@familia.com</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer con enlace discreto a consola master */}
      <footer className="border-t border-slate-800/80 py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <span>Avante School Management (ASM) • Plataforma Escolar Multi-Tenant</span>
        <button
          onClick={() => onNavigate('superadmin')}
          className="text-slate-400 hover:text-purple-400 font-mono transition-colors text-[11px] flex items-center gap-1 cursor-pointer"
        >
          <span>Consola Global Operativa (SaaS Master)</span>
          <span>&rarr;</span>
        </button>
      </footer>
    </div>
  );
};
