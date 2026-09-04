import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard') => void;
  onLoginSuccess: (userRole: 'SUPER_ADMIN' | 'DIRECTOR' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('director@colegiohidalgo.edu.mx');
  const [password, setPassword] = useState('Admin123!');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('superadmin')) {
      onLoginSuccess('SUPER_ADMIN');
    } else if (email.includes('caja') || email.includes('finanzas')) {
      onLoginSuccess('FINANZAS');
    } else if (email.includes('control')) {
      onLoginSuccess('CONTROL_ESCOLAR');
    } else if (email.includes('padre') || email.includes('tutor')) {
      onLoginSuccess('TUTOR');
    } else {
      onLoginSuccess('DIRECTOR');
    }
    onNavigate('dashboard');
  };

  const handleQuickDemo = (role: 'SUPER_ADMIN' | 'DIRECTOR' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR') => {
    onLoginSuccess(role);
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-sky-600 text-white font-black text-xl w-9 h-9 rounded-xl flex items-center justify-center">
            ASM
          </div>
          <span className="font-extrabold text-lg text-white">Avante School Management</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-slate-400">¿No tienes escuela registrada?</span>
          <button
            onClick={() => onNavigate('register')}
            className="text-sky-400 hover:text-sky-300 font-bold hover:underline"
          >
            Registrar mi Escuela Gratis
          </button>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">Iniciar Sesión</h1>
            <p className="text-slate-400 text-xs">
              Ingresa al panel de administración de tu institución escolar.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none"
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
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-sm py-3 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Acceder al Sistema</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Acceso Rápido para Pruebas (Demo Role Switcher) */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase block text-center">
              Acceso Rápido por Rol (Demostración)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickDemo('DIRECTOR')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700"
              >
                🏫 Director General
              </button>
              <button
                onClick={() => handleQuickDemo('FINANZAS')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700"
              >
                💵 Caja & Finanzas
              </button>
              <button
                onClick={() => handleQuickDemo('CONTROL_ESCOLAR')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700"
              >
                🎓 Control Escolar
              </button>
              <button
                onClick={() => handleQuickDemo('TUTOR')}
                className="bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs py-2 px-3 rounded-lg font-medium text-left border border-slate-700"
              >
                👨‍👩‍👧 Portal Familiar
              </button>
            </div>
            <button
              onClick={() => handleQuickDemo('SUPER_ADMIN')}
              className="w-full bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 text-xs py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Panel SuperAdmin (Dueño SaaS ASM)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        Avante School Management (ASM) • Dominio de desarrollo: avanteschoolmanagement.local
      </footer>
    </div>
  );
};
