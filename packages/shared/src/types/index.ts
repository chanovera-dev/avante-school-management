import {
  UserRole,
  TenantStatus,
  SubscriptionPlanTier,
  SubscriptionStatus,
  EducationLevel,
  CycleStatus,
  StudentStatus,
  AdmissionStatus,
  DocumentStatus,
  AttendanceStatus,
  ChargeStatus,
  PaymentStatus,
  PaymentMethod,
  FundDestination,
  GroupType,
  GatewayFeePolicy,
} from '../enums/index.js';

export interface TenantSubscriptionDTO {
  id: string;
  tenantId: string;
  planTier: SubscriptionPlanTier;
  status: SubscriptionStatus;
  startedAt: Date;
  expiresAt?: Date;
  maxStudentsLimit: number;
  monthlyFeeMXN: number;
  isFreeLaunchPromo: boolean;
}

export interface TenantDTO {
  id: string;
  name: string;
  subdomain: string;
  legalBusinessName: string;
  rfc?: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  timeZone: string;
  currency: string;
  gatewayFeePolicy: GatewayFeePolicy;
  whatsappEnabled: boolean;
  status: TenantStatus;
  isEmailVerified: boolean;
  subscription?: TenantSubscriptionDTO;
  createdAt: Date;
  updatedAt: Date;
}

