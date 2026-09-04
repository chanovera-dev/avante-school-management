import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SuperAdminLoginPage } from './pages/SuperAdminLoginPage.js';
import { SuperAdminDashboardPage } from './pages/SuperAdminDashboardPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { SchoolPortalPage } from './pages/SchoolPortalPage.js';
import { Globe, School, LayoutDashboard, Sparkles, ShieldCheck, LogIn, AlertCircle } from 'lucide-react';

export function App() {
  // Función para determinar si el usuario accedió a través de un subdominio institucional o admin
  const detectSubdomain = () => {
    if (typeof window === 'undefined') return { isSubdomain: false, subdomain: '', isAdmin: false };

    const hostname = window.location.hostname.toLowerCase();

    // 1. Dominios principales raíz (sin subdominio)
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === 'avanteschoolmanagement.local' ||
      hostname === 'www.avanteschoolmanagement.local'
    ) {
      return { isSubdomain: false, subdomain: '', isAdmin: false };
    }

    // 2. Subdominio dedicado para operadores globales de la plataforma
    if (hostname.startsWith('admin.')) {
      return { isSubdomain: true, subdomain: 'admin', isAdmin: true };
    }

    // 3. Subdominios de escuelas (ej. colhidalgo.localhost o mi-colegio.avanteschoolmanagement.local)
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

    return { isSubdomain: false, subdomain: '', isAdmin: false };
  };

  const detected = detectSubdomain();

  // Ruta inicial: 'superadmin' si es admin.*, 'portal' si es subdominio escolar, de lo contrario 'home'
  const [currentRoute, setCurrentRoute] = useState<
    'home' | 'register' | 'login' | 'dashboard' | 'portal' | 'superadmin'
  >(
    detected.isAdmin ? 'superadmin' : detected.isSubdomain ? 'portal' : 'home'
  );

  const [activeRole, setActiveRole] = useState<'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR'>('DIRECTOR');
  
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(detected.isSubdomain && !detected.isAdmin);
  const [subdomainNotFound, setSubdomainNotFound] = useState(false);

  const [currentTenant, setCurrentTenant] = useState<{
    id: string;
    name: string;
    subdomain: string;
    adminEmail?: string;
    levelsOffered?: string[];
  }>({
    id: '',
    name: detected.subdomain ? `Colegio ${detected.subdomain}` : '',
    subdomain: detected.subdomain || '',
    adminEmail: '',
    levelsOffered: [],
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
      setIsCheckingSubdomain(false);
      setSubdomainNotFound(false);
    } else if (isSubdomain) {
      setIsCheckingSubdomain(true);
      fetch(`/api/tenants/by-subdomain/${subdomain}`)
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setCurrentTenant({
              id: data.id,
              name: data.name,
              subdomain: data.subdomain,
              adminEmail: data.contactEmail,
              levelsOffered: data.levelsOffered || [],
            });
            setCurrentRoute('portal');
            setSubdomainNotFound(false);
          } else {
            // El colegio fue eliminado o no existe en la base de datos
            setSubdomainNotFound(true);
          }
        })
        .catch(() => {
          setSubdomainNotFound(true);
        })
        .finally(() => {
          setIsCheckingSubdomain(false);
        });
    } else {
      // Si está en localhost puro o avanteschoolmanagement.local puro, muestra home a menos que esté navegando
      if (currentRoute === 'portal' && !isSubdomain) {
        setCurrentRoute('home');
      }
      setIsCheckingSubdomain(false);
      setSubdomainNotFound(false);
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
      {/* 1. Comprobando validez del subdominio institucional */}
      {isCheckingSubdomain && (
        <div className="portal-page flex-col flex-1 flex-center" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <div className="flex-col flex-center gap-3">
            <div className="brand-icon">ASM</div>
            <p className="font-bold text-slate-700">Verificando institución educativa...</p>
          </div>
        </div>
      )}

      {/* 2. Subdominio no encontrado / Colegio eliminado (404) */}
      {!isCheckingSubdomain && subdomainNotFound && (
        <div className="portal-page flex-col flex-1 flex-center" style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <main className="container-app empty-tenant-main">
            <div className="empty-tenant-card">
              <div className="empty-tenant-icon" style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)' }}>
                <AlertCircle className="w-12 h-12" />
              </div>
              <h2 className="empty-tenant-title">Colegio No Encontrado (Error 404)</h2>
              <p className="empty-tenant-desc">
                La institución educativa asociada al subdominio <strong>"{detected.subdomain}"</strong> no está registrada en el sistema o fue eliminada definitivamente de la base de datos.
              </p>
              <div className="empty-tenant-actions">
                <button
                  onClick={() => {
                    window.location.href = `${window.location.protocol}//localhost:${window.location.port || '3000'}/`;
                  }}
                  className="btn btn-primary btn-lg cursor-pointer"
                >
                  <Globe className="w-5 h-5" />
                  Ir al Portal Principal (ASM)
                </button>
                <button
                  onClick={() => {
                    setSubdomainNotFound(false);
                    setCurrentRoute('register');
                  }}
                  className="btn btn-secondary btn-lg cursor-pointer"
                >
                  Registrar una Escuela
                </button>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Vistas según ruta si el subdominio es válido o no hay error */}
      {!isCheckingSubdomain && !subdomainNotFound && currentRoute === 'home' && <HomePage onNavigate={setCurrentRoute} />}
      
      {!isCheckingSubdomain && !subdomainNotFound && currentRoute === 'register' && (
        <RegisterPage
          onNavigate={setCurrentRoute}
          onSchoolRegistered={handleSchoolRegistered}
        />
      )}

      {!isCheckingSubdomain && !subdomainNotFound && currentRoute === 'login' && (
        <LoginPage
          onNavigate={setCurrentRoute}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {!isCheckingSubdomain && !subdomainNotFound && currentRoute === 'superadmin' && (
        <SuperAdminLoginPage
          onNavigate={setCurrentRoute}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {!isCheckingSubdomain && !subdomainNotFound && currentRoute === 'portal' && (
        <SchoolPortalPage
          onNavigate={setCurrentRoute}
          onSelectRoleAndLogin={handleLoginSuccess}
          currentTenant={currentTenant}
        />
      )}

      {!isCheckingSubdomain && !subdomainNotFound && currentRoute === 'dashboard' && (
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
          title="Portal Institucional Escolar"
        >
          <School />
          Portal Escolar
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
