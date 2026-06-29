import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { Logo } from '../../../components/ui/Logo.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { useAuth } from '../../auth/useAuth.ts'

const ROLE_LABELS: Record<string, string> = {
  student: 'Alumno',
  teacher: 'Profesor',
  coordinator: 'Coordinador',
  director: 'Dirección',
  admin: 'Administrador',
}

export function DashboardPage() {
  const { profile, user, signOut } = useAuth()
  const [signingOut, setSigningOut] = useState(false)

  const firstName = profile?.first_name?.trim() || 'alumno'
  const roleLabel = profile ? (ROLE_LABELS[profile.role] ?? profile.role) : '—'

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <Logo />
        <Button variant="outline" fullWidth={false} loading={signingOut} onClick={handleSignOut}>
          <LogOut className="size-4" /> Cerrar sesión
        </Button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-foreground">Hola, {firstName} 👋</h1>
        <p className="mt-3 text-muted">
          Bienvenido a tu aula virtual. Aquí verás tus cursos, sesiones en vivo y tu progreso.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-link">
          Rol: {roleLabel}
        </div>
        {user?.email && <p className="mt-3 text-sm text-muted">{user.email}</p>}
      </main>
    </div>
  )
}
