import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router'
import { Lock, Mail } from 'lucide-react'
import { AuthSplitLayout } from '../../../components/layout/AuthSplitLayout.tsx'
import { BrandPanel } from '../../../components/layout/BrandPanel.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { TextField } from '../../../components/ui/TextField.tsx'
import { brandPresets } from '../brandPresets.ts'
import { loginSchema, type LoginValues } from '../validation.ts'
import { useAuth } from '../useAuth.ts'

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    const { error, needsVerification } = await signIn(values.email, values.password)
    if (needsVerification) {
      navigate('/verificar-correo', { state: { email: values.email } })
      return
    }
    if (error) {
      setFormError(error)
      return
    }
    navigate('/aula')
  })

  return (
    <AuthSplitLayout brand={<BrandPanel {...brandPresets.login} />}>
      <h2 className="text-3xl font-bold text-foreground">Bienvenido de vuelta</h2>
      <p className="mt-2 text-muted">Ingresa a tu aula virtual para continuar tu formación.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
        <TextField
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          placeholder="ejemplo@compañia.com"
          icon={<Mail className="size-5" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Contraseña"
          isPassword
          autoComplete="current-password"
          placeholder="••••••••"
          icon={<Lock className="size-5" />}
          error={errors.password?.message}
          labelAccessory={
            <Link to="/recuperar" className="text-sm font-medium text-link hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          }
          {...register('password')}
        />

        {formError && <p className="text-sm text-danger">{formError}</p>}

        <Button type="submit" loading={isSubmitting}>
          Iniciar sesión
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="font-semibold text-link hover:underline">
          Crear cuenta gratis
        </Link>
      </p>
    </AuthSplitLayout>
  )
}