export interface CampusDTO {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  levelsOffered: EducationLevel[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDTO {
  id: string;
  tenantId: string;
  email: string;
  fullName: string;
  role: UserRole;
  phone?: string;
  campusId?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterSchoolRequestDTO {
  schoolName: string;
  subdomain: string;
  adminFullName: string;
  adminEmail: string;
  adminPassword: string;
  adminPhone: string;
  levelsOffered?: string[];
}

export interface VerifyEmailRequestDTO {
  email: string;
  code: string;
}

export interface SuperAdminSchoolSummaryDTO {
  id: string;
  name: string;
  subdomain: string;
  contactEmail: string;
  status: TenantStatus;
  isEmailVerified: boolean;
  planTier: SubscriptionPlanTier;
  subscriptionStatus: SubscriptionStatus;
  campusCount: number;
  studentCount: number;
  userCount: number;
  monthlyFeeMXN: number;
  levelsOffered?: string[];
  createdAt: Date;
}

export interface AcademicCycleDTO {
  id: string;
  tenantId: string;
  campusId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: CycleStatus;
}

export interface AcademicGroupDTO {
  id: string;
  tenantId: string;
  campusId: string;
  cycleId: string;
  level: EducationLevel;
  gradeNumber: number;
  name: string;
  shift: 'MATUTINO' | 'VESPERTINO' | 'EXTENDIDO';
  maxCapacity: number;
  type: GroupType;
  tutorTeacherId?: string;
}

export interface StudentDTO {
  id: string;
  tenantId: string;
  campusId: string;
  studentCode: string; // Matrícula escolar única e inmutable
  curp?: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F' | 'OTHER';
  status: StudentStatus;
  bloodType?: string;
  allergies?: string;
  emergencyNotes?: string;
  currentGroupBaseId?: string;
  isConditional: boolean;
  conditionalDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TutorDTO {
  id: string;
  tenantId: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
}

export interface StudentTutorRelationDTO {
  id: string;
  studentId: string;
  tutorId: string;
  relationship: 'PADRE' | 'MADRE' | 'TUTOR_LEGAL' | 'FAMILIAR_AUTORIZADO';
  isPrimaryFinancialResponsible: boolean;
  isEmergencyContact: boolean;
  isAuthorizedToPickUp: boolean;
}

export interface ChargeDTO {
  id: string;
  tenantId: string;
  studentId: string;
  conceptName: string;
  periodName: string;
  baseAmount: number;
  discountAmount: number;
  lateFeeAmount: number;
  paidAmount: number;
  outstandingBalance: number; // Saldo insoluto
  dueDate: Date;
  earlyBirdDueDate?: Date;
  status: ChargeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentTransactionDTO {
  id: string;
  tenantId: string;
  chargeId: string;
  studentId: string;
  amount: number;
  method: PaymentMethod;
  fundDestination: FundDestination;
  status: PaymentStatus;
  authorizationFolio?: string;
  isOfflineProvisional: boolean;
  offlineLocalFolio?: string;
  paidAt: Date;
  syncedAt?: Date;
}

export interface CashRegisterSummaryDTO {
  tenantId: string;
  campusId: string;
  date: string;
  totalCashInVault: number; // Efectivo físico en mostrador
  totalBankTransfers: number; // SPEI / Transferencias
  totalCodiBanxico: number; // CoDi 0% comisión
  totalGatewayCards: number; // Pasarela tarjetas
  grandTotal: number;
}

export interface EducationalLevelDTO {
  id: string; // 'PREESCOLAR', 'PRIMARIA', 'SECUNDARIA', 'PREPARATORIA'
  tenantId: string;
  name: string;
  cctCode: string;
  directorName?: string;
  directorTitle?: string;
  directorEmail?: string;
  directorPhone?: string;
  isEmailVerified: boolean;
  academicCoordinator?: string;
  grades: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignLevelDirectorRequestDTO {
  directorName: string;
  directorTitle: string;
  directorEmail: string;
  directorPhone: string;
  cctCode: string;
  academicCoordinator?: string;
  directorPassword?: string;
}

export interface VerifyDirectorEmailRequestDTO {
  email: string;
  code: string;
}

export interface TeacherDTO {
  id: string;
  tenantId: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  levelId: string;
  specialty: string;
  assignedGroup: string;
  assignedSubject: string;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubjectDTO {
  id: string;
  tenantId: string;
  levelId: string; // 'PREESCOLAR' | 'PRIMARIA'
  name: string;
  campoFormativo: string;
  grade?: string;
  isQualitative: boolean;
  orderIndex: number;
}

export interface StudentSubjectGradeDTO {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  curp?: string;
  groupId: string;
  groupName: string;
  subjectId: string;
  subjectName: string;
  teacherId?: string;
  teacherName?: string;
  period1?: number | null;
  period2?: number | null;
  period3?: number | null;
  finalGrade?: number | null;
  period1Absences: number;
  period2Absences: number;
  period3Absences: number;
  observations?: string;
  qualitativeNotes?: string;
  updatedAt: Date;
}

export interface SaveGradesRequestDTO {
  groupId: string;
  subjectId: string;
  teacherId?: string;
  teacherName?: string;
  grades: {
    studentId: string;
    period1?: number | null;
    period2?: number | null;
    period3?: number | null;
    period1Absences?: number;
    period2Absences?: number;
    period3Absences?: number;
    observations?: string;
    qualitativeNotes?: string;
  }[];
}

export interface SepSubjectGradeSummaryDTO {
  subjectId: string;
  subjectName: string;
  campoFormativo: string;
  teacherName: string;
  period1?: number | null;
  period2?: number | null;
  period3?: number | null;
  finalGrade?: number | null;
  totalAbsences: number;
  observations?: string;
  qualitativeNotes?: string;
}

export interface SepReportCardDTO {
  student: {
    id: string;
    studentCode: string;
    fullName: string;
    curp?: string;
    groupName: string;
    gradeName: string;
    levelName: string;
  };
  school: {
    name: string;
    subdomain: string;
    cctCode: string;
    cycleName: string;
    shift: string;
    directorName?: string;
    directorTitle?: string;
  };
  subjects: SepSubjectGradeSummaryDTO[];
  overallAverage: number;
  totalAbsences: number;
  isAccredited: boolean;
  generatedAt: Date;
}

export interface DailyAttendanceRecordDTO {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupId: string;
  groupName: string;
  subjectId?: string;
  subjectName?: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  recordedByTeacherId?: string;
  recordedByTeacherName?: string;
  notes?: string;
  createdAt: Date;
}

export interface SaveDailyAttendanceItemDTO {
  studentId: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface SaveDailyAttendanceRequestDTO {
  groupId: string;
  date: string; // YYYY-MM-DD
  subjectId?: string;
  teacherId?: string;
  teacherName?: string;
  records: SaveDailyAttendanceItemDTO[];
}

export interface DailyAttendanceStatsDTO {
  date: string;
  groupId: string;
  groupName: string;
  totalStudents: number;
  presentCount: number;
  lateCount: number;
  unexcusedAbsenceCount: number;
  excusedAbsenceCount: number;
  attendancePercentage: number;
}

export interface AbsenceJustificationDTO {
  id: string;
  tenantId: string;
  folio: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupId: string;
  groupName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reasonCategory: 'MEDICA' | 'FAMILIAR' | 'TRAMITE_OFICIAL' | 'EVENTO_CIVICO_DEPORTIVO' | 'FUERZA_MAYOR';
  reasonDescription: string;
  documentFolio?: string;
  authorizedBy: string;
  allowAssignmentMakeup: boolean;
  status: 'APROBADO' | 'PENDIENTE' | 'CANCELADO';
  createdAt: Date;
}

export interface CreateAbsenceJustificationRequestDTO {
  studentId: string;
  startDate: string;
  endDate: string;
  reasonCategory: 'MEDICA' | 'FAMILIAR' | 'TRAMITE_OFICIAL' | 'EVENTO_CIVICO_DEPORTIVO' | 'FUERZA_MAYOR';
  reasonDescription: string;
  documentFolio?: string;
  authorizedBy: string;
  allowAssignmentMakeup?: boolean;
}

export type NoticeType =
  | 'CIRCULAR_GENERAL'
  | 'CITATORIO_PADRES'
  | 'AVISO_URGENTE'
  | 'EVENTO_CIVICO_CULTURAL'
  | 'SUSPENSION_CLASES';

export type NoticeAudience = 'TODOS' | 'NIVEL' | 'GRUPO' | 'INDIVIDUAL';
export type NoticePriority = 'NORMAL' | 'ALTA' | 'URGENTE';

export interface SchoolNoticeDTO {
  id: string;
  tenantId: string;
  folio: string; // ej. CIR-2026-001 o CIT-2026-001
  title: string;
  content: string;
  type: NoticeType;
  priority: NoticePriority;
  targetAudience: NoticeAudience;
  targetLevelId?: string;
  targetGroupId?: string;
  targetGroupName?: string;
  targetStudentId?: string;
  targetStudentName?: string;
  appointmentDateTime?: string; // Para citatorios: ej. "04/Sep/2026 - 08:30 hrs"
  appointmentLocation?: string; // ej. "Dirección Técnica de Primaria"
  publishedBy: string;
  publishDate: string; // YYYY-MM-DD
  requiresAcknowledgment: boolean;
  acknowledgmentDeadline?: string;
  totalRecipients: number;
  acknowledgedCount: number;
  status: 'PUBLICADO' | 'BORRADOR' | 'ARCHIVADO';
  createdAt: Date;
}

export interface NoticeAcknowledgmentDTO {
  id: string;
  tenantId: string;
  noticeId: string;
  studentId: string;
  studentName: string;
  tutorName: string;
  digitalSignatureToken: string; // Token único SHA-style
  acknowledgedAt: Date;
}

export interface CreateSchoolNoticeRequestDTO {
  title: string;
  content: string;
  type: NoticeType;
  priority: NoticePriority;
  targetAudience: NoticeAudience;
  targetLevelId?: string;
  targetGroupId?: string;
  targetGroupName?: string;
  targetStudentId?: string;
  targetStudentName?: string;
  appointmentDateTime?: string;
  appointmentLocation?: string;
  publishedBy: string;
  publishDate?: string;
  requiresAcknowledgment?: boolean;
  acknowledgmentDeadline?: string;
}

export interface AcknowledgeNoticeRequestDTO {
  studentId: string;
  tutorName: string;
}

export interface SchoolCredentialDTO {
  id: string;
  tenantId: string;
  credentialCode: string; // ej. CRD-2026-PRI-001
  personType: 'STUDENT' | 'TEACHER' | 'STAFF';
  personId: string;
  fullName: string;
  curp?: string;
  matriculaOrCode: string;
  roleOrGrade: string; // ej. "Primaria 1º 'A'" o "Docente de Lenguajes"
  levelName: string; // ej. "Primaria" o "Preescolar"
  cct: string;
  bloodType: string;
  allergies?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  validThrough: string; // "Ciclo Escolar 2026-2027"
  qrPayload: string; // Cadena codificada para torniquetes: ASM|TENANT|PERSON_ID|CODE|VALID
  photoPlaceholderUrl?: string;
  status: 'ACTIVA' | 'EXTRAVIADA' | 'EXPIRADA';
  issueDate: string;
}

export interface ScanCredentialAccessRequestDTO {
  qrPayload: string;
  scanPoint?: 'PUERTA_PRINCIPAL' | 'BIBLIOTECA' | 'CAFETERIA' | 'TORNIQUETE_PEATONAL';
  direction?: 'ENTRADA' | 'SALIDA';
}

export interface AccessLogDTO {
  id: string;
  tenantId: string;
  personId: string;
  personName: string;
  personType: 'STUDENT' | 'TEACHER' | 'STAFF';
  credentialCode: string;
  roleOrGrade: string;
  scanPoint: string;
  direction: 'ENTRADA' | 'SALIDA';
  timestamp: Date;
  accessGranted: boolean;
  notes?: string;
}

export type AssignmentType = 'TAREA' | 'PROYECTO' | 'LECTURA' | 'INVESTIGACION' | 'EJERCICIO_CLASE';
export type AssignmentStatus = 'ACTIVA' | 'CERRADA' | 'CALIFICADA';
export type StudentSubmissionStatus = 'PENDIENTE' | 'ENTREGADO' | 'EXTEMPORANEO_JUSTIFICADO' | 'NO_ENTREGADO' | 'CALIFICADO';

export interface SchoolAssignmentDTO {
  id: string;
  tenantId: string;
  folio: string; // ej. TAR-2026-001
  title: string;
  description: string;
  type: AssignmentType;
  subjectId: string;
  subjectName: string;
  groupId: string;
  groupName: string;
  teacherId: string;
  teacherName: string;
  assignedDate: string;
  dueDate: string;
  allowExtempWithJustification: boolean;
  extempExtendedDueDate?: string;
  totalStudents: number;
  submittedCount: number;
  status: AssignmentStatus;
  maxScore: number;
  createdAt: Date;
}

export interface StudentAssignmentSubmissionDTO {
  id: string;
  tenantId: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  status: StudentSubmissionStatus;
  hasMedicalJustification: boolean;
  justificationFolio?: string;
  submissionDate?: string;
  submissionNotes?: string;
  score?: number;
  feedback?: string;
  isExtemporaneous: boolean;
  updatedAt?: Date;
}

export interface CreateAssignmentRequestDTO {
  title: string;
  description: string;
  type: AssignmentType;
  subjectId: string;
  subjectName: string;
  groupId: string;
  groupName: string;
  teacherId: string;
  teacherName: string;
  dueDate: string;
  allowExtempWithJustification?: boolean;
  extempExtendedDueDate?: string;
  maxScore?: number;
}

export interface SubmitAssignmentRequestDTO {
  studentId: string;
  submissionNotes?: string;
}

export interface GradeSubmissionRequestDTO {
  submissionId: string;
  score: number;
  feedback?: string;
}

export type DayOfWeek = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';
export type ClassroomFacility = 'AULA_REGULAR' | 'LABORATORIO_COMPUTO' | 'CANCHA_DEPORTIVA' | 'AULA_ARTES' | 'BIBLIOTECA' | 'PATIO_CIVICO';

export interface ClassScheduleSlotDTO {
  id: string;
  tenantId: string;
  groupId: string;
  groupName: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  classroom: string;
  facility: ClassroomFacility;
  colorHex?: string;
  isBreak?: boolean;
}

export interface CreateScheduleSlotRequestDTO {
  groupId: string;
  groupName: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  subjectId: string;
  subjectName: string;
  teacherId: string;
  teacherName: string;
  classroom: string;
  facility: ClassroomFacility;
  colorHex?: string;
}

export interface ScheduleConflictValidationDTO {
  hasConflict: boolean;
  conflictType?: 'TEACHER_COLLISION' | 'CLASSROOM_COLLISION';
  conflictMessage?: string;
}

// ==========================================
// 8. ADMISIONES Y PREINSCRIPCIONES EN LÍNEA
// ==========================================

export type AdmissionApplicantStatus =
  | 'REGISTRADO'
  | 'DOCUMENTACION_EN_REVISION'
  | 'EVALUACION_AGENDADA'
  | 'ACEPTADO'
  | 'RECHAZADO'
  | 'INSCRITO';

export type ApplicantDocumentType =
  | 'ACTA_NACIMIENTO'
  | 'CURP'
  | 'CARTILLA_VACUNACION'
  | 'COMPROBANTE_DOMICILIO'
  | 'CONSTANCIA_ESTUDIOS_PREVIOS';

export type ApplicantDocumentStatus = 'PENDIENTE' | 'CARGADO' | 'VALIDADO' | 'RECHAZADO';

export interface ApplicantDocumentDTO {
  id: string;
  documentType: ApplicantDocumentType;
  documentName: string;
  status: ApplicantDocumentStatus;
  uploadedAt?: string;
  fileUrl?: string;
  rejectionReason?: string;
}

export interface AdmissionApplicantDTO {
  id: string;
  tenantId: string;
  folio: string;
  applicantFirstName: string;
  applicantLastName: string;
  curp: string;
  birthDate: string;
  gender: 'M' | 'F' | 'OTHER';
  targetLevelId: string; // 'PREESCOLAR' | 'PRIMARIA'
  targetLevelName: string;
  targetGrade: string; // ej. '1º Primaria', '2º Preescolar'
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  status: AdmissionApplicantStatus;
  evaluationDate?: string;
  evaluationScore?: number;
  evaluationNotes?: string;
  interviewDate?: string;
  interviewNotes?: string;
  documents: ApplicantDocumentDTO[];
  appliedAt: string;
  convertedStudentId?: string;
  notes?: string;
}

export interface CreateAdmissionApplicantRequestDTO {
  applicantFirstName: string;
  applicantLastName: string;
  curp: string;
  birthDate: string;
  gender: 'M' | 'F' | 'OTHER';
  targetLevelId: string;
  targetLevelName: string;
  targetGrade: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  notes?: string;
}

export interface ScheduleApplicantEvaluationRequestDTO {
  evaluationDate?: string;
  evaluationNotes?: string;
  interviewDate?: string;
  interviewNotes?: string;
  evaluationScore?: number;
}

export interface ValidateApplicantDocumentRequestDTO {
  documentId: string;
  status: ApplicantDocumentStatus;
  rejectionReason?: string;
}

export interface ConvertApplicantToStudentRequestDTO {
  targetGroupId?: string;
}

// ==========================================
// 9. BIBLIOTECA ESCOLAR Y CONTROL DE PRÉSTAMOS
// ==========================================

export type BookCategory =
  | 'LITERATURA_INFANTIL'
  | 'CIENCIAS'
  | 'MATEMATICAS'
  | 'HISTORIA_GEOGRAFIA'
  | 'LIBRO_SEP'
  | 'DICCIONARIOS_ENCICLOPEDIAS'
  | 'ARTE_MUSICA';

export type BookLoanStatus = 'ACTIVO' | 'DEVUELTO' | 'VENCIDO' | 'EXTRAVIADO';

export type BookLoanType = 'DOMICILIO' | 'SALA';

export interface SchoolBookDTO {
  id: string;
  tenantId: string;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  category: BookCategory;
  targetLevel: 'PREESCOLAR' | 'PRIMARIA' | 'TODOS';
  shelfLocation: string;
  totalCopies: number;
  availableCopies: number;
  coverImageUrl?: string;
  summary?: string;
}

export interface BookLoanDTO {
  id: string;
  tenantId: string;
  folio: string;
  bookId: string;
  bookTitle: string;
  bookIsbn: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupName: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  status: BookLoanStatus;
  loanType: BookLoanType;
  librarianNotes?: string;
}

export interface CreateBookRequestDTO {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  category: BookCategory;
  targetLevel: 'PREESCOLAR' | 'PRIMARIA' | 'TODOS';
  shelfLocation: string;
  totalCopies: number;
  summary?: string;
}

export interface CreateBookLoanRequestDTO {
  bookId: string;
  studentId: string;
  loanType: BookLoanType;
  dueDate: string;
  librarianNotes?: string;
}

export interface ReturnBookLoanRequestDTO {
  returnNotes?: string;
}

export interface StudentLibraryClearanceDTO {
  studentId: string;
  studentName: string;
  studentCode: string;
  isCleared: boolean;
  activeLoansCount: number;
  pendingLoans: BookLoanDTO[];
}

// ==========================================
// 10. TRANSPORTE ESCOLAR Y RUTAS SEGURAS
// ==========================================

export type TransportShift = 'MATUTINO_RECOGIDA' | 'VESPERTINO_ENTREGA' | 'AMBOS';

export type TransportBoardingStatus =
  | 'PENDIENTE'
  | 'A_BORDO'
  | 'ENTREGADO_CASA'
  | 'ENTREGADO_ESCUELA'
  | 'AUSENTE';

export interface RouteStopDTO {
  id: string;
  name: string;
  scheduledTimeMorning: string;
  scheduledTimeAfternoon: string;
  address: string;
  orderIndex: number;
}

export interface TransportVehicleDTO {
  id: string;
  tenantId: string;
  plateNumber: string;
  model: string;
  capacity: number;
  insurancePolicy: string;
  driverName: string;
  driverPhone: string;
  driverLicense: string;
  monitorName: string;
  monitorPhone: string;
}

export interface TransportRouteDTO {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  vehicleId: string;
  vehiclePlate: string;
  vehicleModel: string;
  driverName: string;
  driverPhone: string;
  monitorName: string;
  shift: TransportShift;
  stops: RouteStopDTO[];
  enrolledStudentsCount: number;
  active: boolean;
}

export interface StudentTransportEnrollmentDTO {
  id: string;
  tenantId: string;
  routeId: string;
  routeName: string;
  stopId: string;
  stopName: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupName: string;
  tutorName: string;
  tutorPhone: string;
  shift: TransportShift;
  emergencyNotes?: string;
}

export interface DailyTransportBoardingLogDTO {
  id: string;
  tenantId: string;
  routeId: string;
  date: string;
  shift: 'MATUTINO_RECOGIDA' | 'VESPERTINO_ENTREGA';
  studentId: string;
  studentName: string;
  studentCode: string;
  stopName: string;
  status: TransportBoardingStatus;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

export interface CreateTransportRouteRequestDTO {
  code: string;
  name: string;
  vehiclePlate: string;
  vehicleModel: string;
  driverName: string;
  driverPhone: string;
  monitorName: string;
  shift: TransportShift;
  stops: Array<{
    name: string;
    scheduledTimeMorning: string;
    scheduledTimeAfternoon: string;
    address: string;
  }>;
}

export interface EnrollStudentInTransportRequestDTO {
  routeId: string;
  stopId: string;
  studentId: string;
  shift: TransportShift;
  emergencyNotes?: string;
}

export interface RecordTransportBoardingRequestDTO {
  routeId: string;
  date: string;
  shift: 'MATUTINO_RECOGIDA' | 'VESPERTINO_ENTREGA';
  studentId: string;
  status: TransportBoardingStatus;
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

// ==========================================
// 11. CAFETERÍA ESCOLAR Y MONEDERO DIGITAL
// ==========================================

export type CafeteriaItemCategory =
  | 'DESAYUNOS_SALUDABLES'
  | 'FRUTAS_VERDURAS'
  | 'SNACKS_NUTRITIVOS'
  | 'BEBIDAS_NATURALES'
  | 'COMIDAS_CALIENTES';

export interface CafeteriaProductDTO {
  id: string;
  tenantId: string;
  name: string;
  category: CafeteriaItemCategory;
  priceMXN: number;
  caloriesKcal?: number;
  ingredients: string[];
  allergens: string[];
  isHealthySepApproved: boolean;
  stockQuantity: number;
  available: boolean;
}

export interface StudentWalletDTO {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupName: string;
  currentBalanceMXN: number;
  dailySpendingLimitMXN: number;
  spentTodayMXN: number;
  allergies: string[];
  status: 'ACTIVO' | 'BLOQUEADO';
  updatedAt: string;
}

export interface CafeteriaPurchaseItemDTO {
  productId: string;
  productName: string;
  quantity: number;
  unitPriceMXN: number;
  subtotalMXN: number;
}

export interface CafeteriaTransactionDTO {
  id: string;
  tenantId: string;
  folio: string;
  walletId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  type: 'RECARGA_SALDO' | 'CONSUMO';
  amountMXN: number;
  previousBalanceMXN: number;
  newBalanceMXN: number;
  items?: CafeteriaPurchaseItemDTO[];
  date: string;
  time: string;
  paymentMethod?: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA';
  cashierNotes?: string;
}

export interface CreateCafeteriaProductRequestDTO {
  name: string;
  category: CafeteriaItemCategory;
  priceMXN: number;
  caloriesKcal?: number;
  ingredients: string[];
  allergens: string[];
  isHealthySepApproved: boolean;
  stockQuantity: number;
}

export interface TopUpStudentWalletRequestDTO {
  amountMXN: number;
  paymentMethod: 'EFECTIVO' | 'TRANSFERENCIA' | 'TARJETA';
  notes?: string;
}

export interface UpdateWalletDailyLimitRequestDTO {
  dailySpendingLimitMXN: number;
}

export interface ProcessCafeteriaSaleRequestDTO {
  studentId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
  cashierNotes?: string;
}

// ==========================================
// 12. ENFERMERÍA ESCOLAR Y SALUD INTEGRAL
// ==========================================

export type MedicalConsultationReason =
  | 'CAIDA_GOLPE'
  | 'DOLOR_ESTOMACAL'
  | 'CEFALEA_FIEBRE'
  | 'HERIDA_RASPON'
  | 'REACCION_ALERGICA'
  | 'SUMINISTRO_MEDICAMENTO'
  | 'OTRO';

export type MedicalConsultationSeverity =
  | 'LEVE'
  | 'MODERADA'
  | 'URGENTE_REVISION_MEDICA';

export type MedicalConsultationStatus =
  | 'EN_OBSERVACION'
  | 'ALTA_A_CLASES'
  | 'RETIRADO_CON_TUTOR'
  | 'DERIVADO_HOSPITAL';

export interface MedicalConsultationDTO {
  id: string;
  tenantId: string;
  folio: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupName: string;
  date: string;
  time: string;
  reason: MedicalConsultationReason;
  severity: MedicalConsultationSeverity;
  symptomsDescription: string;
  vitalSigns: {
    temperatureCelsius?: number;
    bloodPressure?: string;
    heartRateBpm?: number;
  };
  treatmentGiven: string;
  nurseNotes?: string;
  nurseInCharge: string;
  parentNotified: boolean;
  parentNotifiedAt?: string;
  requiresPickupByParent: boolean;
  status: MedicalConsultationStatus;
}

export interface ScheduledMedicationDTO {
  id: string;
  tenantId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupName: string;
  medicationName: string;
  dosage: string;
  scheduledTime: string;
  startDate: string;
  endDate: string;
  prescriptionDoctorName: string;
  doctorLicense: string;
  parentAuthorizationSigned: boolean;
  parentName: string;
  administeredToday: boolean;
  lastAdministeredAt?: string;
  status: 'ACTIVO' | 'CONCLUIDO' | 'CANCELADO';
}

export interface FirstAidSupplyDTO {
  id: string;
  tenantId: string;
  name: string;
  category: 'CURACION' | 'EQUIPO_MEDICO' | 'MEDICAMENTO_BASICO_AUTORIZADO';
  stockQuantity: number;
  unit: string;
  minStockAlert: number;
  expiryDate?: string;
}

export interface CreateMedicalConsultationRequestDTO {
  studentId: string;
  reason: MedicalConsultationReason;
  severity: MedicalConsultationSeverity;
  symptomsDescription: string;
  vitalSigns?: {
    temperatureCelsius?: number;
    bloodPressure?: string;
    heartRateBpm?: number;
  };
  treatmentGiven: string;
  nurseNotes?: string;
  nurseInCharge: string;
  requiresPickupByParent?: boolean;
}

export interface CreateScheduledMedicationRequestDTO {
  studentId: string;
  medicationName: string;
  dosage: string;
  scheduledTime: string;
  startDate: string;
  endDate: string;
  prescriptionDoctorName: string;
  doctorLicense: string;
  parentName: string;
}

export interface AdministerMedicationRequestDTO {
  nurseNotes?: string;
}

export interface UpdateMedicalConsultationStatusRequestDTO {
  status: MedicalConsultationStatus;
  nurseNotes?: string;
}

// ==========================================
// 13. TALLERES EXTRACURRICULARES Y ACADEMIAS
// ==========================================

export type WorkshopCategory =
  | 'DEPORTIVO'
  | 'CIENCIA_TECNOLOGIA'
  | 'ARTES_CULTURA'
  | 'ACADEMICO_REGULARIZACION'
  | 'DESARROLLO_HABILIDADES';

export type WorkshopStatus =
  | 'ACTIVO'
  | 'CERRADO_CUPO_LLENO'
  | 'SUSPENDIDO';

export interface ExtracurricularWorkshopDTO {
  id: string;
  tenantId: string;
  code: string;
  name: string;
  category: WorkshopCategory;
  description: string;
  instructorName: string;
  instructorPhone?: string;
  classroom: string;
  scheduleDays: string[];
  scheduleTime: string;
  monthlyFeeMXN: number;
  maxCapacity: number;
  enrolledCount: number;
  targetLevels: string[];
  status: WorkshopStatus;
}

export interface WorkshopEnrollmentDTO {
  id: string;
  tenantId: string;
  workshopId: string;
  workshopName: string;
  workshopCode: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  groupName: string;
  enrollmentDate: string;
  monthlyFeeMXN: number;
  parentAuthorization: boolean;
  status: 'ACTIVO' | 'BAJA';
}

export interface WorkshopAttendanceLogDTO {
  id: string;
  tenantId: string;
  workshopId: string;
  date: string;
  studentId: string;
  studentName: string;
  status: 'PRESENTE' | 'RETARDO' | 'FALTA' | 'JUSTIFICADA';
  notes?: string;
}

export interface CreateExtracurricularWorkshopRequestDTO {
  code: string;
  name: string;
  category: WorkshopCategory;
  description: string;
  instructorName: string;
  instructorPhone?: string;
  classroom: string;
  scheduleDays: string[];
  scheduleTime: string;
  monthlyFeeMXN: number;
  maxCapacity: number;
  targetLevels: string[];
}

export interface EnrollStudentInWorkshopRequestDTO {
  workshopId: string;
  studentId: string;
}

export interface RecordWorkshopAttendanceRequestDTO {
  workshopId: string;
  date: string;
  studentId: string;
  status: 'PRESENTE' | 'RETARDO' | 'FALTA' | 'JUSTIFICADA';
  notes?: string;
}

// ==========================================
// 14. INVENTARIO ESCOLAR Y ACTIVOS FIJOS
// ==========================================

export type AssetCategory =
  | 'TECNOLOGIA_COMPUTO'
  | 'MOBILIARIO_AULAS'
  | 'LABORATORIO_CIENCIAS'
  | 'EQUIPO_DEPORTIVO'
  | 'INFRAESTRUCTURA_GENERAL';

export type AssetCondition =
  | 'EXCELENTE'
  | 'BUENO'
  | 'REGULAR_REQUIERE_SERVICIO'
  | 'EN_REPARACION'
  | 'DADO_DE_BAJA';

export interface SchoolAssetDTO {
  id: string;
  tenantId: string;
  assetTag: string;
  name: string;
  category: AssetCategory;
  serialNumber?: string;
  brandModel?: string;
  assignedLocation: string;
  responsiblePerson: string;
  acquisitionDate: string;
  purchaseValueMXN: number;
  condition: AssetCondition;
  warrantyExpiry?: string;
  notes?: string;
}

export type MaintenanceTicketStatus =
  | 'ABIERTO_REPORTADO'
  | 'EN_REVISION'
  | 'EN_REPARACION'
  | 'RESUELTO'
  | 'CANCELADO';

export type MaintenanceTicketPriority =
  | 'BAJA'
  | 'MEDIA'
  | 'ALTA'
  | 'URGENTE';

export interface AssetMaintenanceTicketDTO {
  id: string;
  tenantId: string;
  ticketNumber: string;
  assetId: string;
  assetName: string;
  assetTag: string;
  location: string;
  title: string;
  description: string;
  priority: MaintenanceTicketPriority;
  reportedBy: string;
  assignedTo?: string;
  reportedAt: string;
  resolvedAt?: string;
  costMXN?: number;
  resolutionNotes?: string;
  status: MaintenanceTicketStatus;
}

export interface CreateSchoolAssetRequestDTO {
  assetTag?: string;
  name: string;
  category: AssetCategory;
  serialNumber?: string;
  brandModel?: string;
  assignedLocation: string;
  responsiblePerson: string;
  acquisitionDate?: string;
  purchaseValueMXN: number;
  condition?: AssetCondition;
  warrantyExpiry?: string;
  notes?: string;
}

export interface UpdateSchoolAssetConditionRequestDTO {
  condition: AssetCondition;
  notes?: string;
}

export interface CreateAssetMaintenanceTicketRequestDTO {
  assetId: string;
  title: string;
  description: string;
  priority: MaintenanceTicketPriority;
  reportedBy: string;
  assignedTo?: string;
}

export interface UpdateMaintenanceTicketStatusRequestDTO {
  status: MaintenanceTicketStatus;
  resolutionNotes?: string;
  costMXN?: number;
}

// ==========================================
// 15. ENCUESTAS INSTITUCIONALES Y CLIMA ESCOLAR
// ==========================================

export type SurveyTargetAudience =
  | 'PADRES_FAMILIA'
  | 'DOCENTES'
  | 'ALUMNOS'
  | 'COMUNIDAD_GENERAL';

export type SurveyCategory =
  | 'CALIDAD_EDUCATIVA'
  | 'CLIMA_ESCOLAR'
  | 'SERVICIOS_CAFETERIA_TRANSPORTE'
  | 'INSTALACIONES_SEGURIDAD'
  | 'SATISFACCION_GENERAL_NPS';

export type SurveyStatus =
  | 'BORRADOR'
  | 'ACTIVA'
  | 'CERRADA';

export interface SurveyQuestionDTO {
  id: string;
  prompt: string;
  type: 'RATING_1_5' | 'NPS_0_10' | 'TEXT' | 'BOOLEAN';
  categoryDimension?: string;
}

export interface InstitutionalSurveyDTO {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  description: string;
  targetAudience: SurveyTargetAudience;
  category: SurveyCategory;
  startDate: string;
  endDate: string;
  questions: SurveyQuestionDTO[];
  responsesCount: number;
  npsScore?: number; // -100 to +100
  averageRating?: number; // 1 to 5
  status: SurveyStatus;
}

export interface SurveyResponseDTO {
  id: string;
  surveyId: string;
  respondentId?: string;
  respondentRole: 'TUTOR' | 'DOCENTE' | 'ALUMNO';
  isAnonymous: boolean;
  npsRating?: number;
  answers: {
    questionId: string;
    prompt: string;
    value: string | number;
  }[];
  comments?: string;
  submittedAt: string;
}

export type SuggestionCategory =
  | 'ACADEMICA'
  | 'INSTALACIONES'
  | 'CAFETERIA'
  | 'TRANSPORTE'
  | 'CONVIVENCIA_ESCOLAR'
  | 'ADMINISTRATIVA';

export type SuggestionStatus =
  | 'RECIBIDO'
  | 'EN_REVISION_DIRECCION'
  | 'EN_ACCION'
  | 'ATENDIDO';

export interface ConfidentialSuggestionDTO {
  id: string;
  tenantId: string;
  folio: string;
  category: SuggestionCategory;
  subject: string;
  message: string;
  senderRole: 'TUTOR' | 'DOCENTE' | 'ALUMNO' | 'ANONIMO';
  senderName?: string;
  senderEmail?: string;
  submittedAt: string;
  reviewedBy?: string;
  status: SuggestionStatus;
  directorResolutionNotes?: string;
  resolvedAt?: string;
}

export interface CreateInstitutionalSurveyRequestDTO {
  code?: string;
  title: string;
  description: string;
  targetAudience: SurveyTargetAudience;
  category: SurveyCategory;
  startDate: string;
  endDate: string;
  questions: Omit<SurveyQuestionDTO, 'id'>[];
}

export interface SubmitSurveyResponseRequestDTO {
  surveyId: string;
  respondentId?: string;
  respondentRole: 'TUTOR' | 'DOCENTE' | 'ALUMNO';
  isAnonymous?: boolean;
  npsRating?: number;
  answers: {
    questionId: string;
    prompt: string;
    value: string | number;
  }[];
  comments?: string;
}

export interface CreateConfidentialSuggestionRequestDTO {
  category: SuggestionCategory;
  subject: string;
  message: string;
  senderRole: 'TUTOR' | 'DOCENTE' | 'ALUMNO' | 'ANONIMO';
  senderName?: string;
  senderEmail?: string;
}

export interface UpdateSuggestionStatusRequestDTO {
  status: SuggestionStatus;
  directorResolutionNotes?: string;
  reviewedBy?: string;
}

// ==========================================
// 16. CALENDARIO CÍVICO SEP, CTE Y EVENTOS
// ==========================================

export type SchoolEventType =
  | 'SUSPENSION_OFICIAL_SEP'
  | 'CONSEJO_TECNICO_CTE'
  | 'ACTO_CIVICO_EFEMERIDE'
  | 'FESTIVAL_INSTITUCIONAL'
  | 'PERIODO_EVALUACION_SEP'
  | 'VACACIONES_OFICIALES';

export type EventAudience =
  | 'TODA_LA_COMUNIDAD'
  | 'SOLO_DOCENTES'
  | 'PADRES_FAMILIA'
  | 'ALUMNOS';

export interface TeacherEventCommissionDTO {
  id: string;
  teacherId: string;
  teacherName: string;
  role: string;
  status: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA';
  notes?: string;
}

export interface SchoolEventDTO {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  description: string;
  type: SchoolEventType;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  classesSuspended: boolean;
  audience: EventAudience;
  commissions: TeacherEventCommissionDTO[];
  cteAgenda?: string[];
  cteAgreements?: string[];
  status: 'PROGRAMADO' | 'EN_CURSO' | 'CONCLUIDO' | 'CANCELADO';
}

export interface CreateSchoolEventRequestDTO {
  code?: string;
  title: string;
  description: string;
  type: SchoolEventType;
  date: string;
  endDate?: string;
  time?: string;
  location?: string;
  classesSuspended?: boolean;
  audience?: EventAudience;
  commissions?: Omit<TeacherEventCommissionDTO, 'id'>[];
  cteAgenda?: string[];
}

export interface AssignTeacherCommissionRequestDTO {
  teacherId: string;
  teacherName: string;
  role: string;
  notes?: string;
}

export interface UpdateCommissionStatusRequestDTO {
  status: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA';
  notes?: string;
}

export interface RecordCteAgreementsRequestDTO {
  cteAgreements: string[];
}

// ==========================================
// 17. RECLUTAMIENTO Y RECURSOS HUMANOS ESCOLARES
// ==========================================

export type JobVacancyDepartment =
  | 'DOCENCIA_PREESCOLAR'
  | 'DOCENCIA_PRIMARIA'
  | 'INGLES_BILINGUE'
  | 'SERVICIOS_MEDICOS'
  | 'EXTRACURRICULAR_DEPORTES'
  | 'ADMINISTRACION';

export type JobVacancyType =
  | 'TIEMPO_COMPLETO'
  | 'MEDIO_TIEMPO'
  | 'POR_HORAS_ASIGNATURA';

export type JobVacancyStatus =
  | 'ABIERTA'
  | 'EN_ENTREVISTAS'
  | 'CUBIERTA'
  | 'PAUSADA';

export interface JobVacancyDTO {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  department: JobVacancyDepartment;
  type: JobVacancyType;
  description: string;
  requirements: string[];
  salaryRangeMXN?: string;
  applicationsCount: number;
  publishDate: string;
  closingDate?: string;
  status: JobVacancyStatus;
}

export type CandidateHiringStatus =
  | 'POSTULADO'
  | 'ENTREVISTA_INICIAL'
  | 'CLASE_MUESTRA_PEDAGOGICA'
  | 'PSICOMETRIA_REFERENCIAS'
  | 'OFERTA_ACEPTADA'
  | 'CONTRATADO'
  | 'NO_SELECCIONADO';

export type SepAccreditationStatus =
  | 'VALIDADA_DGP'
  | 'EN_TRAMITE'
  | 'PENDIENTE_COTEJO';

export interface TeacherCandidateDTO {
  id: string;
  tenantId: string;
  folio: string;
  vacancyId: string;
  vacancyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  degree: string;
  professionalLicense?: string;
  sepAccreditation: SepAccreditationStatus;
  yearsOfExperience: number;
  resumeSummary?: string;
  status: CandidateHiringStatus;
  pedagogicalDemoScore?: number;
  interviewNotes?: string;
  appliedDate: string;
  lastUpdatedDate: string;
}

export interface CreateJobVacancyRequestDTO {
  code?: string;
  title: string;
  department: JobVacancyDepartment;
  type: JobVacancyType;
  description: string;
  requirements: string[];
  salaryRangeMXN?: string;
  closingDate?: string;
}

export interface CreateTeacherCandidateRequestDTO {
  vacancyId: string;
  fullName: string;
  email: string;
  phone: string;
  degree: string;
  professionalLicense?: string;
  yearsOfExperience?: number;
  resumeSummary?: string;
}

export interface UpdateCandidateStatusRequestDTO {
  status: CandidateHiringStatus;
  interviewNotes?: string;
  pedagogicalDemoScore?: number;
  sepAccreditation?: SepAccreditationStatus;
}

// ==========================================
// 18. PROTECCIÓN CIVIL ESCOLAR Y SIMULACROS
// ==========================================

export type DrillType =
  | 'SISMO'
  | 'INCENDIO'
  | 'FUGA_GAS'
  | 'EVACUACION_HIDROMETEOROLOGICA';

export type DrillEvaluation =
  | 'EXCELENTE'
  | 'BUENO'
  | 'REGULAR'
  | 'REQUIERE_MEJORA';

export interface DrillParticipantsCount {
  students: number;
  teachers: number;
  staff: number;
  visitors: number;
  total: number;
}

export interface CivilProtectionDrillDTO {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  drillType: DrillType;
  date: string;
  time: string;
  hypothesis: string;
  evacuationTimeSeconds: number;
  participants: DrillParticipantsCount;
  assemblyPoint: string;
  incidentsReported: string[];
  evaluation: DrillEvaluation;
  notes?: string;
  createdAt: string;
}

export type BrigadeType =
  | 'EVACUACION_REPLIEGUE'
  | 'PRIMEROS_AUXILIOS'
  | 'COMBATE_INCENDIOS'
  | 'COMUNICACION_ENLACE';

export interface BrigadeMemberDTO {
  id: string;
  teacherId?: string;
  fullName: string;
  role: string;
  buildingZone: string;
  certified: boolean;
}

export interface EmergencyBrigadeDTO {
  id: string;
  tenantId: string;
  code: string;
  type: BrigadeType;
  name: string;
  colorHex: string;
  vestColor: string;
  leaderName: string;
  members: BrigadeMemberDTO[];
}

export interface CreateDrillRequestDTO {
  code?: string;
  title: string;
  drillType: DrillType;
  date: string;
  time: string;
  hypothesis: string;
  evacuationTimeSeconds: number;
  participants: {
    students: number;
    teachers: number;
    staff: number;
    visitors: number;
  };
  assemblyPoint: string;
  incidentsReported?: string[];
  evaluation: DrillEvaluation;
  notes?: string;
}

export interface AddBrigadeMemberRequestDTO {
  teacherId?: string;
  fullName: string;
  role: string;
  buildingZone: string;
  certified?: boolean;
}

export interface UpdateDrillEvaluationRequestDTO {
  evaluation: DrillEvaluation;
  notes?: string;
  incidentsReported?: string[];
}

// ==========================================
// 19. CONSEJO ESCOLAR DE PARTICIPACIÓN (CEPS) Y ASOCIACIÓN DE PADRES (APF)
// ==========================================

export type CepsCommitteeType =
  | 'LECTURA_APRENDIZAJES'
  | 'INFRAESTRUCTURA_ESCOLAR'
  | 'SALUD_NUTRICION'
  | 'SANA_CONVIVENCIA'
  | 'CONTRALORIA_SOCIAL';

export interface CepsCommitteeDTO {
  id: string;
  tenantId: string;
  name: string;
  type: CepsCommitteeType;
  leaderTutorName: string;
  leaderTeacherName: string;
  membersCount: number;
  objective: string;
  activeProjects: string[];
  status: 'ACTIVO' | 'EN_REVISION';
}

export type ApfBoardRole =
  | 'PRESIDENTE'
  | 'SECRETARIO'
  | 'TESORERO'
  | 'VOCAL_PREESCOLAR'
  | 'VOCAL_PRIMARIA_BAJA'
  | 'VOCAL_PRIMARIA_ALTA';

export interface ApfBoardMemberDTO {
  id: string;
  tenantId: string;
  role: ApfBoardRole;
  fullName: string;
  studentName: string;
  studentGrade: string;
  email: string;
  phone: string;
  appointedDate: string;
}

export type AssemblyType =
  | 'ASAMBLEA_GENERAL_APF'
  | 'SESION_ORDINARIA_CEPS'
  | 'SESION_EXTRAORDINARIA';

export interface SchoolAssemblyDTO {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  type: AssemblyType;
  date: string;
  time: string;
  location: string;
  quorumCount: number;
  agreements: string[];
  status: 'CONVOCADA' | 'REALIZADA_CON_ACTA' | 'CANCELADA';
  signedByDirector: boolean;
  signedByApfPresident: boolean;
  createdAt: string;
}

export interface CreateAssemblyRequestDTO {
  code?: string;
  title: string;
  type: AssemblyType;
  date: string;
  time: string;
  location: string;
  quorumCount: number;
  agreements: string[];
  status?: 'CONVOCADA' | 'REALIZADA_CON_ACTA' | 'CANCELADA';
}

export interface AddApfBoardMemberRequestDTO {
  role: ApfBoardRole;
  fullName: string;
  studentName: string;
  studentGrade: string;
  email: string;
  phone: string;
  appointedDate?: string;
}

export interface RecordAssemblyAgreementRequestDTO {
  agreement: string;
}

// ==========================================
// 20. INFRAESTRUCTURA ESCOLAR Y MANTENIMIENTO PREVENTIVO
// ==========================================

export type InfrastructureSystemType =
  | 'RED_HIDRAULICA_CISTERNAS'
  | 'SISTEMA_ELECTRICO'
  | 'ESTRUCTURA_IMPERMEABILIZACION'
  | 'CERRAJERIA_ACCESIBILIDAD'
  | 'AREAS_VERDES_RECREATIVAS';

export type InfrastructureInspectionFrequency =
  | 'SEMANAL'
  | 'MENSUAL'
  | 'BIMESTRAL'
  | 'SEMESTRAL'
  | 'ANUAL';

export type InspectionItemStatus =
  | 'OPTIMO'
  | 'REGULAR_OBSERVACIONES'
  | 'CRITICO_REQUIERE_ATENCION';

export interface InspectionCheckItem {
  name: string;
  status: InspectionItemStatus;
  notes?: string;
}

export interface FacilityInspectionDTO {
  id: string;
  tenantId: string;
  code: string;
  title: string;
  systemType: InfrastructureSystemType;
  frequency: InfrastructureInspectionFrequency;
  inspectionDate: string;
  inspectorName: string;
  verifiedItems: InspectionCheckItem[];
  overallStatus: 'CONFORME' | 'REQUIERE_MANTENIMIENTO' | 'NO_CONFORME_RIESGO';
  nextScheduledDate: string;
  evidenceNotes: string;
  createdAt: string;
}

export type FacilityWorkOrderPriority = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export type FacilityWorkOrderStatus =
  | 'PENDIENTE'
  | 'EN_EJECUCION'
  | 'FINALIZADA_CON_VB'
  | 'CANCELADA';

export interface FacilityWorkOrderDTO {
  id: string;
  tenantId: string;
  folio: string;
  systemType: InfrastructureSystemType;
  areaLocation: string;
  title: string;
  description: string;
  priority: FacilityWorkOrderPriority;
  assignedWorker: string;
  materialsCostMXN: number;
  laborCostMXN: number;
  totalCostMXN: number;
  reportedDate: string;
  targetCompletionDate: string;
  completedDate?: string;
  status: FacilityWorkOrderStatus;
  completionNotes?: string;
  approvedByDirector: boolean;
  createdAt: string;
}

export interface CreateFacilityInspectionRequestDTO {
  code?: string;
  title: string;
  systemType: InfrastructureSystemType;
  frequency: InfrastructureInspectionFrequency;
  inspectionDate: string;
  inspectorName: string;
  verifiedItems: InspectionCheckItem[];
  overallStatus: 'CONFORME' | 'REQUIERE_MANTENIMIENTO' | 'NO_CONFORME_RIESGO';
  nextScheduledDate: string;
  evidenceNotes?: string;
}

export interface CreateFacilityWorkOrderRequestDTO {
  folio?: string;
  systemType: InfrastructureSystemType;
  areaLocation: string;
  title: string;
  description: string;
  priority: FacilityWorkOrderPriority;
  assignedWorker: string;
  materialsCostMXN: number;
  laborCostMXN: number;
  targetCompletionDate: string;
}

export interface UpdateFacilityWorkOrderStatusRequestDTO {
  status: FacilityWorkOrderStatus;
  completionNotes?: string;
  actualCostMXN?: number;
}

// ==========================================
// 21. BECAS INSTITUCIONALES Y EXENCIONES SEP (5% OBLIGATORIO)
// ==========================================

export type ScholarshipType =
  | 'BECA_SEP_OBLIGATORIA'
  | 'BECA_EXCELENCIA_ACADEMICA'
  | 'BECA_SOCIOECONOMICA'
  | 'BECA_HERMANOS_FAMILIA'
  | 'BECA_DEPORTIVA_CULTURAL';

export type ScholarshipStatus =
  | 'EN_REVISION'
  | 'APROBADA'
  | 'CONDICIONADA'
  | 'RECHAZADA';

export interface ScholarshipApplicationDTO {
  id: string;
  tenantId: string;
  folio: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  type: ScholarshipType;
  previousGpa: number;
  monthlyFamilyIncomeMXN: number;
  dependentsCount: number;
  requestedDiscountPercentage: number;
  approvedDiscountPercentage?: number;
  standardTuitionMXN: number;
  finalTuitionMXN?: number;
  status: ScholarshipStatus;
  submissionDate: string;
  resolutionDate?: string;
  resolutionNotes?: string;
  reviewerName?: string;
  documentsVerified: boolean;
  createdAt: string;
}

export interface ScholarshipComplianceDTO {
  totalEnrolledStudents: number;
  minimumRequiredScholarshipsCount: number;
  activeScholarshipsCount: number;
  fullScholarshipEquivalentCount: number;
  compliancePercentage: number;
  isSepCompliant: boolean;
  totalScholarshipSavingsMXN: number;
}

export interface CreateScholarshipApplicationRequestDTO {
  folio?: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  type: ScholarshipType;
  previousGpa: number;
  monthlyFamilyIncomeMXN: number;
  dependentsCount: number;
  requestedDiscountPercentage: number;
  standardTuitionMXN?: number;
  documentsVerified?: boolean;
}

export interface EvaluateScholarshipApplicationRequestDTO {
  status: ScholarshipStatus;
  approvedDiscountPercentage: number;
  resolutionNotes: string;
  reviewerName: string;
}

// ==========================================
// 36. DOTACIONES CONALITEG Y ALMACÉN ESCOLAR
// ==========================================

export type ConalitegPackageStatus = 'COMPLETA' | 'DEFICIT_SOLICITADO' | 'EXCEDENTE_EN_RESGUARDO';

export type ConalitegDeliveryStatus = 'ENTREGADO_FIRMADO' | 'PENDIENTE_ENTREGA' | 'EXTRAVIADO_REPUESTO';

export interface ConalitegBookItem {
  code: string;
  title: string;
  field:
    | 'LENGUAJES'
    | 'SABERES_PENSAMIENTO_CIENTIFICO'
    | 'ETICA_NATURALEZA_SOCIEDADES'
    | 'DE_LO_HUMANO_COMUNITARIO'
    | 'MULTIPLES_LENGUAJES'
    | 'PREESCOLAR_DIDACTICO';
  editionYear: number;
}

export interface ConalitegPackageDTO {
  id: string;
  tenantId: string;
  remesaFolio: string; // Ej: REM-CONALITEG-2026-018
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string; // Ej: 1º Primaria
  includedBooks: ConalitegBookItem[];
  receivedPackagesCount: number;
  enrolledStudentsCount: number;
  deliveredPackagesCount: number;
  warehouseReserveCount: number;
  status: ConalitegPackageStatus;
  receptionDate: string;
  zoneSupervisorOffice: string; // Ej: Supervisión Escolar Zona 14
  createdAt: string;
}

export interface ConalitegDeliveryReceiptDTO {
  id: string;
  tenantId: string;
  folio: string; // Ej: ACU-2026-001
  packageId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  parentName: string;
  parentPhone?: string;
  deliveryDate: string;
  titlesDelivered: string[];
  status: ConalitegDeliveryStatus;
  notes?: string;
  deliveredByStaff: string;
  createdAt: string;
}

export type UniformCategory =
  | 'UNIFORME_DIARIO'
  | 'UNIFORME_DEPORTIVO'
  | 'BATA_LABORATORIO_ARTE'
  | 'MATERIAL_DIDACTICO';

export type UniformSize =
  | 'TALLA_4'
  | 'TALLA_6'
  | 'TALLA_8'
  | 'TALLA_10'
  | 'TALLA_12'
  | 'TALLA_14'
  | 'TALLA_16'
  | 'UNITALLA';

export interface SchoolUniformInventoryDTO {
  id: string;
  tenantId: string;
  sku: string; // Ej: UNI-PRI-POLO-08
  name: string;
  category: UniformCategory;
  level: 'PREESCOLAR' | 'PRIMARIA' | 'AMBOS';
  size: UniformSize;
  stockQuantity: number;
  minStockAlert: number;
  unitCostMXN: number;
  salePriceMXN: number;
  warehouseShelf: string; // Ej: Estante A-2
  supplierName: string;
  lastRestockDate: string;
  createdAt: string;
}

export interface CreateConalitegPackageRequestDTO {
  remesaFolio: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  includedBooks: ConalitegBookItem[];
  receivedPackagesCount: number;
  enrolledStudentsCount: number;
  receptionDate: string;
  zoneSupervisorOffice: string;
}

export interface CreateConalitegDeliveryReceiptDTO {
  folio?: string;
  packageId: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  parentName: string;
  parentPhone?: string;
  deliveryDate: string;
  titlesDelivered: string[];
  status: ConalitegDeliveryStatus;
  notes?: string;
  deliveredByStaff: string;
}

export interface CreateSchoolUniformItemRequestDTO {
  sku?: string;
  name: string;
  category: UniformCategory;
  level: 'PREESCOLAR' | 'PRIMARIA' | 'AMBOS';
  size: UniformSize;
  stockQuantity: number;
  minStockAlert: number;
  unitCostMXN: number;
  salePriceMXN: number;
  warehouseShelf: string;
  supplierName: string;
}

export interface UpdateSchoolUniformStockRequestDTO {
  deltaStock: number;
  reason: string;
}

// ==========================================
// 26. CERTIFICACIÓN DIGITAL & KÁRDEX OFICIAL
// ==========================================

export type CertificateType =
  | 'CONSTANCIA_ESTUDIOS_SIMPLE'
  | 'CONSTANCIA_INSCRIPCION'
  | 'CONSTANCIA_BUENA_CONDUCTA'
  | 'CONSTANCIA_PROMEDIO'
  | 'KARDEX_HISTORICO';

export type CertificateStatus =
  | 'EMITIDA'
  | 'PENDIENTE_FIRMA'
  | 'ENTREGADA_DIGITAL'
  | 'REVOCADA';

export interface OfficialCertificateDTO {
  id: string;
  folio: string;
  verificationToken: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  curp: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  groupName: string;
  academicCycle: string;
  type: CertificateType;
  issueDate: string;
  validUntil: string;
  status: CertificateStatus;
  averageGrade?: number;
  issuedByDirector: string;
  directorCedula: string;
  digitalSeal: string;
  notes?: string;
  downloadCount: number;
  qrValidationUrl: string;
  createdAt: string;
}

export interface KardexCycleHistoryItem {
  cycleName: string;
  gradeLevel: string;
  finalAverage: number;
  status: 'PROMOVIDO' | 'EN_CURSO' | 'ACREDITADO';
  subjects: {
    name: string;
    field: string;
    finalGrade: number;
  }[];
}

export interface StudentKardexDTO {
  studentId: string;
  studentName: string;
  studentCode: string;
  curp: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  currentGrade: string;
  admissionDate: string;
  cumulativeAverage: number;
  cyclesHistory: KardexCycleHistoryItem[];
  officialRvoe: string;
  cctSchoolCode: string;
  digitalSeal: string;
  verificationToken: string;
  lastUpdated: string;
}

export interface CreateCertificateRequestDTO {
  studentId: string;
  studentName: string;
  studentCode: string;
  curp?: string;
  level: 'PREESCOLAR' | 'PRIMARIA';
  grade: string;
  groupName?: string;
  academicCycle?: string;
  type: CertificateType;
  averageGrade?: number;
  notes?: string;
  issuedByDirector?: string;
  directorCedula?: string;
}

export interface VerifyDocumentResponseDTO {
  isValid: boolean;
  certificate?: OfficialCertificateDTO;
  reason?: string;
  verifiedAt: string;
}

// ========================================================
// 27. AUDITORÍA FORENSE & CUMPLIMIENTO NORMATIVO SEP
// ========================================================

export type AuditEventCategory =
  | 'RECTIFICACION_CALIFICACIONES'
  | 'MOVIMIENTO_MATRICULA'
  | 'EMISION_DOCUMENTO_OFICIAL'
  | 'APLICACION_BECA_SEP'
  | 'CORRECCION_ASISTENCIA'
  | 'SEGURIDAD_ACCESO';

export type AuditSeverity = 'INFO' | 'AVISO' | 'CRITICO' | 'ALERTA_NORMATIVA';

export interface AuditLogItemDTO {
  id: string;
  folio: string;
  timestamp: string;
  category: AuditEventCategory;
  severity: AuditSeverity;
  actionName: string;
  entityType: string;
  entityId: string;
  entityIdentifier: string;
  studentName?: string;
  performedByUserId: string;
  performedByName: string;
  performedByRole: string;
  ipAddress: string;
  previousValue?: string;
  newValue?: string;
  justificationReason: string;
  officialAgreementRef?: string;
  integrityHash: string;
  verifiedTamperFree: boolean;
}

export type InspectionStatus =
  | 'CONFORME'
  | 'CON_OBSERVACIONES_SOLVENTADAS'
  | 'OBSERVACIONES_PENDIENTES'
  | 'EN_REVISION';

export interface SupervisionInspectionDTO {
  id: string;
  officialNoticeNumber: string;
  supervisionZone: string;
  inspectorName: string;
  inspectionDate: string;
  purpose: string;
  sampleAuditedCount: number;
  complianceScorePercent: number;
  status: InspectionStatus;
  findings: string[];
  agreedActions: string[];
  closureMinutesUrl?: string;
  closedAt?: string;
  signedByInspector: boolean;
  signedByDirector: boolean;
}

export interface CreateAuditLogRequestDTO {
  category: AuditEventCategory;
  severity: AuditSeverity;
  actionName: string;
  entityType: string;
  entityId: string;
  entityIdentifier: string;
  studentName?: string;
  previousValue?: string;
  newValue?: string;
  justificationReason: string;
  officialAgreementRef?: string;
  performedByName?: string;
  performedByRole?: string;
}

export interface CreateSupervisionInspectionRequestDTO {
  officialNoticeNumber: string;
  supervisionZone: string;
  inspectorName: string;
  inspectionDate: string;
  purpose: string;
  sampleAuditedCount: number;
  complianceScorePercent: number;
  status: InspectionStatus;
  findings: string[];
  agreedActions: string[];
}

export interface ComplianceSummaryDTO {
  overallComplianceScore: number;
  rvoeStatus: string;
  cctSchoolCode: string;
  totalAuditLogsCount: number;
  criticalEventsCount: number;
  inspectionsSummary: {
    totalInspections: number;
    conformingCount: number;
    pendingCount: number;
    lastInspectionDate: string;
  };
  regulatoryChecklist: {
    item: string;
    requirement: string;
    isCompliant: boolean;
    evidenceRef: string;
  }[];
}










