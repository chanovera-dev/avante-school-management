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
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 999,
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            fontSize: '0.75rem',
            fontWeight: 600,
            backdropFilter: 'blur(12px)',
            background: toastMessage.type === 'success' ? 'rgba(6, 78, 59, 0.9)' : 'rgba(136, 19, 55, 0.9)',
            border: `1px solid ${toastMessage.type === 'success' ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
            color: '#ffffff',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 style={{ width: '1rem', height: '1rem', color: 'var(--color-success)' }} />
          ) : (
            <AlertTriangle style={{ width: '1rem', height: '1rem', color: 'var(--color-danger)' }} />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Superior Corporativo */}
      <header className="sa-header">
        <div className="container-app sa-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, var(--color-purple), #4338ca)',
                color: '#ffffff',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px var(--color-purple-glow)'
              }}
            >
              <Server style={{ width: '1.25rem', height: '1.25rem' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.125rem', color: '#ffffff' }}>Avante Core Ops</span>
                <span className="badge badge-purple" style={{ fontSize: '0.625rem' }}>
                  Consola SuperAdmin
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Padrón Maestro de Escuelas, Licenciamiento y Base de Datos PostgreSQL
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={fetchData}
              disabled={loading}
              className="btn btn-secondary btn-sm"
              title="Refrescar datos en vivo"
            >
              <RefreshCw className={loading ? 'animate-spin' : ''} style={{ width: '0.875rem', height: '0.875rem' }} />
              <span>Actualizar</span>
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="btn btn-outline btn-sm"
            >
              <Building2 style={{ width: '0.875rem', height: '0.875rem', color: 'var(--color-primary-hover)' }} />
              <span>Login Escolar</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('asm_token');
                onNavigate('superadmin');
              }}
              className="btn btn-danger btn-sm"
            >
              <LogOut style={{ width: '0.875rem', height: '0.875rem' }} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="container-app sa-main">
        {/* BANNER DE BIENVENIDA Y ESTADO */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-2xl)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 700, color: '#d8b4fe', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <ShieldCheck style={{ width: '1rem', height: '1rem', color: 'var(--color-purple)' }} />
              <span>Infraestructura Master • PostgreSQL Activa (asm_db)</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-text-main)' }}>
              Tablero de Gestión de Ecosistema Escolar
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', maxWidth: '42rem' }}>
              Monitoreo centralizado de todas las instituciones educativas privadas y públicas alojadas en el SaaS. Administra el estado de las escuelas, modifica suscripciones y gestiona la depuración de datos.
            </p>
          </div>

          <button
            onClick={() => onNavigate('register')}
            className="btn btn-purple btn-sm"
          >
            <Building2 style={{ width: '1rem', height: '1rem' }} />
            <span>Dar de Alta Escuela</span>
          </button>
        </div>

        {/* 1. DASHBOARD DE ESTADÍSTICAS GLOBALES (KPIs) */}
        <div>
          <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp style={{ width: '1rem', height: '1rem', color: 'var(--color-purple)' }} />
            <span>Métricas Globales de la Red Escolar</span>
          </h2>

          <div className="sa-kpi-grid">
            {/* Card 1: Escuelas */}
            <div className="sa-kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">Colegios Registrados</span>
                <div className="kpi-icon" style={{ background: 'var(--color-purple-bg)', color: '#c084fc' }}>
                  <Building2 style={{ width: '1rem', height: '1rem' }} />
                </div>
              </div>
              <div className="kpi-value">
                {metrics ? metrics.totalTenants : schools.length}
              </div>
              <div className="kpi-subtext">
                <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                  {metrics ? metrics.activeTenants : schools.filter((s) => s.status === 'ACTIVO').length} activos
                </span>
                <span>•</span>
                <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>
                  {metrics ? metrics.pendingVerification : 0} pendientes
                </span>
              </div>
            </div>

            {/* Card 2: Alumnos */}
            <div className="sa-kpi-card">
              <div className="kpi-header">
                <span className="kpi-label">Alumnos Matriculados</span>
                <div className="kpi-icon" style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary-hover)' }}>
                  <GraduationCap style={{ width: '1rem', height: '1rem' }} />
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
                <span className="kpi-label">Usuarios & Personal</span>
                <div className="kpi-icon" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
                  <Users style={{ width: '1rem', height: '1rem' }} />
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
                <span className="kpi-label">MRR Proyectado</span>
                <div className="kpi-icon" style={{ background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                  <DollarSign style={{ width: '1rem', height: '1rem' }} />
                </div>
              </div>
              <div className="kpi-value" style={{ color: 'var(--color-success)' }}>
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
              <h2 style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Layers style={{ width: '1.25rem', height: '1.25rem', color: 'var(--color-purple)' }} />
                <span>Padrón de Colegios e Instituciones Registradas</span>
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                Listado completo de escuelas en base de datos. Puedes acceder a su portal institucional, cambiar estatus o eliminarlas.
              </p>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <Search style={{ width: '1rem', height: '1rem', position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-faint)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, subdominio..."
                  className="form-input"
                  style={{ paddingLeft: '2.25rem', fontSize: '0.75rem', width: '16rem' }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="form-select"
                style={{ fontSize: '0.75rem', width: 'auto' }}
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
                  <th style={{ textAlign: 'center' }}>Plan Licencia</th>
                  <th style={{ textAlign: 'center' }}>Alumnos</th>
                  <th style={{ textAlign: 'center' }}>Estatus</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', paddingBlock: '2.5rem', color: 'var(--color-text-muted)' }}>
                      {loading ? 'Cargando datos desde la base de datos...' : 'No se encontraron escuelas registradas con los filtros seleccionados.'}
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id}>
                      {/* Nombre */}
                      <td style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <div
                            style={{
                              width: '2rem',
                              height: '2rem',
                              background: 'var(--color-bg-card)',
                              borderRadius: 'var(--radius-md)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#c084fc',
                              fontWeight: 800,
                              fontSize: '0.75rem',
                              border: '1px solid var(--color-border-subtle)'
                            }}
                          >
                            {school.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div>{school.name}</div>
                            <div style={{ fontSize: '0.625rem', color: 'var(--color-text-faint)', fontFamily: 'var(--font-mono)' }}>
                              ID: {school.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Subdominio */}
                      <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-primary-hover)' }}>
                        {school.subdomain}.avanteschoolmanagement.local
                      </td>

                      {/* Contacto */}
                      <td>
                        <div style={{ color: 'var(--color-text-secondary)' }}>{school.contactEmail}</div>
                        {school.contactPhone && (
                          <div style={{ fontSize: '0.625rem', color: 'var(--color-text-faint)' }}>{school.contactPhone}</div>
                        )}
                      </td>

                      {/* Plan */}
                      <td style={{ textAlign: 'center' }}>
                        <span
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
                        </span>
                      </td>

                      {/* Alumnos */}
                      <td style={{ textAlign: 'center', fontWeight: 800, color: 'var(--color-text-main)' }}>
                        {school.studentCount}
                      </td>

                      {/* Estatus */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(school)}
                          className={`badge ${
                            school.status === 'ACTIVO'
                              ? 'badge-emerald'
                              : school.status === 'PENDIENTE_VERIFICACION'
                              ? 'badge-amber'
                              : 'badge-rose'
                          }`}
                          style={{ cursor: 'pointer' }}
                          title="Haz clic para alternar estatus"
                        >
                          {school.status === 'ACTIVO' ? (
                            <>
                              <CheckCircle2 style={{ width: '0.75rem', height: '0.75rem' }} />
                              <span>ACTIVO</span>
                            </>
                          ) : school.status === 'PENDIENTE_VERIFICACION' ? (
                            <>
                              <Clock style={{ width: '0.75rem', height: '0.75rem' }} />
                              <span>PENDIENTE</span>
                            </>
                          ) : (
                            <>
                              <XCircle style={{ width: '0.75rem', height: '0.75rem' }} />
                              <span>SUSPENDIDO</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
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
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.375rem', color: 'var(--color-primary-hover)' }}
                            title="Entrar al Dashboard de este colegio"
                          >
                            <ExternalLink style={{ width: '1rem', height: '1rem' }} />
                          </button>

                          {/* Editar Plan */}
                          <button
                            type="button"
                            onClick={() => {
                              setSchoolToEdit(school);
                              setEditPlan(school.planTier);
                              setEditFee(school.monthlyFeeMXN);
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.375rem', color: '#c084fc' }}
                            title="Cambiar plan de suscripción"
                          >
                            <CreditCard style={{ width: '1rem', height: '1rem' }} />
                          </button>

                          {/* Eliminar Escuela */}
                          <button
                            type="button"
                            onClick={() => setSchoolToDelete(school)}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.375rem', color: 'var(--color-danger)' }}
                            title="Eliminar escuela de la base de datos"
                          >
                            <Trash2 style={{ width: '1rem', height: '1rem' }} />
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
          <div className="modal-card" style={{ borderColor: 'var(--color-danger-border)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              <div
                style={{
                  padding: '0.75rem',
                  background: 'var(--color-danger-bg)',
                  border: '1px solid var(--color-danger-border)',
                  color: 'var(--color-danger)',
                  borderRadius: 'var(--radius-lg)',
                  flexShrink: 0
                }}
              >
                <AlertTriangle style={{ width: '1.5rem', height: '1.5rem' }} />
              </div>
              <div>
                <h3 className="modal-title">¿Eliminar escuela definitivamente?</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  Esta acción es irreversible y afectará la base de datos PostgreSQL de producción.
                </p>
              </div>
            </div>

            <div
              style={{
                background: 'var(--color-bg-base)',
                border: '1px solid var(--color-border-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                fontSize: '0.75rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--color-text-faint)', fontWeight: 700, display: 'block' }}>Colegio:</span>
                <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.875rem' }}>{schoolToDelete.name}</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-faint)', fontWeight: 700, display: 'block' }}>Subdominio:</span>
                <span style={{ color: 'var(--color-primary-hover)', fontFamily: 'var(--font-mono)' }}>
                  {schoolToDelete.subdomain}.avanteschoolmanagement.local
                </span>
              </div>
              <div style={{ color: '#fecdd3', fontSize: '0.6875rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                ⚠️ Se eliminarán en cascada todos sus campus, usuarios registrados, expedientes de {schoolToDelete.studentCount} alumnos, calificaciones y transacciones asociadas.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
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
                  <span>Eliminando de PostgreSQL...</span>
                ) : (
                  <>
                    <Trash2 style={{ width: '0.875rem', height: '0.875rem' }} />
                    <span>Confirmar y Eliminar</span>
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
          <div className="modal-card" style={{ borderColor: 'rgba(147, 51, 234, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    padding: '0.75rem',
                    background: 'var(--color-purple-bg)',
                    border: '1px solid var(--color-purple-border)',
                    color: '#c084fc',
                    borderRadius: 'var(--radius-lg)'
                  }}
                >
                  <CreditCard style={{ width: '1.5rem', height: '1.5rem' }} />
                </div>
                <div>
                  <h3 className="modal-title">Gestionar Licencia SaaS</h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{schoolToEdit.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSchoolToEdit(null)}
                className="modal-close"
              >
                <X style={{ width: '1.25rem', height: '1.25rem' }} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
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

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Cuota Mensual (MXN)</label>
                <input
                  type="number"
                  min="0"
                  value={editFee}
                  onChange={(e) => setEditFee(parseFloat(e.target.value) || 0)}
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
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
