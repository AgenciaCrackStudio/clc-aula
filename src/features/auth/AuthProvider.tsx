import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { AuthError, Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase.ts'
import {
  AuthContext,
  type AuthContextValue,
  type Profile,
  type SignInResult,
  type SignUpInput,
} from './useAuth.ts'

function redirectTo(path: string): string {
  return `${window.location.origin}${path}`
}

/** Map Supabase auth errors to friendly Spanish copy. */
function translateAuthError(error: AuthError): string {
  const message = error.message.toLowerCase()
  if (message.includes('invalid login credentials')) return 'Correo o contraseña incorrectos.'
  if (message.includes('email not confirmed')) return 'Tu correo aún no está confirmado.'
  if (message.includes('already registered') || message.includes('already exists'))
    return 'Ya existe una cuenta con este correo.'
  if (message.includes('password')) return 'La contraseña no cumple los requisitos mínimos.'
  if (message.includes('rate limit') || message.includes('for security purposes'))
    return 'Demasiados intentos. Esperá unos minutos e intentá de nuevo.'
  if (message.includes('unable to validate email')) return 'El correo electrónico no es válido.'
  return 'Ocurrió un error. Intentá nuevamente.'
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data } = await supabase.from('users').select('*').eq('id', userId).maybeSingle()
  return data ?? null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return
      setSession(data.session)
      setProfile(data.session?.user ? await fetchProfile(data.session.user.id) : null)
      setLoading(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!active) return
      setSession(nextSession)
      setProfile(nextSession?.user ? await fetchProfile(nextSession.user.id) : null)
    })

    return () => {
      active = false
      subscription.subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback<AuthContextValue['signIn']>(async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      const result: SignInResult = { error: translateAuthError(error) }
      if (error.message.toLowerCase().includes('email not confirmed')) {
        result.needsVerification = true
      }
      return result
    }
    // Only students may use the aula. Any other role is bounced out.
    const signedInProfile = data.user ? await fetchProfile(data.user.id) : null
    if (signedInProfile && signedInProfile.role !== 'student') {
      await supabase.auth.signOut()
      return { error: 'Esta cuenta no tiene acceso al aula del alumno.' }
    }
    return { error: null }
  }, [])

  const signUp = useCallback<AuthContextValue['signUp']>(async (input: SignUpInput) => {
    const { error } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
      options: {
        emailRedirectTo: redirectTo('/auth/callback'),
        data: {
          first_name: input.firstName,
          last_name: input.lastName,
          phone: input.phone,
          country: input.country,
          marketing_opt_in: input.marketingOptIn,
          accepted_terms: input.acceptedTerms,
        },
      },
    })
    return { error: error ? translateAuthError(error) : null }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const resendConfirmation = useCallback<AuthContextValue['resendConfirmation']>(async (email) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: redirectTo('/auth/callback') },
    })
    return { error: error ? translateAuthError(error) : null }
  }, [])

  const requestPasswordReset = useCallback<AuthContextValue['requestPasswordReset']>(
    async (email) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectTo('/restablecer'),
      })
      return { error: error ? translateAuthError(error) : null }
    },
    [],
  )

  const updatePassword = useCallback<AuthContextValue['updatePassword']>(async (password) => {
    const { error } = await supabase.auth.updateUser({ password })
    return { error: error ? translateAuthError(error) : null }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      resendConfirmation,
      requestPasswordReset,
      updatePassword,
    }),
    [
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      resendConfirmation,
      requestPasswordReset,
      updatePassword,
    ],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
