import type { ReactNode } from 'react'
import { cn } from '../../lib/cn.ts'

interface ProgressRingProps {
  /** Completion 0–100. */
  value: number
  /** Outer diameter in px. */
  size?: number
  /** Ring thickness in px. */
  strokeWidth?: number
  /** Tailwind text-* color class for the filled arc (uses `currentColor`). */
  indicatorClassName?: string
  /** Tailwind text-* color class for the unfilled track. */
  trackClassName?: string
  /** Centre content. Defaults to the rounded percentage. */
  children?: ReactNode
  className?: string
}

/**
 * Circular progress indicator drawn with SVG strokes. Colour is driven by
 * `currentColor`, so pass Tailwind `text-*` classes to recolour it.
 */
export function ProgressRing({
  value,
  size = 96,
  strokeWidth = 10,
  indicatorClassName = 'text-primary',
  trackClassName = 'text-border',
  children,
  className,
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          className={trackClassName}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn('transition-[stroke-dashoffset] duration-700 ease-out', indicatorClassName)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        {children ?? <span className="text-lg font-semibold">{Math.round(clamped)}%</span>}
      </span>
    </div>
  )
}
