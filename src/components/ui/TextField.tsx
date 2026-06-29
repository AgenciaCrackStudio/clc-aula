import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/cn.ts'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  /** Rendered on the right side of the label row (e.g. a "forgot password?" link). */
  labelAccessory?: ReactNode
  icon?: ReactNode
  error?: string
  /** Adds a show/hide toggle and manages the input type. */
  isPassword?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, labelAccessory, icon, error, isPassword, className, id, type, name, ...props },
  ref,
) {
  const [reveal, setReveal] = useState(false)
  const inputId = id ?? name
  const resolvedType = isPassword ? (reveal ? 'text' : 'password') : (type ?? 'text')

  return (
    <div className="w-full">
      {(label || labelAccessory) && (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {label ? (
            <label htmlFor={inputId} className="text-sm font-medium text-foreground">
              {label}
            </label>
          ) : (
            <span />
          )}
          {labelAccessory}
        </div>
      )}

      <div
        className={cn(
          'flex h-12 items-center gap-2.5 rounded-xl border bg-surface px-3.5 transition-colors',
          'focus-within:border-border-strong',
          error ? 'border-danger' : 'border-border',
        )}
      >
        {icon && <span className="shrink-0 text-placeholder">{icon}</span>}
        <input
          id={inputId}
          name={name}
          ref={ref}
          type={resolvedType}
          className={cn(
            'h-full w-full bg-transparent text-sm text-foreground outline-none placeholder:text-placeholder',
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setReveal((v) => !v)}
            className="shrink-0 text-placeholder transition-colors hover:text-muted"
            aria-label={reveal ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {reveal ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
})
