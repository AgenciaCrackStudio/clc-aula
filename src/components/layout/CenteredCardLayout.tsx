import type { ReactNode } from 'react'

export function CenteredCardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-xl sm:p-10">
        {children}
      </div>
    </div>
  )
}
