'use client'

import { type Dispatch, type SetStateAction, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

type Periodo = 'mensual' | 'trimestral' | 'semestral' | 'anual'

type Plan = {
  name: string
  speed: number
  precios: Record<Periodo, number>
  popular?: boolean
}

type Faq = { q: string; a: string }

type SectionVisibility = {
  beneficios: boolean
  planes: boolean
  cobertura: boolean
  tienda: boolean
  condiciones: boolean
  faq: boolean
}

type SiteConfig = {
  brandName: string
  tagline: string
  heroTitle: string
  heroSubtitle: string
  whatsappPrincipal: string
  whatsappTienda: string
  facebookUrl: string
  coberturaUrl: string
  beneficios: { title: string; description: string }[]
  planes: Plan[]
  tiendaServicios: string[]
  faq: Faq[]
  visibility: SectionVisibility
}

const STORAGE_KEY = 'zona-center-dashboard-v1'
const ADMIN_STORAGE_KEY = 'zona-center-admin-auth'

const defaultConfig: SiteConfig = {
  brandName: 'Zona Center',
  tagline: '#zonawimax',
  heroTitle: 'Internet inalámbrico estable para tu hogar y negocio',
  heroSubtitle:
    'Conectamos Cochabamba con una red rápida, asistencia personalizada y planes para cada necesidad.',
  whatsappPrincipal: '59162649081',
  whatsappTienda: '59162651988',
  facebookUrl: 'https://www.facebook.com/zonawimax',
  coberturaUrl:
    'https://www.google.com/maps/d/u/0/viewer?mid=1izUhztL0r_G3XDU9h56e_b3tlIVbSO7N&ll=-17.47784992744687%2C-66.1406598&z=15',
  beneficios: [
    {
      title: 'Prueba del servicio',
      description: 'Puedes probar el servicio y decidir sin compromiso de permanencia.'
    },
    {
      title: 'Pagos flexibles',
      description: 'Aceptamos QR, transferencia bancaria y pago en tienda física.'
    },
    {
      title: 'Sin contratos forzosos',
      description: 'El servicio se adapta a tu ritmo, sin penalidades innecesarias.'
    },
    {
      title: 'Atención VIP',
      description: 'Clientes con beneficios exclusivos y soporte prioritario.'
    }
  ],
  planes: [
    { name: 'Plan Básico', speed: 5, precios: { mensual: 90, trimestral: 80, semestral: 70, anual: 65 } },
    {
      name: 'Plan Hogar',
      speed: 10,
      precios: { mensual: 150, trimestral: 120, semestral: 110, anual: 90 },
      popular: true
    },
    { name: 'Plan Plus', speed: 15, precios: { mensual: 210, trimestral: 170, semestral: 150, anual: 110 } },
    { name: 'Plan Premium', speed: 20, precios: { mensual: 270, trimestral: 220, semestral: 190, anual: 150 } }
  ],
  tiendaServicios: ['Instalación de cámaras', 'Soporte técnico', 'Accesorios de red', 'Mantenimiento de equipos'],
  faq: [
    {
      q: '¿Cuánto demora la instalación?',
      a: 'Normalmente instalamos en 24 a 72 horas según tu zona de cobertura.'
    },
    {
      q: '¿Tiene costo la visita técnica?',
      a: 'La evaluación inicial de cobertura no tiene costo en zonas habilitadas.'
    },
    {
      q: '¿Qué necesito para contratar?',
      a: 'Solo tu documento de identidad y una referencia de ubicación del domicilio.'
    }
  ],
  visibility: {
    beneficios: true,
    planes: true,
    cobertura: true,
    tienda: true,
    condiciones: true,
    faq: true
  }
}

function parseCsv(input: string) {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function Navbar({ config }: { config: SiteConfig }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#inicio', label: 'Inicio', visible: true },
    { href: '#beneficios', label: 'Beneficios', visible: config.visibility.beneficios },
    { href: '#planes', label: 'Planes', visible: config.visibility.planes },
    { href: '#cobertura', label: 'Cobertura', visible: config.visibility.cobertura },
    { href: '#tienda', label: 'Tienda', visible: config.visibility.tienda },
    { href: '#faq', label: 'FAQ', visible: config.visibility.faq }
  ].filter((item) => item.visible)

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${isScrolled ? 'glass-dark py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="relative w-11 h-11">
              <Image src="/logo.png" alt="Zona Center Logo" fill className="object-contain" priority />
            </div>
            <div>
              <p className="text-xl font-bold gradient-text">{config.brandName}</p>
              <p className="text-xs text-[var(--snow)]/75">{config.tagline}</p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-[var(--snow)]/85 hover:text-[var(--star-yellow)] transition-colors">
                {link.label}
              </a>
            ))}
            <a href={`https://wa.me/${config.whatsappPrincipal}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Contratar
            </a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen((v) => !v)}>
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 rounded-2xl bg-[var(--purple-bg)]/95 border border-[var(--metal-gray)]/35">
            <div className="px-4 flex flex-col gap-3">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="text-[var(--snow)]/90 py-1" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function Dashboard({
  config,
  setConfig
}: {
  config: SiteConfig
  setConfig: Dispatch<SetStateAction<SiteConfig>>
}) {
  const [open, setOpen] = useState(false)
  const [auth, setAuth] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true'
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const updateVisibility = (key: keyof SectionVisibility, checked: boolean) => {
    setConfig((prev) => ({ ...prev, visibility: { ...prev.visibility, [key]: checked } }))
  }

  const handleLogin = () => {
    if (email === 'soto@zonacenter.com' && password === 'satoscode') {
      localStorage.setItem(ADMIN_STORAGE_KEY, 'true')
      setAuth(true)
      setPassword('')
    } else {
      alert('Credenciales incorrectas')
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 btn-secondary bg-[var(--robot-blue)] text-[var(--snow)] border-none">
        Dashboard
      </button>
    )
  }

  return (
    <aside className="fixed inset-0 z-50 bg-black/70 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-3xl mx-auto card bg-[var(--purple-bg)]/95">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">Panel de administración</h3>
          <button className="text-[var(--snow)]" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {!auth ? (
          <div className="space-y-4">
            <p className="text-[var(--snow)]/80">Acceso con login hardcodeado.</p>
            <input className="w-full p-3 rounded-lg bg-black/25 border border-white/20" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input
              className="w-full p-3 rounded-lg bg-black/25 border border-white/20"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary" onClick={handleLogin}>
              Ingresar
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <section className="space-y-3">
              <h4 className="text-lg font-semibold">Mostrar / ocultar secciones</h4>
              {(Object.keys(config.visibility) as (keyof SectionVisibility)[]).map((key) => (
                <label key={key} className="flex items-center gap-2">
                  <input type="checkbox" checked={config.visibility[key]} onChange={(e) => updateVisibility(key, e.target.checked)} />
                  <span className="capitalize">{key}</span>
                </label>
              ))}
            </section>

            <section className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">WhatsApp principal</label>
                <input
                  className="w-full p-2 rounded bg-black/25 border border-white/20"
                  value={config.whatsappPrincipal}
                  onChange={(e) => setConfig((prev) => ({ ...prev, whatsappPrincipal: e.target.value }))}
                />
              </div>
              <div>
                <label className="block mb-1">WhatsApp tienda</label>
                <input
                  className="w-full p-2 rounded bg-black/25 border border-white/20"
                  value={config.whatsappTienda}
                  onChange={(e) => setConfig((prev) => ({ ...prev, whatsappTienda: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1">Título Hero</label>
                <input
                  className="w-full p-2 rounded bg-black/25 border border-white/20"
                  value={config.heroTitle}
                  onChange={(e) => setConfig((prev) => ({ ...prev, heroTitle: e.target.value }))}
                />
              </div>
            </section>

            <section className="space-y-3">
              <h4 className="text-lg font-semibold">Editar planes (precios)</h4>
              {config.planes.map((plan, index) => (
                <div key={plan.name} className="p-3 rounded-lg bg-black/20 border border-white/10 grid md:grid-cols-5 gap-2">
                  <input
                    className="p-2 rounded bg-black/30"
                    value={plan.name}
                    onChange={(e) =>
                      setConfig((prev) => {
                        const next = [...prev.planes]
                        next[index] = { ...next[index], name: e.target.value }
                        return { ...prev, planes: next }
                      })
                    }
                  />
                  {(['mensual', 'trimestral', 'semestral', 'anual'] as Periodo[]).map((periodo) => (
                    <input
                      key={periodo}
                      className="p-2 rounded bg-black/30"
                      type="number"
                      value={plan.precios[periodo]}
                      onChange={(e) =>
                        setConfig((prev) => {
                          const next = [...prev.planes]
                          next[index] = {
                            ...next[index],
                            precios: { ...next[index].precios, [periodo]: Number(e.target.value) || 0 }
                          }
                          return { ...prev, planes: next }
                        })
                      }
                    />
                  ))}
                </div>
              ))}
            </section>

            <section>
              <h4 className="text-lg font-semibold mb-2">Tienda (1 servicio por línea)</h4>
              <textarea
                className="w-full min-h-28 p-3 rounded bg-black/25 border border-white/20"
                value={config.tiendaServicios.join('\n')}
                onChange={(e) => setConfig((prev) => ({ ...prev, tiendaServicios: parseCsv(e.target.value) }))}
              />
            </section>

            <button
              className="btn-secondary"
              onClick={() => {
                localStorage.removeItem(ADMIN_STORAGE_KEY)
                setAuth(false)
              }}
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default function Home() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window === 'undefined') return defaultConfig
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultConfig
    try {
      return JSON.parse(stored)
    } catch {
      return defaultConfig
    }
  })
  const [periodo, setPeriodo] = useState<Periodo>('mensual')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }, [config])

  const navTitle = useMemo(() => `${config.brandName} ${config.tagline}`, [config.brandName, config.tagline])

  return (
    <main className="min-h-screen bg-background text-white overflow-x-hidden">
      <Navbar config={config} />
      <Dashboard config={config} setConfig={setConfig} />

      <section id="inicio" className="min-h-screen pt-28 pb-16 flex items-center">
        <div className="gradient-bg absolute inset-0 -z-10" />
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="uppercase tracking-wider text-[var(--star-yellow)]">{navTitle}</p>
            <h1 className="text-4xl lg:text-6xl font-bold mt-3 mb-4">{config.heroTitle}</h1>
            <p className="text-[var(--snow)]/85 mb-8">{config.heroSubtitle}</p>
            <div className="flex gap-3 flex-wrap">
              <a className="btn-primary" href={`https://wa.me/${config.whatsappPrincipal}`} target="_blank" rel="noopener noreferrer">
                Contratar ahora
              </a>
              <a className="btn-secondary" href={config.facebookUrl} target="_blank" rel="noopener noreferrer">
                Ver Facebook
              </a>
            </div>
          </div>
          <div className="card text-center">
            <h3 className="text-2xl font-semibold mb-3">Atención inmediata</h3>
            <p className="text-[var(--snow)]/80 mb-2">Principal: +{config.whatsappPrincipal}</p>
            <p className="text-[var(--snow)]/80">Tienda: +{config.whatsappTienda}</p>
          </div>
        </div>
      </section>

      {config.visibility.beneficios && (
        <section id="beneficios" className="section-alt">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-10">Beneficios</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.beneficios.map((item) => (
                <div className="card" key={item.title}>
                  <h3 className="font-semibold mb-2 text-[var(--star-yellow)]">{item.title}</h3>
                  <p className="text-[var(--snow)]/80">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {config.visibility.planes && (
        <section id="planes" className="section">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Planes</h2>
            <div className="flex gap-2 flex-wrap mb-6">
              {(['mensual', 'trimestral', 'semestral', 'anual'] as Periodo[]).map((p) => (
                <button key={p} className={periodo === p ? 'btn-primary' : 'btn-secondary'} onClick={() => setPeriodo(p)}>
                  {p}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.planes.map((plan) => (
                <article key={plan.name} className={`card ${plan.popular ? 'ring-2 ring-[var(--star-yellow)]' : ''}`}>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className="text-[var(--snow)]/75">{plan.speed} Mbps</p>
                  <p className="text-4xl font-bold mt-4 mb-4">{plan.precios[periodo]} Bs</p>
                  <a className="btn-primary block text-center" href={`https://wa.me/${config.whatsappPrincipal}`} target="_blank" rel="noopener noreferrer">
                    Contratar
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {config.visibility.cobertura && (
        <section id="cobertura" className="section-alt">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Cobertura</h2>
            <p className="mb-4 text-[var(--snow)]/80">Revisa en el mapa si tu zona está disponible.</p>
            <a className="btn-secondary" href={config.coberturaUrl} target="_blank" rel="noopener noreferrer">
              Ver mapa de cobertura
            </a>
          </div>
        </section>
      )}

      {config.visibility.tienda && (
        <section id="tienda" className="section">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-6">Tienda</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {config.tiendaServicios.map((servicio) => (
                <li key={servicio} className="card py-4">
                  {servicio}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {config.visibility.condiciones && (
        <section className="section-alt">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-3">Condiciones</h2>
            <p className="text-[var(--snow)]/80">Instalación sujeta a factibilidad técnica. Los precios pueden ajustarse con aviso previo.</p>
          </div>
        </section>
      )}

      {config.visibility.faq && (
        <section id="faq" className="section">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">FAQ</h2>
            <div className="space-y-4">
              {config.faq.map((item) => (
                <article key={item.q} className="card py-5">
                  <h4 className="font-semibold mb-2">{item.q}</h4>
                  <p className="text-[var(--snow)]/80">{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-3 text-[var(--snow)]/80">
          <p>© {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.</p>
          <p>Contacto: +{config.whatsappPrincipal}</p>
        </div>
      </footer>
    </main>
  )
}
