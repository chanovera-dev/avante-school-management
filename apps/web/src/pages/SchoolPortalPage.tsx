import React, { useState } from 'react';
import {
  ShieldCheck,
  UserCheck,
  DollarSign,
  Users,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  School,
  UserPlus,
  Lock,
  Mail,
  X,
  AlertCircle,
} from 'lucide-react';

interface SchoolPortalPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal') => void;
  onSelectRoleAndLogin: (
    role: 'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR',
    userData?: any,
    tenantData?: any
  ) => void;
  currentTenant: {
    id: string;
    name: string;
    subdomain: string;
    adminEmail?: string;
    levelsOffered?: string[];
  };
}

export const SchoolPortalPage: React.FC<SchoolPortalPageProps> = ({
  onNavigate,
  onSelectRoleAndLogin,
  currentTenant,
}) => {
  const [showStudentEnrollModal, setShowStudentEnrollModal] = useState(false);
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);

  // Modal de Login Institucional
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [targetRole, setTargetRole] = useState<'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR'>('DIRECTOR');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const openLoginModal = (role: 'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR') => {
    setTargetRole(role);
    setLoginError(null);
    setLoginEmail('');
    setLoginPassword('');
    setShowLoginModal(true);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.message || 'Correo electrónico o contraseña incorrectos.');
        setLoginLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('asm_token', data.token);
      }

      setShowLoginModal(false);
      onSelectRoleAndLogin(data.user.role, data.user, data.tenant);
    } catch (err) {
      setLoginError('Error de conexión al servidor de autenticación.');
    } finally {
      setLoginLoading(false);
    }
  };

  const [studentForm, setStudentForm] = useState({
    studentName: '',
    level: currentTenant.levelsOffered?.[0] || 'Primaria',
    grade: '1º Grado',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
  });

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSubmitted(true);
    setTimeout(() => {
      setEnrollSubmitted(false);
      setShowStudentEnrollModal(false);
      setStudentForm({
        studentName: '',
        level: currentTenant.levelsOffered?.[0] || 'Primaria',
        grade: '1º Grado',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
      });
    }, 2500);
  };

  return (
    <div className="portal-page">
      {/* HEADER INSTITUCIONAL */}
      <header className="portal-header">
        <div className="container-app portal-header-inner">
          <div className="brand-logo" onClick={() => onNavigate('home')}>
            <div className="brand-icon">ASM</div>
            <div>
              <h1 className="brand-title">
                {currentTenant.name || 'Colegio Institucional'}
              </h1>
              <div className="footer-brand-info">
                <p>{currentTenant.subdomain ? `${currentTenant.subdomain}.avanteschoolmanagement.local` : 'avanteschoolmanagement.local'}</p>
                <p>•</p>
                <p className="footer-brand-name">Portal Oficial</p>
              </div>
            </div>
          </div>

          <div className="nav-actions">
            <button
              onClick={() => onNavigate('home')}
              className="btn btn-ghost btn-sm"
            >
              ← Volver al Inicio
            </button>
            <button
              onClick={() => openLoginModal('DIRECTOR')}
              className="btn btn-primary btn-sm"
            >
              Panel de Administración
              <ChevronRight />
            </button>
          </div>
        </div>
      </header>

      {/* HERO INSTITUCIONAL */}
      <main className="container-app portal-main">
        <div className="portal-hero">
          <div>
            <div className="badge badge-sky">
              <Sparkles />
              Ciclo Escolar 2026 - 2027
            </div>
          </div>
          <h2>
            Bienvenido al Portal de <br />
            <strong className="text-gradient">
              {currentTenant.name || 'Colegio Institucional'}
            </strong>
          </h2>
          <p>
            {currentTenant.levelsOffered && currentTenant.levelsOffered.length > 0 ? (
              <>
                Niveles Incorporados:{' '}
                {currentTenant.levelsOffered.map((lvl, idx) => (
                  <strong key={lvl}>
                    {idx > 0 ? ' • ' : ''}
                    {lvl}
                  </strong>
                ))}
                . Selecciona tu perfil institucional para ingresar o solicita la admisión de un nuevo alumno.
              </>
            ) : (
              'Selecciona tu perfil institucional para ingresar o solicita la admisión de un nuevo alumno.'
            )}
          </p>
        </div>

        {/* BOTÓN DESTACADO: INSCRIPCIÓN DE ALUMNOS */}
        <div className="portal-admission-banner">
          <div className="banner-text">
            <div>
              <div className="badge badge-emerald">
                <UserPlus />
                Inscripciones y Admisiones Abiertas
              </div>
            </div>
            <h3>¿Deseas inscribir a tu hijo(a) en nuestro colegio?</h3>
            <p>
              Completa la solicitud de admisión en línea en menos de 2 minutos. Recibirás tu folio de matrícula escolar y ficha de ingreso.
            </p>
          </div>

          <button
            onClick={() => setShowStudentEnrollModal(true)}
            className="btn btn-banner btn-lg"
          >
            Iniciar Solicitud de Inscripción
            <ArrowRight />
          </button>
        </div>

        {/* ACCESOS POR PERFILES INSTITUCIONALES */}
        <div className="portal-roles-section">
          <div className="portal-roles-header">
            <h3>
              <School />
              Accesos al Sistema por Perfil Institucional
            </h3>
            <p>Selecciona tu área de trabajo</p>
          </div>

          <div className="portal-roles-grid">
            {/* 1. DIRECTORES */}
            <div className="portal-role-card">
              <div>
                <div className="role-icon">
                  <ShieldCheck />
                </div>
                <h4>Portal de Directores</h4>
                <p>
                  Acceso para Director General, Directora de Preescolar y Director de Primaria.
                </p>
              </div>

              <button
                onClick={() => openLoginModal('DIRECTOR')}
                className="btn btn-secondary btn-sm"
              >
                Entrar como Director
                <ChevronRight />
              </button>
            </div>

            {/* 2. MAESTROS / DOCENTES */}
            <div className="portal-role-card">
              <div>
                <div className="role-icon">
                  <UserCheck />
                </div>
                <h4>Portal de Maestros</h4>
                <p>
                  Acceso para docentes de Kínder y Primaria para pase de lista y captura de evaluaciones.
                </p>
              </div>

              <button
                onClick={() => openLoginModal('DOCENTE')}
                className="btn btn-secondary btn-sm"
              >
                Entrar como Maestro
                <ChevronRight />
              </button>
            </div>

            {/* 3. PERSONAL ADMINISTRATIVO / CAJA */}
            <div className="portal-role-card">
              <div>
                <div className="role-icon">
                  <DollarSign />
                </div>
                <h4>Finanzas y Recepción</h4>
                <p>
                  Acceso para personal de caja en ventanilla, arqueos y control de colegiaturas.
                </p>
              </div>

              <button
                onClick={() => openLoginModal('FINANZAS')}
                className="btn btn-secondary btn-sm"
              >
                Entrar a Caja Escolar
                <ChevronRight />
              </button>
            </div>

            {/* 4. PADRES Y FAMILIAS */}
            <div className="portal-role-card">
              <div>
                <div className="role-icon">
                  <Users />
                </div>
                <h4>Portal de Familias</h4>
                <p>
                  Acceso para padres de familia con boletas, avisos y pago de cuotas con CoDi®.
                </p>
              </div>

              <button
                onClick={() => openLoginModal('TUTOR')}
                className="btn btn-secondary btn-sm"
              >
                Entrar como Tutor
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE PREINSCRIPCIÓN DE ALUMNOS */}
      {showStudentEnrollModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <div className="badge badge-emerald">
                  Admisiones 2026-2027
                </div>
                <h3 className="modal-title">Solicitud de Inscripción en Línea</h3>
              </div>
              <button
                onClick={() => setShowStudentEnrollModal(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            {enrollSubmitted ? (
              <div className="flex-col flex-center gap-3">
                <div className="badge badge-emerald">
                  <CheckCircle2 />
                </div>
                <h4 className="modal-title">
                  ¡Solicitud Registrada con Éxito!
                </h4>
                <p className="auth-subtitle">
                  Hemos enviado los datos de preinscripción y ficha de pago a <strong>{studentForm.parentEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} className="flex-col gap-3">
                <div className="form-group">
                  <label className="form-label">Nombre Completo del Aspirante</label>
                  <input
                    type="text"
                    required
                    value={studentForm.studentName}
                    onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                    placeholder="Ej. Santiago Morales Cruz"
                    className="form-input"
                  />
                </div>

                <div className="grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Nivel Escolar</label>
                    <select
                      value={studentForm.level}
                      onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value })}
                      className="form-select"
                    >
                      {currentTenant.levelsOffered && currentTenant.levelsOffered.length > 0 ? (
                        currentTenant.levelsOffered.map((lvl) => (
                          <option key={lvl} value={lvl}>
                            {lvl}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="Primaria">Primaria</option>
                        </>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Grado Solicitado</label>
                    <input
                      type="text"
                      required
                      value={studentForm.grade}
                      onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                      placeholder="Ej. 1º Grado"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Nombre del Padre o Tutor</label>
                    <input
                      type="text"
                      required
                      value={studentForm.parentName}
                      onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                      placeholder="Ej. Roberto Morales"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      required
                      value={studentForm.parentPhone}
                      onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                      placeholder="Ej. 921 555 9988"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico del Tutor</label>
                  <input
                    type="email"
                    required
                    value={studentForm.parentEmail}
                    onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                    placeholder="tutor@ejemplo.com"
                    className="form-input"
                  />
                </div>

                <div className="flex-row-between gap-3">
                  <button
                    type="button"
                    onClick={() => setShowStudentEnrollModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    <CheckCircle2 />
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE INICIO DE SESIÓN INSTITUCIONAL */}
      {showLoginModal && (
        <div className="modal-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowLoginModal(false)}
              className="modal-close"
              title="Cerrar ventana"
            >
              <X size={18} />
            </button>

            <div className="modal-header">
              <div>
                <div className="badge badge-sky">
                  <ShieldCheck size={14} />
                  {targetRole === 'DIRECTOR'
                    ? 'Portal de Directores'
                    : targetRole === 'DOCENTE'
                    ? 'Portal Docente'
                    : targetRole === 'FINANZAS'
                    ? 'Caja y Finanzas'
                    : 'Portal Familiar'}
                </div>
                <h3 className="modal-title" style={{ marginTop: '0.5rem' }}>
                  {targetRole === 'DIRECTOR'
                    ? 'Acceso Directivo Institucional'
                    : 'Iniciar Sesión Institucional'}
                </h3>
                <p className="modal-subtitle">
                  {currentTenant.name ? currentTenant.name : 'Ingresa con tus credenciales'}
                </p>
              </div>
            </div>

            {loginError && (
              <div className="alert alert-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <AlertCircle size={18} />
                <p style={{ margin: 0, fontSize: '0.875rem' }}>{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label">Correo Electrónico Institucional</label>
                <div className="auth-input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="form-input"
                    placeholder="ejemplo@colegio.edu.mx"
                    autoFocus
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="btn btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="btn btn-primary"
                >
                  {loginLoading ? 'Comprobando acceso...' : 'Ingresar al Sistema'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container-app footer-content">
          <p>{currentTenant.name} • Portal Institucional Multi-Rol</p>
          <p className="footer-host">
            {currentTenant.subdomain}.avanteschoolmanagement.local
          </p>
        </div>
      </footer>
    </div>
  );
};
