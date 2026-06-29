import { Outlet, useLocation } from 'react-router'
import { AulaSidebar } from './AulaSidebar.tsx'
import { AulaTopbar } from './AulaTopbar.tsx'

/** Topbar title per route. Defaults to "Dashboard" for the index aula route. */
const ROUTE_TITLES: Record<string, string> = {
  '/aula': 'Dashboard',
  '/aula/programas': 'Mis Programas',
  '/aula/calendario': 'Calendario',
  '/aula/perfil': 'Perfil',
  '/aula/evaluaciones': 'Evaluaciones',
  '/aula/certificados': 'Certificados',
  '/aula/tienda': 'Tienda',
  '/aula/settings': 'Settings',
}

/**
 * Shell for every authenticated aula screen: fixed dark sidebar, sticky topbar,
 * and a scrollable content area that renders the matched route via <Outlet />.
 */
export function AulaLayout() {
  const { pathname } = useLocation()
  const title = ROUTE_TITLES[pathname] ?? 'Dashboard'

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="hidden lg:flex">
        <AulaSidebar />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <AulaTopbar title={title} />
        <main className="flex-1 overflow-y-auto px-6 py-7 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
