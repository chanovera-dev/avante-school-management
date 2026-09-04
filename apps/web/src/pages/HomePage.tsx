import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  WifiOff,
  QrCode,
  GraduationCap,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="home-page">
      {/* 1. Header / Navbar */}
      <nav className="home-navbar">
        <div className="container-app home-nav-content">
          <div className="brand-logo" onClick={() => onNavigate('home')}>
            <div className="brand-icon">ASM</div>
            <div>
              <div className="brand-title">Avante School Management</div>
              <div className="brand-subtitle">Plataforma SaaS Escolar Offline-First</div>
            </div>
          </div>

          <div className="nav-links">
            <a href="#caracteristicas">Características</a>
            <a href="#niveles">Niveles Educativos</a>
            <a href="#offline">Modo Offline</a>
            <a href="#codi">Cobro CoDi (0%)</a>
          </div>

          <div className="nav-actions">
            <button
              onClick={() => onNavigate('login')}
              className="btn btn-ghost"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-primary"
            >
              Registrar mi Colegio
              <ArrowRight />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="container-app hero-section">
        <div className="hero-glow" />

        <div className="badge badge-sky">
          <Sparkles />
          Plan de Lanzamiento 100% Gratuito para Colegios
        </div>

        <h1 className="hero-title">
          La gestión escolar que <strong className="text-gradient">nunca se detiene</strong>, con o sin Internet.
        </h1>

        <p className="hero-description">
          Avante School Management (ASM) unifica control escolar, calificaciones, admisiones y cobranza con{' '}
          <strong>cobro digital CoDi (0% comisión)</strong> y{' '}
          <strong>continuidad operativa offline</strong> para Guardería, Kínder, Primaria, Secundaria y Preparatoria.
        </p>

        <div className="hero-cta-group">
          <button
            onClick={() => onNavigate('register')}
            className="btn btn-primary btn-lg"
          >
            Crear Cuenta de Escuela Gratis
            <ArrowRight />
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn btn-secondary btn-lg"
          >
            Explorar Demo en Vivo
            <ChevronRight />
          </button>
        </div>

        <div className="hero-bullets">
          <div className="bullet-item">
            <CheckCircle2 />
            <p>Sin tarjeta de crédito requerida</p>
          </div>
          <div className="bullet-item">
            <CheckCircle2 />
            <p>Configuración en menos de 3 minutos</p>
          </div>
          <div className="bullet-item">
            <CheckCircle2 />
            <p>Verificación de correo inmediata</p>
          </div>
        </div>
      </section>

      {/* 3. Pilares Diferenciales */}
      <section id="caracteristicas" className="features-section">
        <div className="container-app">
          <div className="section-header">
            <h2 className="section-tag">Diseñado para la Realidad Escolar</h2>
            <p className="section-title">Todo lo que tu institución necesita en un solo lugar</p>
          </div>

          <div className="features-grid">
            {/* Tarjeta 1: Offline First */}
            <div className="feature-card">
              <div className="feature-icon-wrapper primary">
                <WifiOff />
              </div>
              <h3>Continuidad Offline Total</h3>
              <p>
                ¿Se cayó el Internet en el colegio? Los docentes pueden seguir pasando lista, capturando notas y en caja cobrar en efectivo emitiendo recibos provisionales locales. Todo se sincroniza automáticamente al volver la red.
              </p>
            </div>

            {/* Tarjeta 2: CoDi Banxico */}
            <div className="feature-card">
              <div className="feature-icon-wrapper emerald">
                <QrCode />
              </div>
              <h3>Cobranza con CoDi® (0% Comisión)</h3>
              <p>
                Permite a los padres pagar colegiaturas al instante escaneando un código QR desde su app bancaria (BBVA, Banamex, Santander). Cero comisiones para el colegio y acreditación en tiempo real.
              </p>
            </div>

            {/* Tarjeta 3: Admisiones e Inscripción Condicionada */}
            <div className="feature-card">
              <div className="feature-icon-wrapper indigo">
                <GraduationCap />
              </div>
              <h3>Inscripciones con Carta Compromiso</h3>
              <p>
                No pierdas alumnos por certificados en trámite oficial. Registra inscripciones condicionadas con prórroga documental, asignación de matrícula y cobro de cuota inicial sin bloqueos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Niveles Educativos */}
      <section id="niveles" className="container-app levels-section">
        <div className="section-header section-header-mb">
          <h2 className="section-tag">Flexibilidad Total</h2>
          <p className="section-title">De Guardería a Preparatoria en una Sola Plataforma</p>
        </div>

        <div className="levels-grid">
          {[
            { name: 'Guardería', desc: 'Control de asistencia y ficha médica infantil' },
            { name: 'Kínder / Preescolar', desc: 'Evaluación cualitativa y rúbricas' },
            { name: 'Primaria', desc: 'Pase de lista diario y boletas SEP' },
            { name: 'Secundaria', desc: 'Materias por hora y control de inasistencias' },
            { name: 'Preparatoria', desc: 'Grupos base y talleres optativos multigrupo' },
          ].map((lvl, idx) => (
            <div key={idx} className="level-card">
              <div className="level-name">{lvl.name}</div>
              <p className="level-desc">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA Final */}
      <section className="cta-section">
        <div className="container-app">
          <div className="cta-content">
            <h2>Comienza a digitalizar tu colegio hoy mismo</h2>
            <p>
              Únete a las instituciones educativas que ya gestionan sus cobranzas, grupos y alumnos con la velocidad de Avante School Management.
            </p>
            <button
              onClick={() => onNavigate('register')}
              className="btn btn-primary btn-lg"
            >
              Registrar mi Colegio Gratis
              <ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="site-footer">
        <div className="container-app footer-content">
          <div className="footer-brand-info">
            <p className="footer-brand-name">Avante School Management (ASM)</p>
            <p>•</p>
            <p>© 2026 Todos los derechos reservados</p>
          </div>
          <div className="footer-host">
            Host: avanteschoolmanagement.local
          </div>
        </div>
      </footer>
    </div>
  );
};
