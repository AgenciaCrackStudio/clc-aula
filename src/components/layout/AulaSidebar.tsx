import { useState } from 'react'
import { NavLink } from 'react-router'
import {
  BadgeCheck,
  Calendar,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingCart,
  User,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '../../lib/cn.ts'
import { useAuth } from '../../features/auth/useAuth.ts'

interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  /** Match the path exactly (used for the index/dashboard route). */
  end?: boolean
}

/**
 * Aula navigation. Only `/aula` (Dashboard) is wired today; the rest point at
 * their intended routes and light up once those screens exist.
 */
const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: '/aula', icon: LayoutDashboard, end: true },
  { label: 'Mis Programas', to: '/aula/programas', icon: GraduationCap },
  { label: 'Calendario', to: '/aula/calendario', icon: Calendar },
  { label: 'Perfil', to: '/aula/perfil', icon: User },
  { label: 'Evaluaciones', to: '/aula/evaluaciones', icon: ClipboardList },
  { label: 'Certificados', to: '/aula/certificados', icon: BadgeCheck },
  { label: 'Tienda', to: '/aula/tienda', icon: ShoppingCart },
  { label: 'Settings', to: '/aula/settings', icon: Settings },
]

export function AulaSidebar() {
  const { signOut } = useAuth()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    await signOut()
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="px-7 pb-8 pt-8">
        <p className="text-3xl font-extrabold tracking-tight">CLC</p>
        <p className="mt-1 text-sm leading-tight text-sidebar-muted">
          Centro de
          <br />
          Liderazgo Comercial
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-4">
        {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] transition-colors',
                "before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary before:transition-opacity before:content-['']",
                isActive
                  ? 'bg-white/5 font-semibold text-sidebar-foreground before:opacity-100'
                  : 'text-sidebar-muted before:opacity-0 hover:bg-white/5 hover:text-sidebar-foreground',
              )
            }
          >
            <Icon className="size-5 shrink-0" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Help card */}
      <div className="px-4 pb-4">
        <div className="rounded-2xl border border-sidebar-border bg-white/5 p-5">
          <p className="text-sm font-semibold text-sidebar-foreground">¿Necesitas ayuda?</p>
          <p className="mt-2 text-xs leading-relaxed text-sidebar-muted">
            Si tienes dudas técnicas o académicas, nuestro equipo de soporte ejecutivo está
            disponible para ti.
          </p>
          <a
            href="mailto:soporte@clc.com"
            className="mt-3 inline-block text-sm font-semibold text-primary hover:underline"
          >
            Contactar Tutor →
          </a>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] text-sidebar-muted transition-colors hover:bg-white/5 hover:text-sidebar-foreground disabled:opacity-60"
        >
          <LogOut className="size-5 shrink-0" strokeWidth={1.75} />
          {signingOut ? 'Cerrando sesión…' : 'Logout'}
        </button>
      </div>
    </aside>
  )
}
