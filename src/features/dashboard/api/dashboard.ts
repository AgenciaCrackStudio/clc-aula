import { useQuery } from '@tanstack/react-query'
import {
  mockNotifications,
  mockPrograms,
  mockStats,
  mockUpcomingClasses,
} from './mockData.ts'
import type {
  DashboardNotification,
  DashboardStats,
  Program,
  UpcomingClass,
} from './types.ts'

/**
 * Dashboard server state. Every hook currently resolves mock data; to connect
 * the backend, swap the `queryFn` body for a Supabase read that returns the
 * same type. Query keys and component consumers don't change.
 *
 * e.g.
 *   queryFn: async () => {
 *     const { data, error } = await supabase.rpc('dashboard_stats')
 *     if (error) throw error
 *     return data
 *   }
 */

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => mockStats,
  })
}

export function usePrograms() {
  return useQuery<Program[]>({
    queryKey: ['dashboard', 'programs'],
    queryFn: async () => mockPrograms,
  })
}

export function useUpcomingClasses() {
  return useQuery<UpcomingClass[]>({
    queryKey: ['dashboard', 'classes'],
    queryFn: async () => mockUpcomingClasses,
  })
}

export function useNotifications() {
  return useQuery<DashboardNotification[]>({
    queryKey: ['dashboard', 'notifications'],
    queryFn: async () => mockNotifications,
  })
}
