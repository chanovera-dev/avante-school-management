import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  DollarSign,
  Trash2,
  ShieldCheck,
  Search,
  ExternalLink,
  RefreshCw,
  LogOut,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Server,
  Layers,
  TrendingUp,
  CreditCard,
  X
} from 'lucide-react';

interface SchoolItem {
  id: string;
  name: string;
  subdomain: string;
  contactEmail: string;
  contactPhone?: string;
  status: 'ACTIVO' | 'PENDIENTE_VERIFICACION' | 'SUSPENDIDO' | 'ARCHIVADO';
  isEmailVerified: boolean;
  planTier: 'FREE_TIER_LAUNCH' | 'STARTER' | 'PRO_CAMPUS' | 'ENTERPRISE';
  subscriptionStatus: string;
  campusCount: number;
  studentCount: number;
  userCount: number;
  monthlyFeeMXN: number;
  createdAt: string;
}

interface Metrics {
  totalTenants: number;
  activeTenants: number;
  pendingVerification: number;
  totalStudents: number;
  totalUsers: number;
  totalCampuses: number;
  totalProjectedMonthlyRevenue: number;
  currency: string;
}

interface SuperAdminDashboardPageProps {
  onNavigate: (route: 'home' | 'register' | 'login' | 'dashboard' | 'portal' | 'superadmin') => void;
  onSwitchToSchool: (tenant: { id: string; name: string; subdomain: string; adminEmail?: string }) => void;
}

