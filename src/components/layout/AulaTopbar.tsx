import { Bell, HelpCircle, Search } from 'lucide-react'
import { Avatar } from '../ui/Avatar.tsx'
import { useAuth } from '../../features/auth/useAuth.ts'

const ROLE_LABELS: Record<string, string> = {
  student: 'Estudiante',
  teacher: 'Profesor',
  coordinator: 'Coordinador',
  director: 'Dirección',
  admin: 'Administrador',
}

interface AulaTopbarProps {
  /** Page title shown on the left (e.g. "Dashboard"). */
  title: string
}

export function AulaTopbar({ title }: AulaTopbarProps) {
  const { profile, user } = useAuth()

  const fullName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(' ').trim() ||
    user?.email ||
    'Alumno'
  const roleLabel = profile ? (ROLE_LABELS[profile.role] ?? profile.role) : ''

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-surface px-6 lg:px-8">
      <h1 className="text-lg font-semibold text-link">{title}</h1>

      {/* Search */}
      <form
        className="hidden items-center gap-2.5 rounded-full bg-background px-4 py-2.5 md:flex md:mx-auto md:w-72 lg:w-96"
        onSubmit={(e) => e.preventDefault()}
        role="search"
      >
        <Search className="size-4 shrink-0 text-placeholder" />
        <input
          type="search"
          placeholder="Buscar cursos..."
          aria-label="Buscar cursos"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-placeholder"
        />
      </form>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-background"
        >
          <Bell className="size-5" strokeWidth={1.75} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-surface" />
        </button>
        <button
          type="button"
          aria-label="Ayuda"
          className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-background"
        >
          <HelpCircle className="size-5" strokeWidth={1.75} />
        </button>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-sm font-bold text-foreground">{fullName}</p>
            {roleLabel && <p className="text-xs text-muted">{roleLabel}</p>}
          </div>
          <Avatar name={fullName} ring />
        </div>
      </div>
    </header>
  )
}
