import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { AuthSplitLayout } from '../../../components/layout/AuthSplitLayout.tsx'
import { BrandPanel } from '../../../components/layout/BrandPanel.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { TextField } from '../../../components/ui/TextField.tsx'
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter.tsx'
import { brandPresets } from '../brandPresets.ts'
import { resetSchema, type ResetValues } from '../validation.ts'
import { useAuth } from '../useAuth.ts'

export function RestablecerPasswordPage() {
  const { updatePassword } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '' },
  })
  const password = useWatch({ control, name: 'password' })

  const onSubmit = handleSubmit(async ({ password }) => {
    setFormError(null)
    const { error } = await updatePassword(password)
    if (error) {
      setFormError(error)
      return
    }
    setDone(true)
  })

  return (
    <AuthSplitLayout brand={<BrandPanel {...brandPresets.impulsando} />}>
      <h2 className="text-3xl font-bold text-foreground">Crea una nueva contraseña</h2>
      <p className="mt-2 text-muted">Establece una clave segura para volver a acceder a tu cuenta.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        <TextField
          label="Nueva contraseña"
          isPassword
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <PasswordStrengthMeter value={password ?? ''} />

        {formError && <p className="text-sm text-danger">{formError}</p>}
        {done && (
          <p className="text-sm text-link">
            Contraseña actualizada. Ya puedes iniciar sesión con tu nueva clave.
          </p>
        )}

        <Button type="submit" loading={isSubmitting} disabled={done}>
          Guardar contraseña <ArrowRight className="size-4" />
        </Button>
      </form>
    </AuthSplitLayout>
  )
}
