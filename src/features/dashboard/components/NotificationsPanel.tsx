import { ClipboardList, Download, Medal, Trophy, type LucideIcon } from 'lucide-react'
import { cn } from '../../../lib/cn.ts'
import { useNotifications } from '../api/dashboard.ts'
import type { DashboardNotification, NotificationIcon } from '../api/types.ts'

const ICONS: Record<NotificationIcon, LucideIcon> = {
  evaluation: ClipboardList,
  certificate: Trophy,
  badge: Medal,
}

function NotificationRow({ item }: { item: DashboardNotification }) {
  const Icon = ICONS[item.icon]
  const isDanger = item.tone === 'danger'
  const showDownload = item.actionLabel.toLowerCase().includes('descargar')

  return (
    <li
      className={cn(
        'flex items-center gap-4 rounded-2xl border border-border border-l-4 bg-surface p-4 shadow-sm',
        isDanger ? 'border-l-danger' : 'border-l-primary',
      )}
    >
      <span
        className={cn(
          'grid size-11 shrink-0 place-items-center rounded-full',
          isDanger ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary-deep',
        )}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-bold text-foreground">{item.title}</p>
        <p className="mt-0.5 text-sm text-muted">{item.subtitle}</p>
      </div>

      <button
        type="button"
        className={cn(
          'inline-flex shrink-0 items-center gap-1 text-sm font-semibold hover:underline',
          isDanger ? 'text-danger' : 'text-link',
        )}
      >
        {item.actionLabel}
        {showDownload && <Download className="size-4" />}
      </button>
    </li>
  )
}

export function NotificationsPanel() {
  const { data: notifications, isLoading } = useNotifications()

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Pendientes y Novedades</h2>

      <ul className="space-y-3">
        {isLoading || !notifications
          ? Array.from({ length: 3 }).map((_, i) => (
              <li key={i} className="h-[88px] animate-pulse rounded-2xl bg-border/60" />
            ))
          : notifications.map((item) => <NotificationRow key={item.id} item={item} />)}
      </ul>
    </section>
  )
}
