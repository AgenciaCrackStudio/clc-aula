import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Logo } from '../ui/Logo.tsx'

export interface BrandFeature {
  title: string
  description?: string
}

interface BrandPanelProps {
  title: ReactNode
  subtitle: string
  features?: BrandFeature[]
  footer?: 'wordmark' | 'community'
}

export function BrandPanel({ title, subtitle, features, footer }: BrandPanelProps) {
  return (
    <div className="flex h-full flex-col justify-between p-10 lg:p-12">
      <Logo tone="light" />

      <div className="my-10 max-w-md">
        <h1 className="text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-sidebar-foreground">
          {title}
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-sidebar-muted">{subtitle}</p>

        {features && features.length > 0 && (
          <ul className="mt-9 space-y-5">
            {features.map((feature) => (
              <li key={feature.title} className="flex gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Check className="size-3 text-on-primary" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-sidebar-foreground">{feature.title}</p>
                  {feature.description && (
                    <p className="mt-0.5 text-sm leading-relaxed text-sidebar-muted">
                      {feature.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {footer === 'wordmark' && (
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
          <span className="size-1.5 rounded-full bg-primary" />
          CLC · Centro de Liderazgo Comercial
        </div>
      )}

      {footer === 'community' && (
        <div className="border-t border-sidebar-border pt-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-8 rounded-full border-2 border-sidebar bg-sidebar-muted/40"
                />
              ))}
            </div>
            <p className="text-sm text-sidebar-muted">
              Únete a más de{' '}
              <span className="font-semibold text-sidebar-foreground">2,500</span> directivos
              comerciales
            </p>
          </div>
        </div>
      )}

      {!footer && <span />}
    </div>
  )
}
