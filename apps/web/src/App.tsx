import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SuperAdminLoginPage } from './pages/SuperAdminLoginPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { SchoolPortalPage } from './pages/SchoolPortalPage.js';
import { Globe, School, LayoutDashboard, Sparkles, ShieldCheck, LogIn } from 'lucide-react';

export function App() {
  // Función para determinar si el usuario accedió a través de un subdominio institucional o admin
  const detectSubdomain = () => {
    if (typeof window === 'undefined') return { isSubdomain: false, subdomain: 'institutologos', isAdmin: false };

    const hostname = window.location.hostname.toLowerCase();

    // 1. Dominios principales raíz (sin subdominio)
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === 'avanteschoolmanagement.local' ||
      hostname === 'www.avanteschoolmanagement.local'
    ) {
      return { isSubdomain: false, subdomain: 'institutologos', isAdmin: false };
    }

    // 2. Subdominio dedicado para operadores globales de la plataforma
    if (hostname.startsWith('admin.')) {
      return { isSubdomain: true, subdomain: 'admin', isAdmin: true };
    }

    // 3. Subdominios de escuelas (ej. institutologos.localhost o logos.avanteschoolmanagement.local)
    const parts = hostname.split('.');
    if (parts.length > 1) {
      const sub = parts[0];
      if (sub === 'admin') {
        return { isSubdomain: true, subdomain: 'admin', isAdmin: true };
      }
      if (sub !== 'www' && sub !== 'app' && sub !== 'api') {
        return { isSubdomain: true, subdomain: sub, isAdmin: false };
      }
    }

    return { isSubdomain: false, subdomain: 'institutologos', isAdmin: false };
  };

  const detected = detectSubdomain();

  // Ruta inicial: 'superadmin' si es admin.*, 'portal' si es subdominio escolar, de lo contrario 'home'
  const [currentRoute, setCurrentRoute] = useState<
    'home' | 'register' | 'login' | 'dashboard' | 'portal' | 'superadmin'
  >(
    detected.isAdmin ? 'superadmin' : detected.isSubdomain ? 'portal' : 'home'
  );

  const [activeRole, setActiveRole] = useState<'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR'>('DIRECTOR');
  
  const [currentTenant, setCurrentTenant] = useState<{
    id: string;
    name: string;
    subdomain: string;
    adminEmail?: string;
  }>({
    id: 'tenant-logos-01',
    name: detected.subdomain === 'institutologos' || detected.subdomain === 'logos' ? 'Instituto Logos' : `Colegio ${detected.subdomain}`,
    subdomain: detected.subdomain,
    adminEmail: 'contacto@chanovera.com',
  });

  // Si cambia el hostname o se detecta subdominio
  useEffect(() => {
    const { isSubdomain, subdomain, isAdmin } = detectSubdomain();
    if (isAdmin) {
      setCurrentRoute('superadmin');
      setActiveRole('SUPER_ADMIN');
      setCurrentTenant({
        id: 'platform-master',
        name: 'Avante School Management (Plataforma Global)',
        subdomain: 'admin',
        adminEmail: 'superadmin@avanteschoolmanagement.com',
      });
    } else if (isSubdomain) {
      setCurrentRoute('portal');
      setCurrentTenant((prev) => ({
        ...prev,
        subdomain,
        name: subdomain === 'institutologos' || subdomain === 'logos' ? 'Instituto Logos' : `Colegio ${subdomain}`,
      }));
    } else {
      // Si está en localhost puro o avanteschoolmanagement.local puro, muestra home a menos que esté navegando
      if (currentRoute === 'portal' && !isSubdomain) {
        setCurrentRoute('home');
      }
    }
  }, []);

  const handleSchoolRegistered = (school: {
    id: string;
    name: string;
    subdomain: string;
    adminEmail: string;
  }) => {
    setCurrentTenant({
      id: school.id,
      name: school.name,
      subdomain: school.subdomain,
      adminEmail: school.adminEmail,
    });
    setActiveRole('DIRECTOR');
    setCurrentRoute('dashboard');
  };

  const handleLoginSuccess = (
    role: 'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR',
    userData?: any,
    tenantData?: any
  ) => {
    setActiveRole(role);
    if (tenantData) {
      setCurrentTenant({
        id: tenantData.id,
        name: tenantData.name,
        subdomain: tenantData.subdomain,
        adminEmail: userData?.email || tenantData.contactEmail,
      });
    }
    setCurrentRoute('dashboard');
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Vistas según ruta */}
      {currentRoute === 'home' && <HomePage onNavigate={setCurrentRoute} />}
      
      {currentRoute === 'register' && (
        <RegisterPage
          onNavigate={setCurrentRoute}
          onSchoolRegistered={handleSchoolRegistered}
        />
      )}

      {currentRoute === 'login' && (
        <LoginPage
          onNavigate={setCurrentRoute}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentRoute === 'superadmin' && (
        <SuperAdminLoginPage
          onNavigate={setCurrentRoute}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentRoute === 'portal' && (
        <SchoolPortalPage
          onNavigate={setCurrentRoute}
          onSelectRoleAndLogin={handleLoginSuccess}
          currentTenant={currentTenant}
        />
      )}

      {currentRoute === 'dashboard' && (
        <DashboardPage
          onNavigate={setCurrentRoute}
          activeRole={activeRole}
          setActiveRole={setActiveRole}
          currentTenant={currentTenant}
        />
      )}

      {/* BARRA FLOTANTE DE DESARROLLO LOCAL (Para alternar fácilmente entre dominios y accesos) */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 px-4 py-2 rounded-2xl shadow-2xl flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-300">
        <div className="flex items-center gap-1.5 text-sky-400 font-bold mr-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Navegación Rápida:</span>
        </div>

        <button
          onClick={() => setCurrentRoute('home')}
          className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentRoute === 'home' ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Página Principal (Landing pública)"
        >
          <Globe className="w-3 h-3" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentRoute('portal')}
          className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentRoute === 'portal' ? 'bg-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-400/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Portal Escolar de Instituto Logos"
        >
          <School className="w-3 h-3" />
          <span>Portal Logos</span>
        </button>

        <button
          onClick={() => setCurrentRoute('login')}
          className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentRoute === 'login' ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Login Institucional de Colegios"
        >
          <LogIn className="w-3 h-3" />
          <span>Login Escolar</span>
        </button>

        <button
          onClick={() => setCurrentRoute('superadmin')}
          className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentRoute === 'superadmin' ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30' : 'hover:bg-slate-800 text-purple-400 hover:text-purple-300'
          }`}
          title="Consola Master Exclusiva para Super Administrador"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-bold">SuperAdmin</span>
        </button>

        <button
          onClick={() => setCurrentRoute('dashboard')}
          className={`px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
            currentRoute === 'dashboard' ? 'bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
          }`}
          title="Ver Panel Escolar Interno"
        >
          <LayoutDashboard className="w-3 h-3" />
          <span>Dashboard</span>
        </button>
      </div>
    </div>
  );
}

export default App;
