import type { BrandFeature } from '../../components/layout/BrandPanel.tsx'

export interface BrandPreset {
  title: string
  subtitle: string
  features?: BrandFeature[]
  footer?: 'wordmark' | 'community'
}

/** Brand-panel copy for each auth screen, matching the Figma layouts (CLC branding). */
export const brandPresets = {
  login: {
    title: 'Transforma tu visión en resultados de alto impacto.',
    subtitle: 'Únete a la comunidad de élite para directores comerciales y líderes de ventas.',
    features: [
      {
        title: 'Estrategias de Venta Consultiva',
        description: 'Metodologías probadas para cerrar deals complejos.',
      },
      {
        title: 'Gestión de Equipos de Alto Rendimiento',
        description: 'Liderazgo empático basado en datos y métricas.',
      },
      {
        title: 'Networking con C-Level',
        description: 'Acceso directo a mentores y directivos comerciales.',
      },
    ],
    footer: 'wordmark',
  },
  register: {
    title: 'Forma parte del Centro de Liderazgo Comercial',
    subtitle:
      'Desarrolla el criterio comercial que distingue a los profesionales que entregan resultados consistentes.',
    features: [
      { title: '21 cursos · 84 horas académicas · 3 niveles de progresión' },
      { title: 'Aula virtual con clases en vivo por Zoom y grabaciones' },
      { title: 'Certificados e insignias verificables al completar cada nivel' },
    ],
    footer: 'community',
  },
  impulsando: {
    title: 'Impulsando el Liderazgo Comercial del Mañana.',
    subtitle:
      'Accede a metodologías de alto rendimiento diseñadas por directores comerciales para líderes en ascenso.',
    footer: 'wordmark',
  },
} satisfies Record<string, BrandPreset>
