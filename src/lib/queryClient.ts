import { QueryClient } from '@tanstack/react-query'

/**
 * Single shared React Query client for the whole app.
 *
 * Defaults chosen for a Supabase-backed SPA:
 * - `staleTime: 60s` — data is considered fresh for a minute, so navigating
 *   back to a screen reuses the cache instead of refetching on every mount.
 * - `retry: 1` — Supabase/PostgREST errors are usually deterministic (RLS, 4xx),
 *   so retrying many times rarely helps; one retry covers transient network blips.
 * - `refetchOnWindowFocus` stays on (default) so data revalidates when the user
 *   comes back to the tab.
 *
 * Tune per query with the options on each `useQuery` call when a screen needs it.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
})
