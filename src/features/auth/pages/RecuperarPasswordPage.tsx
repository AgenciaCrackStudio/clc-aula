import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react'
import { AuthSplitLayout } from '../../../components/layout/AuthSplitLayout.tsx'
import { BrandPanel } from '../../../components/layout/BrandPanel.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { TextField } from '../../../components/ui/TextField.tsx'
import { cn } from '../../../lib/cn.ts'
import { brandPresets } from '../brandPresets.ts'
import { recoverSchema, type RecoverValues } from '../validation.ts'
import { useAuth } from '../useAuth.ts'

export function RecuperarPasswordPage() {
  const { requestPasswordReset } = useAuth()
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecoverValues>({
    resolver: zodResolver(recoverSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = handleSubmit(async ({ email }) => {
    await requestPasswordReset(email)
    setSent(true)
  })

  return (
    <AuthSplitLayout brand={<BrandPanel {...brandPresets.impulsando} />}>
      <h2 className="text-3xl font-bold text-foreground">Recupera tu contraseña</h2>
      <p className="mt-2 text-muted">Ingresa tu correo y te enviaremos un enlace para restablecerla.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        <TextField
          type="email"
          autoComplete="email"
          placeholder="ejemplo@compañia.com"
          icon={<Mail className="size-5" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" loading={isSubmitting}>
          Enviar enlace <ArrowRight className="size-4" />
        </Button>
      </form>

      {sent && (
        <p className="mt-4 text-sm text-link">
          Si el correo está registrado, te enviamos un enlace para restablecer tu contraseña.
        </p>
      )}

      <Link
        to="/login"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-link hover:underline"
      >
        <ArrowLeft className="size-4" /> Volver a iniciar sesión
      </Link>

      <div className="mt-10 flex flex-col items-center gap-4">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn('size-1.5 rounded-full', i === 0 ? 'bg-primary' : 'bg-border')}
            />
          ))}
        </div>
        <p className="text-xs text-placeholder">© 2024 Centro de Liderazgo Comercial</p>
      </div>
    </AuthSplitLayout>
  )
}
