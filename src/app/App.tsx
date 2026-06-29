import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { AuthProvider } from '../features/auth/AuthProvider.tsx'
import { useAuth } from '../features/auth/useAuth.ts'
import { ProtectedRoute } from '../routes/ProtectedRoute.tsx'
import { Spinner } from '../components/ui/Spinner.tsx'
import { LoginPage } from '../features/auth/pages/LoginPage.tsx'
import { RegisterPage } from '../features/auth/pages/RegisterPage.tsx'
import { CasiListoPage } from '../features/auth/pages/CasiListoPage.tsx'
import { VerificarCorreoPage } from '../features/auth/pages/VerificarCorreoPage.tsx'
import { RecuperarPasswordPage } from '../features/auth/pages/RecuperarPasswordPage.tsx'
import { RestablecerPasswordPage } from '../features/auth/pages/RestablecerPasswordPage.tsx'
import { AuthCallbackPage } from '../features/auth/pages/AuthCallbackPage.tsx'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage.tsx'

function IndexRedirect() {
  const { session, loading } = useAuth()
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner className="size-8" />
      </div>
    )
  }
  return <Navigate to={session ? '/aula' : '/login'} replace />
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<IndexRedirect />} />

          {/* Public auth flow */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/registro/confirmar" element={<CasiListoPage />} />
          <Route path="/verificar-correo" element={<VerificarCorreoPage />} />
          <Route path="/recuperar" element={<RecuperarPasswordPage />} />
          <Route path="/restablecer" element={<RestablecerPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Protected aula */}
          <Route element={<ProtectedRoute />}>
            <Route path="/aula" element={<DashboardPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
