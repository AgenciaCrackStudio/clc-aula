export interface Country {
  /** ISO 3166-1 alpha-2 code, stored in public.users.country */
  code: string
  name: string
  /** International dialing prefix shown next to the phone field */
  dial: string
}

export const COUNTRIES: Country[] = [
  { code: 'PE', name: 'Perú', dial: '+51' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'CR', name: 'Costa Rica', dial: '+506' },
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'GT', name: 'Guatemala', dial: '+502' },
  { code: 'HN', name: 'Honduras', dial: '+504' },
  { code: 'MX', name: 'México', dial: '+52' },
  { code: 'NI', name: 'Nicaragua', dial: '+505' },
  { code: 'PA', name: 'Panamá', dial: '+507' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'DO', name: 'República Dominicana', dial: '+1' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'VE', name: 'Venezuela', dial: '+58' },
  { code: 'ES', name: 'España', dial: '+34' },
]

export const DEFAULT_COUNTRY = 'PE'

export function dialFor(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.dial ?? ''
}
