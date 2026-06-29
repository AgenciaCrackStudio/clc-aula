import { WelcomeBanner } from '../components/WelcomeBanner.tsx'
import { StatsGrid } from '../components/StatsGrid.tsx'
import { ProgramsSection } from '../components/ProgramsSection.tsx'
import { UpcomingClasses } from '../components/UpcomingClasses.tsx'
import { NotificationsPanel } from '../components/NotificationsPanel.tsx'

/**
 * Student dashboard. The app shell (sidebar + topbar) is provided by
 * <AulaLayout>; this page composes the content sections. Everything below the
 * topbar reads mock data through the `useDashboard*` hooks — swap those query
 * functions for Supabase to go live.
 */
export function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <WelcomeBanner />
      <StatsGrid />
      <ProgramsSection />

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingClasses />
        <NotificationsPanel />
      </div>
    </div>
  )
}
