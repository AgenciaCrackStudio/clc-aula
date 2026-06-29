import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Info, Mail, RotateCw } from 'lucide-react'
import { AuthSplitLayout } from '../../../components/layout/AuthSplitLayout.tsx'
import { BrandPanel } from '../../../components/layout/BrandPanel.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { brandPresets } from '../brandPresets.ts'
import { useAuth } from '../useAuth.ts'

export function VerificarCorreoPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resendConfirmation } = useAuth()
  const email = (location.state as { email?: string } | null)?.email ?? ''
  const [sending, setSending] = useState(false)
  const [resent, setResent] = useState(false)

  const resend = async () => {
    if (!email) return
    setSending(true)
    await resendConfirmation(email)
    setSending(false)
    setResent(true)
  }

  return (
    <AuthSplitLayout brand={<BrandPanel {...brandPresets.impulsando} />}>
      <div className="text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10">
          <span className="relative">
            <Mail className="size-7 text-primary" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
          </span>
        </div>

        <h2 className="mt-6 text-3xl font-bold text-foreground">Verifica tu correo</h2>
        <p className="mt-3 text-muted">
          Te enviamos un enlace a{' '}
          <span className="font-medium text-foreground">{email || 'tu correo'}</span>. Haz clic en él
          para activar tu cuenta e ingresar al aula.
        </p>

        <div className="mt-7">
          <Button variant="outline" loading={sending} disabled={!email} onClick={resend}>
            <RotateCw className="size-[18px]" /> Reenviar correo
          </Button>
          {resent && <p className="mt-3 text-sm text-link">Te reenviamos el enlace de verificación.</p>}
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-info p-4 text-left">
          <Info className="mt-0.5 size-4 shrink-0 text-muted" />
          <p className="text-sm text-info-foreground">
            <span className="font-semibold text-foreground">¿No lo encuentras?</span> Revisa tu carpeta
            de spam o asegúrate de que el correo ingresado sea el correcto.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mt-8 text-sm font-semibold text-link hover:underline"
        >
          Cambiar dirección de correo
        </button>
      </div>
    </AuthSplitLayout>
  )
}
