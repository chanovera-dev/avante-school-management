import React, { useState, useEffect, useRef } from 'react';
import {
  School,
  UserCheck,
  GraduationCap,
  Layers,
  CalendarCheck,
  Award,
  ClipboardList,
  CalendarDays,
  Megaphone,
  QrCode,
  Users,
  HeartHandshake,
  MessageSquareQuote,
  PartyPopper,
  UserPlus,
  BookOpen,
  Bus,
  Utensils,
  Stethoscope,
  Trophy,
  DollarSign,
  Percent,
  ScrollText,
  Box,
  Hammer,
  Briefcase,
  ShieldAlert,
  ShieldCheck,
  Landmark,
  Search,
  X,
  LayoutGrid,
  Sparkles,
} from 'lucide-react';

export type TabType =
  | 'levels'
  | 'teachers'
  | 'attendance'
  | 'grades'
  | 'notices'
  | 'credentials'
  | 'tasks'
  | 'schedules'
  | 'admissions'
  | 'library'
  | 'transport'
  | 'cafeteria'
  | 'infirmary'
  | 'workshops'
  | 'inventory'
  | 'surveys'
  | 'events'
  | 'recruitment'
  | 'safety'
  | 'community'
  | 'maintenance'
  | 'scholarships'
  | 'certificates'
  | 'audit'
  | 'academic'
  | 'finance'
  | 'groups'
  | 'parent'
  | 'superadmin';

export type CategoryType = 'role' | 'academic' | 'community' | 'campus' | 'management' | 'all';

export interface ModuleDef {
  id: TabType;
  label: string;
  category: 'academic' | 'community' | 'campus' | 'management';
  icon: React.ComponentType<{ className?: string }>;
  keywords: string;
  countKey?: string;
}

