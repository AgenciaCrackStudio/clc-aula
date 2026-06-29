import type { ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../lib/cn.ts'

type Variant = 'primary' | 'outline' | 'soft'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  fullWidth = true,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-[15px] font-semibold transition-colors cursor-pointer',
        fullWidth && 'w-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' &&
          'bg-primary text-on-primary shadow-lg shadow-primary/30 hover:bg-primary-hover',
        variant === 'outline' && 'border border-primary bg-surface text-link hover:bg-primary/5',
        variant === 'soft' && 'bg-primary/10 text-primary-deep hover:bg-primary/15',
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="size-5 animate-spin" /> : children}
    </button>
  )
}
