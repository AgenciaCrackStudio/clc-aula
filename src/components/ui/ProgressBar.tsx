import { cn } from '../../lib/cn.ts'

interface ProgressBarProps {
  /** Completion 0–100. */
  value: number
  /** Tailwind bg-* class for the filled portion. */
  indicatorClassName?: string
  /** Tailwind bg-* class for the track. */
  trackClassName?: string
  className?: string
}

/** Slim rounded linear progress bar. */
export function ProgressBar({
  value,
  indicatorClassName = 'bg-primary',
  trackClassName = 'bg-border',
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full', trackClassName, className)}>
      <div
        className={cn('h-full rounded-full transition-[width] duration-700 ease-out', indicatorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
