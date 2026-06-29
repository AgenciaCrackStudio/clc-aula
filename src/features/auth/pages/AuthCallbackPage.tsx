import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AlertCircle, ArrowRight, BadgeCheck } from 'lucide-react'
import { CenteredCardLayout } from '../../../components/layout/CenteredCardLayout.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { Spinner } from '../../../components/ui/Spinner.tsx'
import { useAuth } from '../useAuth.ts'

/** True when the callback URL carries an explicit auth error (query or hash). */
function readUrlError(): boolean {
  const query = new URLSearchParams(window.location.search)
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  return Boolean(query.get('error') || query.get('error_description') || hash.get('error'))
}

export function AuthCallbackPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  // Read once on mount — avoids setState-in-effect.
  const [urlError] = useState(readUrlError)
  const [timedOut, setTimedOut] = useState(false)

  // supabase-js exchanges the confirmation code automatically (detectSessionInUrl).
  // If no session ever arrives, treat the link as invalid/expired.
  useEffect(() => {
    if (urlError) return
    const timer = setTimeout(() => setTimedOut(true), 9000)
    return () => clearTimeout(timer)
  }, [urlError])

  const status: 'loading' | 'success' | 'error' = session
    ? 'success'
    : urlError || timedOut
      ? 'error'
      : 'loading'

  if (status === 'loading') {
    return (
      <CenteredCardLayout>
        <Spinner className="mx-auto size-8" />
        <p className="mt-4 text-muted">Verificando tu cuenta…</p>
      </CenteredCardLayout>
    )
  }

  if (status === 'error') {
    return (
      <CenteredCardLayout>
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-danger/10">
          <AlertCircle className="size-8 text-danger" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">El enlace no es válido</h1>
        <p className="mt-3 text-muted">
          El enlace de confirmación expiró o ya fue utilizado. Inicia sesión o solicita uno nuevo.
        </p>
        <div className="mt-8">
          <Button onClick={() => navigate('/login')}>Volver a iniciar sesión</Button>
        </div>
      </CenteredCardLayout>
    )
  }

  return (
    <CenteredCardLayout>
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
        <BadgeCheck className="size-8 text-primary" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">¡Cuenta verificada!</h1>
      <p className="mt-3 text-muted">
        Tu correo fue confirmado con éxito. Ya tienes acceso completo a todas las herramientas de
        liderazgo y tu aula virtual.
      </p>
      <div className="mt-8">
        <Button onClick={() => navigate('/aula')}>
          Ir al aula <ArrowRight className="size-4" />
        </Button>
      </div>

      <hr className="my-7 border-border" />

      <p className="text-sm text-muted">
        ¿Necesitas ayuda?{' '}
        <a href="mailto:soporte@clc.com" className="font-semibold text-link hover:underline">
          Contactar a soporte
        </a>
      </p>
    </CenteredCardLayout>
  )
}