export const MODULES: ModuleDef[] = [
  // 1. GESTIÓN ACADÉMICA
  { id: 'levels', label: 'Niveles & Directores', category: 'academic', icon: School, keywords: 'direcciones tecnicas directores escolar nivel', countKey: 'levels' },
  { id: 'teachers', label: 'Docentes & Maestros', category: 'academic', icon: UserCheck, keywords: 'profesores maestros docentes titular', countKey: 'teachers' },
  { id: 'academic', label: 'Alumnos y Expedientes', category: 'academic', icon: GraduationCap, keywords: 'estudiantes alumnos matricula kardex expediente', countKey: 'academic' },
  { id: 'groups', label: 'Grupos Escolares', category: 'academic', icon: Layers, keywords: 'aulas salones grupos grados turnos', countKey: 'groups' },
  { id: 'attendance', label: 'Pase de Lista Diario', category: 'academic', icon: CalendarCheck, keywords: 'asistencia faltas lista retardo diario' },
  { id: 'grades', label: 'Calificaciones & Boletas SEP', category: 'academic', icon: Award, keywords: 'notas boleta sep evaluaciones calificaciones parcial' },
  { id: 'tasks', label: 'Cuaderno de Tareas', category: 'academic', icon: ClipboardList, keywords: 'tareas deberes actividades entregas rubricas', countKey: 'tasks' },
  { id: 'schedules', label: 'Horarios Semanales', category: 'academic', icon: CalendarDays, keywords: 'horarios clases materias bloques horas' },

  // 2. COMUNIDAD Y COMUNICACIÓN
  { id: 'notices', label: 'Circulares & Citatorios', category: 'community', icon: Megaphone, keywords: 'avisos comunicados circulares citatorios noticias', countKey: 'notices' },
  { id: 'credentials', label: 'Credenciales & Accesos QR', category: 'community', icon: QrCode, keywords: 'credenciales gafete carnet torniquete entrada qr', countKey: 'credentials' },
  { id: 'parent', label: 'Portal de Familias', category: 'community', icon: Users, keywords: 'tutor familia padres comunicados portal familiar' },
  { id: 'community', label: 'CEPS & Asambleas', category: 'community', icon: HeartHandshake, keywords: 'ceps comites asambleas asociacion padres', countKey: 'community' },
  { id: 'surveys', label: 'Encuestas & Clima', category: 'community', icon: MessageSquareQuote, keywords: 'encuestas formularios clima escolar satisfaccion preguntas', countKey: 'surveys' },
  { id: 'events', label: 'Eventos & CTE', category: 'community', icon: PartyPopper, keywords: 'eventos cte consejo tecnico calendario escolar festivales', countKey: 'events' },

  // 3. CAMPUS Y SERVICIOS
  { id: 'admissions', label: 'Admisiones & Aspirantes', category: 'campus', icon: UserPlus, keywords: 'admisiones aspirantes nuevo ingreso inscripciones fichas', countKey: 'admissions' },
  { id: 'library', label: 'Biblioteca Escolar', category: 'campus', icon: BookOpen, keywords: 'libros biblioteca prestamos acervo editorial isbn', countKey: 'library' },
  { id: 'transport', label: 'Transporte Escolar', category: 'campus', icon: Bus, keywords: 'rutas camiones choferes transporte paradas', countKey: 'transport' },
  { id: 'cafeteria', label: 'Cafetería & Monedero', category: 'campus', icon: Utensils, keywords: 'cafeteria tienda saldo monedero comida productos comedor', countKey: 'cafeteria' },
  { id: 'infirmary', label: 'Enfermería Escolar', category: 'campus', icon: Stethoscope, keywords: 'enfermeria salud consultas medicamentos alergias medico', countKey: 'infirmary' },
  { id: 'workshops', label: 'Talleres & Academias', category: 'campus', icon: Trophy, keywords: 'talleres extracurriculares deportes musica artes torneos', countKey: 'workshops' },

  // 4. GESTIÓN Y FINANZAS
  { id: 'finance', label: 'Caja Escolar & Arqueo', category: 'management', icon: DollarSign, keywords: 'caja cobros arqueo colegiaturas pagos recibos finanzas' },
  { id: 'scholarships', label: 'Becas SEP & Finanzas', category: 'management', icon: Percent, keywords: 'becas descuento sep comite socioeconomico solicitud', countKey: 'scholarships' },
  { id: 'certificates', label: 'Certificados & Kárdex', category: 'management', icon: ScrollText, keywords: 'certificados digitales constancias kardex folios sep', countKey: 'certificates' },
  { id: 'inventory', label: 'Almacén & Activos', category: 'management', icon: Box, keywords: 'inventario activos conaliteg uniformes libros almacen stock', countKey: 'inventory' },
  { id: 'maintenance', label: 'Mantenimiento & Obras', category: 'management', icon: Hammer, keywords: 'mantenimiento obras reparaciones infraestructura ordenes', countKey: 'maintenance' },
  { id: 'recruitment', label: 'Reclutamiento & RH', category: 'management', icon: Briefcase, keywords: 'vacantes empleo curriculum rh contratacion plazas', countKey: 'recruitment' },
  { id: 'safety', label: 'Protección Civil', category: 'management', icon: ShieldAlert, keywords: 'simulacros proteccion civil emergencias seguridad sismos', countKey: 'safety' },
  { id: 'audit', label: 'Auditoría & Normativa SEP', category: 'management', icon: ShieldCheck, keywords: 'auditoria normativa sep bitacora logs inspeccion supervision', countKey: 'audit' },
  { id: 'superadmin', label: 'SuperAdmin SaaS', category: 'management', icon: Landmark, keywords: 'superadmin escuelas colegios saas multisede platform', countKey: 'superadmin' },
];

const ROLE_MODULES: Record<string, TabType[]> = {
  DOCENTE: ['attendance', 'grades', 'tasks', 'schedules', 'academic', 'notices'],
  FINANZAS: ['finance', 'scholarships', 'cafeteria', 'inventory', 'certificates'],
  CONTROL_ESCOLAR: ['academic', 'groups', 'credentials', 'admissions', 'certificates', 'levels', 'audit'],
  TUTOR: ['parent', 'notices', 'attendance', 'grades', 'tasks', 'credentials'],
  DIRECTOR: ['levels', 'teachers', 'academic', 'attendance', 'grades', 'finance', 'notices', 'safety', 'audit'],
  SUPER_ADMIN: ['superadmin', 'audit', 'levels', 'finance', 'academic', 'teachers'],
};

export interface DashboardNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeRole: string;
  isLevelDirector?: boolean;
  userLevelLabel?: string | null;
  counts?: Record<string, number>;
}

