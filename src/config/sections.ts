export const SECTION_VISIBILITY = {
  inicio: true,
  beneficios: true,
  planes: true,
  cobertura: true,
  tienda: true,
  faq: true,
} as const

export const PLAN_PERIOD_VISIBILITY = {
  mensual: true,
  trimestral: true,
  semestral: true,
  anual: true,
} as const

export type PlanPeriodKey = keyof typeof PLAN_PERIOD_VISIBILITY

export type PlanConfig = {
  id: string
  visible: boolean
  name: string
  speed: number
  popular: boolean
  precios: Record<PlanPeriodKey, number>
  installationPrice: number
  features: string[]
}

export const PLANES_CONFIG: PlanConfig[] = [
  {
    id: 'basico',
    visible: true,
    name: 'Plan Básico',
    speed: 5,
    popular: false,
    precios: { mensual: 90, trimestral: 80, semestral: 70, anual: 65 },
    installationPrice: 200,
    features: ['Router WiFi incluido', 'Sin contratos'],
  },
  {
    id: 'hogar',
    visible: true,
    name: 'Plan Hogar',
    speed: 10,
    popular: true,
    precios: { mensual: 150, trimestral: 120, semestral: 110, anual: 90 },
    installationPrice: 200,
    features: ['Router WiFi incluido', 'Sin contratos'],
  },
  {
    id: 'plus',
    visible: true,
    name: 'Plan Plus',
    speed: 15,
    popular: false,
    precios: { mensual: 210, trimestral: 170, semestral: 150, anual: 110 },
    installationPrice: 200,
    features: ['Router WiFi incluido', 'Sin contratos'],
  },
  {
    id: 'premium',
    visible: false,
    name: 'Plan Premium',
    speed: 20,
    popular: false,
    precios: { mensual: 270, trimestral: 220, semestral: 190, anual: 150 },
    installationPrice: 200,
    features: ['Router WiFi incluido', 'Sin contratos'],
  },
]

export const NAV_ITEMS = [
  { key: 'inicio', href: '#inicio', label: 'Inicio' },
  { key: 'beneficios', href: '#beneficios', label: 'Beneficios' },
  { key: 'planes', href: '#planes', label: 'Planes' },
  { key: 'cobertura', href: '#cobertura', label: 'Cobertura' },
  { key: 'tienda', href: '#tienda', label: 'Tienda' },
  { key: 'faq', href: '#faq', label: 'FAQ' },
] as const

export type SectionKey = keyof typeof SECTION_VISIBILITY
