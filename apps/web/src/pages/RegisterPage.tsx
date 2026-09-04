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

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate, onSchoolRegistered }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [schoolName, setSchoolName] = useState('Instituto Logos');
  const [subdomain, setSubdomain] = useState('institutologos');
  const [directorName, setDirectorName] = useState('Director General');
  const [email, setEmail] = useState('institutologoscoatzacoalcos@gmail.com');
  
  // Selector de País
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // México
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [phoneNumber, setPhoneNumber] = useState('921 123 4567');
  const [password, setPassword] = useState('Admin123!');
  const [confirmPassword, setConfirmPassword] = useState('Admin123!');
  
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

  const fullPhone = `${selectedCountry.code} ${phoneNumber}`;

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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 py-4">
        <div className="container-app flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-sky-600 text-white font-black text-xl w-9 h-9 rounded-xl flex items-center justify-center">
              ASM
            </div>
            <span className="font-extrabold text-lg text-white">Avante School Management</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">¿Ya tienes cuenta de colegio?</span>
            <button
              onClick={() => onNavigate('login')}
              className="text-sky-400 hover:text-sky-300 font-bold hover:underline"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-xl w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative">
          {/* Badge Superior */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950 text-sky-400 border border-sky-800/80">
              <Sparkles className="w-3.5 h-3.5" />
              Paso {step} de 2 • Plan Lanzamiento Gratuito
            </span>
            <span className="text-xs text-slate-500 font-mono">Paso {step}/2</span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-bold block mb-0.5">Atención:</strong>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {step === 1 ? (
            /* PASO 1: DATOS DE LA ESCUELA Y DIRECTOR */
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">Registra tu Colegio</h1>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Crea el entorno de tu escuela en Avante School Management con subdominio propio.
              </p>

              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Nombre Oficial de la Institución
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Ej. Instituto Logos"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Subdominio para tu Escuela
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-hidden focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500">
                    <input
                      type="text"
                      required
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      placeholder="institutologos"
                      className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white outline-none font-mono"
                    />
                    <span className="bg-slate-800 text-slate-400 text-xs px-3 py-2.5 border-l border-slate-700 font-mono">
                      .avanteschoolmanagement.local
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Nombre del Director o Administrador
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={directorName}
                      onChange={(e) => setDirectorName(e.target.value)}
                      placeholder="Director General"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none"
                    />
                  </div>
                </div>

                {/* Teléfono Institucional */}
                <div className="relative" ref={dropdownRef}>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Teléfono Institucional
                  </label>
                  <div className="flex items-center bg-slate-950 border border-slate-700 rounded-xl overflow-visible focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500 transition-all">
                    {/* Botón Trigger de País */}
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="bg-slate-900 hover:bg-slate-850 border-r border-slate-800 flex items-center gap-1.5 px-3 py-2.5 rounded-l-xl transition-colors cursor-pointer shrink-0"
                    >
                      <span className="text-lg leading-none">{selectedCountry.flag}</span>
                      <span className="text-xs font-mono font-bold text-slate-200">{selectedCountry.code}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                          isCountryDropdownOpen ? 'rotate-180 text-sky-400' : ''
                        }`}
                      />
                    </button>

                    {/* Input de Número */}
                    <div className="relative flex-1 flex items-center">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={selectedCountry.placeholder}
                        className="w-full bg-transparent pl-10 pr-4 py-2.5 text-sm text-white outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Menú Desplegable Flotante */}
                  {isCountryDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-72 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="relative mb-2">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          autoFocus
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          placeholder="Buscar país o código..."
                          className="w-full bg-slate-950 border border-slate-750 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-sky-500"
                        />
                      </div>

                      <div className="max-h-52 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
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
                                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all ${
                                  isSelected
                                    ? 'bg-sky-500/15 text-sky-300 font-bold border border-sky-500/30'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 truncate">
                                  <span className="text-base leading-none shrink-0">{c.flag}</span>
                                  <span className="truncate">{c.name}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-2 font-mono">
                                  <span className="text-slate-400 text-[11px]">{c.code}</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <div className="text-center py-4 text-xs text-slate-500">
                            No se encontraron países
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                    Correo Electrónico del Director
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="director@colegio.edu.mx"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none"
                    />
                  </div>
                </div>

                {/* Contraseñas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                      Contraseña de Acceso
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-sky-500 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                      Confirmar Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repite tu contraseña"
                        className={`w-full bg-slate-950 border rounded-xl pl-10 pr-4 py-2.5 text-sm text-white outline-none font-mono transition-colors ${
                          confirmPassword && password !== confirmPassword
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-slate-700 focus:border-sky-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <p className="text-[11px] text-red-400 font-medium">
                    ⚠️ Las contraseñas aún no coinciden.
                  </p>
                )}

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Generando código de verificación...</span>
                      </>
                    ) : (
                      <>
                        <span>Continuar a Verificación</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* PASO 2: VERIFICACIÓN DE CORREO (CÓDIGO OTP) */
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/30 rounded-2xl mx-auto flex items-center justify-center text-sky-400 mb-4">
                <MailCheck className="w-8 h-8" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Verifica tu Correo</h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-4">
                Hemos enviado un código de seguridad de 6 dígitos para <strong className="text-white">{email}</strong>.
              </p>

              {/* Indicador de desarrollo local */}
              {devOtpCode && (
                <div className="bg-sky-950/80 border border-sky-800/90 p-3 rounded-2xl text-left mb-6 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-sky-300 font-medium">
                    <Terminal className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Código entregado en consola (Modo Local):</span>
                  </div>
                  <strong className="text-sm font-mono font-black text-sky-400 tracking-widest bg-sky-900/80 px-2.5 py-0.5 rounded border border-sky-700">
                    {devOtpCode}
                  </strong>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-2">
                    Ingresa el Código de 6 Dígitos
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    autoFocus
                    value={inputOtp}
                    onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-56 mx-auto text-center font-mono text-3xl font-black tracking-widest bg-slate-950 border-2 border-sky-500 rounded-2xl py-3 text-white outline-none focus:ring-4 focus:ring-sky-500/20"
                    placeholder="------"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                    className="flex-1 bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Regresar</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 disabled:opacity-50 text-slate-950 font-black text-sm py-3 rounded-xl shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Verificando...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verificar y Activar Escuela</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-xs text-slate-400 hover:text-sky-400 font-medium flex items-center justify-center gap-1.5 mx-auto transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Reenviar código</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        <div className="container-app">
          Avante School Management (ASM) • Dominio de desarrollo: avanteschoolmanagement.local
        </div>
      </footer>
    </div>
  );
};
