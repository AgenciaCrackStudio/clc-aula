import { cn } from '../../lib/cn.ts'

interface LogoProps {
  className?: string
  /** 'light' = light text for dark backgrounds; 'dark' = dark text for light backgrounds. */
  tone?: 'light' | 'dark'
  showWordmark?: boolean
}

export function Logo({ className, tone = 'dark', showWordmark = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-on-primary">
        <BrandGlyph className="size-5" />
      </span>
      {showWordmark && (
        <span
          className={cn(
            'text-[15px] tracking-tight',
            tone === 'light' ? 'text-sidebar-foreground' : 'text-foreground',
          )}
        >
          <span className="font-extrabold">CLC</span>
          <span className="font-medium"> · Centro de Liderazgo Comercial</span>
        </span>
      )}
    </div>
  )
}

function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 15.5 L9.5 10 L13 13.5 L20 6.5"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 6.5 H20 V11"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 3.8 l0.62 1.5 1.5 0.62 -1.5 0.62 -0.62 1.5 -0.62 -1.5 -1.5 -0.62 1.5 -0.62 z"
        fill="currentColor"
      />
    </svg>
  )
}
