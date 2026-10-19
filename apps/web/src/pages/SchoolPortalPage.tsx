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
  RefreshCw,
  Award,
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

    const LEVEL_MAP: Record<
      string,
      {
        id: string;
        name: string;
        grades: string[];
        enrollmentFee: number;
        monthlyTuitionFee: number;
        tuitionMonths: number;
        annualDiscountPercent: number;
        tuitionDueDay: number;
      }
    > = {
      PREESCOLAR: {
        id: 'PREESCOLAR',
        name: 'Preescolar / Jardín de Niños',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
        enrollmentFee: 3800,
        monthlyTuitionFee: 3200,
        tuitionMonths: 10,
        annualDiscountPercent: 10,
        tuitionDueDay: 10,
      },
      KINDER_PREESCOLAR: {
        id: 'PREESCOLAR',
        name: 'Preescolar / Jardín de Niños',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
        enrollmentFee: 3800,
        monthlyTuitionFee: 3200,
        tuitionMonths: 10,
        annualDiscountPercent: 10,
        tuitionDueDay: 10,
      },
      GUARDERIA: {
        id: 'GUARDERIA',
        name: 'Guardería / Maternal',
        grades: ['Lactantes', 'Maternal A', 'Maternal B'],
        enrollmentFee: 3500,
        monthlyTuitionFee: 2900,
        tuitionMonths: 10,
        annualDiscountPercent: 10,
        tuitionDueDay: 10,
      },
      PRIMARIA: {
        id: 'PRIMARIA',
        name: 'Primaria',
        grades: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
        enrollmentFee: 4500,
        monthlyTuitionFee: 3800,
        tuitionMonths: 10,
        annualDiscountPercent: 10,
        tuitionDueDay: 10,
      },
      SECUNDARIA: {
        id: 'SECUNDARIA',
        name: 'Secundaria',
        grades: ['1º Secundaria', '2º Secundaria', '3º Secundaria'],
        enrollmentFee: 5200,
        monthlyTuitionFee: 4400,
        tuitionMonths: 10,
        annualDiscountPercent: 10,
        tuitionDueDay: 10,
      },
      PREPARATORIA: {
        id: 'PREPARATORIA',
        name: 'Preparatoria / Bachillerato',
        grades: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre'],
        enrollmentFee: 5800,
        monthlyTuitionFee: 4900,
        tuitionMonths: 10,
        annualDiscountPercent: 10,
        tuitionDueDay: 10,
      },
    };

    // Consultar cuotas personalizadas guardadas por la dirección escolar
    let customFees: Record<string, any> = {};
    try {
      const savedFees = localStorage.getItem(`asm_tenant_fees_${currentTenant.id || 'default'}`);
      if (savedFees) {
        customFees = JSON.parse(savedFees);
      }
    } catch (e) {}

    const resolved = rawLevels.map((lvl) => {
      const upper = lvl.toUpperCase();
      let item = LEVEL_MAP[upper];
      if (!item) {
        if (upper.includes('PREESCOLAR') || upper.includes('KINDER')) item = { ...LEVEL_MAP.PREESCOLAR };
        else if (upper.includes('PRIMARIA')) item = { ...LEVEL_MAP.PRIMARIA };
        else if (upper.includes('SECUNDARIA')) item = { ...LEVEL_MAP.SECUNDARIA };
        else {
          item = {
            id: lvl,
            name: lvl,
            grades: ['1º Grado', '2º Grado', '3º Grado'],
            enrollmentFee: 4000,
            monthlyTuitionFee: 3500,
            tuitionMonths: 10,
            annualDiscountPercent: 10,
            tuitionDueDay: 10,
          };
        }
      } else {
        item = { ...item };
      }

      const custom = customFees[item.id];
      if (custom) {
        if (custom.enrollmentFee) item.enrollmentFee = Number(custom.enrollmentFee);
        if (custom.monthlyTuitionFee) item.monthlyTuitionFee = Number(custom.monthlyTuitionFee);
        if (custom.tuitionMonths) item.tuitionMonths = Number(custom.tuitionMonths);
        if (custom.annualDiscountPercent) item.annualDiscountPercent = Number(custom.annualDiscountPercent);
        if (custom.tuitionDueDay) item.tuitionDueDay = Number(custom.tuitionDueDay);
      }

      return item;
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
    paymentModality: 'ONLY_ENROLLMENT' as 'ONLY_ENROLLMENT' | 'ENROLLMENT_AND_FIRST_MONTH' | 'FULL_YEAR_DISCOUNT',
    recurringPaymentMethod: 'DOMICILIACION_AUTOMATICA' as 'DOMICILIACION_AUTOMATICA' | 'SPEI_RECURRENTE' | 'VENTANILLA_MENSUAL',
    isRecurringAutoDebit: true,
    notes: '',
  });

  // Los documentos inician vacíos (no prellenados) para cotejo real
  const [studentDocs, setStudentDocs] = useState([
    { id: 'ACTA_NACIMIENTO', name: 'Acta de Nacimiento (Copia Certificada)', required: true, attached: false, fileName: '' },
    { id: 'CURP', name: 'CURP Oficial validada ante RENAPO', required: true, attached: false, fileName: '' },
    { id: 'CARTILLA_VACUNACION', name: 'Cartilla Nacional de Salud / Vacunación', required: true, attached: false, fileName: '' },
    { id: 'COMPROBANTE_DOMICILIO', name: 'Comprobante de Domicilio Vigente (< 3 meses)', required: true, attached: false, fileName: '' },
    { id: 'CERTIFICADO_PREVIO', name: 'Boleta o Certificado de Estudios Previos', required: false, attached: false, fileName: '' },
  ]);

  // Documentos requeridos faltantes para determinar si procede Inscripción Condicionada
  const missingRequiredDocs = useMemo(() => {
    return studentDocs.filter((d) => d.required && !d.attached);
  }, [studentDocs]);

  const hasMissingDocs = missingRequiredDocs.length > 0;

  // Estado de Carta Compromiso de Entrega de Documentos (SEP)
  const [compromiseAccepted, setCompromiseAccepted] = useState(false);
  const [compromiseSignerName, setCompromiseSignerName] = useState('');
  const [compromiseDeadlineDays] = useState(30);

  const compromiseDeadlineDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + compromiseDeadlineDays);
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }, [compromiseDeadlineDays]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedClabe, setCopiedClabe] = useState(false);
  const [showEmailPreviewModal, setShowEmailPreviewModal] = useState(false);

  const [submissionResult, setSubmissionResult] = useState<{
    applicant: any;
    emailResult?: any;
    isConditional?: boolean;
    missingDocs?: string[];
    compromiseSigner?: string;
    compromiseDeadline?: string;
    paymentSheet: {
      folio: string;
      amount: number;
      paymentMethod: string;
      bankName: string;
      speiClabe: string;
      reference: string;
      concept: string;
      enrollmentFee?: number;
      monthlyTuitionFee?: number;
      paymentModality?: string;
      recurringPaymentMethod?: string;
      isRecurringAutoDebit?: boolean;
    };
  } | null>(null);

  const selectedLevel = useMemo(() => {
    return schoolLevels.find((l) => l.id === studentForm.levelId) || schoolLevels[0] || {
      id: 'PREESCOLAR',
      name: 'Preescolar / Jardín de Niños',
      grades: ['1º Kínder'],
      enrollmentFee: 3800,
      monthlyTuitionFee: 3200,
      tuitionMonths: 10,
      annualDiscountPercent: 10,
      tuitionDueDay: 10,
    };
  }, [schoolLevels, studentForm.levelId]);

  const enrollmentFee = selectedLevel.enrollmentFee || 3800;
  const monthlyTuitionFee = selectedLevel.monthlyTuitionFee || 3200;
  const tuitionMonths = selectedLevel.tuitionMonths || 10;
  const annualDiscountPercent = selectedLevel.annualDiscountPercent || 10;

  // Cálculo transparente del monto inicial según la modalidad de pago elegida
  const initialPaymentAmount = useMemo(() => {
    if (studentForm.paymentModality === 'ONLY_ENROLLMENT') {
      return enrollmentFee;
    }
    if (studentForm.paymentModality === 'ENROLLMENT_AND_FIRST_MONTH') {
      return enrollmentFee + monthlyTuitionFee;
    }
    if (studentForm.paymentModality === 'FULL_YEAR_DISCOUNT') {
      const discountMultiplier = (100 - annualDiscountPercent) / 100;
      return Math.round(enrollmentFee + (monthlyTuitionFee * tuitionMonths * discountMultiplier));
    }
    return enrollmentFee;
  }, [studentForm.paymentModality, enrollmentFee, monthlyTuitionFee, tuitionMonths, annualDiscountPercent]);

  const currentFee = initialPaymentAmount;

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

  const toggleDocAttachment = (id: string, simulatedFile?: string) => {
    setStudentDocs((prev) =>
      prev.map((doc) => {
        if (doc.id === id) {
          const nextAttached = !doc.attached;
          return {
            ...doc,
            attached: nextAttached,
            fileName: nextAttached ? (simulatedFile || `${doc.id.toLowerCase()}_anexo.pdf`) : '',
          };
        }
        return doc;
      })
    );
  };

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setStudentDocs((prev) =>
        prev.map((doc) => (doc.id === id ? { ...doc, attached: true, fileName: file.name } : doc))
      );
    }
  };

  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de Documentos SEP y Carta Compromiso
    if (hasMissingDocs && !compromiseAccepted) {
      alert(`⚠️ Faltan ${missingRequiredDocs.length} documento(s) obligatorio(s) de la SEP:\n- ${missingRequiredDocs.map((d) => d.name).join('\n- ')}\n\nPara continuar con una Inscripción Condicionada, debes marcar la casilla y firmar digitalmente la Carta Compromiso de Prórroga.`);
      return;
    }

    setIsSubmitting(true);

    const year = new Date().getFullYear();
    const fallbackFolio = `ADM-${year}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const isConditional = hasMissingDocs && compromiseAccepted;
    const finalSigner = compromiseSignerName.trim() || studentForm.parentName;

    const compromiseNotice = isConditional
      ? `⚠️ INSCRIPCIÓN CONDICIONADA SEP: Carta Compromiso firmada por ${finalSigner}. Documentos pendientes de entrega física en 30 días naturales (${compromiseDeadlineDate}): ${missingRequiredDocs.map((d) => d.name).join(', ')}. `
      : '';

    const modalityLabel =
      studentForm.paymentModality === 'ONLY_ENROLLMENT'
        ? 'Solo Cuota de Inscripción'
        : studentForm.paymentModality === 'ENROLLMENT_AND_FIRST_MONTH'
        ? 'Inscripción + 1ª Colegiatura (Septiembre)'
        : 'Ciclo Completo Anticipado (10% Desc.)';

    const recurringLabel =
      studentForm.paymentModality === 'FULL_YEAR_DISCOUNT'
        ? 'Ciclo Cubierto 100%'
        : studentForm.recurringPaymentMethod === 'DOMICILIACION_AUTOMATICA'
        ? 'Cargo Automático Domiciliado (Días 1 al 5)'
        : studentForm.recurringPaymentMethod === 'SPEI_RECURRENTE'
        ? `SPEI Mensual a CLABE Fija (Días 1 al ${selectedLevel.tuitionDueDay || 10})`
        : `Ventanilla Escolar / Caja (Días 1 al ${selectedLevel.tuitionDueDay || 10})`;

    const financialNotice = `[Plan Financiero: ${modalityLabel} | Monto Inicial: $${initialPaymentAmount.toLocaleString('es-MX')} | Colegiatura Mensual: $${monthlyTuitionFee.toLocaleString('es-MX')} (${recurringLabel})] `;

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
      status: isConditional ? ('DOCUMENTACION_EN_REVISION' as const) : ('REGISTRADO' as const),
      appliedAt: new Date().toISOString().split('T')[0],
      enrollmentFee,
      monthlyTuitionFee,
      initialPaymentAmount,
      tuitionFee: initialPaymentAmount,
      paymentModality: studentForm.paymentModality,
      recurringPaymentMethod: studentForm.recurringPaymentMethod,
      isRecurringAutoDebit: studentForm.isRecurringAutoDebit,
      tuitionMonths,
      documents: studentDocs.map((d) => ({
        id: `doc-${d.id}`,
        documentType: d.id,
        documentName: d.name,
        status: d.attached ? ('CARGADO' as const) : ('PENDIENTE' as const),
      })),
      notes: `${financialNotice}${compromiseNotice}Tutor: ${studentForm.parentRelationship}. Sangre: ${studentForm.bloodType}. ${studentForm.medicalNotes ? `Notas médicas: ${studentForm.medicalNotes}` : ''}`,
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
      amount: initialPaymentAmount,
      enrollmentFee,
      monthlyTuitionFee,
      tuitionMonths,
      paymentModality: studentForm.paymentModality,
      recurringPaymentMethod: studentForm.recurringPaymentMethod,
      isRecurringAutoDebit: studentForm.isRecurringAutoDebit,
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
          paymentModality: studentForm.paymentModality,
          recurringPaymentMethod: studentForm.recurringPaymentMethod,
          isRecurringAutoDebit: studentForm.isRecurringAutoDebit,
          enrollmentFee,
          monthlyTuitionFee,
          initialPaymentAmount,
          tuitionFee: initialPaymentAmount,
          tuitionMonths,
          submittedDocs: studentDocs.filter((d) => d.attached).map((d) => d.id),
          notes: newApplicant.notes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.applicant) {
          apiApplicant = data.applicant;
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
          paymentSheetData = { ...paymentSheetData, ...data.paymentSheet };
        }
      }
    } catch (err) {
      console.warn('Registro local de aspirante completado en modo offline.');
    }

    setSubmissionResult({
      applicant: apiApplicant,
      emailResult: emailResultData,
      isConditional,
      missingDocs: missingRequiredDocs.map((d) => d.name),
      compromiseSigner: finalSigner,
      compromiseDeadline: compromiseDeadlineDate,
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
    setCompromiseAccepted(false);
    setCompromiseSignerName('');
    setStudentDocs([
      { id: 'ACTA_NACIMIENTO', name: 'Acta de Nacimiento (Copia Certificada)', required: true, attached: false, fileName: '' },
      { id: 'CURP', name: 'CURP Oficial validada ante RENAPO', required: true, attached: false, fileName: '' },
      { id: 'CARTILLA_VACUNACION', name: 'Cartilla Nacional de Salud / Vacunación', required: true, attached: false, fileName: '' },
      { id: 'COMPROBANTE_DOMICILIO', name: 'Comprobante de Domicilio Vigente (< 3 meses)', required: true, attached: false, fileName: '' },
      { id: 'CERTIFICADO_PREVIO', name: 'Boleta o Certificado de Estudios Previos', required: false, attached: false, fileName: '' },
    ]);
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
      paymentModality: 'ONLY_ENROLLMENT',
      recurringPaymentMethod: 'DOMICILIACION_AUTOMATICA',
      isRecurringAutoDebit: true,
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
          <div className="modal-card enrollment-modal-card">
            <div className="modal-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
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
              <div className="space-y-4 text-xs pt-1">
                {/* BANNER DE ESTADO SEGÚN COTEJO */}
                {submissionResult?.isConditional ? (
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-amber-200 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                        <h4 className="font-bold text-sm text-amber-200">
                          ⚠️ Inscripción Condicionada por Carta Compromiso SEP
                        </h4>
                      </div>
                      <div className="badge badge-amber font-mono text-xs px-3 py-1 font-bold">
                        ⭐ Folio: {submissionResult?.applicant?.folio || 'ADM-2026-0001'}
                      </div>
                    </div>
                    <p className="text-xs text-amber-300/90 leading-relaxed">
                      La preinscripción ha sido aceptada bajo <strong>condición de entrega documental posterior</strong>. Se ha generado la prórroga oficial de <strong>30 días naturales</strong> (límite: <strong>{submissionResult?.compromiseDeadline}</strong>) firmada digitalmente por <strong>{submissionResult?.compromiseSigner}</strong>.
                    </p>
                    {submissionResult?.missingDocs && submissionResult.missingDocs.length > 0 && (
                      <div className="bg-amber-900/30 p-2.5 rounded-xl border border-amber-500/20 mt-2">
                        <span className="text-[11px] font-bold text-amber-300 block mb-1">
                          Documentos oficiales pendientes de entrega física en Dirección Escolar:
                        </span>
                        <ul className="text-[11px] text-amber-200/90 space-y-0.5">
                          {submissionResult.missingDocs.map((docName: string, idx: number) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <span>•</span>
                              <span>{docName}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
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
                        El aspirante cuenta con su expediente documental completo y ha sido incorporado al módulo de <strong>Admisiones</strong> de la dirección escolar.
                      </p>
                    </div>
                  </div>
                )}

                {/* RESUMEN DEL ASPIRANTE Y TUTOR */}
                <div className="enrollment-section">
                  <div className="enrollment-section-title">
                    <School className="w-4 h-4" /> Expediente Escolar Registrado
                  </div>
                  <div className="grid-cols-3 gap-3">
                    <div className="bg-surface-subtle p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block">Aspirante</span>
                      <strong className="text-sm text-main block font-semibold">
                        {studentForm.studentFirstName} {studentForm.studentLastName}
                      </strong>
                      <span className="text-[11px] text-muted font-mono block mt-0.5">CURP: {studentForm.curp}</span>
                    </div>

                    <div className="bg-surface-subtle p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block">Nivel y Grado</span>
                      <strong className="text-sm text-primary block font-semibold">
                        {studentForm.levelName}
                      </strong>
                      <span className="text-[11px] text-muted block mt-0.5">Grado: <strong>{studentForm.grade}</strong></span>
                    </div>

                    <div className="bg-surface-subtle p-3 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block">Tutor Legal</span>
                      <strong className="text-sm text-main block font-semibold">{studentForm.parentName}</strong>
                      <span className="text-[11px] text-muted block mt-0.5">Tel: {studentForm.parentPhone}</span>
                    </div>
                  </div>
                </div>

                {/* FICHA OFICIAL DE PAGO */}
                <div className="enrollment-section" style={{ borderColor: 'var(--color-primary)' }}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="enrollment-section-title">
                      <CreditCard className="w-4 h-4" /> Ficha Oficial de Liquidación Inicial y Plan de Colegiaturas
                    </div>
                    <div className="text-xs font-mono text-muted">
                      Método Inicial: <strong className="text-main">{studentForm.paymentMethod}</strong>
                    </div>
                  </div>

                  {/* Resumen del plan financiero acordado */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-3">
                    <div className="bg-surface-subtle p-2.5 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block font-semibold">Modalidad Elegida</span>
                      <strong className="text-xs text-main block font-semibold mt-0.5">
                        {studentForm.paymentModality === 'ONLY_ENROLLMENT'
                          ? 'Solo Cuota de Inscripción'
                          : studentForm.paymentModality === 'ENROLLMENT_AND_FIRST_MONTH'
                          ? 'Inscripción + 1ª Colegiatura'
                          : 'Ciclo Completo Anticipado'}
                      </strong>
                    </div>

                    <div className="bg-surface-subtle p-2.5 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block font-semibold">Régimen Subsecuente</span>
                      <strong className="text-xs text-primary block font-semibold mt-0.5">
                        {studentForm.paymentModality === 'FULL_YEAR_DISCOUNT'
                          ? 'Ciclo Cubierto al 100%'
                          : studentForm.recurringPaymentMethod === 'DOMICILIACION_AUTOMATICA'
                          ? 'Cargo Automático Domiciliado'
                          : studentForm.recurringPaymentMethod === 'SPEI_RECURRENTE'
                          ? `SPEI Mensual a CLABE Fija`
                          : 'Ventanilla Escolar / Caja'}
                      </strong>
                    </div>

                    <div className="bg-surface-subtle p-2.5 rounded-xl border border-subtle">
                      <span className="text-[10px] text-muted uppercase block font-semibold">Colegiatura Ordinaria</span>
                      <strong className="text-xs text-emerald-400 block font-semibold mt-0.5">
                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monthlyTuitionFee)} / mes
                      </strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface-subtle border border-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-primary uppercase tracking-wider font-semibold block">
                        Importe Inicial a Liquidar Hoy ({studentForm.levelName})
                      </span>
                      <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(submissionResult?.paymentSheet?.amount || initialPaymentAmount)}
                      </div>
                      <span className="text-[11px] text-muted block mt-1">
                        Concepto: <strong className="text-main font-mono">{submissionResult?.paymentSheet?.concept || `ADM ${submissionResult?.applicant?.folio}`}</strong>
                      </span>
                    </div>

                    {studentForm.paymentMethod === 'SPEI' ? (
                      <div className="bg-surface p-3 rounded-xl border border-subtle space-y-1.5 w-full md:w-auto" style={{ minWidth: '260px' }}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-muted uppercase font-mono">Banco: STP / BBVA</span>
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
                <div className="enrollment-section">
                  <div className="enrollment-section-title">
                    <FileText className="w-4 h-4" /> Estado del Cotejo Documental SEP
                  </div>
                  <div className="grid-cols-2 gap-2">
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
                        <span className={`badge ${doc.attached ? 'badge-emerald' : (doc.required ? 'badge-amber' : 'badge-subtle')} text-[9px] flex-shrink-0`}>
                          {doc.attached ? '✓ Anexado' : (doc.required ? '⏳ Con Prórroga' : 'Opcional')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* BOTÓN PARA INSPECCIONAR EL CORREO ENVIADO */}
                <div className="p-3 rounded-2xl bg-sky-950/20 border border-sky-500/30 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs text-sky-300">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <span>Se envió la confirmación y ficha a <strong>{studentForm.parentEmail}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEmailPreviewModal(true)}
                    className="btn btn-outline btn-sm text-xs flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>📧 Ver Correo Enviado</span>
                  </button>
                </div>

                {/* ACCIONES DE CIERRE */}
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
                <div className="enrollment-section">
                  <div className="enrollment-section-title">
                    <UserPlus className="w-4 h-4" /> 1. Datos Personales del Aspirante
                  </div>

                  <div className="grid-cols-2 gap-3">
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

                  <div className="grid-cols-3 gap-3">
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
                          ✓ CURP con formato válido
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

                  <div className="grid-cols-2 gap-3">
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
                      <label className="form-label">Alergias u Observaciones Médicas</label>
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
                <div className="enrollment-section">
                  <div className="flex items-center justify-between">
                    <div className="enrollment-section-title">
                      <School className="w-4 h-4" /> 2. Nivel Educativo y Grado Ofertado
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge badge-sky text-[10px] font-mono font-bold">
                        Inscripción: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(enrollmentFee)}
                      </span>
                      <span className="badge badge-emerald text-[10px] font-mono font-bold">
                        Colegiatura: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monthlyTuitionFee)}/mes
                      </span>
                    </div>
                  </div>

                  <div className="grid-cols-2 gap-3">
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
                <div className="enrollment-section">
                  <div className="enrollment-section-title">
                    <Users className="w-4 h-4" /> 3. Datos del Padre, Madre o Tutor Legal
                  </div>

                  <div className="grid-cols-2 gap-3">
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

                  <div className="grid-cols-2 gap-3">
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
                <div className="enrollment-section">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="enrollment-section-title">
                      <FileText className="w-4 h-4" /> 4. Cotejo Documental Requerido (SEP)
                    </div>
                    <span className={`badge ${hasMissingDocs ? 'badge-amber' : 'badge-emerald'} text-[10px]`}>
                      {hasMissingDocs
                        ? `${studentDocs.filter(d => d.required && d.attached).length}/${missingRequiredDocs.length + studentDocs.filter(d => d.required && d.attached).length} obligatorios adjuntos`
                        : '✓ Documentación Completa'}
                    </span>
                  </div>

                  <p className="text-[11px] text-muted">
                    Adjunta tus documentos en formato PDF o imagen. Si no dispones de algún documento en este momento, podrás aplicar para una <strong>Inscripción Condicionada</strong> firmando la Carta Compromiso institucional abajo.
                  </p>

                  <div className="space-y-2">
                    {studentDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className={`doc-item-row ${doc.attached ? 'attached' : (doc.required ? 'missing' : '')}`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <button
                            type="button"
                            onClick={() => toggleDocAttachment(doc.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors flex-shrink-0 ${
                              doc.attached ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-surface border-subtle text-muted hover:border-primary'
                            }`}
                            title={doc.attached ? 'Desmarcar' : 'Marcar adjunto'}
                          >
                            {doc.attached ? <Check className="w-4 h-4" /> : <Square className="w-4 h-4 opacity-40" />}
                          </button>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-main text-xs">{doc.name}</span>
                              <span className={`badge ${doc.required ? 'badge-amber' : 'badge-subtle'} text-[9px]`}>
                                {doc.required ? 'Obligatorio SEP' : 'Opcional'}
                              </span>
                            </div>
                            {doc.attached && doc.fileName ? (
                              <span className="text-[10px] text-emerald-600 font-mono flex items-center gap-1 mt-0.5 truncate">
                                <Paperclip className="w-3 h-3 flex-shrink-0" /> {doc.fileName}
                              </span>
                            ) : (
                              <span className="text-[10px] text-muted block mt-0.5">
                                {doc.attached ? '✓ Documento listo para cotejo' : 'Sin archivo adjunto aún'}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <input
                            type="file"
                            accept=".pdf,image/*"
                            id={`file-upload-${doc.id}`}
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileChange(doc.id, e)}
                          />
                          {doc.attached ? (
                            <button
                              type="button"
                              onClick={() => toggleDocAttachment(doc.id)}
                              className="btn btn-ghost btn-xs text-danger text-[11px]"
                            >
                              ✕ Quitar
                            </button>
                          ) : (
                            <label
                              htmlFor={`file-upload-${doc.id}`}
                              className="btn btn-outline btn-xs flex items-center gap-1.5 cursor-pointer text-[11px]"
                            >
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>Subir Archivo</span>
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CARTA COMPROMISO SEP SI FALTAN DOCUMENTOS OBLIGATORIOS */}
                  {hasMissingDocs ? (
                    <div className="compromise-letter-card mt-3">
                      <div className="letter-title">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span>Inscripción Condicionada: Carta Compromiso de Entrega Documental (SEP)</span>
                      </div>

                      <div className="letter-body">
                        <p className="mb-2">
                          Por medio del presente instrumento, conforme a la normativa vigente de Control Escolar de la <strong>Secretaría de Educación Pública (SEP)</strong>, yo, el padre, madre o tutor legal que suscribe, manifiesto bajo protesta de decir verdad que al día de hoy no cuento físicamente con la totalidad de los documentos oficiales requeridos para la matrícula definitiva.
                        </p>
                        <p className="font-semibold mb-1">
                          Documentos obligatorios pendientes de cotejo en la Dirección Escolar:
                        </p>
                        <ul className="list-disc pl-5 mb-2 font-mono text-[11px]">
                          {missingRequiredDocs.map((doc) => (
                            <li key={doc.id}>{doc.name}</li>
                          ))}
                        </ul>
                        <p className="mb-2">
                          Me comprometo formalmente a entregar los documentos originales y copias legibles en la oficina de Control Escolar en un plazo improrrogable de <strong>{compromiseDeadlineDays} días naturales</strong> a partir de esta fecha (con fecha límite el <strong>{compromiseDeadlineDate}</strong>).
                        </p>
                        <p className="text-[11px] opacity-90 italic">
                          * Nota: Si fenecido el plazo no se entregan los documentos requeridos, la inscripción provisional quedará suspendida conforme al reglamento escolar.
                        </p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div>
                          <label className="form-label text-[11px] font-bold text-amber-900">
                            Nombre Completo del Tutor que Firma el Compromiso *
                          </label>
                          <input
                            type="text"
                            value={compromiseSignerName}
                            onChange={(e) => setCompromiseSignerName(e.target.value)}
                            placeholder={studentForm.parentName || 'Escribe tu nombre completo como firma digital'}
                            className="form-input w-full bg-white"
                          />
                        </div>

                        <label className="letter-checkbox-label">
                          <input
                            type="checkbox"
                            checked={compromiseAccepted}
                            onChange={(e) => setCompromiseAccepted(e.target.checked)}
                          />
                          <span>
                            He leído y acepto los términos de la <strong>Carta Compromiso de Prórroga Documental SEP</strong> con fecha límite al {compromiseDeadlineDate}.
                          </span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>¡Excelente! Tienes todos los documentos obligatorios requeridos por la SEP listos para su validación oficial.</span>
                    </div>
                  )}
                </div>

                {/* SECCIÓN 5: PLAN DE PAGO: INSCRIPCIÓN Y COLEGIATURAS MENSUALES */}
                <div className="enrollment-section">
                  <div className="enrollment-section-title">
                    <CreditCard className="w-4 h-4" /> 5. Plan de Cuotas y Colegiaturas Mensuales
                  </div>

                  {/* Banner de cuotas oficiales del nivel */}
                  <div className="tuition-breakdown-banner">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-primary">
                          Cuotas Oficiales Autorizadas SEP • {studentForm.levelName}
                        </span>
                        <div className="text-xs text-muted mt-0.5">
                          Estructura de costos transparentes para el Ciclo Escolar 2026 - 2027
                        </div>
                      </div>
                      <span className="badge badge-sky text-[10px] font-mono">
                        {tuitionMonths} Mensualidades (Sept - Jun)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                      <div className="fee-stat-badge primary">
                        <span className="stat-label">Inscripción / Reinscripción Anual</span>
                        <span className="stat-amount">
                          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(enrollmentFee)}
                        </span>
                        <span className="text-[10px] text-muted mt-0.5">Pago único anual para registro de matrícula oficial</span>
                      </div>

                      <div className="fee-stat-badge emerald">
                        <span className="stat-label">Colegiatura Mensual Ordinaria</span>
                        <span className="stat-amount">
                          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monthlyTuitionFee)} <span className="text-xs font-normal text-muted">/ mes</span>
                        </span>
                        <span className="text-[10px] text-muted mt-0.5">Vence los días {selectedLevel.tuitionDueDay || 10} de cada mes</span>
                      </div>
                    </div>
                  </div>

                  {/* Subsección A: ¿Qué desea liquidar hoy? */}
                  <div className="mt-3">
                    <label className="form-label font-bold text-main block mb-1.5">
                      A) ¿Qué concepto deseas liquidar el día de hoy para formalizar la admisión? *
                    </label>

                    <div className="payment-methods-grid">
                      <button
                        type="button"
                        onClick={() => setStudentForm({ ...studentForm, paymentModality: 'ONLY_ENROLLMENT' })}
                        className={`payment-method-card ${studentForm.paymentModality === 'ONLY_ENROLLMENT' ? 'selected' : ''}`}
                      >
                        <div className="method-header">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-sky-500" />
                            <span className="method-title">Solo Cuota de Inscripción</span>
                          </div>
                          <div className="radio-indicator">
                            <div className="radio-indicator-dot" />
                          </div>
                        </div>
                        <div className="text-base font-black text-sky-400 font-mono my-1">
                          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(enrollmentFee)}
                        </div>
                        <p className="method-desc">
                          Asegura el cupo y matrícula oficial SEP hoy. La 1ª mensualidad se pagará al inicio de clases en Septiembre.
                        </p>
                        <span className="badge badge-sky text-[9px] self-start mt-1">Garantiza Cupo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStudentForm({ ...studentForm, paymentModality: 'ENROLLMENT_AND_FIRST_MONTH' })}
                        className={`payment-method-card ${studentForm.paymentModality === 'ENROLLMENT_AND_FIRST_MONTH' ? 'selected' : ''}`}
                      >
                        <div className="method-header">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            <span className="method-title">Inscripción + 1ª Colegiatura</span>
                          </div>
                          <div className="radio-indicator">
                            <div className="radio-indicator-dot" />
                          </div>
                        </div>
                        <div className="text-base font-black text-emerald-400 font-mono my-1">
                          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(enrollmentFee + monthlyTuitionFee)}
                        </div>
                        <p className="method-desc">
                          Inscripción anual más la colegiatura del mes de Septiembre cubierta anticipadamente. Arranque escolar sin pendientes.
                        </p>
                        <span className="badge badge-emerald text-[9px] self-start mt-1">Más Elegido</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setStudentForm({ ...studentForm, paymentModality: 'FULL_YEAR_DISCOUNT' })}
                        className={`payment-method-card ${studentForm.paymentModality === 'FULL_YEAR_DISCOUNT' ? 'selected' : ''}`}
                      >
                        <div className="method-header">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span className="method-title">Ciclo Completo Anticipado</span>
                          </div>
                          <div className="radio-indicator">
                            <div className="radio-indicator-dot" />
                          </div>
                        </div>
                        <div className="text-base font-black text-amber-400 font-mono my-1">
                          {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
                            Math.round(enrollmentFee + (monthlyTuitionFee * tuitionMonths * ((100 - annualDiscountPercent) / 100)))
                          )}
                        </div>
                        <p className="method-desc">
                          Inscripción + {tuitionMonths} mensualidades con {annualDiscountPercent}% de descuento por pago anticipado en una sola exhibición.
                        </p>
                        <span className="badge badge-amber text-[9px] self-start mt-1">Ahorra {annualDiscountPercent}% Anual</span>
                      </button>
                    </div>
                  </div>

                  {/* Subsección B: Régimen para Colegiaturas Mensuales (si no pagó el año completo) */}
                  {studentForm.paymentModality !== 'FULL_YEAR_DISCOUNT' && (
                    <div className="mt-4 pt-3 border-t border-subtle">
                      <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
                        <label className="form-label font-bold text-main block">
                          B) ¿Cómo cubrirás las colegiaturas mensuales subsecuentes ({new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monthlyTuitionFee)}/mes)? *
                        </label>
                        <span className="text-[10px] text-muted">
                          {studentForm.paymentModality === 'ENROLLMENT_AND_FIRST_MONTH' ? '9 mensualidades restantes' : `${tuitionMonths} mensualidades`}
                        </span>
                      </div>

                      <div className="payment-methods-grid">
                        <button
                          type="button"
                          onClick={() => setStudentForm({ ...studentForm, recurringPaymentMethod: 'DOMICILIACION_AUTOMATICA', isRecurringAutoDebit: true })}
                          className={`payment-method-card ${studentForm.recurringPaymentMethod === 'DOMICILIACION_AUTOMATICA' ? 'selected' : ''}`}
                        >
                          <div className="method-header">
                            <div className="flex items-center gap-2">
                              <RefreshCw className="w-4 h-4 text-sky-500" />
                              <span className="method-title">Cargo Recurrente Automático</span>
                            </div>
                            <div className="radio-indicator">
                              <div className="radio-indicator-dot" />
                            </div>
                          </div>
                          <p className="method-desc">
                            Domiciliación bancaria sin comisiones los días 1 al 5 de cada mes a tarjeta de débito o crédito registrada.
                          </p>
                          <span className="badge badge-sky text-[9px] self-start mt-1">Automático • Cero Filas</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStudentForm({ ...studentForm, recurringPaymentMethod: 'SPEI_RECURRENTE', isRecurringAutoDebit: false })}
                          className={`payment-method-card ${studentForm.recurringPaymentMethod === 'SPEI_RECURRENTE' ? 'selected' : ''}`}
                        >
                          <div className="method-header">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-purple-500" />
                              <span className="method-title">SPEI Mensual a CLABE Fija</span>
                            </div>
                            <div className="radio-indicator">
                              <div className="radio-indicator-dot" />
                            </div>
                          </div>
                          <p className="method-desc">
                            Transferencia interbancaria cada mes a la CLABE única del alumno antes del día {selectedLevel.tuitionDueDay || 10}.
                          </p>
                          <span className="badge badge-purple text-[9px] self-start mt-1">CLABE Fija Alumno</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setStudentForm({ ...studentForm, recurringPaymentMethod: 'VENTANILLA_MENSUAL', isRecurringAutoDebit: false })}
                          className={`payment-method-card ${studentForm.recurringPaymentMethod === 'VENTANILLA_MENSUAL' ? 'selected' : ''}`}
                        >
                          <div className="method-header">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-amber-500" />
                              <span className="method-title">Pago en Ventanilla / Caja</span>
                            </div>
                            <div className="radio-indicator">
                              <div className="radio-indicator-dot" />
                            </div>
                          </div>
                          <p className="method-desc">
                            Pago presencial en efectivo o terminal en la caja del colegio del 1 al {selectedLevel.tuitionDueDay || 10} de cada mes.
                          </p>
                          <span className="badge badge-amber text-[9px] self-start mt-1">Presencial en Plantel</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Resumen dinámico del plan financiero */}
                  <div className="recurring-agreement-box mt-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-main">
                          Resumen del Plan Financiero Seleccionado:
                        </span>
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-600">
                        Total Inicial a Liquidar Hoy: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(initialPaymentAmount)}
                      </div>
                    </div>
                    <div className="text-[11px] text-muted leading-relaxed">
                      {studentForm.paymentModality === 'FULL_YEAR_DISCOUNT' ? (
                        <span>✨ Has seleccionado cubrir la totalidad del Ciclo Escolar por anticipado con descuento del {annualDiscountPercent}%. No tendrás que preocuparte por colegiaturas mensuales.</span>
                      ) : (
                        <span>
                          Hoy liquidas {studentForm.paymentModality === 'ONLY_ENROLLMENT' ? 'la Cuota de Inscripción Oficial' : 'la Inscripción y la Primera Colegiatura'}. Las mensualidades posteriores de <strong>{new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(monthlyTuitionFee)} / mes</strong> se cubrirán mediante <strong>{studentForm.recurringPaymentMethod === 'DOMICILIACION_AUTOMATICA' ? 'Cargo Automático Domiciliado' : studentForm.recurringPaymentMethod === 'SPEI_RECURRENTE' ? `Transferencia SPEI a CLABE Única (Días 1 al ${selectedLevel.tuitionDueDay || 10})` : `Ventanilla Escolar (Días 1 al ${selectedLevel.tuitionDueDay || 10})`}</strong>.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 6: MÉTODO DE LIQUIDACIÓN DEL PAGO INICIAL */}
                <div className="enrollment-section">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="enrollment-section-title">
                      <CreditCard className="w-4 h-4" /> 6. Método de Liquidación del Pago Inicial
                    </div>
                    <span className="badge badge-emerald text-[10px] font-mono font-bold">
                      A Pagar Hoy: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(initialPaymentAmount)}
                    </span>
                  </div>

                  <div className="payment-methods-grid">
                    <button
                      type="button"
                      onClick={() => setStudentForm({ ...studentForm, paymentMethod: 'SPEI' })}
                      className={`payment-method-card ${studentForm.paymentMethod === 'SPEI' ? 'selected' : ''}`}
                    >
                      <div className="method-header">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-sky-500" />
                          <span className="method-title">Transferencia SPEI</span>
                        </div>
                        <div className="radio-indicator">
                          <div className="radio-indicator-dot" />
                        </div>
                      </div>
                      <p className="method-desc">
                        Genera CLABE STP/BBVA única con confirmación automática 24/7.
                      </p>
                      <span className="badge badge-sky text-[9px] self-start">Recomendado</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudentForm({ ...studentForm, paymentMethod: 'CAJA' })}
                      className={`payment-method-card ${studentForm.paymentMethod === 'CAJA' ? 'selected' : ''}`}
                    >
                      <div className="method-header">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-amber-500" />
                          <span className="method-title">Efectivo en Caja</span>
                        </div>
                        <div className="radio-indicator">
                          <div className="radio-indicator-dot" />
                        </div>
                      </div>
                      <p className="method-desc">
                        Pago en ventanilla de administración escolar de 07:30 a 15:30 hrs.
                      </p>
                      <span className="badge badge-amber text-[9px] self-start">En Plantel</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudentForm({ ...studentForm, paymentMethod: 'TARJETA' })}
                      className={`payment-method-card ${studentForm.paymentMethod === 'TARJETA' ? 'selected' : ''}`}
                    >
                      <div className="method-header">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-emerald-500" />
                          <span className="method-title">Tarjeta Débito / Crédito</span>
                        </div>
                        <div className="radio-indicator">
                          <div className="radio-indicator-dot" />
                        </div>
                      </div>
                      <p className="method-desc">
                        Cargo en línea protegido con pasarela bancaria y comprobante inmediato.
                      </p>
                      <span className="badge badge-emerald text-[9px] self-start">En Línea</span>
                    </button>
                  </div>
                </div>

                {/* BOTONES DEL FORMULARIO */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStudentEnrollModal(false)}
                    className="btn btn-secondary w-full sm:w-auto"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting || (hasMissingDocs && !compromiseAccepted)}
                    className={`btn ${hasMissingDocs ? 'btn-primary' : 'btn-success'} flex items-center justify-center gap-2 px-6 py-2.5 font-bold shadow-md w-full sm:w-auto ${
                      hasMissingDocs && !compromiseAccepted ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>Registrando y Enviando Correo...</span>
                      </>
                    ) : hasMissingDocs ? (
                      <>
                        <AlertCircle className="w-4 h-4" />
                        <span>{compromiseAccepted ? 'Firmar Carta Compromiso y Registrar Preinscripción' : 'Firma la Carta Compromiso para continuar'}</span>
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
