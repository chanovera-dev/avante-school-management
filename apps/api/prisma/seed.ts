import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando la siembra (seeding) de la base de datos PostgreSQL asm_db...');

  const defaultPasswordHash = bcrypt.hashSync('Admin123!', 10);

  // 1. Limpieza controlada de tablas principales
  await prisma.paymentTransaction.deleteMany();
  await prisma.charge.deleteMany();
  await prisma.dailyAttendanceRecord.deleteMany();
  await prisma.studentSubjectGrade.deleteMany();
  await prisma.student.deleteMany();
  await prisma.classScheduleSlot.deleteMany();
  await prisma.academicGroup.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.educationalLevel.deleteMany();
  await prisma.academicCycle.deleteMany();
  await prisma.user.deleteMany();
  await prisma.campus.deleteMany();
  await prisma.tenantSubscription.deleteMany();
  await prisma.tenant.deleteMany();

  // 2. Tenants Institucionales
  // A. Plataforma Master (SuperAdmin)
  const masterTenant = await prisma.tenant.create({
    data: {
      id: 'platform-master',
      name: 'Avante School Management (Plataforma Global)',
      subdomain: 'admin',
      legalBusinessName: 'Avante Technologies S.A.S.',
      contactEmail: 'superadmin@avanteschoolmanagement.com',
      contactPhone: '+52 55 0000 0000',
      timeZone: 'America/Mexico_City',
      currency: 'MXN',
      status: 'ACTIVO',
      isEmailVerified: true,
      subscription: {
        create: {
          id: 'sub-master',
          planTier: 'ENTERPRISE',
          status: 'ACTIVE_PAID',
          maxStudentsLimit: 999999,
          monthlyFeeMXN: 0,
          isFreeLaunchPromo: false,
        },
      },
    },
  });

  // B. Instituto Logos (Tenant Principal / Default)
  const logosTenant = await prisma.tenant.create({
    data: {
      id: 'tenant-logos-01',
      name: 'Instituto Logos',
      subdomain: 'institutologos',
      legalBusinessName: 'Instituto Logos de Coatzacoalcos S.C.',
      rfc: 'ILC100520AB3',
      contactEmail: 'institutologoscoatzacoalcos@gmail.com',
      contactPhone: '+52 921 123 4567',
      timeZone: 'America/Mexico_City',
      currency: 'MXN',
      gatewayFeePolicy: 'TRANSFERRED_TO_TUTOR',
      whatsappEnabled: true,
      status: 'ACTIVO',
      isEmailVerified: true,
      subscription: {
        create: {
          id: 'sub-logos-01',
          planTier: 'FREE_TIER_LAUNCH',
          status: 'FREE',
          maxStudentsLimit: 999999,
          monthlyFeeMXN: 0,
          isFreeLaunchPromo: true,
        },
      },
    },
  });

  // C. Colegio Miguel Hidalgo (Tenant de Referencia / Demostración)
  const hidalgoTenant = await prisma.tenant.create({
    data: {
      id: 'tenant-hidalgo-01',
      name: 'Colegio Miguel Hidalgo',
      subdomain: 'hidalgo',
      legalBusinessName: 'Institución Educativa Hidalgo S.C.',
      rfc: 'IEH920815AB1',
      contactEmail: 'contacto@colegiohidalgo.edu.mx',
      contactPhone: '+52 55 1234 5678',
      timeZone: 'America/Mexico_City',
      currency: 'MXN',
      gatewayFeePolicy: 'TRANSFERRED_TO_TUTOR',
      whatsappEnabled: true,
      status: 'ACTIVO',
      isEmailVerified: true,
      subscription: {
        create: {
          id: 'sub-hidalgo-01',
          planTier: 'FREE_TIER_LAUNCH',
          status: 'FREE',
          maxStudentsLimit: 999999,
          monthlyFeeMXN: 0,
          isFreeLaunchPromo: true,
        },
      },
    },
  });

  // 3. Campuses
  const logosCampus = await prisma.campus.create({
    data: {
      id: 'campus-logos-01',
      tenantId: logosTenant.id,
      name: 'Campus Coatzacoalcos Central',
      code: 'ILC-01',
      address: 'Av. Zaragoza 405, Centro, Coatzacoalcos, Ver.',
      phone: '+52 921 123 4567',
      levelsOffered: ['KINDER_PREESCOLAR', 'PRIMARIA', 'SECUNDARIA', 'PREPARATORIA'],
      isActive: true,
    },
  });

  const hidalgoCampus = await prisma.campus.create({
    data: {
      id: 'campus-central-01',
      tenantId: hidalgoTenant.id,
      name: 'Plantel Central Valle',
      code: 'PCV-01',
      address: 'Av. Universidad 1200, Col. del Valle, CDMX',
      phone: '+52 55 1234 5678',
      levelsOffered: ['KINDER_PREESCOLAR', 'PRIMARIA', 'SECUNDARIA', 'PREPARATORIA'],
      isActive: true,
    },
  });

  // 4. Usuarios por Rol
  await prisma.user.createMany({
    data: [
      // Super Admin
      {
        id: 'user-superadmin-01',
        tenantId: masterTenant.id,
        email: 'superadmin@avanteschoolmanagement.com',
        fullName: 'Super Administrador ASM (Dueño Plataforma)',
        role: 'SUPER_ADMIN',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      // Instituto Logos
      {
        id: 'user-director-logos',
        tenantId: logosTenant.id,
        campusId: logosCampus.id,
        email: 'contacto@chanovera.com',
        fullName: 'Prof. Cristiano Vera (Director Logos)',
        role: 'DIRECTOR',
        phone: '+52 921 987 6543',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      {
        id: 'user-control-logos',
        tenantId: logosTenant.id,
        campusId: logosCampus.id,
        email: 'control@institutologos.edu.mx',
        fullName: 'Lic. Patricia Morales (Control Escolar Logos)',
        role: 'CONTROL_ESCOLAR',
        phone: '+52 921 876 5432',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      {
        id: 'user-caja-logos',
        tenantId: logosTenant.id,
        campusId: logosCampus.id,
        email: 'caja@institutologos.edu.mx',
        fullName: 'C.P. Eduardo Ramírez (Finanzas Logos)',
        role: 'FINANCIERO_CAJA',
        phone: '+52 921 765 4321',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      // Colegio Hidalgo
      {
        id: 'user-director-01',
        tenantId: hidalgoTenant.id,
        campusId: hidalgoCampus.id,
        email: 'director@colegiohidalgo.edu.mx',
        fullName: 'Dra. María Elena Ramos (Directora)',
        role: 'DIRECTOR',
        phone: '+52 55 9876 5432',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      {
        id: 'user-control-01',
        tenantId: hidalgoTenant.id,
        campusId: hidalgoCampus.id,
        email: 'control@colegiohidalgo.edu.mx',
        fullName: 'Lic. Fernando Gómez (Control Escolar)',
        role: 'CONTROL_ESCOLAR',
        phone: '+52 55 8765 4321',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      {
        id: 'user-caja-01',
        tenantId: hidalgoTenant.id,
        campusId: hidalgoCampus.id,
        email: 'caja@colegiohidalgo.edu.mx',
        fullName: 'C.P. Claudia Mendoza (Finanzas & Caja)',
        role: 'FINANCIERO_CAJA',
        phone: '+52 55 7654 3210',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      {
        id: 'user-docente-01',
        tenantId: hidalgoTenant.id,
        campusId: hidalgoCampus.id,
        email: 'docente@colegiohidalgo.edu.mx',
        fullName: 'Prof. Roberto Salazar',
        role: 'DOCENTE',
        phone: '+52 55 7654 0000',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
      {
        id: 'user-tutor-01',
        tenantId: hidalgoTenant.id,
        email: 'padre@familia.com',
        fullName: 'Ing. Carlos Mendoza (Tutor Titular)',
        role: 'TUTOR',
        phone: '+52 55 6543 2109',
        isEmailVerified: true,
        isActive: true,
        passwordHash: defaultPasswordHash,
      },
    ],
  });

  // 5. Niveles Educativos (para Hidalgo y Logos)
  for (const t of [logosTenant, hidalgoTenant]) {
    await prisma.educationalLevel.createMany({
      data: [
        {
          id: `level-kin-${t.subdomain}`,
          tenantId: t.id,
          level: 'KINDER_PREESCOLAR',
          name: 'Kínder / Preescolar',
          code: 'KIN-01',
          evaluationScale: 'QUALITATIVE_RUBRIC',
          minPassingGrade: 6.0,
          directorName: 'Lic. Laura Méndez',
          directorEmail: `kinder@${t.subdomain}.edu.mx`,
          isDirectorVerified: true,
        },
        {
          id: `level-prim-${t.subdomain}`,
          tenantId: t.id,
          level: 'PRIMARIA',
          name: 'Primaria General',
          code: 'PRI-01',
          evaluationScale: 'NUMERIC_SEP',
          minPassingGrade: 6.0,
          directorName: 'Prof. Alejandro Vega',
          directorEmail: `primaria@${t.subdomain}.edu.mx`,
          isDirectorVerified: true,
        },
        {
          id: `level-sec-${t.subdomain}`,
          tenantId: t.id,
          level: 'SECUNDARIA',
          name: 'Secundaria Técnica',
          code: 'SEC-01',
          evaluationScale: 'NUMERIC_SEP',
          minPassingGrade: 6.0,
          directorName: 'Mtro. Héctor Cordero',
          directorEmail: `secundaria@${t.subdomain}.edu.mx`,
          isDirectorVerified: true,
        },
        {
          id: `level-prep-${t.subdomain}`,
          tenantId: t.id,
          level: 'PREPARATORIA',
          name: 'Bachillerato General',
          code: 'PREP-01',
          evaluationScale: 'NUMERIC_SEP',
          minPassingGrade: 6.0,
          directorName: 'Dra. María Elena Ramos',
          directorEmail: `bachillerato@${t.subdomain}.edu.mx`,
          isDirectorVerified: true,
        },
      ],
    });
  }

  // 6. Ciclo Escolar 2026-2027
  const cycleLogos = await prisma.academicCycle.create({
    data: {
      id: 'cycle-logos-2026-2027',
      tenantId: logosTenant.id,
      campusId: logosCampus.id,
      name: 'Ciclo Escolar 2026-2027',
      startDate: new Date('2026-08-24'),
      endDate: new Date('2027-07-09'),
      status: 'ACTIVE',
      isCurrent: true,
    },
  });

  const cycleHidalgo = await prisma.academicCycle.create({
    data: {
      id: 'cycle-2026-2027',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      name: 'Ciclo Escolar 2026-2027',
      startDate: new Date('2026-08-24'),
      endDate: new Date('2027-07-09'),
      status: 'ACTIVE',
      isCurrent: true,
    },
  });

  // 7. Grupos Base y Optativas
  const groupPrim1A = await prisma.academicGroup.create({
    data: {
      id: 'group-prim-1a',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      cycleId: cycleHidalgo.id,
      level: 'PRIMARIA',
      gradeNumber: 1,
      name: 'Primaria 1º "A"',
      shift: 'MATUTINO',
      type: 'BASE_REGULAR',
      maxCapacity: 30,
      tutorTeacherId: 'user-docente-01',
    },
  });

  const groupPrep1A = await prisma.academicGroup.create({
    data: {
      id: 'group-prep-1a',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      cycleId: cycleHidalgo.id,
      level: 'PREPARATORIA',
      gradeNumber: 1,
      name: 'Preparatoria 1º "A"',
      shift: 'MATUTINO',
      type: 'BASE_REGULAR',
      maxCapacity: 35,
    },
  });

  const groupPrep1B = await prisma.academicGroup.create({
    data: {
      id: 'group-prep-1b',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      cycleId: cycleHidalgo.id,
      level: 'PREPARATORIA',
      gradeNumber: 1,
      name: 'Preparatoria 1º "B"',
      shift: 'MATUTINO',
      type: 'BASE_REGULAR',
      maxCapacity: 35,
    },
  });

  const groupOptRobotica = await prisma.academicGroup.create({
    data: {
      id: 'group-opt-robotica',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      cycleId: cycleHidalgo.id,
      level: 'PREPARATORIA',
      gradeNumber: 1,
      name: 'Taller de Robótica Aplicada (Multigrupo 1ºA + 1ºB)',
      shift: 'EXTENDIDO',
      type: 'OPTATIVA_TALLER_MULTIGRUPO',
      maxCapacity: 25,
      tutorTeacherId: 'user-docente-01',
    },
  });

  // Grupos en Logos
  await prisma.academicGroup.create({
    data: {
      id: 'group-logos-prim-1a',
      tenantId: logosTenant.id,
      campusId: logosCampus.id,
      cycleId: cycleLogos.id,
      level: 'PRIMARIA',
      gradeNumber: 1,
      name: 'Primaria 1º "A"',
      shift: 'MATUTINO',
      type: 'BASE_REGULAR',
      maxCapacity: 30,
    },
  });

  // 8. Docentes
  await prisma.teacher.createMany({
    data: [
      {
        id: 'teacher-01',
        tenantId: hidalgoTenant.id,
        campusId: hidalgoCampus.id,
        fullName: 'Prof. Roberto Salazar',
        email: 'docente@colegiohidalgo.edu.mx',
        phone: '+52 55 7654 0000',
        academicDegree: 'Licenciado en Ciencias de la Educación',
        isActive: true,
      },
      {
        id: 'teacher-logos-01',
        tenantId: logosTenant.id,
        campusId: logosCampus.id,
        fullName: 'Mtra. Elena Gómez',
        email: 'elena@institutologos.edu.mx',
        phone: '+52 921 555 1234',
        academicDegree: 'Licenciada en Pedagogía',
        isActive: true,
      },
    ],
  });

  // 9. Asignaturas / Materias
  const subjEsp = await prisma.subject.create({
    data: {
      id: 'subj-pri-esp-1',
      tenantId: hidalgoTenant.id,
      level: 'PRIMARIA',
      gradeNumber: 1,
      name: 'Lengua Materna (Español)',
      code: 'LME-101',
      credits: 5.0,
      weeklyHours: 5,
      isOfficialSep: true,
      isActive: true,
    },
  });

  const subjMat = await prisma.subject.create({
    data: {
      id: 'subj-pri-mat-1',
      tenantId: hidalgoTenant.id,
      level: 'PRIMARIA',
      gradeNumber: 1,
      name: 'Pensamiento Matemático',
      code: 'PM-102',
      credits: 5.0,
      weeklyHours: 5,
      isOfficialSep: true,
      isActive: true,
    },
  });

  // 10. Alumnos
  const student1 = await prisma.student.create({
    data: {
      id: 'student-01',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      studentCode: '2026-PRI-001',
      curp: 'MERU180512HDFZRR03',
      firstName: 'Carlos',
      lastName: 'Mendoza Ruiz',
      birthDate: new Date('2018-05-12'),
      gender: 'M',
      status: 'INSCRITO_ACTIVO',
      bloodType: 'O+',
      allergies: 'Ninguna conocida',
      currentGroupBaseId: groupPrim1A.id,
      isConditional: false,
      tutorName: 'Ing. Carlos Mendoza',
      tutorEmail: 'padre@familia.com',
      tutorPhone: '+52 55 6543 2109',
    },
  });

  const student2 = await prisma.student.create({
    data: {
      id: 'student-02',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      studentCode: '2026-PRI-002',
      curp: 'HECV180914MDFRR05',
      firstName: 'Valentina',
      lastName: 'Herrera Castro',
      birthDate: new Date('2018-09-14'),
      gender: 'F',
      status: 'INSCRITO_ACTIVO',
      bloodType: 'A+',
      allergies: 'Ninguna',
      currentGroupBaseId: groupPrim1A.id,
      isConditional: false,
      tutorName: 'Lic. Sofia Castro',
      tutorEmail: 'scastro@gmail.com',
      tutorPhone: '+52 55 1122 3344',
    },
  });

  const student3 = await prisma.student.create({
    data: {
      id: 'student-03',
      tenantId: hidalgoTenant.id,
      campusId: hidalgoCampus.id,
      studentCode: '2026-PREP-015',
      curp: 'GAFL080321HDFRRN01',
      firstName: 'Diego',
      lastName: 'García Flores',
      birthDate: new Date('2008-03-21'),
      gender: 'M',
      status: 'INSCRITO_CONDICIONADO',
      bloodType: 'O+',
      allergies: 'Penicilina',
      currentGroupBaseId: groupPrep1A.id,
      isConditional: true,
      conditionalDeadline: new Date('2026-10-31'),
      emergencyNotes: 'Pendiente certificado de secundaria oficial. Prórroga de 45 días.',
      tutorName: 'Sr. Roberto García',
      tutorEmail: 'rgarcia@gmail.com',
      tutorPhone: '+52 55 9988 7766',
    },
  });

  // Alumno en Instituto Logos
  await prisma.student.create({
    data: {
      id: 'student-logos-01',
      tenantId: logosTenant.id,
      campusId: logosCampus.id,
      studentCode: '2026-LOG-001',
      curp: 'VEPA180101HVZRR01',
      firstName: 'Mateo',
      lastName: 'Vera Pérez',
      birthDate: new Date('2018-01-01'),
      gender: 'M',
      status: 'INSCRITO_ACTIVO',
      bloodType: 'O+',
      allergies: 'Ninguna',
      isConditional: false,
      tutorName: 'Prof. Cristiano Vera',
      tutorEmail: 'contacto@chanovera.com',
      tutorPhone: '+52 921 987 6543',
    },
  });

  // 11. Cargos Financieros
  const charge1 = await prisma.charge.create({
    data: {
      id: 'charge-sep-01',
      tenantId: hidalgoTenant.id,
      studentId: student1.id,
      conceptName: 'Colegiatura Regular Septiembre 2026',
      periodName: '2026-09',
      baseAmount: 5000.0,
      discountAmount: 500.0, // Descuento pronto pago si aplica
      lateFeeAmount: 0.0,
      paidAmount: 3000.0,    // Abono parcial
      outstandingBalance: 2000.0, // Regla de negocio: Saldo insoluto
      dueDate: new Date('2026-09-10'),
      earlyBirdDueDate: new Date('2026-09-05'),
      status: 'ABONADO_PARCIAL',
    },
  });

  const charge2 = await prisma.charge.create({
    data: {
      id: 'charge-sep-02',
      tenantId: hidalgoTenant.id,
      studentId: student2.id,
      conceptName: 'Colegiatura Regular Septiembre 2026',
      periodName: '2026-09',
      baseAmount: 5000.0,
      discountAmount: 0.0,
      lateFeeAmount: 0.0,
      paidAmount: 5000.0,
      outstandingBalance: 0.0,
      dueDate: new Date('2026-09-10'),
      status: 'LIQUIDADO',
    },
  });

  // 12. Transacciones de Pago
  // Pago parcial de charge1 vía CoDi Banxico (0% comisión)
  await prisma.paymentTransaction.create({
    data: {
      id: 'pay-codi-01',
      tenantId: hidalgoTenant.id,
      chargeId: charge1.id,
      studentId: student1.id,
      amount: 3000.0,
      method: 'CODIBANXICO',
      fundDestination: 'BANK_ACCOUNT',
      status: 'COMPLETED',
      authorizationFolio: 'CODI-BANXICO-8923472',
      isOfflineProvisional: false,
      paidAt: new Date('2026-09-04T10:30:00Z'),
    },
  });

  // Pago de charge2 en Ventanilla Efectivo (Caja mostrador con Recibo Foliado)
  await prisma.paymentTransaction.create({
    data: {
      id: 'pay-cash-01',
      tenantId: hidalgoTenant.id,
      chargeId: charge2.id,
      studentId: student2.id,
      amount: 5000.0,
      method: 'CASH_WINDOW',
      fundDestination: 'CASH_DRAWER',
      status: 'COMPLETED',
      authorizationFolio: 'REC-FOLIO-2026-0089',
      isOfflineProvisional: false,
      paidAt: new Date('2026-09-04T11:15:00Z'),
    },
  });

  // 13. Calificaciones SEP y Asistencia de Ejemplo
  await prisma.studentSubjectGrade.createMany({
    data: [
      {
        id: 'grade-carlos-esp-t1',
        tenantId: hidalgoTenant.id,
        studentId: student1.id,
        subjectId: subjEsp.id,
        groupId: groupPrim1A.id,
        periodIndex: 1,
        gradeValue: 9.5,
        observations: 'Excelente desempeño en lectoescritura.',
        isRectified: false,
      },
      {
        id: 'grade-carlos-mat-t1',
        tenantId: hidalgoTenant.id,
        studentId: student1.id,
        subjectId: subjMat.id,
        groupId: groupPrim1A.id,
        periodIndex: 1,
        gradeValue: 8.8,
        observations: 'Buen razonamiento matemático.',
        isRectified: false,
      },
      {
        id: 'grade-valentina-esp-t1',
        tenantId: hidalgoTenant.id,
        studentId: student2.id,
        subjectId: subjEsp.id,
        groupId: groupPrim1A.id,
        periodIndex: 1,
        gradeValue: 10.0,
        observations: 'Participación destacada.',
        isRectified: false,
      },
    ],
  });

  await prisma.dailyAttendanceRecord.createMany({
    data: [
      {
        id: 'att-carlos-today',
        tenantId: hidalgoTenant.id,
        groupId: groupPrim1A.id,
        studentId: student1.id,
        date: new Date('2026-09-04'),
        status: 'PRESENTE',
        recordedBy: 'Prof. Roberto Salazar',
      },
      {
        id: 'att-val-today',
        tenantId: hidalgoTenant.id,
        groupId: groupPrim1A.id,
        studentId: student2.id,
        date: new Date('2026-09-04'),
        status: 'PRESENTE',
        recordedBy: 'Prof. Roberto Salazar',
      },
    ],
  });

  console.log('✅ Siembra completada con éxito en PostgreSQL (asm_db).');
  console.log('   - 3 Tenants (Plataforma Master, Instituto Logos, Colegio Hidalgo)');
  console.log('   - 2 Campuses');
  console.log('   - 9 Usuarios en diferentes roles');
  console.log('   - 8 Niveles educativos');
  console.log('   - 2 Ciclos escolares');
  console.log('   - 5 Grupos (Base y Optativas Multigrupo)');
  console.log('   - 2 Docentes y 2 Asignaturas');
  console.log('   - 4 Alumnos con expedientes');
  console.log('   - 2 Cargos con cálculo de saldo insoluto');
  console.log('   - 2 Transacciones (CoDi 0% y Caja Efectivo)');
}

main()
  .catch((e) => {
    console.error('❌ Error durante la siembra de base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
