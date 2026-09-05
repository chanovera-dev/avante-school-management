import React, { useState, useMemo } from 'react';
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
  FileText,
  CreditCard,
  Building2,
  Printer,
  Eye,
  Calendar,
  Check,
  Copy,
  ExternalLink,
  UploadCloud,
  FileCheck2,
  Phone,
  HeartPulse,
  Paperclip,
  CheckSquare2,
  Square,
  Sparkle,
} from 'lucide-react';
import { ModernSelect } from '../components/ModernSelect';

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

  // Niveles Ofertados y Normalización (garantizando Preescolar y Primaria)
  const schoolLevels = useMemo(() => {
    let rawLevels: string[] = [];
    if (currentTenant.levelsOffered && currentTenant.levelsOffered.length > 0) {
      rawLevels = [...currentTenant.levelsOffered];
    }
    try {
      const saved = localStorage.getItem(`asm_tenant_${currentTenant.id || 'default'}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.levelsOffered && Array.isArray(parsed.levelsOffered) && parsed.levelsOffered.length > 0) {
          rawLevels = Array.from(new Set([...rawLevels, ...parsed.levelsOffered]));
        }
      }
    } catch (e) {}

    if (rawLevels.length === 0) {
      rawLevels = ['PREESCOLAR', 'PRIMARIA'];
    }

    const LEVEL_MAP: Record<string, { id: string; name: string; grades: string[]; defaultFee: number }> = {
      PREESCOLAR: {
        id: 'PREESCOLAR',
        name: 'Preescolar / Jardín de Niños',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
        defaultFee: 3200,
      },
      KINDER_PREESCOLAR: {
        id: 'PREESCOLAR',
        name: 'Preescolar / Jardín de Niños',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
        defaultFee: 3200,
      },
      GUARDERIA: {
        id: 'GUARDERIA',
        name: 'Guardería / Maternal',
        grades: ['Lactantes', 'Maternal A', 'Maternal B'],
        defaultFee: 2900,
      },
      PRIMARIA: {
        id: 'PRIMARIA',
        name: 'Primaria',
        grades: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
        defaultFee: 3800,
      },
      SECUNDARIA: {
        id: 'SECUNDARIA',
        name: 'Secundaria',
        grades: ['1º Secundaria', '2º Secundaria', '3º Secundaria'],
        defaultFee: 4200,
      },
      PREPARATORIA: {
        id: 'PREPARATORIA',
        name: 'Preparatoria / Bachillerato',
        grades: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre'],
        defaultFee: 4600,
      },
    };

    const resolved = rawLevels.map((lvl) => {
      const upper = lvl.toUpperCase();
      if (LEVEL_MAP[upper]) return LEVEL_MAP[upper];
      if (upper.includes('PREESCOLAR') || upper.includes('KINDER')) return LEVEL_MAP.PREESCOLAR;
      if (upper.includes('PRIMARIA')) return LEVEL_MAP.PRIMARIA;
      if (upper.includes('SECUNDARIA')) return LEVEL_MAP.SECUNDARIA;
      return {
        id: lvl,
        name: lvl,
        grades: ['1º Grado', '2º Grado', '3º Grado'],
        defaultFee: 3500,
      };
    });

    if (resolved.length === 1) {
      if (resolved[0].id === 'PRIMARIA') {
        return [LEVEL_MAP.PREESCOLAR, LEVEL_MAP.PRIMARIA];
      }
      if (resolved[0].id === 'PREESCOLAR') {
        return [LEVEL_MAP.PREESCOLAR, LEVEL_MAP.PRIMARIA];
      }
    }
    return resolved;
  }, [currentTenant.levelsOffered, currentTenant.id]);

  const [studentForm, setStudentForm] = useState({
    studentFirstName: '',
    studentLastName: '',
    curp: '',
    birthDate: '2020-05-10',
    gender: 'M' as 'M' | 'F' | 'OTHER',
    bloodType: 'O+',
    medicalNotes: '',
    levelId: 'PREESCOLAR',
    levelName: 'Preescolar / Jardín de Niños',
    grade: '1º Kínder',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentRelationship: 'MADRE' as 'MADRE' | 'PADRE' | 'TUTOR_LEGAL',
    paymentMethod: 'SPEI' as 'SPEI' | 'CAJA' | 'TARJETA',
    notes: '',
  });

  const [studentDocs, setStudentDocs] = useState([
    { id: 'ACTA_NACIMIENTO', name: 'Acta de Nacimiento (Copia Certificada)', required: true, attached: true, fileName: 'acta_nacimiento_certificada.pdf' },
    { id: 'CURP', name: 'CURP Certificada por RENAPO', required: true, attached: true, fileName: 'curp_oficial_renapo.pdf' },
    { id: 'CARTILLA_VACUNACION', name: 'Cartilla Nacional de Salud / Vacunación', required: true, attached: true, fileName: 'cartilla_vacunacion_sellada.pdf' },
    { id: 'COMPROBANTE_DOMICILIO', name: 'Comprobante de Domicilio (< 3 meses)', required: true, attached: true, fileName: 'comprobante_cfe_reciente.pdf' },
    { id: 'CERTIFICADO_PREVIO', name: 'Boleta de Calificaciones Ciclo Anterior', required: false, attached: false, fileName: '' },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);

  const [submissionResult, setSubmissionResult] = useState<{
    applicant: any;
    emailResult?: any;
    paymentSheet: {
      folio: string;
      amount: number;
      paymentMethod: string;
      bankName: string;
      speiClabe: string;
      reference: string;
      concept: string;
    };
  } | null>(null);

  const currentFee = useMemo(() => {
    const found = schoolLevels.find((l) => l.id === studentForm.levelId);
    return found ? found.defaultFee : 3500;
  }, [schoolLevels, studentForm.levelId]);

  const handleCurpChange = (val: string) => {
    const curp = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 18);
    let birthDate = studentForm.birthDate;
    let gender = studentForm.gender;

    if (curp.length >= 10) {
      const yearPrefix = parseInt(curp.substring(4, 6), 10);
      const year = yearPrefix < 30 ? `20${curp.substring(4, 6)}` : `19${curp.substring(4, 6)}`;
      const month = curp.substring(6, 8);
      const day = curp.substring(8, 10);
      if (parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12 && parseInt(day, 10) >= 1 && parseInt(day, 10) <= 31) {
        birthDate = `${year}-${month}-${day}`;
      }
    }
    if (curp.length >= 11) {
      const genderChar = curp.charAt(10);
      if (genderChar === 'H') gender = 'M';
      else if (genderChar === 'M') gender = 'F';
    }

    setStudentForm((prev) => ({
      ...prev,
      curp,
      birthDate,
      gender,
    }));
  };

  const toggleDocAttachment = (id: string) => {
    setStudentDocs((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const nextAttached = !doc.attached;
          return {
            ...doc,
            attached: nextAttached,
            fileName: nextAttached ? `${doc.id.toLowerCase()}_anexado.pdf` : '',
          };
        }
        return doc;
      })
    );
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const year = new Date().getFullYear();
    const fallbackFolio = `ADM-${year}-${String(Math.floor(1000 + Math.random() * 9000))}`;

    const newApplicant = {
      id: `app-${Date.now()}`,
      folio: fallbackFolio,
      applicantFirstName: studentForm.studentFirstName,
      applicantLastName: studentForm.studentLastName,
      curp: studentForm.curp.toUpperCase(),
      birthDate: studentForm.birthDate,
      gender: studentForm.gender,
      targetLevelId: studentForm.levelId,
      targetLevelName: studentForm.levelName,
      targetGrade: studentForm.grade,
      parentName: studentForm.parentName,
      parentPhone: studentForm.parentPhone,
      parentEmail: studentForm.parentEmail,
      status: 'REGISTRADO' as const,
      appliedAt: new Date().toISOString().split('T')[0],
      documents: studentDocs.map((d) => ({
        id: `doc-${d.id}`,
        documentType: d.id,
        documentName: d.name,
        status: d.attached ? ('CARGADO' as const) : ('PENDIENTE' as const),
      })),
      notes: `Tutor: ${studentForm.parentRelationship}. Sangre: ${studentForm.bloodType}. ${studentForm.medicalNotes ? `Notas médicas: ${studentForm.medicalNotes}` : ''}`,
    };

    // 1. Guardar de inmediato en localStorage para este colegio y el default
    try {
      const specificKey = `asm_applicants_${currentTenant.id || 'default'}`;
      const savedSpecific = localStorage.getItem(specificKey);
      const parsedSpecific = savedSpecific ? JSON.parse(savedSpecific) : [];
      const updatedSpecific = [newApplicant, ...(Array.isArray(parsedSpecific) ? parsedSpecific : [])];
      localStorage.setItem(specificKey, JSON.stringify(updatedSpecific));

      // Guardar también en fallback asm_applicants_default
      const savedDefault = localStorage.getItem('asm_applicants_default');
      const parsedDefault = savedDefault ? JSON.parse(savedDefault) : [];
      const updatedDefault = [newApplicant, ...(Array.isArray(parsedDefault) ? parsedDefault : [])];
      localStorage.setItem('asm_applicants_default', JSON.stringify(updatedDefault));

      // Notificar a otras pestañas y módulos
      window.dispatchEvent(new CustomEvent('asm_applicant_created', { detail: newApplicant }));
    } catch (e) {}

    let apiApplicant = newApplicant;
    let emailResultData: any = null;
    let paymentSheetData = {
      folio: fallbackFolio,
      amount: currentFee,
      paymentMethod: studentForm.paymentMethod,
      bankName: 'STP / BBVA Bancomer',
      speiClabe: '646180123456789012',
      reference: `REF-${fallbackFolio.replace(/[^0-9]/g, '')}`,
      concept: `ADMISION ${fallbackFolio}`,
    };

    // 2. Enviar a la API académica con header x-tenant-id
    try {
      const res = await fetch('/api/academic/admissions/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(currentTenant.id ? { 'x-tenant-id': currentTenant.id } : {}),
        },
        body: JSON.stringify({
          tenantId: currentTenant.id,
          applicantFirstName: studentForm.studentFirstName,
          applicantLastName: studentForm.studentLastName,
          curp: studentForm.curp,
          birthDate: studentForm.birthDate,
          gender: studentForm.gender,
          targetLevelId: studentForm.levelId,
          targetLevelName: studentForm.levelName,
          targetGrade: studentForm.grade,
          parentName: studentForm.parentName,
          parentPhone: studentForm.parentPhone,
          parentEmail: studentForm.parentEmail,
          paymentMethod: studentForm.paymentMethod,
          tuitionFee: currentFee,
          submittedDocs: studentDocs.filter((d) => d.attached).map((d) => d.id),
          notes: studentForm.notes || `Tipo de Sangre: ${studentForm.bloodType}. ${studentForm.medicalNotes}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.applicant) {
          apiApplicant = data.applicant;
          // Actualizar folio en localStorage si vino del backend
          try {
            const specificKey = `asm_applicants_${currentTenant.id || 'default'}`;
            const currentList = JSON.parse(localStorage.getItem(specificKey) || '[]');
            const idx = currentList.findIndex((a: any) => a.id === newApplicant.id || a.curp === newApplicant.curp);
            if (idx >= 0) {
              currentList[idx] = apiApplicant;
              localStorage.setItem(specificKey, JSON.stringify(currentList));
            }
          } catch (e) {}
        }
        if (data.emailResult) {
          emailResultData = data.emailResult;
        }
        if (data.paymentSheet) {
          paymentSheetData = data.paymentSheet;
        }
      }
    } catch (err) {
      console.warn('Registro local de aspirante completado en modo offline.');
    }

    setSubmissionResult({
      applicant: apiApplicant,
      emailResult: emailResultData,
      paymentSheet: paymentSheetData,
    });

    setIsSubmitting(false);
    setEnrollSubmitted(true);
  };

  const handleOpenDirectorDashboard = () => {
    try {
      sessionStorage.setItem('asm_initial_tab', 'admissions');
    } catch (e) {}
    setShowStudentEnrollModal(false);
    onSelectRoleAndLogin('DIRECTOR');
  };

  const handleResetEnrollForm = () => {
    setEnrollSubmitted(false);
    setSubmissionResult(null);
    setStudentForm({
      studentFirstName: '',
      studentLastName: '',
      curp: '',
      birthDate: '2020-05-10',
      gender: 'M',
      bloodType: 'O+',
      medicalNotes: '',
      levelId: schoolLevels[0]?.id || 'PREESCOLAR',
      levelName: schoolLevels[0]?.name || 'Preescolar / Jardín de Niños',
      grade: schoolLevels[0]?.grades[0] || '1º Kínder',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      parentRelationship: 'MADRE',
      paymentMethod: 'SPEI',
      notes: '',
    });
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
            {schoolLevels && schoolLevels.length > 0 ? (
              <>
                Niveles Incorporados:{' '}
                {schoolLevels.map((lvl, idx) => (
                  <strong key={lvl.id}>
                    {idx > 0 ? ' • ' : ''}
                    {lvl.name}
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

      {/* MODAL DE PREINSCRIPCIÓN DE ALUMNOS (CÉDULA OFICIAL SEP Y FICHA DE PAGO) */}
      {showStudentEnrollModal && (
        <div className="modal-backdrop">
          <div className="modal-card modal-card-2xl max-h-[92vh] overflow-y-auto">
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="modal-title">Cédula Oficial de Inscripción en Línea</h3>
                    <span className="badge badge-emerald text-[10px] font-mono">Admisiones 2026-2027</span>
                  </div>
                  <p className="text-xs text-muted">
                    {currentTenant.name || 'Colegio Institucional'} • Expediente del alumno, validación documental SEP y ficha de pago.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowStudentEnrollModal(false);
                  if (enrollSubmitted) handleResetEnrollForm();
                }}
                className="modal-close"
                title="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {enrollSubmitted ? (
              /* VISTA DE CONFIRMACIÓN: CÉDULA Y FICHA DE PAGO */
              <div className="space-y-4 text-xs pt-2">
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-bold text-sm text-emerald-200">¡Solicitud Registrada con Éxito en el Sistema!</h4>
                      <div className="badge badge-emerald font-mono text-xs px-3 py-1 font-bold">
                        ⭐ Folio: {submissionResult?.applicant?.folio || 'ADM-2026-0001'}
                      </div>
                    </div>
                    <p className="text-xs mt-1 text-emerald-300/90">
                      El aspirante ha sido incorporado al módulo de <strong>Admisiones</strong> de la dirección escolar. Hemos enviado la ficha oficial y las instrucciones de ingreso al correo <strong>{studentForm.parentEmail}</strong>.
                    </p>
                  </div>
                </div>

                {/* RESUMEN DEL ASPIRANTE Y TUTOR */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5" /> Expediente Escolar Registrado
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-surface-subtle p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block">Aspirante</span>
                      <strong className="text-sm text-main block font-semibold">
                        {studentForm.studentFirstName} {studentForm.studentLastName}
                      </strong>
                      <span className="text-[11px] text-muted font-mono block mt-0.5">CURP: {studentForm.curp}</span>
                    </div>

                    <div className="bg-surface-subtle p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block">Nivel y Grado Ofertado</span>
                      <strong className="text-sm text-primary block font-semibold">
                        {studentForm.levelName}
                      </strong>
                      <span className="text-[11px] text-muted block mt-0.5">Grado: <strong>{studentForm.grade}</strong></span>
                    </div>

                    <div className="bg-surface-subtle p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block">Padre / Madre / Tutor</span>
                      <strong className="text-sm text-main block font-semibold">{studentForm.parentName}</strong>
                      <span className="text-[11px] text-muted block mt-0.5">Tel: {studentForm.parentPhone}</span>
                    </div>
                  </div>
                </div>

                {/* FICHA OFICIAL DE PAGO */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-primary/40 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" /> Ficha Oficial de Pago de Matrícula
                    </div>
                    <div className="text-xs font-mono text-muted">
                      Método: <strong className="text-main">{studentForm.paymentMethod}</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-sky-950/40 via-surface-subtle to-surface border border-sky-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-sky-400 uppercase tracking-wider font-semibold block">
                        Cuota de Admisión y Matrícula ({studentForm.levelName})
                      </span>
                      <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(submissionResult?.paymentSheet?.amount || currentFee)}
                      </div>
                      <span className="text-[11px] text-muted block mt-1">
                        Concepto: <strong className="text-main font-mono">{submissionResult?.paymentSheet?.concept || `ADM ${submissionResult?.applicant?.folio}`}</strong>
                      </span>
                    </div>

                    {studentForm.paymentMethod === 'SPEI' ? (
                      <div className="bg-surface p-3 rounded-xl border border-subtle space-y-1.5 w-full md:w-auto min-w-[280px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted uppercase font-mono">Banco Receptor: STP / BBVA</span>
                          <span className="badge badge-sky text-[9px]">SPEI Instantáneo</span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
                            {submissionResult?.paymentSheet?.speiClabe || '646180123456789012'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(submissionResult?.paymentSheet?.speiClabe || '646180123456789012');
                              setCopiedClabe(true);
                              setTimeout(() => setCopiedClabe(false), 2000);
                            }}
                            className="btn btn-ghost btn-xs text-[10px]"
                            title="Copiar CLABE"
                          >
                            {copiedClabe ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedClabe ? '¡Copiada!' : 'Copiar'}</span>
                          </button>
                        </div>
                        <div className="text-[10px] text-muted flex items-center justify-between">
                          <span>Referencia:</span>
                          <strong className="text-main font-mono">{submissionResult?.paymentSheet?.reference || 'REF-ADM2026'}</strong>
                        </div>
                      </div>
                    ) : studentForm.paymentMethod === 'CAJA' ? (
                      <div className="bg-surface p-3 rounded-xl border border-subtle text-xs space-y-1 w-full md:w-auto">
                        <span className="text-[10px] text-amber-400 font-bold block">Pago en Ventanilla Escolar</span>
                        <p className="text-muted text-[11px]">
                          Presenta tu Folio <strong>{submissionResult?.applicant?.folio}</strong> en la caja de control escolar en horario de <strong>07:30 a 15:30 hrs</strong>.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-surface p-3 rounded-xl border border-subtle text-xs space-y-1 w-full md:w-auto">
                        <span className="text-[10px] text-emerald-400 font-bold block">Pago en Línea con Tarjeta</span>
                        <p className="text-muted text-[11px]">
                          Transacción autorizada en pasarela bancaria. Comprobante digital ligado a tu expediente.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* ESTADO DOCUMENTAL SEP */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Estado del Cotejo Documental SEP
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {studentDocs.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 rounded-xl bg-surface-subtle border border-subtle text-[11px]">
                        <div className="flex items-center gap-2 truncate">
                          {doc.attached ? (
                            <FileCheck2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <FileText className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                          )}
                          <span className="truncate">{doc.name}</span>
                        </div>
                        <span className={`badge ${doc.attached ? 'badge-emerald' : 'badge-amber'} text-[9px] flex-shrink-0`}>
                          {doc.attached ? '✓ Anexado' : '⏳ Pendiente'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTÓN PARA INSPECCIONAR EL CORREO ENVIADO */}
                <div className="p-3 rounded-2xl bg-sky-950/20 border border-sky-500/30 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs text-sky-300">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>¿Deseas verificar el correo de confirmación enviado?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEmailPreviewModal(true)}
                    className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>📧 Ver Correo Electrónico Enviado</span>
                  </button>
                </div>

                {/* ACCIONES DE CIERRE Y PRUEBA INMEDIATA EN PANEL DE DIRECTOR */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-subtle">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="btn btn-secondary btn-sm flex-1 sm:flex-initial flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimir Cédula</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetEnrollForm}
                      className="btn btn-ghost btn-sm flex-1 sm:flex-initial"
                    >
                      + Inscribir Otro Alumno
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleOpenDirectorDashboard}
                    className="btn btn-primary btn-sm w-full sm:w-auto flex items-center justify-center gap-2 font-bold shadow-md shadow-primary/20"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>🎯 Acceder como Director a Revisar esta Solicitud</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* FORMULARIO DE CAPTURA COMPLETO */
              <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs pt-1">
                {/* SECCIÓN 1: DATOS DEL ASPIRANTE */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5" /> 1. Datos Personales del Aspirante
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Nombre(s) del Aspirante *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.studentFirstName}
                        onChange={(e) => setStudentForm({ ...studentForm, studentFirstName: e.target.value })}
                        placeholder="Ej. Santiago"
                        className="form-input w-full"
                      />
                    </div>
                    <div>
                      <label className="form-label">Apellidos del Aspirante *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.studentLastName}
                        onChange={(e) => setStudentForm({ ...studentForm, studentLastName: e.target.value })}
                        placeholder="Ej. Morales Cruz"
                        className="form-input w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="form-label">CURP (18 Caracteres) *</label>
                      <input
                        type="text"
                        maxLength={18}
                        required
                        value={studentForm.curp}
                        onChange={(e) => handleCurpChange(e.target.value)}
                        placeholder="MOCS200510HDF..."
                        className="form-input w-full font-mono uppercase"
                      />
                      {studentForm.curp.length === 18 && (
                        <span className="text-[10px] text-emerald-400 mt-1 block">
                          ✓ CURP con formato válido (Fecha y Sexo calculados)
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Fecha de Nacimiento *</label>
                      <input
                        type="date"
                        required
                        value={studentForm.birthDate}
                        onChange={(e) => setStudentForm({ ...studentForm, birthDate: e.target.value })}
                        className="form-input w-full font-mono"
                      />
                    </div>

                    <div>
                      <label className="form-label">Género *</label>
                      <ModernSelect
                        value={studentForm.gender}
                        onChange={(valOrEvent: any) => {
                          const val = typeof valOrEvent === 'string' ? valOrEvent : valOrEvent?.target?.value || 'M';
                          setStudentForm((prev) => ({ ...prev, gender: val as any }));
                        }}
                        className="form-select w-full"
                      >
                        <option value="M">Masculino (Hombre)</option>
                        <option value="F">Femenino (Mujer)</option>
                        <option value="OTHER">No binario / Otro</option>
                      </ModernSelect>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Grupo Sanguíneo y Factor Rh</label>
                      <ModernSelect
                        value={studentForm.bloodType}
                        onChange={(valOrEvent: any) => {
                          const val = typeof valOrEvent === 'string' ? valOrEvent : valOrEvent?.target?.value || 'O+';
                          setStudentForm((prev) => ({ ...prev, bloodType: val }));
                        }}
                        className="form-select w-full"
                      >
                        <option value="O+">O Positivo (O+)</option>
                        <option value="O-">O Negativo (O-)</option>
                        <option value="A+">A Positivo (A+)</option>
                        <option value="A-">A Negativo (A-)</option>
                        <option value="B+">B Positivo (B+)</option>
                        <option value="B-">B Negativo (B-)</option>
                        <option value="AB+">AB Positivo (AB+)</option>
                        <option value="AB-">AB Negativo (AB-)</option>
                      </ModernSelect>
                    </div>

                    <div>
                      <label className="form-label">Alergias o Observaciones Médicas (Opcional)</label>
                      <input
                        type="text"
                        value={studentForm.medicalNotes}
                        onChange={(e) => setStudentForm({ ...studentForm, medicalNotes: e.target.value })}
                        placeholder="Ej. Alergia a la penicilina, asma leve, etc."
                        className="form-input w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 2: ASIGNACIÓN DE NIVEL Y GRADO */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5" /> 2. Nivel Educativo y Grado Ofertado
                    </div>
                    <span className="badge badge-sky text-[10px] font-mono font-bold">
                      Cuota: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(currentFee)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Nivel Escolar Solicitado *</label>
                      <ModernSelect
                        value={studentForm.levelId}
                        onChange={(valOrEvent: any) => {
                          const val = typeof valOrEvent === 'string' ? valOrEvent : valOrEvent?.target?.value || '';
                          const lvl = schoolLevels.find((l) => l.id === val) || schoolLevels[0];
                          setStudentForm((prev) => ({
                            ...prev,
                            levelId: lvl.id,
                            levelName: lvl.name,
                            grade: lvl.grades[0] || '1º Grado',
                          }));
                        }}
                        className="form-select w-full"
                      >
                        {schoolLevels.map((lvl) => (
                          <option key={lvl.id} value={lvl.id}>
                            {lvl.name}
                          </option>
                        ))}
                      </ModernSelect>
                      <span className="text-[10px] text-muted mt-1 block">
                        Institución autorizada con incorporación oficial SEP.
                      </span>
                    </div>

                    <div>
                      <label className="form-label">Grado Escolar *</label>
                      <ModernSelect
                        value={studentForm.grade}
                        onChange={(valOrEvent: any) => {
                          const val = typeof valOrEvent === 'string' ? valOrEvent : valOrEvent?.target?.value || '';
                          setStudentForm((prev) => ({ ...prev, grade: val }));
                        }}
                        className="form-select w-full"
                      >
                        {(schoolLevels.find((l) => l.id === studentForm.levelId)?.grades || ['1º Grado', '2º Grado', '3º Grado']).map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </ModernSelect>
                      <span className="text-[10px] text-muted mt-1 block">
                        Cupos disponibles para el Ciclo 2026 - 2027.
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 3: PADRE, MADRE O TUTOR */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> 3. Datos del Padre, Madre o Tutor Legal
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Nombre Completo del Tutor *</label>
                      <input
                        type="text"
                        required
                        value={studentForm.parentName}
                        onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                        placeholder="Ej. Roberto Morales Sánchez"
                        className="form-input w-full"
                      />
                    </div>

                    <div>
                      <label className="form-label">Parentesco con el Aspirante *</label>
                      <ModernSelect
                        value={studentForm.parentRelationship}
                        onChange={(valOrEvent: any) => {
                          const val = typeof valOrEvent === 'string' ? valOrEvent : valOrEvent?.target?.value || 'MADRE';
                          setStudentForm((prev) => ({ ...prev, parentRelationship: val as any }));
                        }}
                        className="form-select w-full"
                      >
                        <option value="MADRE">Madre de Familia</option>
                        <option value="PADRE">Padre de Familia</option>
                        <option value="TUTOR_LEGAL">Tutor Legal / Custodio</option>
                      </ModernSelect>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="form-label">Teléfono Celular / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        value={studentForm.parentPhone}
                        onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                        placeholder="Ej. 921 555 9988"
                        className="form-input w-full font-mono"
                      />
                    </div>

                    <div>
                      <label className="form-label">Correo Electrónico (Para envío de Folio y Ficha) *</label>
                      <input
                        type="email"
                        required
                        value={studentForm.parentEmail}
                        onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                        placeholder="tutor@ejemplo.com"
                        className="form-input w-full font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 4: EXPEDIENTE SEP (DOCUMENTOS) */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> 4. Cotejo Documental Requerido (SEP)
                    </div>
                    <span className="text-[10px] text-muted">Marca los documentos que tienes listos</span>
                  </div>

                  <div className="space-y-2">
                    {studentDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          doc.attached ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-surface-subtle border-subtle'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => toggleDocAttachment(doc.id)}
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-colors ${
                              doc.attached ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-surface border-subtle text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <div>
                            <span className="font-medium text-main text-[11px] block">{doc.name}</span>
                            {doc.attached && doc.fileName ? (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <Paperclip className="w-2.5 h-2.5" /> {doc.fileName}
                              </span>
                            ) : (
                              <span className="text-[10px] text-muted block">
                                {doc.required ? 'Obligatorio para matrícula oficial' : 'Opcional / según grado'}
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleDocAttachment(doc.id)}
                          className={`btn btn-xs ${doc.attached ? 'btn-ghost text-emerald-400' : 'btn-outline text-[10px]'}`}
                        >
                          {doc.attached ? 'Anexado' : 'Adjuntar PDF'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECCIÓN 5: FORMA DE PAGO */}
                <div className="dashboard-subcard p-4 rounded-2xl bg-surface border border-subtle space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5" /> 5. Método de Pago de la Cuota de Matrícula
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div
                      onClick={() => setStudentForm({ ...studentForm, paymentMethod: 'SPEI' })}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        studentForm.paymentMethod === 'SPEI'
                          ? 'bg-sky-950/30 border-sky-500 text-sky-300 ring-2 ring-sky-500/20'
                          : 'bg-surface-subtle border-subtle opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span className="badge badge-sky text-[9px]">Recomendado</span>
                      </div>
                      <strong className="text-xs block text-main">Transferencia SPEI</strong>
                      <p className="text-[10px] text-muted mt-1 leading-relaxed">
                        Genera CLABE única STP / BBVA para pago desde banca móvil con validación inmediata.
                      </p>
                    </div>

                    <div
                      onClick={() => setStudentForm({ ...studentForm, paymentMethod: 'CAJA' })}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        studentForm.paymentMethod === 'CAJA'
                          ? 'bg-amber-950/30 border-amber-500 text-amber-300 ring-2 ring-amber-500/20'
                          : 'bg-surface-subtle border-subtle opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <DollarSign className="w-4 h-4 text-amber-400" />
                        <span className="badge badge-amber text-[9px]">En Colegio</span>
                      </div>
                      <strong className="text-xs block text-main">Efectivo en Caja</strong>
                      <p className="text-[10px] text-muted mt-1 leading-relaxed">
                        Paga en ventanilla de administración del plantel en horario hábil con tu folio.
                      </p>
                    </div>

                    <div
                      onClick={() => setStudentForm({ ...studentForm, paymentMethod: 'TARJETA' })}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        studentForm.paymentMethod === 'TARJETA'
                          ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/20'
                          : 'bg-surface-subtle border-subtle opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <CreditCard className="w-4 h-4 text-emerald-400" />
                        <span className="badge badge-emerald text-[9px]">Online</span>
                      </div>
                      <strong className="text-xs block text-main">Tarjeta Débito / Crédito</strong>
                      <p className="text-[10px] text-muted mt-1 leading-relaxed">
                        Cargo en línea con pasarela segura sin comisiones adicionales para el tutor.
                      </p>
                    </div>
                  </div>
                </div>

                {/* BOTONES DEL FORMULARIO */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStudentEnrollModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-success flex items-center gap-2 px-6 py-2.5 font-bold shadow-md shadow-emerald-500/20"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Registrando y Enviando Correo...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Enviar Solicitud y Generar Ficha Oficial</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: VISOR DE CORREO ELECTRÓNICO ENVIADO */}
      {showEmailPreviewModal && submissionResult && (
        <div className="modal-backdrop" onClick={() => setShowEmailPreviewModal(false)}>
          <div className="modal-card modal-card-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-sky-400" />
                <h3 className="modal-title">Bandeja de Correo Enviado (Comprobante Digital)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEmailPreviewModal(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* ENCABEZADOS DEL CORREO */}
              <div className="bg-surface-subtle p-3 rounded-xl border border-subtle space-y-1 font-mono text-[11px]">
                <div><span className="text-muted">De:</span> Admisiones {currentTenant.name || 'Colegio'} &lt;admisiones@avanteschoolmanagement.com&gt;</div>
                <div><span className="text-muted">Para:</span> {studentForm.parentEmail}</div>
                <div><span className="text-muted">Asunto:</span> [{currentTenant.name || 'Colegio'}] Cédula de Preinscripción y Ficha de Pago - Folio: {submissionResult.applicant.folio}</div>
                <div><span className="text-muted">Fecha:</span> Hoy, {new Date().toLocaleTimeString()} (Entregado exitosamente)</div>
              </div>

              {/* CUERPO DEL CORREO RENDERIZADO */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200">
                {submissionResult.emailResult?.htmlContent ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: submissionResult.emailResult.htmlContent }}
                    className="email-preview-rendered"
                  />
                ) : (
                  <div className="space-y-3 text-center py-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm text-white">Notificación de Admisión Enviada</h4>
                    <p className="text-muted text-xs max-w-md mx-auto">
                      Se ha despachado el correo con el folio <strong>{submissionResult.applicant.folio}</strong> y la ficha de pago para <strong>{studentForm.studentFirstName} {studentForm.studentLastName}</strong> ({studentForm.levelName}).
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailPreviewModal(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Cerrar Visor
                </button>
              </div>
            </div>
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
