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
  Sparkles,
  Server,
  Layers,
  ArrowRight,
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
        showToast(`Estatus de '${school.name}' cambiado a ${nextStatus}.`);
        await fetchData();
      } else {
        showToast('No se pudo actualizar el estatus de la escuela.', 'error');
      }
    } catch (err) {
      showToast('Error al actualizar el estatus.', 'error');
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
        body: JSON.stringify({ planTier: editPlan, monthlyFeeMXN: editFee }),
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white pb-16">
      {/* Toast de Notificaciones */}
      {toastMessage && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border text-xs font-semibold backdrop-blur-xl animate-fade-in ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-700 text-emerald-200'
              : 'bg-rose-950/90 border-rose-700 text-rose-200'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Superior Corporativo */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl py-4 sticky top-0 z-30">
        <div className="container-app flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-purple-600/30">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">Avante Core Ops</span>
                <span className="bg-purple-950 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-800 tracking-wider uppercase">
                  Consola SuperAdmin
                </span>
              </div>
              <p className="text-xs text-slate-400">Padrón Maestro de Escuelas, Licenciamiento y Base de Datos PostgreSQL</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer"
              title="Refrescar datos en vivo"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>

            <button
              onClick={() => onNavigate('login')}
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl border border-slate-700 transition-all cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Login Escolar</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('asm_token');
                onNavigate('superadmin');
              }}
              className="flex items-center gap-1.5 bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 text-xs font-semibold px-3 py-2 rounded-xl border border-rose-800/60 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenedor Central */}
      <main className="flex-1 container-app py-8 space-y-8">
        {/* BANNER DE BIENVENIDA Y ESTADO */}
        <div className="bg-gradient-to-r from-purple-950/70 via-indigo-950/50 to-slate-900 border border-purple-800/40 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Infraestructura Master • PostgreSQL Activa (asm_db)</span>
            </div>
            <h1 className="text-2xl font-black text-white">Tablero de Gestión de Ecosistema Escolar</h1>
            <p className="text-slate-400 text-xs max-w-2xl">
              Monitoreo centralizado de todas las instituciones educativas privadas y públicas alojadas en el SaaS. Administra el estado de las escuelas, modifica suscripciones y gestiona la depuración de datos.
            </p>
          </div>

          <button
            onClick={() => onNavigate('register')}
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Building2 className="w-4 h-4" />
            <span>Dar de Alta Escuela</span>
          </button>
        </div>

        {/* 1. DASHBOARD DE ESTADÍSTICAS GLOBALES (KPIs) */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span>Métricas Globales de la Red Escolar</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Escuelas */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Colegios Registrados</span>
                <div className="p-2 bg-purple-950/80 text-purple-400 rounded-xl border border-purple-800/60">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">
                {metrics ? metrics.totalTenants : schools.length}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-semibold">{metrics ? metrics.activeTenants : schools.filter(s => s.status === 'ACTIVO').length} activos</span>
                <span>•</span>
                <span className="text-amber-400 font-semibold">{metrics ? metrics.pendingVerification : 0} pendientes</span>
              </div>
            </div>

            {/* Card 2: Alumnos */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Alumnos Matriculados</span>
                <div className="p-2 bg-blue-950/80 text-blue-400 rounded-xl border border-blue-800/60">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">
                {metrics ? metrics.totalStudents : schools.reduce((acc, s) => acc + s.studentCount, 0)}
              </div>
              <div className="text-[11px] text-slate-400">
                Expedientes digitales únicos vitalicios
              </div>
            </div>

            {/* Card 3: Usuarios Totales */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Usuarios & Personal</span>
                <div className="p-2 bg-emerald-950/80 text-emerald-400 rounded-xl border border-emerald-800/60">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-white">
                {metrics ? metrics.totalUsers : schools.reduce((acc, s) => acc + s.userCount, 0)}
              </div>
              <div className="text-[11px] text-slate-400">
                Directores, docentes, cajeros y tutores
              </div>
            </div>

            {/* Card 4: Ingresos Mensuales SaaS (MRR) */}
            <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">MRR Proyectado</span>
                <div className="p-2 bg-amber-950/80 text-amber-400 rounded-xl border border-amber-800/60">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-emerald-400">
                ${metrics ? metrics.totalProjectedMonthlyRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2 }) : '0.00'}
              </div>
              <div className="text-[11px] text-slate-400">
                Cuotas de suscripción SaaS en MXN
              </div>
            </div>
          </div>
        </div>

        {/* 2. PADRÓN MAESTRO DE ESCUELAS */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Padrón de Colegios e Instituciones Registradas</span>
              </h2>
              <p className="text-xs text-slate-400">
                Listado completo de escuelas en base de datos. Puedes acceder a su portal institucional, cambiar estatus o eliminarlas.
              </p>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por nombre, subdominio..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:border-purple-500 outline-none"
              >
                <option value="ALL">Todos los estatus</option>
                <option value="ACTIVO">Activos</option>
                <option value="PENDIENTE_VERIFICACION">Pendientes</option>
                <option value="SUSPENDIDO">Suspendidos</option>
              </select>
            </div>
          </div>

          {/* TABLA DE ESCUELAS */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <th className="py-3 px-4">Institución Escolar</th>
                  <th className="py-3 px-4">Subdominio</th>
                  <th className="py-3 px-4">Contacto / Director</th>
                  <th className="py-3 px-4 text-center">Plan Licencia</th>
                  <th className="py-3 px-4 text-center">Alumnos</th>
                  <th className="py-3 px-4 text-center">Estatus</th>
                  <th className="py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                {filteredSchools.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500 text-xs">
                      {loading ? 'Cargando datos desde la base de datos...' : 'No se encontraron escuelas registradas con los filtros seleccionados.'}
                    </td>
                  </tr>
                ) : (
                  filteredSchools.map((school) => (
                    <tr key={school.id} className="hover:bg-slate-850/60 transition-colors">
                      {/* Nombre */}
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-slate-800 rounded-xl flex items-center justify-center text-purple-400 font-bold text-xs border border-slate-700">
                            {school.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div>{school.name}</div>
                            <div className="text-[10px] text-slate-500 font-normal">ID: {school.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* Subdominio */}
                      <td className="py-3.5 px-4 font-mono text-xs text-sky-400">
                        {school.subdomain}.avanteschoolmanagement.local
                      </td>

                      {/* Contacto */}
                      <td className="py-3.5 px-4 text-xs">
                        <div className="text-slate-200">{school.contactEmail}</div>
                        {school.contactPhone && (
                          <div className="text-[10px] text-slate-500">{school.contactPhone}</div>
                        )}
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            school.planTier === 'ENTERPRISE'
                              ? 'bg-purple-950 text-purple-300 border-purple-800'
                              : school.planTier === 'PRO_CAMPUS'
                              ? 'bg-blue-950 text-blue-300 border-blue-800'
                              : school.planTier === 'STARTER'
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {school.planTier === 'FREE_TIER_LAUNCH' ? 'LANZAMIENTO GRATIS' : school.planTier}
                        </span>
                      </td>

                      {/* Alumnos */}
                      <td className="py-3.5 px-4 text-center font-bold text-white">
                        {school.studentCount}
                      </td>

                      {/* Estatus */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(school)}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border cursor-pointer transition-all ${
                            school.status === 'ACTIVO'
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                              : school.status === 'PENDIENTE_VERIFICACION'
                              ? 'bg-amber-950/80 text-amber-300 border-amber-800 hover:bg-amber-900'
                              : 'bg-rose-950/80 text-rose-300 border-rose-800 hover:bg-rose-900'
                          }`}
                          title="Haz clic para alternar estatus"
                        >
                          {school.status === 'ACTIVO' ? (
                            <>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>ACTIVO</span>
                            </>
                          ) : school.status === 'PENDIENTE_VERIFICACION' ? (
                            <>
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>PENDIENTE</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 text-rose-400" />
                              <span>SUSPENDIDO</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
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
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                            title="Entrar al Dashboard de este colegio"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>

                          {/* Editar Plan */}
                          <button
                            type="button"
                            onClick={() => {
                              setSchoolToEdit(school);
                              setEditPlan(school.planTier);
                              setEditFee(school.monthlyFeeMXN);
                            }}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-purple-400 hover:text-purple-300 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                            title="Cambiar plan de suscripción"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>

                          {/* Eliminar Escuela */}
                          <button
                            type="button"
                            onClick={() => setSchoolToDelete(school)}
                            className="p-1.5 bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700 hover:border-rose-800 transition-colors cursor-pointer"
                            title="Eliminar escuela de la base de datos"
                          >
                            <Trash2 className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-rose-800/80 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-rose-950 border border-rose-800 text-rose-400 rounded-2xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">¿Eliminar escuela definitivamente?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Esta acción es irreversible y afectará la base de datos PostgreSQL de producción.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
              <div>
                <span className="text-slate-500 font-bold block">Colegio:</span>
                <span className="text-white font-bold text-sm">{schoolToDelete.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Subdominio:</span>
                <span className="text-sky-400 font-mono">{schoolToDelete.subdomain}.avanteschoolmanagement.local</span>
              </div>
              <div className="text-rose-300 text-[11px] pt-2 border-t border-slate-800">
                ⚠️ Se eliminarán en cascada todos sus campus, usuarios registrados, expedientes de {schoolToDelete.studentCount} alumnos, calificaciones y transacciones asociadas.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setSchoolToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteSchool}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? (
                  <span>Eliminando de PostgreSQL...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-purple-800/80 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-950 border border-purple-800 text-purple-400 rounded-2xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Gestionar Licencia SaaS</h3>
                  <p className="text-xs text-slate-400">{schoolToEdit.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSchoolToEdit(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Nivel de Plan
                </label>
                <select
                  value={editPlan}
                  onChange={(e: any) => {
                    setEditPlan(e.target.value);
                    if (e.target.value === 'FREE_TIER_LAUNCH') setEditFee(0);
                    if (e.target.value === 'STARTER') setEditFee(999);
                    if (e.target.value === 'PRO_CAMPUS') setEditFee(2499);
                    if (e.target.value === 'ENTERPRISE') setEditFee(4999);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none"
                >
                  <option value="FREE_TIER_LAUNCH">Lanzamiento Gratuito (0.00 MXN)</option>
                  <option value="STARTER">Starter ($999.00 MXN / mes)</option>
                  <option value="PRO_CAMPUS">Pro Campus Multisede ($2,499.00 MXN / mes)</option>
                  <option value="ENTERPRISE">Enterprise Red de Colegios ($4,999.00 MXN / mes)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-[10px] mb-1">
                  Cuota Mensual (MXN)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editFee}
                  onChange={(e) => setEditFee(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSchoolToEdit(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-xl"
              >
                Cancelar
              </button>

              <button
                type="button"
                disabled={isUpdatingPlan}
                onClick={handleUpdatePlan}
                className="px-4 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-600/30 transition-all cursor-pointer disabled:opacity-50"
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