export const DashboardNav: React.FC<DashboardNavProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  isLevelDirector = false,
  userLevelLabel,
  counts = {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('academic');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGridModalOpen, setIsGridModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  // Determinar la categoría a la que pertenece el tab actual
  const currentModule = MODULES.find((m) => m.id === activeTab);
  const currentCategory = currentModule?.category || 'academic';

  // Sincronizar automáticamente la categoría seleccionada cuando activeTab cambia
  useEffect(() => {
    if (selectedCategory !== 'all' && selectedCategory !== 'role') {
      if (currentCategory !== selectedCategory) {
        setSelectedCategory(currentCategory);
      }
    }
  }, [activeTab]);

  // Manejador para cerrar búsqueda al hacer clic fuera o presionar Esc
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsGridModalOpen(false);
      }
      // Atajo Ctrl+K o Cmd+K para abrir búsqueda
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filtrado de submódulos según la categoría activa
  const visibleModules = React.useMemo(() => {
    if (selectedCategory === 'role') {
      const allowed = ROLE_MODULES[activeRole] || ROLE_MODULES.DIRECTOR;
      return MODULES.filter((m) => allowed.includes(m.id));
    }
    if (selectedCategory === 'all') {
      return MODULES;
    }
    return MODULES.filter((m) => m.category === selectedCategory);
  }, [selectedCategory, activeRole]);

  // Resultados de la búsqueda instantánea
  const searchResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return MODULES.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.keywords.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSelectTab = (tabId: TabType) => {
    setActiveTab(tabId);
    setSearchQuery('');
    setIsSearchOpen(false);
    setIsGridModalOpen(false);
  };

  const categoriesConfig: { id: CategoryType; label: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    {
      id: 'role',
      label: 'Para mi Rol',
      icon: Sparkles,
      count: (ROLE_MODULES[activeRole] || ROLE_MODULES.DIRECTOR).length,
    },
    {
      id: 'academic',
      label: 'Académico',
      icon: GraduationCap,
      count: MODULES.filter((m) => m.category === 'academic').length,
    },
    {
      id: 'community',
      label: 'Comunidad',
      icon: Megaphone,
      count: MODULES.filter((m) => m.category === 'community').length,
    },
    {
      id: 'campus',
      label: 'Campus & Vida',
      icon: School,
      count: MODULES.filter((m) => m.category === 'campus').length,
    },
    {
      id: 'management',
      label: 'Gestión & Finanzas',
      icon: Landmark,
      count: MODULES.filter((m) => m.category === 'management').length,
    },
  ];

  return (
    <div className="dashboard-tabs-bar">
      <div className="container-app">
        {/* FILA 1: CATEGORÍAS PRINCIPALES + BUSCADOR + BOTÓN GRID */}
        <div className="dashboard-nav-top">
          <div className="dashboard-category-list">
            {categoriesConfig.map((cat) => {
              const IconComp = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`dashboard-category-btn ${isActive ? 'active' : ''}`}
                >
                  <IconComp />
                  <span>{cat.label}</span>
                  <span className="dashboard-category-pill">{cat.count}</span>
                </button>
              );
            })}
          </div>

          <div className="dashboard-nav-actions" ref={searchWrapperRef}>
            {/* Buscador Rápido de Módulos */}
            <div className="dashboard-nav-search-box">
              <Search className="dashboard-nav-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar módulo... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="dashboard-nav-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="dashboard-nav-search-clear"
                  title="Limpiar búsqueda"
                >
                  <X />
                </button>
              )}

              {/* Resultados Flotantes de Búsqueda */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="dashboard-nav-search-results">
                  <div className="dashboard-nav-search-results-header">
                    Módulos encontrados ({searchResults.length})
                  </div>
                  <div className="dashboard-nav-search-results-list">
                    {searchResults.map((m) => {
                      const IconComp = m.icon;
                      const isTabActive = activeTab === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => handleSelectTab(m.id)}
                          className={`dashboard-search-item ${isTabActive ? 'active' : ''}`}
                        >
                          <div className="dashboard-search-item-left">
                            <IconComp />
                            <span>{m.label}</span>
                          </div>
                          <span className="dashboard-search-item-cat">
                            {m.category === 'academic'
                              ? 'Académico'
                              : m.category === 'community'
                              ? 'Comunidad'
                              : m.category === 'campus'
                              ? 'Campus'
                              : 'Gestión'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Botón Grid Launcher (Explorador de Módulos) */}
            <button
              type="button"
              onClick={() => setIsGridModalOpen(true)}
              className="dashboard-nav-grid-btn"
              title="Explorar todos los 29 módulos organizados"
            >
              <LayoutGrid />
              <span className="desktop-only">Explorar Módulos</span>
            </button>
          </div>
        </div>

        {/* FILA 2: SUBMÓDULOS DE LA CATEGORÍA ACTIVA */}
        <nav className="dashboard-nav-submodules">
          {visibleModules.map((m) => {
            const IconComp = m.icon;
            const isTabActive = activeTab === m.id;
            const count = m.countKey ? counts[m.countKey] : undefined;

            // Etiqueta personalizada para directores de nivel
            let displayLabel = m.label;
            if (m.id === 'levels' && isLevelDirector && userLevelLabel) {
              displayLabel = `Mi Nivel (${userLevelLabel})`;
            }

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectTab(m.id)}
                className={`dashboard-subtab-btn ${isTabActive ? 'active' : ''}`}
              >
                <IconComp />
                <span className="subtab-label">{displayLabel}</span>
                {typeof count === 'number' && count > 0 && (
                  <span className="dashboard-tab-counter">{count}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* MODAL GRID LAUNCHER: VISTA COMPLETA DE TODOS LOS MÓDULOS */}
      {isGridModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsGridModalOpen(false)}>
          <div
            className="dashboard-modules-grid-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dashboard-grid-modal-header">
              <div className="flex items-center gap-2">
                <LayoutGrid className="text-primary" />
                <div>
                  <h3 className="dashboard-grid-modal-title">Explorador de Módulos</h3>
                  <p className="dashboard-grid-modal-subtitle">
                    29 herramientas agrupadas por categoría funcional
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGridModalOpen(false)}
                className="modal-close"
                title="Cerrar"
              >
                <X />
              </button>
            </div>

            <div className="dashboard-grid-modal-body">
              {/* Columna Académico */}
              <div className="dashboard-grid-column">
                <div className="dashboard-grid-column-title">
                  <GraduationCap />
                  <span>Académico & Alumnos</span>
                </div>
                <div className="dashboard-grid-column-items">
                  {MODULES.filter((m) => m.category === 'academic').map((m) => {
                    const IconComp = m.icon;
                    const isTabActive = activeTab === m.id;
                    const count = m.countKey ? counts[m.countKey] : undefined;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectTab(m.id)}
                        className={`dashboard-grid-item ${isTabActive ? 'active' : ''}`}
                      >
                        <IconComp />
                        <span>{m.label}</span>
                        {typeof count === 'number' && count > 0 && (
                          <span className="dashboard-tab-counter">{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Columna Comunidad */}
              <div className="dashboard-grid-column">
                <div className="dashboard-grid-column-title">
                  <Megaphone />
                  <span>Comunidad & Familias</span>
                </div>
                <div className="dashboard-grid-column-items">
                  {MODULES.filter((m) => m.category === 'community').map((m) => {
                    const IconComp = m.icon;
                    const isTabActive = activeTab === m.id;
                    const count = m.countKey ? counts[m.countKey] : undefined;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectTab(m.id)}
                        className={`dashboard-grid-item ${isTabActive ? 'active' : ''}`}
                      >
                        <IconComp />
                        <span>{m.label}</span>
                        {typeof count === 'number' && count > 0 && (
                          <span className="dashboard-tab-counter">{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Columna Campus */}
              <div className="dashboard-grid-column">
                <div className="dashboard-grid-column-title">
                  <School />
                  <span>Campus & Vida Escolar</span>
                </div>
                <div className="dashboard-grid-column-items">
                  {MODULES.filter((m) => m.category === 'campus').map((m) => {
                    const IconComp = m.icon;
                    const isTabActive = activeTab === m.id;
                    const count = m.countKey ? counts[m.countKey] : undefined;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectTab(m.id)}
                        className={`dashboard-grid-item ${isTabActive ? 'active' : ''}`}
                      >
                        <IconComp />
                        <span>{m.label}</span>
                        {typeof count === 'number' && count > 0 && (
                          <span className="dashboard-tab-counter">{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Columna Gestión */}
              <div className="dashboard-grid-column">
                <div className="dashboard-grid-column-title">
                  <Landmark />
                  <span>Gestión, Finanzas & RH</span>
                </div>
                <div className="dashboard-grid-column-items">
                  {MODULES.filter((m) => m.category === 'management').map((m) => {
                    const IconComp = m.icon;
                    const isTabActive = activeTab === m.id;
                    const count = m.countKey ? counts[m.countKey] : undefined;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => handleSelectTab(m.id)}
                        className={`dashboard-grid-item ${isTabActive ? 'active' : ''}`}
                      >
                        <IconComp />
                        <span>{m.label}</span>
                        {typeof count === 'number' && count > 0 && (
                          <span className="dashboard-tab-counter">{count}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
