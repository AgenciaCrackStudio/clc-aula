import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../features/auth/useAuth.ts'
import { Spinner } from '../components/ui/Spinner.tsx'

export function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
