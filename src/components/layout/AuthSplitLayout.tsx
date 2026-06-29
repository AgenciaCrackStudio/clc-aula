import type { ReactNode } from 'react'

interface AuthSplitLayoutProps {
  /** Content of the dark brand panel (left on desktop, hidden on mobile). */
  brand: ReactNode
  /** The form / right-hand content. */
  children: ReactNode
}

export function AuthSplitLayout({ brand, children }: AuthSplitLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-surface shadow-xl lg:min-h-[680px] lg:grid-cols-2">
        <div className="brand-gradient hidden lg:block">{brand}</div>
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  )
}
