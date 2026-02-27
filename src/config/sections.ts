export const SECTION_VISIBILITY = {
  inicio: true,
  beneficios: true,
  planes: true,
  cobertura: true,
  tienda: false,
  faq: true,
} as const

export const PLAN_PERIOD_VISIBILITY = {
  mensual: true,
  trimestral: true,
  semestral: false,
  anual: false,
} as const

export const NAV_ITEMS = [
  { key: 'inicio', href: '#inicio', label: 'Inicio' },
  { key: 'beneficios', href: '#beneficios', label: 'Beneficios' },
  { key: 'planes', href: '#planes', label: 'Planes' },
  { key: 'cobertura', href: '#cobertura', label: 'Cobertura' },
  { key: 'tienda', href: '#tienda', label: 'Tienda' },
  { key: 'faq', href: '#faq', label: 'FAQ' },
] as const

export type SectionKey = keyof typeof SECTION_VISIBILITY
export type PlanPeriodKey = keyof typeof PLAN_PERIOD_VISIBILITY
