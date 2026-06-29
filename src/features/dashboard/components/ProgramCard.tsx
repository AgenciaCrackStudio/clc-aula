import { BadgeCheck } from 'lucide-react'
import { Button } from '../../../components/ui/Button.tsx'
import { ProgressBar } from '../../../components/ui/ProgressBar.tsx'
import { cn } from '../../../lib/cn.ts'
import type { Program, ProgramStatus } from '../api/types.ts'

const STATUS_META: Record<
  ProgramStatus,
  { topBar: string; percent: string; label: string }
> = {
  completed: { topBar: 'bg-primary', percent: 'text-primary', label: 'Completado' },
  in_progress: { topBar: 'bg-primary-deep', percent: 'text-primary', label: 'En curso' },
  locked: { topBar: 'bg-border', percent: 'text-muted', label: 'Por iniciar' },
}

function ProgramCta({ status }: { status: ProgramStatus }) {
  if (status === 'completed') {
    return (
      <Button variant="soft" type="button">
        <BadgeCheck className="size-5" /> Certificado disponible
      </Button>
    )
  }
  if (status === 'in_progress') {
    return (
      <Button variant="outline" type="button">
        Continuar curso
      </Button>
    )
  }
  return (
    <button
      type="button"
      disabled
      className="h-12 w-full cursor-not-allowed rounded-xl border border-border text-[15px] font-semibold text-placeholder"
    >
      Bloqueado
    </button>
  )
}

export function ProgramCard({ program }: { program: Program }) {
  const meta = STATUS_META[program.status]

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className={cn('h-1.5 w-full', meta.topBar)} />

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {program.track} · {program.level}
        </p>
        <h3 className="mt-2 text-lg font-bold text-foreground">{program.title}</h3>

        <div className="mt-6 flex items-baseline justify-between">
          <span className={cn('text-sm font-bold', meta.percent)}>{program.progressPercent}%</span>
          <span className="text-sm text-muted">{meta.label}</span>
        </div>
        <ProgressBar value={program.progressPercent} className="mt-2" />

        <div className="mt-6">
          <ProgramCta status={program.status} />
        </div>
      </div>
    </article>
  )
}
