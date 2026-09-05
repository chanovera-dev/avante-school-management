import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { store } from '../store/memory.store.js';
import { prisma } from '../lib/prisma.js';
import { authenticate, requireRoles } from '../middleware/auth.middleware.js';
import { emailService } from '../services/email.service.js';
import {
  UserRole,
  StudentStatus,
  EducationLevel,
  GroupType,
  EducationalLevelDTO,
  TeacherDTO,
  SubjectDTO,
  StudentSubjectGradeDTO,
  SaveGradesRequestDTO,
  SepReportCardDTO,
} from '@asm/shared';

const createStudentSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  curp: z.string().optional(),
  birthDate: z.string(),
  gender: z.enum(['M', 'F', 'OTHER']),
  groupBaseId: z.string(),
  isConditional: z.boolean().default(false),
  conditionalDeadline: z.string().optional(),
  emergencyNotes: z.string().optional(),
});

const createTeacherSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  levelId: z.string().min(1),
  specialty: z.string().min(2),
  assignedGroup: z.string().min(2),
  assignedSubject: z.string().min(2),
  password: z.string().min(6).optional(),
});

const verifyTeacherOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const saveGradesSchema = z.object({
  groupId: z.string(),
  subjectId: z.string(),
  teacherId: z.string().optional(),
  teacherName: z.string().optional(),
  grades: z.array(
    z.object({
      studentId: z.string(),
      period1: z.number().min(5).max(10).nullable().optional(),
      period2: z.number().min(5).max(10).nullable().optional(),
      period3: z.number().min(5).max(10).nullable().optional(),
      period1Absences: z.number().min(0).optional(),
      period2Absences: z.number().min(0).optional(),
      period3Absences: z.number().min(0).optional(),
      observations: z.string().optional(),
      qualitativeNotes: z.string().optional(),
    })
  ),
});

const assignDirectorSchema = z.object({
  directorName: z.string().min(2),
  directorTitle: z.string().min(2),
  directorEmail: z.string().email(),
  directorPhone: z.string().min(6),
  cctCode: z.string().min(4),
  academicCoordinator: z.string().optional(),
  directorPassword: z.string().min(6).optional(),
});

const verifyDirectorEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

const updateLevelSettingsSchema = z.object({
  cctCode: z.string().min(4),
  academicCoordinator: z.string().optional(),
  directorPhone: z.string().optional(),
});

