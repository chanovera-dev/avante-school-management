import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  private cleanEnv(val?: string): string {
    if (!val) return '';
    return val.trim().replace(/^["']|["']$/g, '');
  }

  private async getTransporter(): Promise<nodemailer.Transporter | null> {
    if (this.transporter) {
      return this.transporter;
    }

    const host = this.cleanEnv(process.env.SMTP_HOST);
    const user = this.cleanEnv(process.env.SMTP_USER);
    const pass = this.cleanEnv(process.env.SMTP_PASS);
    const port = parseInt(this.cleanEnv(process.env.SMTP_PORT) || '587', 10);
    const secure = port === 465 || process.env.SMTP_SECURE === 'true';

    // 1. Si hay variables de entorno SMTP configuradas
    if (host && user && pass && pass !== 'abcdefghijklmnop') {
      try {
        this.transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: {
            user,
            pass,
          },
        });
        return this.transporter;
      } catch (err) {
        console.warn('⚠️ No se pudo inicializar transporte SMTP externo:', err);
      }
    }

    return null;
  }

  public async sendVerificationEmail(
    recipientEmail: string,
    otpCode: string,
    schoolName: string
  ): Promise<{ messageId: string; devMode?: boolean; previewUrl?: string }> {
    const transporter = await this.getTransporter();
    
    // Remitente
    const configuredFrom = this.cleanEnv(process.env.SMTP_FROM || process.env.EMAIL_FROM);
    const userEmail = this.cleanEnv(process.env.SMTP_USER);
    const fromAddress = configuredFrom || userEmail || '"Avante School Management" <soporte@avanteschoolmanagement.com>';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Código de Verificación - ASM</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 30px; }
          .container { max-width: 540px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 24px; padding: 40px; color: #f8fafc; text-align: center; }
          .logo { background-color: #0284c7; color: #ffffff; font-size: 20px; font-weight: 900; width: 48px; height: 48px; line-height: 48px; border-radius: 12px; margin: 0 auto 20px; }
          h1 { font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
          .otp-card { background: #0f172a; border: 2px dashed #0284c7; border-radius: 18px; padding: 20px; margin: 24px 0; }
          .otp-code { font-family: monospace; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #38bdf8; }
          .footer { margin-top: 30px; font-size: 11px; color: #64748b; border-top: 1px solid #334155; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">ASM</div>
          <h1>Verifica tu Escuela en ASM</h1>
          <p>Hola, estás a un paso de activar la plataforma para <strong>${schoolName}</strong>. Utiliza el siguiente código de seguridad de 6 dígitos para confirmar tu correo:</p>
          
          <div class="otp-card">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <p>Este código tiene una vigencia de <strong>24 horas</strong>. Si no solicitaste el registro de una institución, puedes ignorar este mensaje con total seguridad.</p>
          
          <div class="footer">
            Avante School Management (ASM) • Sistema Escolar Multi-Tenant Offline-First<br>
            © 2026 Todos los derechos reservados.
          </div>
        </div>
      </body>
      </html>
    `;

    // Si hay transporte SMTP activo, intentar enviar
    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: fromAddress,
          to: recipientEmail,
          subject: `[ASM] Código de verificación: ${otpCode} para ${schoolName}`,
          text: `Tu código de verificación para ${schoolName} es: ${otpCode}. Vigencia de 24 horas.`,
          html: htmlContent,
        });

        console.log(`✉️ [SMTP EXTERNO] Correo enviado a: ${recipientEmail} (ID: ${info.messageId})`);
        const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
        return {
          messageId: info.messageId,
          previewUrl,
        };
      } catch (err: any) {
        console.warn(`⚠️ [SMTP ERROR] Falló envío externo (${err.message}). Usando entrega en consola local.`);
      }
    }

    // Modo de Desarrollo Local (Fallback de consola)
    console.log(`\n=============================================================`);
    console.log(`✉️ [DEV LOCAL] CORREO DE VERIFICACIÓN GENERADO`);
    console.log(`Destinatario: ${recipientEmail}`);
    console.log(`Institución:  ${schoolName}`);
    console.log(`CÓDIGO OTP:   🔑 ${otpCode}`);
    console.log(`=============================================================\n`);

    return {
      messageId: `dev-local-${Date.now()}`,
      devMode: true,
    };
  }

  public async sendDirectorVerificationEmail(
    recipientEmail: string,
    directorName: string,
    levelName: string,
    otpCode: string,
    schoolName: string
  ): Promise<{ messageId: string; devMode?: boolean; previewUrl?: string }> {
    const transporter = await this.getTransporter();
    
    const configuredFrom = this.cleanEnv(process.env.SMTP_FROM || process.env.EMAIL_FROM);
    const userEmail = this.cleanEnv(process.env.SMTP_USER);
    const fromAddress = configuredFrom || userEmail || '"Avante School Management" <soporte@avanteschoolmanagement.com>';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Nombramiento Directivo y Verificación - ASM</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 30px; }
          .container { max-width: 560px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 24px; padding: 40px; color: #f8fafc; text-align: center; }
          .logo { background-color: #0284c7; color: #ffffff; font-size: 20px; font-weight: 900; width: 48px; height: 48px; line-height: 48px; border-radius: 12px; margin: 0 auto 20px; }
          h1 { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
          .badge { display: inline-block; background: #0369a1; color: #e0f2fe; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; margin-bottom: 16px; }
          .otp-card { background: #0f172a; border: 2px dashed #38bdf8; border-radius: 18px; padding: 20px; margin: 24px 0; }
          .otp-code { font-family: monospace; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #38bdf8; }
          .footer { margin-top: 30px; font-size: 11px; color: #64748b; border-top: 1px solid #334155; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">ASM</div>
          <div class="badge">Nombramiento Directivo</div>
          <h1>Bienvenido(a), ${directorName}</h1>
          <p>Has sido nombrado(a) como <strong>Director(a) de ${levelName}</strong> en <strong>${schoolName}</strong>.</p>
          <p>Para activar tu cuenta directiva y acceder a los ajustes y gestión académica de tu nivel, introduce este código de seguridad de 6 dígitos:</p>
          
          <div class="otp-card">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <p>Este código tiene vigencia de <strong>24 horas</strong>. Al verificar tu correo, podrás configurar los ajustes y plantilla de tu nivel.</p>
          
          <div class="footer">
            Avante School Management (ASM) • Plataforma de Gestión Escolar Integral<br>
            © 2026 Todos los derechos reservados.
          </div>
        </div>
      </body>
      </html>
    `;

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: fromAddress,
          to: recipientEmail,
          subject: `[ASM] Verificación de Cuenta Directiva (${levelName}): ${otpCode}`,
          text: `Hola ${directorName}, tu código para activar tu cuenta de Director(a) de ${levelName} en ${schoolName} es: ${otpCode}.`,
          html: htmlContent,
        });

        console.log(`✉️ [SMTP EXTERNO] Invitación Directiva enviada a: ${recipientEmail} (ID: ${info.messageId})`);
        const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
        return {
          messageId: info.messageId,
          previewUrl,
        };
      } catch (err: any) {
        console.warn(`⚠️ [SMTP ERROR] Falló envío externo (${err.message}). Usando entrega en consola local.`);
      }
    }

    // Fallback Consola Local
    console.log(`\n=============================================================`);
    console.log(`✉️ [DEV LOCAL] VERIFICACIÓN DE DIRECTOR(A) DE NIVEL`);
    console.log(`Director(a):  ${directorName}`);
    console.log(`Nivel:        ${levelName}`);
    console.log(`Destinatario: ${recipientEmail}`);
    console.log(`Institución:  ${schoolName}`);
    console.log(`CÓDIGO OTP:   🔑 ${otpCode}`);
    console.log(`=============================================================\n`);

    return {
      messageId: `dev-local-dir-${Date.now()}`,
      devMode: true,
    };
  }

  public async sendTeacherVerificationEmail(
    recipientEmail: string,
    teacherName: string,
    levelName: string,
    subjectName: string,
    otpCode: string,
    schoolName: string
  ): Promise<{ messageId: string; devMode?: boolean; previewUrl?: string }> {
    const transporter = await this.getTransporter();
    
    const configuredFrom = this.cleanEnv(process.env.SMTP_FROM || process.env.EMAIL_FROM);
    const userEmail = this.cleanEnv(process.env.SMTP_USER);
    const fromAddress = configuredFrom || userEmail || '"Avante School Management" <soporte@avanteschoolmanagement.com>';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Bienvenida a la Plantilla Docente - ASM</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 30px; }
          .container { max-width: 560px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 24px; padding: 40px; color: #f8fafc; text-align: center; }
          .logo { background-color: #0284c7; color: #ffffff; font-size: 20px; font-weight: 900; width: 48px; height: 48px; line-height: 48px; border-radius: 12px; margin: 0 auto 20px; }
          h1 { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
          p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
          .badge { display: inline-block; background: #065f46; color: #d1fae5; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 9999px; margin-bottom: 16px; }
          .otp-card { background: #0f172a; border: 2px dashed #10b981; border-radius: 18px; padding: 20px; margin: 24px 0; }
          .otp-code { font-family: monospace; font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #34d399; }
          .footer { margin-top: 30px; font-size: 11px; color: #64748b; border-top: 1px solid #334155; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">ASM</div>
          <div class="badge">Alta de Personal Docente</div>
          <h1>Bienvenido(a) a la Plantilla Docente</h1>
          <p>Estimado(a) <strong>${teacherName}</strong>, la Dirección de <strong>${levelName}</strong> te ha dado de alta como profesor titular de <strong>${subjectName}</strong> en <strong>${schoolName}</strong>.</p>
          <p>Para activar tu cuenta docente y acceder al registro de asistencias, planificaciones y calificaciones, confirma tu correo con este código de 6 dígitos:</p>
          
          <div class="otp-card">
            <div class="otp-code">${otpCode}</div>
          </div>
          
          <p>Este código tiene vigencia de <strong>24 horas</strong>. Al verificar tu correo, podrás acceder a tu portal docente.</p>
          
          <div class="footer">
            Avante School Management (ASM) • Plataforma Escolar<br>
            © 2026 Todos los derechos reservados.
          </div>
        </div>
      </body>
      </html>
    `;

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: fromAddress,
          to: recipientEmail,
          subject: `[ASM] Código de Activación Docente (${levelName}): ${otpCode}`,
          text: `Hola ${teacherName}, tu código para activar tu cuenta de maestro(a) en ${schoolName} es: ${otpCode}.`,
          html: htmlContent,
        });

        console.log(`✉️ [SMTP EXTERNO] Invitación Docente enviada a: ${recipientEmail} (ID: ${info.messageId})`);
        const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
        return {
          messageId: info.messageId,
          previewUrl,
        };
      } catch (err: any) {
        console.warn(`⚠️ [SMTP ERROR] Falló envío externo (${err.message}). Usando entrega en consola local.`);
      }
    }

    // Fallback Consola Local
    console.log(`\n=============================================================`);
    console.log(`✉️ [DEV LOCAL] VERIFICACIÓN DE MAESTRO(A) / DOCENTE`);
    console.log(`Maestro(a):   ${teacherName}`);
    console.log(`Nivel:        ${levelName}`);
    console.log(`Asignatura:   ${subjectName}`);
    console.log(`Destinatario: ${recipientEmail}`);
    console.log(`Institución:  ${schoolName}`);
    console.log(`CÓDIGO OTP:   🔑 ${otpCode}`);
    console.log(`=============================================================\n`);

    return {
      messageId: `dev-local-teacher-${Date.now()}`,
      devMode: true,
    };
  }

  public async sendAdmissionConfirmationEmail(params: {
    recipientEmail: string;
    parentName: string;
    studentName: string;
    levelName: string;
    grade: string;
    folio: string;
    schoolName: string;
    paymentMethod: string;
    amount: number;
    reference: string;
    speiClabe: string;
    bankName: string;
  }): Promise<{ messageId: string; devMode?: boolean; previewUrl?: string; htmlContent: string; subject: string }> {
    const transporter = await this.getTransporter();

    const configuredFrom = this.cleanEnv(process.env.SMTP_FROM || process.env.EMAIL_FROM);
    const userEmail = this.cleanEnv(process.env.SMTP_USER);
    const fromAddress = configuredFrom || userEmail || `"Admisiones ${params.schoolName}" <admisiones@avanteschoolmanagement.com>`;

    const subject = `[${params.schoolName}] Cédula de Preinscripción y Ficha de Pago - Folio: ${params.folio}`;

    const formattedAmount = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(params.amount);

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Cédula de Preinscripción y Admisión - ${params.schoolName}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1e293b; border: 1px solid #334155; border-radius: 20px; padding: 32px; color: #f8fafc; }
          .header { text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 24px; }
          .logo-badge { display: inline-block; background-color: #0284c7; color: #ffffff; font-weight: 800; font-size: 14px; padding: 6px 14px; border-radius: 8px; margin-bottom: 12px; }
          h1 { font-size: 20px; font-weight: 800; color: #ffffff; margin: 0 0 6px; }
          .school-title { font-size: 14px; color: #94a3b8; margin: 0; }
          .status-badge { display: inline-block; background-color: #065f46; color: #34d399; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-top: 10px; }
          .folio-box { background: #0f172a; border: 2px dashed #0284c7; border-radius: 14px; padding: 16px; text-align: center; margin: 20px 0; }
          .folio-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 4px; }
          .folio-code { font-family: monospace; font-size: 26px; font-weight: 900; color: #38bdf8; letter-spacing: 2px; }
          .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #38bdf8; margin: 20px 0 10px; border-bottom: 1px solid #334155; padding-bottom: 6px; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
          .data-table td { padding: 8px 10px; border-bottom: 1px solid #1e293b; }
          .data-table td.label { color: #94a3b8; width: 40%; }
          .data-table td.value { color: #f8fafc; font-weight: 600; }
          .payment-card { background: linear-gradient(135deg, rgba(2,132,199,0.1) 0%, rgba(15,23,42,0.9) 100%); border: 1px solid #0284c7; border-radius: 14px; padding: 18px; margin: 20px 0; }
          .payment-amount { font-size: 22px; font-weight: 800; color: #34d399; margin: 6px 0; }
          .clabe-box { background: #0f172a; border-radius: 8px; padding: 10px 14px; font-family: monospace; font-size: 15px; color: #fbbf24; font-weight: 700; margin: 8px 0; letter-spacing: 1px; }
          .docs-list { background: #0f172a; border-radius: 12px; padding: 14px 18px; font-size: 12px; color: #cbd5e1; line-height: 1.6; }
          .footer { margin-top: 28px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #334155; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-badge">AVANTE SCHOOL MANAGEMENT</div>
            <h1>Cédula de Admisión y Ficha de Preinscripción</h1>
            <p class="school-title">${params.schoolName} • Ciclo Escolar 2026 - 2027</p>
            <div class="status-badge">✓ SOLICITUD REGISTRADA CON ÉXITO</div>
          </div>

          <p>Estimado(a) <strong>${params.parentName}</strong>,</p>
          <p>Hemos recibido formalmente la solicitud de ingreso para el(la) aspirante <strong>${params.studentName}</strong>. A continuación detallamos los datos registrados y la ficha oficial para concretar el proceso de inscripción:</p>

          <div class="folio-box">
            <div class="folio-label">Folio Oficial de Preinscripción</div>
            <div class="folio-code">${params.folio}</div>
          </div>

          <div class="section-title">Datos del Aspirante</div>
          <table class="data-table">
            <tr>
              <td class="label">Aspirante:</td>
              <td class="value">${params.studentName}</td>
            </tr>
            <tr>
              <td class="label">Nivel Escolar:</td>
              <td class="value">${params.levelName}</td>
            </tr>
            <tr>
              <td class="label">Grado Solicitado:</td>
              <td class="value">${params.grade}</td>
            </tr>
            <tr>
              <td class="label">Padre / Tutor:</td>
              <td class="value">${params.parentName}</td>
            </tr>
            <tr>
              <td class="label">Correo de Notificación:</td>
              <td class="value">${params.recipientEmail}</td>
            </tr>
          </table>

          <div class="section-title">Ficha Oficial de Pago de Inscripción</div>
          <div class="payment-card">
            <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">Cuota de Matrícula / Preinscripción</div>
            <div class="payment-amount">${formattedAmount}</div>
            <p style="font-size: 12px; color: #cbd5e1; margin: 4px 0 10px;">
              Método seleccionado: <strong>${params.paymentMethod}</strong>
            </p>
            <div style="font-size: 12px; color: #94a3b8;">CLABE Interbancaria SPEI (Receptor: ${params.bankName}):</div>
            <div class="clabe-box">${params.speiClabe}</div>
            <div style="font-size: 12px; color: #94a3b8;">Referencia de Pago: <strong style="color:#ffffff;">${params.reference}</strong></div>
            <div style="font-size: 12px; color: #94a3b8;">Concepto: <strong style="color:#ffffff;">ADM ${params.folio}</strong></div>
          </div>

          <div class="section-title">Documentación Requerida (Cotejo Escolar SEP)</div>
          <div class="docs-list">
            <div>📄 <strong>Acta de Nacimiento</strong> (Copia certificada reciente)</div>
            <div>📄 <strong>CURP Certificada por RENAPO</strong> (Impresión reciente)</div>
            <div>📄 <strong>Cartilla Nacional de Vacunación / Salud</strong></div>
            <div>📄 <strong>Comprobante de Domicilio Vigente</strong> (&lt; 3 meses)</div>
            <div>📄 <strong>Boleta o Certificado de Estudios Previos</strong> (en caso de aplicar)</div>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-top: 18px;">
            Una vez realizado el depósito o transferencia, el departamento de Admisiones de <strong>${params.schoolName}</strong> te contactará para formalizar la entrega de documentación y fecha de bienvenida.
          </p>

          <div class="footer">
            ${params.schoolName} • Plataforma Avante School Management<br>
            Este correo es un comprobante oficial de registro de solicitud de admisión. Consérvalo para aclaraciones futuras.
          </div>
        </div>
      </body>
      </html>
    `;

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: fromAddress,
          to: params.recipientEmail,
          subject,
          text: `Cédula de Preinscripción ${params.schoolName}. Aspirante: ${params.studentName}. Folio: ${params.folio}. Monto: ${formattedAmount}. CLABE SPEI: ${params.speiClabe}, Ref: ${params.reference}.`,
          html: htmlContent,
        });

        console.log(`✉️ [SMTP EXTERNO] Ficha de Admisión enviada a: ${params.recipientEmail} (ID: ${info.messageId})`);
        const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
        return {
          messageId: info.messageId,
          previewUrl,
          htmlContent,
          subject,
        };
      } catch (err: any) {
        console.warn(`⚠️ [SMTP ERROR] Falló envío externo de ficha de admisión (${err.message}). Registrando en consola local.`);
      }
    }

    // Fallback Consola Local (Dev Mode)
    console.log(`\n=============================================================`);
    console.log(`✉️ [DEV LOCAL] CÉDULA DE ADMISIÓN Y FICHA DE PAGO`);
    console.log(`Institución:  ${params.schoolName}`);
    console.log(`Aspirante:    ${params.studentName} (${params.levelName} - ${params.grade})`);
    console.log(`Folio:        ⭐ ${params.folio}`);
    console.log(`Tutor:        ${params.parentName}`);
    console.log(`Destinatario: ${params.recipientEmail}`);
    console.log(`Monto Cuota:  ${formattedAmount} (${params.paymentMethod})`);
    console.log(`CLABE SPEI:   ${params.speiClabe}`);
    console.log(`Referencia:   ${params.reference}`);
    console.log(`=============================================================\n`);

    return {
      messageId: `dev-local-admission-${Date.now()}`,
      devMode: true,
      htmlContent,
      subject,
    };
  }
}

export const emailService = new EmailService();


