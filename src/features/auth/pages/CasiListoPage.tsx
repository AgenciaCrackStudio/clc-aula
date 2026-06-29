import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { ExternalLink, Mail, RotateCw } from 'lucide-react'
import { CenteredCardLayout } from '../../../components/layout/CenteredCardLayout.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { useAuth } from '../useAuth.ts'

/** Best-effort link to the recipient's webmail inbox based on the email domain. */
function webmailUrl(email: string): string {
  const domain = email.split('@')[1]?.toLowerCase() ?? ''
  if (domain.includes('gmail') || domain.includes('googlemail'))
    return 'https://mail.google.com/mail/u/0/#inbox'
  if (domain.includes('outlook') || domain.includes('hotmail') || domain.includes('live'))
    return 'https://outlook.live.com/mail/'
  if (domain.includes('yahoo')) return 'https://mail.yahoo.com/'
  if (domain.includes('icloud') || domain.includes('me.com')) return 'https://www.icloud.com/mail'
  return domain ? `https://${domain}` : 'https://mail.google.com'
}

export function CasiListoPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resendConfirmation } = useAuth()
  const email = (location.state as { email?: string } | null)?.email
  const [sending, setSending] = useState(false)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (!email) navigate('/registro', { replace: true })
  }, [email, navigate])

  if (!email) return null

  const resend = async () => {
    setSending(true)
    await resendConfirmation(email)
    setSending(false)
    setResent(true)
  }

  return (
    <CenteredCardLayout>
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
        <span className="relative">
          <Mail className="size-7 text-primary" />
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
        </span>
      </div>

      <h1 className="mt-6 text-2xl font-bold text-foreground">¡Casi listo!</h1>
      <p className="mt-3 text-muted">
        Te enviamos un correo a <span className="font-semibold text-foreground">{email}</span> para
        confirmar tu cuenta.
        <br />
        <span className="font-semibold text-foreground">Por favor, revisa tu bandeja de entrada.</span>
      </p>

      <div className="mt-8 space-y-3">
        <Button onClick={() => window.open(webmailUrl(email), '_blank', 'noopener,noreferrer')}>
          <ExternalLink className="size-[18px]" /> Abrir mi correo
        </Button>
        <Button variant="outline" loading={sending} onClick={resend}>
          <RotateCw className="size-[18px]" /> Reenviar correo
        </Button>
      </div>

      {resent && (
        <p className="mt-3 text-sm text-link">Te reenviamos el correo de confirmación.</p>
      )}

      <hr className="my-7 border-border" />

      <p className="text-sm text-muted">
        ¿No recibiste nada? Revisa tu carpeta de spam
        <br />o intenta con otra dirección de correo.
      </p>
      <Link
        to="/registro"
        className="mt-4 inline-block text-sm font-semibold text-link hover:underline"
      >
        Volver al registro
      </Link>
    </CenteredCardLayout>
  )
}