export async function academicRoutes(fastify: FastifyInstance) {
  // 1. Listar Niveles Educativos y Directores
  fastify.get('/levels', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;

    const levelMap: Record<string, { name: string; cctCode: string; grades: string[] }> = {
      GUARDERIA: {
        name: 'Guardería / Maternal',
        cctCode: '30PDI0001X',
        grades: ['Lactantes', 'Maternal A', 'Maternal B'],
      },
      PREESCOLAR: {
        name: 'Preescolar / Jardín de Niños',
        cctCode: '30PJN0145X',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
      },
      KINDER_PREESCOLAR: {
        name: 'Preescolar / Jardín de Niños',
        cctCode: '30PJN0145X',
        grades: ['1º Kínder', '2º Kínder', '3º Kínder'],
      },
      PRIMARIA: {
        name: 'Primaria',
        cctCode: '30PPR0289Z',
        grades: ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
      },
      SECUNDARIA: {
        name: 'Secundaria',
        cctCode: '30PES0100Y',
        grades: ['1º Secundaria', '2º Secundaria', '3º Secundaria'],
      },
      PREPARATORIA: {
        name: 'Preparatoria / Bachillerato',
        cctCode: '30PBH0050W',
        grades: ['1º Semestre', '2º Semestre', '3º Semestre', '4º Semestre', '5º Semestre', '6º Semestre'],
      },
    };

    let dbLevels = await prisma.educationalLevel.findMany({
      where: { tenantId },
    });

    if (dbLevels.length === 0) {
      const campus = store.campuses.find((c) => c.tenantId === tenantId);
      const offered = campus?.levelsOffered || [];

      if (offered.length > 0) {
        for (const lvl of offered) {
          const info = levelMap[lvl] || {
            name: lvl,
            cctCode: '30PPR0000X',
            grades: [],
          };
          const normId = lvl === 'KINDER_PREESCOLAR' ? 'PREESCOLAR' : lvl;
          try {
            await prisma.educationalLevel.create({
              data: {
                id: `lvl-${normId.toLowerCase()}-${Date.now()}`,
                tenantId,
                level: normId,
                name: info.name,
                code: info.cctCode,
                evaluationScale: 'NUMERICA_SEP_DECIMAL',
              },
            });
          } catch (err) {
            // Ignorar duplicados
          }
        }
        dbLevels = await prisma.educationalLevel.findMany({
          where: { tenantId },
        });
      }
    }

    let levels: EducationalLevelDTO[] = [];
    if (dbLevels.length > 0) {
      levels = dbLevels.map((dl) => {
        const info = levelMap[dl.level] || {
          name: dl.name,
          cctCode: dl.code,
          grades: [],
        };
        return {
          id: dl.level,
          tenantId: dl.tenantId,
          name: dl.name || info.name,
          cctCode: dl.code || info.cctCode,
          grades: info.grades,
          directorName: dl.directorName || '',
          directorEmail: dl.directorEmail || '',
          directorPhone: dl.directorPhone || '',
          directorTitle: `Dirección de ${dl.name || info.name}`,
          isEmailVerified: dl.isDirectorVerified,
          createdAt: dl.createdAt,
          updatedAt: dl.updatedAt,
        };
      });

      // Sincronizar store en memoria
      store.educationalLevels = store.educationalLevels.filter((l) => l.tenantId !== tenantId);
      store.educationalLevels.push(...levels);
    } else {
      levels = store.educationalLevels.filter((l) => l.tenantId === tenantId);
    }

    return reply.send({ levels });
  });

  // 2. Asignar / Registrar Director(a) de Nivel con Envío de Correo y Persistencia en PostgreSQL
  fastify.post(
    '/levels/:levelId/director',
    {
      preHandler: [
        authenticate,
        requireRoles([UserRole.SUPER_ADMIN, UserRole.DIRECTOR]),
      ],
    },
    async (request, reply) => {
      const { levelId } = request.params as { levelId: string };
      const parseResult = assignDirectorSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const data = parseResult.data;
      const tenantId = request.userPayload!.tenantId;
      const tenant = (await prisma.tenant.findUnique({ where: { id: tenantId } })) || store.tenants.find((t) => t.id === tenantId);
      const schoolName = tenant?.name || 'Tu Escuela';

      const normLevelId = levelId === 'KINDER_PREESCOLAR' ? 'PREESCOLAR' : levelId;
      const normEmail = data.directorEmail.toLowerCase().trim();
      const normCct = data.cctCode.toUpperCase().trim();
      const password = data.directorPassword || 'Director2026!';
      const passwordHash = bcrypt.hashSync(password, 10);

      // 1. Guardar o actualizar nivel educativo en PostgreSQL
      await prisma.educationalLevel.upsert({
        where: {
          tenantId_level: {
            tenantId,
            level: normLevelId,
          },
        },
        update: {
          directorName: data.directorName,
          directorEmail: normEmail,
          directorPhone: data.directorPhone,
          code: normCct,
          isDirectorVerified: false,
        },
        create: {
          id: `lvl-${normLevelId.toLowerCase()}-${Date.now()}`,
          tenantId,
          level: normLevelId,
          name: normLevelId === 'PREESCOLAR' ? 'Preescolar / Jardín de Niños' : normLevelId === 'PRIMARIA' ? 'Primaria' : normLevelId,
          code: normCct,
          evaluationScale: 'NUMERICA_SEP_DECIMAL',
          directorName: data.directorName,
          directorEmail: normEmail,
          directorPhone: data.directorPhone,
          isDirectorVerified: false,
        },
      });

      // 2. Guardar o actualizar usuario en PostgreSQL para que pueda iniciar sesión con credenciales
      const dbUser = await prisma.user.upsert({
        where: {
          tenantId_email: {
            tenantId,
            email: normEmail,
          },
        },
        update: {
          fullName: data.directorName,
          phone: data.directorPhone,
          passwordHash,
          role: UserRole.DIRECTOR,
          isActive: true,
          isEmailVerified: false,
        },
        create: {
          tenantId,
          email: normEmail,
          fullName: data.directorName,
          phone: data.directorPhone,
          passwordHash,
          role: UserRole.DIRECTOR,
          isActive: true,
          isEmailVerified: false,
        },
      });

      // 3. Generar token OTP y persistirlo
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      await prisma.emailVerificationToken.deleteMany({
        where: { email: normEmail },
      });

      await prisma.emailVerificationToken.create({
        data: {
          email: normEmail,
          code: otpCode,
          tenantId,
          userId: dbUser.id,
          expiresAt,
        },
      });

      // 4. Sincronizar en memoria para endpoints secundarios
      let level = store.educationalLevels.find((l) => l.tenantId === tenantId && l.id === normLevelId);
      if (!level) {
        level = {
          id: normLevelId,
          tenantId,
          name: normLevelId === 'PREESCOLAR' ? 'Preescolar / Jardín de Niños' : normLevelId === 'PRIMARIA' ? 'Primaria' : normLevelId,
          cctCode: normCct,
          grades: normLevelId === 'PREESCOLAR' ? ['1º Kínder', '2º Kínder', '3º Kínder'] : ['1º Primaria', '2º Primaria', '3º Primaria', '4º Primaria', '5º Primaria', '6º Primaria'],
          isEmailVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        store.educationalLevels.push(level);
      }

      level.directorName = data.directorName;
      level.directorTitle = data.directorTitle;
      level.directorEmail = normEmail;
      level.directorPhone = data.directorPhone;
      level.cctCode = normCct;
      level.academicCoordinator = data.academicCoordinator;
      level.isEmailVerified = false;
      level.updatedAt = new Date();

      let user = store.users.find((u) => u.tenantId === tenantId && u.email === normEmail);
      if (user) {
        user.fullName = data.directorName;
        user.phone = data.directorPhone;
        user.passwordHash = passwordHash;
        user.isEmailVerified = false;
      } else {
        user = {
          id: dbUser.id,
          tenantId,
          email: normEmail,
          fullName: data.directorName,
          role: UserRole.DIRECTOR,
          phone: data.directorPhone,
          isEmailVerified: false,
          isActive: true,
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        store.users.push(user);
      }

      store.verificationTokens = store.verificationTokens.filter((t) => t.email !== normEmail);
      store.verificationTokens.push({
        email: normEmail,
        code: otpCode,
        tenantId,
        userId: dbUser.id,
        expiresAt,
      });

      // Enviar correo real
      const emailResult = await emailService.sendDirectorVerificationEmail(
        normEmail,
        data.directorName,
        level.name,
        otpCode,
        schoolName
      );

      return reply.send({
        success: true,
        level,
        devOtpCode: emailResult.devMode ? otpCode : undefined,
        message: `Código de verificación de 6 dígitos enviado a ${normEmail}`,
      });
    }
  );

  // 3. Verificar Correo del Director de Nivel
  fastify.post('/levels/:levelId/verify-director-email', async (request, reply) => {
    const { levelId } = request.params as { levelId: string };
    const parseResult = verifyDirectorEmailSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { email, code } = parseResult.data;
    const normalizedEmail = email.toLowerCase().trim();
    const normLevelId = levelId === 'KINDER_PREESCOLAR' ? 'PREESCOLAR' : levelId;

    // Buscar en Prisma o en memoria
    const dbToken = await prisma.emailVerificationToken.findFirst({
      where: {
        email: normalizedEmail,
        code,
        expiresAt: { gt: new Date() },
      },
    });

    const memoryToken = store.verificationTokens.find(
      (t) => t.email === normalizedEmail && t.code === code && t.expiresAt > new Date()
    );

    if (!dbToken && !memoryToken) {
      return reply.status(400).send({
        error: 'INVALID_OR_EXPIRED_CODE',
        message: 'El código de 6 dígitos es incorrecto o ha expirado.',
      });
    }

    const effectiveTenantId = dbToken?.tenantId || memoryToken?.tenantId;

    // Actualizar en PostgreSQL vía Prisma
    if (effectiveTenantId) {
      await prisma.educationalLevel.updateMany({
        where: {
          tenantId: effectiveTenantId,
          level: normLevelId,
        },
        data: {
          isDirectorVerified: true,
        },
      });

      await prisma.user.updateMany({
        where: {
          tenantId: effectiveTenantId,
          email: normalizedEmail,
        },
        data: {
          isEmailVerified: true,
        },
      });

      await prisma.emailVerificationToken.deleteMany({
        where: { email: normalizedEmail },
      });
    }

    // Actualizar en memoria
    const user = store.users.find((u) => u.email === normalizedEmail);
    if (user) {
      user.isEmailVerified = true;
    }

    const level = store.educationalLevels.find(
      (l) => (l.tenantId === effectiveTenantId || !l.tenantId) && (l.id === normLevelId || l.directorEmail === normalizedEmail)
    );
    if (level) {
      level.isEmailVerified = true;
      level.updatedAt = new Date();
    }

    store.verificationTokens = store.verificationTokens.filter((t) => t.email !== normalizedEmail);

    return reply.send({
      success: true,
      level,
      message: '¡Correo del director verificado exitosamente!',
    });
  });

  // 4. Ajustes del Director de Nivel
  fastify.put(
    '/levels/:levelId/settings',
    {
      preHandler: [
        authenticate,
        requireRoles([UserRole.SUPER_ADMIN, UserRole.DIRECTOR]),
      ],
    },
    async (request, reply) => {
      const { levelId } = request.params as { levelId: string };
      const parseResult = updateLevelSettingsSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const tenantId = request.userPayload!.tenantId;
      const level = store.educationalLevels.find((l) => l.tenantId === tenantId && l.id === levelId);
      if (!level) {
        return reply.status(404).send({ error: 'Nivel no encontrado' });
      }

      const data = parseResult.data;
      level.cctCode = data.cctCode.toUpperCase().trim();
      if (data.academicCoordinator !== undefined) level.academicCoordinator = data.academicCoordinator;
      if (data.directorPhone !== undefined) level.directorPhone = data.directorPhone;
      level.updatedAt = new Date();

      return reply.send({ success: true, level });
    }
  );

  // Listar Ciclos
  fastify.get('/cycles', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const cycles = store.cycles.filter((c) => c.tenantId === tenantId);
    return reply.send({ cycles });
  });

  // Listar Grupos
  fastify.get('/groups', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const groups = store.groups.filter((g) => g.tenantId === tenantId);
    return reply.send({ groups });
  });

  // Listar Alumnos
  fastify.get('/students', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const students = store.students.filter((s) => s.tenantId === tenantId);
    return reply.send({ students });
  });

  // Alta de Alumnos
  fastify.post(
    '/students',
    {
      preHandler: [
        authenticate,
        requireRoles([UserRole.SUPER_ADMIN, UserRole.DIRECTOR, UserRole.CONTROL_ESCOLAR]),
      ],
    },
    async (request, reply) => {
      const parseResult = createStudentSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const data = parseResult.data;
      const tenantId = request.userPayload!.tenantId;
      const campusId = store.campuses.find((c) => c.tenantId === tenantId)?.id || 'campus-central-01';

      const year = new Date().getFullYear();
      const count = store.students.filter((s) => s.tenantId === tenantId).length + 1;
      const studentCode = `${year}-ASM-${String(count).padStart(4, '0')}`;

      const newStudent = {
        id: `student-${Date.now()}`,
        tenantId,
        campusId,
        studentCode,
        curp: data.curp,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: new Date(data.birthDate),
        gender: data.gender,
        status: data.isConditional ? StudentStatus.INSCRITO_CONDICIONADO : StudentStatus.INSCRITO_ACTIVO,
        currentGroupBaseId: data.groupBaseId,
        isConditional: data.isConditional,
        conditionalDeadline: data.conditionalDeadline ? new Date(data.conditionalDeadline) : undefined,
        emergencyNotes: data.emergencyNotes,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      store.students.push(newStudent);
      return reply.status(201).send({ student: newStudent });
    }
  );

  // --- GESTIÓN DE DOCENTES ---
  // Listar Docentes
  fastify.get('/teachers', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const teachers = store.teachers.filter((t) => t.tenantId === tenantId);
    return reply.send({ teachers });
  });

  // Registrar Docente con Envío de OTP
  fastify.post(
    '/teachers',
    {
      preHandler: [
        authenticate,
        requireRoles([UserRole.SUPER_ADMIN, UserRole.DIRECTOR, UserRole.CONTROL_ESCOLAR]),
      ],
    },
    async (request, reply) => {
      const parseResult = createTeacherSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const data = parseResult.data;
      const tenantId = request.userPayload!.tenantId;
      const tenant = store.tenants.find((t) => t.id === tenantId);
      const schoolName = tenant?.name || 'Tu Escuela';

      const email = data.email.toLowerCase().trim();
      const password = data.password || 'Maestro2026!';
      const passwordHash = bcrypt.hashSync(password, 10);

      let user = store.users.find((u) => u.tenantId === tenantId && u.email === email);
      if (user) {
        user.fullName = data.fullName;
        user.phone = data.phone;
        user.role = UserRole.DOCENTE;
      } else {
        user = {
          id: `user-doc-${Date.now()}`,
          tenantId,
          email,
          fullName: data.fullName,
          role: UserRole.DOCENTE,
          phone: data.phone,
          isEmailVerified: false,
          isActive: true,
          passwordHash,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        store.users.push(user);
      }

      const newTeacher: TeacherDTO = {
        id: `teacher-${Date.now()}`,
        tenantId,
        userId: user.id,
        fullName: data.fullName,
        email,
        phone: data.phone,
        levelId: data.levelId,
        specialty: data.specialty,
        assignedGroup: data.assignedGroup,
        assignedSubject: data.assignedSubject,
        isEmailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      store.teachers.push(newTeacher);

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      store.verificationTokens = store.verificationTokens.filter((t) => t.email !== email);
      store.verificationTokens.push({
        email,
        code: otpCode,
        tenantId,
        userId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });

      const level = store.educationalLevels.find((l) => l.tenantId === tenantId && l.id === data.levelId);
      const levelName = level?.name || (data.levelId === 'PREESCOLAR' ? 'Preescolar' : 'Primaria');

      const emailResult = await emailService.sendTeacherVerificationEmail(
        email,
        data.fullName,
        levelName,
        data.assignedSubject,
        otpCode,
        schoolName
      );

      return reply.status(201).send({
        success: true,
        teacher: newTeacher,
        devOtpCode: emailResult.devMode ? otpCode : undefined,
        message: `Docente registrado exitosamente. Se envió el código OTP a ${email}`,
      });
    }
  );

  // Verificar OTP de Docente
  fastify.post('/teachers/verify-otp', async (request, reply) => {
    const parseResult = verifyTeacherOtpSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const { email, code } = parseResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    const tokenEntry = store.verificationTokens.find(
      (t) => t.email === normalizedEmail && t.code === code && t.expiresAt > new Date()
    );

    if (!tokenEntry) {
      return reply.status(400).send({
        error: 'INVALID_OR_EXPIRED_CODE',
        message: 'El código de 6 dígitos es incorrecto o ha expirado.',
      });
    }

    const teacher = store.teachers.find((t) => t.email === normalizedEmail);
    if (teacher) {
      teacher.isEmailVerified = true;
      teacher.updatedAt = new Date();
    }

    const user = store.users.find((u) => u.email === normalizedEmail);
    if (user) {
      user.isEmailVerified = true;
    }

    store.verificationTokens = store.verificationTokens.filter((t) => t.email !== normalizedEmail);

    return reply.send({
      success: true,
      teacher,
      message: '¡Cuenta docente verificada con éxito!',
    });
  });

  // --- ASIGNATURAS OFICIALES SEP ---
  fastify.get('/subjects', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { levelId } = request.query as { levelId?: string };

    let subjects = store.subjects.filter((s) => s.tenantId === tenantId);
    if (levelId) {
      subjects = subjects.filter((s) => s.levelId === levelId);
    }

    return reply.send({ subjects: subjects.sort((a, b) => a.orderIndex - b.orderIndex) });
  });

  // --- CALIFICACIONES Y EVALUACIONES SEP ---
  // Obtener calificaciones por Grupo y Asignatura (Plantilla lista para el docente)
  fastify.get('/grades', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { groupId, subjectId, studentId } = request.query as {
      groupId?: string;
      subjectId?: string;
      studentId?: string;
    };

    if (studentId) {
      const grades = store.grades.filter((g) => g.tenantId === tenantId && g.studentId === studentId);
      return reply.send({ grades });
    }

    if (groupId && subjectId) {
      const group = store.groups.find((g) => g.id === groupId && g.tenantId === tenantId);
      const subject = store.subjects.find((s) => s.id === subjectId && s.tenantId === tenantId);
      const groupStudents = store.students.filter(
        (s) => s.tenantId === tenantId && s.currentGroupBaseId === groupId && s.status === StudentStatus.INSCRITO_ACTIVO
      );

      const resultGrades: StudentSubjectGradeDTO[] = groupStudents.map((stud) => {
        const existing = store.grades.find(
          (g) => g.tenantId === tenantId && g.studentId === stud.id && g.subjectId === subjectId
        );

        if (existing) return existing;

        return {
          id: `grade-${stud.id}-${subjectId}`,
          tenantId,
          studentId: stud.id,
          studentName: `${stud.firstName} ${stud.lastName}`,
          studentCode: stud.studentCode,
          curp: stud.curp,
          groupId,
          groupName: group?.name || 'Grupo',
          subjectId,
          subjectName: subject?.name || 'Materia',
          teacherName: '',
          period1: null,
          period2: null,
          period3: null,
          finalGrade: null,
          period1Absences: 0,
          period2Absences: 0,
          period3Absences: 0,
          observations: '',
          qualitativeNotes: '',
          updatedAt: new Date(),
        };
      });

      return reply.send({ grades: resultGrades });
    }

    const allGrades = store.grades.filter((g) => g.tenantId === tenantId);
    return reply.send({ grades: allGrades });
  });

  // Guardar calificaciones (Los maestros suben las calificaciones de su materia)
  fastify.post(
    '/grades',
    {
      preHandler: [
        authenticate,
        requireRoles([UserRole.SUPER_ADMIN, UserRole.DIRECTOR, UserRole.DOCENTE, UserRole.CONTROL_ESCOLAR]),
      ],
    },
    async (request, reply) => {
      const parseResult = saveGradesSchema.safeParse(request.body);
      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const { groupId, subjectId, teacherId, teacherName, grades } = parseResult.data;
      const tenantId = request.userPayload!.tenantId;

      const group = store.groups.find((g) => g.id === groupId && g.tenantId === tenantId);
      const subject = store.subjects.find((s) => s.id === subjectId && s.tenantId === tenantId);

      const updatedRecords: StudentSubjectGradeDTO[] = [];

      for (const item of grades) {
        const student = store.students.find((s) => s.id === item.studentId && s.tenantId === tenantId);
        if (!student) continue;

        const validPeriods = [item.period1, item.period2, item.period3].filter(
          (p) => typeof p === 'number' && p !== null
        ) as number[];

        const finalGrade =
          validPeriods.length > 0
            ? Number((validPeriods.reduce((acc, curr) => acc + curr, 0) / validPeriods.length).toFixed(1))
            : null;

        let record = store.grades.find(
          (g) => g.tenantId === tenantId && g.studentId === student.id && g.subjectId === subjectId
        );

        if (record) {
          record.period1 = item.period1 !== undefined ? item.period1 : record.period1;
          record.period2 = item.period2 !== undefined ? item.period2 : record.period2;
          record.period3 = item.period3 !== undefined ? item.period3 : record.period3;
          record.period1Absences = item.period1Absences !== undefined ? item.period1Absences : record.period1Absences;
          record.period2Absences = item.period2Absences !== undefined ? item.period2Absences : record.period2Absences;
          record.period3Absences = item.period3Absences !== undefined ? item.period3Absences : record.period3Absences;
          record.observations = item.observations !== undefined ? item.observations : record.observations;
          record.qualitativeNotes = item.qualitativeNotes !== undefined ? item.qualitativeNotes : record.qualitativeNotes;
          record.finalGrade = finalGrade;
          record.teacherId = teacherId || record.teacherId;
          record.teacherName = teacherName || record.teacherName;
          record.updatedAt = new Date();
        } else {
          record = {
            id: `grade-${student.id}-${subjectId}-${Date.now()}`,
            tenantId,
            studentId: student.id,
            studentName: `${student.firstName} ${student.lastName}`,
            studentCode: student.studentCode,
            curp: student.curp,
            groupId,
            groupName: group?.name || 'Grupo',
            subjectId,
            subjectName: subject?.name || 'Materia',
            teacherId,
            teacherName: teacherName || 'Profesor Titular',
            period1: item.period1 || null,
            period2: item.period2 || null,
            period3: item.period3 || null,
            finalGrade,
            period1Absences: item.period1Absences || 0,
            period2Absences: item.period2Absences || 0,
            period3Absences: item.period3Absences || 0,
            observations: item.observations || '',
            qualitativeNotes: item.qualitativeNotes || '',
            updatedAt: new Date(),
          };
          store.grades.push(record);
        }

        updatedRecords.push(record);
      }

      return reply.send({
        success: true,
        savedCount: updatedRecords.length,
        records: updatedRecords,
        message: '¡Calificaciones guardadas exitosamente!',
      });
    }
  );

  // --- BOLETA OFICIAL SEP ---
  fastify.get('/report-card/:studentId', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.params as { studentId: string };

    const reportCard = store.getStudentSepReportCard(tenantId, studentId);
    if (!reportCard) {
      return reply.status(404).send({
        error: 'STUDENT_NOT_FOUND',
        message: 'No se encontró el alumno o no tiene matrícula activa en este colegio.',
      });
    }

    return reply.send({ reportCard });
  });

  // --- PASE DE LISTA Y ASISTENCIA DIARIA ---
  const saveDailyAttendanceSchema = z.object({
    groupId: z.string().min(1, 'El grupo es requerido'),
    date: z.string().min(8, 'La fecha es requerida'),
    subjectId: z.string().optional(),
    teacherId: z.string().optional(),
    teacherName: z.string().optional(),
    records: z.array(
      z.object({
        studentId: z.string(),
        status: z.enum(['PRESENTE', 'RETARDO', 'FALTA_INJUSTIFICADA', 'FALTA_JUSTIFICADA', 'SALIDA_ANTICIPADA']),
        notes: z.string().optional(),
      })
    ),
  });

  // Consultar Asistencia Diaria
  fastify.get('/attendance', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as { groupId?: string; date?: string; studentId?: string };

    const targetDate = query.date || new Date().toISOString().split('T')[0];
    let records = store.getDailyAttendance(tenantId, query.groupId, targetDate, query.studentId);

    // Si el maestro consulta un grupo y aún no se ha pasado lista hoy, generar lista base
    if (query.groupId && records.length === 0) {
      const groupStudents = store.students.filter(
        (s) => s.tenantId === tenantId && s.currentGroupBaseId === query.groupId
      );
      const group = store.groups.find((g) => g.id === query.groupId);

      records = groupStudents.map((s) => ({
        id: `att-template-${s.id}`,
        tenantId,
        studentId: s.id,
        studentName: `${s.firstName} ${s.lastName}`,
        studentCode: s.studentCode,
        groupId: query.groupId!,
        groupName: group?.name || 'Grupo Escolar',
        date: targetDate,
        status: 'PRESENTE' as any,
        notes: '',
        createdAt: new Date(),
      }));
    }

    const stats = query.groupId
      ? store.getAttendanceStats(tenantId, query.groupId, targetDate)
      : undefined;

    return reply.send({
      success: true,
      date: targetDate,
      groupId: query.groupId,
      records,
      stats,
    });
  });

  // Guardar Pase de Lista Diario
  fastify.post(
    '/attendance',
    { preHandler: [authenticate] },
    async (request, reply) => {
      const tenantId = request.userPayload!.tenantId;
      const parseResult = saveDailyAttendanceSchema.safeParse(request.body);

      if (!parseResult.success) {
        return reply.status(400).send({
          error: 'Validation Error',
          details: parseResult.error.flatten(),
        });
      }

      const updated = store.saveDailyAttendance(tenantId, parseResult.data as any);
      const stats = store.getAttendanceStats(tenantId, parseResult.data.groupId, parseResult.data.date);

      return reply.send({
        success: true,
        savedCount: updated.length,
        records: updated,
        stats,
        message: '¡Pase de lista del día registrado correctamente!',
      });
    }
  );

  // --- JUSTIFICANTES ESCOLARES DE INASISTENCIA ---
  const createJustificationSchema = z.object({
    studentId: z.string().min(1, 'El alumno es obligatorio'),
    startDate: z.string().min(8, 'La fecha de inicio es obligatoria'),
    endDate: z.string().min(8, 'La fecha de término es obligatoria'),
    reasonCategory: z.enum(['MEDICA', 'FAMILIAR', 'TRAMITE_OFICIAL', 'EVENTO_CIVICO_DEPORTIVO', 'FUERZA_MAYOR']),
    reasonDescription: z.string().min(3, 'El motivo o descripción es obligatorio'),
    documentFolio: z.string().optional(),
    authorizedBy: z.string().min(2, 'El nombre de quien autoriza es obligatorio'),
    allowAssignmentMakeup: z.boolean().optional().default(true),
  });

  // Consultar Justificantes
  fastify.get('/justifications', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as { studentId?: string; groupId?: string };

    const justifications = store.getJustifications(tenantId, query.studentId, query.groupId);
    return reply.send({ success: true, justifications });
  });

  // Emitir Justificante Oficial
  fastify.post('/justifications', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = createJustificationSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const justification = store.createJustification(tenantId, parseResult.data);
    return reply.send({
      success: true,
      justification,
      message: `¡Justificante ${justification.folio} emitido y registrado exitosamente!`,
    });
  });

  // --- CIRCULARES, CITATORIOS Y COMUNICADOS ESCOLARES ---
  const createNoticeSchema = z.object({
    title: z.string().min(3, 'El título es obligatorio'),
    content: z.string().min(5, 'El contenido es obligatorio'),
    type: z.enum(['CIRCULAR_GENERAL', 'CITATORIO_PADRES', 'AVISO_URGENTE', 'EVENTO_CIVICO_CULTURAL', 'SUSPENSION_CLASES']),
    priority: z.enum(['NORMAL', 'ALTA', 'URGENTE']),
    targetAudience: z.enum(['TODOS', 'NIVEL', 'GRUPO', 'INDIVIDUAL']),
    targetLevelId: z.string().optional(),
    targetGroupId: z.string().optional(),
    targetGroupName: z.string().optional(),
    targetStudentId: z.string().optional(),
    targetStudentName: z.string().optional(),
    appointmentDateTime: z.string().optional(),
    appointmentLocation: z.string().optional(),
    publishedBy: z.string().min(2, 'El autor o área emisora es obligatoria'),
    publishDate: z.string().optional(),
    requiresAcknowledgment: z.boolean().optional().default(false),
    acknowledgmentDeadline: z.string().optional(),
  });

  const acknowledgeNoticeSchema = z.object({
    studentId: z.string().min(1, 'El alumno es obligatorio'),
    tutorName: z.string().min(2, 'El nombre del tutor es obligatorio'),
  });

  // Consultar Circulares y Citatorios
  fastify.get('/notices', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as {
      type?: string;
      studentId?: string;
      groupId?: string;
      levelId?: string;
    };

    const notices = store.getNotices(tenantId, query);
    return reply.send({ success: true, notices });
  });

  // Crear Circular o Citatorio
  fastify.post('/notices', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = createNoticeSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const notice = store.createNotice(tenantId, parseResult.data);
    return reply.send({
      success: true,
      notice,
      message: `¡${notice.type === 'CITATORIO_PADRES' ? 'Citatorio' : 'Circular'} ${notice.folio} publicado exitosamente!`,
    });
  });

  // Confirmar Acuse Digital de Enterado por el Tutor
  fastify.post('/notices/:id/acknowledge', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const parseResult = acknowledgeNoticeSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const acknowledgment = store.acknowledgeNotice(tenantId, id, parseResult.data);
    if (!acknowledgment) {
      return reply.status(404).send({ error: 'Circular o Citatorio no encontrado.' });
    }

    return reply.send({
      success: true,
      acknowledgment,
      message: '¡Acuse digital de enterado registrado con éxito!',
    });
  });

  // Consultar Lista de Acuses de un Comunicado
  fastify.get('/notices/:id/acknowledgments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };

    const acknowledgments = store.getNoticeAcknowledgments(tenantId, id);
    return reply.send({ success: true, acknowledgments });
  });

  // --- CREDENCIALES ESCOLARES DIGITALES Y CONTROL DE ACCESO ---
  const scanAccessSchema = z.object({
    qrPayload: z.string().min(1, 'El código QR o ID es obligatorio'),
    scanPoint: z.enum(['PUERTA_PRINCIPAL', 'BIBLIOTECA', 'CAFETERIA', 'TORNIQUETE_PEATONAL']).optional(),
    direction: z.enum(['ENTRADA', 'SALIDA']).optional(),
  });

  const generateCredSchema = z.object({
    personType: z.enum(['STUDENT', 'TEACHER']),
    personId: z.string().min(1, 'El ID de la persona es obligatorio'),
  });

  // Consultar credenciales emitidas
  fastify.get('/credentials', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as { personType?: string; personId?: string };

    const credentials = store.getCredentials(tenantId, query.personType, query.personId);
    return reply.send({ success: true, credentials });
  });

  // Generar o consultar credencial para un alumno o docente
  fastify.post('/credentials/generate', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = generateCredSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const credential = store.generateCredentialForPerson(
      tenantId,
      parseResult.data.personType,
      parseResult.data.personId
    );

    return reply.send({
      success: true,
      credential,
      message: `¡Credencial ${credential.credentialCode} lista para ${credential.fullName}!`,
    });
  });

  // Simulación / Escaneo de Código QR en Puerta o Torniquete
  fastify.post('/credentials/scan-access', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = scanAccessSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const result = store.scanCredentialAccess(tenantId, parseResult.data);
    return reply.send({
      success: result.accessGranted,
      ...result,
    });
  });

  // Bitácora de accesos y torniquetes
  fastify.get('/credentials/access-logs', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const logs = store.getAccessLogs(tenantId);
    return reply.send({ success: true, logs });
  });

  // --- CUADERNO DIGITAL DE TAREAS Y ENTREGAS EXTEMPORÁNEAS ---
  const createAssignmentSchema = z.object({
    title: z.string().min(3, 'El título es obligatorio'),
    description: z.string().min(5, 'La descripción es obligatoria'),
    type: z.enum(['TAREA', 'PROYECTO', 'LECTURA', 'INVESTIGACION', 'EJERCICIO_CLASE']),
    subjectId: z.string().min(1, 'La materia es obligatoria'),
    subjectName: z.string().min(1, 'El nombre de la materia es obligatorio'),
    groupId: z.string().min(1, 'El grupo es obligatorio'),
    groupName: z.string().min(1, 'El nombre del grupo es obligatorio'),
    teacherId: z.string().min(1, 'El docente es obligatorio'),
    teacherName: z.string().min(1, 'El nombre del docente es obligatorio'),
    dueDate: z.string().min(1, 'La fecha límite es obligatoria'),
    allowExtempWithJustification: z.boolean().optional().default(true),
    extempExtendedDueDate: z.string().optional(),
    maxScore: z.number().optional().default(10),
  });

  const submitAssignmentSchema = z.object({
    studentId: z.string().min(1, 'El alumno es obligatorio'),
    submissionNotes: z.string().optional(),
  });

  const gradeSubmissionSchema = z.object({
    submissionId: z.string().min(1, 'El ID de la entrega es obligatorio'),
    score: z.number().min(0).max(10),
    feedback: z.string().optional(),
  });

  // Consultar tareas asignadas
  fastify.get('/assignments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as { groupId?: string; subjectId?: string; teacherId?: string };

    const assignments = store.getAssignments(tenantId, query.groupId, query.subjectId, query.teacherId);
    return reply.send({ success: true, assignments });
  });

  // Crear nueva tarea o proyecto
  fastify.post('/assignments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = createAssignmentSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const assignment = store.createAssignment(tenantId, parseResult.data);
    return reply.send({
      success: true,
      assignment,
      message: `¡${assignment.type} ${assignment.folio} asignada con éxito al grupo ${assignment.groupName}!`,
    });
  });

  // Consultar entregas de una tarea
  fastify.get('/assignments/:id/submissions', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };

    const submissions = store.getAssignmentSubmissions(tenantId, id);
    return reply.send({ success: true, submissions });
  });

  // Entregar tarea (desde portal familiar o alumno)
  fastify.post('/assignments/:id/submit', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const parseResult = submitAssignmentSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const submission = store.submitAssignment(tenantId, id, parseResult.data);
    if (!submission) {
      return reply.status(404).send({ error: 'Alumno o tarea no encontrada' });
    }

    return reply.send({
      success: true,
      submission,
      message: '¡Tarea entregada exitosamente!',
    });
  });

  // Calificar entrega por el maestro
  fastify.post('/assignments/:id/grade', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = gradeSubmissionSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const submission = store.gradeSubmission(tenantId, parseResult.data);
    if (!submission) {
      return reply.status(404).send({ error: 'Entrega no encontrada' });
    }

    return reply.send({
      success: true,
      submission,
      message: `¡Entrega calificada con nota ${submission.score}/10!`,
    });
  });

  // --- HORARIOS ESCOLARES Y PREVENCIÓN DE COLISIONES ---
  const createScheduleSlotSchema = z.object({
    groupId: z.string().min(1, 'El grupo es obligatorio'),
    groupName: z.string().min(1, 'El nombre del grupo es obligatorio'),
    dayOfWeek: z.enum(['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES']),
    startTime: z.string().min(4, 'La hora de inicio es obligatoria'),
    endTime: z.string().min(4, 'La hora de fin es obligatoria'),
    subjectId: z.string().min(1, 'La materia es obligatoria'),
    subjectName: z.string().min(1, 'El nombre de la materia es obligatorio'),
    teacherId: z.string().min(1, 'El docente es obligatorio'),
    teacherName: z.string().min(1, 'El nombre del docente es obligatorio'),
    classroom: z.string().min(1, 'El aula es obligatoria'),
    facility: z.enum(['AULA_REGULAR', 'LABORATORIO_COMPUTO', 'CANCHA_DEPORTIVA', 'AULA_ARTES', 'BIBLIOTECA', 'PATIO_CIVICO']),
    colorHex: z.string().optional(),
  });

  // Consultar horarios
  fastify.get('/schedules', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as { groupId?: string; teacherId?: string; dayOfWeek?: any };

    const slots = store.getSchedule(tenantId, query.groupId, query.teacherId, query.dayOfWeek);
    return reply.send({ success: true, slots });
  });

  // Validar colisión de horario de forma preventiva
  fastify.post('/schedules/validate-conflict', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = createScheduleSlotSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const validation = store.validateScheduleConflict(tenantId, parseResult.data);
    return reply.send({ success: true, validation });
  });

  // Asignar bloque horario
  fastify.post('/schedules', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const parseResult = createScheduleSlotSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const result = store.createScheduleSlot(tenantId, parseResult.data);
    if (result.conflict?.hasConflict) {
      return reply.status(409).send({
        error: 'Schedule Conflict',
        conflict: result.conflict,
        message: result.conflict.conflictMessage,
      });
    }

    return reply.send({
      success: true,
      slot: result.slot,
      message: `¡Bloque de ${result.slot?.subjectName} asignado el ${result.slot?.dayOfWeek} exitosamente!`,
    });
  });

  // Eliminar bloque horario
  fastify.delete('/schedules/:id', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };

    const deleted = store.deleteScheduleSlot(tenantId, id);
    if (!deleted) {
      return reply.status(404).send({ error: 'Bloque horario no encontrado' });
    }

    return reply.send({ success: true, message: 'Bloque horario eliminado del cronograma.' });
  });

  // --- ADMISIONES Y PREINSCRIPCIONES EN LÍNEA ---
  const createApplicantSchema = z.object({
    applicantFirstName: z.string().min(1, 'El nombre del aspirante es obligatorio'),
    applicantLastName: z.string().min(1, 'Los apellidos son obligatorios'),
    curp: z.string().length(18, 'La CURP debe tener 18 caracteres'),
    birthDate: z.string().min(8, 'La fecha de nacimiento es obligatoria'),
    gender: z.enum(['M', 'F', 'OTHER']),
    targetLevelId: z.string().min(1, 'El nivel educativo es obligatorio'),
    targetLevelName: z.string().min(1, 'El nombre del nivel es obligatorio'),
    targetGrade: z.string().min(1, 'El grado escolar es obligatorio'),
    parentName: z.string().min(1, 'El nombre del tutor es obligatorio'),
    parentPhone: z.string().min(8, 'El teléfono del tutor es obligatorio'),
    parentEmail: z.string().email('Correo electrónico del tutor inválido'),
    notes: z.string().optional(),
    paymentMethod: z.string().optional(),
    tuitionFee: z.number().optional(),
    submittedDocs: z.array(z.string()).optional(),
  });

  const scheduleEvaluationSchema = z.object({
    evaluationDate: z.string().optional(),
    evaluationNotes: z.string().optional(),
    interviewDate: z.string().optional(),
    interviewNotes: z.string().optional(),
    evaluationScore: z.number().min(0).max(10).optional(),
  });

  const validateDocumentSchema = z.object({
    documentId: z.string().min(1, 'ID de documento obligatorio'),
    status: z.enum(['PENDIENTE', 'CARGADO', 'VALIDADO', 'RECHAZADO']),
    rejectionReason: z.string().optional(),
  });

  const updateApplicantStatusSchema = z.object({
    status: z.enum(['REGISTRADO', 'DOCUMENTACION_EN_REVISION', 'EVALUACION_AGENDADA', 'ACEPTADO', 'RECHAZADO', 'INSCRITO']),
    notes: z.string().optional(),
  });

  // Consultar aspirantes (filtrables por estatus y nivel, con soporte de token o header de tenant)
  fastify.get('/admissions/applicants', async (request, reply) => {
    const userPayload = (request as any).userPayload;
    const headerTenant = request.headers['x-tenant-id'] as string;
    const tenantId = userPayload?.tenantId || headerTenant || store.tenants[0]?.id || 'tenant-01';
    const query = request.query as { status?: any; targetLevelId?: string };

    const applicants = store.getApplicants(tenantId, query.status, query.targetLevelId);
    return reply.send({ success: true, applicants });
  });

  // Consultar aspirante por folio oficial (consulta pública o privada)
  fastify.get('/admissions/applicants/:folio', async (request, reply) => {
    const headerTenant = request.headers['x-tenant-id'] as string;
    const tenantId = (request as any).userPayload?.tenantId || headerTenant || store.tenants[0]?.id || 'tenant-01';
    const { folio } = request.params as { folio: string };

    const applicant = store.getApplicantByFolio(tenantId, folio);
    if (!applicant) {
      return reply.status(404).send({ error: 'Aspirante no encontrado con ese folio' });
    }

    return reply.send({ success: true, applicant });
  });

  // Registrar nuevo aspirante (Portal Público de Preinscripción o Control Escolar)
  fastify.post('/admissions/applicants', async (request, reply) => {
    const headerTenant = request.headers['x-tenant-id'] as string;
    const bodyTenant = (request.body as any)?.tenantId;
    const tenantId = (request as any).userPayload?.tenantId || headerTenant || bodyTenant || store.tenants[0]?.id || 'tenant-01';

    const parseResult = createApplicantSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const applicant = store.createApplicant(tenantId, parseResult.data);

    // Si marcó documentos entregados, actualizarlos
    if (parseResult.data.submittedDocs && Array.isArray(parseResult.data.submittedDocs)) {
      applicant.documents = applicant.documents.map((doc) => ({
        ...doc,
        status: parseResult.data.submittedDocs!.includes(doc.documentType) || parseResult.data.submittedDocs!.includes(doc.id)
          ? 'CARGADO'
          : doc.status,
      }));
    }

    const tenant = store.tenants.find((t) => t.id === tenantId) || { name: 'Colegio Institucional' };
    const paymentMethod = parseResult.data.paymentMethod || 'SPEI';
    const amount = parseResult.data.tuitionFee || (applicant.targetLevelId === 'PREESCOLAR' ? 3200 : applicant.targetLevelId === 'SECUNDARIA' ? 4200 : 3800);
    const reference = `REF-${applicant.folio.replace(/[^0-9]/g, '') || String(Date.now()).slice(-6)}`;
    const speiClabe = '646180123456789012';
    const bankName = 'STP / BBVA Bancomer';

    let emailResult: any = null;
    try {
      emailResult = await emailService.sendAdmissionConfirmationEmail({
        recipientEmail: applicant.parentEmail,
        parentName: applicant.parentName,
        studentName: `${applicant.applicantFirstName} ${applicant.applicantLastName}`,
        levelName: applicant.targetLevelName,
        grade: applicant.targetGrade,
        folio: applicant.folio,
        schoolName: tenant.name,
        paymentMethod,
        amount,
        reference,
        speiClabe,
        bankName,
      });
    } catch (err: any) {
      console.warn('⚠️ Error al enviar correo de confirmación de admisión:', err);
    }

    return reply.status(201).send({
      success: true,
      applicant,
      emailResult,
      paymentSheet: {
        folio: applicant.folio,
        amount,
        paymentMethod,
        bankName,
        speiClabe,
        reference,
        concept: `ADMISION ${applicant.folio}`,
      },
      message: `¡Preinscripción registrada exitosamente! Folio oficial: ${applicant.folio}`,
    });
  });

  // Agendar o calificar evaluación diagnóstica / entrevista
  fastify.post('/admissions/applicants/:id/schedule', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const parseResult = scheduleEvaluationSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const applicant = store.scheduleApplicantEvaluation(tenantId, id, parseResult.data);
    if (!applicant) {
      return reply.status(404).send({ error: 'Aspirante no encontrado' });
    }

    return reply.send({
      success: true,
      applicant,
      message: '¡Cita de evaluación y entrevista agendada con éxito!',
    });
  });

  // Validar o rechazar documento del aspirante
  fastify.post('/admissions/applicants/:id/documents', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const parseResult = validateDocumentSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const applicant = store.validateApplicantDocument(tenantId, id, parseResult.data);
    if (!applicant) {
      return reply.status(404).send({ error: 'Aspirante o documento no encontrado' });
    }

    return reply.send({
      success: true,
      applicant,
      message: `Documento marcado como ${parseResult.data.status}.`,
    });
  });

  // Actualizar dictamen de estatus (ej. ACEPTADO / RECHAZADO)
  fastify.post('/admissions/applicants/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const parseResult = updateApplicantStatusSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Validation Error',
        details: parseResult.error.flatten(),
      });
    }

    const applicant = store.updateApplicantStatus(tenantId, id, parseResult.data.status, parseResult.data.notes);
    if (!applicant) {
      return reply.status(404).send({ error: 'Aspirante no encontrado' });
    }

    return reply.send({
      success: true,
      applicant,
      message: `Estatus del aspirante actualizado a ${applicant.status}.`,
    });
  });

  // Formalizar inscripción: Convierte aspirante en Alumno Oficial con matrícula vitalicia
  fastify.post('/admissions/applicants/:id/enroll', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };

    const result = store.convertApplicantToStudent(tenantId, id);
    if (!result) {
      return reply.status(404).send({ error: 'Aspirante no encontrado' });
    }

    return reply.send({
      success: true,
      applicant: result.applicant,
      student: result.student,
      message: `¡Inscripción formalizada exitosamente! Matrícula oficial asignada: ${result.student.studentCode}`,
    });
  });

  // ==========================================
  // 12. RUTAS DE BIBLIOTECA ESCOLAR Y PRÉSTAMOS
  // ==========================================

  // Consultar catálogo de libros
  fastify.get('/library/books', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { category, search } = request.query as { category?: any; search?: string };

    const books = store.getBooks(tenantId, category, search);
    return reply.send({ books });
  });

  // Registrar nuevo libro en catálogo
  fastify.post('/library/books', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.isbn || !body.author || !body.shelfLocation) {
      return reply.status(400).send({ error: 'Faltan campos obligatorios del libro' });
    }

    const book = store.createBook(tenantId, {
      isbn: body.isbn,
      title: body.title,
      author: body.author,
      publisher: body.publisher || 'Editorial Independiente',
      yearPublished: Number(body.yearPublished) || new Date().getFullYear(),
      category: body.category || 'LITERATURA_INFANTIL',
      targetLevel: body.targetLevel || 'TODOS',
      shelfLocation: body.shelfLocation,
      totalCopies: Number(body.totalCopies) || 1,
      summary: body.summary,
    });

    return reply.status(201).send({
      success: true,
      book,
      message: `Libro '${book.title}' registrado con éxito en el catálogo escolar.`,
    });
  });

  // Consultar préstamos de biblioteca
  fastify.get('/library/loans', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId, status } = request.query as { studentId?: string; status?: any };

    const loans = store.getBookLoans(tenantId, studentId, status);
    return reply.send({ loans });
  });

  // Registrar préstamo de libro a alumno
  fastify.post('/library/loans', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.bookId || !body.studentId || !body.dueDate) {
      return reply.status(400).send({ error: 'Campos requeridos: bookId, studentId, dueDate' });
    }

    const result = store.createBookLoan(tenantId, {
      bookId: body.bookId,
      studentId: body.studentId,
      loanType: body.loanType || 'DOMICILIO',
      dueDate: body.dueDate,
      librarianNotes: body.librarianNotes,
    });

    if (result.error) {
      return reply.status(400).send({ error: result.error });
    }

    return reply.status(201).send({
      success: true,
      loan: result.loan,
      message: `Préstamo registrado exitosamente con folio ${result.loan?.folio}.`,
    });
  });

  // Devolución de libro prestado
  fastify.post('/library/loans/:id/return', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = (request.body as any) || {};

    const loan = store.returnBookLoan(tenantId, id, body);
    if (!loan) {
      return reply.status(404).send({ error: 'Préstamo no encontrado' });
    }

    return reply.send({
      success: true,
      loan,
      message: `Libro devuelto exitosamente al inventario de biblioteca.`,
    });
  });

  // Constancia de Solvencia / No Adeudo de Biblioteca
  fastify.get('/library/students/:studentId/clearance', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.params as { studentId: string };

    const clearance = store.checkStudentLibraryClearance(tenantId, studentId);
    if (!clearance) {
      return reply.status(404).send({ error: 'Alumno no encontrado' });
    }

    return reply.send({
      success: true,
      clearance,
    });
  });

  // ==========================================
  // 13. RUTAS DE TRANSPORTE ESCOLAR Y RUTAS SEGURAS
  // ==========================================

  // Consultar rutas de transporte
  fastify.get('/transport/routes', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const routes = store.getTransportRoutes(tenantId);
    return reply.send({ routes });
  });

  // Crear nueva ruta de transporte
  fastify.post('/transport/routes', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.code || !body.name || !body.vehiclePlate || !body.driverName) {
      return reply.status(400).send({ error: 'Faltan campos obligatorios para la ruta de transporte' });
    }

    const route = store.createTransportRoute(tenantId, {
      code: body.code,
      name: body.name,
      vehiclePlate: body.vehiclePlate,
      vehicleModel: body.vehicleModel || 'Van Escolar',
      driverName: body.driverName,
      driverPhone: body.driverPhone || '+52 55 0000 0000',
      monitorName: body.monitorName || 'Monitora Asignada',
      shift: body.shift || 'AMBOS',
      stops: body.stops || [],
    });

    return reply.status(201).send({
      success: true,
      route,
      message: `Ruta de transporte '${route.name}' creada exitosamente.`,
    });
  });

  // Consultar alumnos asignados a rutas
  fastify.get('/transport/enrollments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { routeId, studentId } = request.query as { routeId?: string; studentId?: string };

    const enrollments = store.getTransportEnrollments(tenantId, routeId, studentId);
    return reply.send({ enrollments });
  });

  // Asignar alumno a ruta y parada
  fastify.post('/transport/enrollments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.routeId || !body.stopId || !body.studentId) {
      return reply.status(400).send({ error: 'Campos requeridos: routeId, stopId, studentId' });
    }

    const result = store.enrollStudentInTransport(tenantId, {
      routeId: body.routeId,
      stopId: body.stopId,
      studentId: body.studentId,
      shift: body.shift || 'AMBOS',
      emergencyNotes: body.emergencyNotes,
    });

    if (result.error) {
      return reply.status(400).send({ error: result.error });
    }

    return reply.status(201).send({
      success: true,
      enrollment: result.enrollment,
      message: `Alumno asignado con éxito a la ruta de transporte.`,
    });
  });

  // Consultar bitácora diaria de abordaje (Check-in / Check-out)
  fastify.get('/transport/boarding-logs', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { routeId, date, shift } = request.query as {
      routeId?: string;
      date?: string;
      shift?: 'MATUTINO_RECOGIDA' | 'VESPERTINO_ENTREGA';
    };

    const logs = store.getDailyTransportBoardingLogs(tenantId, routeId, date, shift);
    return reply.send({ logs });
  });

  // Registrar pase de lista de abordaje / descenso en tiempo real
  fastify.post('/transport/boarding-logs', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.routeId || !body.studentId || !body.status) {
      return reply.status(400).send({ error: 'Campos requeridos: routeId, studentId, status' });
    }

    const log = store.recordTransportBoarding(tenantId, {
      routeId: body.routeId,
      date: body.date || new Date().toISOString().split('T')[0],
      shift: body.shift || 'MATUTINO_RECOGIDA',
      studentId: body.studentId,
      status: body.status,
      checkInTime: body.checkInTime,
      checkOutTime: body.checkOutTime,
      notes: body.notes,
    });

    return reply.send({
      success: true,
      log,
      message: `Estatus de abordaje registrado para el alumno.`,
    });
  });

  // ==========================================
  // 14. CAFETERÍA ESCOLAR Y MONEDERO DIGITAL
  // ==========================================

  // Consultar catálogo de productos de cafetería
  fastify.get('/cafeteria/products', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { category } = request.query as { category?: any };
    const products = store.getCafeteriaProducts(tenantId, category);
    return reply.send({ products });
  });

  // Registrar nuevo producto en menú de cafetería
  fastify.post('/cafeteria/products', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.name || !body.category || body.priceMXN === undefined) {
      return reply.status(400).send({ error: 'Campos requeridos: name, category, priceMXN' });
    }

    const product = store.createCafeteriaProduct(tenantId, {
      name: body.name,
      category: body.category,
      priceMXN: Number(body.priceMXN),
      caloriesKcal: body.caloriesKcal ? Number(body.caloriesKcal) : undefined,
      ingredients: body.ingredients || [],
      allergens: body.allergens || [],
      isHealthySepApproved: body.isHealthySepApproved ?? true,
      stockQuantity: Number(body.stockQuantity) || 10,
    });

    return reply.status(201).send({
      success: true,
      product,
      message: `Producto '${product.name}' agregado al menú de cafetería.`,
    });
  });

  // Consultar todos los monederos escolares
  fastify.get('/cafeteria/wallets', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const wallets = store.getStudentWallets(tenantId);
    return reply.send({ wallets });
  });

  // Consultar monedero de un alumno específico
  fastify.get('/cafeteria/wallets/:studentId', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.params as { studentId: string };
    const wallet = store.getStudentWallet(tenantId, studentId);
    return reply.send({ wallet });
  });

  // Recarga de saldo en monedero escolar
  fastify.post('/cafeteria/wallets/:studentId/top-up', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.params as { studentId: string };
    const body = request.body as any;

    const amount = Number(body.amountMXN);
    if (!amount || amount <= 0) {
      return reply.status(400).send({ error: 'El monto de recarga debe ser mayor a 0' });
    }

    const result = store.topUpStudentWallet(tenantId, studentId, {
      amountMXN: amount,
      paymentMethod: body.paymentMethod || 'EFECTIVO',
      notes: body.notes,
    });

    return reply.send({
      success: true,
      wallet: result.wallet,
      transaction: result.transaction,
      message: `Recarga de $${amount} MXN aplicada exitosamente al monedero de ${result.wallet.studentName}.`,
    });
  });

  // Configurar límite diario de gasto
  fastify.put('/cafeteria/wallets/:studentId/limit', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.params as { studentId: string };
    const body = request.body as any;

    const limit = Number(body.dailySpendingLimitMXN);
    if (isNaN(limit) || limit < 0) {
      return reply.status(400).send({ error: 'El límite diario de gasto debe ser un número positivo' });
    }

    const wallet = store.updateWalletDailyLimit(tenantId, studentId, limit);
    return reply.send({
      success: true,
      wallet,
      message: `Límite diario de gasto actualizado a $${limit} MXN.`,
    });
  });

  // Cobro en punto de venta escolar (POS con filtro anti-alergias y validación de límite)
  fastify.post('/cafeteria/sales', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.studentId || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return reply.status(400).send({ error: 'Se requiere studentId y una lista de items.' });
    }

    const result = store.processCafeteriaSale(tenantId, {
      studentId: body.studentId,
      items: body.items,
      cashierNotes: body.cashierNotes,
    });

    if (result.error) {
      return reply.status(400).send({ error: result.error });
    }

    return reply.status(201).send({
      success: true,
      transaction: result.transaction,
      wallet: result.wallet,
      message: `Venta procesada con éxito. Folio: ${result.transaction?.folio}`,
    });
  });

  // Historial de transacciones de cafetería
  fastify.get('/cafeteria/transactions', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.query as { studentId?: string };
    const transactions = store.getCafeteriaTransactions(tenantId, studentId);
    return reply.send({ transactions });
  });

  // ==========================================
  // 15. ENFERMERÍA ESCOLAR Y EXPEDIENTE DE SALUD
  // ==========================================

  // Consultar bitácora de atenciones y consultas médicas
  fastify.get('/infirmary/consultations', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId, date } = request.query as { studentId?: string; date?: string };
    const consultations = store.getMedicalConsultations(tenantId, studentId, date);
    return reply.send({ consultations });
  });

  // Registrar nueva atención médica en enfermería
  fastify.post('/infirmary/consultations', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.studentId || !body.reason || !body.severity || !body.symptomsDescription || !body.treatmentGiven) {
      return reply.status(400).send({
        error: 'Campos requeridos: studentId, reason, severity, symptomsDescription, treatmentGiven',
      });
    }

    const consultation = store.createMedicalConsultation(tenantId, {
      studentId: body.studentId,
      reason: body.reason,
      severity: body.severity,
      symptomsDescription: body.symptomsDescription,
      vitalSigns: body.vitalSigns,
      treatmentGiven: body.treatmentGiven,
      nurseNotes: body.nurseNotes,
      nurseInCharge: body.nurseInCharge || 'Enfra. Rosaura Morales',
      requiresPickupByParent: body.requiresPickupByParent ?? false,
    });

    return reply.status(201).send({
      success: true,
      consultation,
      message: `Atención médica registrada con folio ${consultation.folio}. Tutor notificado exitosamente.`,
    });
  });

  // Actualizar estatus de atención médica (alta o retiro con padre)
  fastify.put('/infirmary/consultations/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.status) {
      return reply.status(400).send({ error: 'Se requiere el campo status' });
    }

    const consultation = store.updateMedicalConsultationStatus(tenantId, id, body.status, body.nurseNotes);
    if (!consultation) {
      return reply.status(404).send({ error: 'Consulta médica no encontrada' });
    }

    return reply.send({
      success: true,
      consultation,
      message: `Estatus actualizado a ${consultation.status}.`,
    });
  });

  // Consultar medicamentos programados
  fastify.get('/infirmary/medications', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.query as { studentId?: string };
    const medications = store.getScheduledMedications(tenantId, studentId);
    return reply.send({ medications });
  });

  // Registrar medicamento programado con receta médica
  fastify.post('/infirmary/medications', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (
      !body.studentId ||
      !body.medicationName ||
      !body.dosage ||
      !body.scheduledTime ||
      !body.prescriptionDoctorName ||
      !body.doctorLicense
    ) {
      return reply.status(400).send({
        error:
          'Campos requeridos: studentId, medicationName, dosage, scheduledTime, prescriptionDoctorName, doctorLicense',
      });
    }

    const medication = store.createScheduledMedication(tenantId, {
      studentId: body.studentId,
      medicationName: body.medicationName,
      dosage: body.dosage,
      scheduledTime: body.scheduledTime,
      startDate: body.startDate || new Date().toISOString().split('T')[0],
      endDate: body.endDate || new Date().toISOString().split('T')[0],
      prescriptionDoctorName: body.prescriptionDoctorName,
      doctorLicense: body.doctorLicense,
      parentName: body.parentName || 'Tutor Autorizado',
    });

    return reply.status(201).send({
      success: true,
      medication,
      message: `Medicamento '${medication.medicationName}' programado con éxito.`,
    });
  });

  // Registrar administración de dosis médica
  fastify.post('/infirmary/medications/:id/administer', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    const result = store.administerScheduledMedication(tenantId, id, body?.nurseNotes);
    if (!result.success) {
      return reply.status(400).send({ error: result.error });
    }

    return reply.send({
      success: true,
      medication: result.medication,
      message: `Dosis de ${result.medication?.medicationName} administrada y registrada en bitácora.`,
    });
  });

  // Consultar insumos del botiquín escolar
  fastify.get('/infirmary/supplies', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const supplies = store.getFirstAidSupplies(tenantId);
    return reply.send({ supplies });
  });

  // Ajustar inventario de botiquín escolar
  fastify.post('/infirmary/supplies/:id/stock', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    const change = Number(body.quantityChange);
    if (isNaN(change)) {
      return reply.status(400).send({ error: 'quantityChange debe ser numérico' });
    }

    const item = store.updateFirstAidSupplyStock(tenantId, id, change);
    if (!item) {
      return reply.status(404).send({ error: 'Insumo no encontrado' });
    }

    return reply.send({
      success: true,
      supply: item,
      message: `Stock de ${item.name} actualizado a ${item.stockQuantity} ${item.unit}.`,
    });
  });

  // ==========================================
  // 16. TALLERES EXTRACURRICULARES Y ACADEMIAS
  // ==========================================

  // Consultar catálogo de talleres y academias vespertinas
  fastify.get('/workshops', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { category } = request.query as { category?: any };
    const workshops = store.getExtracurricularWorkshops(tenantId, category);
    return reply.send({ workshops });
  });

  // Registrar nueva academia o taller extracurricular
  fastify.post('/workshops', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.name || !body.category || !body.instructorName || !body.scheduleDays || !body.scheduleTime || !body.maxCapacity) {
      return reply.status(400).send({
        error: 'Campos requeridos: name, category, instructorName, scheduleDays, scheduleTime, maxCapacity',
      });
    }

    const code = body.code || `TAL-${body.name.substring(0, 3).toUpperCase()}-${String(store.extracurricularWorkshops.length + 1).padStart(2, '0')}`;
    const workshop = store.createExtracurricularWorkshop(tenantId, {
      code,
      name: body.name,
      category: body.category,
      description: body.description || '',
      instructorName: body.instructorName,
      instructorPhone: body.instructorPhone,
      classroom: body.classroom || 'Instalaciones Escolares',
      scheduleDays: body.scheduleDays,
      scheduleTime: body.scheduleTime,
      monthlyFeeMXN: Number(body.monthlyFeeMXN) || 0,
      maxCapacity: Number(body.maxCapacity) || 20,
      targetLevels: body.targetLevels || ['PRIMARIA'],
    });

    return reply.status(201).send({
      success: true,
      workshop,
      message: `Taller "${workshop.name}" creado exitosamente con código ${workshop.code}.`,
    });
  });

  // Consultar padrón de alumnos inscritos en talleres
  fastify.get('/workshops/enrollments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { workshopId, studentId } = request.query as { workshopId?: string; studentId?: string };
    const enrollments = store.getWorkshopEnrollments(tenantId, workshopId, studentId);
    return reply.send({ enrollments });
  });

  // Inscribir alumno a un taller extracurricular
  fastify.post('/workshops/enrollments', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.workshopId || !body.studentId) {
      return reply.status(400).send({ error: 'Se requieren workshopId y studentId' });
    }

    const result = store.enrollStudentInWorkshop(tenantId, {
      workshopId: body.workshopId,
      studentId: body.studentId,
    });

    if (!result.success) {
      return reply.status(400).send({ error: result.error });
    }

    return reply.status(201).send({
      success: true,
      enrollment: result.enrollment,
      message: `Inscripción confirmada para ${result.enrollment?.studentName} en ${result.enrollment?.workshopName}.`,
    });
  });

  // Consultar bitácora de asistencia extracurricular
  fastify.get('/workshops/attendance', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { workshopId, date } = request.query as { workshopId?: string; date?: string };

    if (!workshopId || !date) {
      return reply.status(400).send({ error: 'Se requieren workshopId y date (YYYY-MM-DD)' });
    }

    const attendance = store.getWorkshopAttendanceLogs(tenantId, workshopId, date);
    return reply.send({ attendance });
  });

  // Registrar asistencia extracurricular de un alumno
  fastify.post('/workshops/attendance', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.workshopId || !body.studentId || !body.date || !body.status) {
      return reply.status(400).send({
        error: 'Campos requeridos: workshopId, studentId, date, status',
      });
    }

    const log = store.recordWorkshopAttendance(tenantId, {
      workshopId: body.workshopId,
      studentId: body.studentId,
      date: body.date,
      status: body.status,
      notes: body.notes,
    });

    return reply.send({
      success: true,
      log,
      message: `Asistencia de ${log.studentName} registrada como ${log.status}.`,
    });
  });

  // ==========================================
  // 17. INVENTARIO ESCOLAR Y ACTIVOS FIJOS
  // ==========================================

  // Consultar catálogo de activos fijos
  fastify.get('/inventory/assets', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { category } = request.query as { category?: any };
    const assets = store.getSchoolAssets(tenantId, category);
    return reply.send({ assets });
  });

  // Registrar nuevo activo fijo
  fastify.post('/inventory/assets', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.name || !body.category || !body.assignedLocation || !body.responsiblePerson) {
      return reply.status(400).send({
        error: 'Campos requeridos: name, category, assignedLocation, responsiblePerson',
      });
    }

    const asset = store.createSchoolAsset(tenantId, {
      assetTag: body.assetTag,
      name: body.name,
      category: body.category,
      serialNumber: body.serialNumber,
      brandModel: body.brandModel,
      assignedLocation: body.assignedLocation,
      responsiblePerson: body.responsiblePerson,
      acquisitionDate: body.acquisitionDate,
      purchaseValueMXN: Number(body.purchaseValueMXN) || 0,
      condition: body.condition,
      warrantyExpiry: body.warrantyExpiry,
      notes: body.notes,
    });

    return reply.status(201).send({
      success: true,
      asset,
      message: `Activo fijo "${asset.name}" registrado con placa ${asset.assetTag}.`,
    });
  });

  // Actualizar estado / condición física de un activo
  fastify.put('/inventory/assets/:id/condition', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.condition) {
      return reply.status(400).send({ error: 'Se requiere el campo condition' });
    }

    const asset = store.updateSchoolAssetCondition(tenantId, id, body.condition, body.notes);
    if (!asset) {
      return reply.status(404).send({ error: 'Activo fijo no encontrado' });
    }

    return reply.send({
      success: true,
      asset,
      message: `Condición de ${asset.name} actualizada a ${asset.condition}.`,
    });
  });

  // Consultar tickets de mantenimiento
  fastify.get('/inventory/tickets', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { status } = request.query as { status?: any };
    const tickets = store.getAssetMaintenanceTickets(tenantId, status);
    return reply.send({ tickets });
  });

  // Crear ticket de reporte de mantenimiento
  fastify.post('/inventory/tickets', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.assetId || !body.title || !body.description || !body.priority || !body.reportedBy) {
      return reply.status(400).send({
        error: 'Campos requeridos: assetId, title, description, priority, reportedBy',
      });
    }

    const ticket = store.createAssetMaintenanceTicket(tenantId, {
      assetId: body.assetId,
      title: body.title,
      description: body.description,
      priority: body.priority,
      reportedBy: body.reportedBy,
      assignedTo: body.assignedTo,
    });

    return reply.status(201).send({
      success: true,
      ticket,
      message: `Ticket de mantenimiento ${ticket.ticketNumber} generado con éxito.`,
    });
  });

  // Actualizar estatus o resolución de ticket de mantenimiento
  fastify.put('/inventory/tickets/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.status) {
      return reply.status(400).send({ error: 'Se requiere el campo status' });
    }

    const ticket = store.updateMaintenanceTicketStatus(
      tenantId,
      id,
      body.status,
      body.resolutionNotes,
      body.costMXN !== undefined ? Number(body.costMXN) : undefined
    );

    if (!ticket) {
      return reply.status(404).send({ error: 'Ticket de mantenimiento no encontrado' });
    }

    return reply.send({
      success: true,
      ticket,
      message: `Ticket ${ticket.ticketNumber} actualizado a ${ticket.status}.`,
    });
  });

  // ==========================================
  // 18. ENCUESTAS INSTITUCIONALES Y CLIMA ESCOLAR
  // ==========================================

  // Consultar encuestas institucionales
  fastify.get('/surveys', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { audience } = request.query as { audience?: any };
    const surveys = store.getInstitutionalSurveys(tenantId, audience);
    return reply.send({ surveys });
  });

  // Crear nueva encuesta institucional
  fastify.post('/surveys', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.targetAudience || !body.category || !body.endDate || !body.questions) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, targetAudience, category, endDate, questions',
      });
    }

    const survey = store.createInstitutionalSurvey(tenantId, {
      code: body.code,
      title: body.title,
      description: body.description || '',
      targetAudience: body.targetAudience,
      category: body.category,
      startDate: body.startDate,
      endDate: body.endDate,
      questions: body.questions,
    });

    return reply.status(201).send({
      success: true,
      survey,
      message: `Encuesta institucional "${survey.title}" creada con folio ${survey.code}.`,
    });
  });

  // Enviar respuesta a una encuesta institucional
  fastify.post('/surveys/responses', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.surveyId || !body.respondentRole || !body.answers) {
      return reply.status(400).send({
        error: 'Campos requeridos: surveyId, respondentRole, answers',
      });
    }

    const responseItem = store.submitSurveyResponse(tenantId, {
      surveyId: body.surveyId,
      respondentId: body.respondentId,
      respondentRole: body.respondentRole,
      isAnonymous: body.isAnonymous,
      npsRating: body.npsRating !== undefined ? Number(body.npsRating) : undefined,
      answers: body.answers,
      comments: body.comments,
    });

    return reply.status(201).send({
      success: true,
      response: responseItem,
      message: 'Respuesta registrada exitosamente. ¡Gracias por participar!',
    });
  });

  // Consultar respuestas y métricas de una encuesta
  fastify.get('/surveys/:id/responses', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const responses = store.getSurveyResponses(tenantId, id);
    return reply.send({ responses });
  });

  // Consultar buzón confidencial de sugerencias
  fastify.get('/suggestions', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { status } = request.query as { status?: any };
    const suggestions = store.getConfidentialSuggestions(tenantId, status);
    return reply.send({ suggestions });
  });

  // Enviar sugerencia confidencial o anónima a Dirección
  fastify.post('/suggestions', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.category || !body.subject || !body.message || !body.senderRole) {
      return reply.status(400).send({
        error: 'Campos requeridos: category, subject, message, senderRole',
      });
    }

    const suggestion = store.createConfidentialSuggestion(tenantId, {
      category: body.category,
      subject: body.subject,
      message: body.message,
      senderRole: body.senderRole,
      senderName: body.senderName,
      senderEmail: body.senderEmail,
    });

    return reply.status(201).send({
      success: true,
      suggestion,
      message: `Sugerencia registrada en buzón con folio ${suggestion.folio}. Turnada a Dirección General.`,
    });
  });

  // Actualizar estatus o resolución directiva de sugerencia
  fastify.put('/suggestions/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.status) {
      return reply.status(400).send({ error: 'Se requiere el campo status' });
    }

    const suggestion = store.updateSuggestionStatus(
      tenantId,
      id,
      body.status,
      body.directorResolutionNotes,
      body.reviewedBy || 'Dirección General'
    );

    if (!suggestion) {
      return reply.status(404).send({ error: 'Sugerencia no encontrada' });
    }

    return reply.send({
      success: true,
      suggestion,
      message: `Sugerencia ${suggestion.folio} actualizada a estatus ${suggestion.status}.`,
    });
  });

  // ==========================================
  // 19. CALENDARIO CÍVICO SEP, CTE Y EVENTOS
  // ==========================================

  // Consultar calendario de eventos, efemérides y CTE
  fastify.get('/events', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { type, upcomingOnly } = request.query as { type?: any; upcomingOnly?: string };
    const events = store.getSchoolEvents(tenantId, type, upcomingOnly === 'true');
    return reply.send({ events });
  });

  // Crear nuevo evento escolar o sesión CTE
  fastify.post('/events', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.type || !body.date) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, type, date',
      });
    }

    const event = store.createSchoolEvent(tenantId, {
      code: body.code,
      title: body.title,
      description: body.description || '',
      type: body.type,
      date: body.date,
      endDate: body.endDate,
      time: body.time,
      location: body.location,
      classesSuspended: body.classesSuspended,
      audience: body.audience,
      commissions: body.commissions,
      cteAgenda: body.cteAgenda,
    });

    return reply.status(201).send({
      success: true,
      event,
      message: `Evento "${event.title}" programado en calendario escolar oficial.`,
    });
  });

  // Asignar comisión docente a un evento
  fastify.post('/events/:id/commissions', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.teacherId || !body.teacherName || !body.role) {
      return reply.status(400).send({
        error: 'Campos requeridos: teacherId, teacherName, role',
      });
    }

    const commission = store.assignTeacherCommission(tenantId, id, {
      teacherId: body.teacherId,
      teacherName: body.teacherName,
      role: body.role,
      notes: body.notes,
    });

    if (!commission) {
      return reply.status(404).send({ error: 'Evento escolar no encontrado' });
    }

    return reply.status(201).send({
      success: true,
      commission,
      message: `Comisión "${commission.role}" asignada al docente ${commission.teacherName}.`,
    });
  });

  // Actualizar estatus de comisión docente
  fastify.put('/events/:id/commissions/:commissionId/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id, commissionId } = request.params as { id: string; commissionId: string };
    const body = request.body as any;

    if (!body.status) {
      return reply.status(400).send({ error: 'Se requiere el campo status' });
    }

    const commission = store.updateCommissionStatus(
      tenantId,
      id,
      commissionId,
      body.status,
      body.notes
    );

    if (!commission) {
      return reply.status(404).send({ error: 'Comisión o evento no encontrado' });
    }

    return reply.send({
      success: true,
      commission,
      message: `Estatus de comisión actualizado a ${commission.status}.`,
    });
  });

  // Registrar acuerdos colegiados de sesión de CTE
  fastify.put('/events/:id/cte-agreements', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.cteAgreements || !Array.isArray(body.cteAgreements)) {
      return reply.status(400).send({ error: 'Se requiere el arreglo cteAgreements' });
    }

    const event = store.recordCteAgreements(tenantId, id, body.cteAgreements);
    if (!event) {
      return reply.status(404).send({ error: 'Sesión de CTE no encontrada' });
    }

    return reply.send({
      success: true,
      event,
      message: `Acuerdos colegiados de ${event.title} registrados en bitácora oficial.`,
    });
  });

  // ==========================================
  // 20. RECLUTAMIENTO Y RECURSOS HUMANOS ESCOLARES
  // ==========================================

  // Consultar plazas vacantes
  fastify.get('/recruitment/vacancies', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { status } = request.query as { status?: any };
    const vacancies = store.getJobVacancies(tenantId, status);
    return reply.send({ vacancies });
  });

  // Publicar nueva vacante o plaza docente
  fastify.post('/recruitment/vacancies', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.department || !body.type) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, department, type',
      });
    }

    const vacancy = store.createJobVacancy(tenantId, {
      code: body.code,
      title: body.title,
      department: body.department,
      type: body.type,
      description: body.description || '',
      requirements: body.requirements || [],
      salaryRangeMXN: body.salaryRangeMXN,
      closingDate: body.closingDate,
    });

    return reply.status(201).send({
      success: true,
      vacancy,
      message: `Plaza vacante "${vacancy.title}" publicada en bolsa de trabajo escolar.`,
    });
  });

  // Consultar candidatos docentes
  fastify.get('/recruitment/candidates', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { vacancyId, status } = request.query as { vacancyId?: string; status?: any };
    const candidates = store.getTeacherCandidates(tenantId, vacancyId, status);
    return reply.send({ candidates });
  });

  // Registrar postulación de nuevo candidato
  fastify.post('/recruitment/candidates', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.vacancyId || !body.fullName || !body.email || !body.phone) {
      return reply.status(400).send({
        error: 'Campos requeridos: vacancyId, fullName, email, phone',
      });
    }

    const candidate = store.createTeacherCandidate(tenantId, {
      vacancyId: body.vacancyId,
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      degree: body.degree || 'Licenciatura',
      professionalLicense: body.professionalLicense,
      yearsOfExperience: body.yearsOfExperience,
      resumeSummary: body.resumeSummary,
    });

    return reply.status(201).send({
      success: true,
      candidate,
      message: `Postulación de ${candidate.fullName} registrada con folio ${candidate.folio}.`,
    });
  });

  // Actualizar estatus del candidato en el pipeline de selección
  fastify.put('/recruitment/candidates/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.status) {
      return reply.status(400).send({ error: 'Se requiere el campo status' });
    }

    const candidate = store.updateCandidateStatus(
      tenantId,
      id,
      body.status,
      body.interviewNotes,
      body.pedagogicalDemoScore,
      body.sepAccreditation
    );

    if (!candidate) {
      return reply.status(404).send({ error: 'Candidato docente no encontrado' });
    }

    return reply.send({
      success: true,
      candidate,
      message: `Estatus de ${candidate.fullName} actualizado a ${candidate.status}.`,
    });
  });

  // ==========================================
  // 21. PROTECCIÓN CIVIL ESCOLAR Y SIMULACROS
  // ==========================================

  // Consultar bitácora de simulacros
  fastify.get('/safety/drills', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const drills = store.getCivilProtectionDrills(tenantId);
    return reply.send({ drills });
  });

  // Registrar nuevo simulacro escolar
  fastify.post('/safety/drills', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.drillType || !body.date || !body.evacuationTimeSeconds || !body.assemblyPoint) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, drillType, date, evacuationTimeSeconds, assemblyPoint',
      });
    }

    const drill = store.createCivilProtectionDrill(tenantId, {
      code: body.code,
      title: body.title,
      drillType: body.drillType,
      date: body.date,
      time: body.time || '11:00 hrs',
      hypothesis: body.hypothesis || 'Hipótesis oficial de simulacro escolar',
      evacuationTimeSeconds: Number(body.evacuationTimeSeconds),
      participants: body.participants || { students: 0, teachers: 0, staff: 0, visitors: 0 },
      assemblyPoint: body.assemblyPoint,
      incidentsReported: body.incidentsReported || [],
      evaluation: body.evaluation || 'BUENO',
      notes: body.notes,
    });

    return reply.status(201).send({
      success: true,
      drill,
      message: `Simulacro "${drill.title}" registrado en bitácora oficial de Protección Civil.`,
    });
  });

  // Consultar brigadas de emergencia
  fastify.get('/safety/brigades', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const brigades = store.getEmergencyBrigades(tenantId);
    return reply.send({ brigades });
  });

  // Asignar docente/personal a brigada de emergencia
  fastify.post('/safety/brigades/:id/members', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.fullName || !body.role || !body.buildingZone) {
      return reply.status(400).send({
        error: 'Campos requeridos: fullName, role, buildingZone',
      });
    }

    const member = store.addBrigadeMember(tenantId, id, {
      teacherId: body.teacherId,
      fullName: body.fullName,
      role: body.role,
      buildingZone: body.buildingZone,
      certified: body.certified !== undefined ? body.certified : true,
    });

    if (!member) {
      return reply.status(404).send({ error: 'Brigada de emergencia no encontrada' });
    }

    return reply.status(201).send({
      success: true,
      member,
      message: `Brigadista ${member.fullName} asignado a la brigada.`,
    });
  });

  // Actualizar dictamen / evaluación del simulacro
  fastify.put('/safety/drills/:id/evaluation', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.evaluation) {
      return reply.status(400).send({ error: 'Se requiere el campo evaluation' });
    }

    const drill = store.updateDrillEvaluation(tenantId, id, {
      evaluation: body.evaluation,
      notes: body.notes,
      incidentsReported: body.incidentsReported,
    });

    if (!drill) {
      return reply.status(404).send({ error: 'Simulacro no encontrado en bitácora' });
    }

    return reply.send({
      success: true,
      drill,
      message: `Dictamen del simulacro ${drill.code} actualizado a ${drill.evaluation}.`,
    });
  });

  // ==========================================
  // 22. CONSEJO ESCOLAR DE PARTICIPACIÓN (CEPS) Y ASOCIACIÓN DE PADRES (APF)
  // ==========================================

  // Consultar comités de corresponsabilidad CEPS
  fastify.get('/community/committees', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const committees = store.getCepsCommittees(tenantId);
    return reply.send({ committees });
  });

  // Consultar mesa directiva de la APF
  fastify.get('/community/apf-board', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const boardMembers = store.getApfBoardMembers(tenantId);
    return reply.send({ boardMembers });
  });

  // Registrar nuevo integrante de la mesa directiva APF
  fastify.post('/community/apf-board', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.role || !body.fullName || !body.studentName || !body.studentGrade) {
      return reply.status(400).send({
        error: 'Campos requeridos: role, fullName, studentName, studentGrade',
      });
    }

    const member = store.addApfBoardMember(tenantId, {
      role: body.role,
      fullName: body.fullName,
      studentName: body.studentName,
      studentGrade: body.studentGrade,
      email: body.email || '',
      phone: body.phone || '',
      appointedDate: body.appointedDate,
    });

    return reply.status(201).send({
      success: true,
      member,
      message: `${member.fullName} registrado en la Mesa Directiva APF como ${member.role}.`,
    });
  });

  // Consultar asambleas y actas escolares
  fastify.get('/community/assemblies', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const assemblies = store.getSchoolAssemblies(tenantId);
    return reply.send({ assemblies });
  });

  // Registrar nueva asamblea general o sesión CEPS
  fastify.post('/community/assemblies', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.type || !body.date) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, type, date',
      });
    }

    const assembly = store.createSchoolAssembly(tenantId, {
      code: body.code,
      title: body.title,
      type: body.type,
      date: body.date,
      time: body.time || '08:00 hrs',
      location: body.location || 'Auditorio Escolar',
      quorumCount: Number(body.quorumCount) || 0,
      agreements: body.agreements || [],
      status: body.status,
    });

    return reply.status(201).send({
      success: true,
      assembly,
      message: `Asamblea "${assembly.title}" convocada con código ${assembly.code}.`,
    });
  });

  // Asentar nuevo acuerdo en acta de asamblea
  fastify.put('/community/assemblies/:id/agreements', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.agreement) {
      return reply.status(400).send({ error: 'Se requiere el campo agreement' });
    }

    const assembly = store.recordAssemblyAgreement(tenantId, id, body.agreement);
    if (!assembly) {
      return reply.status(404).send({ error: 'Asamblea no encontrada' });
    }

    return reply.send({
      success: true,
      assembly,
      message: `Acuerdo asentado en acta oficial de ${assembly.code}.`,
    });
  });

  // ==========================================
  // 23. INFRAESTRUCTURA ESCOLAR Y MANTENIMIENTO PREVENTIVO
  // ==========================================

  // Consultar bitácora de inspecciones periódicas
  fastify.get('/facility/inspections', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const inspections = store.getFacilityInspections(tenantId);
    return reply.send({ inspections });
  });

  // Registrar nueva inspección técnica de infraestructura
  fastify.post('/facility/inspections', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.systemType || !body.inspectionDate || !body.overallStatus) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, systemType, inspectionDate, overallStatus',
      });
    }

    const inspection = store.createFacilityInspection(tenantId, {
      code: body.code,
      title: body.title,
      systemType: body.systemType,
      frequency: body.frequency || 'MENSUAL',
      inspectionDate: body.inspectionDate,
      inspectorName: body.inspectorName || 'Jefe de Mantenimiento',
      verifiedItems: body.verifiedItems || [],
      overallStatus: body.overallStatus,
      nextScheduledDate: body.nextScheduledDate || '',
      evidenceNotes: body.evidenceNotes,
    });

    return reply.status(201).send({
      success: true,
      inspection,
      message: `Inspección "${inspection.title}" registrada con folio ${inspection.code}.`,
    });
  });

  // Consultar órdenes de trabajo / tickets de reparación
  fastify.get('/facility/work-orders', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const workOrders = store.getFacilityWorkOrders(tenantId);
    return reply.send({ workOrders });
  });

  // Crear nueva orden de trabajo / ticket de reparación
  fastify.post('/facility/work-orders', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.title || !body.systemType || !body.areaLocation || !body.priority) {
      return reply.status(400).send({
        error: 'Campos requeridos: title, systemType, areaLocation, priority',
      });
    }

    const workOrder = store.createFacilityWorkOrder(tenantId, {
      folio: body.folio,
      systemType: body.systemType,
      areaLocation: body.areaLocation,
      title: body.title,
      description: body.description || '',
      priority: body.priority,
      assignedWorker: body.assignedWorker || 'Don Tomás Cruz Mendoza',
      materialsCostMXN: Number(body.materialsCostMXN) || 0,
      laborCostMXN: Number(body.laborCostMXN) || 0,
      targetCompletionDate: body.targetCompletionDate || new Date().toISOString().split('T')[0],
    });

    return reply.status(201).send({
      success: true,
      workOrder,
      message: `Orden de trabajo "${workOrder.folio}" creada exitosamente.`,
    });
  });

  // Actualizar estatus y resolución de orden de trabajo
  fastify.put('/facility/work-orders/:id/status', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.status) {
      return reply.status(400).send({ error: 'Se requiere el campo status' });
    }

    const workOrder = store.updateFacilityWorkOrderStatus(tenantId, id, {
      status: body.status,
      completionNotes: body.completionNotes,
      actualCostMXN: body.actualCostMXN,
    });

    if (!workOrder) {
      return reply.status(404).send({ error: 'Orden de trabajo no encontrada' });
    }

    return reply.send({
      success: true,
      workOrder,
      message: `Orden de trabajo ${workOrder.folio} actualizada a ${workOrder.status}.`,
    });
  });

  // ==========================================
  // 24. BECAS INSTITUCIONALES Y EXENCIONES SEP (5% OBLIGATORIO)
  // ==========================================

  // Consultar solicitudes de beca
  fastify.get('/scholarships/applications', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const applications = store.getScholarshipApplications(tenantId);
    return reply.send({ applications });
  });

  // Registrar nueva solicitud de beca
  fastify.post('/scholarships/applications', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.studentName || !body.studentCode || !body.level || !body.type || !body.requestedDiscountPercentage) {
      return reply.status(400).send({
        error: 'Campos requeridos: studentName, studentCode, level, type, requestedDiscountPercentage',
      });
    }

    const application = store.createScholarshipApplication(tenantId, {
      folio: body.folio,
      studentId: body.studentId || `std-${Date.now()}`,
      studentName: body.studentName,
      studentCode: body.studentCode,
      level: body.level,
      grade: body.grade || '1º Primaria',
      type: body.type,
      previousGpa: Number(body.previousGpa) || 8.5,
      monthlyFamilyIncomeMXN: Number(body.monthlyFamilyIncomeMXN) || 20000,
      dependentsCount: Number(body.dependentsCount) || 2,
      requestedDiscountPercentage: Number(body.requestedDiscountPercentage),
      standardTuitionMXN: body.standardTuitionMXN ? Number(body.standardTuitionMXN) : undefined,
      documentsVerified: body.documentsVerified ?? true,
    });

    return reply.status(201).send({
      success: true,
      application,
      message: `Solicitud de beca ${application.folio} registrada para ${application.studentName}.`,
    });
  });

  // Dictamen del Comité de Becas
  fastify.put('/scholarships/applications/:id/evaluate', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (!body.status || body.approvedDiscountPercentage === undefined) {
      return reply.status(400).send({
        error: 'Campos requeridos: status, approvedDiscountPercentage',
      });
    }

    const application = store.evaluateScholarshipApplication(tenantId, id, {
      status: body.status,
      approvedDiscountPercentage: Number(body.approvedDiscountPercentage),
      resolutionNotes: body.resolutionNotes || '',
      reviewerName: body.reviewerName || 'Comité de Becas Escolar',
    });

    if (!application) {
      return reply.status(404).send({ error: 'Solicitud de beca no encontrada' });
    }

    return reply.send({
      success: true,
      application,
      message: `Solicitud ${application.folio} dictaminada como ${application.status} con ${application.approvedDiscountPercentage}% de descuento.`,
    });
  });

  // Consultar indicador de cumplimiento legal del 5% SEP
  fastify.get('/scholarships/compliance', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const compliance = store.getScholarshipCompliance(tenantId);
    return reply.send({ compliance });
  });

  // ==========================================
  // 25. DOTACIONES CONALITEG Y ALMACÉN ESCOLAR
  // ==========================================

  // Consultar remesas y paquetes de libros CONALITEG
  fastify.get('/conaliteg/packages', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const packages = store.getConalitegPackages(tenantId);
    return reply.send({ packages });
  });

  // Registrar recepción de remesa de libros CONALITEG
  fastify.post('/conaliteg/packages', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.remesaFolio || !body.level || !body.grade || !body.receivedPackagesCount) {
      return reply.status(400).send({
        error: 'Campos requeridos: remesaFolio, level, grade, receivedPackagesCount',
      });
    }

    const pkg = store.createConalitegPackage(tenantId, {
      remesaFolio: body.remesaFolio,
      level: body.level,
      grade: body.grade,
      includedBooks: body.includedBooks || [],
      receivedPackagesCount: Number(body.receivedPackagesCount),
      enrolledStudentsCount: Number(body.enrolledStudentsCount) || Number(body.receivedPackagesCount),
      receptionDate: body.receptionDate || new Date().toISOString().split('T')[0],
      zoneSupervisorOffice: body.zoneSupervisorOffice || 'Supervisión Escolar de Zona',
    });

    return reply.status(201).send({
      success: true,
      package: pkg,
      message: `Dotación de libros CONALITEG ${pkg.remesaFolio} registrada para ${pkg.grade}.`,
    });
  });

  // Consultar bitácora de acuses de entrega de libros
  fastify.get('/conaliteg/receipts', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const receipts = store.getConalitegReceipts(tenantId);
    return reply.send({ receipts });
  });

  // Registrar acuse de entrega de libros firmado por tutor
  fastify.post('/conaliteg/receipts', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.packageId || !body.studentName || !body.studentCode || !body.parentName) {
      return reply.status(400).send({
        error: 'Campos requeridos: packageId, studentName, studentCode, parentName',
      });
    }

    const receipt = store.createConalitegReceipt(tenantId, {
      folio: body.folio,
      packageId: body.packageId,
      studentId: body.studentId || `std-${Date.now()}`,
      studentName: body.studentName,
      studentCode: body.studentCode,
      level: body.level || 'PRIMARIA',
      grade: body.grade || '1º Primaria',
      parentName: body.parentName,
      parentPhone: body.parentPhone,
      deliveryDate: body.deliveryDate,
      titlesDelivered: body.titlesDelivered || [],
      status: body.status || 'ENTREGADO_FIRMADO',
      notes: body.notes,
      deliveredByStaff: body.deliveredByStaff || 'Dirección Técnica',
    });

    return reply.status(201).send({
      success: true,
      receipt,
      message: `Acuse de libros ${receipt.folio} registrado para ${receipt.studentName}.`,
    });
  });

  // Consultar inventario de uniformes y materiales
  fastify.get('/warehouse/uniforms', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const uniforms = store.getSchoolUniforms(tenantId);
    return reply.send({ uniforms });
  });

  // Alta de nuevo uniforme o artículo en almacén
  fastify.post('/warehouse/uniforms', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.name || !body.category || !body.size) {
      return reply.status(400).send({
        error: 'Campos requeridos: name, category, size',
      });
    }

    const item = store.createSchoolUniformItem(tenantId, {
      sku: body.sku,
      name: body.name,
      category: body.category,
      level: body.level || 'AMBOS',
      size: body.size,
      stockQuantity: Number(body.stockQuantity) || 0,
      minStockAlert: Number(body.minStockAlert) || 5,
      unitCostMXN: Number(body.unitCostMXN) || 0,
      salePriceMXN: Number(body.salePriceMXN) || 0,
      warehouseShelf: body.warehouseShelf || 'Almacén Central',
      supplierName: body.supplierName || 'Proveedor Institucional',
    });

    return reply.status(201).send({
      success: true,
      uniform: item,
      message: `Artículo ${item.name} (${item.sku}) registrado en almacén.`,
    });
  });

  // Actualizar stock de uniforme (venta o recepción)
  fastify.put('/warehouse/uniforms/:id/stock', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    if (body.deltaStock === undefined) {
      return reply.status(400).send({ error: 'Se requiere el campo deltaStock' });
    }

    const item = store.updateSchoolUniformStock(tenantId, id, {
      deltaStock: Number(body.deltaStock),
      reason: body.reason || 'AJUSTE_INVENTARIO',
    });

    if (!item) {
      return reply.status(404).send({ error: 'Artículo de almacén no encontrado' });
    }

    return reply.send({
      success: true,
      uniform: item,
      message: `Stock actualizado a ${item.stockQuantity} unidades para ${item.name}.`,
    });
  });

  // ==========================================
  // 26. CERTIFICACIÓN DIGITAL & KÁRDEX OFICIAL
  // ==========================================

  // Consultar padrón de constancias y certificados emitidos
  fastify.get('/certificates', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as any;
    const certificates = store.getOfficialCertificates(tenantId, {
      studentId: query?.studentId,
      type: query?.type,
    });
    return reply.send({ certificates });
  });

  // Emitir nueva constancia digital con sello criptográfico y QR
  fastify.post('/certificates', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.studentName || !body.studentCode || !body.level || !body.grade || !body.type) {
      return reply.status(400).send({
        error: 'Campos requeridos: studentName, studentCode, level, grade, type',
      });
    }

    const cert = store.createOfficialCertificate(tenantId, {
      studentId: body.studentId || `std-${Date.now()}`,
      studentName: body.studentName,
      studentCode: body.studentCode,
      curp: body.curp,
      level: body.level,
      grade: body.grade,
      groupName: body.groupName,
      academicCycle: body.academicCycle,
      type: body.type,
      averageGrade: body.averageGrade ? Number(body.averageGrade) : undefined,
      notes: body.notes,
      issuedByDirector: body.issuedByDirector,
      directorCedula: body.directorCedula,
    });

    return reply.status(201).send({
      success: true,
      certificate: cert,
      message: `Documento oficial ${cert.folio} emitido satisfactoriamente con sello digital.`,
    });
  });

  // Revocar constancia o documento emitido
  fastify.put('/certificates/:id/revoke', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { id } = request.params as { id: string };
    const body = request.body as any;

    const cert = store.revokeOfficialCertificate(
      tenantId,
      id,
      body.reason || 'Documento revocado por aclaración administrativa'
    );

    if (!cert) {
      return reply.status(404).send({ error: 'Certificado no encontrado' });
    }

    return reply.send({
      success: true,
      certificate: cert,
      message: `El documento ${cert.folio} ha sido revocado.`,
    });
  });

  // Consultar kárdex oficial con trayectoria escolar completa
  fastify.get('/certificates/:studentId/kardex', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const { studentId } = request.params as { studentId: string };

    const kardex = store.getStudentKardex(tenantId, studentId);
    if (!kardex) {
      return reply.status(404).send({ error: 'Alumno no encontrado para emitir kárdex' });
    }

    return reply.send({ kardex });
  });

  // Verificación pública de autenticidad por token / QR (Sin autenticación requerida)
  fastify.get('/certificates/verify/:token', async (request, reply) => {
    const { token } = request.params as { token: string };
    const verification = store.getCertificateByToken(token);
    return reply.send(verification);
  });

  // ========================================================
  // 27. AUDITORÍA FORENSE & CUMPLIMIENTO NORMATIVO SEP
  // ========================================================

  // Consultar bitácora inmutable de auditoría
  fastify.get('/audit/logs', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const query = request.query as any;
    const logs = store.getAuditLogs(tenantId, {
      category: query?.category,
      severity: query?.severity,
      studentCode: query?.studentCode,
    });
    return reply.send({ logs });
  });

  // Registrar nuevo evento auditado inmutable
  fastify.post('/audit/logs', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const userPayload = request.userPayload!;
    const body = request.body as any;

    if (!body.category || !body.severity || !body.actionName || !body.entityIdentifier || !body.justificationReason) {
      return reply.status(400).send({
        error: 'Campos requeridos: category, severity, actionName, entityIdentifier, justificationReason',
      });
    }

    const log = store.createAuditLog(
      tenantId,
      {
        category: body.category,
        severity: body.severity,
        actionName: body.actionName,
        entityType: body.entityType || 'REGISTRO_ESCOLAR',
        entityId: body.entityId || `ent-${Date.now()}`,
        entityIdentifier: body.entityIdentifier,
        studentName: body.studentName,
        previousValue: body.previousValue,
        newValue: body.newValue,
        justificationReason: body.justificationReason,
        officialAgreementRef: body.officialAgreementRef,
        performedByName: body.performedByName || userPayload.email,
        performedByRole: body.performedByRole || userPayload.role,
      },
      userPayload.id,
      body.performedByName || userPayload.email,
      body.performedByRole || userPayload.role,
      request.ip
    );

    return reply.status(201).send({
      success: true,
      log,
      message: `Evento asentado con folio ${log.folio} y sello SHA-256 inmutable.`,
    });
  });

  // Consultar visitas e inspecciones de zona escolar SEP
  fastify.get('/audit/inspections', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const inspections = store.getSupervisionInspections(tenantId);
    return reply.send({ inspections });
  });

  // Registrar visita o informe de inspección de supervisión
  fastify.post('/audit/inspections', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const body = request.body as any;

    if (!body.officialNoticeNumber || !body.inspectorName || !body.inspectionDate || !body.purpose) {
      return reply.status(400).send({
        error: 'Campos requeridos: officialNoticeNumber, inspectorName, inspectionDate, purpose',
      });
    }

    const inspection = store.createSupervisionInspection(tenantId, {
      officialNoticeNumber: body.officialNoticeNumber,
      supervisionZone: body.supervisionZone || 'Sector 05 - Zona Escolar 14',
      inspectorName: body.inspectorName,
      inspectionDate: body.inspectionDate,
      purpose: body.purpose,
      sampleAuditedCount: Number(body.sampleAuditedCount) || 30,
      complianceScorePercent: Number(body.complianceScorePercent) || 98.0,
      status: body.status || 'CONFORME',
      findings: Array.isArray(body.findings) ? body.findings : [body.findings || 'Expedientes escolares en regla.'],
      agreedActions: Array.isArray(body.agreedActions) ? body.agreedActions : [body.agreedActions || 'Seguimiento en siguiente CTE.'],
    });

    return reply.status(201).send({
      success: true,
      inspection,
      message: `Inspección ${inspection.officialNoticeNumber} registrada en el expediente institucional.`,
    });
  });

  // Resumen ejecutivo de cumplimiento normativo SEP
  fastify.get('/audit/compliance-summary', { preHandler: [authenticate] }, async (request, reply) => {
    const tenantId = request.userPayload!.tenantId;
    const summary = store.getComplianceSummary(tenantId);
    return reply.send({ summary });
  });
}

