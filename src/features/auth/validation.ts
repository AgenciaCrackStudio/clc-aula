import { z } from 'zod'

const email = z
  .string()
  .min(1, 'Ingresa tu correo electrónico')
  .email('Ingresa un correo válido')

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Ingresa tu contraseña'),
})
export type LoginValues = z.infer<typeof loginSchema>

/** Step 1 of the sign-up wizard: personal + contact details. */
export const registerDetailsSchema = z.object({
  firstName: z.string().trim().min(1, 'Ingresa tu nombre'),
  lastName: z.string().trim().min(1, 'Ingresa tu apellido'),
  email,
  country: z.string().min(1, 'Selecciona tu país'),
  phone: z.string().trim().min(6, 'Ingresa un teléfono válido'),
  acceptedTerms: z
    .boolean()
    .refine((v) => v, 'Debes aceptar los Términos y la Política de Privacidad'),
  marketingOptIn: z.boolean(),
})
export type RegisterDetailsValues = z.infer<typeof registerDetailsSchema>

const strongPassword = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .regex(/[A-Z]/, 'Incluye al menos una mayúscula')
  .regex(/[0-9]/, 'Incluye al menos un número')

/** Step 2 of the sign-up wizard: password + terms. */
export const passwordSchema = z.object({
  password: strongPassword,
  acceptedTerms: z
    .boolean()
    .refine((v) => v, 'Debes aceptar los términos y condiciones'),
})
export type PasswordValues = z.infer<typeof passwordSchema>

export const recoverSchema = z.object({ email })
export type RecoverValues = z.infer<typeof recoverSchema>

export const resetSchema = z.object({ password: strongPassword })
export type ResetValues = z.infer<typeof resetSchema>

/** Live rules rendered by the PasswordStrength meter. */
export const PASSWORD_RULES: { label: string; test: (v: string) => boolean }[] = [
  { label: 'Mínimo 8 caracteres', test: (v) => v.length >= 8 },
  { label: 'Al menos una mayúscula', test: (v) => /[A-Z]/.test(v) },
  { label: 'Al menos un número', test: (v) => /[0-9]/.test(v) },
]

export interface PasswordStrengthResult {
  /** 0–4 */
  score: number
  label: 'Débil' | 'Media' | 'Fuerte'
}

export function passwordStrength(value: string): PasswordStrengthResult {
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 12) score++

  const label = score <= 1 ? 'Débil' : score <= 3 ? 'Media' : 'Fuerte'
  return { score, label }
}
