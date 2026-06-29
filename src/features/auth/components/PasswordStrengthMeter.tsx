import { Check } from 'lucide-react'
import { cn } from '../../../lib/cn.ts'
import { PASSWORD_RULES, passwordStrength } from '../validation.ts'

export function PasswordStrengthMeter({ value }: { value: string }) {
  const { score, label } = passwordStrength(value)

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-muted">Fortaleza</span>
        <span className="text-muted">{value ? label : ''}</span>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn('h-1.5 flex-1 rounded-full', i < score ? 'bg-primary' : 'bg-border')}
          />
        ))}
      </div>

      <ul className="mt-4 space-y-2.5">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(value)
          return (
            <li key={rule.label} className="flex items-center gap-2.5 text-sm">
              <span
                className={cn(
                  'flex size-5 items-center justify-center rounded-full border transition-colors',
                  ok ? 'border-primary bg-primary text-on-primary' : 'border-border text-transparent',
                )}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              <span className={ok ? 'text-foreground' : 'text-muted'}>{rule.label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
