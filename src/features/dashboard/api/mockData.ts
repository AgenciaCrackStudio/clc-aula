import type {
  DashboardNotification,
  DashboardStats,
  Program,
  UpcomingClass,
} from './types.ts'

/**
 * Placeholder dashboard data. Replace each of these with a real Supabase read
 * (see the query functions in `dashboard.ts`) once the admin platform exists.
 */

export const mockStats: DashboardStats = {
  progressPercent: 58,
  modulesCompleted: 12,
  modulesTotal: 20,
  credits: 36,
  activeCourses: 4,
  badges: 4,
  attendancePercent: 92,
}

export const mockPrograms: Program[] = [
  {
    id: 'n1',
    track: 'REAL ESTATE',
    level: 'N1',
    title: 'Fundamentos de Venta Profesional',
    progressPercent: 100,
    status: 'completed',
  },
  {
    id: 'n2',
    track: 'REAL ESTATE',
    level: 'N2',
    title: 'Liderazgo Comercial I',
    progressPercent: 60,
    status: 'in_progress',
  },
  {
    id: 'n3',
    track: 'REAL ESTATE',
    level: 'N3',
    title: 'Liderazgo Comercial II',
    progressPercent: 0,
    status: 'locked',
  },
]

export const mockUpcomingClasses: UpcomingClass[] = [
  {
    id: 'c1',
    startsAt: '2026-06-24T19:00:00',
    title: 'Ejecución comercial a escala',
    instructor: 'Luigi Marín',
    modality: 'live',
  },
  {
    id: 'c2',
    startsAt: '2026-06-01T18:30:00',
    title: 'Estrategias de negociación II',
    instructor: 'Mariana Ortiz',
    modality: 'scheduled',
  },
  {
    id: 'c3',
    startsAt: '2026-07-08T17:00:00',
    title: 'Workshop: Pipeline Review',
    instructor: 'Staff CLC',
    modality: 'scheduled',
  },
]

export const mockNotifications: DashboardNotification[] = [
  {
    id: 'n1',
    tone: 'danger',
    icon: 'evaluation',
    title: 'Evaluación pendiente: N2-C02',
    subtitle: 'Fecha límite: Mañana 11:59 PM',
    actionLabel: 'Realizar',
  },
  {
    id: 'n2',
    tone: 'success',
    icon: 'certificate',
    title: '¡Certificado Listo!',
    subtitle: 'Has completado el Nivel 1 de Real Estate',
    actionLabel: 'Descargar',
  },
  {
    id: 'n3',
    tone: 'success',
    icon: 'badge',
    title: 'Nuevas Insignias Desbloqueadas',
    subtitle: '"Ejecutor Estratégico" y "Mentor Junior"',
    actionLabel: 'Ver todas',
  },
]
