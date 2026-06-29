import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import type { Database } from '../../lib/database.types.ts'

export type Profile = Database['public']['Tables']['users']['Row']

export interface SignUpInput {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  marketingOptIn: boolean
  acceptedTerms: boolean
  password: string
}

export interface AuthResult {
  error: string | null
}

export interface SignInResult extends AuthResult {
  /** True when the account exists but its email is not confirmed yet. */
  needsVerification?: boolean
}

export interface AuthContextValue {
  session: Session | null
  user: User | null
  profile: Profile | null
  /** True until the initial session lookup resolves. */
  loading: boolean
  signIn: (email: string, password: string) => Promise<SignInResult>
  signUp: (input: SignUpInput) => Promise<AuthResult>
  signOut: () => Promise<void>
  resendConfirmation: (email: string) => Promise<AuthResult>
  requestPasswordReset: (email: string) => Promise<AuthResult>
  updatePassword: (password: string) => Promise<AuthResult>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return ctx
}
