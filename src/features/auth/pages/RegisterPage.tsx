import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router'
import { ArrowLeft, ArrowRight, BadgeCheck } from 'lucide-react'
import { AuthSplitLayout } from '../../../components/layout/AuthSplitLayout.tsx'
import { BrandPanel } from '../../../components/layout/BrandPanel.tsx'
import { Button } from '../../../components/ui/Button.tsx'
import { Checkbox } from '../../../components/ui/Checkbox.tsx'
import { Select } from '../../../components/ui/Select.tsx'
import { TextField } from '../../../components/ui/TextField.tsx'
import { cn } from '../../../lib/cn.ts'
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter.tsx'
import { brandPresets } from '../brandPresets.ts'
import { COUNTRIES, DEFAULT_COUNTRY, dialFor } from '../constants.ts'
import {
  passwordSchema,
  registerDetailsSchema,
  type PasswordValues,
  type RegisterDetailsValues,
} from '../validation.ts'
import { useAuth } from '../useAuth.ts'
import type { AuthResult } from '../useAuth.ts'

const TermsLabel = (
  <>
    Acepto los <span className="font-medium text-link">Términos y Condiciones</span> y la{' '}
    <span className="font-medium text-link">Política de Privacidad.</span>
  </>
)

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<'details' | 'password'>('details')
  const [details, setDetails] = useState<RegisterDetailsValues>({
    firstName: '',
    lastName: '',
    email: '',
    country: DEFAULT_COUNTRY,
    phone: '',
    acceptedTerms: false,
    marketingOptIn: true,
  })

  const createAccount = async (password: string, acceptedTerms: boolean): Promise<AuthResult> => {
    const result = await signUp({
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phone: `${dialFor(details.country)} ${details.phone}`.trim(),
      country: details.country,
      marketingOptIn: details.marketingOptIn,
      acceptedTerms,
      password,
    })
    if (!result.error) {
      navigate('/registro/confirmar', { state: { email: details.email } })
    }
    return result
  }

  return (
    <AuthSplitLayout brand={<BrandPanel {...brandPresets.register} />}>
      {step === 'details' ? (
        <DetailsStep
          defaultValues={details}
          onNext={(values) => {
            setDetails(values)
            setStep('password')
          }}
        />
      ) : (
        <PasswordStep
          details={details}
          onBack={() => setStep('details')}
          onCreateAccount={createAccount}
        />
      )}
    </AuthSplitLayout>
  )
}

function DetailsStep({
  defaultValues,
  onNext,
}: {
  defaultValues: RegisterDetailsValues
  onNext: (values: RegisterDetailsValues) => void
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterDetailsValues>({
    resolver: zodResolver(registerDetailsSchema),
    defaultValues,
  })

  const dial = dialFor(useWatch({ control, name: 'country' }))

  return (
    <>
      <h2 className="text-3xl font-bold text-foreground">Crear cuenta</h2>
      <p className="mt-2 text-muted">Completa tus datos para empezar tu formación ejecutiva.</p>

      <form onSubmit={handleSubmit(onNext)} className="mt-7 space-y-5" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Nombre"
            placeholder="Ej. Roberto"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <TextField
            label="Apellido"
            placeholder="Ej. Delgado"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <TextField
          label="Email corporativo"
          type="email"
          placeholder="nombre@empresa.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
              Teléfono
            </label>
            <div
              className={cn(
                'flex h-12 overflow-hidden rounded-xl border bg-surface transition-colors focus-within:border-border-strong',
                errors.phone ? 'border-danger' : 'border-border',
              )}
            >
              <span className="flex items-center bg-background px-3 text-sm font-medium text-muted">
                {dial}
              </span>
              <input
                id="phone"
                inputMode="tel"
                placeholder="999 999 999"
                className="h-full w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-placeholder"
                {...register('phone')}
              />
            </div>
            {errors.phone && <p className="mt-1.5 text-xs text-danger">{errors.phone.message}</p>}
          </div>

          <Select label="País" error={errors.country?.message} {...register('country')}>
            {COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-3 pt-1">
          <Checkbox label={TermsLabel} error={errors.acceptedTerms?.message} {...register('acceptedTerms')} />
          <Checkbox
            label="Deseo recibir novedades, eventos y recursos exclusivos para líderes comerciales."
            {...register('marketingOptIn')}
          />
        </div>

        <Button type="submit">Crear contraseña</Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-link hover:underline">
          Inicia sesión
        </Link>
      </p>
    </>
  )
}

function PasswordStep({
  details,
  onBack,
  onCreateAccount,
}: {
  details: RegisterDetailsValues
  onBack: () => void
  onCreateAccount: (password: string, acceptedTerms: boolean) => Promise<AuthResult>
}) {
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', acceptedTerms: false },
  })
  const password = useWatch({ control, name: 'password' })

  const onSubmit = handleSubmit(async ({ password, acceptedTerms }) => {
    setFormError(null)
    const { error } = await onCreateAccount(password, acceptedTerms)
    if (error) setFormError(error)
  })

  return (
    <>
      <h2 className="text-3xl font-bold text-foreground">Crea tu contraseña</h2>
      <p className="mt-2 text-muted">
        Establece una clave segura para acceder al Centro de Liderazgo.
      </p>

      <form onSubmit={onSubmit} className="mt-7 space-y-5" noValidate>
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-background px-4 py-3 text-left">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {details.firstName} {details.lastName}
            </p>
            <p className="truncate text-sm text-muted">{details.email}</p>
          </div>
          <BadgeCheck className="size-5 shrink-0 text-primary" />
        </div>

        <TextField
          label="Nueva contraseña"
          isPassword
          autoComplete="new-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <PasswordStrengthMeter value={password ?? ''} />

        <Checkbox
          label={
            <>
              Estoy de acuerdo con los{' '}
              <span className="font-medium text-link">términos y condiciones</span> de uso y la
              política de privacidad.
            </>
          }
          error={errors.acceptedTerms?.message}
          {...register('acceptedTerms')}
        />

        {formError && <p className="text-sm text-danger">{formError}</p>}

        <Button type="submit" loading={isSubmitting}>
          Activar acceso <ArrowRight className="size-4" />
        </Button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Volver al paso anterior
      </button>
    </>
  )
}
