import React from 'react';
import {
  Building2,
  ShieldCheck,
  WifiOff,
  QrCode,
  GraduationCap,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Zap,
  BarChart3,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal') => void;
}


export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-sky-500 selection:text-white">
      {/* 1. Header / Navbar de la Landing Page */}
      <nav className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-slate-900/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-gradient-to-tr from-sky-600 to-cyan-500 text-white font-black text-2xl w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/20">
              ASM
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                Avante School Management
              </span>
              <span className="text-[11px] text-sky-400 font-mono block">Plataforma SaaS Escolar Offline-First</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#caracteristicas" className="hover:text-white transition-colors">Características</a>
            <a href="#niveles" className="hover:text-white transition-colors">Niveles Educativos</a>
            <a href="#offline" className="hover:text-white transition-colors">Modo Offline</a>
            <a href="#codi" className="hover:text-white transition-colors">Cobro CoDi (0%)</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="text-slate-300 hover:text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2"
            >
              <span>Registrar mi Colegio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-xs font-semibold mb-8 shadow-inner animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Plan de Lanzamiento 100% Gratuito para Colegios</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.15]">
          La gestión escolar que <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400">nunca se detiene</span>, con o sin Internet.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Avante School Management (ASM) unifica control escolar, calificaciones, admisiones y cobranza con 
          <strong className="text-white"> cobro digital CoDi (0% comisión)</strong> y 
          <strong className="text-white"> continuidad operativa offline</strong> para Guardería, Kínder, Primaria, Secundaria y Preparatoria.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('register')}
            className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
          >
            <span>Crear Cuenta de Escuela Gratis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto bg-slate-800/90 hover:bg-slate-750 text-white font-bold text-base px-8 py-4 rounded-2xl border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <span>Explorar Demo en Vivo</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Sin tarjeta de crédito requerida</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Configuración en menos de 3 minutos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verificación de correo inmediata</span>
          </div>
        </div>
      </section>

      {/* 3. Pilares Diferenciales (Grid de 3 Columnas) */}
      <section id="caracteristicas" className="py-20 bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-sky-400 font-extrabold mb-3">Diseñado para la Realidad Escolar</h2>
            <p className="text-3xl sm:text-4xl font-black text-white">Todo lo que tu institución necesita en un solo lugar</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1: Offline First */}
            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-sky-500/50 transition-all">
              <div className="bg-sky-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <WifiOff className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Continuidad Offline Total</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                ¿Se cayó el Internet en el colegio? Los docentes pueden seguir pasando lista, capturando notas y en caja cobrar en efectivo emitiendo recibos provisionales locales. Todo se sincroniza automáticamente al volver la red.
              </p>
            </div>

            {/* Tarjeta 2: CoDi Banxico */}
            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-all">
              <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <QrCode className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Cobranza con CoDi® (0% Comisión)</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Permite a los padres pagar colegiaturas al instante escaneando un código QR desde su app bancaria (BBVA, Banamex, Santander). Cero comisiones para el colegio y acreditación en tiempo real.
              </p>
            </div>

            {/* Tarjeta 3: Admisiones e Inscripción Condicionada */}
            <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-500/50 transition-all">
              <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inscripciones con Carta Compromiso</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No pierdas alumnos por certificados en trámite oficial. Registra inscripciones condicionadas con prórroga documental, asignación de matrícula y cobro de cuota inicial sin bloqueos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Niveles Educativos Cubiertos */}
      <section id="niveles" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest text-sky-400 font-extrabold mb-3">Flexibilidad Total</h2>
          <p className="text-3xl font-black text-white">De Guardería a Preparatoria en una Sola Plataforma</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { name: 'Guardería', desc: 'Control de asistencia y ficha médica infantil' },
            { name: 'Kínder / Preescolar', desc: 'Evaluación cualitativa y rúbricas' },
            { name: 'Primaria', desc: 'Pase de lista diario y boletas SEP' },
            { name: 'Secundaria', desc: 'Materias por hora y control de inasistencias' },
            { name: 'Preparatoria', desc: 'Grupos base y talleres optativos multigrupo' },
          ].map((lvl, idx) => (
            <div key={idx} className="bg-slate-800/60 border border-slate-700/80 p-5 rounded-2xl text-center">
              <div className="text-sky-400 font-black text-lg mb-1">{lvl.name}</div>
              <p className="text-slate-400 text-xs">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Final */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
            Comienza a digitalizar tu colegio hoy mismo
          </h2>
          <p className="text-slate-300 text-base mb-8 max-w-2xl mx-auto">
            Únete a las instituciones educativas que ya gestionan sus cobranzas, grupos y alumnos con la velocidad de Avante School Management.
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-lg px-9 py-4 rounded-2xl shadow-xl shadow-sky-500/25 transition-all inline-flex items-center gap-3"
          >
            <span>Registrar mi Colegio Gratis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-slate-800 py-8 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Avante School Management (ASM)</span>
            <span>•</span>
            <span>© 2026 Todos los derechos reservados</span>
          </div>
          <div className="font-mono text-slate-400">
            Host: avanteschoolmanagement.local
          </div>
        </div>
      </footer>
    </div>
  );
};
