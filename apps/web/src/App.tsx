import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SuperAdminLoginPage } from './pages/SuperAdminLoginPage.js';
import { SuperAdminDashboardPage } from './pages/SuperAdminDashboardPage.js';
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
    levelsOffered?: string[];
  }>({
    id: 'tenant-logos-01',
    name: detected.subdomain === 'institutologos' || detected.subdomain === 'logos' ? 'Instituto Logos' : `Colegio ${detected.subdomain}`,
    subdomain: detected.subdomain,
    adminEmail: 'contacto@chanovera.com',
    levelsOffered: ['PREESCOLAR', 'PRIMARIA'],
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
    levelsOffered?: string[];
  }) => {
    setCurrentTenant({
      id: school.id,
      name: school.name,
      subdomain: school.subdomain,
      adminEmail: school.adminEmail,
      levelsOffered: school.levelsOffered,
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
        levelsOffered: tenantData.levelsOffered,
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
        activeRole === 'SUPER_ADMIN' ? (
          <SuperAdminDashboardPage
            onNavigate={setCurrentRoute}
            onSwitchToSchool={(tenant) => {
              setCurrentTenant(tenant);
              setActiveRole('DIRECTOR');
              setCurrentRoute('dashboard');
            }}
          />
        ) : (
          <DashboardPage
            key={currentTenant.id}
            onNavigate={setCurrentRoute}
            activeRole={activeRole}
            setActiveRole={setActiveRole}
            currentTenant={currentTenant}
          />
        )
      )}

      {/* BARRA FLOTANTE DE DESARROLLO LOCAL (Para alternar fácilmente entre dominios y accesos) */}
      <div className="dev-floating-bar">
        <div className="dev-floating-title">
          <Sparkles />
          <div>Navegación Rápida:</div>
        </div>

        <button
          onClick={() => setCurrentRoute('home')}
          className={`dev-btn ${currentRoute === 'home' ? 'active-home' : ''}`}
          title="Página Principal (Landing pública)"
        >
          <Globe />
          Home
        </button>

        <button
          onClick={() => setCurrentRoute('portal')}
          className={`dev-btn ${currentRoute === 'portal' ? 'active-portal' : ''}`}
          title="Portal Escolar de Instituto Logos"
        >
          <School />
          Portal Logos
        </button>

        <button
          onClick={() => setCurrentRoute('login')}
          className={`dev-btn ${currentRoute === 'login' ? 'active-login' : ''}`}
          title="Login Institucional de Colegios"
        >
          <LogIn />
          Login Escolar
        </button>

        <button
          onClick={() => setCurrentRoute('superadmin')}
          className={`dev-btn ${currentRoute === 'superadmin' ? 'active-sa' : ''}`}
          title="Consola Master Exclusiva para Super Administrador"
        >
          <ShieldCheck />
          SuperAdmin
        </button>

        <button
          onClick={() => setCurrentRoute('dashboard')}
          className={`dev-btn ${currentRoute === 'dashboard' ? 'active-dash' : ''}`}
          title="Ver Panel Escolar Interno"
        >
          <LayoutDashboard />
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default App;
