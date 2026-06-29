import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn.ts'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, className, id, name, ...props },
  ref,
) {
  const inputId = id ?? name

  return (
    <div>
      <label htmlFor={inputId} className="flex cursor-pointer items-start gap-2.5">
        <span className="relative mt-0.5 inline-flex size-5 shrink-0 items-center justify-center">
          <input
            id={inputId}
            name={name}
            ref={ref}
            type="checkbox"
            className={cn(
              'peer size-5 cursor-pointer appearance-none rounded-md border border-border bg-surface transition-colors',
              'checked:border-primary checked:bg-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
              className,
            )}
            {...props}
          />
          <Check
            strokeWidth={3}
            className="pointer-events-none absolute size-3.5 text-on-primary opacity-0 peer-checked:opacity-100"
          />
        </span>
        {label && <span className="text-sm leading-snug text-muted">{label}</span>}
      </label>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
})