export const SuperAdminDashboardPage: React.FC<SuperAdminDashboardPageProps> = ({
  onNavigate,
  onSwitchToSchool,
}) => {
  const [schools, setSchools] = useState<SchoolItem[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVO' | 'PENDIENTE_VERIFICACION' | 'SUSPENDIDO'>('ALL');

  // Modal para eliminar escuela
  const [schoolToDelete, setSchoolToDelete] = useState<SchoolItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Modal para cambiar plan o estatus
  const [schoolToEdit, setSchoolToEdit] = useState<SchoolItem | null>(null);
  const [editPlan, setEditPlan] = useState<'FREE_TIER_LAUNCH' | 'STARTER' | 'PRO_CAMPUS' | 'ENTERPRISE'>('FREE_TIER_LAUNCH');
  const [editFee, setEditFee] = useState<number>(0);
  const [isUpdatingPlan, setIsUpdatingPlan] = useState(false);

  // Notificación tipo toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('asm_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const [schoolsRes, metricsRes] = await Promise.all([
        fetch('/api/superadmin/schools', { headers }),
        fetch('/api/superadmin/metrics', { headers }),
      ]);

      if (schoolsRes.ok) {
        const schoolsData = await schoolsRes.json();
        setSchools(schoolsData.schools || []);
      }

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }
    } catch (err) {
      console.error('Error al cargar datos del SuperAdmin:', err);
      showToast('Error al conectar con el servidor para obtener las escuelas.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSchool = async () => {
    if (!schoolToDelete) return;
    setIsDeleting(true);

    try {
      const token = localStorage.getItem('asm_token');
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/superadmin/schools/${schoolToDelete.id}`, {
        method: 'DELETE',
        headers,
      });

      if (res.ok) {
        showToast(`Escuela '${schoolToDelete.name}' eliminada correctamente de la base de datos.`);
        setSchoolToDelete(null);
        await fetchData();
      } else {
        const err = await res.json();
        showToast(err.message || 'No se pudo eliminar la escuela.', 'error');
      }
    } catch (err) {
      showToast('Error de red al intentar eliminar la escuela.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (school: SchoolItem) => {
    const nextStatus = school.status === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO';
    try {
      const token = localStorage.getItem('asm_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/superadmin/schools/${school.id}/status`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        showToast(`Estado de '${school.name}' actualizado a ${nextStatus}.`);
        await fetchData();
      } else {
        showToast('Error al cambiar estatus de la escuela.', 'error');
      }
    } catch (err) {
      showToast('Error de red al cambiar estatus.', 'error');
    }
  };

  const handleUpdatePlan = async () => {
    if (!schoolToEdit) return;
    setIsUpdatingPlan(true);

    try {
      const token = localStorage.getItem('asm_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/superadmin/schools/${schoolToEdit.id}/plan`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          planTier: editPlan,
          monthlyFeeMXN: editFee,
        }),
      });

      if (res.ok) {
        showToast(`Plan de '${schoolToEdit.name}' actualizado a ${editPlan}.`);
        setSchoolToEdit(null);
        await fetchData();
      } else {
        showToast('Error al actualizar plan de suscripción.', 'error');
      }
    } catch (err) {
      showToast('Error de conexión al actualizar plan.', 'error');
    } finally {
      setIsUpdatingPlan(false);
    }
  };

  const filteredSchools = schools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="sa-page">
      {/* Toast de Notificaciones */}
      {toastMessage && (
        <div className={`sa-toast ${toastMessage.type === 'success' ? 'sa-toast-success' : 'sa-toast-danger'}`}>
          {toastMessage.type === 'success' ? (
            <CheckCircle2 />
          ) : (
            <AlertTriangle />
          )}
          <p>{toastMessage.text}</p>
        </div>
      )}

      {/* Header Superior Corporativo */}
      <header className="sa-header">
        <div className="container-app sa-header-inner">
          <div className="sa-header-brand">
            <div className="sa-brand-icon">
              <Server />
            </div>
            <div>
              <div className="sa-header-title">
                <h2>Avante Core Ops</h2>
                <div className="badge badge-purple badge-xs">
                  Consola SuperAdmin
                </div>
              </div>
              <p className="sa-header-desc">
                Padrón Maestro de Escuelas, Licenciamiento y Base de Datos PostgreSQL
              </p>
            </div>
          </div>

          <div className="sa-header-actions">
            <button
              onClick={fetchData}
              disabled={loading}
              className="btn btn-secondary btn-sm"
              title="Refrescar datos en vivo"
            >
              <RefreshCw className={loading ? 'animate-spin' : ''} />
              Actualizar
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="btn btn-outline btn-sm btn-action-primary"
            >
              <Building2 />
              Login Escolar
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('asm_token');
                onNavigate('superadmin');
              }}
              className="btn btn-danger btn-sm"
            >
              <LogOut />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="container-app sa-main">
        {/* BANNER DE BIENVENIDA Y ESTADO */}
        <div className="sa-hero-banner">
          <div className="sa-hero-info">
            <div className="sa-hero-badge">
              <ShieldCheck />
              Infraestructura Master • PostgreSQL Activa (asm_db)
            </div>
            <h1 className="sa-hero-title">
              Tablero de Gestión de Ecosistema Escolar
            </h1>
            <p className="sa-hero-desc">
              Monitoreo centralizado de todas las instituciones educativas privadas y públicas alojadas en el SaaS. Administra el estado de las escuelas, modifica suscripciones y gestiona la depuración de datos.
            </p>
          </div>

          <button
            onClick={() => onNavigate('register')}
            className="btn btn-outline btn-sm sa-hero-btn"
          >
            <Building2 />
            Dar de Alta Escuela
          </button>
        </div>

        {/* 1. DASHBOARD DE ESTADÍSTICAS GLOBALES (KPIs) */}
        <div>
          <h2 className="sa-section-title">
            <TrendingUp />
            Métricas Globales de la Red Escolar
          </h2>

          <div className="sa-kpi-grid">
            {/* Card 1: Escuelas */}
            <div className="sa-kpi-card">
              <div className="kpi-header">
                <div className="kpi-label">Colegios Registrados</div>
                <div className="kpi-icon kpi-icon-purple">
                  <Building2 />
                </div>
              </div>
              <div className="kpi-value">
                {metrics ? metrics.totalTenants : schools.length}
              </div>
              <div className="kpi-subtext">
                <div className="kpi-subtext-item text-success">
                  {metrics ? metrics.activeTenants : schools.filter((s) => s.status === 'ACTIVO').length} activos
                </div>
                <div>•</div>
                <div className="kpi-subtext-item text-warning">
                  {metrics ? metrics.pendingVerification : 0} pendientes
                </div>
              </div>
            </div>

            {/* Card 2: Alumnos */}
            <div className="sa-kpi-card">
              <div className="kpi-header">
                <div className="kpi-label">Alumnos Matriculados</div>
                <div className="kpi-icon kpi-icon-primary">
                  <GraduationCap />
                </div>
              </div>
              <div className="kpi-value">
                {metrics ? metrics.totalStudents : schools.reduce((acc, s) => acc + s.studentCount, 0)}
              </div>
              <div className="kpi-subtext">
                Expedientes digitales únicos vitalicios
              </div>
            </div>

            {/* Card 3: Usuarios Totales */}
            <div className="sa-kpi-card">
              <div className="kpi-header">
                <div className="kpi-label">Usuarios & Personal</div>
                <div className="kpi-icon kpi-icon-success">
                  <Users />
                </div>
              </div>
              <div className="kpi-value">
                {metrics ? metrics.totalUsers : schools.reduce((acc, s) => acc + s.userCount, 0)}
              </div>
              <div className="kpi-subtext">
                Directores, docentes, cajeros y tutores
              </div>
            </div>

            {/* Card 4: Ingresos Mensuales SaaS (MRR) */}
            <div className="sa-kpi-card">
              <div className="kpi-header">
                <div className="kpi-label">MRR Proyectado</div>
                <div className="kpi-icon kpi-icon-warning">
                  <DollarSign />
                </div>
              </div>
              <div className="kpi-value kpi-value-success">
                ${metrics ? metrics.totalProjectedMonthlyRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2 }) : '0.00'}
              </div>
              <div className="kpi-subtext">
                Cuotas de suscripción SaaS en MXN
              </div>
            </div>
          </div>
        </div>

        {/* 2. PADRÓN MAESTRO DE ESCUELAS */}
        <div className="sa-table-card">
          <div className="sa-table-header">
            <div>
              <div className="sa-table-title-group">
                <Layers />
                <h2>Padrón de Colegios e Instituciones Registradas</h2>
              </div>
              <p className="sa-table-subtitle">
                Listado completo de escuelas en base de datos. Puedes acceder a su portal institucional, cambiar estatus o eliminarlas.
              </p>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div className="sa-table-controls">
              <div className="sa-search-wrapper">
                <Search className="input-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, subdominio..."
                  className="form-input"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="form-select sa-filter-select"
              >
                <option value="ALL">Todos los estatus</option>
                <option value="ACTIVO">Activos</option>
                <option value="PENDIENTE_VERIFICACION">Pendientes</option>
                <option value="SUSPENDIDO">Suspendidos</option>
              </select>
            </div>
          </div>

          {/* TABLA DE ESCUELAS */}
          <div className="sa-table-responsive">
            <table className="sa-table">
              <thead>
                <tr>
                  <th>Institución Escolar</th>
                  <th>Subdominio</th>
                  <th>Contacto / Director</th>
                  <th className="text-center">Plan Licencia</th>
                  <th className="text-center">Alumnos</th>
                  <th className="text-center">Estatus</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="table-empty-cell">
                      {loading ? 'Cargando datos desde la base de datos...' : 'No se encontraron escuelas registradas con los filtros seleccionados.'}
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id}>
                      {/* Nombre */}
                      <td className="sa-school-cell">
                        <div className="sa-school-info">
                          <div className="sa-school-badge">
                            {school.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="sa-school-name">{school.name}</div>
                            <div className="sa-school-id">
                              ID: {school.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subdominio */}
                      <td className="sa-school-domain">
                        {school.subdomain}.avanteschoolmanagement.local
                      </td>

                      {/* Contacto */}
                      <td>
                        <div className="text-secondary">{school.contactEmail}</div>
                        {school.contactPhone && (
                          <div className="sa-school-phone">{school.contactPhone}</div>
                        )}
                      </td>

                      {/* Plan */}
                      <td className="text-center">
                        <div
                          className={`badge ${
                            school.planTier === 'ENTERPRISE'
                              ? 'badge-purple'
                              : school.planTier === 'PRO_CAMPUS'
                              ? 'badge-sky'
                              : school.planTier === 'STARTER'
                              ? 'badge-emerald'
                              : 'badge-sky'
                          }`}
                        >
                          {school.planTier === 'FREE_TIER_LAUNCH' ? 'LANZAMIENTO GRATIS' : school.planTier}
                        </div>
                      </td>

                      {/* Alumnos */}
                      <td className="text-center font-bold">
                        {school.studentCount}
                      </td>

                      {/* Estatus */}
                      <td className="text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(school)}
                          className={`badge sa-badge-btn ${
                            school.status === 'ACTIVO'
                              ? 'badge-emerald'
                              : school.status === 'PENDIENTE_VERIFICACION'
                              ? 'badge-amber'
                              : 'badge-rose'
                          }`}
                          title="Haz clic para alternar estatus"
                        >
                          {school.status === 'ACTIVO' ? (
                            <>
                              <CheckCircle2 />
                              ACTIVO
                            </>
                          ) : school.status === 'PENDIENTE_VERIFICACION' ? (
                            <>
                              <Clock />
                              PENDIENTE
                            </>
                          ) : (
                            <>
                              <XCircle />
                              SUSPENDIDO
                            </>
                          )}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td className="text-right">
                        <div className="sa-action-group">
                          {/* Cambiar a Escuela */}
                          <button
                            type="button"
                            onClick={() =>
                              onSwitchToSchool({
                                id: school.id,
                                name: school.name,
                                subdomain: school.subdomain,
                                adminEmail: school.contactEmail,
                              })
                            }
                            className="btn btn-outline btn-sm btn-icon-square btn-action-primary"
                            title="Entrar al Dashboard de este colegio"
                          >
                            <ExternalLink />
                          </button>

                          {/* Editar Plan */}
                          <button
                            type="button"
                            onClick={() => {
                              setSchoolToEdit(school);
                              setEditPlan(school.planTier);
                              setEditFee(school.monthlyFeeMXN);
                            }}
                            className="btn btn-outline btn-sm btn-icon-square btn-action-purple"
                            title="Cambiar plan de suscripción"
                          >
                            <CreditCard />
                          </button>

                          {/* Eliminar Escuela */}
                          <button
                            type="button"
                            onClick={() => setSchoolToDelete(school)}
                            className="btn btn-outline btn-sm btn-icon-square btn-action-danger"
                            title="Eliminar escuela de la base de datos"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN DE ESCUELA */}
      {schoolToDelete && (
        <div className="modal-backdrop">
          <div className="modal-card sa-modal-card-danger">
            <div className="sa-modal-header">
              <div className="sa-modal-danger-icon">
                <AlertTriangle />
              </div>
              <div>
                <h3 className="modal-title">¿Eliminar escuela definitivamente?</h3>
                <p className="auth-subtitle">
                  Esta acción es irreversible y afectará la base de datos PostgreSQL de producción.
                </p>
              </div>
            </div>

            <div className="sa-modal-info-box">
              <div>
                <div className="sa-modal-label">Colegio:</div>
                <div className="sa-modal-val">{schoolToDelete.name}</div>
              </div>
              <div>
                <div className="sa-modal-label">Subdominio:</div>
                <div className="sa-modal-domain">
                  {schoolToDelete.subdomain}.avanteschoolmanagement.local
                </div>
              </div>
              <p className="sa-modal-warning-text">
                ⚠️ Se eliminarán en cascada todos sus campus, usuarios registrados, expedientes de {schoolToDelete.studentCount} alumnos, calificaciones y transacciones asociadas.
              </p>
            </div>

            <div className="sa-modal-actions">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSchoolToDelete(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteSchool}
                className="btn btn-danger btn-sm"
              >
                {isDeleting ? (
                  'Eliminando de PostgreSQL...'
                ) : (
                  <>
                    <Trash2 />
                    Confirmar y Eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA CAMBIAR PLAN DE SUSCRIPCIÓN */}
      {schoolToEdit && (
        <div className="modal-backdrop">
          <div className="modal-card sa-modal-card-purple">
            <div className="sa-modal-header-between">
              <div className="flex-row-between gap-3">
                <div className="sa-modal-purple-icon">
                  <CreditCard />
                </div>
                <div>
                  <h3 className="modal-title">Gestionar Licencia SaaS</h3>
                  <p className="auth-subtitle">{schoolToEdit.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSchoolToEdit(null)}
                className="modal-close"
              >
                <X />
              </button>
            </div>

            <div className="flex-col gap-4">
              <div className="form-group mb-0">
                <label className="form-label">Nivel de Plan</label>
                <select
                  value={editPlan}
                  onChange={(e: any) => {
                    setEditPlan(e.target.value);
                    if (e.target.value === 'FREE_TIER_LAUNCH') setEditFee(0);
                    if (e.target.value === 'STARTER') setEditFee(999);
                    if (e.target.value === 'PRO_CAMPUS') setEditFee(2499);
                    if (e.target.value === 'ENTERPRISE') setEditFee(4999);
                  }}
                  className="form-select"
                >
                  <option value="FREE_TIER_LAUNCH">Lanzamiento Gratuito (0.00 MXN)</option>
                  <option value="STARTER">Starter ($999.00 MXN / mes)</option>
                  <option value="PRO_CAMPUS">Pro Campus Multisede ($2,499.00 MXN / mes)</option>
                  <option value="ENTERPRISE">Enterprise Red de Colegios ($4,999.00 MXN / mes)</option>
                </select>
              </div>

              <div className="form-group mb-0">
                <label className="form-label">Cuota Mensual (MXN)</label>
                <input
                  type="number"
                  min="0"
                  value={editFee}
                  onChange={(e) => setEditFee(parseFloat(e.target.value) || 0)}
                  className="form-input font-mono"
                />
              </div>
            </div>

            <div className="sa-modal-actions">
              <button
                type="button"
                onClick={() => setSchoolToEdit(null)}
                className="btn btn-secondary btn-sm"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isUpdatingPlan}
                onClick={handleUpdatePlan}
                className="btn btn-purple btn-sm"
              >
                {isUpdatingPlan ? 'Actualizando...' : 'Guardar Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
