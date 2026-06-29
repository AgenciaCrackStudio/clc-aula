import { CalendarDays, Video } from 'lucide-react'
import { useUpcomingClasses } from '../api/dashboard.ts'
import type { UpcomingClass } from '../api/types.ts'

/** Split an ISO timestamp into the badge day, month and the display time. */
function formatClass(startsAt: string) {
  const date = new Date(startsAt)
  const day = String(date.getDate()).padStart(2, '0')
  const month = new Intl.DateTimeFormat('es-ES', { month: 'short' })
    .format(date)
    .replace('.', '')
    .slice(0, 3)
    .toUpperCase()
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)
  return { day, month, time }
}

function ClassItem({ item }: { item: UpcomingClass }) {
  const { day, month, time } = formatClass(item.startsAt)
  const Icon = item.modality === 'live' ? Video : CalendarDays

  return (
    <li className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-info">
        <span className="text-lg font-bold leading-none text-link">{day}</span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
          {month}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-foreground">{item.title}</p>
        <p className="mt-0.5 text-sm text-muted">
          {time} · {item.instructor}
        </p>
      </div>

      <Icon
        className={item.modality === 'live' ? 'size-5 text-link' : 'size-5 text-muted'}
        strokeWidth={1.75}
      />
    </li>
  )
}

export function UpcomingClasses() {
  const { data: classes, isLoading } = useUpcomingClasses()

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Próximas clases en vivo</h2>

      <ul className="space-y-3">
        {isLoading || !classes
          ? Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="h-[88px] animate-pulse rounded-2xl bg-border/60" />
            ))
          : classes.map((item) => <ClassItem key={item.id} item={item} />)}
      </ul>
    </section>
  )
}
