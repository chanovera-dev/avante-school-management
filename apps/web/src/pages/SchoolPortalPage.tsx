import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  UserCheck,
  Building2,
  DollarSign,
  Palette,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
  Mail,
  CheckCircle2,
  Calendar,
  Phone,
  Clock,
  ChevronRight,
  School,
  FileText,
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
  const [selectedRoleModal, setSelectedRoleModal] = useState<string | null>(null);

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      {/* HEADER INSTITUCIONAL */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-sky-600 to-cyan-500 text-white font-black text-xl w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
            ASM
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-white leading-tight">
              {currentTenant.name || 'Instituto Logos'}
            </h1>
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
              <span>{currentTenant.subdomain || 'institutologos'}.avanteschoolmanagement.local</span>
              <span>•</span>
              <span className="text-sky-400 font-semibold">Portal Oficial</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
          >
            ← Volver al Inicio
          </button>
          <button
            onClick={() => {
              onSelectRoleAndLogin('DIRECTOR');
              onNavigate('dashboard');
            }}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Panel de Administración</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* HERO INSTITUCIONAL */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ciclo Escolar 2026 - 2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Bienvenido al Portal de <br />
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              {currentTenant.name || 'Instituto Logos'}
            </span>
          </h2>
          <p className="text-sm text-slate-400">
            Niveles Incorporados: <strong className="text-pink-300 font-semibold">🎨 Preescolar</strong> y{' '}
            <strong className="text-sky-300 font-semibold">🎒 Primaria</strong>. Selecciona tu perfil institucional para ingresar o solicita la inscripción de un nuevo alumno.
          </p>
        </div>

        {/* BOTÓN DESTACADO: INSCRIPCIÓN DE ALUMNOS */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-emerald-950 border border-sky-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              <UserPlus className="w-3.5 h-3.5" />
              <span>Inscripciones y Admisiones Abiertas</span>
            </div>
            <h3 className="text-2xl font-black text-white">¿Deseas inscribir a tu hijo(a) en Kínder o Primaria?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Completa la solicitud de admisión en línea en menos de 2 minutos. Recibirás tu folio de matrícula escolar y ficha de ingreso.
            </p>
          </div>

          <button
            onClick={() => setShowStudentEnrollModal(true)}
            className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-6 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 text-sm flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <span>Iniciar Solicitud de Inscripción</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ACCESOS POR PERFILES INSTITUCIONALES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <School className="w-5 h-5 text-sky-400" />
              Accesos al Sistema por Perfil Institucional
            </h3>
            <span className="text-xs text-slate-400">Selecciona tu área de trabajo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. DIRECTORES */}
            <div className="bg-slate-900 border border-slate-800 hover:border-sky-500/60 p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 bg-sky-500/10 text-sky-400 border border-sky-500/20 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white">Portal de Directores</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Acceso para Director General, Directora de Preescolar y Director de Primaria.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('DIRECTOR');
                  onNavigate('dashboard');
                }}
                className="w-full bg-slate-800 group-hover:bg-sky-500 group-hover:text-slate-950 text-slate-200 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Entrar como Director</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 2. MAESTROS / DOCENTES */}
            <div className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white">Portal de Maestros</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Acceso para docentes de Kínder y Primaria para pase de lista y captura de evaluaciones.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('DOCENTE');
                  onNavigate('dashboard');
                }}
                className="w-full bg-slate-800 group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-200 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Entrar como Maestro</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. PERSONAL ADMINISTRATIVO / CAJA */}
            <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/60 p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white">Finanzas y Recepción</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Acceso para personal de caja en ventanilla, arqueos y control de colegiaturas.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('FINANZAS');
                  onNavigate('dashboard');
                }}
                className="w-full bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-200 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Entrar a Caja Escolar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4. PADRES Y FAMILIAS */}
            <div className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 p-6 rounded-3xl shadow-xl space-y-4 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-base font-black text-white">Portal de Familias</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Acceso para padres de familia con boletas, avisos y pago de cuotas con CoDi®.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectRoleAndLogin('TUTOR');
                  onNavigate('dashboard');
                }}
                className="w-full bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-200 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Entrar como Tutor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL DE PREINSCRIPCIÓN DE ALUMNOS */}
      {showStudentEnrollModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Admisiones 2026-2027</span>
                <h3 className="font-black text-white text-lg">Solicitud de Inscripción en Línea</h3>
              </div>
              <button
                onClick={() => setShowStudentEnrollModal(false)}
                className="text-slate-400 hover:text-white font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {enrollSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">¡Solicitud Registrada con Éxito!</h4>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  Hemos enviado los datos de preinscripción y ficha de pago a <strong>{studentForm.parentEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Nombre Completo del Aspirante</label>
                  <input
                    type="text"
                    required
                    value={studentForm.studentName}
                    onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                    placeholder="Ej. Santiago Morales Cruz"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-300 mb-1">Nivel Escolar</label>
                    <select
                      value={studentForm.level}
                      onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                    >
                      <option value="Preescolar">Preescolar / Kínder</option>
                      <option value="Primaria">Primaria</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-300 mb-1">Grado Solicitado</label>
                    <input
                      type="text"
                      required
                      value={studentForm.grade}
                      onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                      placeholder="Ej. 1º Grado"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold uppercase text-slate-300 mb-1">Nombre del Padre o Tutor</label>
                    <input
                      type="text"
                      required
                      value={studentForm.parentName}
                      onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                      placeholder="Ej. Roberto Morales"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold uppercase text-slate-300 mb-1">Teléfono de Contacto</label>
                    <input
                      type="tel"
                      required
                      value={studentForm.parentPhone}
                      onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                      placeholder="Ej. 921 555 9988"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-300 mb-1">Correo Electrónico del Tutor</label>
                  <input
                    type="email"
                    required
                    value={studentForm.parentEmail}
                    onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                    placeholder="tutor@ejemplo.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowStudentEnrollModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Enviar Solicitud</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{currentTenant.name} • Portal Institucional Multi-Rol</span>
          <span className="font-mono text-slate-400">{currentTenant.subdomain}.avanteschoolmanagement.local</span>
        </div>
      </footer>
    </div>
  );
};
