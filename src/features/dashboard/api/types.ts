/**
 * Shapes the dashboard renders. These mirror what the admin platform will
 * eventually serve, so wiring the backend means returning these same types
 * from the query functions — components and keys stay untouched.
 */

export interface DashboardStats {
  progressPercent: number
  modulesCompleted: number
  modulesTotal: number
  credits: number
  activeCourses: number
  badges: number
  attendancePercent: number
}

export type ProgramStatus = 'completed' | 'in_progress' | 'locked'

export interface Program {
  id: string
  /** Vertical, e.g. "REAL ESTATE". */
  track: string
  /** Level tag, e.g. "N1". */
  level: string
  title: string
  progressPercent: number
  status: ProgramStatus
}

export type ClassModality = 'live' | 'scheduled'

export interface UpcomingClass {
  id: string
  /** ISO timestamp of when the session starts. */
  startsAt: string
  title: string
  instructor: string
  modality: ClassModality
}

export type NotificationTone = 'danger' | 'success'
export type NotificationIcon = 'evaluation' | 'certificate' | 'badge'

export interface DashboardNotification {
  id: string
  tone: NotificationTone
  icon: NotificationIcon
  title: string
  subtitle: string
  actionLabel: string
}
