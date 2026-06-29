import { forwardRef } from 'react'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn.ts'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className, id, name, children, ...props },
  ref,
) {
  const selectId = id ?? name

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div
        className={cn(
          'relative flex h-12 items-center rounded-xl border bg-surface transition-colors focus-within:border-border-strong',
          error ? 'border-danger' : 'border-border',
        )}
      >
        <select
          id={selectId}
          name={name}
          ref={ref}
          className={cn(
            'h-full w-full cursor-pointer appearance-none bg-transparent px-3.5 pr-10 text-sm text-foreground outline-none',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 size-4 text-muted" />
      </div>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
})
