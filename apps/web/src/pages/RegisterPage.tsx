import React, { useState, useRef, useEffect } from 'react';
import {
  Building2,
  MailCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
  Phone,
  User,
  Sparkles,
  ArrowLeft,
  Mail,
  RefreshCw,
  AlertCircle,
  Search,
  Check,
  ChevronDown,
  Loader2,
  Terminal
} from 'lucide-react';

interface RegisterPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard') => void;
  onSchoolRegistered: (school: {
    id: string;
    name: string;
    subdomain: string;
    adminEmail: string;
    levelsOffered?: string[];
  }) => void;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  placeholder: string;
}

const COUNTRIES: Country[] = [
  { code: '+52', name: 'México', flag: '🇲🇽', placeholder: '55 1234 5678' },
  { code: '+1', name: 'Estados Unidos / Canadá', flag: '🇺🇸', placeholder: '555 123 4567' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴', placeholder: '300 123 4567' },
  { code: '+34', name: 'España', flag: '🇪🇸', placeholder: '612 345 678' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷', placeholder: '11 1234 5678' },
  { code: '+56', name: 'Chile', flag: '🇨🇱', placeholder: '9 1234 5678' },
  { code: '+51', name: 'Perú', flag: '🇵🇪', placeholder: '912 345 678' },
  { code: '+502', name: 'Guatemala', flag: '🇬🇹', placeholder: '5123 4567' },
  { code: '+504', name: 'Honduras', flag: '🇭🇳', placeholder: '9123 4567' },
  { code: '+503', name: 'El Salvador', flag: '🇸🇻', placeholder: '7123 4567' },
  { code: '+505', name: 'Nicaragua', flag: '🇳🇮', placeholder: '8123 4567' },
  { code: '+506', name: 'Costa Rica', flag: '🇨🇷', placeholder: '8123 4567' },
  { code: '+507', name: 'Panamá', flag: '🇵🇦', placeholder: '6123 4567' },
  { code: '+593', name: 'Ecuador', flag: '🇪🇨', placeholder: '99 123 4567' },
  { code: '+591', name: 'Bolivia', flag: '🇧🇴', placeholder: '7123 4567' },
  { code: '+595', name: 'Paraguay', flag: '🇵🇾', placeholder: '981 123 456' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾', placeholder: '99 123 456' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪', placeholder: '412 123 4567' },
  { code: '+1809', name: 'Rep. Dominicana', flag: '🇩🇴', placeholder: '809 123 4567' },
];

const AVAILABLE_LEVELS = [
  { id: 'GUARDERIA', name: 'Guardería / Maternal', desc: 'Lactantes, maternal A y B' },
  { id: 'PREESCOLAR', name: 'Preescolar / Kínder', desc: '1º, 2º y 3º de Kínder' },
  { id: 'PRIMARIA', name: 'Primaria', desc: '1º a 6º de Primaria' },
  { id: 'SECUNDARIA', name: 'Secundaria', desc: '1º a 3º de Secundaria' },
  { id: 'PREPARATORIA', name: 'Preparatoria / Bachillerato', desc: '1º a 6º Semestre' },
];

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onSchoolRegistered }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [schoolName, setSchoolName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  
  // Selector de País
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // México
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [inputOtp, setInputOtp] = useState('');
  const [devOtpCode, setDevOtpCode] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  const toggleLevel = (id: string) => {
    setSelectedLevels((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fullPhone = phoneNumber ? `${selectedCountry.code} ${phoneNumber}` : '';

  // 1. Envío al Backend Fastify: POST /api/onboarding/register-school
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!schoolName || !subdomain || !directorName || !email || !phoneNumber || !password || !confirmPassword) {
      setErrorMessage('Por favor completa todos los campos requeridos.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe contener al menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden. Por favor asegúrate de escribir la misma contraseña en ambos campos.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/onboarding/register-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName,
          subdomain,
          adminFullName: directorName,
          adminEmail: email,
          adminPassword: password,
          adminPhone: fullPhone,
          levelsOffered: selectedLevels,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar la institución.');
      }

      setDevOtpCode(data.devOtpCode || null);
      setInputOtp(''); // Campo vacío para que el usuario escriba
      setSuccessMessage(`¡Código de verificación generado para ${email}!`);
      setStep(2);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Verificación Real al Backend Fastify: POST /api/onboarding/verify-email
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!inputOtp || inputOtp.length !== 6) {
      setErrorMessage('Por favor introduce los 6 dígitos del código de verificación.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/onboarding/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          code: inputOtp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'El código ingresado es inválido o ha expirado.');
      }

      // Guardar token JWT en localStorage
      if (data.token) {
        localStorage.setItem('asm_token', data.token);
      }

      onSchoolRegistered({
        id: data.tenant.id,
        name: data.tenant.name,
        subdomain: data.tenant.subdomain,
        adminEmail: data.user.email,
        levelsOffered: data.tenant.levelsOffered || selectedLevels,
      });

      onNavigate('dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al validar el código.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Reenvío de Código
  const handleResendCode = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/onboarding/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al reenviar el código.');
      }

      setDevOtpCode(data.devOtpCode || null);
      setInputOtp('');
      setSuccessMessage('Nuevo código generado.');
    } catch (err: any) {
      setErrorMessage(err.message || 'No se pudo reenviar el código.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Glows */}
      <div className="auth-glow-top-left" />
      <div className="auth-glow-bottom-right" />

      {/* Header */}
      <header className="auth-header">
        <div className="container-app auth-header-inner">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="brand-logo">
              ASM
            </div>
            <div className="brand-title">Avante School Management</div>
          </div>
          <div className="auth-header-action">
            <p className="auth-header-question">¿Ya tienes cuenta de colegio?</p>
            <button
              onClick={() => onNavigate('login')}
              className="btn btn-primary btn-sm"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="auth-main">
        <div className="auth-card auth-card-wide">
          {/* Badge Superior */}
          <div className="flex-row-between mb-3">
            <div className="badge badge-sky">
              <Sparkles />
              Paso {step} de 2 • Plan Lanzamiento Gratuito
            </div>
            <div className="font-mono text-muted">Paso {step}/2</div>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">
              <AlertCircle />
              <div>
                <p className="font-bold m-0">Atención:</p>
                <p className="m-0">{errorMessage}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              <CheckCircle2 />
              <p className="m-0">{successMessage}</p>
            </div>
          )}

          {step === 1 ? (
            /* PASO 1: DATOS DE LA ESCUELA Y DIRECTOR */
            <div>
              <h1 className="auth-title">Registra tu Colegio</h1>
              <p className="auth-subtitle mb-4">
                Crea el entorno de tu escuela en Avante School Management con subdominio propio.
              </p>

              <form onSubmit={handleStep1Submit} className="auth-form">
                <div className="form-group mb-0">
                  <label className="form-label">
                    Nombre Oficial de la Institución
                  </label>
                  <div className="auth-input-wrapper">
                    <Building2 className="input-icon" />
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ej. Instituto Logos"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">
                    Subdominio para tu Escuela
                  </label>
                  <div className="reg-subdomain-group">
                    <input
                      type="text"
                      required
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="institutologos"
                    />
                    <div className="reg-subdomain-suffix">
                      .avanteschoolmanagement.local
                    </div>
                  </div>
                </div>

                {/* Niveles Educativos que Oferta el Colegio */}
                <div className="form-group mb-0 reg-levels-container">
                  <label className="form-label">
                    Niveles Educativos que Imparte el Colegio
                  </label>
                  <p className="text-muted text-xs mb-2">
                    Selecciona los niveles que ofrece tu institución para crear sus módulos de gestión:
                  </p>
                  <div className="reg-levels-grid">
                    {AVAILABLE_LEVELS.map((lvl) => {
                      const isSelected = selectedLevels.includes(lvl.id);
                      return (
                        <button
                          key={lvl.id}
                          type="button"
                          onClick={() => toggleLevel(lvl.id)}
                          className={`reg-level-card ${isSelected ? 'selected' : ''}`}
                        >
                          <div className="reg-level-header">
                            <div className="reg-level-name">{lvl.name}</div>
                            <div className="reg-level-check">
                              <Check />
                            </div>
                          </div>
                          <div className="reg-level-desc">{lvl.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">
                    Nombre del Director o Administrador
                  </label>
                  <div className="auth-input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      required
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                      placeholder="Director General"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Teléfono Institucional */}
                <div className="form-group mb-0" ref={dropdownRef}>
                  <label className="form-label">
                    Teléfono Institucional
                  </label>
                  <div className="reg-phone-wrapper">
                    {/* Botón Trigger de País */}
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="reg-country-btn"
                    >
                      <div className="country-flag">{selectedCountry.flag}</div>
                      <div className="country-code">{selectedCountry.code}</div>
                      <ChevronDown
                        className={isCountryDropdownOpen ? 'rotated' : ''}
                      />
                    </button>

                    {/* Input de Número */}
                    <div className="reg-phone-input-box">
                      <Phone className="input-icon" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={selectedCountry.placeholder}
                      />
                    </div>
                  </div>

                  {/* Menú Desplegable Flotante */}
                  {isCountryDropdownOpen && (
                    <div className="reg-country-dropdown">
                      <div className="reg-country-search">
                        <Search className="input-icon" />
                        <input
                          type="text"
                          autoFocus
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Buscar país o código..."
                          className="form-input"
                        />
                      </div>

                      <div className="reg-country-list">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((c, i) => {
                            const isSelected = selectedCountry.name === c.name;
                            return (
                              <button
                                key={`${c.code}-${i}`}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(c);
                                  setIsCountryDropdownOpen(false);
                                  setCountrySearch('');
                                }}
                                className={`reg-country-item ${isSelected ? 'selected' : ''}`}
                              >
                                <div className="country-item-left">
                                  <div className="country-flag">{c.flag}</div>
                                  <div>{c.name}</div>
                                </div>
                                <div className="country-item-right">
                                  <div>{c.code}</div>
                                  {isSelected && <Check />}
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <div className="text-center text-muted">
                            No se encontraron países
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">
                    Correo Electrónico del Director
                  </label>
                  <div className="auth-input-wrapper">
                    <Mail className="input-icon" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="director@colegio.edu.mx"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="grid-cols-2 gap-4">
                  <div className="form-group mb-0">
                    <label className="form-label">
                      Contraseña de Acceso
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="form-input font-mono"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-0">
                    <label className="form-label">
                      Confirmar Contraseña
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock className="input-icon" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        className="form-input font-mono"
                      />
                    </div>
                  </div>
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <p className="text-danger m-0">
                    ⚠️ Las contraseñas aún no coinciden.
                  </p>
                )}

                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-lg w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Generando código de verificación...
                      </>
                    ) : (
                      <>
                        Continuar a Verificación
                        <ArrowRight />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* PASO 2: VERIFICACIÓN DE CORREO (CÓDIGO OTP) */
            <div className="reg-otp-box">
              <div className="reg-otp-icon">
                <MailCheck />
              </div>

              <h2 className="auth-title mb-1">Verifica tu Correo</h2>
              <p className="auth-subtitle mb-4">
                Hemos enviado un código de seguridad de 6 dígitos para {email}.
              </p>

              {/* Indicador de desarrollo local */}
              {devOtpCode && (
                <div className="reg-otp-dev-box">
                  <div className="flex items-center gap-2">
                    <Terminal />
                    <div>Código entregado en consola (Modo Local):</div>
                  </div>
                  <div className="dev-code">
                    {devOtpCode}
                  </div>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="auth-form w-full">
                <div className="form-group mb-0 text-center">
                  <label className="form-label">
                    Ingresa el Código de 6 Dígitos
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                    className="reg-otp-input"
                    placeholder="------"
                  />
                </div>

                <div className="flex-row-between gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                    className="btn btn-secondary btn-md flex-1"
                  >
                    <ArrowLeft />
                    Regresar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary btn-md flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Verificando...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 />
                        Verificar y Activar Escuela
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-2 text-center">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="auth-footer-btn flex-center m-0"
                  >
                    <RefreshCw className={isLoading ? 'animate-spin' : ''} />
                    Reenviar código
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="auth-footer text-center font-mono">
        <div className="container-app">
          Avante School Management (ASM) • Dominio de desarrollo: avanteschoolmanagement.local
        </div>
      </footer>
    </div>
  );
};

