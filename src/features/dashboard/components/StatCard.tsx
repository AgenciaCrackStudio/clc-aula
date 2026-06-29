import type { ReactNode } from 'react'
import { cn } from '../../../lib/cn.ts'

export type StatTone = 'mint' | 'sky' | 'violet' | 'peach' | 'plain'

const TONE_CLASSES: Record<StatTone, string> = {
  mint: 'bg-tint-mint text-tint-mint-ink',
  sky: 'bg-tint-sky text-tint-sky-ink',
  violet: 'bg-tint-violet text-tint-violet-ink',
  peach: 'bg-tint-peach text-tint-peach-ink',
  plain: 'border border-border bg-surface text-foreground',
}

interface StatCardProps {
  label: string
  tone: StatTone
  /** Top-right icon. Colour it via the caller (e.g. `text-current`). */
  icon?: ReactNode
  /** Card body — the focal value, ring or bar. */
  children: ReactNode
}

/**
 * Pastel stat tile. The tone sets the background and a deep "ink" text colour
 * the body inherits via `currentColor`; the caller supplies the focal content.
 */
export function StatCard({ label, tone, icon, children }: StatCardProps) {
  return (
    <div className={cn('flex min-h-[170px] flex-col rounded-2xl p-5', TONE_CLASSES[tone])}>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium opacity-80">{label}</p>
        {icon && <span className="shrink-0 opacity-90">{icon}</span>}
      </div>
      <div className="mt-4 flex flex-1 flex-col">{children}</div>
    </div>
  )
}
