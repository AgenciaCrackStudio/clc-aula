import type { ReactNode } from 'react'

interface AuthSplitLayoutProps {
  /** Content of the dark brand panel (left on desktop, hidden on mobile). */
  brand: ReactNode
  /** The form / right-hand content. */
  children: ReactNode
}

export function AuthSplitLayout({ brand, children }: AuthSplitLayoutProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[2fr_3fr]">
      <div className="brand-gradient hidden lg:block">{brand}</div>
      <div className="flex min-h-screen items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-[35rem] rounded-3xl bg-surface p-8 shadow-xl sm:p-10">
          {children}
        </div>
      </div>
    </div>
  )
}
