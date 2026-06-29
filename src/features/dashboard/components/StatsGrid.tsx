import { CalendarCheck, GraduationCap, Medal, Wallet } from 'lucide-react'
import { ProgressBar } from '../../../components/ui/ProgressBar.tsx'
import { ProgressRing } from '../../../components/ui/ProgressRing.tsx'
import { useDashboardStats } from '../api/dashboard.ts'
import { StatCard } from './StatCard.tsx'

export function StatsGrid() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-[170px] animate-pulse rounded-2xl bg-border/60" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {/* Progreso general */}
      <StatCard label="Progreso general" tone="mint">
        <div className="flex flex-1 items-center justify-center">
          <ProgressRing
            value={stats.progressPercent}
            size={108}
            strokeWidth={11}
            indicatorClassName="text-current"
            trackClassName="text-white"
          />
        </div>
        <p className="text-sm opacity-70">
          {stats.modulesCompleted}/{stats.modulesTotal} Módulos
        </p>
      </StatCard>

      {/* Créditos acumulados */}
      <StatCard label="Créditos acumulados" tone="sky" icon={<Wallet className="size-5 text-current" />}>
        <div className="mt-auto">
          <p className="text-4xl font-bold">{stats.credits}</p>
          <p className="mt-1 text-sm opacity-70">Disponibles</p>
        </div>
      </StatCard>

      {/* Cursos activos */}
      <StatCard
        label="Cursos activos"
        tone="violet"
        icon={<GraduationCap className="size-5 text-current" />}
      >
        <div className="mt-auto">
          <p className="text-4xl font-bold">{stats.activeCourses}</p>
          <p className="mt-1 text-sm opacity-70">En curso actualmente</p>
        </div>
      </StatCard>

      {/* Insignias */}
      <StatCard label="Insignias" tone="peach" icon={<Medal className="size-5 text-current" />}>
        <div className="mt-auto">
          <p className="text-4xl font-bold">{stats.badges}</p>
          <p className="mt-1 text-sm opacity-70">Logros desbloqueados</p>
        </div>
      </StatCard>

      {/* Asistencia */}
      <StatCard
        label="Asistencia"
        tone="plain"
        icon={<CalendarCheck className="size-5 text-primary" />}
      >
        <div className="mt-auto">
          <p className="text-4xl font-bold">{stats.attendancePercent}%</p>
          <ProgressBar value={stats.attendancePercent} className="mt-3" />
        </div>
      </StatCard>
    </div>
  )
}
