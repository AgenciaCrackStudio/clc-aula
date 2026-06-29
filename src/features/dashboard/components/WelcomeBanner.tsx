import { TrendingUp } from 'lucide-react'
import { Button } from '../../../components/ui/Button.tsx'
import { useAuth } from '../../auth/useAuth.ts'

function greetingFor(date: Date): string {
  const hour = date.getHours()
  if (hour >= 5 && hour < 12) return 'Buenos días'
  if (hour >= 12 && hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

export function WelcomeBanner() {
  const { profile } = useAuth()
  const firstName = profile?.first_name?.trim() || 'estudiante'
  const greeting = greetingFor(new Date())

  return (
    <section className="brand-gradient relative overflow-hidden rounded-3xl px-8 py-9 lg:px-10">
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-10 top-1/2 hidden size-72 -translate-y-1/2 items-center justify-center rounded-full bg-primary/15 md:flex">
        <TrendingUp className="size-24 text-primary/30" strokeWidth={1.5} />
      </div>

      <div className="relative max-w-xl">
        <h2 className="text-2xl font-bold text-sidebar-foreground">
          {greeting} {firstName} <span aria-hidden="true">👋</span>
        </h2>
        <p className="mt-1.5 text-lg font-medium text-primary">
          Bienvenido al Programa Profesional de Liderazgo Comercial
        </p>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-sidebar-muted">
          Continúa tu camino hacia la excelencia directiva. Tienes 2 sesiones pendientes esta
          semana.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button type="button" fullWidth={false} className="px-6">
            Ver mi progreso
          </Button>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-[15px] font-semibold text-sidebar-foreground transition-colors hover:bg-white/10"
          >
            Explorar catálogo
          </button>
        </div>
      </div>
    </section>
  )
}
