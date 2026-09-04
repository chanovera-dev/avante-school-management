import bcrypt from 'bcryptjs';
import {
  UserRole,
  TenantStatus,
  SubscriptionPlanTier,
  SubscriptionStatus,
  EducationLevel,
  CycleStatus,
  StudentStatus,
  GroupType,
  GatewayFeePolicy,
  ChargeStatus,
  PaymentStatus,
  PaymentMethod,
  FundDestination,
  TenantDTO,
  CampusDTO,
  UserDTO,
  AcademicCycleDTO,
  AcademicGroupDTO,
  StudentDTO,
  ChargeDTO,
  PaymentTransactionDTO,
  CashRegisterSummaryDTO,
  SuperAdminSchoolSummaryDTO,
  EducationalLevelDTO,
  TeacherDTO,
  SubjectDTO,
  StudentSubjectGradeDTO,
  SepReportCardDTO,
  AttendanceStatus,
  DailyAttendanceRecordDTO,
  SaveDailyAttendanceRequestDTO,
  DailyAttendanceStatsDTO,
  AbsenceJustificationDTO,
  CreateAbsenceJustificationRequestDTO,
  SchoolNoticeDTO,
  NoticeAcknowledgmentDTO,
  CreateSchoolNoticeRequestDTO,
  AcknowledgeNoticeRequestDTO,
  SchoolCredentialDTO,
  ScanCredentialAccessRequestDTO,
  AccessLogDTO,
  SchoolAssignmentDTO,
  StudentAssignmentSubmissionDTO,
  CreateAssignmentRequestDTO,
  SubmitAssignmentRequestDTO,
  GradeSubmissionRequestDTO,
  ClassScheduleSlotDTO,
  CreateScheduleSlotRequestDTO,
  ScheduleConflictValidationDTO,
  DayOfWeek,
  ClassroomFacility,
  AdmissionApplicantStatus,
  ApplicantDocumentType,
  ApplicantDocumentStatus,
  ApplicantDocumentDTO,
  AdmissionApplicantDTO,
  CreateAdmissionApplicantRequestDTO,
  ScheduleApplicantEvaluationRequestDTO,
  ValidateApplicantDocumentRequestDTO,
  ConvertApplicantToStudentRequestDTO,
  BookCategory,
  BookLoanStatus,
  BookLoanType,
  SchoolBookDTO,
  BookLoanDTO,
  CreateBookRequestDTO,
  CreateBookLoanRequestDTO,
  ReturnBookLoanRequestDTO,
  StudentLibraryClearanceDTO,
  TransportShift,
  TransportBoardingStatus,
  RouteStopDTO,
  TransportVehicleDTO,
  TransportRouteDTO,
  StudentTransportEnrollmentDTO,
  DailyTransportBoardingLogDTO,
  CreateTransportRouteRequestDTO,
  EnrollStudentInTransportRequestDTO,
  RecordTransportBoardingRequestDTO,
  CafeteriaItemCategory,
  CafeteriaProductDTO,
  StudentWalletDTO,
  CafeteriaPurchaseItemDTO,
  CafeteriaTransactionDTO,
  CreateCafeteriaProductRequestDTO,
  TopUpStudentWalletRequestDTO,
  UpdateWalletDailyLimitRequestDTO,
  ProcessCafeteriaSaleRequestDTO,
  MedicalConsultationReason,
  MedicalConsultationSeverity,
  MedicalConsultationStatus,
  MedicalConsultationDTO,
  ScheduledMedicationDTO,
  FirstAidSupplyDTO,
  CreateMedicalConsultationRequestDTO,
  CreateScheduledMedicationRequestDTO,
  AdministerMedicationRequestDTO,
  UpdateMedicalConsultationStatusRequestDTO,
  WorkshopCategory,
  WorkshopStatus,
  ExtracurricularWorkshopDTO,
  WorkshopEnrollmentDTO,
  WorkshopAttendanceLogDTO,
  CreateExtracurricularWorkshopRequestDTO,
  EnrollStudentInWorkshopRequestDTO,
  RecordWorkshopAttendanceRequestDTO,
  AssetCategory,
  AssetCondition,
  SchoolAssetDTO,
  MaintenanceTicketStatus,
  MaintenanceTicketPriority,
  AssetMaintenanceTicketDTO,
  CreateSchoolAssetRequestDTO,
  UpdateSchoolAssetConditionRequestDTO,
  CreateAssetMaintenanceTicketRequestDTO,
  UpdateMaintenanceTicketStatusRequestDTO,
  SurveyTargetAudience,
  SurveyCategory,
  SurveyStatus,
  SurveyQuestionDTO,
  InstitutionalSurveyDTO,
  SurveyResponseDTO,
  SuggestionCategory,
  SuggestionStatus,
  ConfidentialSuggestionDTO,
  CreateInstitutionalSurveyRequestDTO,
  SubmitSurveyResponseRequestDTO,
  CreateConfidentialSuggestionRequestDTO,
  UpdateSuggestionStatusRequestDTO,
  SchoolEventType,
  EventAudience,
  TeacherEventCommissionDTO,
  SchoolEventDTO,
  CreateSchoolEventRequestDTO,
  AssignTeacherCommissionRequestDTO,
  UpdateCommissionStatusRequestDTO,
  RecordCteAgreementsRequestDTO,
  JobVacancyDepartment,
  JobVacancyType,
  JobVacancyStatus,
  JobVacancyDTO,
  CandidateHiringStatus,
  SepAccreditationStatus,
  TeacherCandidateDTO,
  CreateJobVacancyRequestDTO,
  CreateTeacherCandidateRequestDTO,
  UpdateCandidateStatusRequestDTO,
  DrillType,
  DrillEvaluation,
  DrillParticipantsCount,
  CivilProtectionDrillDTO,
  BrigadeType,
  BrigadeMemberDTO,
  EmergencyBrigadeDTO,
  CreateDrillRequestDTO,
  AddBrigadeMemberRequestDTO,
  UpdateDrillEvaluationRequestDTO,
  CepsCommitteeType,
  CepsCommitteeDTO,
  ApfBoardRole,
  ApfBoardMemberDTO,
  AssemblyType,
  SchoolAssemblyDTO,
  CreateAssemblyRequestDTO,
  AddApfBoardMemberRequestDTO,
  RecordAssemblyAgreementRequestDTO,
  InfrastructureSystemType,
  InfrastructureInspectionFrequency,
  InspectionItemStatus,
  InspectionCheckItem,
  FacilityInspectionDTO,
  FacilityWorkOrderPriority,
  FacilityWorkOrderStatus,
  FacilityWorkOrderDTO,
  CreateFacilityInspectionRequestDTO,
  CreateFacilityWorkOrderRequestDTO,
  UpdateFacilityWorkOrderStatusRequestDTO,
  ScholarshipType,
  ScholarshipStatus,
  ScholarshipApplicationDTO,
  ScholarshipComplianceDTO,
  CreateScholarshipApplicationRequestDTO,
  EvaluateScholarshipApplicationRequestDTO,
  ConalitegPackageStatus,
  ConalitegDeliveryStatus,
  ConalitegBookItem,
  ConalitegPackageDTO,
  ConalitegDeliveryReceiptDTO,
  UniformCategory,
  UniformSize,
  SchoolUniformInventoryDTO,
  CreateConalitegPackageRequestDTO,
  CreateConalitegDeliveryReceiptDTO,
  CreateSchoolUniformItemRequestDTO,
  UpdateSchoolUniformStockRequestDTO,
  CertificateType,
  CertificateStatus,
  OfficialCertificateDTO,
  StudentKardexDTO,
  CreateCertificateRequestDTO,
  VerifyDocumentResponseDTO,
  AuditEventCategory,
  AuditSeverity,
  AuditLogItemDTO,
  InspectionStatus,
  SupervisionInspectionDTO,
  CreateAuditLogRequestDTO,
  CreateSupervisionInspectionRequestDTO,
  ComplianceSummaryDTO,
} from '@asm/shared';

export interface UserWithPassword extends UserDTO {
  passwordHash: string;
}

export interface EmailVerificationToken {
  email: string;
  code: string;
  tenantId: string;
  userId: string;
  expiresAt: Date;
}

