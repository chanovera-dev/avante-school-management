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
  UserPlus
} from 'lucide-react';

interface SchoolPortalPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal') => void;
  onSelectRoleAndLogin: (role: 'SUPER_ADMIN' | 'DIRECTOR' | 'DOCENTE' | 'CONTROL_ESCOLAR' | 'FINANZAS' | 'TUTOR') => void;
  currentTenant: {
    id: string;
    name: string;
    subdomain: string;
    adminEmail?: string;
  };
}

export const SchoolPortalPage: React.FC<SchoolPortalPageProps> = ({
  onNavigate,
  onSelectRoleAndLogin,
  currentTenant,
}) => {
  const [showStudentEnrollModal, setShowStudentEnrollModal] = useState(false);
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);

  const [studentForm, setStudentForm] = useState({
    studentName: '',
    level: 'Primaria',
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
        level: 'Primaria',
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
                {currentTenant.name || 'Instituto Logos'}
              </h1>
              <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', gap: '0.5rem' }}>
                <span>{currentTenant.subdomain || 'institutologos'}.avanteschoolmanagement.local</span>
                <span>•</span>
                <span style={{ color: 'var(--color-primary-hover)', fontWeight: 600 }}>Portal Oficial</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => onNavigate('home')}
              className="btn btn-ghost btn-sm"
            >
              ← Volver al Inicio
            </button>
            <button
              onClick={() => {
                onSelectRoleAndLogin('DIRECTOR');
                onNavigate('dashboard');
              }}
              className="btn btn-primary btn-sm"
            >
              <span>Panel de Administración</span>
              <ChevronRight style={{ width: '0.875rem', height: '0.875rem' }} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO INSTITUCIONAL */}
      <main className="container-app portal-main">
        <div className="portal-hero">
          <div>
            <div className="badge badge-sky">
              <Sparkles style={{ width: '0.875rem', height: '0.875rem' }} />
              <span>Ciclo Escolar 2026 - 2027</span>
            </div>
          </div>
          <h2>
            Bienvenido al Portal de <br />
            <span className="text-gradient">
              {currentTenant.name || 'Instituto Logos'}
            </span>
          </h2>
          <p>
            Niveles Incorporados: <strong style={{ color: '#f472b6' }}>🎨 Preescolar</strong> y{' '}
            <strong style={{ color: 'var(--color-primary-hover)' }}>🎒 Primaria</strong>. Selecciona tu perfil institucional para ingresar o solicita la inscripción de un nuevo alumno.
          </p>
        </div>

        {/* BOTÓN DESTACADO: INSCRIPCIÓN DE ALUMNOS */}
        <div className="portal-admission-banner">
          <div className="banner-text">
            <div>
              <div className="badge badge-emerald">
                <UserPlus style={{ width: '0.875rem', height: '0.875rem' }} />
                <span>Inscripciones y Admisiones Abiertas</span>
              </div>
            </div>
            <h3>¿Deseas inscribir a tu hijo(a) en Kínder o Primaria?</h3>
            <p>
              Completa la solicitud de admisión en línea en menos de 2 minutos. Recibirás tu folio de matrícula escolar y ficha de ingreso.
            </p>
          </div>

          <button
            onClick={() => setShowStudentEnrollModal(true)}
            className="btn btn-success btn-lg"
          >
            <span>Iniciar Solicitud de Inscripción</span>
            <ArrowRight style={{ width: '1rem', height: '1rem' }} />
          </button>
        </div>

        {/* ACCESOS POR PERFILES INSTITUCIONALES */}
        <div className="portal-roles-section">
          <div className="portal-roles-header">
            <h3>
              <School style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-primary-hover)' }} />
              Accesos al Sistema por Perfil Institucional
            </h3>
            <span>Selecciona tu área de trabajo</span>
          </div>

          <div className="portal-roles-grid">
            {/* 1. DIRECTORES */}
            <div className="portal-role-card">
              <div>
                <div
                  className="role-icon"
                  style={{
                    background: 'var(--color-primary-bg)',
                    border: '1px solid var(--color-primary-border)',
                    color: 'var(--color-primary)'
                  }}
                >
                  <ShieldCheck style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <h4>Portal de Directores</h4>
                <p>
                  Acceso para Director General, Directora de Preescolar y Director de Primaria.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('DIRECTOR');
                  onNavigate('dashboard');
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <span>Entrar como Director</span>
                <ChevronRight style={{ width: '0.875rem', height: '0.875rem' }} />
              </button>
            </div>

            {/* 2. MAESTROS / DOCENTES */}
            <div className="portal-role-card">
              <div>
                <div
                  className="role-icon"
                  style={{
                    background: 'var(--color-success-bg)',
                    border: '1px solid var(--color-success-border)',
                    color: 'var(--color-success)'
                  }}
                >
                  <UserCheck style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <h4>Portal de Maestros</h4>
                <p>
                  Acceso para docentes de Kínder y Primaria para pase de lista y captura de evaluaciones.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('DOCENTE');
                  onNavigate('dashboard');
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <span>Entrar como Maestro</span>
                <ChevronRight style={{ width: '0.875rem', height: '0.875rem' }} />
              </button>
            </div>

            {/* 3. PERSONAL ADMINISTRATIVO / CAJA */}
            <div className="portal-role-card">
              <div>
                <div
                  className="role-icon"
                  style={{
                    background: 'var(--color-warning-bg)',
                    border: '1px solid var(--color-warning-border)',
                    color: 'var(--color-warning)'
                  }}
                >
                  <DollarSign style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <h4>Finanzas y Recepción</h4>
                <p>
                  Acceso para personal de caja en ventanilla, arqueos y control de colegiaturas.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('FINANZAS');
                  onNavigate('dashboard');
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <span>Entrar a Caja Escolar</span>
                <ChevronRight style={{ width: '0.875rem', height: '0.875rem' }} />
              </button>
            </div>

            {/* 4. PADRES Y FAMILIAS */}
            <div className="portal-role-card">
              <div>
                <div
                  className="role-icon"
                  style={{
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    color: '#818cf8'
                  }}
                >
                  <Users style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <h4>Portal de Familias</h4>
                <p>
                  Acceso para padres de familia con boletas, avisos y pago de cuotas con CoDi®.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('TUTOR');
                  onNavigate('dashboard');
                }}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%' }}
              >
                <span>Entrar como Tutor</span>
                <ChevronRight style={{ width: '0.875rem', height: '0.875rem' }} />
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
                <span className="badge badge-emerald" style={{ marginBottom: '0.25rem' }}>
                  Admisiones 2026-2027
                </span>
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
              <div style={{ paddingBlock: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'var(--color-success-bg)',
                    color: 'var(--color-success)',
                    borderRadius: 'var(--radius-full)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircle2 style={{ width: '2rem', height: '2rem' }} />
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
                  ¡Solicitud Registrada con Éxito!
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', maxWidth: '20rem' }}>
                  Hemos enviado los datos de preinscripción y ficha de pago a <strong>{studentForm.parentEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Nivel Escolar</label>
                    <select
                      value={studentForm.level}
                      onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value })}
                      className="form-select"
                    >
                      <option value="Preescolar">Preescolar / Kínder</option>
                      <option value="Primaria">Primaria</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
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

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
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
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      required
                      value={studentForm.parentPhone}
                      onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                      placeholder="Ej. 921 555 9988"
                      className="form-input"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Correo Electrónico del Tutor</label>
                  <input
                    type="email"
                    required
                    value={studentForm.parentEmail}
                    onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                    placeholder="tutor@ejemplo.com"
                    className="form-input"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowStudentEnrollModal(false)}
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    style={{ flex: 1 }}
                  >
                    <CheckCircle2 style={{ width: '1rem', height: '1rem' }} />
                    <span>Enviar Solicitud</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container-app footer-content">
          <span>{currentTenant.name} • Portal Institucional Multi-Rol</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}>
            {currentTenant.subdomain}.avanteschoolmanagement.local
          </span>
        </div>
      </footer>
    </div>
  );
};
