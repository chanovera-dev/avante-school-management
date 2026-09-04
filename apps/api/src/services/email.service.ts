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
}

export const emailService = new EmailService();