class MemoryStore {
  public tenants: TenantDTO[] = [];
  public campuses: CampusDTO[] = [];
  public users: UserWithPassword[] = [];
  public educationalLevels: EducationalLevelDTO[] = [];
  public teachers: TeacherDTO[] = [];
  public subjects: SubjectDTO[] = [];
  public cycles: AcademicCycleDTO[] = [];
  public groups: AcademicGroupDTO[] = [];
  public students: StudentDTO[] = [];
  public grades: StudentSubjectGradeDTO[] = [];
  public attendanceRecords: DailyAttendanceRecordDTO[] = [];
  public justifications: AbsenceJustificationDTO[] = [];
  public schoolNotices: SchoolNoticeDTO[] = [];
  public noticeAcknowledgments: NoticeAcknowledgmentDTO[] = [];
  public credentials: SchoolCredentialDTO[] = [];
  public accessLogs: AccessLogDTO[] = [];
  public assignments: SchoolAssignmentDTO[] = [];
  public assignmentSubmissions: StudentAssignmentSubmissionDTO[] = [];
  public scheduleSlots: ClassScheduleSlotDTO[] = [];
  public applicants: AdmissionApplicantDTO[] = [];
  public books: SchoolBookDTO[] = [];
  public bookLoans: BookLoanDTO[] = [];
  public transportVehicles: TransportVehicleDTO[] = [];
  public transportRoutes: TransportRouteDTO[] = [];
  public transportEnrollments: StudentTransportEnrollmentDTO[] = [];
  public transportBoardingLogs: DailyTransportBoardingLogDTO[] = [];
  public cafeteriaProducts: CafeteriaProductDTO[] = [];
  public studentWallets: StudentWalletDTO[] = [];
  public cafeteriaTransactions: CafeteriaTransactionDTO[] = [];
  public medicalConsultations: MedicalConsultationDTO[] = [];
  public scheduledMedications: ScheduledMedicationDTO[] = [];
  public firstAidSupplies: FirstAidSupplyDTO[] = [];
  public extracurricularWorkshops: ExtracurricularWorkshopDTO[] = [];
  public workshopEnrollments: WorkshopEnrollmentDTO[] = [];
  public workshopAttendanceLogs: WorkshopAttendanceLogDTO[] = [];
  public schoolAssets: SchoolAssetDTO[] = [];
  public assetMaintenanceTickets: AssetMaintenanceTicketDTO[] = [];
  public institutionalSurveys: InstitutionalSurveyDTO[] = [];
  public surveyResponses: SurveyResponseDTO[] = [];
  public confidentialSuggestions: ConfidentialSuggestionDTO[] = [];
  public schoolEvents: SchoolEventDTO[] = [];
  public jobVacancies: JobVacancyDTO[] = [];
  public teacherCandidates: TeacherCandidateDTO[] = [];
  public civilProtectionDrills: CivilProtectionDrillDTO[] = [];
  public emergencyBrigades: EmergencyBrigadeDTO[] = [];
  public cepsCommittees: CepsCommitteeDTO[] = [];
  public apfBoardMembers: ApfBoardMemberDTO[] = [];
  public schoolAssemblies: SchoolAssemblyDTO[] = [];
  public facilityInspections: FacilityInspectionDTO[] = [];
  public facilityWorkOrders: FacilityWorkOrderDTO[] = [];
  public scholarshipApplications: ScholarshipApplicationDTO[] = [];
  public conalitegPackages: ConalitegPackageDTO[] = [];
  public conalitegDeliveryReceipts: ConalitegDeliveryReceiptDTO[] = [];
  public schoolUniforms: SchoolUniformInventoryDTO[] = [];
  public officialCertificates: OfficialCertificateDTO[] = [];
  public auditLogs: AuditLogItemDTO[] = [];
  public supervisionInspections: SupervisionInspectionDTO[] = [];
  public charges: ChargeDTO[] = [];
  public payments: PaymentTransactionDTO[] = [];
  public verificationTokens: EmailVerificationToken[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    const defaultPasswordHash = bcrypt.hashSync('Admin123!', 10);

    // 1. Tenant Inicial (Colegio Hidalgo)
    const tenant1: TenantDTO = {
      id: 'tenant-hidalgo-01',
      name: 'Colegio Miguel Hidalgo',
      subdomain: 'hidalgo',
      legalBusinessName: 'Institución Educativa Hidalgo S.C.',
      rfc: 'IEH920815AB1',
      contactEmail: 'contacto@colegiohidalgo.edu.mx',
      contactPhone: '+52 55 1234 5678',
      timeZone: 'America/Mexico_City',
      currency: 'MXN',
      gatewayFeePolicy: GatewayFeePolicy.TRANSFERRED_TO_TUTOR,
      whatsappEnabled: true,
      status: TenantStatus.ACTIVO,
      isEmailVerified: true,
      subscription: {
        id: 'sub-01',
        tenantId: 'tenant-hidalgo-01',
        planTier: SubscriptionPlanTier.FREE_TIER_LAUNCH,
        status: SubscriptionStatus.FREE,
        startedAt: new Date('2026-08-01'),
        maxStudentsLimit: 999999, // Ilimitado en lanzamiento
        monthlyFeeMXN: 0,
        isFreeLaunchPromo: true,
      },
      createdAt: new Date('2026-08-01'),
      updatedAt: new Date(),
    };

    // 2. Tenant de Prueba 2 (Instituto Vanguardia)
    const tenant2: TenantDTO = {
      id: 'tenant-vanguardia-02',
      name: 'Instituto Moderno Vanguardia',
      subdomain: 'vanguardia',
      legalBusinessName: 'Vanguardia Educativa de Monterrey S.A. de C.V.',
      rfc: 'VEM150420XY9',
      contactEmail: 'direccion@vanguardia.edu.mx',
      contactPhone: '+52 81 8345 6789',
      timeZone: 'America/Monterrey',
      currency: 'MXN',
      gatewayFeePolicy: GatewayFeePolicy.ABSORBED_BY_SCHOOL,
      whatsappEnabled: false,
      status: TenantStatus.ACTIVO,
      isEmailVerified: true,
      subscription: {
        id: 'sub-02',
        tenantId: 'tenant-vanguardia-02',
        planTier: SubscriptionPlanTier.PRO_CAMPUS,
        status: SubscriptionStatus.ACTIVE_PAID,
        startedAt: new Date('2026-08-15'),
        maxStudentsLimit: 5000,
        monthlyFeeMXN: 2499, // Preparado para tarifar a futuro
        isFreeLaunchPromo: false,
      },
      createdAt: new Date('2026-08-15'),
      updatedAt: new Date(),
    };

    this.tenants.push(tenant1, tenant2);

    // 3. Campuses
    const campus1: CampusDTO = {
      id: 'campus-central-01',
      tenantId: tenant1.id,
      name: 'Plantel Central Valle',
      code: 'PCV-01',
      address: 'Av. Universidad 1200, Col. del Valle, CDMX',
      phone: '+52 55 1234 5678',
      levelsOffered: [
        EducationLevel.KINDER_PREESCOLAR,
        EducationLevel.PRIMARIA,
        EducationLevel.SECUNDARIA,
        EducationLevel.PREPARATORIA,
      ],
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campuses.push(campus1);

    // 4. Usuarios
    const usersData: UserWithPassword[] = [
      {
        id: 'user-superadmin-01',
        tenantId: 'platform-master',
        email: 'superadmin@avanteschoolmanagement.com',
        fullName: 'Super Administrador ASM (Dueño Plataforma)',
        role: UserRole.SUPER_ADMIN,
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'user-director-01',
        tenantId: tenant1.id,
        campusId: campus1.id,
        email: 'director@colegiohidalgo.edu.mx',
        fullName: 'Dra. María Elena Ramos (Directora)',
        role: UserRole.DIRECTOR,
        phone: '+52 55 9876 5432',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'user-control-01',
        tenantId: tenant1.id,
        campusId: campus1.id,
        email: 'control@colegiohidalgo.edu.mx',
        fullName: 'Lic. Fernando Gómez (Control Escolar)',
        role: UserRole.CONTROL_ESCOLAR,
        phone: '+52 55 8765 4321',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'user-caja-01',
        tenantId: tenant1.id,
        campusId: campus1.id,
        email: 'caja@colegiohidalgo.edu.mx',
        fullName: 'C.P. Claudia Mendoza (Finanzas & Caja)',
        role: UserRole.FINANCIERO_CAJA,
        phone: '+52 55 7654 3210',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'user-docente-01',
        tenantId: tenant1.id,
        campusId: campus1.id,
        email: 'docente@colegiohidalgo.edu.mx',
        fullName: 'Prof. Roberto Salazar',
        role: UserRole.DOCENTE,
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'user-tutor-01',
        tenantId: tenant1.id,
        email: 'padre@familia.com',
        fullName: 'Ing. Carlos Mendoza (Tutor Titular)',
        role: UserRole.TUTOR,
        phone: '+52 55 6543 2109',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.users.push(...usersData);

    // 5. Ciclo Escolar Activo
    const cycle1: AcademicCycleDTO = {
      id: 'cycle-2026-2027',
      tenantId: tenant1.id,
      campusId: campus1.id,
      name: 'Ciclo Escolar 2026-2027',
      startDate: new Date('2026-08-24'),
      endDate: new Date('2027-07-09'),
      status: CycleStatus.ACTIVE,
    };
    this.cycles.push(cycle1);

    // 6. Grupos
    const groupsData: AcademicGroupDTO[] = [
      {
        id: 'group-prim-1a',
        tenantId: tenant1.id,
        campusId: campus1.id,
        cycleId: cycle1.id,
        level: EducationLevel.PRIMARIA,
        gradeNumber: 1,
        name: 'Primaria 1º "A"',
        shift: 'MATUTINO',
        maxCapacity: 30,
        type: GroupType.BASE_REGULAR,
        tutorTeacherId: 'user-docente-01',
      },
      {
        id: 'group-prep-1a',
        tenantId: tenant1.id,
        campusId: campus1.id,
        cycleId: cycle1.id,
        level: EducationLevel.PREPARATORIA,
        gradeNumber: 1,
        name: 'Preparatoria 1º "A"',
        shift: 'MATUTINO',
        maxCapacity: 35,
        type: GroupType.BASE_REGULAR,
      },
      {
        id: 'group-prep-1b',
        tenantId: tenant1.id,
        campusId: campus1.id,
        cycleId: cycle1.id,
        level: EducationLevel.PREPARATORIA,
        gradeNumber: 1,
        name: 'Preparatoria 1º "B"',
        shift: 'MATUTINO',
        maxCapacity: 35,
        type: GroupType.BASE_REGULAR,
      },
      {
        id: 'group-opt-robotica',
        tenantId: tenant1.id,
        campusId: campus1.id,
        cycleId: cycle1.id,
        level: EducationLevel.PREPARATORIA,
        gradeNumber: 1,
        name: 'Taller de Robótica Aplicada (Multigrupo 1ºA + 1ºB)',
        shift: 'EXTENDIDO',
        maxCapacity: 25,
        type: GroupType.OPTATIVA_TALLER_MULTIGRUPO,
        tutorTeacherId: 'user-docente-01',
      },
    ];
    this.groups.push(...groupsData);

    // 7. Alumnos
    const studentsData: StudentDTO[] = [
      {
        id: 'student-01',
        tenantId: tenant1.id,
        campusId: campus1.id,
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        firstName: 'Carlos',
        lastName: 'Mendoza Ruiz',
        birthDate: new Date('2018-05-12'),
        gender: 'M',
        status: StudentStatus.INSCRITO_ACTIVO,
        bloodType: 'O+',
        allergies: 'Ninguna conocida',
        currentGroupBaseId: 'group-prim-1a',
        isConditional: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'student-02',
        tenantId: tenant1.id,
        campusId: campus1.id,
        studentCode: '2026-PRI-002',
        curp: 'HECV180914MDFRR05',
        firstName: 'Valentina',
        lastName: 'Herrera Castro',
        birthDate: new Date('2018-09-14'),
        gender: 'F',
        status: StudentStatus.INSCRITO_ACTIVO,
        bloodType: 'A+',
        allergies: 'Ninguna',
        currentGroupBaseId: 'group-prim-1a',
        isConditional: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'student-03',
        tenantId: tenant1.id,
        campusId: campus1.id,
        studentCode: '2026-PREP-045',
        curp: 'HERA091015MDFLN08',
        firstName: 'Sofía',
        lastName: 'Hernández Ramos',
        birthDate: new Date('2009-10-15'),
        gender: 'F',
        status: StudentStatus.INSCRITO_CONDICIONADO,
        currentGroupBaseId: 'group-prep-1a',
        isConditional: true,
        conditionalDeadline: new Date('2026-10-31'),
        emergencyNotes: 'Certificado de Secundaria en trámite en SEP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.students.push(...studentsData);

    // 8. Cargos
    const chargesData: ChargeDTO[] = [
      {
        id: 'charge-sept-01',
        tenantId: tenant1.id,
        studentId: 'student-01',
        conceptName: 'Colegiatura Septiembre 2026',
        periodName: 'Septiembre 2026',
        baseAmount: 4000.0,
        discountAmount: 400.0,
        lateFeeAmount: 0.0,
        paidAmount: 3600.0,
        outstandingBalance: 0.0,
        dueDate: new Date('2026-09-10'),
        earlyBirdDueDate: new Date('2026-09-05'),
        status: ChargeStatus.LIQUIDADO,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'charge-oct-01',
        tenantId: tenant1.id,
        studentId: 'student-01',
        conceptName: 'Colegiatura Octubre 2026',
        periodName: 'Octubre 2026',
        baseAmount: 4000.0,
        discountAmount: 400.0,
        lateFeeAmount: 0.0,
        paidAmount: 2000.0,
        outstandingBalance: 1600.0,
        dueDate: new Date('2026-10-10'),
        earlyBirdDueDate: new Date('2026-10-05'),
        status: ChargeStatus.ABONADO_PARCIAL,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.charges.push(...chargesData);

    // 9. Pagos
    const paymentsData: PaymentTransactionDTO[] = [
      {
        id: 'pay-01',
        tenantId: tenant1.id,
        chargeId: 'charge-sept-01',
        studentId: 'student-01',
        amount: 3600.0,
        method: PaymentMethod.CODI_BANXICO,
        fundDestination: FundDestination.CUENTA_BANCARIA,
        status: PaymentStatus.APROBADO_CONFIRMADO,
        authorizationFolio: 'CODI-BANXICO-8849201',
        isOfflineProvisional: false,
        paidAt: new Date('2026-09-04'),
      },
      {
        id: 'pay-02',
        tenantId: tenant1.id,
        chargeId: 'charge-oct-01',
        studentId: 'student-01',
        amount: 2000.0,
        method: PaymentMethod.EFECTIVO_VENTANILLA,
        fundDestination: FundDestination.EFECTIVO_BOVEDA_CAJA,
        status: PaymentStatus.APROBADO_CONFIRMADO,
        authorizationFolio: 'REC-CAJA-00452',
        isOfflineProvisional: false,
        paidAt: new Date('2026-10-02'),
      },
    ];
    this.payments.push(...paymentsData);

    // 10. Niveles Educativos Iniciales
    const levelsData: EducationalLevelDTO[] = [
      {
        id: 'PREESCOLAR',
        tenantId: tenant1.id,
        name: 'Preescolar / Jardín de Niños',
        cctCode: '30PJN0145X',
        directorName: 'Mtra. Sofía Valenzuela',
        directorTitle: 'Directora Técnica de Preescolar',
        directorEmail: 'preescolar@colegiohidalgo.edu.mx',
        directorPhone: '+52 55 1234 5679',
        isEmailVerified: true,
        academicCoordinator: 'Profra. Laura Méndez',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'PRIMARIA',
        tenantId: tenant1.id,
        name: 'Primaria',
        cctCode: '30PPR0289Z',
        directorName: 'Lic. Armando Paredes',
        directorTitle: 'Director Técnico de Primaria',
        directorEmail: 'primaria@colegiohidalgo.edu.mx',
        directorPhone: '+52 55 1234 5680',
        isEmailVerified: true,
        academicCoordinator: 'Prof. Mario Casas',
        grades: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.educationalLevels.push(...levelsData);

    // 11. Plantilla Docente Inicial
    const teachersData: TeacherDTO[] = [
      {
        id: 'teacher-01',
        tenantId: tenant1.id,
        userId: 'user-docente-01',
        fullName: 'Prof. Roberto Salazar',
        email: 'docente@colegiohidalgo.edu.mx',
        phone: '+52 55 2233 4455',
        levelId: 'PRIMARIA',
        specialty: 'Licenciatura en Educación Primaria',
        assignedGroup: 'Primaria 1º "A"',
        assignedSubject: 'Lenguajes (Español)',
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'teacher-02',
        tenantId: tenant1.id,
        fullName: 'Profra. Carmen Morales',
        email: 'cmorales@colegiohidalgo.edu.mx',
        phone: '+52 55 3344 5566',
        levelId: 'PRIMARIA',
        specialty: 'Licenciatura en Pedagogía / Matemáticas',
        assignedGroup: 'Primaria 1º "A"',
        assignedSubject: 'Saberes y Pensamiento Científico (Matemáticas)',
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'teacher-03',
        tenantId: tenant1.id,
        fullName: 'Prof. Alejandro Rivas',
        email: 'arivas@colegiohidalgo.edu.mx',
        phone: '+52 55 4455 6677',
        levelId: 'PRIMARIA',
        specialty: 'Lic. en Biología y Ciencias Naturales',
        assignedGroup: 'Primaria 1º "A"',
        assignedSubject: 'Ciencias Naturales y Tecnología',
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'teacher-04',
        tenantId: tenant1.id,
        fullName: 'Profra. Mariana Trejo',
        email: 'mtrejo@colegiohidalgo.edu.mx',
        phone: '+52 55 5566 7788',
        levelId: 'PREESCOLAR',
        specialty: 'Lic. en Educación Preescolar',
        assignedGroup: 'Preescolar 1º "A"',
        assignedSubject: 'Campos Formativos Integrados',
        isEmailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    this.teachers.push(...teachersData);

    // 12. Catálogo Oficial de Asignaturas SEP
    const subjectsData: SubjectDTO[] = [
      {
        id: 'sub-prim-leng',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Lenguajes (Español)',
        campoFormativo: 'Lenguajes',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 1,
      },
      {
        id: 'sub-prim-mat',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Saberes y Pensamiento Científico (Matemáticas)',
        campoFormativo: 'Saberes y Pensamiento Científico',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 2,
      },
      {
        id: 'sub-prim-nat',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Ciencias Naturales y Tecnología',
        campoFormativo: 'Saberes y Pensamiento Científico',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 3,
      },
      {
        id: 'sub-prim-soc',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Ética, Naturaleza y Sociedades (Historia y Geografía)',
        campoFormativo: 'Ética, Naturaleza y Sociedades',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 4,
      },
      {
        id: 'sub-prim-civ',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Formación Cívica y Ética',
        campoFormativo: 'Ética, Naturaleza y Sociedades',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 5,
      },
      {
        id: 'sub-prim-edufis',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'De lo Humano y lo Comunitario (Educación Física)',
        campoFormativo: 'De lo Humano y lo Comunitario',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 6,
      },
      {
        id: 'sub-prim-art',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Artes y Creatividad',
        campoFormativo: 'De lo Humano y lo Comunitario',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 7,
      },
      {
        id: 'sub-prim-ing',
        tenantId: tenant1.id,
        levelId: 'PRIMARIA',
        name: 'Lengua Extranjera (Inglés)',
        campoFormativo: 'Lenguajes',
        grade: 'Todos',
        isQualitative: false,
        orderIndex: 8,
      },
      {
        id: 'sub-pre-leng',
        tenantId: tenant1.id,
        levelId: 'PREESCOLAR',
        name: 'Lenguajes y Expresión Artística',
        campoFormativo: 'Lenguajes',
        grade: 'Todos',
        isQualitative: true,
        orderIndex: 1,
      },
      {
        id: 'sub-pre-sab',
        tenantId: tenant1.id,
        levelId: 'PREESCOLAR',
        name: 'Saberes y Pensamiento Científico',
        campoFormativo: 'Saberes y Pensamiento Científico',
        grade: 'Todos',
        isQualitative: true,
        orderIndex: 2,
      },
      {
        id: 'sub-pre-soc',
        tenantId: tenant1.id,
        levelId: 'PREESCOLAR',
        name: 'Ética, Naturaleza y Sociedades',
        campoFormativo: 'Ética, Naturaleza y Sociedades',
        grade: 'Todos',
        isQualitative: true,
        orderIndex: 3,
      },
      {
        id: 'sub-pre-hum',
        tenantId: tenant1.id,
        levelId: 'PREESCOLAR',
        name: 'De lo Humano y lo Comunitario',
        campoFormativo: 'De lo Humano y lo Comunitario',
        grade: 'Todos',
        isQualitative: true,
        orderIndex: 4,
      },
    ];
    this.subjects.push(...subjectsData);

    // 13. Evaluaciones Trimestrales Iniciales (Primaria 1º "A")
    const gradesData: StudentSubjectGradeDTO[] = [
      {
        id: 'grade-prim1a-01-leng',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Español)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        period1: 9.5,
        period2: 9.0,
        period3: null,
        finalGrade: 9.3,
        period1Absences: 1,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Excelente comprensión lectora y expresión oral. Muy participativo.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-mat',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico (Matemáticas)',
        teacherId: 'teacher-02',
        teacherName: 'Profra. Carmen Morales',
        period1: 9.0,
        period2: 9.5,
        period3: null,
        finalGrade: 9.3,
        period1Absences: 0,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Habilidad destacada en razonamiento numérico y resolución de problemas.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-nat',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-nat',
        subjectName: 'Ciencias Naturales y Tecnología',
        teacherId: 'teacher-03',
        teacherName: 'Prof. Alejandro Rivas',
        period1: 8.5,
        period2: 9.0,
        period3: null,
        finalGrade: 8.8,
        period1Absences: 2,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Muestra gran interés por los proyectos científicos y el cuidado ambiental.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-soc',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-soc',
        subjectName: 'Ética, Naturaleza y Sociedades (Historia y Geografía)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        period1: 10.0,
        period2: 9.5,
        period3: null,
        finalGrade: 9.8,
        period1Absences: 0,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Comprende con claridad la historia comunitaria y valores cívicos.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-civ',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-civ',
        subjectName: 'Formación Cívica y Ética',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        period1: 9.0,
        period2: 9.0,
        period3: null,
        finalGrade: 9.0,
        period1Absences: 0,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Respeta normas de convivencia escolar y promueve la empatía.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-edufis',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-edufis',
        subjectName: 'De lo Humano y lo Comunitario (Educación Física)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        period1: 10.0,
        period2: 10.0,
        period3: null,
        finalGrade: 10.0,
        period1Absences: 0,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Excelente coordinación motriz y trabajo en equipo.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-art',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-art',
        subjectName: 'Artes y Creatividad',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        period1: 9.5,
        period2: 9.5,
        period3: null,
        finalGrade: 9.5,
        period1Absences: 0,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Gran sentido estético en actividades de dibujo y expresión artística.',
        updatedAt: new Date(),
      },
      {
        id: 'grade-prim1a-01-ing',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MERU180512HDFZRR03',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        subjectId: 'sub-prim-ing',
        subjectName: 'Lengua Extranjera (Inglés)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        period1: 8.5,
        period2: 9.0,
        period3: null,
        finalGrade: 8.8,
        period1Absences: 1,
        period2Absences: 0,
        period3Absences: 0,
        observations: 'Buen avance en vocabulario y estructuras básicas en inglés.',
        updatedAt: new Date(),
      },
    ];
    this.grades.push(...gradesData);

    // 14. Asistencias Diarias Iniciales (Primaria 1º "A" para hoy)
    const today = new Date().toISOString().split('T')[0];
    const initialAttendance: DailyAttendanceRecordDTO[] = [
      {
        id: 'att-prim1a-std1-today',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        date: today,
        status: AttendanceStatus.PRESENTE,
        recordedByTeacherId: 'teacher-01',
        recordedByTeacherName: 'Prof. Roberto Salazar',
        notes: 'Asistencia puntual.',
        createdAt: new Date(),
      },
      {
        id: 'att-prim1a-std2-today',
        tenantId: tenant1.id,
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        date: today,
        status: AttendanceStatus.PRESENTE,
        recordedByTeacherId: 'teacher-01',
        recordedByTeacherName: 'Prof. Roberto Salazar',
        notes: 'Asistencia puntual.',
        createdAt: new Date(),
      },
    ];
    this.attendanceRecords.push(...initialAttendance);

    // 15. Justificantes Escolares Iniciales
    const initialJustifications: AbsenceJustificationDTO[] = [
      {
        id: 'just-01',
        tenantId: tenant1.id,
        folio: 'JUST-2026-001',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupId: 'group-prim-1a',
        groupName: 'Primaria 1º "A"',
        startDate: '2026-09-01',
        endDate: '2026-09-01',
        reasonCategory: 'MEDICA',
        reasonDescription: 'Cuadro de faringitis aguda. Se autoriza reposo médico oficial de 24 horas.',
        documentFolio: 'REC-IMSS-884920',
        authorizedBy: 'Lic. Armando Paredes (Director Técnico de Primaria)',
        allowAssignmentMakeup: true,
        status: 'APROBADO',
        createdAt: new Date(),
      },
    ];
    this.justifications.push(...initialJustifications);

    // 16. Circulares y Citatorios Iniciales
    const initialNotices: SchoolNoticeDTO[] = [
      {
        id: 'not-01',
        tenantId: tenant1.id,
        folio: 'CIR-2026-001',
        title: 'Celebración Cívica del 15 de Septiembre & Muestra Gastronómica',
        content: 'Estimada comunidad de familias Avante: Los invitamos a conmemorar el CCXVI Aniversario de la Independencia de México el próximo 15 de septiembre a las 10:00 hrs en el domo central. Los educandos podrán asistir ataviados con vestimenta típica regional mexicana. Habrá bailables folclóricos y antojitos tradicionales.',
        type: 'CIRCULAR_GENERAL',
        priority: 'NORMAL',
        targetAudience: 'TODOS',
        publishedBy: 'Dirección General Institucional',
        publishDate: '2026-09-02',
        requiresAcknowledgment: true,
        acknowledgmentDeadline: '2026-09-12',
        totalRecipients: 24,
        acknowledgedCount: 18,
        status: 'PUBLICADO',
        createdAt: new Date(),
      },
      {
        id: 'not-02',
        tenantId: tenant1.id,
        folio: 'CIT-2026-001',
        title: 'Citatorio Presencial: Seguimiento de Rendimiento y Recepción de Justificante',
        content: 'Se convoca de manera atenta al tutor legal del alumno Carlos Mendoza Ruiz a una entrevista presencial con la Dirección Técnica. El objetivo es acordar el calendario de prórroga para la entrega de tareas extemporáneas y aplicación de exámenes pendientes correspondientes a su periodo de reposo médico justificado.',
        type: 'CITATORIO_PADRES',
        priority: 'URGENTE',
        targetAudience: 'INDIVIDUAL',
        targetStudentId: 'student-01',
        targetStudentName: 'Carlos Mendoza Ruiz',
        targetGroupId: 'group-prim-1a',
        targetGroupName: 'Primaria 1º "A"',
        appointmentDateTime: '04 de Septiembre de 2026 a las 08:30 hrs',
        appointmentLocation: 'Dirección Técnica de Primaria (Edificio A, Planta Baja)',
        publishedBy: 'Lic. Armando Paredes (Director Técnico)',
        publishDate: '2026-09-02',
        requiresAcknowledgment: true,
        acknowledgmentDeadline: '2026-09-03',
        totalRecipients: 1,
        acknowledgedCount: 0,
        status: 'PUBLICADO',
        createdAt: new Date(),
      },
      {
        id: 'not-03',
        tenantId: tenant1.id,
        folio: 'AVI-2026-001',
        title: 'Jornada Preventiva de Salud y Vacunación Infantil en Plantel',
        content: 'Personal de la Secretaría de Salud y Jurisdicción Sanitaria acudirá al plantel escolar este viernes para revisar cartillas y aplicar dosis de refuerzo (triple viral e influenza). Se solicita enviar la Cartilla Nacional de Salud en la mochila del estudiante dentro de un sobre rotulado.',
        type: 'AVISO_URGENTE',
        priority: 'ALTA',
        targetAudience: 'TODOS',
        publishedBy: 'Coordinación Médica y de Bienestar Escolar',
        publishDate: '2026-09-02',
        requiresAcknowledgment: false,
        totalRecipients: 24,
        acknowledgedCount: 14,
        status: 'PUBLICADO',
        createdAt: new Date(),
      },
    ];
    this.schoolNotices.push(...initialNotices);

    // 17. Credenciales Escolares Digitales Iniciales
    const initialCredentials: SchoolCredentialDTO[] = [
      {
        id: 'crd-std-01',
        tenantId: tenant1.id,
        credentialCode: 'CRD-2026-PRI-001',
        personType: 'STUDENT',
        personId: 'student-01',
        fullName: 'Carlos Mendoza Ruiz',
        curp: 'MERU180512HDFZRR03',
        matriculaOrCode: '2026-PRI-001',
        roleOrGrade: 'Primaria 1º "A"',
        levelName: 'Primaria',
        cct: '30PPR0289Z',
        bloodType: 'O+',
        allergies: 'Ninguna conocida',
        emergencyContactName: 'Ing. Carlos Mendoza (Padre)',
        emergencyContactPhone: '921 123 4567',
        validThrough: 'Ciclo Escolar 2026-2027',
        qrPayload: 'ASM|TENANT-01|student-01|2026-PRI-001|2026-2027',
        status: 'ACTIVA',
        issueDate: '02/Sep/2026',
      },
      {
        id: 'crd-std-02',
        tenantId: tenant1.id,
        credentialCode: 'CRD-2026-PRI-002',
        personType: 'STUDENT',
        personId: 'student-02',
        fullName: 'Valentina Herrera Castro',
        curp: 'HECV180914MDFRR05',
        matriculaOrCode: '2026-PRI-002',
        roleOrGrade: 'Primaria 1º "A"',
        levelName: 'Primaria',
        cct: '30PPR0289Z',
        bloodType: 'A+',
        allergies: 'Ninguna',
        emergencyContactName: 'Dra. Patricia Castro (Madre)',
        emergencyContactPhone: '921 987 6543',
        validThrough: 'Ciclo Escolar 2026-2027',
        qrPayload: 'ASM|TENANT-01|student-02|2026-PRI-002|2026-2027',
        status: 'ACTIVA',
        issueDate: '02/Sep/2026',
      },
      {
        id: 'crd-tch-01',
        tenantId: tenant1.id,
        credentialCode: 'CRD-2026-DOC-001',
        personType: 'TEACHER',
        personId: 'teacher-01',
        fullName: 'Prof. Roberto Salazar',
        curp: 'SARB850314HDFRL02',
        matriculaOrCode: 'DOC-PRI-001',
        roleOrGrade: 'Docente Titular de Lenguajes',
        levelName: 'Primaria',
        cct: '30PPR0289Z',
        bloodType: 'O+',
        allergies: 'Ninguna',
        emergencyContactName: 'Sra. Elena Gómez (Esposa)',
        emergencyContactPhone: '921 555 4321',
        validThrough: 'Ciclo Escolar 2026-2027',
        qrPayload: 'ASM|TENANT-01|teacher-01|DOC-PRI-001|2026-2027',
        status: 'ACTIVA',
        issueDate: '02/Sep/2026',
      },
    ];
    this.credentials.push(...initialCredentials);

    // 18. Bitácora de Accesos Iniciales
    const initialAccessLogs: AccessLogDTO[] = [
      {
        id: 'log-01',
        tenantId: tenant1.id,
        personId: 'teacher-01',
        personName: 'Prof. Roberto Salazar',
        personType: 'TEACHER',
        credentialCode: 'CRD-2026-DOC-001',
        roleOrGrade: 'Docente Titular de Lenguajes',
        scanPoint: 'PUERTA_PRINCIPAL',
        direction: 'ENTRADA',
        timestamp: new Date('2026-09-02T07:30:00'),
        accessGranted: true,
        notes: 'Puntual • Ingreso docente',
      },
      {
        id: 'log-02',
        tenantId: tenant1.id,
        personId: 'student-01',
        personName: 'Carlos Mendoza Ruiz',
        personType: 'STUDENT',
        credentialCode: 'CRD-2026-PRI-001',
        roleOrGrade: 'Primaria 1º "A"',
        scanPoint: 'PUERTA_PRINCIPAL',
        direction: 'ENTRADA',
        timestamp: new Date('2026-09-02T07:55:00'),
        accessGranted: true,
        notes: 'Puntual • Torniquete 01',
      },
      {
        id: 'log-03',
        tenantId: tenant1.id,
        personId: 'student-02',
        personName: 'Valentina Herrera Castro',
        personType: 'STUDENT',
        credentialCode: 'CRD-2026-PRI-002',
        roleOrGrade: 'Primaria 1º "A"',
        scanPoint: 'PUERTA_PRINCIPAL',
        direction: 'ENTRADA',
        timestamp: new Date('2026-09-02T07:58:00'),
        accessGranted: true,
        notes: 'Puntual • Torniquete 02',
      },
    ];
    this.accessLogs.push(...initialAccessLogs);

    // 19. Tareas, Proyectos y Deberes Escolares Iniciales
    const initialAssignments: SchoolAssignmentDTO[] = [
      {
        id: 'tar-01',
        tenantId: tenant1.id,
        folio: 'TAR-2026-001',
        title: 'Resumen y Análisis de la Leyenda de los Volcanes (Popocatépetl e Iztaccíhuatl)',
        description: 'Leer las páginas 14 a 18 del libro de texto Lenguajes. Redactar en la libreta un resumen de una cuartilla identificando los personajes principales y realizar un dibujo alusivo.',
        type: 'TAREA',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Español)',
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        assignedDate: '2026-09-01',
        dueDate: '2026-09-03',
        allowExtempWithJustification: true,
        extempExtendedDueDate: '2026-09-07',
        totalStudents: 2,
        submittedCount: 1,
        status: 'ACTIVA',
        maxScore: 10,
        createdAt: new Date('2026-09-01T08:00:00'),
      },
      {
        id: 'tar-02',
        tenantId: tenant1.id,
        folio: 'TAR-2026-002',
        title: 'Resolución de Problemas con Operaciones Básicas y Figuras Geométricas',
        description: 'Resolver los 5 ejercicios de suma y resta con reagrupación y clasificar las figuras de la página 22 según su número de lados y vértices.',
        type: 'TAREA',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico (Matemáticas)',
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        assignedDate: '2026-09-02',
        dueDate: '2026-09-05',
        allowExtempWithJustification: true,
        extempExtendedDueDate: '2026-09-08',
        totalStudents: 2,
        submittedCount: 0,
        status: 'ACTIVA',
        maxScore: 10,
        createdAt: new Date('2026-09-02T08:30:00'),
      },
      {
        id: 'tar-03',
        tenantId: tenant1.id,
        folio: 'PRO-2026-001',
        title: 'Proyecto Científico: Maqueta de Ecosistema Local y Cadena Trófica',
        description: 'Elaborar en equipo de dos personas o individual una maqueta con materiales reciclados (cartón, plastilina, hojas secas) que represente la flora, fauna y cadena alimentaria de la región.',
        type: 'PROYECTO',
        subjectId: 'sub-prim-leng',
        subjectName: 'Ética, Naturaleza y Sociedades',
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        assignedDate: '2026-09-02',
        dueDate: '2026-09-12',
        allowExtempWithJustification: true,
        extempExtendedDueDate: '2026-09-15',
        totalStudents: 2,
        submittedCount: 0,
        status: 'ACTIVA',
        maxScore: 10,
        createdAt: new Date('2026-09-02T09:00:00'),
      },
    ];
    this.assignments.push(...initialAssignments);

    // 20. Entregas Iniciales (incluyendo justificación extemporánea para Carlos Mendoza)
    const initialSubmissions: StudentAssignmentSubmissionDTO[] = [
      {
        id: 'subm-01',
        tenantId: tenant1.id,
        assignmentId: 'tar-01',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        status: 'EXTEMPORANEO_JUSTIFICADO',
        hasMedicalJustification: true,
        justificationFolio: 'JUST-2026-001',
        submissionNotes: 'Alumno con reposo médico autorizado (faringitis aguda). Prórroga concedida sin deducción de calificación hasta el 07/Sep/2026.',
        isExtemporaneous: true,
        updatedAt: new Date(),
      },
      {
        id: 'subm-02',
        tenantId: tenant1.id,
        assignmentId: 'tar-01',
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        status: 'CALIFICADO',
        hasMedicalJustification: false,
        submissionDate: '2026-09-02',
        submissionNotes: 'Entrega física en libreta con dibujo a color.',
        score: 10,
        feedback: '¡Excelente trabajo! Muy buena redacción y dibujo ilustrativo.',
        isExtemporaneous: false,
        updatedAt: new Date(),
      },
    ];
    this.assignmentSubmissions.push(...initialSubmissions);

    // 21. Horarios Semanales Oficiales (Primaria 1º "A" - Matriz de 50 minutos)
    const p1Schedule: ClassScheduleSlotDTO[] = [
      // --- LUNES ---
      {
        id: 'sch-p1-lun-1',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '08:00',
        endTime: '08:50',
        subjectId: 'sub-prim-soc',
        subjectName: 'Ceremonia Cívica y Honores a la Bandera',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Patio Cívico Principal',
        facility: 'PATIO_CIVICO',
        colorHex: '#3b82f6',
      },
      {
        id: 'sch-p1-lun-2',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '08:50',
        endTime: '09:40',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Español - Lectura)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#06b6d4',
      },
      {
        id: 'sch-p1-lun-3',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '09:40',
        endTime: '10:30',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico (Matemáticas)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#10b981',
      },
      {
        id: 'sch-p1-lun-rec',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '10:30',
        endTime: '11:00',
        subjectId: 'rec-01',
        subjectName: 'RECESO ESCOLAR MATUTINO',
        teacherId: 'staff-01',
        teacherName: 'Guardia Docente',
        classroom: 'Patio y Cafetería',
        facility: 'PATIO_CIVICO',
        colorHex: '#f59e0b',
        isBreak: true,
      },
      {
        id: 'sch-p1-lun-4',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '11:00',
        endTime: '11:50',
        subjectId: 'sub-prim-nat',
        subjectName: 'Ética, Naturaleza y Sociedades',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#8b5cf6',
      },
      {
        id: 'sch-p1-lun-5',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '11:50',
        endTime: '12:40',
        subjectId: 'sub-prim-edufis',
        subjectName: 'Educación Física y Desarrollo Motor',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Cancha Polideportiva Techada',
        facility: 'CANCHA_DEPORTIVA',
        colorHex: '#ec4899',
      },
      {
        id: 'sch-p1-lun-6',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'LUNES',
        startTime: '12:40',
        endTime: '13:30',
        subjectId: 'sub-prim-leng',
        subjectName: 'Taller de Caligrafía y Redacción',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#06b6d4',
      },

      // --- MARTES ---
      {
        id: 'sch-p1-mar-1',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '08:00',
        endTime: '08:50',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico (Cálculo)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#10b981',
      },
      {
        id: 'sch-p1-mar-2',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '08:50',
        endTime: '09:40',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Gramática y Ortografía)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#06b6d4',
      },
      {
        id: 'sch-p1-mar-3',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '09:40',
        endTime: '10:30',
        subjectId: 'sub-prim-ing',
        subjectName: 'Inglés Básico y Fonética',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Laboratorio de Idiomas',
        facility: 'LABORATORIO_COMPUTO',
        colorHex: '#6366f1',
      },
      {
        id: 'sch-p1-mar-rec',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '10:30',
        endTime: '11:00',
        subjectId: 'rec-02',
        subjectName: 'RECESO ESCOLAR MATUTINO',
        teacherId: 'staff-01',
        teacherName: 'Guardia Docente',
        classroom: 'Patio y Cafetería',
        facility: 'PATIO_CIVICO',
        colorHex: '#f59e0b',
        isBreak: true,
      },
      {
        id: 'sch-p1-mar-4',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '11:00',
        endTime: '11:50',
        subjectId: 'sub-prim-nat',
        subjectName: 'Ética, Naturaleza y Sociedades (Civismo)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#8b5cf6',
      },
      {
        id: 'sch-p1-mar-5',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '11:50',
        endTime: '12:40',
        subjectId: 'sub-prim-art',
        subjectName: 'Expresión y Apreciación Artística',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Taller de Artes Plásticas',
        facility: 'AULA_ARTES',
        colorHex: '#f43f5e',
      },
      {
        id: 'sch-p1-mar-6',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MARTES',
        startTime: '12:40',
        endTime: '13:30',
        subjectId: 'sub-prim-rob',
        subjectName: 'Robótica y Pensamiento Lógico',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Laboratorio de Cómputo',
        facility: 'LABORATORIO_COMPUTO',
        colorHex: '#3b82f6',
      },

      // --- MIÉRCOLES ---
      {
        id: 'sch-p1-mie-1',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '08:00',
        endTime: '08:50',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Comprensión Lectora)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#06b6d4',
      },
      {
        id: 'sch-p1-mie-2',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '08:50',
        endTime: '09:40',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico (Geometría)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#10b981',
      },
      {
        id: 'sch-p1-mie-3',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '09:40',
        endTime: '10:30',
        subjectId: 'sub-prim-soc',
        subjectName: 'Educación Socioemocional',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#eab308',
      },
      {
        id: 'sch-p1-mie-rec',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '10:30',
        endTime: '11:00',
        subjectId: 'rec-03',
        subjectName: 'RECESO ESCOLAR MATUTINO',
        teacherId: 'staff-01',
        teacherName: 'Guardia Docente',
        classroom: 'Patio y Cafetería',
        facility: 'PATIO_CIVICO',
        colorHex: '#f59e0b',
        isBreak: true,
      },
      {
        id: 'sch-p1-mie-4',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '11:00',
        endTime: '11:50',
        subjectId: 'sub-prim-edufis',
        subjectName: 'Educación Física y Recreación',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Cancha Polideportiva Techada',
        facility: 'CANCHA_DEPORTIVA',
        colorHex: '#ec4899',
      },
      {
        id: 'sch-p1-mie-5',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '11:50',
        endTime: '12:40',
        subjectId: 'sub-prim-nat',
        subjectName: 'Ética, Naturaleza y Sociedades',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#8b5cf6',
      },
      {
        id: 'sch-p1-mie-6',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'MIERCOLES',
        startTime: '12:40',
        endTime: '13:30',
        subjectId: 'sub-prim-mus',
        subjectName: 'Taller de Música y Ritmos',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula de Artes y Música',
        facility: 'AULA_ARTES',
        colorHex: '#a855f7',
      },

      // --- JUEVES ---
      {
        id: 'sch-p1-jue-1',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '08:00',
        endTime: '08:50',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico (Problemas)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#10b981',
      },
      {
        id: 'sch-p1-jue-2',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '08:50',
        endTime: '09:40',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Escritura Creativa)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#06b6d4',
      },
      {
        id: 'sch-p1-jue-3',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '09:40',
        endTime: '10:30',
        subjectId: 'sub-prim-comp',
        subjectName: 'Computación y Alfabetización Digital',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Laboratorio de Cómputo',
        facility: 'LABORATORIO_COMPUTO',
        colorHex: '#3b82f6',
      },
      {
        id: 'sch-p1-jue-rec',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '10:30',
        endTime: '11:00',
        subjectId: 'rec-04',
        subjectName: 'RECESO ESCOLAR MATUTINO',
        teacherId: 'staff-01',
        teacherName: 'Guardia Docente',
        classroom: 'Patio y Cafetería',
        facility: 'PATIO_CIVICO',
        colorHex: '#f59e0b',
        isBreak: true,
      },
      {
        id: 'sch-p1-jue-4',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '11:00',
        endTime: '11:50',
        subjectId: 'sub-prim-nat',
        subjectName: 'Ética, Naturaleza y Sociedades (Ecosistemas)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#8b5cf6',
      },
      {
        id: 'sch-p1-jue-5',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '11:50',
        endTime: '12:40',
        subjectId: 'sub-prim-ing',
        subjectName: 'Inglés Práctico',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#6366f1',
      },
      {
        id: 'sch-p1-jue-6',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'JUEVES',
        startTime: '12:40',
        endTime: '13:30',
        subjectId: 'sub-prim-bib',
        subjectName: 'Círculo de Lectura y Préstamo de Libros',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Biblioteca Escolar',
        facility: 'BIBLIOTECA',
        colorHex: '#14b8a6',
      },

      // --- VIERNES ---
      {
        id: 'sch-p1-vie-1',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '08:00',
        endTime: '08:50',
        subjectId: 'sub-prim-leng',
        subjectName: 'Lenguajes (Evaluación Formativa Semanal)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#06b6d4',
      },
      {
        id: 'sch-p1-vie-2',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '08:50',
        endTime: '09:40',
        subjectId: 'sub-prim-mat',
        subjectName: 'Saberes y Pensamiento Científico',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#10b981',
      },
      {
        id: 'sch-p1-vie-3',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '09:40',
        endTime: '10:30',
        subjectId: 'sub-prim-edufis',
        subjectName: 'Juegos Cooperativos y Activación Física',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Cancha Polideportiva Techada',
        facility: 'CANCHA_DEPORTIVA',
        colorHex: '#ec4899',
      },
      {
        id: 'sch-p1-vie-rec',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '10:30',
        endTime: '11:00',
        subjectId: 'rec-05',
        subjectName: 'RECESO ESCOLAR MATUTINO',
        teacherId: 'staff-01',
        teacherName: 'Guardia Docente',
        classroom: 'Patio y Cafetería',
        facility: 'PATIO_CIVICO',
        colorHex: '#f59e0b',
        isBreak: true,
      },
      {
        id: 'sch-p1-vie-4',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '11:00',
        endTime: '11:50',
        subjectId: 'sub-prim-proj',
        subjectName: 'Proyecto Integrador Comunitario (NEM)',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#8b5cf6',
      },
      {
        id: 'sch-p1-vie-5',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '11:50',
        endTime: '12:40',
        subjectId: 'sub-prim-ref',
        subjectName: 'Asesoría y Refuerzo Académico Individualizado',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#0284c7',
      },
      {
        id: 'sch-p1-vie-6',
        tenantId: tenant1.id,
        groupId: 'grp-p1',
        groupName: 'Primaria 1º "A"',
        dayOfWeek: 'VIERNES',
        startTime: '12:40',
        endTime: '13:30',
        subjectId: 'sub-prim-soc',
        subjectName: 'Cierre Semanal y Organización de Materiales',
        teacherId: 'teacher-01',
        teacherName: 'Prof. Roberto Salazar',
        classroom: 'Aula 101 - Edificio A',
        facility: 'AULA_REGULAR',
        colorHex: '#64748b',
      },
    ];
    this.scheduleSlots.push(...p1Schedule);

    // 22. Aspirantes de Nuevo Ingreso / Admisiones 2026-2027
    const initialApplicants: AdmissionApplicantDTO[] = [
      {
        id: 'app-01',
        tenantId: tenant1.id,
        folio: 'ADM-2026-001',
        applicantFirstName: 'Sofía',
        applicantLastName: 'Morales Viveros',
        curp: 'MOVS190415MDFRRN01',
        birthDate: '2019-04-15',
        gender: 'F',
        targetLevelId: 'PRIMARIA',
        targetLevelName: 'Primaria',
        targetGrade: '1º de Primaria',
        parentName: 'Lic. Fernando Morales Ochoa',
        parentPhone: '+52 55 4433 2211',
        parentEmail: 'fernando.morales@gmail.com',
        status: 'DOCUMENTACION_EN_REVISION',
        documents: [
          {
            id: 'doc-01-1',
            documentType: 'ACTA_NACIMIENTO',
            documentName: 'Acta_Nacimiento_SofiaMorales.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-09-01T10:00:00Z',
          },
          {
            id: 'doc-01-2',
            documentType: 'CURP',
            documentName: 'CURP_Certificada_SofiaMorales.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-09-01T10:05:00Z',
          },
          {
            id: 'doc-01-3',
            documentType: 'CARTILLA_VACUNACION',
            documentName: 'Cartilla_Nacional_Salud.pdf',
            status: 'CARGADO',
            uploadedAt: '2026-09-01T10:10:00Z',
          },
          {
            id: 'doc-01-4',
            documentType: 'COMPROBANTE_DOMICILIO',
            documentName: 'Recibo_CFE_Morales.pdf',
            status: 'CARGADO',
            uploadedAt: '2026-09-01T10:15:00Z',
          },
        ],
        appliedAt: '2026-09-01',
        notes: 'Hermana de egresado del colegio. Alta recomendación familiar.',
      },
      {
        id: 'app-02',
        tenantId: tenant1.id,
        folio: 'ADM-2026-002',
        applicantFirstName: 'Mateo',
        applicantLastName: 'Fernández Ríos',
        curp: 'FERM210820HDFRNN02',
        birthDate: '2021-08-20',
        gender: 'M',
        targetLevelId: 'PREESCOLAR',
        targetLevelName: 'Preescolar',
        targetGrade: '2º de Kínder',
        parentName: 'Dra. Gabriela Ríos Méndez',
        parentPhone: '+52 55 9988 7766',
        parentEmail: 'gabriela.rios@hospitalgeneral.mx',
        status: 'EVALUACION_AGENDADA',
        evaluationDate: '2026-09-08 10:00',
        evaluationNotes: 'Evaluación diagnóstica psicopedagógica y desarrollo motriz fino con Profra. Laura Méndez.',
        interviewDate: '2026-09-08 11:00',
        interviewNotes: 'Entrevista familiar de ingreso con Dirección Técnica de Preescolar.',
        documents: [
          {
            id: 'doc-02-1',
            documentType: 'ACTA_NACIMIENTO',
            documentName: 'Acta_Mateo_Fernandez.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-09-01T14:20:00Z',
          },
          {
            id: 'doc-02-2',
            documentType: 'CURP',
            documentName: 'CURP_MateoFernandez.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-09-01T14:25:00Z',
          },
          {
            id: 'doc-02-3',
            documentType: 'CARTILLA_VACUNACION',
            documentName: 'Cartilla_Vacunacion_Completa.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-09-01T14:30:00Z',
          },
        ],
        appliedAt: '2026-09-01',
        notes: 'Aspirante para segundo grado de preescolar, bilingüe incipiente.',
      },
      {
        id: 'app-03',
        tenantId: tenant1.id,
        folio: 'ADM-2026-003',
        applicantFirstName: 'Regina',
        applicantLastName: 'Salazar Pérez',
        curp: 'SAPR191105MDFRRN04',
        birthDate: '2019-11-05',
        gender: 'F',
        targetLevelId: 'PRIMARIA',
        targetLevelName: 'Primaria',
        targetGrade: '1º de Primaria',
        parentName: 'Ing. Rodrigo Salazar Valdés',
        parentPhone: '+52 55 6677 8899',
        parentEmail: 'rodrigo.salazar@techcorp.com',
        status: 'ACEPTADO',
        evaluationDate: '2026-08-28 09:30',
        evaluationScore: 9.8,
        evaluationNotes: 'Excelente madurez lectoescritora y habilidades matemáticas tempranas.',
        interviewDate: '2026-08-28 10:30',
        interviewNotes: 'Familia comprometida con el proyecto educativo del colegio. Dictamen: Aceptada 100%.',
        documents: [
          {
            id: 'doc-03-1',
            documentType: 'ACTA_NACIMIENTO',
            documentName: 'Acta_ReginaSalazar.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-08-25T09:00:00Z',
          },
          {
            id: 'doc-03-2',
            documentType: 'CURP',
            documentName: 'CURP_ReginaSalazar.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-08-25T09:05:00Z',
          },
          {
            id: 'doc-03-3',
            documentType: 'CARTILLA_VACUNACION',
            documentName: 'Cartilla_Vacunacion_Regina.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-08-25T09:10:00Z',
          },
          {
            id: 'doc-03-4',
            documentType: 'CONSTANCIA_ESTUDIOS_PREVIOS',
            documentName: 'Constancia_3ero_Kinder.pdf',
            status: 'VALIDADO',
            uploadedAt: '2026-08-25T09:15:00Z',
          },
        ],
        appliedAt: '2026-08-25',
        notes: 'Dictamen de aceptación emitido. Listo para formalizar inscripción y generar matrícula.',
      },
    ];
    this.applicants.push(...initialApplicants);

    // 23. Acervo Bibliográfico y Préstamos de Biblioteca
    const initialBooks: SchoolBookDTO[] = [
      {
        id: 'book-01',
        tenantId: tenant1.id,
        isbn: '978-607-07-2879-2',
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        publisher: 'Editorial Planeta',
        yearPublished: 2021,
        category: 'LITERATURA_INFANTIL',
        targetLevel: 'PRIMARIA',
        shelfLocation: 'Estante A-1 (Literatura Clásica Infantil)',
        totalCopies: 5,
        availableCopies: 4,
        summary: 'Una obra cumbre sobre la amistad, el amor y el sentido de la vida vista con ojos de niño.',
      },
      {
        id: 'book-02',
        tenantId: tenant1.id,
        isbn: '978-607-551-923-4',
        title: 'Múltiples Lenguajes 1º Primaria (Libro de Texto SEP)',
        author: 'Secretaría de Educación Pública (SEP)',
        publisher: 'CONALITEG',
        yearPublished: 2026,
        category: 'LIBRO_SEP',
        targetLevel: 'PRIMARIA',
        shelfLocation: 'Estante SEP-1 (Colección Nueva Escuela Mexicana)',
        totalCopies: 10,
        availableCopies: 9,
        summary: 'Libro oficial del Campo Formativo Lenguajes con lecturas, cuentos y actividades ilustradas.',
      },
      {
        id: 'book-03',
        tenantId: tenant1.id,
        isbn: '978-84-18008-54-2',
        title: 'Atlas del Mundo Ilustrado para Niños',
        author: 'National Geographic Kids',
        publisher: 'RBA Molino',
        yearPublished: 2023,
        category: 'HISTORIA_GEOGRAFIA',
        targetLevel: 'TODOS',
        shelfLocation: 'Estante B-3 (Geografía y Enciclopedias)',
        totalCopies: 3,
        availableCopies: 2,
        summary: 'Mapas a todo color, fauna, ecosistemas y culturas de los cinco continentes.',
      },
      {
        id: 'book-04',
        tenantId: tenant1.id,
        isbn: '978-950-07-0012-3',
        title: 'Cuentos y Rimas Ilustradas de Kínder',
        author: 'María Elena Walsh',
        publisher: 'Alfaguara Infantil',
        yearPublished: 2022,
        category: 'LITERATURA_INFANTIL',
        targetLevel: 'PREESCOLAR',
        shelfLocation: 'Estante K-1 (Rincón de Lectura Preescolar)',
        totalCopies: 4,
        availableCopies: 4,
        summary: 'Poemas, canciones y rimas para estimulación temprana de lenguaje oral en edad preescolar.',
      },
      {
        id: 'book-05',
        tenantId: tenant1.id,
        isbn: '978-607-16-5501-1',
        title: 'Dinosaurios y Fósiles Asombrosos',
        author: 'Dr. Michael Benton',
        publisher: 'Fondo de Cultura Económica (FCE)',
        yearPublished: 2024,
        category: 'CIENCIAS',
        targetLevel: 'PRIMARIA',
        shelfLocation: 'Estante C-2 (Ciencias y Paleontología)',
        totalCopies: 4,
        availableCopies: 4,
        summary: 'Descubrimientos paleontológicos e infografías de dinosaurios del período Jurásico y Cretácico.',
      },
    ];
    this.books.push(...initialBooks);

    const initialLoans: BookLoanDTO[] = [
      {
        id: 'prest-01',
        tenantId: tenant1.id,
        folio: 'PREST-2026-001',
        bookId: 'book-01',
        bookTitle: 'El Principito',
        bookIsbn: '978-607-07-2879-2',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        loanDate: '2026-09-01',
        dueDate: '2026-09-08',
        status: 'ACTIVO',
        loanType: 'DOMICILIO',
        librarianNotes: 'Préstamo semanal a domicilio para reporte de lectura en libreta de Lenguajes.',
      },
      {
        id: 'prest-02',
        tenantId: tenant1.id,
        folio: 'PREST-2026-002',
        bookId: 'book-02',
        bookTitle: 'Múltiples Lenguajes 1º Primaria (Libro de Texto SEP)',
        bookIsbn: '978-607-551-923-4',
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        groupName: 'Primaria 1º "A"',
        loanDate: '2026-09-01',
        dueDate: '2026-09-05',
        returnDate: '2026-09-02',
        status: 'DEVUELTO',
        loanType: 'SALA',
        librarianNotes: 'Devuelto en excelente estado de conservación.',
      },
    ];
    this.bookLoans.push(...initialLoans);

    // 24. Transporte Escolar y Rutas Seguras
    const initialVehicles: TransportVehicleDTO[] = [
      {
        id: 'veh-01',
        tenantId: tenant1.id,
        plateNumber: '84-RB-29',
        model: 'Mercedes-Benz Sprinter 2024 (22 Plazas)',
        capacity: 22,
        insurancePolicy: 'GNP Seguros Escolares - Póliza #9948271-B (Vigencia 2027)',
        driverName: 'Sr. Juan Carlos Pérez',
        driverPhone: '+52 55 3344 5566',
        driverLicense: 'LIC-MERC-9921-CDMX',
        monitorName: 'Profra. Martha Morales (Monitora de Ruta)',
        monitorPhone: '+52 55 2211 4433',
      },
      {
        id: 'veh-02',
        tenantId: tenant1.id,
        plateNumber: '92-RB-14',
        model: 'Volkswagen Crafter 2023 (19 Plazas)',
        capacity: 19,
        insurancePolicy: 'Axa Seguros Transporte Escolar - Póliza #8472911 (Vigencia 2027)',
        driverName: 'Sr. Gilberto Hernández Solís',
        driverPhone: '+52 55 7788 9900',
        driverLicense: 'LIC-FED-7712-CDMX',
        monitorName: 'Sra. Rosa Isela Cruz (Monitora de Ruta)',
        monitorPhone: '+52 55 8899 0011',
      },
    ];
    this.transportVehicles.push(...initialVehicles);

    const initialRoutes: TransportRouteDTO[] = [
      {
        id: 'route-01',
        tenantId: tenant1.id,
        code: 'RUTA-NORTE-01',
        name: 'Ruta Norte - Lindavista / Vallejo / Torres Lindavista',
        vehicleId: 'veh-01',
        vehiclePlate: '84-RB-29',
        vehicleModel: 'Mercedes-Benz Sprinter 2024',
        driverName: 'Sr. Juan Carlos Pérez',
        driverPhone: '+52 55 3344 5566',
        monitorName: 'Profra. Martha Morales',
        shift: 'AMBOS',
        enrolledStudentsCount: 8,
        active: true,
        stops: [
          {
            id: 'stop-01-1',
            name: 'Parada 1: Torres Lindavista - Av. Othón de Mendizábal',
            scheduledTimeMorning: '06:50',
            scheduledTimeAfternoon: '14:30',
            address: 'Av. Juan de Dios Bátiz #45, Torres Lindavista',
            orderIndex: 1,
          },
          {
            id: 'stop-01-2',
            name: 'Parada 2: Residencial Lindavista - Eje 5 Nte #204',
            scheduledTimeMorning: '07:05',
            scheduledTimeAfternoon: '14:45',
            address: 'Calle Montevideo esq. Eje 5 Nte, Lindavista',
            orderIndex: 2,
          },
          {
            id: 'stop-01-3',
            name: 'Parada 3: Vallejo Poniente - Av. Cuitláhuac',
            scheduledTimeMorning: '07:20',
            scheduledTimeAfternoon: '15:00',
            address: 'Calz. Vallejo #1120, Col. Defensores',
            orderIndex: 3,
          },
          {
            id: 'stop-01-4',
            name: 'Llegada al Plantel Escolar Avante Coyoacán / Lindavista',
            scheduledTimeMorning: '07:45',
            scheduledTimeAfternoon: '14:15',
            address: 'Puerta 2 - Bahía de Descenso Escolar Seguro',
            orderIndex: 4,
          },
        ],
      },
      {
        id: 'route-02',
        tenantId: tenant1.id,
        code: 'RUTA-SUR-02',
        name: 'Ruta Sur - Del Valle / Coyoacán / Chimalistac',
        vehicleId: 'veh-02',
        vehiclePlate: '92-RB-14',
        vehicleModel: 'Volkswagen Crafter 2023',
        driverName: 'Sr. Gilberto Hernández Solís',
        driverPhone: '+52 55 7788 9900',
        monitorName: 'Sra. Rosa Isela Cruz',
        shift: 'AMBOS',
        enrolledStudentsCount: 6,
        active: true,
        stops: [
          {
            id: 'stop-02-1',
            name: 'Parada 1: Parque Hundido - Porfirio Díaz',
            scheduledTimeMorning: '06:55',
            scheduledTimeAfternoon: '14:35',
            address: 'Insurgentes Sur #1400 esq. Porfirio Díaz',
            orderIndex: 1,
          },
          {
            id: 'stop-02-2',
            name: 'Parada 2: Centro de Coyoacán - Plaza Hidalgo',
            scheduledTimeMorning: '07:15',
            scheduledTimeAfternoon: '14:55',
            address: 'Calle Caballocalco #22, Coyoacán',
            orderIndex: 2,
          },
          {
            id: 'stop-02-3',
            name: 'Llegada al Plantel Escolar',
            scheduledTimeMorning: '07:45',
            scheduledTimeAfternoon: '14:15',
            address: 'Puerta 1 - Bahía de Descenso',
            orderIndex: 3,
          },
        ],
      },
    ];
    this.transportRoutes.push(...initialRoutes);

    const initialEnrollments: StudentTransportEnrollmentDTO[] = [
      {
        id: 'enr-01',
        tenantId: tenant1.id,
        routeId: 'route-01',
        routeName: 'Ruta Norte - Lindavista / Vallejo',
        stopId: 'stop-01-2',
        stopName: 'Parada 2: Residencial Lindavista - Eje 5 Nte #204',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        tutorName: 'Ing. Carlos Mendoza',
        tutorPhone: '+52 55 1234 5678',
        shift: 'AMBOS',
        emergencyNotes: 'Asiento delantero asignado por recomendación pediátrica (fácil acceso).',
      },
      {
        id: 'enr-02',
        tenantId: tenant1.id,
        routeId: 'route-01',
        routeName: 'Ruta Norte - Lindavista / Vallejo',
        stopId: 'stop-01-3',
        stopName: 'Parada 3: Vallejo Poniente - Av. Cuitláhuac',
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        groupName: 'Primaria 1º "A"',
        tutorName: 'Dra. Patricia Castro',
        tutorPhone: '+52 55 9876 5432',
        shift: 'AMBOS',
      },
    ];
    this.transportEnrollments.push(...initialEnrollments);

    const initialBoardingLogs: DailyTransportBoardingLogDTO[] = [
      {
        id: 'log-01',
        tenantId: tenant1.id,
        routeId: 'route-01',
        date: new Date().toISOString().split('T')[0],
        shift: 'MATUTINO_RECOGIDA',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        stopName: 'Parada 2: Residencial Lindavista - Eje 5 Nte #204',
        status: 'ENTREGADO_ESCUELA',
        checkInTime: '07:08',
        checkOutTime: '07:45',
        notes: 'Abordó con credencial QR validada por la monitora. Entregado en puerta escolar.',
      },
      {
        id: 'log-02',
        tenantId: tenant1.id,
        routeId: 'route-01',
        date: new Date().toISOString().split('T')[0],
        shift: 'MATUTINO_RECOGIDA',
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        stopName: 'Parada 3: Vallejo Poniente - Av. Cuitláhuac',
        status: 'ENTREGADO_ESCUELA',
        checkInTime: '07:22',
        checkOutTime: '07:45',
        notes: 'Entrega en tiempo y forma en bahía escolar.',
      },
    ];
    this.transportBoardingLogs.push(...initialBoardingLogs);

    // 25. Cafetería Escolar y Monedero Digital
    const initialProducts: CafeteriaProductDTO[] = [
      {
        id: 'prod-01',
        tenantId: tenant1.id,
        name: 'Sándwich Integral de Pavo y Panela',
        category: 'DESAYUNOS_SALUDABLES',
        priceMXN: 38,
        caloriesKcal: 240,
        ingredients: ['Pan integral de trigo', 'Pechuga de pavo baja en sodio', 'Queso panela', 'Jitomate', 'Lechuga'],
        allergens: ['GLUTEN', 'LACTEOS'],
        isHealthySepApproved: true,
        stockQuantity: 35,
        available: true,
      },
      {
        id: 'prod-02',
        tenantId: tenant1.id,
        name: 'Vaso de Fruta Fresca de Temporada con Limón',
        category: 'FRUTAS_VERDURAS',
        priceMXN: 25,
        caloriesKcal: 85,
        ingredients: ['Sandía', 'Melón', 'Piña', 'Pepino', 'Limón'],
        allergens: [],
        isHealthySepApproved: true,
        stockQuantity: 40,
        available: true,
      },
      {
        id: 'prod-03',
        tenantId: tenant1.id,
        name: 'Barrita Artesanal de Avena y Semillas',
        category: 'SNACKS_NUTRITIVOS',
        priceMXN: 18,
        caloriesKcal: 140,
        ingredients: ['Hojuelas de avena', 'Semillas de girasol', 'Miel pura de abeja', 'Arándanos'],
        allergens: ['GLUTEN'],
        isHealthySepApproved: true,
        stockQuantity: 50,
        available: true,
      },
      {
        id: 'prod-04',
        tenantId: tenant1.id,
        name: 'Licuado Natural de Fresa con Leche Deslactosada',
        category: 'BEBIDAS_NATURALES',
        priceMXN: 28,
        caloriesKcal: 160,
        ingredients: ['Fresas naturales', 'Leche deslactosada light', 'Canela'],
        allergens: ['LACTEOS'],
        isHealthySepApproved: true,
        stockQuantity: 30,
        available: true,
      },
      {
        id: 'prod-05',
        tenantId: tenant1.id,
        name: 'Galleta Horneada de Cacahuate y Chía',
        category: 'SNACKS_NUTRITIVOS',
        priceMXN: 22,
        caloriesKcal: 210,
        ingredients: ['Pasta pura de cacahuate', 'Harina integral', 'Semillas de chía', 'Piloncillo'],
        allergens: ['CACAHUATE', 'GLUTEN'],
        isHealthySepApproved: false,
        stockQuantity: 25,
        available: true,
      },
      {
        id: 'prod-06',
        tenantId: tenant1.id,
        name: 'Mollete Tradicional con Frijol y Queso Gratinado',
        category: 'COMIDAS_CALIENTES',
        priceMXN: 32,
        caloriesKcal: 280,
        ingredients: ['Bolillo integral', 'Frijoles bayos refritos', 'Queso manchego artesanal', 'Pico de gallo'],
        allergens: ['GLUTEN', 'LACTEOS'],
        isHealthySepApproved: true,
        stockQuantity: 30,
        available: true,
      },
    ];
    this.cafeteriaProducts.push(...initialProducts);

    const initialWallets: StudentWalletDTO[] = [
      {
        id: 'wallet-01',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        currentBalanceMXN: 162,
        dailySpendingLimitMXN: 60,
        spentTodayMXN: 38,
        allergies: ['CACAHUATE', 'MARISCOS'],
        status: 'ACTIVO',
        updatedAt: '2026-09-02',
      },
      {
        id: 'wallet-02',
        tenantId: tenant1.id,
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        groupName: 'Primaria 1º "A"',
        currentBalanceMXN: 210,
        dailySpendingLimitMXN: 70,
        spentTodayMXN: 0,
        allergies: [],
        status: 'ACTIVO',
        updatedAt: '2026-09-02',
      },
      {
        id: 'wallet-03',
        tenantId: tenant1.id,
        studentId: 'student-03',
        studentName: 'Sofía Hernández Ramos',
        studentCode: '2026-PREP-045',
        groupName: 'Preparatoria 1º "A"',
        currentBalanceMXN: 150,
        dailySpendingLimitMXN: 50,
        spentTodayMXN: 0,
        allergies: ['LACTEOS'],
        status: 'ACTIVO',
        updatedAt: '2026-09-02',
      },
    ];
    this.studentWallets.push(...initialWallets);

    const initialTransactions: CafeteriaTransactionDTO[] = [
      {
        id: 'tx-01',
        tenantId: tenant1.id,
        folio: 'CAF-2026-001',
        walletId: 'wallet-01',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        type: 'RECARGA_SALDO',
        amountMXN: 200,
        previousBalanceMXN: 0,
        newBalanceMXN: 200,
        date: '2026-09-01',
        time: '08:15',
        paymentMethod: 'EFECTIVO',
        cashierNotes: 'Apertura de monedero realizada por tutor Ing. Carlos Mendoza',
      },
      {
        id: 'tx-02',
        tenantId: tenant1.id,
        folio: 'CAF-2026-002',
        walletId: 'wallet-01',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        type: 'CONSUMO',
        amountMXN: 38,
        previousBalanceMXN: 200,
        newBalanceMXN: 162,
        items: [
          {
            productId: 'prod-01',
            productName: 'Sándwich Integral de Pavo y Panela',
            quantity: 1,
            unitPriceMXN: 38,
            subtotalMXN: 38,
          },
        ],
        date: '2026-09-02',
        time: '10:45',
        cashierNotes: 'Cobro en receso escolar con credencial digital QR',
      },
    ];
    this.cafeteriaTransactions.push(...initialTransactions);

    // 26. Enfermería Escolar y Expediente de Salud
    const initialConsultations: MedicalConsultationDTO[] = [
      {
        id: 'enf-01',
        tenantId: tenant1.id,
        folio: 'ENF-2026-001',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        date: '2026-09-02',
        time: '11:15',
        reason: 'HERIDA_RASPON',
        severity: 'LEVE',
        symptomsDescription: 'Raspón superficial en rodilla izquierda al tropezar en cancha deportiva durante receso.',
        vitalSigns: {
          temperatureCelsius: 36.5,
          heartRateBpm: 78,
          bloodPressure: '105/68',
        },
        treatmentGiven: 'Lavado profuso con solución antiséptica Microdacyn, aplicación de apósito estéril adhesivo y crema regeneradora.',
        nurseNotes: 'El alumno cooperó adecuadamente. No hay signos de esguince o compromiso óseo.',
        nurseInCharge: 'Enfra. Rosaura Morales (Céd. 748291)',
        parentNotified: true,
        parentNotifiedAt: '2026-09-02 11:20',
        requiresPickupByParent: false,
        status: 'ALTA_A_CLASES',
      },
      {
        id: 'enf-02',
        tenantId: tenant1.id,
        folio: 'ENF-2026-002',
        studentId: 'student-03',
        studentName: 'Sofía Hernández Ramos',
        studentCode: '2026-PREP-045',
        groupName: 'Preparatoria 1º "A"',
        date: '2026-09-01',
        time: '09:40',
        reason: 'CEFALEA_FIEBRE',
        severity: 'MODERADA',
        symptomsDescription: 'Cefalea intensa frontotemporal y sensación febril con decaimiento.',
        vitalSigns: {
          temperatureCelsius: 37.8,
          heartRateBpm: 88,
          bloodPressure: '110/70',
        },
        treatmentGiven: 'Reposo en camilla clínica con compresas frías en frente y nuca. Hidratación oral con electrolitos.',
        nurseNotes: 'Se contactó a la madre para solicitar pase de salida para valoración pediátrica externa.',
        nurseInCharge: 'Enfra. Rosaura Morales (Céd. 748291)',
        parentNotified: true,
        parentNotifiedAt: '2026-09-01 09:50',
        requiresPickupByParent: true,
        status: 'RETIRADO_CON_TUTOR',
      },
    ];
    this.medicalConsultations.push(...initialConsultations);

    const initialMedications: ScheduledMedicationDTO[] = [
      {
        id: 'med-01',
        tenantId: tenant1.id,
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        groupName: 'Primaria 1º "A"',
        medicationName: 'Loratadina Jarabe 5mg/5ml',
        dosage: '5 ml cada 24 hrs a mediodía',
        scheduledTime: '12:00',
        startDate: '2026-09-01',
        endDate: '2026-09-07',
        prescriptionDoctorName: 'Dra. Marcela Peña Cruz - Alergóloga Pediatra',
        doctorLicense: 'Céd. Prof. 8492019',
        parentAuthorizationSigned: true,
        parentName: 'Lic. Mariana Castro',
        administeredToday: false,
        status: 'ACTIVO',
      },
      {
        id: 'med-02',
        tenantId: tenant1.id,
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        medicationName: 'Salbutamol Inhalador 100mcg',
        dosage: '2 disparos con aerocámara previo a Educación Física',
        scheduledTime: '08:00',
        startDate: '2026-08-25',
        endDate: '2026-12-15',
        prescriptionDoctorName: 'Dr. Roberto Garza - Neumólogo Pediatra',
        doctorLicense: 'Céd. Prof. 6712344',
        parentAuthorizationSigned: true,
        parentName: 'Ing. Carlos Mendoza',
        administeredToday: true,
        lastAdministeredAt: '2026-09-02 07:55',
        status: 'ACTIVO',
      },
    ];
    this.scheduledMedications.push(...initialMedications);

    const initialSupplies: FirstAidSupplyDTO[] = [
      {
        id: 'sup-01',
        tenantId: tenant1.id,
        name: 'Solución Antiséptica Microdacyn 250ml',
        category: 'CURACION',
        stockQuantity: 6,
        unit: 'Frascos',
        minStockAlert: 2,
        expiryDate: '2027-10-30',
      },
      {
        id: 'sup-02',
        tenantId: tenant1.id,
        name: 'Gasas Estériles en Sobres 10x10cm',
        category: 'CURACION',
        stockQuantity: 45,
        unit: 'Sobres',
        minStockAlert: 15,
        expiryDate: '2028-05-15',
      },
      {
        id: 'sup-03',
        tenantId: tenant1.id,
        name: 'Vendas Elásticas de Compresión 5cm',
        category: 'CURACION',
        stockQuantity: 18,
        unit: 'Rollos',
        minStockAlert: 5,
        expiryDate: '2028-12-01',
      },
      {
        id: 'sup-04',
        tenantId: tenant1.id,
        name: 'Termómetro Infrarrojo Clínico Digital',
        category: 'EQUIPO_MEDICO',
        stockQuantity: 3,
        unit: 'Piezas',
        minStockAlert: 1,
      },
      {
        id: 'sup-05',
        tenantId: tenant1.id,
        name: 'Apósitos Adhesivos Hipoalergénicos (Curitas)',
        category: 'CURACION',
        stockQuantity: 120,
        unit: 'Piezas',
        minStockAlert: 30,
        expiryDate: '2028-01-01',
      },
      {
        id: 'sup-06',
        tenantId: tenant1.id,
        name: 'Hielo Químico Instantáneo para Contusiones',
        category: 'CURACION',
        stockQuantity: 14,
        unit: 'Bolsas',
        minStockAlert: 5,
        expiryDate: '2027-08-01',
      },
      {
        id: 'sup-07',
        tenantId: tenant1.id,
        name: 'Paracetamol Infantil Jarabe 100mg/ml (Con Receta)',
        category: 'MEDICAMENTO_BASICO_AUTORIZADO',
        stockQuantity: 4,
        unit: 'Frascos',
        minStockAlert: 2,
        expiryDate: '2027-04-10',
      },
      {
        id: 'sup-08',
        tenantId: tenant1.id,
        name: 'Baumanómetro Pediátrico Digital',
        category: 'EQUIPO_MEDICO',
        stockQuantity: 2,
        unit: 'Equipos',
        minStockAlert: 1,
      },
    ];
    this.firstAidSupplies.push(...initialSupplies);

    // 27. Talleres Extracurriculares y Academias Vespertinas
    const initialWorkshops: ExtracurricularWorkshopDTO[] = [
      {
        id: 'work-01',
        tenantId: tenant1.id,
        code: 'TAL-ROB-01',
        name: 'Robótica Educativa LEGO SPIKE Prime',
        category: 'CIENCIA_TECNOLOGIA',
        description: 'Construcción y programación de robots inteligentes con sensores y motores para retos STEAM.',
        instructorName: 'Ing. Fernando Salgado Ruiz',
        instructorPhone: '+52 55 4433 2211',
        classroom: 'Laboratorio de Cómputo y Robótica',
        scheduleDays: ['MARTES', 'JUEVES'],
        scheduleTime: '14:45 - 16:15 hrs',
        monthlyFeeMXN: 480,
        maxCapacity: 18,
        enrolledCount: 14,
        targetLevels: ['PRIMARIA'],
        status: 'ACTIVO',
      },
      {
        id: 'work-02',
        tenantId: tenant1.id,
        code: 'TAL-FUT-02',
        name: 'Fútbol Infantil Formativo y Torneos',
        category: 'DEPORTIVO',
        description: 'Entrenamiento técnico, táctico y formativo de fútbol con participación en Liga Intercolegial.',
        instructorName: 'Prof. Javier Morales Cruz',
        instructorPhone: '+52 55 9988 7766',
        classroom: 'Cancha de Pasto Sintético',
        scheduleDays: ['LUNES', 'MIERCOLES'],
        scheduleTime: '14:45 - 16:15 hrs',
        monthlyFeeMXN: 420,
        maxCapacity: 25,
        enrolledCount: 20,
        targetLevels: ['PRIMARIA'],
        status: 'ACTIVO',
      },
      {
        id: 'work-03',
        tenantId: tenant1.id,
        code: 'TAL-BAL-03',
        name: 'Ballet Clásico y Expresión Corporal',
        category: 'ARTES_CULTURA',
        description: 'Desarrollo de postura, flexibilidad, musicalidad y disciplina artística con barra y centro.',
        instructorName: 'Mtra. Lucía Domínguez Trejo',
        instructorPhone: '+52 55 3322 1100',
        classroom: 'Salón de Danza con Duela y Espejos',
        scheduleDays: ['MARTES', 'JUEVES'],
        scheduleTime: '14:30 - 16:00 hrs',
        monthlyFeeMXN: 450,
        maxCapacity: 16,
        enrolledCount: 12,
        targetLevels: ['PREESCOLAR', 'PRIMARIA'],
        status: 'ACTIVO',
      },
      {
        id: 'work-04',
        tenantId: tenant1.id,
        code: 'TAL-AJE-04',
        name: 'Ajedrez Estratégico y Agilidad Mental',
        category: 'DESARROLLO_HABILIDADES',
        description: 'Tácticas de apertura, medio juego, cálculo de variantes y torneos rápidos del deporte ciencia.',
        instructorName: 'Maestro FIDE Ricardo Alarcón',
        instructorPhone: '+52 55 6677 8899',
        classroom: 'Biblioteca Escolar',
        scheduleDays: ['VIERNES'],
        scheduleTime: '14:30 - 16:30 hrs',
        monthlyFeeMXN: 350,
        maxCapacity: 20,
        enrolledCount: 15,
        targetLevels: ['PRIMARIA', 'PREPARATORIA'],
        status: 'ACTIVO',
      },
      {
        id: 'work-05',
        tenantId: tenant1.id,
        code: 'TAL-MAT-05',
        name: 'Taller de Regularización de Matemáticas NEM',
        category: 'ACADEMICO_REGULARIZACION',
        description: 'Refuerzo personalizado en resolución de problemas, fracciones, álgebra y razonamiento lógico.',
        instructorName: 'Profra. Laura Gómez Gómez',
        instructorPhone: '+52 55 5544 3322',
        classroom: 'Aula 102 - Primaria',
        scheduleDays: ['LUNES', 'MIERCOLES'],
        scheduleTime: '14:30 - 16:00 hrs',
        monthlyFeeMXN: 380,
        maxCapacity: 12,
        enrolledCount: 8,
        targetLevels: ['PRIMARIA'],
        status: 'ACTIVO',
      },
    ];
    this.extracurricularWorkshops.push(...initialWorkshops);

    const initialWorkshopEnrollments: WorkshopEnrollmentDTO[] = [
      {
        id: 'wenr-01',
        tenantId: tenant1.id,
        workshopId: 'work-01',
        workshopName: 'Robótica Educativa LEGO SPIKE Prime',
        workshopCode: 'TAL-ROB-01',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        enrollmentDate: '2026-08-28',
        monthlyFeeMXN: 480,
        parentAuthorization: true,
        status: 'ACTIVO',
      },
      {
        id: 'wenr-02',
        tenantId: tenant1.id,
        workshopId: 'work-02',
        workshopName: 'Fútbol Infantil Formativo y Torneos',
        workshopCode: 'TAL-FUT-02',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        groupName: 'Primaria 1º "A"',
        enrollmentDate: '2026-08-28',
        monthlyFeeMXN: 420,
        parentAuthorization: true,
        status: 'ACTIVO',
      },
      {
        id: 'wenr-03',
        tenantId: tenant1.id,
        workshopId: 'work-03',
        workshopName: 'Ballet Clásico y Expresión Corporal',
        workshopCode: 'TAL-BAL-03',
        studentId: 'student-02',
        studentName: 'Valentina Herrera Castro',
        studentCode: '2026-PRI-002',
        groupName: 'Primaria 1º "A"',
        enrollmentDate: '2026-08-29',
        monthlyFeeMXN: 450,
        parentAuthorization: true,
        status: 'ACTIVO',
      },
      {
        id: 'wenr-04',
        tenantId: tenant1.id,
        workshopId: 'work-04',
        workshopName: 'Ajedrez Estratégico y Agilidad Mental',
        workshopCode: 'TAL-AJE-04',
        studentId: 'student-03',
        studentName: 'Sofía Hernández Ramos',
        studentCode: '2026-PREP-045',
        groupName: 'Preparatoria 1º "A"',
        enrollmentDate: '2026-08-30',
        monthlyFeeMXN: 350,
        parentAuthorization: true,
        status: 'ACTIVO',
      },
    ];
    this.workshopEnrollments.push(...initialWorkshopEnrollments);

    const initialAttendanceLogs: WorkshopAttendanceLogDTO[] = [
      {
        id: 'watt-01',
        tenantId: tenant1.id,
        workshopId: 'work-01',
        date: '2026-09-01',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        status: 'PRESENTE',
        notes: 'Construyó con éxito el mecanismo de engranajes del robot móvil.',
      },
      {
        id: 'watt-02',
        tenantId: tenant1.id,
        workshopId: 'work-02',
        date: '2026-09-02',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        status: 'PRESENTE',
        notes: 'Participó activamente en la práctica de pases y tiro a gol.',
      },
    ];
    this.workshopAttendanceLogs.push(...initialAttendanceLogs);

    // 28. Inventario Escolar y Activos Fijos del Plantel
    const initialAssets: SchoolAssetDTO[] = [
      {
        id: 'ast-01',
        tenantId: tenant1.id,
        assetTag: 'ACT-TEC-001',
        name: 'Chromebook Lenovo 300e Touch Gen 3',
        category: 'TECNOLOGIA_COMPUTO',
        serialNumber: 'LR093821-MX',
        brandModel: 'Lenovo 300e Touch (4GB RAM, 32GB eMMC)',
        assignedLocation: 'Laboratorio de Cómputo Torre A',
        responsiblePerson: 'Ing. Fernando Salgado Ruiz',
        acquisitionDate: '2025-08-15',
        purchaseValueMXN: 8500,
        condition: 'EXCELENTE',
        warrantyExpiry: '2027-12-31',
        notes: 'Uso en taller de robótica y proyectos STEAM.',
      },
      {
        id: 'ast-02',
        tenantId: tenant1.id,
        assetTag: 'ACT-TEC-002',
        name: 'Proyector Láser Interactivo Epson BrightLink 735Fi',
        category: 'TECNOLOGIA_COMPUTO',
        serialNumber: 'EP-998822-L',
        brandModel: 'Epson BrightLink 735Fi Ultra Corto',
        assignedLocation: 'Aula 101 Primaria 1º "A"',
        responsiblePerson: 'Profra. Laura Gómez Gómez',
        acquisitionDate: '2025-07-20',
        purchaseValueMXN: 24800,
        condition: 'BUENO',
        warrantyExpiry: '2027-06-15',
        notes: 'Montado en muro con pizarrón interactivo.',
      },
      {
        id: 'ast-03',
        tenantId: tenant1.id,
        assetTag: 'ACT-TEC-003',
        name: 'Pantalla Interactiva SMART Board 75" 4K',
        category: 'TECNOLOGIA_COMPUTO',
        serialNumber: 'SB-754K-1092',
        brandModel: 'SMART Board serie GX 75 pulgadas',
        assignedLocation: 'Sala de Juntas y Dirección General',
        responsiblePerson: 'Mtro. Roberto Mendoza',
        acquisitionDate: '2025-06-10',
        purchaseValueMXN: 42000,
        condition: 'EXCELENTE',
        warrantyExpiry: '2028-08-30',
        notes: 'Para sesiones de Consejo Técnico Escolar (CTE).',
      },
      {
        id: 'ast-04',
        tenantId: tenant1.id,
        assetTag: 'ACT-LAB-004',
        name: 'Microscopio Binocular Biológico Velab VE-B3',
        category: 'LABORATORIO_CIENCIAS',
        serialNumber: 'MB-VEL-4821',
        brandModel: 'Velab VE-B3 Óptica Acromática',
        assignedLocation: 'Laboratorio de Ciencias Naturales',
        responsiblePerson: 'Dra. Claudia Zavala',
        acquisitionDate: '2024-11-12',
        purchaseValueMXN: 11200,
        condition: 'BUENO',
        warrantyExpiry: '2026-11-20',
        notes: 'Revisión óptica semestral vigente.',
      },
      {
        id: 'ast-05',
        tenantId: tenant1.id,
        assetTag: 'ACT-MOB-005',
        name: 'Módulo de 25 Pupitres Ergonómicos Regulables',
        category: 'MOBILIARIO_AULAS',
        brandModel: 'Industrias DM Mobiliario Escolar Polipropileno',
        assignedLocation: 'Aula 101 Primaria 1º "A"',
        responsiblePerson: 'Profra. Laura Gómez Gómez',
        acquisitionDate: '2025-08-01',
        purchaseValueMXN: 22500,
        condition: 'BUENO',
        notes: 'Mobiliario para alumnos de primer grado de primaria.',
      },
      {
        id: 'ast-06',
        tenantId: tenant1.id,
        assetTag: 'ACT-INF-006',
        name: 'Sistema de Audio Portátil Yamaha StagePas 600BT',
        category: 'INFRAESTRUCTURA_GENERAL',
        serialNumber: 'YM-600BT-884',
        brandModel: 'Yamaha StagePas 600BT 680W',
        assignedLocation: 'Patio Cívico y Auditorio',
        responsiblePerson: 'Lic. Héctor Morales',
        acquisitionDate: '2025-03-15',
        purchaseValueMXN: 28900,
        condition: 'BUENO',
        warrantyExpiry: '2027-03-10',
        notes: 'Usado en actos cívicos de honores a la bandera y festivales.',
      },
      {
        id: 'ast-07',
        tenantId: tenant1.id,
        assetTag: 'ACT-DEP-007',
        name: 'Porterías Metálicas de Fútbol 7 Reglamentarias',
        category: 'EQUIPO_DEPORTIVO',
        brandModel: 'Estructura tubular cédula 40 con pintura horneada',
        assignedLocation: 'Cancha de Pasto Sintético',
        responsiblePerson: 'Prof. Javier Morales Cruz',
        acquisitionDate: '2024-09-01',
        purchaseValueMXN: 18000,
        condition: 'REGULAR_REQUIERE_SERVICIO',
        notes: 'Requiere pintura anticorrosiva y ajuste de red tensora.',
      },
    ];
    this.schoolAssets.push(...initialAssets);

    const initialTickets: AssetMaintenanceTicketDTO[] = [
      {
        id: 'tkt-01',
        tenantId: tenant1.id,
        ticketNumber: 'MNT-2026-001',
        assetId: 'ast-07',
        assetName: 'Porterías Metálicas de Fútbol 7 Reglamentarias',
        assetTag: 'ACT-DEP-007',
        location: 'Cancha de Pasto Sintético',
        title: 'Mantenimiento anticorrosivo y ajuste de red',
        description: 'La portería sur presenta desajuste en los tirantes de red y desgaste de pintura en los postes por lluvia.',
        priority: 'MEDIA',
        reportedBy: 'Prof. Javier Morales Cruz',
        assignedTo: 'Mantenimiento General (Don Pedro)',
        reportedAt: '2026-09-01 10:30',
        costMXN: 650,
        status: 'EN_REPARACION',
      },
      {
        id: 'tkt-02',
        tenantId: tenant1.id,
        ticketNumber: 'MNT-2026-002',
        assetId: 'ast-02',
        assetName: 'Proyector Láser Interactivo Epson BrightLink 735Fi',
        assetTag: 'ACT-TEC-002',
        location: 'Aula 101 Primaria 1º "A"',
        title: 'Calibración de pluma interactiva y limpieza de filtros',
        description: 'Desfase de 3 cm al escribir en el pizarrón digital y advertencia preventiva de filtro de aire en pantalla.',
        priority: 'BAJA',
        reportedBy: 'Profra. Laura Gómez Gómez',
        assignedTo: 'Ing. Fernando Salgado Ruiz',
        reportedAt: '2026-08-28 15:20',
        resolvedAt: '2026-08-29 11:00',
        costMXN: 0,
        resolutionNotes: 'Se limpiaron los filtros electrostáticos y se recalibró la matriz óptica con software Epson. Funcionando al 100%.',
        status: 'RESUELTO',
      },
    ];
    this.assetMaintenanceTickets.push(...initialTickets);

    // 29. Encuestas Institucionales, Clima Escolar y Buzón de Sugerencias
    const initialSurveys: InstitutionalSurveyDTO[] = [
      {
        id: 'srv-01',
        tenantId: tenant1.id,
        code: 'ENC-2026-T1',
        title: 'Evaluación Trimestral de Calidad Educativa y Servicios 2026-1',
        description: 'Medición oficial de satisfacción familiar, modelo pedagógico NEM, cafetería y transporte escolar.',
        targetAudience: 'PADRES_FAMILIA',
        category: 'SATISFACCION_GENERAL_NPS',
        startDate: '2026-08-25',
        endDate: '2026-09-30',
        questions: [
          {
            id: 'q-01',
            prompt: '¿Qué tan probable es que recomiende nuestro Instituto a familiares y conocidos?',
            type: 'NPS_0_10',
            categoryDimension: 'LEALTAD_NPS',
          },
          {
            id: 'q-02',
            prompt: '¿Cómo califica el desempeño, trato humano y claridad pedagógica del docente titular?',
            type: 'RATING_1_5',
            categoryDimension: 'DOCENCIA',
          },
          {
            id: 'q-03',
            prompt: '¿La cafetería escolar ofrece alternativas nutricionales saludables y balanceadas?',
            type: 'RATING_1_5',
            categoryDimension: 'CAFETERIA',
          },
          {
            id: 'q-04',
            prompt: '¿El servicio de transporte escolar cumple puntualmente con los horarios y entrega segura?',
            type: 'RATING_1_5',
            categoryDimension: 'TRANSPORTE',
          },
          {
            id: 'q-05',
            prompt: '¿Qué sugerencias o comentarios desea compartir con la Dirección General?',
            type: 'TEXT',
            categoryDimension: 'RETROALIMENTACION_GENERAL',
          },
        ],
        responsesCount: 28,
        npsScore: 82,
        averageRating: 4.8,
        status: 'ACTIVA',
      },
      {
        id: 'srv-02',
        tenantId: tenant1.id,
        code: 'ENC-DOC-2026',
        title: 'Encuesta de Clima Laboral y Bienestar Docente NEM 2026',
        description: 'Diagnóstico de clima organizacional, recursos en aula, planeación didáctica y respaldo directivo.',
        targetAudience: 'DOCENTES',
        category: 'CLIMA_ESCOLAR',
        startDate: '2026-08-20',
        endDate: '2026-09-15',
        questions: [
          {
            id: 'qd-01',
            prompt: '¿Cuenta con los materiales e infraestructura tecnológica necesarios para sus proyectos formativos?',
            type: 'RATING_1_5',
            categoryDimension: 'RECURSOS_AULA',
          },
          {
            id: 'qd-02',
            prompt: '¿Se siente respaldado por el equipo directivo ante situaciones complejas con alumnos o tutores?',
            type: 'RATING_1_5',
            categoryDimension: 'LIDERAZGO_DIRECTIVO',
          },
        ],
        responsesCount: 14,
        averageRating: 4.6,
        status: 'ACTIVA',
      },
    ];
    this.institutionalSurveys.push(...initialSurveys);

    const initialResponses: SurveyResponseDTO[] = [
      {
        id: 'resp-01',
        surveyId: 'srv-01',
        respondentId: 'tutor-01',
        respondentRole: 'TUTOR',
        isAnonymous: false,
        npsRating: 10,
        answers: [
          { questionId: 'q-01', prompt: 'Recomendación NPS', value: 10 },
          { questionId: 'q-02', prompt: 'Docencia', value: 5 },
          { questionId: 'q-03', prompt: 'Cafetería', value: 4 },
          { questionId: 'q-04', prompt: 'Transporte', value: 5 },
          { questionId: 'q-05', prompt: 'Comentarios', value: 'Excelente atención de la maestra Laura y muy buena organización en los talleres vespertinos.' },
        ],
        comments: 'Estamos muy satisfechos con el avance de Carlos.',
        submittedAt: '2026-08-28 16:40',
      },
    ];
    this.surveyResponses.push(...initialResponses);

    const initialSuggestions: ConfidentialSuggestionDTO[] = [
      {
        id: 'sug-01',
        tenantId: tenant1.id,
        folio: 'BUZ-2026-001',
        category: 'INSTALACIONES',
        subject: 'Instalación de techumbre con filtro UV en patio cívico',
        message: 'Solicitamos considerar la colocación de malla sombra en el patio principal para proteger a los alumnos durante las ceremonias y clase de educación física.',
        senderRole: 'TUTOR',
        senderName: 'Mtro. Fernando Mendoza (Comité de Padres)',
        senderEmail: 'fernando.mendoza@email.com',
        submittedAt: '2026-08-26 11:15',
        reviewedBy: 'Dirección General (Mtro. Roberto Mendoza)',
        status: 'EN_ACCION',
        directorResolutionNotes: 'Proyecto presentado ante el patronato escolar; se instalará estructura tensada durante el receso de octubre.',
        resolvedAt: '2026-09-01 14:00',
      },
      {
        id: 'sug-02',
        tenantId: tenant1.id,
        folio: 'BUZ-2026-002',
        category: 'CAFETERIA',
        subject: 'Ampliación de opciones de refrigerios veganos y libres de gluten',
        message: 'Sería excelente incorporar más vasos de fruta de temporada y barras de avena sin gluten para los recreos de primaria.',
        senderRole: 'ANONIMO',
        submittedAt: '2026-08-30 09:45',
        status: 'RECIBIDO',
      },
    ];
    this.confidentialSuggestions.push(...initialSuggestions);

    // 30. Calendario Cívico SEP, Sesiones CTE y Organización de Eventos
    const initialEvents: SchoolEventDTO[] = [
      {
        id: 'evt-01',
        tenantId: tenant1.id,
        code: 'EVT-2026-001',
        title: 'Ceremonia Cívica del Grito de Independencia y Kermesse Mexicana',
        description: 'Acto cívico con honores solemnes a la bandera, representación histórica y verbena mexicana con antojitos y juegos tradicionales.',
        type: 'FESTIVAL_INSTITUCIONAL',
        date: '2026-09-15',
        time: '09:00 - 13:30 hrs',
        location: 'Patio Cívico Central y Áreas Deportivas',
        classesSuspended: false,
        audience: 'TODA_LA_COMUNIDAD',
        commissions: [
          {
            id: 'com-01',
            teacherId: 'teacher-01',
            teacherName: 'Profra. Laura Gómez Gómez',
            role: 'Coordinadora de Escenografía Mexicana y Pódium Cívico',
            status: 'EN_PROCESO',
            notes: 'Decoración con motivos patrios y montaje del altar cívico.',
          },
          {
            id: 'com-02',
            teacherId: 'teacher-02',
            teacherName: 'Prof. Roberto Salazar',
            role: 'Maestro de Ceremonias y Protocolo de Bandera',
            status: 'EN_PROCESO',
            notes: 'Coordinación con la escolta oficial de 6º grado.',
          },
          {
            id: 'com-03',
            teacherId: 'teacher-03',
            teacherName: 'Ing. Fernando Salgado Ruiz',
            role: 'Operación de Audio, Sonido e Himno Nacional',
            status: 'EN_PROCESO',
            notes: 'Prueba de sonido el 14 de septiembre a las 14:00 hrs.',
          },
          {
            id: 'com-04',
            teacherId: 'teacher-04',
            teacherName: 'Prof. Javier Morales Cruz',
            role: 'Coordinación de Juegos Tradicionales y Kermesse',
            status: 'EN_PROCESO',
            notes: 'Stands de lotería, tiro al blanco y carreras de costales.',
          },
          {
            id: 'com-05',
            teacherId: 'teacher-05',
            teacherName: 'Dra. Claudia Zavala',
            role: 'Puesto de Primeros Auxilios y Brigada de Salud',
            status: 'EN_PROCESO',
            notes: 'Enfermería en guardia permanente durante la verbena.',
          },
        ],
        status: 'PROGRAMADO',
      },
      {
        id: 'evt-02',
        tenantId: tenant1.id,
        code: 'SEP-2026-001',
        title: 'Aniversario del Inicio de la Independencia de México',
        description: 'Día de suspensión oficial de labores docentes y estudiantiles conforme al calendario escolar emitido por la SEP.',
        type: 'SUSPENSION_OFICIAL_SEP',
        date: '2026-09-16',
        classesSuspended: true,
        audience: 'TODA_LA_COMUNIDAD',
        commissions: [],
        status: 'PROGRAMADO',
      },
      {
        id: 'evt-03',
        tenantId: tenant1.id,
        code: 'CTE-2026-001',
        title: 'Primera Sesión Ordinaria de Consejo Técnico Escolar (CTE)',
        description: 'Sesión mensual colegiada de análisis pedagógico, evaluación diagnóstica de grupos y vinculación con proyectos comunitarios NEM.',
        type: 'CONSEJO_TECNICO_CTE',
        date: '2026-09-25',
        time: '08:00 - 14:00 hrs',
        location: 'Sala de Juntas y Biblioteca Central',
        classesSuspended: true,
        audience: 'SOLO_DOCENTES',
        cteAgenda: [
          'Análisis de los resultados diagnósticos en Lenguajes y Saberes Científicos.',
          'Diseño de proyectos integradores interdisciplinarios NEM por fase escolar.',
          'Estrategias de inclusión para alumnos con necesidades educativas específicas.',
          'Plan operativo para la muestra de robótica y tecnología de noviembre.',
        ],
        cteAgreements: [
          'Acuerdo CTE 01: Dedicar 15 minutos diarios al club de lectura y redacción en el aula matutina.',
          'Acuerdo CTE 02: Articular los proyectos de ciencias con las academias vespertinas de robótica.',
        ],
        commissions: [
          {
            id: 'com-06',
            teacherId: 'teacher-01',
            teacherName: 'Profra. Laura Gómez Gómez',
            role: 'Relatora Oficial y Redacción de Minuta Colegiada',
            status: 'EN_PROCESO',
          },
        ],
        status: 'PROGRAMADO',
      },
      {
        id: 'evt-04',
        tenantId: tenant1.id,
        code: 'EVT-2026-002',
        title: 'Muestra Anual STEAM de Robótica, Ciencias y Creatividad',
        description: 'Exposición de proyectos tecnológicos de alumnos: robótica LEGO SPIKE, experimentos de ciencias y ajedrez en vivo.',
        type: 'FESTIVAL_INSTITUCIONAL',
        date: '2026-11-20',
        time: '10:00 - 14:00 hrs',
        location: 'Laboratorio STEAM y Auditorio',
        classesSuspended: false,
        audience: 'TODA_LA_COMUNIDAD',
        commissions: [
          {
            id: 'com-07',
            teacherId: 'teacher-03',
            teacherName: 'Ing. Fernando Salgado Ruiz',
            role: 'Coordinador General de la Exhibición Robótica',
            status: 'EN_PROCESO',
          },
        ],
        status: 'PROGRAMADO',
      },
      {
        id: 'evt-05',
        tenantId: tenant1.id,
        code: 'VAC-2026-001',
        title: 'Periodo Vacacional de Invierno (Calendario Oficial SEP)',
        description: 'Receso escolar decembrino oficial para alumnos y personal educativo.',
        type: 'VACACIONES_OFICIALES',
        date: '2026-12-18',
        endDate: '2027-01-08',
        classesSuspended: true,
        audience: 'TODA_LA_COMUNIDAD',
        commissions: [],
        status: 'PROGRAMADO',
      },
    ];
    this.schoolEvents.push(...initialEvents);

    // 31. Reclutamiento y Recursos Humanos Escolares
    const initialVacancies: JobVacancyDTO[] = [
      {
        id: 'vac-01',
        tenantId: tenant1.id,
        code: 'VAC-2026-001',
        title: 'Profesor(a) Titular Bilingüe - Primaria Alta (4º a 6º)',
        department: 'INGLES_BILINGUE',
        type: 'TIEMPO_COMPLETO',
        description: 'Impartición de asignaturas en inglés, proyectos integradores y acompañamiento pedagógico NEM para los grados de 4º a 6º de Primaria.',
        requirements: [
          'Licenciatura en Pedagogía, Educación Primaria o Lengua Inglesa con Cédula Profesional DGP.',
          'Certificación Cambridge C1/C2 o TOEFL ITP superior a 580 puntos.',
          'Experiencia mínima de 3 años en colegios particulares y modelo NEM.',
        ],
        salaryRangeMXN: '$18,500 - $22,000 MXN / mes',
        applicationsCount: 2,
        publishDate: '2026-08-15',
        closingDate: '2026-09-30',
        status: 'EN_ENTREVISTAS',
      },
      {
        id: 'vac-02',
        tenantId: tenant1.id,
        code: 'VAC-2026-002',
        title: 'Educadora de Preescolar - Metodología Constructivista NEM',
        department: 'DOCENCIA_PREESCOLAR',
        type: 'TIEMPO_COMPLETO',
        description: 'Titular de grupo para Preescolar 2º y 3º con enfoque en desarrollo socioemocional, estimulación temprana y lectoescritura constructivista.',
        requirements: [
          'Licenciatura en Educación Preescolar con Cédula Profesional registrada ante la SEP.',
          'Conocimiento de campos formativos y fases 1 y 2 de la Nueva Escuela Mexicana.',
          'Habilidades en mediación pacífica, disciplina positiva y talleres lúdicos.',
        ],
        salaryRangeMXN: '$16,000 - $19,000 MXN / mes',
        applicationsCount: 1,
        publishDate: '2026-08-20',
        closingDate: '2026-10-15',
        status: 'ABIERTA',
      },
      {
        id: 'vac-03',
        tenantId: tenant1.id,
        code: 'VAC-2026-003',
        title: 'Entrenador(a) Formativo de Baloncesto Infantil y Turno Vespertino',
        department: 'EXTRACURRICULAR_DEPORTES',
        type: 'POR_HORAS_ASIGNATURA',
        description: 'Responsable de la academia vespertina de basquetbol infantil para alumnos de 1º a 6º de Primaria los días martes y jueves de 14:30 a 16:00 hrs.',
        requirements: [
          'Licenciatura en Educación Física o Ciencias del Deporte con Cédula o Constancia de trámite.',
          'Experiencia en iniciación deportiva escolar infantil y primeros auxilios.',
        ],
        salaryRangeMXN: '$450 MXN / sesión',
        applicationsCount: 1,
        publishDate: '2026-08-25',
        closingDate: '2026-10-05',
        status: 'ABIERTA',
      },
    ];
    this.jobVacancies.push(...initialVacancies);

    const initialCandidates: TeacherCandidateDTO[] = [
      {
        id: 'cand-01',
        tenantId: tenant1.id,
        folio: 'CAND-2026-001',
        vacancyId: 'vac-01',
        vacancyTitle: 'Profesor(a) Titular Bilingüe - Primaria Alta (4º a 6º)',
        fullName: 'Mtra. Valeria Quintana Ríos',
        email: 'valeria.quintana@gmail.com',
        phone: '55 4321 8765',
        degree: 'Licenciatura en Enseñanza del Inglés y Pedagogía',
        professionalLicense: '11894520',
        sepAccreditation: 'VALIDADA_DGP',
        yearsOfExperience: 6,
        resumeSummary: '6 años en colegios bilingües IB/SEP en CDMX. Certificación Cambridge C2 Proficiency.',
        status: 'CLASE_MUESTRA_PEDAGOGICA',
        pedagogicalDemoScore: 94,
        interviewNotes: 'Excelente desenvolvimiento en aula, planeación didáctica alineada al campo de Lenguajes. Se recomienda contratación.',
        appliedDate: '2026-08-18',
        lastUpdatedDate: '2026-08-29',
      },
      {
        id: 'cand-02',
        tenantId: tenant1.id,
        folio: 'CAND-2026-002',
        vacancyId: 'vac-01',
        vacancyTitle: 'Profesor(a) Titular Bilingüe - Primaria Alta (4º a 6º)',
        fullName: 'Lic. Gabriel Aranda Montes',
        email: 'gabriel.aranda@outlook.com',
        phone: '55 8765 4321',
        degree: 'Licenciatura en Lengua Inglesa',
        professionalLicense: '12457891',
        sepAccreditation: 'VALIDADA_DGP',
        yearsOfExperience: 4,
        resumeSummary: 'Docente titular en primaria particular, dominio de herramientas EdTech y gamificación.',
        status: 'ENTREVISTA_INICIAL',
        interviewNotes: 'Entrevista favorable; programar clase muestra para el 8 de septiembre.',
        appliedDate: '2026-08-22',
        lastUpdatedDate: '2026-08-26',
      },
      {
        id: 'cand-03',
        tenantId: tenant1.id,
        folio: 'CAND-2026-003',
        vacancyId: 'vac-02',
        vacancyTitle: 'Educadora de Preescolar - Metodología Constructivista NEM',
        fullName: 'Lic. Pamela Rangel Cruz',
        email: 'pamela.rangel@gmail.com',
        phone: '55 1234 9876',
        degree: 'Licenciatura en Educación Preescolar',
        professionalLicense: '10984321',
        sepAccreditation: 'VALIDADA_DGP',
        yearsOfExperience: 5,
        resumeSummary: 'Especialista en desarrollo socioemocional infantil y proyectos lúdicos de estimulación temprana.',
        status: 'ENTREVISTA_INICIAL',
        interviewNotes: 'Perfil muy empático y conocimiento profundo de fases 1 y 2 NEM.',
        appliedDate: '2026-08-28',
        lastUpdatedDate: '2026-08-31',
      },
      {
        id: 'cand-04',
        tenantId: tenant1.id,
        folio: 'CAND-2026-004',
        vacancyId: 'vac-03',
        vacancyTitle: 'Entrenador(a) Formativo de Baloncesto Infantil y Turno Vespertino',
        fullName: 'Prof. Marco Antonio Solís Vega',
        email: 'marco.solis@yahoo.com',
        phone: '55 6543 2109',
        degree: 'Licenciatura en Entrenamiento Deportivo',
        professionalLicense: 'En trámite oficial ante DGP',
        sepAccreditation: 'EN_TRAMITE',
        yearsOfExperience: 3,
        resumeSummary: 'Entrenador de liga infantil escolar y certificación en psicomotricidad deportiva.',
        status: 'POSTULADO',
        appliedDate: '2026-08-30',
        lastUpdatedDate: '2026-08-30',
      },
    ];
    this.teacherCandidates.push(...initialCandidates);

    // 32. Protección Civil Escolar y Simulacros
    const initialDrills: CivilProtectionDrillDTO[] = [
      {
        id: 'sim-01',
        tenantId: tenant1.id,
        code: 'SIM-2026-001',
        title: 'Segundo Simulacro Nacional 2026 - Conmemorativo 19-S',
        drillType: 'SISMO',
        date: '2026-09-19',
        time: '11:00 hrs',
        hypothesis: 'Sismo de magnitud 8.0 con epicentro en costas de Guerrero, percepción severa en Valle de México y activación de alerta sísmica SASMEX.',
        evacuationTimeSeconds: 118,
        participants: {
          students: 280,
          teachers: 24,
          staff: 8,
          visitors: 3,
          total: 315,
        },
        assemblyPoint: 'Patio Cívico Central (Zona S-1) y Canchas Techadas (Zona S-2)',
        incidentsReported: [
          '2 crisis nerviosas en alumnos de 4º de primaria, atendidas oportunamente por la brigada de primeros auxilios.',
          'Repliegue preventivo bajo mesabancos ejecutado en menos de 15 segundos al sonido de la alarma.',
          'Rutas de evacuación despejadas sin caídas ni tropiezos.',
        ],
        evaluation: 'EXCELENTE',
        notes: 'Excelente coordinación del Comité de Protección Civil Escolar y apego total al protocolo de la Coordinación Nacional de Protección Civil.',
        createdAt: '2026-09-19T11:45:00.000Z',
      },
      {
        id: 'sim-02',
        tenantId: tenant1.id,
        code: 'SIM-2026-002',
        title: 'Simulacro Mensual de Repliegue y Alerta Sísmica Temprana',
        drillType: 'SISMO',
        date: '2026-10-21',
        time: '10:15 hrs',
        hypothesis: 'Sismo de magnitud 6.5 con epicentro en Michoacán y percepción moderada.',
        evacuationTimeSeconds: 132,
        participants: {
          students: 275,
          teachers: 24,
          staff: 7,
          visitors: 0,
          total: 306,
        },
        assemblyPoint: 'Patio Cívico Central (Zona S-1)',
        incidentsReported: [
          'Desalojo ordenado sin incidentes mayores.',
        ],
        evaluation: 'BUENO',
        notes: 'Se reforzó la indicación de no correr, no gritar y no empujar en escaleras del Edificio A.',
        createdAt: '2026-10-21T10:45:00.000Z',
      },
      {
        id: 'sim-03',
        tenantId: tenant1.id,
        code: 'SIM-2026-003',
        title: 'Simulacro Interno de Conato de Incendio en Laboratorio STEAM',
        drillType: 'INCENDIO',
        date: '2026-11-12',
        time: '12:30 hrs',
        hypothesis: 'Conato de incendio originado por sobrecarga en toma de corriente del laboratorio de ciencias y robótica.',
        evacuationTimeSeconds: 96,
        participants: {
          students: 58,
          teachers: 4,
          staff: 3,
          visitors: 0,
          total: 65,
        },
        assemblyPoint: 'Explanada de Aulas de Ciencias (Zona S-3)',
        incidentsReported: [
          'Uso efectivo del extintor de PQS (Polvo Químico Seco tipo ABC) por el jefe de brigada.',
          'Corte inmediato del suministro eléctrico en el interruptor principal del edificio.',
        ],
        evaluation: 'EXCELENTE',
        notes: 'Verificación del funcionamiento de detectores de humo y alarma sonora local.',
        createdAt: '2026-11-12T13:00:00.000Z',
      },
    ];
    this.civilProtectionDrills.push(...initialDrills);

    const initialBrigades: EmergencyBrigadeDTO[] = [
      {
        id: 'brig-01',
        tenantId: tenant1.id,
        code: 'BRIG-01',
        type: 'EVACUACION_REPLIEGUE',
        name: 'Brigada de Evacuación y Repliegue Escolar',
        colorHex: '#10B981',
        vestColor: 'Chaleco Verde Reflejante',
        leaderName: 'Profra. Laura Gómez Gómez',
        members: [
          {
            id: 'bm-01',
            teacherId: 'teacher-01',
            fullName: 'Profra. Laura Gómez Gómez',
            role: 'Jefa de Brigada / Coordinadora General',
            buildingZone: 'Edificio A - Primaria Planta Baja y Patio',
            certified: true,
          },
          {
            id: 'bm-02',
            teacherId: 'teacher-02',
            fullName: 'Profra. Carmen Morales Ortíz',
            role: 'Brigadista de Guía y Repliegue',
            buildingZone: 'Edificio B - Preescolar',
            certified: true,
          },
        ],
      },
      {
        id: 'brig-02',
        tenantId: tenant1.id,
        code: 'BRIG-02',
        type: 'PRIMEROS_AUXILIOS',
        name: 'Brigada de Primeros Auxilios y Soporte Básico',
        colorHex: '#EF4444',
        vestColor: 'Chaleco Blanco con Cruz Roja',
        leaderName: 'Dra. Patricia Silva Méndez',
        members: [
          {
            id: 'bm-03',
            fullName: 'Dra. Patricia Silva Méndez',
            role: 'Jefa de Brigada / Médico Escolar Titular',
            buildingZone: 'Consultorio de Enfermería y Patio Cívico',
            certified: true,
          },
          {
            id: 'bm-04',
            teacherId: 'teacher-03',
            fullName: 'Ing. Fernando Salgado Ruiz',
            role: 'Operador de Camilla y Botiquín de Trauma',
            buildingZone: 'Canchas Deportivas y Edificio A',
            certified: true,
          },
        ],
      },
      {
        id: 'brig-03',
        tenantId: tenant1.id,
        code: 'BRIG-03',
        type: 'COMBATE_INCENDIOS',
        name: 'Brigada de Prevención y Combate de Incendios',
        colorHex: '#F97316',
        vestColor: 'Chaleco Rojo Fuego',
        leaderName: 'Prof. Roberto Salazar Reyes',
        members: [
          {
            id: 'bm-05',
            fullName: 'Prof. Roberto Salazar Reyes',
            role: 'Jefe de Brigada / Operador de Extintores de PQS y CO2',
            buildingZone: 'Cafetería, Laboratorios y Cocina',
            certified: true,
          },
          {
            id: 'bm-06',
            fullName: 'Sr. Don Tomás Cruz Mendoza',
            role: 'Operador de Válvulas Maestras de Gas y Red Eléctrica',
            buildingZone: 'Mantenimiento, Cisterna y Subestación',
            certified: true,
          },
        ],
      },
      {
        id: 'brig-04',
        tenantId: tenant1.id,
        code: 'BRIG-04',
        type: 'COMUNICACION_ENLACE',
        name: 'Brigada de Comunicación y Enlace Institucional',
        colorHex: '#3B82F6',
        vestColor: 'Chaleco Azul Cobalto',
        leaderName: 'Lic. Andrea Vargas Montes',
        members: [
          {
            id: 'bm-07',
            fullName: 'Lic. Andrea Vargas Montes',
            role: 'Jefa de Brigada / Enlace 911 y Protección Civil Alcaldía',
            buildingZone: 'Dirección General y Recepción Principal',
            certified: true,
          },
        ],
      },
    ];
    this.emergencyBrigades.push(...initialBrigades);

    // 33. Consejo de Participación Escolar (CEPS) y Asociación de Padres de Familia (APF)
    const initialCommittees: CepsCommitteeDTO[] = [
      {
        id: 'ceps-01',
        tenantId: tenant1.id,
        name: 'Comité de Fomento a la Lectura y Mejora de los Aprendizajes',
        type: 'LECTURA_APRENDIZAJES',
        leaderTutorName: 'Sr. Roberto Mendoza Valdés',
        leaderTeacherName: 'Prof. Roberto Salazar Reyes',
        membersCount: 8,
        objective: 'Promover la comprensión lectora diaria de 20 minutos, círculos de lectura infantil y enriquecimiento del acervo bibliotecario.',
        activeProjects: [
          'Maratón de Lectura Trimestral y Préstamo de Cuentos Clásicos a Casa',
          'Taller de Cuentacuentos con Padres de Familia los Viernes Cívicos',
        ],
        status: 'ACTIVO',
      },
      {
        id: 'ceps-02',
        tenantId: tenant1.id,
        name: 'Comité de Infraestructura y Mantenimiento Escolar',
        type: 'INFRAESTRUCTURA_ESCOLAR',
        leaderTutorName: 'Ing. Arturo Domínguez Parra',
        leaderTeacherName: 'Don Tomás Cruz Mendoza',
        membersCount: 10,
        objective: 'Supervisar el estado físico de aulas, baños, áreas deportivas y gestionar proyectos de mejora de techumbres e iluminación.',
        activeProjects: [
          'Instalación de malla sombra en patio de juegos de preescolar',
          'Mantenimiento preventivo semestral de bebederos y filtros de agua',
        ],
        status: 'ACTIVO',
      },
      {
        id: 'ceps-03',
        tenantId: tenant1.id,
        name: 'Comité de Salud Escolar y Nutrición',
        type: 'SALUD_NUTRICION',
        leaderTutorName: 'Dra. Mónica Villarreal Soto',
        leaderTeacherName: 'Dra. Patricia Silva Méndez',
        membersCount: 7,
        objective: 'Vigilar la oferta nutricional en cafetería escolar sin alimentos ultraprocesados y coordinar jornadas de vacunación y peso/talla.',
        activeProjects: [
          'Supervisión del decálogo de alimentación saludable escolar libre de sellos',
          'Jornada de Salud Bucal y Fluoruración con el Centro de Salud local',
        ],
        status: 'ACTIVO',
      },
      {
        id: 'ceps-04',
        tenantId: tenant1.id,
        name: 'Comité de Convivencia Escolar y Cultura de Paz',
        type: 'SANA_CONVIVENCIA',
        leaderTutorName: 'Lic. Karla Benítez Orozco',
        leaderTeacherName: 'Profra. Laura Gómez Gómez',
        membersCount: 6,
        objective: 'Fomentar la resolución pacífica de conflictos, prevención del acoso escolar (bullying) y vinculación socioemocional.',
        activeProjects: [
          'Programa de Alumnos Mediadores de Paz en Recreos',
          'Conferencias para Padres: Crianza Positiva y Límites Respetuosos',
        ],
        status: 'ACTIVO',
      },
      {
        id: 'ceps-05',
        tenantId: tenant1.id,
        name: 'Comité de Contraloría Social y Transparencia Escolar',
        type: 'CONTRALORIA_SOCIAL',
        leaderTutorName: 'C.P. Mariana Estrada Gómez',
        leaderTeacherName: 'Lic. Andrea Vargas Montes',
        membersCount: 5,
        objective: 'Rendir cuentas del destino de las aportaciones voluntarias de padres de familia y vigilar el uso ético y transparente de recursos.',
        activeProjects: [
          'Publicación trimestral del estado de ingresos y egresos de la APF',
          'Bitácora pública de cotizaciones y compras de equipamiento escolar',
        ],
        status: 'ACTIVO',
      },
    ];
    this.cepsCommittees.push(...initialCommittees);

    const initialBoardMembers: ApfBoardMemberDTO[] = [
      {
        id: 'apf-01',
        tenantId: tenant1.id,
        role: 'PRESIDENTE',
        fullName: 'Ing. Roberto Mendoza Valdés',
        studentName: 'Carlos Mendoza Ruiz',
        studentGrade: '1º Primaria "A"',
        email: 'roberto.mendoza@gmail.com',
        phone: '55 1234 5678',
        appointedDate: '2026-09-08',
      },
      {
        id: 'apf-02',
        tenantId: tenant1.id,
        role: 'SECRETARIO',
        fullName: 'Lic. Gabriela Herrera Solís',
        studentName: 'Valentina Herrera',
        studentGrade: '3º Primaria "B"',
        email: 'gabriela.herrera@outlook.com',
        phone: '55 8765 4321',
        appointedDate: '2026-09-08',
      },
      {
        id: 'apf-03',
        tenantId: tenant1.id,
        role: 'TESORERO',
        fullName: 'C.P. Mariana Estrada Gómez',
        studentName: 'Emiliano Estrada',
        studentGrade: '2º Preescolar "A"',
        email: 'mariana.estrada@gmail.com',
        phone: '55 3456 7890',
        appointedDate: '2026-09-08',
      },
      {
        id: 'apf-04',
        tenantId: tenant1.id,
        role: 'VOCAL_PREESCOLAR',
        fullName: 'Lic. Pamela Rangel Cruz',
        studentName: 'Mateo Rangel',
        studentGrade: '3º Preescolar',
        email: 'pamela.rangel@yahoo.com',
        phone: '55 2345 6789',
        appointedDate: '2026-09-08',
      },
      {
        id: 'apf-05',
        tenantId: tenant1.id,
        role: 'VOCAL_PRIMARIA_BAJA',
        fullName: 'Ing. Arturo Domínguez Parra',
        studentName: 'Santiago Domínguez',
        studentGrade: '2º Primaria "A"',
        email: 'arturo.dominguez@gmail.com',
        phone: '55 9876 1234',
        appointedDate: '2026-09-08',
      },
      {
        id: 'apf-06',
        tenantId: tenant1.id,
        role: 'VOCAL_PRIMARIA_ALTA',
        fullName: 'Dra. Mónica Villarreal Soto',
        studentName: 'Renata Villarreal',
        studentGrade: '5º Primaria "A"',
        email: 'monica.villarreal@hospital.mx',
        phone: '55 5432 9876',
        appointedDate: '2026-09-08',
      },
    ];
    this.apfBoardMembers.push(...initialBoardMembers);

    const initialAssemblies: SchoolAssemblyDTO[] = [
      {
        id: 'asemb-01',
        tenantId: tenant1.id,
        code: 'ACT-APF-2026-001',
        title: 'Asamblea General Ordinaria de Instalación y Elección de Mesa Directiva APF 2026-2027',
        type: 'ASAMBLEA_GENERAL_APF',
        date: '2026-09-08',
        time: '08:00 - 10:30 hrs',
        location: 'Auditorio Escolar y Enlace Zoom Híbrido',
        quorumCount: 115,
        agreements: [
          'Elección y toma de protesta de la nueva Mesa Directiva de la APF presidida por el Ing. Roberto Mendoza.',
          'Aprobación unánime de la aportación voluntaria de mantenimiento anual de $1,200 MXN por familia.',
          'Compromiso de entrega de informes financieros bimestrales en mural escolar y plataforma digital.',
          'Aprobación de la instalación de malla sombra en patio de recreo infantil de preescolar.',
        ],
        status: 'REALIZADA_CON_ACTA',
        signedByDirector: true,
        signedByApfPresident: true,
        createdAt: '2026-09-08T11:00:00.000Z',
      },
      {
        id: 'asemb-02',
        tenantId: tenant1.id,
        code: 'ACT-CEPS-2026-001',
        title: 'Primera Sesión Ordinaria de Instalación del Consejo de Participación Escolar (CEPS)',
        type: 'SESION_ORDINARIA_CEPS',
        date: '2026-09-22',
        time: '14:30 - 16:00 hrs',
        location: 'Sala de Juntas de Dirección General',
        quorumCount: 32,
        agreements: [
          'Constitución formal de los 5 comités de corresponsabilidad escolar conforme al Acuerdo Secretarial 716.',
          'Validación del plan institucional de fomento a la lectura y clubes de ajedrez matutinos.',
          'Revisión y aval del Programa Interno de Protección Civil y simulacro nacional 19-S.',
        ],
        status: 'REALIZADA_CON_ACTA',
        signedByDirector: true,
        signedByApfPresident: true,
        createdAt: '2026-09-22T16:30:00.000Z',
      },
    ];
    this.schoolAssemblies.push(...initialAssemblies);

    // 34. Infraestructura Escolar y Mantenimiento Preventivo
    const initialInspections: FacilityInspectionDTO[] = [
      {
        id: 'insp-01',
        tenantId: tenant1.id,
        code: 'INSP-2026-001',
        title: 'Inspección Semestral de Cisternas, Tinacos y Red Hidráulica',
        systemType: 'RED_HIDRAULICA_CISTERNAS',
        frequency: 'SEMESTRAL',
        inspectionDate: '2026-09-15',
        inspectorName: 'Don Tomás Cruz Mendoza - Jefe de Mantenimiento',
        verifiedItems: [
          {
            name: 'Lavado y desinfección con hipoclorito en Cisterna 1 (30,000L) y Cisterna 2 (20,000L)',
            status: 'OPTIMO',
            notes: 'Cumple protocolo COFEPRIS para planteles educativos.',
          },
          {
            name: 'Revisión y alternancia de bombas sumergibles de 1.5 HP e hidroneumático',
            status: 'OPTIMO',
            notes: 'Presión constante a 42 PSI en toda la red de sanitarios.',
          },
          {
            name: 'Muestreo y titulación de cloro residual libre en tomas de agua (1.0 ppm)',
            status: 'OPTIMO',
            notes: 'Dentro de parámetros de la NOM-127-SSA1-2021.',
          },
          {
            name: 'Bebederos escolares y módulos de filtración de carbón y luz ultravioleta',
            status: 'OPTIMO',
            notes: 'Filtros reemplazados con fecha límite de vigencia marzo 2027.',
          },
        ],
        overallStatus: 'CONFORME',
        nextScheduledDate: '2027-03-15',
        evidenceNotes: 'Bitácora sellada por intendencia y disponible para inspección de salubridad.',
        createdAt: '2026-09-15T12:00:00.000Z',
      },
      {
        id: 'insp-02',
        tenantId: tenant1.id,
        code: 'INSP-2026-002',
        title: 'Revisión Mensual de Subestación, Tableros Eléctricos y Alumbrado',
        systemType: 'SISTEMA_ELECTRICO',
        frequency: 'MENSUAL',
        inspectionDate: '2026-09-18',
        inspectorName: 'Ing. Fernando Salgado Ruiz & Don Tomás Cruz',
        verifiedItems: [
          {
            name: 'Termografía de interruptores termomagnéticos en tablero general Edificio A',
            status: 'OPTIMO',
            notes: 'Sin sobrecalentamiento ni desbalance de fases.',
          },
          {
            name: 'Prueba de activación de luces de emergencia en pasillos y escaleras',
            status: 'OPTIMO',
            notes: 'Baterías de respaldo con autonomía probada de 90 minutos.',
          },
          {
            name: 'Contactos con interruptor diferencial GFCI en laboratorios STEAM y cómputo',
            status: 'REGULAR_OBSERVACIONES',
            notes: 'Requiere ajuste de fijación en placa de contacto #3 en aula STEAM.',
          },
          {
            name: 'Alumbrado exterior perimetral y reflectores de canchas deportivas',
            status: 'OPTIMO',
            notes: '100% de reflectores LED operativos con fotocelda automática.',
          },
        ],
        overallStatus: 'CONFORME',
        nextScheduledDate: '2026-10-18',
        evidenceNotes: 'Dictamen de electricista certificado con verificación de carga.',
        createdAt: '2026-09-18T14:30:00.000Z',
      },
      {
        id: 'insp-03',
        tenantId: tenant1.id,
        code: 'INSP-2026-003',
        title: 'Inspección de Impermeabilización, Losas y Bajadas Pluviales',
        systemType: 'ESTRUCTURA_IMPERMEABILIZACION',
        frequency: 'BIMESTRAL',
        inspectionDate: '2026-09-02',
        inspectorName: 'Don Tomás Cruz Mendoza',
        verifiedItems: [
          {
            name: 'Desazolve de coladeras y gárgolas de bajada pluvial en losa superior',
            status: 'OPTIMO',
            notes: 'Libres de hojas y sedimentos.',
          },
          {
            name: 'Revisión de manto asfáltico e impermeabilizante acrílico en techos',
            status: 'REGULAR_OBSERVACIONES',
            notes: 'Se detecta ligero encharcamiento en esquina poniente de Edificio B.',
          },
          {
            name: 'Tensión y anclaje de malla sombra en patio infantil de preescolar',
            status: 'OPTIMO',
            notes: 'Estructura tubular firme y cables tensores ajustados.',
          },
        ],
        overallStatus: 'REQUIERE_MANTENIMIENTO',
        nextScheduledDate: '2026-11-02',
        evidenceNotes: 'Se genera orden de trabajo para nivelar pendiente pluvial antes de lluvias de octubre.',
        createdAt: '2026-09-02T10:00:00.000Z',
      },
      {
        id: 'insp-04',
        tenantId: tenant1.id,
        code: 'INSP-2026-004',
        title: 'Evaluación de Cerrajería, Salidas de Emergencia y Rampas Universales',
        systemType: 'CERRAJERIA_ACCESIBILIDAD',
        frequency: 'MENSUAL',
        inspectionDate: '2026-08-28',
        inspectorName: 'Lic. Andrea Vargas & Don Tomás Cruz',
        verifiedItems: [
          {
            name: 'Barras antipánico en puertas dobles de auditorio y salida norte',
            status: 'OPTIMO',
            notes: 'Apertura inmediata sin atascos.',
          },
          {
            name: 'Superficie antideslizante y pasamanos de rampa de acceso universal',
            status: 'OPTIMO',
            notes: 'Pendiente del 6% acorde a norma de accesibilidad para sillas de ruedas.',
          },
          {
            name: 'Cerraduras y chapas en 18 aulas pedagógicas y dirección',
            status: 'OPTIMO',
            notes: 'Juegos de llaves maestras en vitrina de control de acceso.',
          },
        ],
        overallStatus: 'CONFORME',
        nextScheduledDate: '2026-09-28',
        evidenceNotes: 'Validado conforme a norma de Protección Civil y accesibilidad SEP.',
        createdAt: '2026-08-28T11:00:00.000Z',
      },
    ];
    this.facilityInspections.push(...initialInspections);

    const initialWorkOrders: FacilityWorkOrderDTO[] = [
      {
        id: 'ot-01',
        tenantId: tenant1.id,
        folio: 'OT-MNT-2026-001',
        systemType: 'RED_HIDRAULICA_CISTERNAS',
        areaLocation: 'Cisterna Patio Posterior - Edificio B',
        title: 'Sustitución de válvula de descarga y flotador de latón en cisterna 2',
        description: 'Válvula anterior presentaba ligero goteo continuo. Se reemplazó por flotador de uso pesado de 1 pulgada.',
        priority: 'ALTA',
        assignedWorker: 'Don Tomás Cruz Mendoza',
        materialsCostMXN: 850,
        laborCostMXN: 600,
        totalCostMXN: 1450,
        reportedDate: '2026-09-05',
        targetCompletionDate: '2026-09-06',
        completedDate: '2026-09-06',
        status: 'FINALIZADA_CON_VB',
        completionNotes: 'Prueba de llenado y corte de bomba sumergible realizada exitosamente.',
        approvedByDirector: true,
        createdAt: '2026-09-05T09:00:00.000Z',
      },
      {
        id: 'ot-02',
        tenantId: tenant1.id,
        folio: 'OT-MNT-2026-002',
        systemType: 'SISTEMA_ELECTRICO',
        areaLocation: 'Edificio A - Aula 204 STEAM',
        title: 'Sustitución de 6 luminarias LED tubulares en Laboratorio STEAM',
        description: 'Reemplazo de tubos fluorescentes antiguos por tecnología LED 18W de alta eficiencia con encendido instantáneo.',
        priority: 'MEDIA',
        assignedWorker: 'Instalaciones Eléctricas Ruiz',
        materialsCostMXN: 1500,
        laborCostMXN: 600,
        totalCostMXN: 2100,
        reportedDate: '2026-09-10',
        targetCompletionDate: '2026-09-12',
        completedDate: '2026-09-11',
        status: 'FINALIZADA_CON_VB',
        completionNotes: 'Excelente iluminación uniforme sobre mesas de robótica y experimentos.',
        approvedByDirector: true,
        createdAt: '2026-09-10T14:00:00.000Z',
      },
      {
        id: 'ot-03',
        tenantId: tenant1.id,
        folio: 'OT-MNT-2026-003',
        systemType: 'ESTRUCTURA_IMPERMEABILIZACION',
        areaLocation: 'Pasillo Exterior - Salones 3º y 4º Primaria',
        title: 'Resane de muros y aplicación de pintura vinílica lavable antibacterial',
        description: 'Mantenimiento estético y preventivo contra humedad en muros exteriores del corredor poniente.',
        priority: 'MEDIA',
        assignedWorker: 'Don Tomás Cruz Mendoza',
        materialsCostMXN: 2200,
        laborCostMXN: 1600,
        totalCostMXN: 3800,
        reportedDate: '2026-09-18',
        targetCompletionDate: '2026-09-25',
        status: 'EN_EJECUCION',
        completionNotes: 'Trabajo programado en horario vespertino para no interrumpir actividades académicas.',
        approvedByDirector: true,
        createdAt: '2026-09-18T16:00:00.000Z',
      },
    ];
    this.facilityWorkOrders.push(...initialWorkOrders);

    // 35. Becas Institucionales y Exenciones SEP (5% Obligatorio)
    const initialScholarships: ScholarshipApplicationDTO[] = [
      {
        id: 'bec-01',
        tenantId: tenant1.id,
        folio: 'BEC-2026-001',
        studentId: 'student-val-01',
        studentName: 'Valentina Herrera Solís',
        studentCode: '2026-PRI-008',
        level: 'PRIMARIA',
        grade: '3º Primaria "B"',
        type: 'BECA_EXCELENCIA_ACADEMICA',
        previousGpa: 9.8,
        monthlyFamilyIncomeMXN: 24000,
        dependentsCount: 2,
        requestedDiscountPercentage: 50,
        approvedDiscountPercentage: 50,
        standardTuitionMXN: 4200,
        finalTuitionMXN: 2100,
        status: 'APROBADA',
        submissionDate: '2026-08-20',
        resolutionDate: '2026-08-28',
        resolutionNotes: 'Aprobada al 50% por el Comité de Becas. Alumna con promedio sobresaliente de 9.8 y primer lugar de generación.',
        reviewerName: 'Comité de Becas & Dirección Técnica Primaria',
        documentsVerified: true,
        createdAt: '2026-08-20T10:00:00.000Z',
      },
      {
        id: 'bec-02',
        tenantId: tenant1.id,
        folio: 'BEC-2026-002',
        studentId: 'student-emi-01',
        studentName: 'Emiliano Estrada Gómez',
        studentCode: '2026-KND-005',
        level: 'PREESCOLAR',
        grade: '2º Kínder "A"',
        type: 'BECA_HERMANOS_FAMILIA',
        previousGpa: 9.2,
        monthlyFamilyIncomeMXN: 32000,
        dependentsCount: 3,
        requestedDiscountPercentage: 25,
        approvedDiscountPercentage: 25,
        standardTuitionMXN: 3800,
        finalTuitionMXN: 2850,
        status: 'APROBADA',
        submissionDate: '2026-08-22',
        resolutionDate: '2026-08-29',
        resolutionNotes: 'Descuento institucional del 25% por segundo hermano matriculado simultáneamente en el plantel.',
        reviewerName: 'Dirección Administrativa',
        documentsVerified: true,
        createdAt: '2026-08-22T11:30:00.000Z',
      },
      {
        id: 'bec-03',
        tenantId: tenant1.id,
        folio: 'BEC-2026-003',
        studentId: 'student-sof-01',
        studentName: 'Sofía Morales Rivas',
        studentCode: '2026-PRI-014',
        level: 'PRIMARIA',
        grade: '5º Primaria "A"',
        type: 'BECA_SEP_OBLIGATORIA',
        previousGpa: 9.4,
        monthlyFamilyIncomeMXN: 16500,
        dependentsCount: 3,
        requestedDiscountPercentage: 75,
        approvedDiscountPercentage: 75,
        standardTuitionMXN: 4200,
        finalTuitionMXN: 1050,
        status: 'APROBADA',
        submissionDate: '2026-08-24',
        resolutionDate: '2026-08-30',
        resolutionNotes: 'Beca oficial SEP otorgada conforme al Artículo 149 LGE. Estudio socioeconómico verificado por trabajadora social.',
        reviewerName: 'Comisión Mixta SEP-Colegio',
        documentsVerified: true,
        createdAt: '2026-08-24T09:15:00.000Z',
      },
      {
        id: 'bec-04',
        tenantId: tenant1.id,
        folio: 'BEC-2026-004',
        studentId: 'student-mat-01',
        studentName: 'Mateo Domínguez Ríos',
        studentCode: '2026-PRI-021',
        level: 'PRIMARIA',
        grade: '1º Primaria "A"',
        type: 'BECA_SOCIOECONOMICA',
        previousGpa: 8.9,
        monthlyFamilyIncomeMXN: 18000,
        dependentsCount: 2,
        requestedDiscountPercentage: 50,
        standardTuitionMXN: 4200,
        status: 'EN_REVISION',
        submissionDate: '2026-09-01',
        documentsVerified: true,
        createdAt: '2026-09-01T15:00:00.000Z',
      },
    ];
    this.scholarshipApplications.push(...initialScholarships);

    // 36. Dotaciones CONALITEG y Almacén Escolar
    const initialConaliteg: ConalitegPackageDTO[] = [
      {
        id: 'con-01',
        tenantId: tenant1.id,
        remesaFolio: 'REM-CONALITEG-2026-018',
        level: 'PRIMARIA',
        grade: '1º Primaria',
        includedBooks: [
          { code: 'BK-101', title: 'Múltiples Lenguajes 1º', field: 'MULTIPLES_LENGUAJES', editionYear: 2026 },
          { code: 'BK-102', title: 'Proyectos de Aula 1º', field: 'LENGUAJES', editionYear: 2026 },
          { code: 'BK-103', title: 'Proyectos Escolares 1º', field: 'DE_LO_HUMANO_COMUNITARIO', editionYear: 2026 },
          { code: 'BK-104', title: 'Proyectos Comunitarios 1º', field: 'ETICA_NATURALEZA_SOCIEDADES', editionYear: 2026 },
          { code: 'BK-105', title: 'Nuestros Saberes 1º', field: 'SABERES_PENSAMIENTO_CIENTIFICO', editionYear: 2026 },
          { code: 'BK-106', title: 'Trazos y Palabras 1º', field: 'LENGUAJES', editionYear: 2026 },
        ],
        receivedPackagesCount: 25,
        enrolledStudentsCount: 22,
        deliveredPackagesCount: 20,
        warehouseReserveCount: 5,
        status: 'EXCEDENTE_EN_RESGUARDO',
        receptionDate: '2026-08-15',
        zoneSupervisorOffice: 'Supervisión Escolar Sector 05 - Zona 14',
        createdAt: '2026-08-15T09:00:00.000Z',
      },
      {
        id: 'con-02',
        tenantId: tenant1.id,
        remesaFolio: 'REM-CONALITEG-2026-022',
        level: 'PRIMARIA',
        grade: '3º Primaria',
        includedBooks: [
          { code: 'BK-301', title: 'Múltiples Lenguajes 3º', field: 'MULTIPLES_LENGUAJES', editionYear: 2026 },
          { code: 'BK-302', title: 'Proyectos de Aula 3º', field: 'LENGUAJES', editionYear: 2026 },
          { code: 'BK-303', title: 'Proyectos Escolares 3º', field: 'DE_LO_HUMANO_COMUNITARIO', editionYear: 2026 },
          { code: 'BK-304', title: 'Proyectos Comunitarios 3º', field: 'ETICA_NATURALEZA_SOCIEDADES', editionYear: 2026 },
          { code: 'BK-305', title: 'Nuestros Saberes 3º', field: 'SABERES_PENSAMIENTO_CIENTIFICO', editionYear: 2026 },
        ],
        receivedPackagesCount: 20,
        enrolledStudentsCount: 20,
        deliveredPackagesCount: 19,
        warehouseReserveCount: 1,
        status: 'COMPLETA',
        receptionDate: '2026-08-15',
        zoneSupervisorOffice: 'Supervisión Escolar Sector 05 - Zona 14',
        createdAt: '2026-08-15T09:30:00.000Z',
      },
      {
        id: 'con-03',
        tenantId: tenant1.id,
        remesaFolio: 'REM-CONALITEG-2026-009',
        level: 'PREESCOLAR',
        grade: '2º Kínder',
        includedBooks: [
          { code: 'BK-K01', title: 'Juegos y Aprendizajes 2º Kínder', field: 'PREESCOLAR_DIDACTICO', editionYear: 2026 },
          { code: 'BK-K02', title: 'Láminas Didácticas de Diálogo', field: 'PREESCOLAR_DIDACTICO', editionYear: 2026 },
          { code: 'BK-K03', title: 'Libro de la Educadora Preescolar', field: 'PREESCOLAR_DIDACTICO', editionYear: 2026 },
        ],
        receivedPackagesCount: 15,
        enrolledStudentsCount: 14,
        deliveredPackagesCount: 14,
        warehouseReserveCount: 1,
        status: 'COMPLETA',
        receptionDate: '2026-08-12',
        zoneSupervisorOffice: 'Supervisión Escolar Preescolar Zona 08',
        createdAt: '2026-08-12T10:00:00.000Z',
      },
    ];
    this.conalitegPackages.push(...initialConaliteg);

    const initialReceipts: ConalitegDeliveryReceiptDTO[] = [
      {
        id: 'rec-01',
        tenantId: tenant1.id,
        folio: 'ACU-2026-001',
        packageId: 'con-01',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        level: 'PRIMARIA',
        grade: '1º Primaria "A"',
        parentName: 'Ing. Roberto Mendoza (Tutor APF)',
        parentPhone: '55 4321 8765',
        deliveryDate: '2026-08-26',
        titlesDelivered: [
          'Múltiples Lenguajes 1º',
          'Proyectos de Aula 1º',
          'Proyectos Escolares 1º',
          'Proyectos Comunitarios 1º',
          'Nuestros Saberes 1º',
          'Trazos y Palabras 1º',
        ],
        status: 'ENTREGADO_FIRMADO',
        notes: 'Acuse original con firma autógrafa resguardado en archivo de Control Escolar.',
        deliveredByStaff: 'Prof. Carlos Méndez - Docente Titular',
        createdAt: '2026-08-26T11:00:00.000Z',
      },
      {
        id: 'rec-02',
        tenantId: tenant1.id,
        folio: 'ACU-2026-002',
        packageId: 'con-02',
        studentId: 'student-sof-01',
        studentName: 'Sofía Morales Rivas',
        studentCode: '2026-PRI-014',
        level: 'PRIMARIA',
        grade: '5º Primaria "A"',
        parentName: 'Lic. Patricia Rivas',
        parentPhone: '55 9876 1122',
        deliveryDate: '2026-08-26',
        titlesDelivered: [
          'Múltiples Lenguajes 5º',
          'Proyectos de Aula 5º',
          'Proyectos Escolares 5º',
          'Proyectos Comunitarios 5º',
          'Nuestros Saberes 5º',
        ],
        status: 'ENTREGADO_FIRMADO',
        notes: 'Dotación completa recibida en buen estado.',
        deliveredByStaff: 'Dirección Técnica Primaria',
        createdAt: '2026-08-26T12:15:00.000Z',
      },
      {
        id: 'rec-03',
        tenantId: tenant1.id,
        folio: 'ACU-2026-003',
        packageId: 'con-03',
        studentId: 'student-emi-01',
        studentName: 'Emiliano Estrada Gómez',
        studentCode: '2026-KND-005',
        level: 'PREESCOLAR',
        grade: '2º Kínder "A"',
        parentName: 'Sra. Laura Gómez Estrada',
        parentPhone: '55 6677 8899',
        deliveryDate: '2026-08-27',
        titlesDelivered: [
          'Juegos y Aprendizajes 2º Kínder',
          'Láminas Didácticas de Diálogo',
        ],
        status: 'ENTREGADO_FIRMADO',
        notes: 'Material didáctico verificado por educadora titular.',
        deliveredByStaff: 'Mtra. Dulce María Santillán',
        createdAt: '2026-08-27T09:40:00.000Z',
      },
    ];
    this.conalitegDeliveryReceipts.push(...initialReceipts);

    const initialUniforms: SchoolUniformInventoryDTO[] = [
      {
        id: 'uni-01',
        tenantId: tenant1.id,
        sku: 'UNI-PRI-POLO-08',
        name: 'Playera Polo Institucional con Escudo Bordado',
        category: 'UNIFORME_DIARIO',
        level: 'PRIMARIA',
        size: 'TALLA_8',
        stockQuantity: 45,
        minStockAlert: 10,
        unitCostMXN: 140,
        salePriceMXN: 230,
        warehouseShelf: 'Estante A-1',
        supplierName: 'Confecciones Escolares de México S.A.',
        lastRestockDate: '2026-08-10',
        createdAt: '2026-08-10T10:00:00.000Z',
      },
      {
        id: 'uni-02',
        tenantId: tenant1.id,
        sku: 'UNI-PRI-PANT-08',
        name: 'Pantalón Escolar Marino Gabardina Alta Resistencia',
        category: 'UNIFORME_DIARIO',
        level: 'PRIMARIA',
        size: 'TALLA_8',
        stockQuantity: 32,
        minStockAlert: 8,
        unitCostMXN: 190,
        salePriceMXN: 310,
        warehouseShelf: 'Estante A-2',
        supplierName: 'Confecciones Escolares de México S.A.',
        lastRestockDate: '2026-08-10',
        createdAt: '2026-08-10T10:00:00.000Z',
      },
      {
        id: 'uni-03',
        tenantId: tenant1.id,
        sku: 'UNI-DEP-PANT-06',
        name: 'Pants Deportivo Escolar Completo con Chamarra Térmica',
        category: 'UNIFORME_DEPORTIVO',
        level: 'AMBOS',
        size: 'TALLA_6',
        stockQuantity: 28,
        minStockAlert: 10,
        unitCostMXN: 320,
        salePriceMXN: 480,
        warehouseShelf: 'Estante B-1',
        supplierName: 'Textiles Deportivos Hidalgo',
        lastRestockDate: '2026-08-12',
        createdAt: '2026-08-12T11:00:00.000Z',
      },
      {
        id: 'uni-04',
        tenantId: tenant1.id,
        sku: 'UNI-BAT-STEAM-10',
        name: 'Bata Blanca Algodón para Laboratorio STEAM y Arte',
        category: 'BATA_LABORATORIO_ARTE',
        level: 'PRIMARIA',
        size: 'TALLA_10',
        stockQuantity: 18,
        minStockAlert: 5,
        unitCostMXN: 120,
        salePriceMXN: 190,
        warehouseShelf: 'Estante C-1',
        supplierName: 'Uniformes Clínicos e Industriales',
        lastRestockDate: '2026-08-14',
        createdAt: '2026-08-14T12:00:00.000Z',
      },
      {
        id: 'uni-05',
        tenantId: tenant1.id,
        sku: 'MAT-DID-MOCH-U',
        name: 'Mochila Institucional Ergonómica con Refuerzo Lumbar',
        category: 'MATERIAL_DIDACTICO',
        level: 'AMBOS',
        size: 'UNITALLA',
        stockQuantity: 25,
        minStockAlert: 6,
        unitCostMXN: 260,
        salePriceMXN: 390,
        warehouseShelf: 'Estante D-3',
        supplierName: 'Mochilas & Accesorios Escolares',
        lastRestockDate: '2026-08-15',
        createdAt: '2026-08-15T13:00:00.000Z',
      },
    ];
    this.schoolUniforms.push(...initialUniforms);

    // 26. Certificados y Constancias Oficiales Digitales
    const initialCertificates: OfficialCertificateDTO[] = [
      {
        id: 'cert-01',
        folio: 'CE-2026-PRI-001',
        verificationToken: 'tok-ce-7f9a1b2c3d4e',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MER0150312HDFNR01',
        level: 'PRIMARIA',
        grade: '1º Primaria',
        groupName: '1º "A" Primaria',
        academicCycle: 'Ciclo Escolar 2026-2027',
        type: 'CONSTANCIA_ESTUDIOS_SIMPLE',
        issueDate: '2026-08-28',
        validUntil: '2026-11-26',
        status: 'EMITIDA',
        averageGrade: 9.3,
        issuedByDirector: 'Dra. Elena Vázquez Morales',
        directorCedula: 'CED-PROF-8923411',
        digitalSeal: '8f4a1c7b9e2d3f5a6b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a',
        notes: 'Constancia oficial de estudios emitida para trámites de seguridad social y seguro médico familiar.',
        downloadCount: 3,
        qrValidationUrl: '/verify/doc/tok-ce-7f9a1b2c3d4e',
        createdAt: '2026-08-28T10:00:00.000Z',
      },
      {
        id: 'cert-02',
        folio: 'CI-2026-PRI-014',
        verificationToken: 'tok-ci-8a1b2c3d4e5f',
        studentId: 'student-sof-01',
        studentName: 'Sofía Morales Rivas',
        studentCode: '2026-PRI-014',
        curp: 'MORS150720MDFRL02',
        level: 'PRIMARIA',
        grade: '5º Primaria',
        groupName: '5º "A" Primaria',
        academicCycle: 'Ciclo Escolar 2026-2027',
        type: 'CONSTANCIA_INSCRIPCION',
        issueDate: '2026-08-25',
        validUntil: '2026-11-23',
        status: 'EMITIDA',
        averageGrade: 9.8,
        issuedByDirector: 'Dra. Elena Vázquez Morales',
        directorCedula: 'CED-PROF-8923411',
        digitalSeal: '9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
        notes: 'Acreditación oficial de inscripción con promedio general para postulación a Beca de Excelencia.',
        downloadCount: 1,
        qrValidationUrl: '/verify/doc/tok-ci-8a1b2c3d4e5f',
        createdAt: '2026-08-25T11:30:00.000Z',
      },
      {
        id: 'cert-03',
        folio: 'CC-2026-KND-005',
        verificationToken: 'tok-cc-9b2c3d4e5f6a',
        studentId: 'student-emi-01',
        studentName: 'Emiliano Estrada Gómez',
        studentCode: '2026-KND-005',
        curp: 'ESGE180410HDFRN09',
        level: 'PREESCOLAR',
        grade: '2º Kínder',
        groupName: '2º "A" Preescolar',
        academicCycle: 'Ciclo Escolar 2026-2027',
        type: 'CONSTANCIA_BUENA_CONDUCTA',
        issueDate: '2026-08-26',
        validUntil: '2026-11-24',
        status: 'EMITIDA',
        issuedByDirector: 'Mtra. Dulce María Santillán',
        directorCedula: 'CED-PROF-9412085',
        digitalSeal: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        notes: 'Constancia de buena conducta, integración social armónica y participación en dinámicas pedagógicas.',
        downloadCount: 2,
        qrValidationUrl: '/verify/doc/tok-cc-9b2c3d4e5f6a',
        createdAt: '2026-08-26T14:15:00.000Z',
      },
      {
        id: 'cert-04',
        folio: 'KD-2026-PRI-001',
        verificationToken: 'tok-kd-4d5e6f7a8b9c',
        studentId: 'student-01',
        studentName: 'Carlos Mendoza Ruiz',
        studentCode: '2026-PRI-001',
        curp: 'MER0150312HDFNR01',
        level: 'PRIMARIA',
        grade: '1º Primaria',
        groupName: '1º "A" Primaria',
        academicCycle: 'Ciclo Escolar 2026-2027',
        type: 'KARDEX_HISTORICO',
        issueDate: '2026-08-30',
        validUntil: '2027-08-30',
        status: 'EMITIDA',
        averageGrade: 9.3,
        issuedByDirector: 'Dra. Elena Vázquez Morales',
        directorCedula: 'CED-PROF-8923411',
        digitalSeal: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
        notes: 'Kárdex y trayectoria de calificaciones para cotejo y transferencias interinstitucionales.',
        downloadCount: 4,
        qrValidationUrl: '/verify/doc/tok-kd-4d5e6f7a8b9c',
        createdAt: '2026-08-30T16:00:00.000Z',
      },
    ];
    this.officialCertificates.push(...initialCertificates);

    // 27. Auditoría Forense y Cumplimiento Normativo SEP
    const initialAuditLogs: AuditLogItemDTO[] = [
      {
        id: 'aud-01',
        folio: 'AUD-2026-SEP-001',
        timestamp: '2026-08-28T14:30:00.000Z',
        category: 'RECTIFICACION_CALIFICACIONES',
        severity: 'CRITICO',
        actionName: 'Rectificación Extemporánea de Calificación Bimestral',
        entityType: 'CALIFICACION_EVALUACION',
        entityId: 'grade-carlos-01',
        entityIdentifier: '2026-PRI-001',
        studentName: 'Carlos Mendoza Ruiz',
        performedByUserId: 'user-control-01',
        performedByName: 'Lic. Fernando Gómez',
        performedByRole: 'CONTROL_ESCOLAR',
        ipAddress: '192.168.1.45',
        previousValue: 'Evaluación Trimestral 1: 8.8 (Saberes y Pensamiento Científico)',
        newValue: 'Evaluación Trimestral 1: 9.4 (Saberes y Pensamiento Científico)',
        justificationReason: 'Revisión técnica de instrumento de evaluación colegiada acordada en Consejo Técnico Escolar.',
        officialAgreementRef: 'Acuerdo CTE Ordinario Sesión 2 - Punto 4.1',
        integrityHash: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
        verifiedTamperFree: true,
      },
      {
        id: 'aud-02',
        folio: 'AUD-2026-SEP-002',
        timestamp: '2026-08-25T11:15:00.000Z',
        category: 'MOVIMIENTO_MATRICULA',
        severity: 'INFO',
        actionName: 'Alta Formal de Alumno y Validación de CURP en RENAPO',
        entityType: 'EXPEDIENTE_ALUMNO',
        entityId: 'student-sof-01',
        entityIdentifier: 'MORS150720MDFRL02',
        studentName: 'Sofía Morales Rivas',
        performedByUserId: 'user-director-01',
        performedByName: 'Dra. María Elena Ramos',
        performedByRole: 'DIRECTOR',
        ipAddress: '192.168.1.10',
        previousValue: 'Aspirante en Proceso de Admisión',
        newValue: 'Inscripción Activa en 5º Primaria Grupo "A"',
        justificationReason: 'Presentación de expediente escolar completo, certificado de preescolar/primaria y traslado oficial.',
        officialAgreementRef: 'Oficio de Traslado Interinstitucional No. 09-TR-2026-44',
        integrityHash: 'b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01a',
        verifiedTamperFree: true,
      },
      {
        id: 'aud-03',
        folio: 'AUD-2026-SEP-003',
        timestamp: '2026-08-26T16:00:00.000Z',
        category: 'APLICACION_BECA_SEP',
        severity: 'AVISO',
        actionName: 'Otorgamiento de Beca SEP del 50% por Mandato Art. 149 LGE',
        entityType: 'EXPEDIENTE_BECA',
        entityId: 'sch-01',
        entityIdentifier: 'FOL-BECA-2026-001',
        studentName: 'Carlos Mendoza Ruiz',
        performedByUserId: 'user-director-01',
        performedByName: 'Dra. María Elena Ramos',
        performedByRole: 'DIRECTOR',
        ipAddress: '192.168.1.10',
        previousValue: 'Cuota Regular de Colegiatura: $4,500 MXN',
        newValue: 'Exención del 50%: Cuota Subsidiada $2,250 MXN (Beca SEP)',
        justificationReason: 'Dictamen favorable de Comité de Becas SEP según convocatoria pública obligatoria.',
        officialAgreementRef: 'Acta de Comité de Becas e Inclusiones SEP No. CBS-01-2026',
        integrityHash: 'c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01a2b',
        verifiedTamperFree: true,
      },
      {
        id: 'aud-04',
        folio: 'AUD-2026-SEP-004',
        timestamp: '2026-08-28T10:05:00.000Z',
        category: 'EMISION_DOCUMENTO_OFICIAL',
        severity: 'INFO',
        actionName: 'Generación y Sellado Criptográfico de Constancia de Estudios',
        entityType: 'CONSTANCIA_DIGITAL',
        entityId: 'cert-01',
        entityIdentifier: 'CE-2026-PRI-001',
        studentName: 'Carlos Mendoza Ruiz',
        performedByUserId: 'user-control-01',
        performedByName: 'Lic. Fernando Gómez',
        performedByRole: 'CONTROL_ESCOLAR',
        ipAddress: '192.168.1.45',
        previousValue: 'Sin Documento Emitido',
        newValue: 'Folio CE-2026-PRI-001 con QR de Verificación Activo',
        justificationReason: 'Solicitud expresa de tutor legal para trámites de seguridad social IMSS.',
        officialAgreementRef: 'Reglamento de Control Escolar SEP - Art. 38',
        integrityHash: 'd4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01a2b3c',
        verifiedTamperFree: true,
      },
      {
        id: 'aud-05',
        folio: 'AUD-2026-SEP-005',
        timestamp: '2026-08-27T09:20:00.000Z',
        category: 'CORRECCION_ASISTENCIA',
        severity: 'AVISO',
        actionName: 'Justificación Médica Oficial de Inasistencias Consecutivas',
        entityType: 'ASISTENCIA_DIARIA',
        entityId: 'att-emi-01',
        entityIdentifier: '2026-KND-005',
        studentName: 'Emiliano Estrada Gómez',
        performedByUserId: 'user-control-01',
        performedByName: 'Lic. Fernando Gómez',
        performedByRole: 'CONTROL_ESCOLAR',
        ipAddress: '192.168.1.45',
        previousValue: 'Faltas Injustificadas: 3 días continuos',
        newValue: 'Inasistencias Justificadas por Certificado Médico SSA',
        justificationReason: 'Cuadro respiratorio viral agudo con reposo prescrito de 72 hrs.',
        officialAgreementRef: 'Constancia Médica SSA-SSA-2026-9912 con Cédula No. 7812903',
        integrityHash: 'e5f67890123456789abcdef0123456789abcdef0123456789abcdef01a2b3c4d',
        verifiedTamperFree: true,
      },
    ];
    this.auditLogs.push(...initialAuditLogs);

    const initialSupervisionInspections: SupervisionInspectionDTO[] = [
      {
        id: 'insp-sep-01',
        officialNoticeNumber: 'OFICIO-SZ05-2026-089',
        supervisionZone: 'Sector 05 - Zona Escolar 14 (Primarias)',
        inspectorName: 'Profra. Martha Patricia Domínguez Serrano',
        inspectionDate: '2026-08-20',
        purpose: 'Visita de Inspección y Verificación Técnico-Administrativa de Apertura del Ciclo Escolar 2026-2027.',
        sampleAuditedCount: 45,
        complianceScorePercent: 98.7,
        status: 'CONFORME',
        findings: [
          'Matrícula total y expedientes físicos con CURP validada en RENAPO al 100%.',
          'Padrón de becas del 5% obligatorio asignado conforme a convocatoria pública.',
          'Paquetes de libros gratuitos CONALITEG entregados con acuse firmado de los tutores.',
          'Bitácora inmutable de calificaciones y expedientes clínicos resguardada digitalmente.',
        ],
        agreedActions: [
          'Mantener actualizado el registro forense digital ante cualquier rectificación extemporánea de evaluación trimestral.',
          'Presentar informe semestral del Consejo de Participación Escolar (CEPS) en noviembre 2026.',
        ],
        closureMinutesUrl: '/minutes/acta-sep-sz05-2026-089.pdf',
        closedAt: '2026-08-20T17:00:00.000Z',
        signedByInspector: true,
        signedByDirector: true,
      },
    ];
    this.supervisionInspections.push(...initialSupervisionInspections);
  }

  // --- BECAS INSTITUCIONALES Y EXENCIONES SEP (5% OBLIGATORIO) ---
  public getScholarshipApplications(tenantId: string): ScholarshipApplicationDTO[] {
    return this.scholarshipApplications.filter((s) => s.tenantId === tenantId);
  }

  public createScholarshipApplication(
    tenantId: string,
    req: CreateScholarshipApplicationRequestDTO
  ): ScholarshipApplicationDTO {
    const folio =
      req.folio ||
      `BEC-${new Date().getFullYear()}-${String(this.scholarshipApplications.length + 1).padStart(3, '0')}`;

    const standardTuition = req.standardTuitionMXN || (req.level === 'PREESCOLAR' ? 3800 : 4200);

    const newApp: ScholarshipApplicationDTO = {
      id: `bec-${Date.now()}`,
      tenantId,
      folio,
      studentId: req.studentId,
      studentName: req.studentName,
      studentCode: req.studentCode,
      level: req.level,
      grade: req.grade,
      type: req.type,
      previousGpa: req.previousGpa,
      monthlyFamilyIncomeMXN: req.monthlyFamilyIncomeMXN,
      dependentsCount: req.dependentsCount,
      requestedDiscountPercentage: req.requestedDiscountPercentage,
      standardTuitionMXN: standardTuition,
      status: 'EN_REVISION',
      submissionDate: new Date().toISOString().split('T')[0],
      documentsVerified: req.documentsVerified ?? true,
      createdAt: new Date().toISOString(),
    };

    this.scholarshipApplications.unshift(newApp);
    return newApp;
  }

  public evaluateScholarshipApplication(
    tenantId: string,
    id: string,
    req: EvaluateScholarshipApplicationRequestDTO
  ): ScholarshipApplicationDTO | null {
    const app = this.scholarshipApplications.find(
      (s) => s.id === id && s.tenantId === tenantId
    );
    if (!app) return null;

    app.status = req.status;
    app.approvedDiscountPercentage = req.approvedDiscountPercentage;
    app.resolutionNotes = req.resolutionNotes;
    app.reviewerName = req.reviewerName;
    app.resolutionDate = new Date().toISOString().split('T')[0];

    if (req.status === 'APROBADA' || req.status === 'CONDICIONADA') {
      const discount = req.approvedDiscountPercentage / 100;
      app.finalTuitionMXN = Math.round(app.standardTuitionMXN * (1 - discount));
    } else {
      app.finalTuitionMXN = app.standardTuitionMXN;
    }

    return app;
  }

  public getScholarshipCompliance(tenantId: string): ScholarshipComplianceDTO {
    const totalEnrolled = this.students.filter((s) => s.tenantId === tenantId).length || 30;
    const minRequired = Math.max(1, Math.ceil(totalEnrolled * 0.05));

    const apps = this.scholarshipApplications.filter((s) => s.tenantId === tenantId);
    const approved = apps.filter((s) => s.status === 'APROBADA');

    const fullEquivalent = approved.reduce(
      (acc, s) => acc + (s.approvedDiscountPercentage || 0) / 100,
      0
    );

    const totalSavings = approved.reduce(
      (acc, s) => acc + (s.standardTuitionMXN - (s.finalTuitionMXN || s.standardTuitionMXN)),
      0
    );

    const compliancePercentage = minRequired > 0 ? Math.round((fullEquivalent / minRequired) * 100) : 100;

    return {
      totalEnrolledStudents: totalEnrolled,
      minimumRequiredScholarshipsCount: minRequired,
      activeScholarshipsCount: approved.length,
      fullScholarshipEquivalentCount: Number(fullEquivalent.toFixed(2)),
      compliancePercentage,
      isSepCompliant: fullEquivalent >= minRequired,
      totalScholarshipSavingsMXN: totalSavings,
    };
  }

  // --- DOTACIONES CONALITEG Y ALMACÉN ESCOLAR ---
  public getConalitegPackages(tenantId: string): ConalitegPackageDTO[] {
    return this.conalitegPackages.filter((c) => c.tenantId === tenantId);
  }

  public createConalitegPackage(
    tenantId: string,
    req: CreateConalitegPackageRequestDTO
  ): ConalitegPackageDTO {
    const reserve = Math.max(0, req.receivedPackagesCount - req.enrolledStudentsCount);
    const status: ConalitegPackageStatus =
      req.receivedPackagesCount < req.enrolledStudentsCount
        ? 'DEFICIT_SOLICITADO'
        : reserve > 0
        ? 'EXCEDENTE_EN_RESGUARDO'
        : 'COMPLETA';

    const newPackage: ConalitegPackageDTO = {
      id: `con-${Date.now()}`,
      tenantId,
      remesaFolio: req.remesaFolio,
      level: req.level,
      grade: req.grade,
      includedBooks: req.includedBooks || [],
      receivedPackagesCount: req.receivedPackagesCount,
      enrolledStudentsCount: req.enrolledStudentsCount,
      deliveredPackagesCount: 0,
      warehouseReserveCount: reserve,
      status,
      receptionDate: req.receptionDate,
      zoneSupervisorOffice: req.zoneSupervisorOffice,
      createdAt: new Date().toISOString(),
    };

    this.conalitegPackages.unshift(newPackage);
    return newPackage;
  }

  public getConalitegReceipts(tenantId: string): ConalitegDeliveryReceiptDTO[] {
    return this.conalitegDeliveryReceipts.filter((r) => r.tenantId === tenantId);
  }

  public createConalitegReceipt(
    tenantId: string,
    req: CreateConalitegDeliveryReceiptDTO
  ): ConalitegDeliveryReceiptDTO {
    const folio =
      req.folio ||
      `ACU-${new Date().getFullYear()}-${String(this.conalitegDeliveryReceipts.length + 1).padStart(3, '0')}`;

    const newReceipt: ConalitegDeliveryReceiptDTO = {
      id: `rec-${Date.now()}`,
      tenantId,
      folio,
      packageId: req.packageId,
      studentId: req.studentId,
      studentName: req.studentName,
      studentCode: req.studentCode,
      level: req.level,
      grade: req.grade,
      parentName: req.parentName,
      parentPhone: req.parentPhone,
      deliveryDate: req.deliveryDate || new Date().toISOString().split('T')[0],
      titlesDelivered: req.titlesDelivered || [],
      status: req.status || 'ENTREGADO_FIRMADO',
      notes: req.notes,
      deliveredByStaff: req.deliveredByStaff,
      createdAt: new Date().toISOString(),
    };

    this.conalitegDeliveryReceipts.unshift(newReceipt);

    // Actualizar conteo de entrega en paquete
    const pkg = this.conalitegPackages.find((p) => p.id === req.packageId && p.tenantId === tenantId);
    if (pkg && req.status === 'ENTREGADO_FIRMADO') {
      pkg.deliveredPackagesCount = Math.min(pkg.receivedPackagesCount, pkg.deliveredPackagesCount + 1);
      pkg.warehouseReserveCount = Math.max(0, pkg.receivedPackagesCount - pkg.deliveredPackagesCount);
    }

    return newReceipt;
  }

  public getSchoolUniforms(tenantId: string): SchoolUniformInventoryDTO[] {
    return this.schoolUniforms.filter((u) => u.tenantId === tenantId);
  }

  public createSchoolUniformItem(
    tenantId: string,
    req: CreateSchoolUniformItemRequestDTO
  ): SchoolUniformInventoryDTO {
    const sku =
      req.sku ||
      `UNI-${req.level.slice(0, 3)}-${req.category.slice(0, 4)}-${Date.now().toString().slice(-4)}`;

    const newItem: SchoolUniformInventoryDTO = {
      id: `uni-${Date.now()}`,
      tenantId,
      sku,
      name: req.name,
      category: req.category,
      level: req.level,
      size: req.size,
      stockQuantity: req.stockQuantity,
      minStockAlert: req.minStockAlert,
      unitCostMXN: req.unitCostMXN,
      salePriceMXN: req.salePriceMXN,
      warehouseShelf: req.warehouseShelf,
      supplierName: req.supplierName,
      lastRestockDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    this.schoolUniforms.unshift(newItem);
    return newItem;
  }

  public updateSchoolUniformStock(
    tenantId: string,
    id: string,
    req: UpdateSchoolUniformStockRequestDTO
  ): SchoolUniformInventoryDTO | null {
    const item = this.schoolUniforms.find((u) => u.id === id && u.tenantId === tenantId);
    if (!item) return null;

    item.stockQuantity = Math.max(0, item.stockQuantity + req.deltaStock);
    if (req.deltaStock > 0) {
      item.lastRestockDate = new Date().toISOString().split('T')[0];
    }
    return item;
  }

  // --- CERTIFICACIÓN DIGITAL & KÁRDEX OFICIAL ---
  public getOfficialCertificates(
    tenantId: string,
    filters?: { studentId?: string; type?: CertificateType }
  ): OfficialCertificateDTO[] {
    let list = this.officialCertificates;
    if (filters?.studentId) {
      list = list.filter((c) => c.studentId === filters.studentId);
    }
    if (filters?.type) {
      list = list.filter((c) => c.type === filters.type);
    }
    return list;
  }

  public createOfficialCertificate(
    tenantId: string,
    req: CreateCertificateRequestDTO
  ): OfficialCertificateDTO {
    const randomHex = Math.random().toString(36).substring(2, 10);
    const token = `tok-${Date.now().toString(36)}-${randomHex}`;
    const typePrefix =
      req.type === 'CONSTANCIA_ESTUDIOS_SIMPLE'
        ? 'CE'
        : req.type === 'CONSTANCIA_INSCRIPCION'
        ? 'CI'
        : req.type === 'CONSTANCIA_BUENA_CONDUCTA'
        ? 'CC'
        : req.type === 'CONSTANCIA_PROMEDIO'
        ? 'CP'
        : 'KD';

    const year = new Date().getFullYear();
    const count = this.officialCertificates.length + 1;
    const folio = `${typePrefix}-${year}-${String(count).padStart(3, '0')}`;

    // Generar Sello Digital Criptográfico Simulado SHA-256
    const sealData = `${folio}|${req.studentCode}|${req.curp || ''}|${req.grade}|${new Date().toISOString()}`;
    let hash = 0;
    for (let i = 0; i < sealData.length; i++) {
      hash = (hash << 5) - hash + sealData.charCodeAt(i);
      hash |= 0;
    }
    const digitalSeal = Array.from({ length: 4 }, (_, idx) =>
      Math.abs((hash ^ (idx * 0x5bd1e995)) >>> 0).toString(16).padStart(8, '0')
    ).join('') + '9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c';

    const issueDate = new Date().toISOString().split('T')[0];
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 90); // 90 días de vigencia estándar
    const validUntil = expiry.toISOString().split('T')[0];

    const cert: OfficialCertificateDTO = {
      id: `cert-${Date.now()}`,
      folio,
      verificationToken: token,
      studentId: req.studentId,
      studentName: req.studentName,
      studentCode: req.studentCode,
      curp: req.curp || 'CURP-REGISTRADA-SEP',
      level: req.level,
      grade: req.grade,
      groupName: req.groupName || `${req.grade} Grupo A`,
      academicCycle: req.academicCycle || 'Ciclo Escolar 2026-2027',
      type: req.type,
      issueDate,
      validUntil,
      status: 'EMITIDA',
      averageGrade: req.averageGrade || 9.0,
      issuedByDirector: req.issuedByDirector || 'Dra. Elena Vázquez Morales',
      directorCedula: req.directorCedula || 'CED-PROF-8923411',
      digitalSeal,
      notes: req.notes || 'Documento oficial con certificación digital y código QR verificable en línea.',
      downloadCount: 0,
      qrValidationUrl: `/verify/doc/${token}`,
      createdAt: new Date().toISOString(),
    };

    this.officialCertificates.unshift(cert);
    return cert;
  }

  public revokeOfficialCertificate(
    tenantId: string,
    id: string,
    reason: string
  ): OfficialCertificateDTO | null {
    const cert = this.officialCertificates.find((c) => c.id === id);
    if (!cert) return null;

    cert.status = 'REVOCADA';
    cert.notes = `${cert.notes ? cert.notes + ' • ' : ''}REVOCADO: ${reason}`;
    return cert;
  }

  public getCertificateByToken(token: string): VerifyDocumentResponseDTO {
    const cert = this.officialCertificates.find((c) => c.verificationToken === token);
    const now = new Date().toISOString().split('T')[0];

    if (!cert) {
      return {
        isValid: false,
        reason: 'El documento no existe en el registro central o el código de verificación es inválido.',
        verifiedAt: new Date().toISOString(),
      };
    }

    if (cert.status === 'REVOCADA') {
      return {
        isValid: false,
        certificate: cert,
        reason: 'Este documento oficial fue REVOCADO por la Dirección del Plantel.',
        verifiedAt: new Date().toISOString(),
      };
    }

    if (cert.validUntil < now) {
      return {
        isValid: false,
        certificate: cert,
        reason: 'La vigencia de 90 días de este documento ha expirado. Favor de solicitar una reemisión.',
        verifiedAt: new Date().toISOString(),
      };
    }

    cert.downloadCount += 1;
    return {
      isValid: true,
      certificate: cert,
      verifiedAt: new Date().toISOString(),
    };
  }

  public getStudentKardex(tenantId: string, studentId: string): StudentKardexDTO | null {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) return null;

    const studentName = `${student.firstName} ${student.lastName}`;
    const token = `tok-kdx-${student.studentCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    return {
      studentId: student.id,
      studentName,
      studentCode: student.studentCode,
      curp: student.curp || 'MER0150312HDFNR01',
      level: 'PRIMARIA',
      currentGrade: '1º Primaria',
      admissionDate: '2026-08-15',
      cumulativeAverage: 9.3,
      cyclesHistory: [
        {
          cycleName: 'Ciclo Escolar 2025-2026',
          gradeLevel: '3º Kínder Preescolar',
          finalAverage: 9.6,
          status: 'PROMOVIDO',
          subjects: [
            { name: 'Lenguajes y Comunicación', field: 'LENGUAJES', finalGrade: 9.8 },
            { name: 'Pensamiento Matemático', field: 'SABERES_PENSAMIENTO_CIENTIFICO', finalGrade: 9.5 },
            { name: 'Exploración del Entorno', field: 'ETICA_NATURALEZA_SOCIEDADES', finalGrade: 9.6 },
            { name: 'Desarrollo Socioemocional', field: 'DE_LO_HUMANO_COMUNITARIO', finalGrade: 9.7 },
          ],
        },
        {
          cycleName: 'Ciclo Escolar 2026-2027',
          gradeLevel: '1º Primaria',
          finalAverage: 9.3,
          status: 'EN_CURSO',
          subjects: [
            { name: 'Lenguajes (Español y Artes)', field: 'LENGUAJES', finalGrade: 9.2 },
            { name: 'Saberes y Pensamiento Científico', field: 'SABERES_PENSAMIENTO_CIENTIFICO', finalGrade: 9.4 },
            { name: 'Ética, Naturaleza y Sociedades', field: 'ETICA_NATURALEZA_SOCIEDADES', finalGrade: 9.3 },
            { name: 'De lo Humano y lo Comunitario', field: 'DE_LO_HUMANO_COMUNITARIO', finalGrade: 9.5 },
            { name: 'Inglés Curricular Certificado', field: 'LENGUAJES', finalGrade: 9.1 },
          ],
        },
      ],
      officialRvoe: 'RVOE-SEP-2022-0498',
      cctSchoolCode: 'CCT: 09PPR1849X',
      digitalSeal: '4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
      verificationToken: token,
      lastUpdated: new Date().toISOString(),
    };
  }

  // --- AUDITORÍA FORENSE & CUMPLIMIENTO NORMATIVO SEP ---
  public getAuditLogs(
    tenantId: string,
    filters?: { category?: AuditEventCategory; severity?: AuditSeverity; studentCode?: string }
  ): AuditLogItemDTO[] {
    let list = this.auditLogs;
    if (filters?.category) {
      list = list.filter((a) => a.category === filters.category);
    }
    if (filters?.severity) {
      list = list.filter((a) => a.severity === filters.severity);
    }
    if (filters?.studentCode) {
      list = list.filter(
        (a) =>
          a.entityIdentifier.toLowerCase().includes(filters.studentCode!.toLowerCase()) ||
          a.studentName?.toLowerCase().includes(filters.studentCode!.toLowerCase())
      );
    }
    return list;
  }

  public createAuditLog(
    tenantId: string,
    req: CreateAuditLogRequestDTO,
    userId?: string,
    userName?: string,
    userRole?: string,
    ipAddress?: string
  ): AuditLogItemDTO {
    const year = new Date().getFullYear();
    const count = this.auditLogs.length + 1;
    const folio = `AUD-${year}-SEP-${String(count).padStart(3, '0')}`;
    const timestamp = new Date().toISOString();

    const previousHash =
      this.auditLogs.length > 0 ? this.auditLogs[0].integrityHash : 'GENESIS_INTEGRITY_BLOCK_SEP_2026';
    const rawData = `${folio}|${timestamp}|${req.category}|${req.severity}|${req.entityIdentifier}|${req.justificationReason}|${previousHash}`;

    let hash = 0;
    for (let i = 0; i < rawData.length; i++) {
      hash = (hash << 5) - hash + rawData.charCodeAt(i);
      hash |= 0;
    }
    const integrityHash =
      Array.from({ length: 4 }, (_, idx) =>
        Math.abs((hash ^ (idx * 0x5bd1e995)) >>> 0).toString(16).padStart(8, '0')
      ).join('') + '0123456789abcdef0123456789abcdef';

    const logItem: AuditLogItemDTO = {
      id: `aud-${Date.now()}`,
      folio,
      timestamp,
      category: req.category,
      severity: req.severity,
      actionName: req.actionName,
      entityType: req.entityType,
      entityId: req.entityId,
      entityIdentifier: req.entityIdentifier,
      studentName: req.studentName,
      performedByUserId: userId || 'user-director-01',
      performedByName: userName || req.performedByName || 'Dra. María Elena Ramos',
      performedByRole: userRole || req.performedByRole || 'DIRECTOR',
      ipAddress: ipAddress || '192.168.1.10',
      previousValue: req.previousValue,
      newValue: req.newValue,
      justificationReason: req.justificationReason,
      officialAgreementRef: req.officialAgreementRef,
      integrityHash,
      verifiedTamperFree: true,
    };

    this.auditLogs.unshift(logItem);
    return logItem;
  }

  public getSupervisionInspections(tenantId: string): SupervisionInspectionDTO[] {
    return this.supervisionInspections;
  }

  public createSupervisionInspection(
    tenantId: string,
    req: CreateSupervisionInspectionRequestDTO
  ): SupervisionInspectionDTO {
    const inspection: SupervisionInspectionDTO = {
      id: `insp-sep-${Date.now()}`,
      officialNoticeNumber: req.officialNoticeNumber,
      supervisionZone: req.supervisionZone,
      inspectorName: req.inspectorName,
      inspectionDate: req.inspectionDate,
      purpose: req.purpose,
      sampleAuditedCount: Number(req.sampleAuditedCount) || 30,
      complianceScorePercent: Number(req.complianceScorePercent) || 98.0,
      status: req.status,
      findings: req.findings || [],
      agreedActions: req.agreedActions || [],
      signedByInspector: true,
      signedByDirector: true,
      closedAt: new Date().toISOString(),
    };

    this.supervisionInspections.unshift(inspection);
    return inspection;
  }

  public getComplianceSummary(tenantId: string): ComplianceSummaryDTO {
    const totalLogs = this.auditLogs.length;
    const criticalEvents = this.auditLogs.filter(
      (a) => a.severity === 'CRITICO' || a.severity === 'ALERTA_NORMATIVA'
    ).length;

    const conforming = this.supervisionInspections.filter((i) => i.status === 'CONFORME').length;
    const pending = this.supervisionInspections.filter((i) => i.status === 'OBSERVACIONES_PENDIENTES').length;
    const lastDate = this.supervisionInspections[0]?.inspectionDate || '2026-08-20';

    return {
      overallComplianceScore: 99.2,
      rvoeStatus: 'VIGENTE_SEP_CDMX',
      cctSchoolCode: '09PPR1849X',
      totalAuditLogsCount: totalLogs,
      criticalEventsCount: criticalEvents,
      inspectionsSummary: {
        totalInspections: this.supervisionInspections.length,
        conformingCount: conforming,
        pendingCount: pending,
        lastInspectionDate: lastDate,
      },
      regulatoryChecklist: [
        {
          item: 'Incorporación Oficial RVOE',
          requirement: 'Acuerdo RVOE vigente por nivel educativo (Preescolar y Primaria)',
          isCompliant: true,
          evidenceRef: 'Acuerdo SEP-2022-0498 y CCT 09PPR1849X en orden',
        },
        {
          item: 'Resguardo de Expedientes con CURP',
          requirement: 'Validación al 100% de actas de nacimiento y CURP ante RENAPO',
          isCompliant: true,
          evidenceRef: '45 expedientes revisados en visita de supervisión ordinaria',
        },
        {
          item: 'Porcentaje Obligatorio de Becas SEP (5%)',
          requirement: 'Otorgamiento mínimo del 5% del total de matrícula según Art. 149 LGE',
          isCompliant: true,
          evidenceRef: 'Padrón de 14 becarios con acta de comité del 26 de agosto',
        },
        {
          item: 'Dotación Libros Gratuitos CONALITEG',
          requirement: 'Entrega oportuna de paquetes NEM con acuses firmados por tutores',
          isCompliant: true,
          evidenceRef: 'Remesa ciclo 2026-2027 recibida y distribuida con 100% acuses',
        },
        {
          item: 'Programa Interno de Protección Civil',
          requirement: 'Calendario de simulacros bimestrales y brigadas conformadas',
          isCompliant: true,
          evidenceRef: 'Simulacro nacional programado para 19 de septiembre',
        },
        {
          item: 'Trazabilidad Inmutable de Calificaciones',
          requirement: 'Justificación documentada en minuta CTE de cualquier corrección de notas',
          isCompliant: true,
          evidenceRef: 'Log inmutable SHA-256 activo con registro de actor, IP y folio',
        },
      ],
    };
  }

  // --- INFRAESTRUCTURA ESCOLAR Y MANTENIMIENTO PREVENTIVO ---
  public getFacilityInspections(tenantId: string): FacilityInspectionDTO[] {
    return this.facilityInspections.filter((i) => i.tenantId === tenantId);
  }

  public createFacilityInspection(
    tenantId: string,
    req: CreateFacilityInspectionRequestDTO
  ): FacilityInspectionDTO {
    const code =
      req.code ||
      `INSP-${new Date().getFullYear()}-${String(this.facilityInspections.length + 1).padStart(3, '0')}`;

    const newInspection: FacilityInspectionDTO = {
      id: `insp-${Date.now()}`,
      tenantId,
      code,
      title: req.title,
      systemType: req.systemType,
      frequency: req.frequency,
      inspectionDate: req.inspectionDate,
      inspectorName: req.inspectorName,
      verifiedItems: req.verifiedItems || [],
      overallStatus: req.overallStatus,
      nextScheduledDate: req.nextScheduledDate,
      evidenceNotes: req.evidenceNotes || '',
      createdAt: new Date().toISOString(),
    };

    this.facilityInspections.unshift(newInspection);
    return newInspection;
  }

  public getFacilityWorkOrders(tenantId: string): FacilityWorkOrderDTO[] {
    return this.facilityWorkOrders.filter((o) => o.tenantId === tenantId);
  }

  public createFacilityWorkOrder(
    tenantId: string,
    req: CreateFacilityWorkOrderRequestDTO
  ): FacilityWorkOrderDTO {
    const folio =
      req.folio ||
      `OT-MNT-${new Date().getFullYear()}-${String(this.facilityWorkOrders.length + 1).padStart(3, '0')}`;

    const totalCostMXN = (req.materialsCostMXN || 0) + (req.laborCostMXN || 0);

    const newOrder: FacilityWorkOrderDTO = {
      id: `ot-${Date.now()}`,
      tenantId,
      folio,
      systemType: req.systemType,
      areaLocation: req.areaLocation,
      title: req.title,
      description: req.description,
      priority: req.priority,
      assignedWorker: req.assignedWorker,
      materialsCostMXN: req.materialsCostMXN || 0,
      laborCostMXN: req.laborCostMXN || 0,
      totalCostMXN,
      reportedDate: new Date().toISOString().split('T')[0],
      targetCompletionDate: req.targetCompletionDate,
      status: 'PENDIENTE',
      approvedByDirector: true,
      createdAt: new Date().toISOString(),
    };

    this.facilityWorkOrders.unshift(newOrder);
    return newOrder;
  }

  public updateFacilityWorkOrderStatus(
    tenantId: string,
    id: string,
    req: UpdateFacilityWorkOrderStatusRequestDTO
  ): FacilityWorkOrderDTO | null {
    const order = this.facilityWorkOrders.find(
      (o) => o.id === id && o.tenantId === tenantId
    );
    if (!order) return null;

    order.status = req.status;
    if (req.completionNotes) {
      order.completionNotes = req.completionNotes;
    }
    if (req.actualCostMXN !== undefined) {
      order.totalCostMXN = req.actualCostMXN;
    }
    if (req.status === 'FINALIZADA_CON_VB') {
      order.completedDate = new Date().toISOString().split('T')[0];
    }
    return order;
  }

  // --- CONSEJO ESCOLAR DE PARTICIPACIÓN (CEPS) Y ASOCIACIÓN DE PADRES (APF) ---
  public getCepsCommittees(tenantId: string): CepsCommitteeDTO[] {
    return this.cepsCommittees.filter((c) => c.tenantId === tenantId);
  }

  public getApfBoardMembers(tenantId: string): ApfBoardMemberDTO[] {
    return this.apfBoardMembers.filter((m) => m.tenantId === tenantId);
  }

  public addApfBoardMember(
    tenantId: string,
    req: AddApfBoardMemberRequestDTO
  ): ApfBoardMemberDTO {
    const newMember: ApfBoardMemberDTO = {
      id: `apf-${Date.now()}`,
      tenantId,
      role: req.role,
      fullName: req.fullName,
      studentName: req.studentName,
      studentGrade: req.studentGrade,
      email: req.email,
      phone: req.phone,
      appointedDate: req.appointedDate || new Date().toISOString().split('T')[0],
    };

    this.apfBoardMembers.push(newMember);
    return newMember;
  }

  public getSchoolAssemblies(tenantId: string): SchoolAssemblyDTO[] {
    return this.schoolAssemblies.filter((a) => a.tenantId === tenantId);
  }

  public createSchoolAssembly(
    tenantId: string,
    req: CreateAssemblyRequestDTO
  ): SchoolAssemblyDTO {
    const code =
      req.code ||
      `ACT-APF-${new Date().getFullYear()}-${String(this.schoolAssemblies.length + 1).padStart(3, '0')}`;

    const newAssembly: SchoolAssemblyDTO = {
      id: `asemb-${Date.now()}`,
      tenantId,
      code,
      title: req.title,
      type: req.type,
      date: req.date,
      time: req.time,
      location: req.location,
      quorumCount: req.quorumCount || 0,
      agreements: req.agreements || [],
      status: req.status || 'CONVOCADA',
      signedByDirector: true,
      signedByApfPresident: true,
      createdAt: new Date().toISOString(),
    };

    this.schoolAssemblies.unshift(newAssembly);
    return newAssembly;
  }

  public recordAssemblyAgreement(
    tenantId: string,
    assemblyId: string,
    agreement: string
  ): SchoolAssemblyDTO | null {
    const assembly = this.schoolAssemblies.find(
      (a) => a.id === assemblyId && a.tenantId === tenantId
    );
    if (!assembly) return null;

    assembly.agreements.push(agreement);
    assembly.status = 'REALIZADA_CON_ACTA';
    return assembly;
  }

  // --- PROTECCIÓN CIVIL ESCOLAR Y SIMULACROS ---
  public getCivilProtectionDrills(tenantId: string): CivilProtectionDrillDTO[] {
    return this.civilProtectionDrills.filter((d) => d.tenantId === tenantId);
  }

  public createCivilProtectionDrill(
    tenantId: string,
    req: CreateDrillRequestDTO
  ): CivilProtectionDrillDTO {
    const code =
      req.code ||
      `SIM-${new Date().getFullYear()}-${String(this.civilProtectionDrills.length + 1).padStart(3, '0')}`;

    const participantsCount: DrillParticipantsCount = {
      students: req.participants.students || 0,
      teachers: req.participants.teachers || 0,
      staff: req.participants.staff || 0,
      visitors: req.participants.visitors || 0,
      total:
        (req.participants.students || 0) +
        (req.participants.teachers || 0) +
        (req.participants.staff || 0) +
        (req.participants.visitors || 0),
    };

    const newDrill: CivilProtectionDrillDTO = {
      id: `sim-${Date.now()}`,
      tenantId,
      code,
      title: req.title,
      drillType: req.drillType,
      date: req.date,
      time: req.time,
      hypothesis: req.hypothesis,
      evacuationTimeSeconds: req.evacuationTimeSeconds,
      participants: participantsCount,
      assemblyPoint: req.assemblyPoint,
      incidentsReported: req.incidentsReported || [],
      evaluation: req.evaluation,
      notes: req.notes,
      createdAt: new Date().toISOString(),
    };

    this.civilProtectionDrills.unshift(newDrill);
    return newDrill;
  }

  public getEmergencyBrigades(tenantId: string): EmergencyBrigadeDTO[] {
    return this.emergencyBrigades.filter((b) => b.tenantId === tenantId);
  }

  public addBrigadeMember(
    tenantId: string,
    brigadeId: string,
    member: AddBrigadeMemberRequestDTO
  ): BrigadeMemberDTO | null {
    const brigade = this.emergencyBrigades.find(
      (b) => b.id === brigadeId && b.tenantId === tenantId
    );
    if (!brigade) return null;

    const newMember: BrigadeMemberDTO = {
      id: `bm-${Date.now()}`,
      teacherId: member.teacherId,
      fullName: member.fullName,
      role: member.role,
      buildingZone: member.buildingZone,
      certified: member.certified ?? true,
    };

    brigade.members.push(newMember);
    return newMember;
  }

  public updateDrillEvaluation(
    tenantId: string,
    drillId: string,
    req: UpdateDrillEvaluationRequestDTO
  ): CivilProtectionDrillDTO | null {
    const drill = this.civilProtectionDrills.find(
      (d) => d.id === drillId && d.tenantId === tenantId
    );
    if (!drill) return null;

    drill.evaluation = req.evaluation;
    if (req.notes !== undefined) drill.notes = req.notes;
    if (req.incidentsReported) drill.incidentsReported = req.incidentsReported;

    return drill;
  }

  // --- RECLUTAMIENTO Y RECURSOS HUMANOS ESCOLARES ---
  public getJobVacancies(
    tenantId: string,
    status?: JobVacancyStatus
  ): JobVacancyDTO[] {
    return this.jobVacancies.filter((v) => {
      if (v.tenantId !== tenantId) return false;
      if (status && v.status !== status) return false;
      return true;
    });
  }

  public createJobVacancy(
    tenantId: string,
    req: CreateJobVacancyRequestDTO
  ): JobVacancyDTO {
    const code =
      req.code ||
      `VAC-${new Date().getFullYear()}-${String(this.jobVacancies.length + 1).padStart(3, '0')}`;

    const newVacancy: JobVacancyDTO = {
      id: `vac-${Date.now()}`,
      tenantId,
      code,
      title: req.title,
      department: req.department,
      type: req.type,
      description: req.description,
      requirements: req.requirements || [],
      salaryRangeMXN: req.salaryRangeMXN,
      applicationsCount: 0,
      publishDate: new Date().toISOString().split('T')[0],
      closingDate: req.closingDate,
      status: 'ABIERTA',
    };

    this.jobVacancies.push(newVacancy);
    return newVacancy;
  }

  public getTeacherCandidates(
    tenantId: string,
    vacancyId?: string,
    status?: CandidateHiringStatus
  ): TeacherCandidateDTO[] {
    return this.teacherCandidates.filter((c) => {
      if (c.tenantId !== tenantId) return false;
      if (vacancyId && c.vacancyId !== vacancyId) return false;
      if (status && c.status !== status) return false;
      return true;
    });
  }

  public createTeacherCandidate(
    tenantId: string,
    req: CreateTeacherCandidateRequestDTO
  ): TeacherCandidateDTO {
    const vacancy = this.jobVacancies.find((v) => v.id === req.vacancyId && v.tenantId === tenantId);
    const vacancyTitle = vacancy ? vacancy.title : 'Plaza Docente';
    if (vacancy) vacancy.applicationsCount += 1;

    const folio = `CAND-${new Date().getFullYear()}-${String(this.teacherCandidates.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const newCandidate: TeacherCandidateDTO = {
      id: `cand-${Date.now()}`,
      tenantId,
      folio,
      vacancyId: req.vacancyId,
      vacancyTitle,
      fullName: req.fullName,
      email: req.email,
      phone: req.phone,
      degree: req.degree,
      professionalLicense: req.professionalLicense,
      sepAccreditation: req.professionalLicense ? 'VALIDADA_DGP' : 'PENDIENTE_COTEJO',
      yearsOfExperience: req.yearsOfExperience || 0,
      resumeSummary: req.resumeSummary,
      status: 'POSTULADO',
      appliedDate: today,
      lastUpdatedDate: today,
    };

    this.teacherCandidates.push(newCandidate);
    return newCandidate;
  }

  public updateCandidateStatus(
    tenantId: string,
    candidateId: string,
    status: CandidateHiringStatus,
    interviewNotes?: string,
    pedagogicalDemoScore?: number,
    sepAccreditation?: SepAccreditationStatus
  ): TeacherCandidateDTO | null {
    const candidate = this.teacherCandidates.find((c) => c.id === candidateId && c.tenantId === tenantId);
    if (!candidate) return null;

    candidate.status = status;
    candidate.lastUpdatedDate = new Date().toISOString().split('T')[0];
    if (interviewNotes) candidate.interviewNotes = interviewNotes;
    if (pedagogicalDemoScore !== undefined) candidate.pedagogicalDemoScore = pedagogicalDemoScore;
    if (sepAccreditation) candidate.sepAccreditation = sepAccreditation;

    // Si es contratado, marcar la vacante como cubierta si aplica
    if (status === 'CONTRATADO') {
      const vacancy = this.jobVacancies.find((v) => v.id === candidate.vacancyId && v.tenantId === tenantId);
      if (vacancy) vacancy.status = 'CUBIERTA';
    }

    return candidate;
  }

  // --- CALENDARIO CÍVICO SEP, SESIONES CTE Y EVENTOS ---
  public getSchoolEvents(
    tenantId: string,
    type?: SchoolEventType,
    upcomingOnly?: boolean
  ): SchoolEventDTO[] {
    const today = new Date().toISOString().split('T')[0];
    return this.schoolEvents
      .filter((e) => {
        if (e.tenantId !== tenantId) return false;
        if (type && e.type !== type) return false;
        if (upcomingOnly && e.date < today && (!e.endDate || e.endDate < today)) return false;
        return true;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  public createSchoolEvent(
    tenantId: string,
    req: CreateSchoolEventRequestDTO
  ): SchoolEventDTO {
    const code =
      req.code ||
      `EVT-${new Date().getFullYear()}-${String(this.schoolEvents.length + 1).padStart(3, '0')}`;

    const newEvent: SchoolEventDTO = {
      id: `evt-${Date.now()}`,
      tenantId,
      code,
      title: req.title,
      description: req.description,
      type: req.type,
      date: req.date,
      endDate: req.endDate,
      time: req.time,
      location: req.location,
      classesSuspended: req.classesSuspended ?? false,
      audience: req.audience || 'TODA_LA_COMUNIDAD',
      commissions: (req.commissions || []).map((c, idx) => ({
        id: `com-${Date.now()}-${idx}`,
        teacherId: c.teacherId,
        teacherName: c.teacherName,
        role: c.role,
        status: c.status || 'PENDIENTE',
        notes: c.notes,
      })),
      cteAgenda: req.cteAgenda,
      status: 'PROGRAMADO',
    };

    this.schoolEvents.push(newEvent);
    return newEvent;
  }

  public assignTeacherCommission(
    tenantId: string,
    eventId: string,
    req: AssignTeacherCommissionRequestDTO
  ): TeacherEventCommissionDTO | null {
    const event = this.schoolEvents.find((e) => e.id === eventId && e.tenantId === tenantId);
    if (!event) return null;

    const commission: TeacherEventCommissionDTO = {
      id: `com-${Date.now()}`,
      teacherId: req.teacherId,
      teacherName: req.teacherName,
      role: req.role,
      status: 'PENDIENTE',
      notes: req.notes,
    };

    event.commissions.push(commission);
    return commission;
  }

  public updateCommissionStatus(
    tenantId: string,
    eventId: string,
    commissionId: string,
    status: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA',
    notes?: string
  ): TeacherEventCommissionDTO | null {
    const event = this.schoolEvents.find((e) => e.id === eventId && e.tenantId === tenantId);
    if (!event) return null;

    const commission = event.commissions.find((c) => c.id === commissionId);
    if (!commission) return null;

    commission.status = status;
    if (notes) commission.notes = notes;
    return commission;
  }

  public recordCteAgreements(
    tenantId: string,
    eventId: string,
    agreements: string[]
  ): SchoolEventDTO | null {
    const event = this.schoolEvents.find((e) => e.id === eventId && e.tenantId === tenantId);
    if (!event) return null;

    event.cteAgreements = agreements;
    return event;
  }

  // --- ENCUESTAS INSTITUCIONALES Y CLIMA ESCOLAR ---
  public getInstitutionalSurveys(
    tenantId: string,
    audience?: SurveyTargetAudience
  ): InstitutionalSurveyDTO[] {
    return this.institutionalSurveys.filter((s) => {
      if (s.tenantId !== tenantId) return false;
      if (audience && s.targetAudience !== audience) return false;
      return true;
    });
  }

  public createInstitutionalSurvey(
    tenantId: string,
    req: CreateInstitutionalSurveyRequestDTO
  ): InstitutionalSurveyDTO {
    const code =
      req.code ||
      `ENC-${new Date().getFullYear()}-${String(this.institutionalSurveys.length + 1).padStart(2, '0')}`;

    const newSurvey: InstitutionalSurveyDTO = {
      id: `srv-${Date.now()}`,
      tenantId,
      code,
      title: req.title,
      description: req.description,
      targetAudience: req.targetAudience,
      category: req.category,
      startDate: req.startDate || new Date().toISOString().split('T')[0],
      endDate: req.endDate,
      questions: req.questions.map((q, idx) => ({
        id: `q-${idx + 1}`,
        prompt: q.prompt,
        type: q.type,
        categoryDimension: q.categoryDimension,
      })),
      responsesCount: 0,
      status: 'ACTIVA',
    };

    this.institutionalSurveys.push(newSurvey);
    return newSurvey;
  }

  public submitSurveyResponse(
    tenantId: string,
    req: SubmitSurveyResponseRequestDTO
  ): SurveyResponseDTO {
    const survey = this.institutionalSurveys.find((s) => s.id === req.surveyId && s.tenantId === tenantId);

    const now = new Date();
    const submittedAt = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const response: SurveyResponseDTO = {
      id: `resp-${Date.now()}`,
      surveyId: req.surveyId,
      respondentId: req.isAnonymous ? undefined : req.respondentId,
      respondentRole: req.respondentRole,
      isAnonymous: !!req.isAnonymous,
      npsRating: req.npsRating,
      answers: req.answers,
      comments: req.comments,
      submittedAt,
    };

    this.surveyResponses.push(response);

    if (survey) {
      survey.responsesCount += 1;
      // Recalcular métricas si hay NPS
      const allSurveyResponses = this.surveyResponses.filter((r) => r.surveyId === survey.id);
      const npsResponses = allSurveyResponses.filter((r) => r.npsRating !== undefined);
      if (npsResponses.length > 0) {
        const promoters = npsResponses.filter((r) => r.npsRating! >= 9).length;
        const detractors = npsResponses.filter((r) => r.npsRating! <= 6).length;
        const nps = Math.round(((promoters - detractors) / npsResponses.length) * 100);
        survey.npsScore = nps;
      }
    }

    return response;
  }

  public getSurveyResponses(tenantId: string, surveyId: string): SurveyResponseDTO[] {
    const survey = this.institutionalSurveys.find((s) => s.id === surveyId && s.tenantId === tenantId);
    if (!survey) return [];
    return this.surveyResponses.filter((r) => r.surveyId === surveyId);
  }

  public getConfidentialSuggestions(
    tenantId: string,
    status?: SuggestionStatus
  ): ConfidentialSuggestionDTO[] {
    return this.confidentialSuggestions.filter((s) => {
      if (s.tenantId !== tenantId) return false;
      if (status && s.status !== status) return false;
      return true;
    });
  }

  public createConfidentialSuggestion(
    tenantId: string,
    req: CreateConfidentialSuggestionRequestDTO
  ): ConfidentialSuggestionDTO {
    const now = new Date();
    const submittedAt = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const folio = `BUZ-${now.getFullYear()}-${String(this.confidentialSuggestions.length + 1).padStart(3, '0')}`;

    const suggestion: ConfidentialSuggestionDTO = {
      id: `sug-${Date.now()}`,
      tenantId,
      folio,
      category: req.category,
      subject: req.subject,
      message: req.message,
      senderRole: req.senderRole,
      senderName: req.senderRole === 'ANONIMO' ? undefined : req.senderName,
      senderEmail: req.senderRole === 'ANONIMO' ? undefined : req.senderEmail,
      submittedAt,
      status: 'RECIBIDO',
    };

    this.confidentialSuggestions.push(suggestion);
    return suggestion;
  }

  public updateSuggestionStatus(
    tenantId: string,
    id: string,
    status: SuggestionStatus,
    directorResolutionNotes?: string,
    reviewedBy?: string
  ): ConfidentialSuggestionDTO | null {
    const suggestion = this.confidentialSuggestions.find((s) => s.id === id && s.tenantId === tenantId);
    if (!suggestion) return null;

    suggestion.status = status;
    if (directorResolutionNotes) suggestion.directorResolutionNotes = directorResolutionNotes;
    if (reviewedBy) suggestion.reviewedBy = reviewedBy;

    if (status === 'ATENDIDO' || status === 'EN_ACCION') {
      const now = new Date();
      suggestion.resolvedAt = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }

    return suggestion;
  }

  // --- INVENTARIO ESCOLAR Y ACTIVOS FIJOS ---
  public getSchoolAssets(tenantId: string, category?: AssetCategory): SchoolAssetDTO[] {
    return this.schoolAssets.filter((a) => {
      if (a.tenantId !== tenantId) return false;
      if (category && a.category !== category) return false;
      return true;
    });
  }

  public createSchoolAsset(tenantId: string, req: CreateSchoolAssetRequestDTO): SchoolAssetDTO {
    const assetTag =
      req.assetTag ||
      `ACT-${req.category.substring(0, 3).toUpperCase()}-${String(
        this.schoolAssets.length + 1
      ).padStart(3, '0')}`;

    const newAsset: SchoolAssetDTO = {
      id: `ast-${Date.now()}`,
      tenantId,
      assetTag,
      name: req.name,
      category: req.category,
      serialNumber: req.serialNumber,
      brandModel: req.brandModel,
      assignedLocation: req.assignedLocation,
      responsiblePerson: req.responsiblePerson,
      acquisitionDate: req.acquisitionDate || new Date().toISOString().split('T')[0],
      purchaseValueMXN: Number(req.purchaseValueMXN) || 0,
      condition: req.condition || 'BUENO',
      warrantyExpiry: req.warrantyExpiry,
      notes: req.notes,
    };

    this.schoolAssets.push(newAsset);
    return newAsset;
  }

  public updateSchoolAssetCondition(
    tenantId: string,
    id: string,
    condition: AssetCondition,
    notes?: string
  ): SchoolAssetDTO | null {
    const asset = this.schoolAssets.find((a) => a.id === id && a.tenantId === tenantId);
    if (!asset) return null;

    asset.condition = condition;
    if (notes) asset.notes = notes;
    return asset;
  }

  public getAssetMaintenanceTickets(
    tenantId: string,
    status?: MaintenanceTicketStatus
  ): AssetMaintenanceTicketDTO[] {
    return this.assetMaintenanceTickets.filter((t) => {
      if (t.tenantId !== tenantId) return false;
      if (status && t.status !== status) return false;
      return true;
    });
  }

  public createAssetMaintenanceTicket(
    tenantId: string,
    req: CreateAssetMaintenanceTicketRequestDTO
  ): AssetMaintenanceTicketDTO {
    const asset = this.schoolAssets.find((a) => a.id === req.assetId && a.tenantId === tenantId);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const ticketNumber = `MNT-2026-${String(this.assetMaintenanceTickets.length + 1).padStart(3, '0')}`;

    const ticket: AssetMaintenanceTicketDTO = {
      id: `tkt-${Date.now()}`,
      tenantId,
      ticketNumber,
      assetId: req.assetId,
      assetName: asset?.name || 'Activo Escolar',
      assetTag: asset?.assetTag || 'ACT-000',
      location: asset?.assignedLocation || 'Plantel General',
      title: req.title,
      description: req.description,
      priority: req.priority,
      reportedBy: req.reportedBy,
      assignedTo: req.assignedTo || 'Mantenimiento General',
      reportedAt: `${dateStr} ${timeStr}`,
      status: 'ABIERTO_REPORTADO',
    };

    this.assetMaintenanceTickets.push(ticket);

    // Actualizar condición del activo si se reporta avería
    if (asset && asset.condition === 'EXCELENTE') {
      asset.condition = 'REGULAR_REQUIERE_SERVICIO';
    }

    return ticket;
  }

  public updateMaintenanceTicketStatus(
    tenantId: string,
    id: string,
    status: MaintenanceTicketStatus,
    resolutionNotes?: string,
    costMXN?: number
  ): AssetMaintenanceTicketDTO | null {
    const ticket = this.assetMaintenanceTickets.find((t) => t.id === id && t.tenantId === tenantId);
    if (!ticket) return null;

    ticket.status = status;
    if (resolutionNotes) ticket.resolutionNotes = resolutionNotes;
    if (costMXN !== undefined) ticket.costMXN = costMXN;

    if (status === 'RESUELTO') {
      const now = new Date();
      ticket.resolvedAt = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      // Restaurar condición del activo
      const asset = this.schoolAssets.find((a) => a.id === ticket.assetId && a.tenantId === tenantId);
      if (asset) {
        asset.condition = 'BUENO';
      }
    }

    return ticket;
  }

  // --- TALLERES EXTRACURRICULARES Y ACADEMIAS ---
  public getExtracurricularWorkshops(
    tenantId: string,
    category?: WorkshopCategory
  ): ExtracurricularWorkshopDTO[] {
    return this.extracurricularWorkshops.filter((w) => {
      if (w.tenantId !== tenantId) return false;
      if (category && w.category !== category) return false;
      return true;
    });
  }

  public createExtracurricularWorkshop(
    tenantId: string,
    req: CreateExtracurricularWorkshopRequestDTO
  ): ExtracurricularWorkshopDTO {
    const newWorkshop: ExtracurricularWorkshopDTO = {
      id: `work-${Date.now()}`,
      tenantId,
      code: req.code,
      name: req.name,
      category: req.category,
      description: req.description,
      instructorName: req.instructorName,
      instructorPhone: req.instructorPhone,
      classroom: req.classroom,
      scheduleDays: req.scheduleDays,
      scheduleTime: req.scheduleTime,
      monthlyFeeMXN: req.monthlyFeeMXN,
      maxCapacity: req.maxCapacity,
      enrolledCount: 0,
      targetLevels: req.targetLevels,
      status: 'ACTIVO',
    };

    this.extracurricularWorkshops.push(newWorkshop);
    return newWorkshop;
  }

  public getWorkshopEnrollments(
    tenantId: string,
    workshopId?: string,
    studentId?: string
  ): WorkshopEnrollmentDTO[] {
    return this.workshopEnrollments.filter((e) => {
      if (e.tenantId !== tenantId) return false;
      if (workshopId && e.workshopId !== workshopId) return false;
      if (studentId && e.studentId !== studentId) return false;
      return true;
    });
  }

  public enrollStudentInWorkshop(
    tenantId: string,
    req: EnrollStudentInWorkshopRequestDTO
  ): { success: boolean; enrollment?: WorkshopEnrollmentDTO; error?: string } {
    const workshop = this.extracurricularWorkshops.find(
      (w) => w.id === req.workshopId && w.tenantId === tenantId
    );
    if (!workshop) {
      return { success: false, error: 'Taller extracurricular no encontrado.' };
    }

    if (workshop.status === 'CERRADO_CUPO_LLENO' || workshop.enrolledCount >= workshop.maxCapacity) {
      return { success: false, error: `Cupo agotado para el taller "${workshop.name}". Capacidad máxima: ${workshop.maxCapacity}.` };
    }

    const existingEnrollment = this.workshopEnrollments.find(
      (e) => e.workshopId === req.workshopId && e.studentId === req.studentId && e.status === 'ACTIVO'
    );
    if (existingEnrollment) {
      return { success: false, error: 'El alumno ya se encuentra inscrito en este taller.' };
    }

    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const newEnrollment: WorkshopEnrollmentDTO = {
      id: `wenr-${Date.now()}`,
      tenantId,
      workshopId: workshop.id,
      workshopName: workshop.name,
      workshopCode: workshop.code,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      studentCode: student?.studentCode || '2026-PRI-000',
      groupName: 'Primaria 1º "A"',
      enrollmentDate: new Date().toISOString().split('T')[0],
      monthlyFeeMXN: workshop.monthlyFeeMXN,
      parentAuthorization: true,
      status: 'ACTIVO',
    };

    this.workshopEnrollments.push(newEnrollment);
    workshop.enrolledCount += 1;
    if (workshop.enrolledCount >= workshop.maxCapacity) {
      workshop.status = 'CERRADO_CUPO_LLENO';
    }

    return { success: true, enrollment: newEnrollment };
  }

  public getWorkshopAttendanceLogs(
    tenantId: string,
    workshopId: string,
    date: string
  ): WorkshopAttendanceLogDTO[] {
    return this.workshopAttendanceLogs.filter(
      (l) => l.tenantId === tenantId && l.workshopId === workshopId && l.date === date
    );
  }

  public recordWorkshopAttendance(
    tenantId: string,
    req: RecordWorkshopAttendanceRequestDTO
  ): WorkshopAttendanceLogDTO {
    const existing = this.workshopAttendanceLogs.find(
      (l) =>
        l.tenantId === tenantId &&
        l.workshopId === req.workshopId &&
        l.studentId === req.studentId &&
        l.date === req.date
    );

    if (existing) {
      existing.status = req.status;
      if (req.notes) existing.notes = req.notes;
      return existing;
    }

    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const newLog: WorkshopAttendanceLogDTO = {
      id: `watt-${Date.now()}`,
      tenantId,
      workshopId: req.workshopId,
      date: req.date,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      status: req.status,
      notes: req.notes,
    };

    this.workshopAttendanceLogs.push(newLog);
    return newLog;
  }

  // --- ENFERMERÍA ESCOLAR Y EXPEDIENTE DE SALUD ---
  public getMedicalConsultations(
    tenantId: string,
    studentId?: string,
    date?: string
  ): MedicalConsultationDTO[] {
    return this.medicalConsultations
      .filter((c) => {
        if (c.tenantId !== tenantId) return false;
        if (studentId && c.studentId !== studentId) return false;
        if (date && c.date !== date) return false;
        return true;
      })
      .sort((a, b) => b.id.localeCompare(a.id));
  }

  public createMedicalConsultation(
    tenantId: string,
    req: CreateMedicalConsultationRequestDTO
  ): MedicalConsultationDTO {
    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = now.toISOString().split('T')[0];
    const folio = `ENF-2026-${String(this.medicalConsultations.length + 1).padStart(3, '0')}`;

    const newConsultation: MedicalConsultationDTO = {
      id: `enf-${Date.now()}`,
      tenantId,
      folio,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      studentCode: student?.studentCode || '2026-PRI-000',
      groupName: 'Primaria 1º "A"',
      date: dateStr,
      time: timeStr,
      reason: req.reason,
      severity: req.severity,
      symptomsDescription: req.symptomsDescription,
      vitalSigns: req.vitalSigns || { temperatureCelsius: 36.5 },
      treatmentGiven: req.treatmentGiven,
      nurseNotes: req.nurseNotes,
      nurseInCharge: req.nurseInCharge || 'Enfra. Rosaura Morales',
      parentNotified: true,
      parentNotifiedAt: `${dateStr} ${timeStr}`,
      requiresPickupByParent: req.requiresPickupByParent ?? false,
      status: req.requiresPickupByParent ? 'EN_OBSERVACION' : 'ALTA_A_CLASES',
    };

    this.medicalConsultations.unshift(newConsultation);
    return newConsultation;
  }

  public updateMedicalConsultationStatus(
    tenantId: string,
    consultationId: string,
    status: MedicalConsultationStatus,
    notes?: string
  ): MedicalConsultationDTO | null {
    const consultation = this.medicalConsultations.find((c) => c.id === consultationId && c.tenantId === tenantId);
    if (!consultation) return null;
    consultation.status = status;
    if (notes) consultation.nurseNotes = `${consultation.nurseNotes || ''} | ${notes}`;
    return consultation;
  }

  public getScheduledMedications(tenantId: string, studentId?: string): ScheduledMedicationDTO[] {
    return this.scheduledMedications.filter((m) => {
      if (m.tenantId !== tenantId) return false;
      if (studentId && m.studentId !== studentId) return false;
      return true;
    });
  }

  public createScheduledMedication(
    tenantId: string,
    req: CreateScheduledMedicationRequestDTO
  ): ScheduledMedicationDTO {
    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const newMedication: ScheduledMedicationDTO = {
      id: `med-${Date.now()}`,
      tenantId,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      studentCode: student?.studentCode || '2026-PRI-000',
      groupName: 'Primaria 1º "A"',
      medicationName: req.medicationName,
      dosage: req.dosage,
      scheduledTime: req.scheduledTime,
      startDate: req.startDate,
      endDate: req.endDate,
      prescriptionDoctorName: req.prescriptionDoctorName,
      doctorLicense: req.doctorLicense,
      parentAuthorizationSigned: true,
      parentName: req.parentName,
      administeredToday: false,
      status: 'ACTIVO',
    };

    this.scheduledMedications.push(newMedication);
    return newMedication;
  }

  public administerScheduledMedication(
    tenantId: string,
    medicationId: string,
    nurseNotes?: string
  ): { success: boolean; medication?: ScheduledMedicationDTO; error?: string } {
    const med = this.scheduledMedications.find((m) => m.id === medicationId && m.tenantId === tenantId);
    if (!med) return { success: false, error: 'Medicamento programado no encontrado' };

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = now.toISOString().split('T')[0];

    med.administeredToday = true;
    med.lastAdministeredAt = `${dateStr} ${timeStr}`;

    // Registrar también como atención en bitácora
    const folio = `ENF-2026-${String(this.medicalConsultations.length + 1).padStart(3, '0')}`;
    this.medicalConsultations.unshift({
      id: `enf-${Date.now()}`,
      tenantId,
      folio,
      studentId: med.studentId,
      studentName: med.studentName,
      studentCode: med.studentCode,
      groupName: med.groupName,
      date: dateStr,
      time: timeStr,
      reason: 'SUMINISTRO_MEDICAMENTO',
      severity: 'LEVE',
      symptomsDescription: `Administración programada bajo prescripción médica: ${med.medicationName} (${med.dosage}).`,
      vitalSigns: { temperatureCelsius: 36.6 },
      treatmentGiven: `Dosis de ${med.dosage} administrada conforme a receta del ${med.prescriptionDoctorName} (${med.doctorLicense}).`,
      nurseNotes: nurseNotes || 'Administración sin eventualidades. Alumno reincorporado a clases.',
      nurseInCharge: 'Enfra. Rosaura Morales',
      parentNotified: true,
      parentNotifiedAt: `${dateStr} ${timeStr}`,
      requiresPickupByParent: false,
      status: 'ALTA_A_CLASES',
    });

    return { success: true, medication: med };
  }

  public getFirstAidSupplies(tenantId: string): FirstAidSupplyDTO[] {
    return this.firstAidSupplies.filter((s) => s.tenantId === tenantId);
  }

  public updateFirstAidSupplyStock(
    tenantId: string,
    supplyId: string,
    quantityChange: number
  ): FirstAidSupplyDTO | null {
    const item = this.firstAidSupplies.find((s) => s.id === supplyId && s.tenantId === tenantId);
    if (!item) return null;
    item.stockQuantity = Math.max(0, item.stockQuantity + quantityChange);
    return item;
  }

  // --- CAFETERÍA ESCOLAR Y MONEDERO DIGITAL ---
  public getCafeteriaProducts(tenantId: string, category?: CafeteriaItemCategory): CafeteriaProductDTO[] {
    return this.cafeteriaProducts.filter((p) => {
      if (p.tenantId !== tenantId) return false;
      if (category && p.category !== category) return false;
      return true;
    });
  }

  public createCafeteriaProduct(tenantId: string, req: CreateCafeteriaProductRequestDTO): CafeteriaProductDTO {
    const newProduct: CafeteriaProductDTO = {
      id: `prod-${Date.now()}`,
      tenantId,
      name: req.name,
      category: req.category,
      priceMXN: req.priceMXN,
      caloriesKcal: req.caloriesKcal,
      ingredients: req.ingredients,
      allergens: req.allergens,
      isHealthySepApproved: req.isHealthySepApproved,
      stockQuantity: req.stockQuantity,
      available: req.stockQuantity > 0,
    };
    this.cafeteriaProducts.push(newProduct);
    return newProduct;
  }

  public getStudentWallets(tenantId: string): StudentWalletDTO[] {
    return this.studentWallets.filter((w) => w.tenantId === tenantId);
  }

  public getStudentWallet(tenantId: string, studentId: string): StudentWalletDTO {
    let wallet = this.studentWallets.find((w) => w.tenantId === tenantId && w.studentId === studentId);
    if (!wallet) {
      const student = this.students.find((s) => s.tenantId === tenantId && s.id === studentId);
      wallet = {
        id: `wallet-${Date.now()}`,
        tenantId,
        studentId,
        studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno Registrado',
        studentCode: student?.studentCode || '2026-PRI-000',
        groupName: 'Primaria 1º "A"',
        currentBalanceMXN: 0,
        dailySpendingLimitMXN: 50,
        spentTodayMXN: 0,
        allergies: student?.allergies && student.allergies !== 'Ninguna' && student.allergies !== 'Ninguna conocida' ? [student.allergies.toUpperCase()] : [],
        status: 'ACTIVO',
        updatedAt: new Date().toISOString().split('T')[0],
      };
      this.studentWallets.push(wallet);
    }
    return wallet;
  }

  public topUpStudentWallet(
    tenantId: string,
    studentId: string,
    req: TopUpStudentWalletRequestDTO
  ): { wallet: StudentWalletDTO; transaction: CafeteriaTransactionDTO } {
    const wallet = this.getStudentWallet(tenantId, studentId);
    const prev = wallet.currentBalanceMXN;
    wallet.currentBalanceMXN += req.amountMXN;
    wallet.updatedAt = new Date().toISOString().split('T')[0];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const count = this.cafeteriaTransactions.length + 1;
    const folio = `CAF-2026-${String(count).padStart(3, '0')}`;

    const tx: CafeteriaTransactionDTO = {
      id: `tx-${Date.now()}`,
      tenantId,
      folio,
      walletId: wallet.id,
      studentId: wallet.studentId,
      studentName: wallet.studentName,
      studentCode: wallet.studentCode,
      type: 'RECARGA_SALDO',
      amountMXN: req.amountMXN,
      previousBalanceMXN: prev,
      newBalanceMXN: wallet.currentBalanceMXN,
      date: new Date().toISOString().split('T')[0],
      time: timeStr,
      paymentMethod: req.paymentMethod,
      cashierNotes: req.notes || 'Recarga de saldo a monedero',
    };

    this.cafeteriaTransactions.push(tx);
    return { wallet, transaction: tx };
  }

  public updateWalletDailyLimit(tenantId: string, studentId: string, limit: number): StudentWalletDTO {
    const wallet = this.getStudentWallet(tenantId, studentId);
    wallet.dailySpendingLimitMXN = limit;
    wallet.updatedAt = new Date().toISOString().split('T')[0];
    return wallet;
  }

  public processCafeteriaSale(
    tenantId: string,
    req: ProcessCafeteriaSaleRequestDTO
  ): { transaction?: CafeteriaTransactionDTO; wallet?: StudentWalletDTO; error?: string } {
    const wallet = this.getStudentWallet(tenantId, req.studentId);
    if (wallet.status !== 'ACTIVO') {
      return { error: 'El monedero del alumno se encuentra suspendido o bloqueado.' };
    }

    // Validar productos y calcular total
    let totalAmount = 0;
    const purchaseItems: CafeteriaPurchaseItemDTO[] = [];

    for (const item of req.items) {
      const product = this.cafeteriaProducts.find((p) => p.id === item.productId && p.tenantId === tenantId);
      if (!product) {
        return { error: `Producto con ID ${item.productId} no encontrado.` };
      }
      if (product.stockQuantity < item.quantity) {
        return { error: `Stock insuficiente de "${product.name}". Disponibles: ${product.stockQuantity}` };
      }

      // 🛡️ REGLA CRÍTICA DE SALUD: FILTRO DE SEGURIDAD CONTRA ALERGIAS
      for (const allergen of product.allergens) {
        const studentHasAllergy = wallet.allergies.some(
          (a) => a.toUpperCase() === allergen.toUpperCase()
        );
        if (studentHasAllergy) {
          return {
            error: `⚠️ BLOQUEO DE SEGURIDAD ALIMENTARIA: El producto "${product.name}" contiene "${allergen}", un alérgeno de alto riesgo registrado en el expediente médico de ${wallet.studentName}.`,
          };
        }
      }

      const subtotal = product.priceMXN * item.quantity;
      totalAmount += subtotal;
      purchaseItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPriceMXN: product.priceMXN,
        subtotalMXN: subtotal,
      });
    }

    // 🛡️ REGLA: LÍMITE DIARIO DE GASTO
    if (wallet.dailySpendingLimitMXN > 0) {
      if (wallet.spentTodayMXN + totalAmount > wallet.dailySpendingLimitMXN) {
        const remaining = Math.max(0, wallet.dailySpendingLimitMXN - wallet.spentTodayMXN);
        return {
          error: `⚠️ Límite diario de gasto escolar excedido. Límite máximo: $${wallet.dailySpendingLimitMXN} MXN. Disponible hoy: $${remaining} MXN. Total de la compra: $${totalAmount} MXN.`,
        };
      }
    }

    // 🛡️ REGLA: SALDO SUFICIENTE
    if (wallet.currentBalanceMXN < totalAmount) {
      return {
        error: `Saldo insuficiente en el monedero digital. Saldo actual: $${wallet.currentBalanceMXN} MXN. Total requerido: $${totalAmount} MXN.`,
      };
    }

    // Descontar inventario
    for (const item of req.items) {
      const product = this.cafeteriaProducts.find((p) => p.id === item.productId)!;
      product.stockQuantity -= item.quantity;
      if (product.stockQuantity <= 0) {
        product.available = false;
      }
    }

    // Descontar saldo y registrar consumo
    const prevBalance = wallet.currentBalanceMXN;
    wallet.currentBalanceMXN -= totalAmount;
    wallet.spentTodayMXN += totalAmount;
    wallet.updatedAt = new Date().toISOString().split('T')[0];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const count = this.cafeteriaTransactions.length + 1;
    const folio = `CAF-2026-${String(count).padStart(3, '0')}`;

    const tx: CafeteriaTransactionDTO = {
      id: `tx-${Date.now()}`,
      tenantId,
      folio,
      walletId: wallet.id,
      studentId: wallet.studentId,
      studentName: wallet.studentName,
      studentCode: wallet.studentCode,
      type: 'CONSUMO',
      amountMXN: totalAmount,
      previousBalanceMXN: prevBalance,
      newBalanceMXN: wallet.currentBalanceMXN,
      items: purchaseItems,
      date: new Date().toISOString().split('T')[0],
      time: timeStr,
      cashierNotes: req.cashierNotes || 'Consumo escolar en cafetería',
    };

    this.cafeteriaTransactions.push(tx);
    return { transaction: tx, wallet };
  }

  public getCafeteriaTransactions(tenantId: string, studentId?: string): CafeteriaTransactionDTO[] {
    return this.cafeteriaTransactions
      .filter((t) => {
        if (t.tenantId !== tenantId) return false;
        if (studentId && t.studentId !== studentId) return false;
        return true;
      })
      .sort((a, b) => b.id.localeCompare(a.id));
  }

  // --- TRANSPORTE ESCOLAR Y RUTAS SEGURAS ---
  public getTransportRoutes(tenantId: string): TransportRouteDTO[] {
    return this.transportRoutes.filter((r) => r.tenantId === tenantId);
  }

  public createTransportRoute(
    tenantId: string,
    req: CreateTransportRouteRequestDTO
  ): TransportRouteDTO {
    const routeId = `route-${Date.now()}`;
    const vehicleId = `veh-${Date.now()}`;

    const vehicle: TransportVehicleDTO = {
      id: vehicleId,
      tenantId,
      plateNumber: req.vehiclePlate,
      model: req.vehicleModel,
      capacity: 20,
      insurancePolicy: 'Póliza Escolar Vigente (Cobertura Amplia)',
      driverName: req.driverName,
      driverPhone: req.driverPhone,
      driverLicense: 'LIC-MERC-ESTATAL',
      monitorName: req.monitorName,
      monitorPhone: req.driverPhone,
    };
    this.transportVehicles.push(vehicle);

    const stops: RouteStopDTO[] = req.stops.map((s, idx) => ({
      id: `stop-${Date.now()}-${idx + 1}`,
      name: s.name,
      scheduledTimeMorning: s.scheduledTimeMorning,
      scheduledTimeAfternoon: s.scheduledTimeAfternoon,
      address: s.address,
      orderIndex: idx + 1,
    }));

    const route: TransportRouteDTO = {
      id: routeId,
      tenantId,
      code: req.code,
      name: req.name,
      vehicleId,
      vehiclePlate: req.vehiclePlate,
      vehicleModel: req.vehicleModel,
      driverName: req.driverName,
      driverPhone: req.driverPhone,
      monitorName: req.monitorName,
      shift: req.shift,
      stops,
      enrolledStudentsCount: 0,
      active: true,
    };

    this.transportRoutes.push(route);
    return route;
  }

  public getTransportEnrollments(
    tenantId: string,
    routeId?: string,
    studentId?: string
  ): StudentTransportEnrollmentDTO[] {
    return this.transportEnrollments.filter((e) => {
      if (e.tenantId !== tenantId) return false;
      if (routeId && e.routeId !== routeId) return false;
      if (studentId && e.studentId !== studentId) return false;
      return true;
    });
  }

  public enrollStudentInTransport(
    tenantId: string,
    req: EnrollStudentInTransportRequestDTO
  ): { enrollment?: StudentTransportEnrollmentDTO; error?: string } {
    const route = this.transportRoutes.find((r) => r.id === req.routeId && r.tenantId === tenantId);
    if (!route) return { error: 'Ruta de transporte no encontrada' };

    const stop = route.stops.find((s) => s.id === req.stopId);
    if (!stop) return { error: 'Parada no encontrada en esta ruta' };

    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    if (!student) return { error: 'Alumno no encontrado' };

    const existing = this.transportEnrollments.find(
      (e) => e.studentId === req.studentId && e.routeId === req.routeId && e.tenantId === tenantId
    );
    if (existing) {
      return { error: 'El alumno ya se encuentra inscrito en esta ruta de transporte' };
    }

    const enrollment: StudentTransportEnrollmentDTO = {
      id: `enr-${Date.now()}`,
      tenantId,
      routeId: route.id,
      routeName: route.name,
      stopId: stop.id,
      stopName: stop.name,
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentCode: student.studentCode,
      groupName: 'Primaria 1º "A"',
      tutorName: 'Tutor Registrado',
      tutorPhone: '+52 55 1234 5678',
      shift: req.shift,
      emergencyNotes: req.emergencyNotes,
    };

    this.transportEnrollments.push(enrollment);
    route.enrolledStudentsCount += 1;

    return { enrollment };
  }

  public getDailyTransportBoardingLogs(
    tenantId: string,
    routeId?: string,
    date?: string,
    shift?: 'MATUTINO_RECOGIDA' | 'VESPERTINO_ENTREGA'
  ): DailyTransportBoardingLogDTO[] {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.transportBoardingLogs.filter((l) => {
      if (l.tenantId !== tenantId) return false;
      if (routeId && l.routeId !== routeId) return false;
      if (l.date !== targetDate) return false;
      if (shift && l.shift !== shift) return false;
      return true;
    });
  }

  public recordTransportBoarding(
    tenantId: string,
    req: RecordTransportBoardingRequestDTO
  ): DailyTransportBoardingLogDTO {
    const existingIndex = this.transportBoardingLogs.findIndex(
      (l) =>
        l.tenantId === tenantId &&
        l.routeId === req.routeId &&
        l.date === req.date &&
        l.shift === req.shift &&
        l.studentId === req.studentId
    );

    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const enrollment = this.transportEnrollments.find(
      (e) => e.studentId === req.studentId && e.routeId === req.routeId
    );

    if (existingIndex >= 0) {
      const existing = this.transportBoardingLogs[existingIndex];
      existing.status = req.status;
      if (req.checkInTime) existing.checkInTime = req.checkInTime;
      if (req.checkOutTime) existing.checkOutTime = req.checkOutTime;
      if (req.notes) existing.notes = req.notes;
      return existing;
    }

    const newLog: DailyTransportBoardingLogDTO = {
      id: `log-${Date.now()}`,
      tenantId,
      routeId: req.routeId,
      date: req.date,
      shift: req.shift,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      studentCode: student?.studentCode || '2026-PRI-000',
      stopName: enrollment?.stopName || 'Parada Principal',
      status: req.status,
      checkInTime: req.checkInTime,
      checkOutTime: req.checkOutTime,
      notes: req.notes,
    };

    this.transportBoardingLogs.push(newLog);
    return newLog;
  }

  // --- BIBLIOTECA ESCOLAR Y PRÉSTAMO DE LIBROS ---
  public getBooks(tenantId: string, category?: BookCategory, search?: string): SchoolBookDTO[] {
    return this.books.filter((b) => {
      if (b.tenantId !== tenantId) return false;
      if (category && b.category !== category) return false;
      if (search) {
        const query = search.toLowerCase();
        return (
          b.title.toLowerCase().includes(query) ||
          b.author.toLowerCase().includes(query) ||
          b.isbn.includes(query) ||
          b.shelfLocation.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }

  public createBook(tenantId: string, req: CreateBookRequestDTO): SchoolBookDTO {
    const book: SchoolBookDTO = {
      id: `book-${Date.now()}`,
      tenantId,
      isbn: req.isbn,
      title: req.title,
      author: req.author,
      publisher: req.publisher,
      yearPublished: req.yearPublished,
      category: req.category,
      targetLevel: req.targetLevel,
      shelfLocation: req.shelfLocation,
      totalCopies: req.totalCopies,
      availableCopies: req.totalCopies,
      summary: req.summary,
    };

    this.books.push(book);
    return book;
  }

  public getBookLoans(tenantId: string, studentId?: string, status?: BookLoanStatus): BookLoanDTO[] {
    return this.bookLoans.filter((l) => {
      if (l.tenantId !== tenantId) return false;
      if (studentId && l.studentId !== studentId) return false;
      if (status && l.status !== status) return false;
      return true;
    });
  }

  public createBookLoan(
    tenantId: string,
    req: CreateBookLoanRequestDTO
  ): { loan?: BookLoanDTO; error?: string } {
    const book = this.books.find((b) => b.id === req.bookId && b.tenantId === tenantId);
    if (!book) {
      return { error: 'Libro no encontrado en el catálogo' };
    }
    if (book.availableCopies <= 0) {
      return { error: `No hay ejemplares disponibles de '${book.title}'. Todos están prestados.` };
    }

    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    if (!student) {
      return { error: 'Alumno no encontrado en el sistema' };
    }

    // Comprobar si el alumno ya tiene préstamos vencidos
    const overdueLoans = this.bookLoans.filter(
      (l) => l.studentId === req.studentId && l.status === 'ACTIVO' && new Date(l.dueDate) < new Date()
    );
    if (overdueLoans.length > 0) {
      return {
        error: `El alumno ${student.firstName} ${student.lastName} tiene ${overdueLoans.length} libro(s) con fecha de entrega vencida. Debe devolverlos antes de solicitar otro.`,
      };
    }

    const count = this.bookLoans.filter((l) => l.tenantId === tenantId).length + 1;
    const folio = `PREST-2026-${String(count).padStart(3, '0')}`;

    const loan: BookLoanDTO = {
      id: `loan-${Date.now()}`,
      tenantId,
      folio,
      bookId: book.id,
      bookTitle: book.title,
      bookIsbn: book.isbn,
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentCode: student.studentCode,
      groupName: 'Primaria 1º "A"',
      loanDate: new Date().toISOString().split('T')[0],
      dueDate: req.dueDate,
      status: 'ACTIVO',
      loanType: req.loanType,
      librarianNotes: req.librarianNotes,
    };

    book.availableCopies -= 1;
    this.bookLoans.push(loan);

    return { loan };
  }

  public returnBookLoan(
    tenantId: string,
    loanId: string,
    req?: ReturnBookLoanRequestDTO
  ): BookLoanDTO | undefined {
    const loan = this.bookLoans.find((l) => l.id === loanId && l.tenantId === tenantId);
    if (!loan) return undefined;

    loan.status = 'DEVUELTO';
    loan.returnDate = new Date().toISOString().split('T')[0];
    if (req?.returnNotes) {
      loan.librarianNotes = loan.librarianNotes
        ? `${loan.librarianNotes} | Devolución: ${req.returnNotes}`
        : req.returnNotes;
    }

    const book = this.books.find((b) => b.id === loan.bookId && b.tenantId === tenantId);
    if (book && book.availableCopies < book.totalCopies) {
      book.availableCopies += 1;
    }

    return loan;
  }

  public checkStudentLibraryClearance(tenantId: string, studentId: string): StudentLibraryClearanceDTO | undefined {
    const student = this.students.find((s) => s.id === studentId && s.tenantId === tenantId);
    if (!student) return undefined;

    const activeLoans = this.bookLoans.filter((l) => l.studentId === studentId && l.status === 'ACTIVO');

    return {
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      studentCode: student.studentCode,
      isCleared: activeLoans.length === 0,
      activeLoansCount: activeLoans.length,
      pendingLoans: activeLoans,
    };
  }

  // --- ADMISIONES Y PREINSCRIPCIONES EN LÍNEA ---
  public getApplicants(tenantId: string, status?: AdmissionApplicantStatus, targetLevelId?: string): AdmissionApplicantDTO[] {
    return this.applicants.filter((a) => {
      if (a.tenantId !== tenantId) return false;
      if (status && a.status !== status) return false;
      if (targetLevelId && a.targetLevelId !== targetLevelId) return false;
      return true;
    });
  }

  public getApplicantByFolio(tenantId: string, folio: string): AdmissionApplicantDTO | undefined {
    return this.applicants.find((a) => a.tenantId === tenantId && a.folio.toUpperCase() === folio.toUpperCase());
  }

  public createApplicant(tenantId: string, req: CreateAdmissionApplicantRequestDTO): AdmissionApplicantDTO {
    const count = this.applicants.filter((a) => a.tenantId === tenantId).length + 1;
    const folio = `ADM-2026-${String(count).padStart(3, '0')}`;

    const defaultDocs: ApplicantDocumentDTO[] = [
      {
        id: `doc-${Date.now()}-1`,
        documentType: 'ACTA_NACIMIENTO',
        documentName: 'Acta de Nacimiento (Copia Certificada)',
        status: 'PENDIENTE',
      },
      {
        id: `doc-${Date.now()}-2`,
        documentType: 'CURP',
        documentName: 'CURP Certificada por RENAPO',
        status: 'PENDIENTE',
      },
      {
        id: `doc-${Date.now()}-3`,
        documentType: 'CARTILLA_VACUNACION',
        documentName: 'Cartilla Nacional de Salud / Vacunación',
        status: 'PENDIENTE',
      },
      {
        id: `doc-${Date.now()}-4`,
        documentType: 'COMPROBANTE_DOMICILIO',
        documentName: 'Comprobante de Domicilio Vigente',
        status: 'PENDIENTE',
      },
    ];

    const applicant: AdmissionApplicantDTO = {
      id: `app-${Date.now()}`,
      tenantId,
      folio,
      applicantFirstName: req.applicantFirstName,
      applicantLastName: req.applicantLastName,
      curp: req.curp.toUpperCase(),
      birthDate: req.birthDate,
      gender: req.gender,
      targetLevelId: req.targetLevelId,
      targetLevelName: req.targetLevelName,
      targetGrade: req.targetGrade,
      parentName: req.parentName,
      parentPhone: req.parentPhone,
      parentEmail: req.parentEmail,
      status: 'REGISTRADO',
      documents: defaultDocs,
      appliedAt: new Date().toISOString().split('T')[0],
      notes: req.notes,
    };

    this.applicants.push(applicant);
    return applicant;
  }

  public scheduleApplicantEvaluation(
    tenantId: string,
    applicantId: string,
    req: ScheduleApplicantEvaluationRequestDTO
  ): AdmissionApplicantDTO | undefined {
    const applicant = this.applicants.find((a) => a.id === applicantId && a.tenantId === tenantId);
    if (!applicant) return undefined;

    if (req.evaluationDate) applicant.evaluationDate = req.evaluationDate;
    if (req.evaluationNotes) applicant.evaluationNotes = req.evaluationNotes;
    if (req.interviewDate) applicant.interviewDate = req.interviewDate;
    if (req.interviewNotes) applicant.interviewNotes = req.interviewNotes;
    if (req.evaluationScore !== undefined) applicant.evaluationScore = req.evaluationScore;

    if (applicant.status === 'REGISTRADO' || applicant.status === 'DOCUMENTACION_EN_REVISION') {
      applicant.status = 'EVALUACION_AGENDADA';
    }

    return applicant;
  }

  public validateApplicantDocument(
    tenantId: string,
    applicantId: string,
    req: ValidateApplicantDocumentRequestDTO
  ): AdmissionApplicantDTO | undefined {
    const applicant = this.applicants.find((a) => a.id === applicantId && a.tenantId === tenantId);
    if (!applicant) return undefined;

    const doc = applicant.documents.find((d) => d.id === req.documentId);
    if (!doc) return undefined;

    doc.status = req.status;
    if (req.rejectionReason) doc.rejectionReason = req.rejectionReason;
    if (req.status === 'CARGADO' || req.status === 'VALIDADO') {
      doc.uploadedAt = new Date().toISOString();
    }

    const hasUploaded = applicant.documents.some((d) => d.status === 'CARGADO' || d.status === 'VALIDADO');
    if (applicant.status === 'REGISTRADO' && hasUploaded) {
      applicant.status = 'DOCUMENTACION_EN_REVISION';
    }

    return applicant;
  }

  public updateApplicantStatus(
    tenantId: string,
    applicantId: string,
    status: AdmissionApplicantStatus,
    notes?: string
  ): AdmissionApplicantDTO | undefined {
    const applicant = this.applicants.find((a) => a.id === applicantId && a.tenantId === tenantId);
    if (!applicant) return undefined;

    applicant.status = status;
    if (notes) applicant.notes = notes;
    return applicant;
  }

  public convertApplicantToStudent(
    tenantId: string,
    applicantId: string,
    req?: ConvertApplicantToStudentRequestDTO
  ): { applicant: AdmissionApplicantDTO; student: StudentDTO } | undefined {
    const applicant = this.applicants.find((a) => a.id === applicantId && a.tenantId === tenantId);
    if (!applicant) return undefined;

    const campus = this.campuses.find((c) => c.tenantId === tenantId);
    const campusId = campus?.id || 'campus-01';

    const year = new Date().getFullYear();
    const prefix = applicant.targetLevelId === 'PREESCOLAR' ? 'KIN' : 'PRI';
    const totalStudentsCount = this.students.filter((s) => s.tenantId === tenantId).length + 1;
    const studentCode = `${year}-${prefix}-${String(totalStudentsCount).padStart(3, '0')}`;

    const pendingDocs = applicant.documents.filter((d) => d.status !== 'VALIDADO');
    const isConditional = pendingDocs.length > 0;

    const student: StudentDTO = {
      id: `std-${Date.now()}`,
      tenantId,
      campusId,
      studentCode,
      firstName: applicant.applicantFirstName,
      lastName: applicant.applicantLastName,
      curp: applicant.curp,
      birthDate: new Date(applicant.birthDate),
      gender: applicant.gender,
      status: isConditional ? StudentStatus.INSCRITO_CONDICIONADO : StudentStatus.INSCRITO_ACTIVO,
      isConditional,
      conditionalDeadline: isConditional ? new Date('2026-10-31') : undefined,
      allergies: 'Ninguna reportada en ficha de admisión',
      bloodType: 'O+',
      emergencyNotes: isConditional
        ? `Inscripción condicionada por documentos pendientes: ${pendingDocs.map((d) => d.documentName).join(', ')}`
        : 'Documentación oficial completa al momento de inscripción',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.students.push(student);

    applicant.status = 'INSCRITO';
    applicant.convertedStudentId = student.id;

    return { applicant, student };
  }

  public getSchedule(tenantId: string, groupId?: string, teacherId?: string, dayOfWeek?: DayOfWeek): ClassScheduleSlotDTO[] {
    return this.scheduleSlots.filter((s) => {
      if (s.tenantId !== tenantId) return false;
      if (groupId && s.groupId !== groupId) return false;
      if (teacherId && s.teacherId !== teacherId) return false;
      if (dayOfWeek && s.dayOfWeek !== dayOfWeek) return false;
      return true;
    });
  }

  public validateScheduleConflict(
    tenantId: string,
    req: CreateScheduleSlotRequestDTO,
    excludeSlotId?: string
  ): ScheduleConflictValidationDTO {
    const timeOverlap = (startA: string, endA: string, startB: string, endB: string) => {
      return startA < endB && endA > startB;
    };

    const existingSlots = this.scheduleSlots.filter(
      (s) => s.tenantId === tenantId && s.dayOfWeek === req.dayOfWeek && s.id !== excludeSlotId
    );

    // 1. Validar colisión de docente (un profesor no puede estar en dos grupos a la vez)
    const teacherConflict = existingSlots.find(
      (s) => s.teacherId === req.teacherId && timeOverlap(s.startTime, s.endTime, req.startTime, req.endTime)
    );
    if (teacherConflict) {
      return {
        hasConflict: true,
        conflictType: 'TEACHER_COLLISION',
        conflictMessage: `El docente ${req.teacherName} ya tiene clase asignada con el grupo ${teacherConflict.groupName} el día ${req.dayOfWeek} de ${teacherConflict.startTime} a ${teacherConflict.endTime} hrs.`,
      };
    }

    // 2. Validar colisión de aula/instalación física
    const classroomConflict = existingSlots.find(
      (s) => s.classroom === req.classroom && timeOverlap(s.startTime, s.endTime, req.startTime, req.endTime)
    );
    if (classroomConflict) {
      return {
        hasConflict: true,
        conflictType: 'CLASSROOM_COLLISION',
        conflictMessage: `El espacio '${req.classroom}' ya está ocupado por el grupo ${classroomConflict.groupName} de ${classroomConflict.startTime} a ${classroomConflict.endTime} hrs.`,
      };
    }

    return { hasConflict: false };
  }

  public createScheduleSlot(
    tenantId: string,
    req: CreateScheduleSlotRequestDTO
  ): { slot?: ClassScheduleSlotDTO; conflict?: ScheduleConflictValidationDTO } {
    const conflict = this.validateScheduleConflict(tenantId, req);
    if (conflict.hasConflict) {
      return { conflict };
    }

    const slot: ClassScheduleSlotDTO = {
      id: `sch-${Date.now()}`,
      tenantId,
      groupId: req.groupId,
      groupName: req.groupName,
      dayOfWeek: req.dayOfWeek,
      startTime: req.startTime,
      endTime: req.endTime,
      subjectId: req.subjectId,
      subjectName: req.subjectName,
      teacherId: req.teacherId,
      teacherName: req.teacherName,
      classroom: req.classroom,
      facility: req.facility,
      colorHex: req.colorHex || '#3b82f6',
    };

    this.scheduleSlots.push(slot);
    return { slot };
  }

  public deleteScheduleSlot(tenantId: string, slotId: string): boolean {
    const index = this.scheduleSlots.findIndex((s) => s.id === slotId && s.tenantId === tenantId);
    if (index === -1) return false;
    this.scheduleSlots.splice(index, 1);
    return true;
  }

  public getAssignments(tenantId: string, groupId?: string, subjectId?: string, teacherId?: string): SchoolAssignmentDTO[] {
    return this.assignments.filter((a) => {
      if (a.tenantId !== tenantId) return false;
      if (groupId && a.groupId !== groupId) return false;
      if (subjectId && a.subjectId !== subjectId) return false;
      if (teacherId && a.teacherId !== teacherId) return false;
      return true;
    });
  }

  public createAssignment(tenantId: string, req: CreateAssignmentRequestDTO): SchoolAssignmentDTO {
    const count = this.assignments.filter((a) => a.tenantId === tenantId).length + 1;
    const prefix = req.type === 'PROYECTO' ? 'PRO' : req.type === 'LECTURA' ? 'LEC' : 'TAR';
    const folio = `${prefix}-2026-${String(count).padStart(3, '0')}`;

    const groupStudents = this.students.filter((s) => s.tenantId === tenantId);

    const assignment: SchoolAssignmentDTO = {
      id: `tar-${Date.now()}`,
      tenantId,
      folio,
      title: req.title,
      description: req.description,
      type: req.type,
      subjectId: req.subjectId,
      subjectName: req.subjectName,
      groupId: req.groupId,
      groupName: req.groupName,
      teacherId: req.teacherId,
      teacherName: req.teacherName,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: req.dueDate,
      allowExtempWithJustification: req.allowExtempWithJustification ?? true,
      extempExtendedDueDate: req.extempExtendedDueDate,
      totalStudents: groupStudents.length,
      submittedCount: 0,
      status: 'ACTIVA',
      maxScore: req.maxScore || 10,
      createdAt: new Date(),
    };

    this.assignments.unshift(assignment);

    for (const st of groupStudents) {
      const activeJust = this.justifications.find(
        (j) => j.tenantId === tenantId && j.studentId === st.id && j.status === 'APROBADO' && j.allowAssignmentMakeup
      );

      this.assignmentSubmissions.push({
        id: `subm-${Date.now()}-${st.id}`,
        tenantId,
        assignmentId: assignment.id,
        studentId: st.id,
        studentName: `${st.firstName} ${st.lastName}`,
        studentCode: st.studentCode,
        status: activeJust ? 'EXTEMPORANEO_JUSTIFICADO' : 'PENDIENTE',
        hasMedicalJustification: !!activeJust,
        justificationFolio: activeJust?.folio,
        submissionNotes: activeJust ? `Prórroga médica oficial por justificante ${activeJust.folio}` : undefined,
        isExtemporaneous: !!activeJust,
        updatedAt: new Date(),
      });
    }

    return assignment;
  }

  public getAssignmentSubmissions(tenantId: string, assignmentId: string): StudentAssignmentSubmissionDTO[] {
    return this.assignmentSubmissions.filter((s) => s.tenantId === tenantId && s.assignmentId === assignmentId);
  }

  public submitAssignment(
    tenantId: string,
    assignmentId: string,
    req: SubmitAssignmentRequestDTO
  ): StudentAssignmentSubmissionDTO | null {
    let sub = this.assignmentSubmissions.find(
      (s) => s.tenantId === tenantId && s.assignmentId === assignmentId && s.studentId === req.studentId
    );

    if (!sub) {
      const student = this.students.find((s) => s.id === req.studentId);
      if (!student) return null;
      sub = {
        id: `subm-${Date.now()}`,
        tenantId,
        assignmentId,
        studentId: req.studentId,
        studentName: `${student.firstName} ${student.lastName}`,
        studentCode: student.studentCode,
        status: 'ENTREGADO',
        hasMedicalJustification: false,
        submissionDate: new Date().toISOString().split('T')[0],
        submissionNotes: req.submissionNotes,
        isExtemporaneous: false,
        updatedAt: new Date(),
      };
      this.assignmentSubmissions.push(sub);
    } else {
      sub.status = 'ENTREGADO';
      sub.submissionDate = new Date().toISOString().split('T')[0];
      if (req.submissionNotes) sub.submissionNotes = req.submissionNotes;
      sub.updatedAt = new Date();
    }

    const assign = this.assignments.find((a) => a.id === assignmentId && a.tenantId === tenantId);
    if (assign) {
      assign.submittedCount = this.assignmentSubmissions.filter(
        (s) => s.assignmentId === assignmentId && (s.status === 'ENTREGADO' || s.status === 'CALIFICADO')
      ).length;
    }

    return sub;
  }

  public gradeSubmission(tenantId: string, req: GradeSubmissionRequestDTO): StudentAssignmentSubmissionDTO | null {
    const sub = this.assignmentSubmissions.find((s) => s.id === req.submissionId && s.tenantId === tenantId);
    if (!sub) return null;

    sub.score = req.score;
    sub.feedback = req.feedback;
    sub.status = 'CALIFICADO';
    sub.updatedAt = new Date();
    return sub;
  }

  public getCredentials(tenantId: string, personType?: string, personId?: string): SchoolCredentialDTO[] {
    return this.credentials.filter((c) => {
      if (c.tenantId !== tenantId) return false;
      if (personType && c.personType !== personType) return false;
      if (personId && c.personId !== personId) return false;
      return true;
    });
  }

  public generateCredentialForPerson(tenantId: string, personType: 'STUDENT' | 'TEACHER', personId: string): SchoolCredentialDTO {
    const existing = this.credentials.find((c) => c.tenantId === tenantId && c.personId === personId);
    if (existing) return existing;

    if (personType === 'STUDENT') {
      const student = this.students.find((s) => s.id === personId && s.tenantId === tenantId);
      const group = this.groups.find((g) => g.id === student?.currentGroupBaseId);
      const level = group?.level === EducationLevel.KINDER_PREESCOLAR ? 'Preescolar' : 'Primaria';
      const cct = level === 'Preescolar' ? '30PJN0145X' : '30PPR0289Z';

      const cred: SchoolCredentialDTO = {
        id: `crd-${Date.now()}`,
        tenantId,
        credentialCode: `CRD-2026-${student?.studentCode || 'STD'}`,
        personType: 'STUDENT',
        personId,
        fullName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
        curp: student?.curp,
        matriculaOrCode: student?.studentCode || '2026-PRI-000',
        roleOrGrade: group?.name || 'Primaria 1º "A"',
        levelName: level,
        cct,
        bloodType: student?.bloodType || 'O+',
        allergies: student?.allergies || 'Ninguna conocida',
        emergencyContactName: 'Tutor Titular',
        emergencyContactPhone: '921 123 4567',
        validThrough: 'Ciclo Escolar 2026-2027',
        qrPayload: `ASM|TENANT-01|${personId}|${student?.studentCode || 'STD'}|2026-2027`,
        status: 'ACTIVA',
        issueDate: new Date().toLocaleDateString('es-MX'),
      };
      this.credentials.unshift(cred);
      return cred;
    } else {
      const teacher = this.teachers.find((t) => t.id === personId && t.tenantId === tenantId);
      const cred: SchoolCredentialDTO = {
        id: `crd-${Date.now()}`,
        tenantId,
        credentialCode: `CRD-2026-DOC-${teacher?.id?.slice(-3) || '001'}`,
        personType: 'TEACHER',
        personId,
        fullName: teacher?.fullName || 'Docente',
        matriculaOrCode: `DOC-${teacher?.id?.slice(-3) || '001'}`,
        roleOrGrade: teacher?.assignedSubject || 'Docente Titular',
        levelName: 'Primaria',
        cct: '30PPR0289Z',
        bloodType: 'O+',
        allergies: 'Ninguna conocida',
        emergencyContactName: 'Contacto Personal',
        emergencyContactPhone: teacher?.phone || '921 123 4567',
        validThrough: 'Ciclo Escolar 2026-2027',
        qrPayload: `ASM|TENANT-01|${personId}|DOC-${teacher?.id?.slice(-3) || '001'}|2026-2027`,
        status: 'ACTIVA',
        issueDate: new Date().toLocaleDateString('es-MX'),
      };
      this.credentials.unshift(cred);
      return cred;
    }
  }

  public scanCredentialAccess(
    tenantId: string,
    req: ScanCredentialAccessRequestDTO
  ): { accessGranted: boolean; log: AccessLogDTO; personName: string; message: string } {
    const cred = this.credentials.find(
      (c) =>
        c.tenantId === tenantId &&
        (c.qrPayload === req.qrPayload || c.personId === req.qrPayload || c.credentialCode === req.qrPayload)
    );

    const direction = req.direction || 'ENTRADA';
    const scanPoint = req.scanPoint || 'PUERTA_PRINCIPAL';

    if (!cred || cred.status !== 'ACTIVA') {
      const failedLog: AccessLogDTO = {
        id: `log-${Date.now()}`,
        tenantId,
        personId: cred?.personId || 'UNKNOWN',
        personName: cred?.fullName || 'Código no reconocido',
        personType: cred?.personType || 'STUDENT',
        credentialCode: cred?.credentialCode || req.qrPayload,
        roleOrGrade: cred?.roleOrGrade || 'N/A',
        scanPoint,
        direction,
        timestamp: new Date(),
        accessGranted: false,
        notes: cred?.status === 'EXTRAVIADA' ? 'Credencial reportada como extraviada' : 'Código QR inválido o expirado',
      };
      this.accessLogs.unshift(failedLog);
      return {
        accessGranted: false,
        log: failedLog,
        personName: failedLog.personName,
        message: '⛔ ACCESO DENEGADO: ' + (failedLog.notes || 'Credencial no válida'),
      };
    }

    const log: AccessLogDTO = {
      id: `log-${Date.now()}`,
      tenantId,
      personId: cred.personId,
      personName: cred.fullName,
      personType: cred.personType,
      credentialCode: cred.credentialCode,
      roleOrGrade: cred.roleOrGrade,
      scanPoint,
      direction,
      timestamp: new Date(),
      accessGranted: true,
      notes: `${direction === 'ENTRADA' ? 'Ingreso registrado' : 'Salida registrada'} en ${scanPoint.replace('_', ' ')}`,
    };

    this.accessLogs.unshift(log);

    return {
      accessGranted: true,
      log,
      personName: cred.fullName,
      message: `✅ ACCESO CONCEDIDO: ${cred.fullName} (${cred.roleOrGrade}) • ${direction} confirmada`,
    };
  }

  public getAccessLogs(tenantId: string, limit: number = 50): AccessLogDTO[] {
    return this.accessLogs.filter((l) => l.tenantId === tenantId).slice(0, limit);
  }

  public createNotice(tenantId: string, req: CreateSchoolNoticeRequestDTO): SchoolNoticeDTO {
    const prefix =
      req.type === 'CIRCULAR_GENERAL'
        ? 'CIR'
        : req.type === 'CITATORIO_PADRES'
        ? 'CIT'
        : req.type === 'AVISO_URGENTE'
        ? 'AVI'
        : 'COM';
    const count = this.schoolNotices.filter((n) => n.tenantId === tenantId).length + 1;
    const folio = `${prefix}-2026-${String(count).padStart(3, '0')}`;

    let totalRecipients = 0;
    if (req.targetAudience === 'TODOS') {
      totalRecipients = this.students.filter((s) => s.tenantId === tenantId).length;
    } else if (req.targetAudience === 'GRUPO' && req.targetGroupId) {
      totalRecipients = this.students.filter(
        (s) => s.tenantId === tenantId && s.currentGroupBaseId === req.targetGroupId
      ).length;
    } else if (req.targetAudience === 'INDIVIDUAL') {
      totalRecipients = 1;
    } else {
      totalRecipients = this.students.filter((s) => s.tenantId === tenantId).length;
    }

    const newNotice: SchoolNoticeDTO = {
      id: `not-${Date.now()}`,
      tenantId,
      folio,
      title: req.title,
      content: req.content,
      type: req.type,
      priority: req.priority,
      targetAudience: req.targetAudience,
      targetLevelId: req.targetLevelId,
      targetGroupId: req.targetGroupId,
      targetGroupName: req.targetGroupName,
      targetStudentId: req.targetStudentId,
      targetStudentName: req.targetStudentName,
      appointmentDateTime: req.appointmentDateTime,
      appointmentLocation: req.appointmentLocation,
      publishedBy: req.publishedBy,
      publishDate: req.publishDate || new Date().toISOString().split('T')[0],
      requiresAcknowledgment: req.requiresAcknowledgment ?? false,
      acknowledgmentDeadline: req.acknowledgmentDeadline,
      totalRecipients: Math.max(1, totalRecipients),
      acknowledgedCount: 0,
      status: 'PUBLICADO',
      createdAt: new Date(),
    };

    this.schoolNotices.unshift(newNotice);
    return newNotice;
  }

  public getNotices(
    tenantId: string,
    filters?: {
      type?: string;
      studentId?: string;
      groupId?: string;
      levelId?: string;
    }
  ): SchoolNoticeDTO[] {
    return this.schoolNotices.filter((n) => {
      if (n.tenantId !== tenantId) return false;
      if (filters?.type && n.type !== filters.type) return false;
      if (filters?.studentId && n.targetAudience === 'INDIVIDUAL' && n.targetStudentId !== filters.studentId) {
        return false;
      }
      if (filters?.groupId && n.targetAudience === 'GRUPO' && n.targetGroupId !== filters.groupId) {
        return false;
      }
      return true;
    });
  }

  public acknowledgeNotice(
    tenantId: string,
    noticeId: string,
    req: AcknowledgeNoticeRequestDTO
  ): NoticeAcknowledgmentDTO | null {
    const notice = this.schoolNotices.find((n) => n.id === noticeId && n.tenantId === tenantId);
    if (!notice) return null;

    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const existing = this.noticeAcknowledgments.find(
      (a) => a.noticeId === noticeId && a.studentId === req.studentId && a.tenantId === tenantId
    );

    if (existing) {
      return existing;
    }

    const token = `ACK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const acknowledgment: NoticeAcknowledgmentDTO = {
      id: `ack-${Date.now()}`,
      tenantId,
      noticeId,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      tutorName: req.tutorName,
      digitalSignatureToken: token,
      acknowledgedAt: new Date(),
    };

    this.noticeAcknowledgments.push(acknowledgment);
    notice.acknowledgedCount = this.noticeAcknowledgments.filter((a) => a.noticeId === noticeId).length;

    return acknowledgment;
  }

  public getNoticeAcknowledgments(tenantId: string, noticeId: string): NoticeAcknowledgmentDTO[] {
    return this.noticeAcknowledgments.filter((a) => a.tenantId === tenantId && a.noticeId === noticeId);
  }

  public createJustification(tenantId: string, req: CreateAbsenceJustificationRequestDTO): AbsenceJustificationDTO {
    const student = this.students.find((s) => s.id === req.studentId && s.tenantId === tenantId);
    const group = this.groups.find((g) => g.id === student?.currentGroupBaseId);
    const count = this.justifications.length + 1;
    const folio = `JUST-2026-${String(count).padStart(3, '0')}`;

    const newJustification: AbsenceJustificationDTO = {
      id: `just-${Date.now()}-${req.studentId}`,
      tenantId,
      folio,
      studentId: req.studentId,
      studentName: student ? `${student.firstName} ${student.lastName}` : 'Alumno',
      studentCode: student?.studentCode || 'ASM-2026',
      groupId: student?.currentGroupBaseId || 'group-prim-1a',
      groupName: group?.name || 'Primaria 1º "A"',
      startDate: req.startDate,
      endDate: req.endDate,
      reasonCategory: req.reasonCategory,
      reasonDescription: req.reasonDescription,
      documentFolio: req.documentFolio,
      authorizedBy: req.authorizedBy,
      allowAssignmentMakeup: req.allowAssignmentMakeup ?? true,
      status: 'APROBADO',
      createdAt: new Date(),
    };

    this.justifications.unshift(newJustification);

    // Actualizar registros de asistencia en el rango de fechas para convertirlos en FALTA_JUSTIFICADA
    for (const att of this.attendanceRecords) {
      if (
        att.tenantId === tenantId &&
        att.studentId === req.studentId &&
        att.date >= req.startDate &&
        att.date <= req.endDate
      ) {
        att.status = AttendanceStatus.FALTA_JUSTIFICADA;
        att.notes = `Justificado oficialmente (Folio: ${folio}). ${req.reasonDescription}`;
      }
    }

    return newJustification;
  }

  public getJustifications(tenantId: string, studentId?: string, groupId?: string): AbsenceJustificationDTO[] {
    return this.justifications.filter((j) => {
      if (j.tenantId !== tenantId) return false;
      if (studentId && j.studentId !== studentId) return false;
      if (groupId && j.groupId !== groupId) return false;
      return true;
    });
  }

  public saveDailyAttendance(tenantId: string, req: SaveDailyAttendanceRequestDTO): DailyAttendanceRecordDTO[] {
    const group = this.groups.find((g) => g.id === req.groupId && g.tenantId === tenantId);
    const updatedRecords: DailyAttendanceRecordDTO[] = [];

    for (const item of req.records) {
      const student = this.students.find((s) => s.id === item.studentId && s.tenantId === tenantId);
      const studentName = student ? `${student.firstName} ${student.lastName}` : 'Alumno';
      const studentCode = student?.studentCode || 'ASM-2026';

      const existingIndex = this.attendanceRecords.findIndex(
        (a) =>
          a.tenantId === tenantId &&
          a.studentId === item.studentId &&
          a.date === req.date &&
          (a.groupId === req.groupId || a.subjectId === req.subjectId)
      );

      const record: DailyAttendanceRecordDTO = {
        id: existingIndex >= 0 ? this.attendanceRecords[existingIndex].id : `att-${Date.now()}-${item.studentId}`,
        tenantId,
        studentId: item.studentId,
        studentName,
        studentCode,
        groupId: req.groupId,
        groupName: group?.name || 'Grupo Escolar',
        subjectId: req.subjectId,
        date: req.date,
        status: item.status,
        recordedByTeacherId: req.teacherId,
        recordedByTeacherName: req.teacherName,
        notes: item.notes,
        createdAt: new Date(),
      };

      if (existingIndex >= 0) {
        this.attendanceRecords[existingIndex] = record;
      } else {
        this.attendanceRecords.push(record);
      }
      updatedRecords.push(record);

      // Si es falta, actualizar inasistencias en calificaciones para impactar la Boleta SEP
      if (item.status === AttendanceStatus.FALTA_INJUSTIFICADA || item.status === AttendanceStatus.FALTA_JUSTIFICADA) {
        const studentGrades = this.grades.filter((g) => g.tenantId === tenantId && g.studentId === item.studentId);
        for (const g of studentGrades) {
          g.period1Absences = (g.period1Absences || 0) + 1;
          g.updatedAt = new Date();
        }
      }
    }

    return updatedRecords;
  }

  public getDailyAttendance(tenantId: string, groupId?: string, date?: string, studentId?: string): DailyAttendanceRecordDTO[] {
    const targetDate = date || new Date().toISOString().split('T')[0];
    return this.attendanceRecords.filter((a) => {
      if (a.tenantId !== tenantId) return false;
      if (groupId && a.groupId !== groupId) return false;
      if (date && a.date !== targetDate) return false;
      if (studentId && a.studentId !== studentId) return false;
      return true;
    });
  }

  public getAttendanceStats(tenantId: string, groupId: string, date: string): DailyAttendanceStatsDTO {
    const records = this.getDailyAttendance(tenantId, groupId, date);
    const group = this.groups.find((g) => g.id === groupId && g.tenantId === tenantId);
    const studentsInGroup = this.students.filter((s) => s.currentGroupBaseId === groupId && s.tenantId === tenantId);
    const totalStudents = Math.max(studentsInGroup.length, records.length);

    let presentCount = 0;
    let lateCount = 0;
    let unexcusedAbsenceCount = 0;
    let excusedAbsenceCount = 0;

    for (const r of records) {
      if (r.status === AttendanceStatus.PRESENTE) presentCount++;
      else if (r.status === AttendanceStatus.RETARDO) lateCount++;
      else if (r.status === AttendanceStatus.FALTA_INJUSTIFICADA) unexcusedAbsenceCount++;
      else if (r.status === AttendanceStatus.FALTA_JUSTIFICADA) excusedAbsenceCount++;
    }

    const effectivePresent = presentCount + lateCount;
    const attendancePercentage = totalStudents > 0 ? Math.min(100, Number(((effectivePresent / totalStudents) * 100).toFixed(1))) : 100;

    return {
      date,
      groupId,
      groupName: group?.name || 'Grupo Escolar',
      totalStudents,
      presentCount,
      lateCount,
      unexcusedAbsenceCount,
      excusedAbsenceCount,
      attendancePercentage,
    };
  }

  public getStudentSepReportCard(tenantId: string, studentId: string): SepReportCardDTO | null {
    const student = this.students.find((s) => s.id === studentId && s.tenantId === tenantId);
    if (!student) return null;

    const tenant = this.tenants.find((t) => t.id === tenantId);
    const group = this.groups.find((g) => g.id === student.currentGroupBaseId);
    const cycle = this.cycles.find((c) => c.id === group?.cycleId) || this.cycles[0];

    const level = group?.level === EducationLevel.KINDER_PREESCOLAR ? 'PREESCOLAR' : 'PRIMARIA';
    const educationalLevel = this.educationalLevels.find((l) => l.tenantId === tenantId && l.id === level);

    const tenantSubjects = this.subjects
      .filter((s) => s.tenantId === tenantId && s.levelId === level)
      .sort((a, b) => a.orderIndex - b.orderIndex);

    const studentGrades = this.grades.filter((g) => g.studentId === studentId && g.tenantId === tenantId);

    const subjectsSummary = tenantSubjects.map((sub) => {
      const gradeRecord = studentGrades.find((g) => g.subjectId === sub.id);
      const p1 = gradeRecord?.period1 !== undefined ? gradeRecord.period1 : null;
      const p2 = gradeRecord?.period2 !== undefined ? gradeRecord.period2 : null;
      const p3 = gradeRecord?.period3 !== undefined ? gradeRecord.period3 : null;

      let finalG: number | null = null;
      const validPeriods = [p1, p2, p3].filter((p) => typeof p === 'number') as number[];
      if (validPeriods.length > 0) {
        finalG = Number((validPeriods.reduce((acc, curr) => acc + curr, 0) / validPeriods.length).toFixed(1));
      }

      const totalAbsences = (gradeRecord?.period1Absences || 0) + (gradeRecord?.period2Absences || 0) + (gradeRecord?.period3Absences || 0);
      const assignedTeacher = this.teachers.find((t) => t.tenantId === tenantId && (t.assignedSubject === sub.name || t.assignedGroup === group?.name));

      return {
        subjectId: sub.id,
        subjectName: sub.name,
        campoFormativo: sub.campoFormativo,
        teacherName: gradeRecord?.teacherName || assignedTeacher?.fullName || 'Profesor Titular Asignado',
        period1: p1,
        period2: p2,
        period3: p3,
        finalGrade: finalG,
        totalAbsences,
        observations: gradeRecord?.observations,
        qualitativeNotes: gradeRecord?.qualitativeNotes,
      };
    });

    const gradedSubjects = subjectsSummary.filter((s) => typeof s.finalGrade === 'number');
    const overallAverage = gradedSubjects.length > 0
      ? Number((gradedSubjects.reduce((acc, s) => acc + (s.finalGrade || 0), 0) / gradedSubjects.length).toFixed(1))
      : 0;

    const totalAbsences = subjectsSummary.reduce((acc, s) => acc + s.totalAbsences, 0);

    return {
      student: {
        id: student.id,
        studentCode: student.studentCode,
        fullName: `${student.firstName} ${student.lastName}`,
        curp: student.curp,
        groupName: group?.name || '1º "A"',
        gradeName: `${group?.gradeNumber || 1}º de ${level === 'PREESCOLAR' ? 'Preescolar' : 'Primaria'}`,
        levelName: level === 'PREESCOLAR' ? 'Preescolar / Jardín de Niños' : 'Primaria',
      },
      school: {
        name: tenant?.name || 'Colegio Miguel Hidalgo',
        subdomain: tenant?.subdomain || 'hidalgo',
        cctCode: educationalLevel?.cctCode || (level === 'PREESCOLAR' ? '30PJN0145X' : '30PPR0289Z'),
        cycleName: cycle?.name || 'Ciclo Escolar 2026-2027',
        shift: group?.shift || 'MATUTINO',
        directorName: educationalLevel?.directorName || 'Dirección Técnica Oficial',
        directorTitle: educationalLevel?.directorTitle || `Dirección de ${level === 'PREESCOLAR' ? 'Preescolar' : 'Primaria'}`,
      },
      subjects: subjectsSummary,
      overallAverage,
      totalAbsences,
      isAccredited: overallAverage >= 6.0,
      generatedAt: new Date(),
    };
  }

  public getCashRegisterSummary(tenantId: string, campusId?: string): CashRegisterSummaryDTO {
    const tenantPayments = this.payments.filter(
      (p) => p.tenantId === tenantId && p.status === PaymentStatus.APROBADO_CONFIRMADO
    );

    let totalCashInVault = 0;
    let totalBankTransfers = 0;
    let totalCodiBanxico = 0;
    let totalGatewayCards = 0;

    for (const p of tenantPayments) {
      if (p.method === PaymentMethod.EFECTIVO_VENTANILLA) {
        totalCashInVault += p.amount;
      } else if (p.method === PaymentMethod.CODI_BANXICO) {
        totalCodiBanxico += p.amount;
      } else if (
        p.method === PaymentMethod.SPEI_TRANSFERENCIA_ONLINE ||
        p.method === PaymentMethod.TRANSFERENCIA_VENTANILLA_MANUAL
      ) {
        totalBankTransfers += p.amount;
      } else if (
        p.method === PaymentMethod.TARJETA_CREDITO_DEBITO ||
        p.method === PaymentMethod.TPV_FISICA_VENTANILLA
      ) {
        totalGatewayCards += p.amount;
      }
    }

    const grandTotal = totalCashInVault + totalBankTransfers + totalCodiBanxico + totalGatewayCards;

    return {
      tenantId,
      campusId: campusId || 'all',
      date: new Date().toISOString().split('T')[0],
      totalCashInVault,
      totalBankTransfers,
      totalCodiBanxico,
      totalGatewayCards,
      grandTotal,
    };
  }

  public getSuperAdminSchoolsSummary(): SuperAdminSchoolSummaryDTO[] {
    return this.tenants.map((tenant) => {
      const campuses = this.campuses.filter((c) => c.tenantId === tenant.id);
      const students = this.students.filter((s) => s.tenantId === tenant.id);
      const users = this.users.filter((u) => u.tenantId === tenant.id);

      return {
        id: tenant.id,
        name: tenant.name,
        subdomain: tenant.subdomain,
        contactEmail: tenant.contactEmail,
        status: tenant.status,
        isEmailVerified: tenant.isEmailVerified,
        planTier: tenant.subscription?.planTier || SubscriptionPlanTier.FREE_TIER_LAUNCH,
        subscriptionStatus: tenant.subscription?.status || SubscriptionStatus.FREE,
        campusCount: campuses.length,
        studentCount: students.length,
        userCount: users.length,
        monthlyFeeMXN: tenant.subscription?.monthlyFeeMXN || 0,
        createdAt: tenant.createdAt,
      };
    });
  }
}

export const store = new MemoryStore();
