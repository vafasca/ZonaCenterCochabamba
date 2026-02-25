'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// ============================================
// CONFIGURACIÓN
// ============================================
const WHATSAPP_NUMBER = "59162649081"
const WHATSAPP_TIENDA = "59162651988"
const FACEBOOK_URL = "https://www.facebook.com/zonawimax"
const MAPA_COBERTURA = "https://www.google.com/maps/d/u/0/viewer?mid=1izUhztL0r_G3XDU9h56e_b3tlIVbSO7N&ll=-17.47784992744687%2C-66.1406598&z=15"

// ============================================
// NAVBAR COMPONENT
// ============================================
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    
    // Function to detect active section based on scroll position
    const handleSectionDetection = () => {
      const sections = ['inicio', 'beneficios', 'planes', 'cobertura', 'tienda', 'faq']
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const height = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleSectionDetection)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionDetection)
    }
  }, [])

  const navLinks = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#beneficios', label: 'Beneficios' },
    { href: '#planes', label: 'Planes' },
    { href: '#cobertura', label: 'Cobertura' },
    { href: '#tienda', label: 'Tienda' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-dark py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="Zona Wimax Logo" fill className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">Zona Center</span>
              <span className="text-xs text-gray-400">#zonawimax</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className={`text-gray-300 transition-all duration-300 font-medium ${
                  activeSection === link.href.substring(1) 
                    ? 'text-white scale-110 font-bold' 
                    : 'hover:text-white'
                }`}
                onClick={() => setActiveSection(link.href.substring(1))}
              >
                {link.label}
              </a>
            ))}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="btn-primary flex items-center gap-2"
              target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contratar
            </a>
          </div>

          <button className="md:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 glass rounded-2xl">
            <div className="flex flex-col gap-4 px-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href}
                  className={`text-gray-300 transition-all duration-300 font-medium py-2 ${
                    activeSection === link.href.substring(1) 
                      ? 'text-white font-bold' 
                      : 'hover:text-white'
                  }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setActiveSection(link.href.substring(1))
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Contratar Ahora
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// ============================================
// HERO SECTION
// ============================================
function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const heroElement = document.getElementById('inicio')
    if (heroElement) {
      observer.observe(heroElement)
    }

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement)
      }
    }
  }, [])

  return (
    <section id="inicio" className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background Effects */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8b5cf6]/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0f3460]/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'slide 20s linear infinite'
      }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center transform transition-transform duration-1000 ease-out" style={{transform: isVisible ? 'translateY(0)' : 'translateY(50px)'}}>
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 transform transition-all duration-700 delay-200" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.8)'}}>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Cobertura en Cochabamba</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 transform transition-all duration-700 delay-300" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
              Internet Inalámbrico
              <br />
              <span className="gradient-text">A Bajo Costo ⚡️</span>
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 transform transition-all duration-700 delay-400" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
              En <strong className="text-white">Zona Center</strong> ofrecemos un servicio de conexión inalámbrica 
              denominado <span className="text-[#8b5cf6] font-semibold">#zonawimax</span>, brindando oportunidad 
              de acceso a internet en zonas desatendidas de Cochabamba.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transform transition-all duration-700 delay-500" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Me interesa contratar el servicio de internet.')}`}
                className="btn-primary flex items-center justify-center gap-2 text-lg"
                target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Contratar Ahora
              </a>
              <a href="#planes" className="btn-secondary text-lg text-center">
                Ver Planes
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block transform transition-all duration-1000 delay-700" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(50px)'}}>
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6]/20 via-[#a855f7]/20 to-[#06b6d4]/20 rounded-full blur-3xl animate-pulse"></div>
              <Image src="/hero-wireless.png" alt="Internet Inalámbrico" fill className="object-contain relative z-10 transform transition-transform duration-700 hover:scale-105" priority />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}

// ============================================
// BENEFICIOS SECTION
// ============================================
function BeneficiosSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState([false, false, false, false])

  const beneficios = [
    {
      icon: '🟣',
      title: 'Prueba nuestro servicio',
      description: 'Se le otorga un periodo de prueba del servicio con la certeza de que será de su agrado, caso contrario puede no aceptar el servicio sin problemas.'
    },
    {
      icon: '🟣',
      title: 'Facilidades de pago',
      description: 'Puedes pagar directamente en nuestro local comercial, pagar por transferencia bancaria o por código QR desde la comodidad de tu casa.'
    },
    {
      icon: '🟣',
      title: 'Sin contratos forzosos',
      description: 'No hay un contrato de permanencia obligatoria. Lo que significa que puedes estar con nuestro servicio el tiempo que desees.'
    },
    {
      icon: '🟣',
      title: 'Beneficios a clientes',
      description: 'Descuentos, atención prioritaria, tratamiento VIP y otros beneficios que faciliten tu integración digital. Accede a estos beneficios desde nuestro local comercial.'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        
        if (entry.isIntersecting) {
          // Activate cards with delays
          visibleCards.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 200)
          })
        } else {
          // Reset visibility when scrolling out
          setVisibleCards([false, false, false, false])
        }
      },
      { threshold: 0.1 }
    )

    const sectionElement = document.getElementById('beneficios')
    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [])

  return (
    <section id="beneficios" className={`section-alt transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 transform transition-all duration-700" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            ¿Qué te <span className="gradient-text">ofrecemos</span>?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Somos un equipo multidisciplinario de profesionales, ofreciendo una amplia gama de servicios 
            de internet y soluciones IT, para ayudarte a conectarte al mundo digital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficios.map((beneficio, index) => (
            <div 
              key={index} 
              className={`card text-center transform transition-all duration-700 ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{transitionDelay: `${index * 200}ms`}}
            >
              <div className="text-5xl mb-4 transform transition-transform duration-500 hover:scale-110">{beneficio.icon}</div>
              <h3 className="text-xl font-bold mb-3">{beneficio.title}</h3>
              <p className="text-gray-400 text-sm">{beneficio.description}</p>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className={`mt-16 glass rounded-2xl p-8 text-center transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-lg text-gray-300 mb-6">
            Si necesitas algún servicio de nuestra tienda, ¡obtén el <strong className="text-[#8b5cf6]">20% de descuento</strong> en 
            cualquier servicio que supere el costo mínimo de <strong className="text-white">10 Bs de consumo</strong>!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-all transform hover:scale-105">
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-all transform hover:scale-105">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// PLANES SECTION
// ============================================
function PlanesSection() {
  const [periodo, setPeriodo] = useState<'mensual' | 'trimestral' | 'semestral' | 'anual'>('mensual')
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState([false, false, false, false])

  const planes = [
    { 
      name: 'Plan Básico', 
      speed: 5, 
      precios: { mensual: 90, trimestral: 80, semestral: 70, anual: 65 },
      popular: false
    },
    { 
      name: 'Plan Hogar', 
      speed: 10, 
      precios: { mensual: 150, trimestral: 120, semestral: 110, anual: 90 },
      popular: true
    },
    { 
      name: 'Plan Plus', 
      speed: 15, 
      precios: { mensual: 210, trimestral: 170, semestral: 150, anual: 110 },
      popular: false
    },
    { 
      name: 'Plan Premium', 
      speed: 20, 
      precios: { mensual: 270, trimestral: 220, semestral: 190, anual: 150 },
      popular: false
    }
  ]

  const handleContratar = (planName: string, speed: number, precio: number) => {
    const message = `¡Hola! Me interesa contratar el ${planName} de ${speed} Mbps.

📊 *Plan seleccionado:* ${planName}
📡 *Velocidad:* ${speed} Mbps
💰 *Precio:* ${precio} Bs/${periodo}
📅 *Período:* ${periodo}

Me gustaría recibir más información para proceder con la contratación.`
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const periodos = [
    { key: 'mensual', label: 'Mensual' },
    { key: 'trimestral', label: 'Trimestral' },
    { key: 'semestral', label: 'Semestral' },
    { key: 'anual', label: 'Anual' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        
        if (entry.isIntersecting) {
          // Activate cards with delays
          visibleCards.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 200)
          })
        } else {
          // Reset visibility when scrolling out
          setVisibleCards([false, false, false, false])
        }
      },
      { threshold: 0.1 }
    )

    const sectionElement = document.getElementById('planes')
    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [])

  return (
    <section id="planes" className={`section transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 transform transition-all duration-700" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Planes de <span className="gradient-text">Internet Inalámbrico</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Elige el plan que mejor se adapte a tus necesidades. Precios en Bolivianos (Bs).
          </p>
          
          {/* Promo Banner */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass mb-8 transform transition-all duration-700 delay-200" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}>
            <span className="text-yellow-400">📌</span>
            <span className="text-gray-300">Promoción tarifa semestral y anual vigente</span>
          </div>

          {/* Period Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 transform transition-all duration-700 delay-300" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}>
            {periodos.map((p) => (
              <button key={p.key}
                onClick={() => setPeriodo(p.key as typeof periodo)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  periodo === p.key 
                    ? 'gradient-highlight text-white' 
                    : 'glass text-gray-300 hover:text-white'
                }`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {planes.map((plan, index) => (
            <div key={index} 
              className={`price-card card transform transition-all duration-700 ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${plan.popular ? 'popular scale-105' : ''}`}
              style={{transitionDelay: `${index * 200}ms`}}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full gradient-highlight text-white text-xs font-semibold animate-bounce">
                  Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2 transform transition-transform duration-300 hover:scale-105">{plan.name}</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
                  <svg className="w-5 h-5 text-[#8b5cf6] transform transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-bold text-white">{plan.speed} Mbps</span>
                </div>
              </div>

              <div className="text-center mb-6 transform transition-transform duration-300 hover:scale-105">
                <span className="text-4xl font-bold">{plan.precios[periodo]}</span>
                <span className="text-gray-400"> Bs/{periodo}</span>
              </div>

              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-2">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Velocidad: {plan.speed} Mbps</span>
                </li>
                <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-2">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Router WiFi incluido</span>
                </li>
                <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-2">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Instalación: 200 Bs</span>
                </li>
                <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-2">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Sin contratos</span>
                </li>
              </ul>

              <button onClick={() => handleContratar(plan.name, plan.speed, plan.precios[periodo])}
                className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
                }`}>
                Contratar
              </button>
            </div>
          ))}
        </div>

        {/* Coverage Info */}
        <div className={`mt-16 flex flex-wrap justify-center gap-4 transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a href={MAPA_COBERTURA} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-all transform hover:scale-105">
            <svg className="w-5 h-5 text-[#8b5cf6] transform transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Mapa de Cobertura
          </a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Me gustaría solicitar ampliación de cobertura en mi zona.')}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 transition-all transform hover:scale-105">
            <svg className="w-5 h-5 text-[#8b5cf6] transform transition-transform duration-300 hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Solicitud de Ampliación
          </a>
        </div>
      </div>
    </section>
  )
}

// ============================================
// COBERTURA SECTION
// ============================================
function CoberturaSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const sectionElement = document.getElementById('cobertura')
    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [])

  return (
    <section id="cobertura" className={`section-alt transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 transform transition-all duration-700" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Área de <span className="gradient-text">Cobertura</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Verifica si tu ubicación está dentro de nuestra zona de cobertura en Cochabamba.
          </p>
        </div>

        <div className={`map-container transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <iframe 
            src="https://www.google.com/maps/d/embed?mid=1izUhztL0r_G3XDU9h56e_b3tlIVbSO7N&ll=-17.47784992744687%2C-66.1406598&z=15"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <div className={`mt-8 grid md:grid-cols-2 gap-6 transform transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="card transform transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-semibold">Cobertura Disponible</span>
            </div>
            <p className="text-gray-400 text-sm">
              Zonas donde podemos instalar el servicio de internet inalámbrico de inmediato.
            </p>
          </div>
          <div className="card transform transition-transform duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 rounded-full bg-pink-500 animate-pulse"></div>
              <span className="font-semibold">Sin Cobertura Confirmada</span>
            </div>
            <p className="text-gray-400 text-sm">
              Zonas en evaluación para ampliación de cobertura. Solicita el servicio para considerar tu zona.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// TIENDA SECTION
// ============================================
function TiendaSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleCards, setVisibleCards] = useState([false, false, false, false])

  const servicios = [
    { icon: '📚', title: 'Imprime tus textos académicos', desc: 'No leas más en computadora, ahora puedes tener tus libros impresos y anillados, por WhatsApp sin tener que hacer filas.' },
    { icon: '📷', title: 'Imprime tus fotos favoritas', desc: 'Como las fotos de toda la vida, pero en vez de ir al foto estudio, por WhatsApp. Formato rectangular o estilo retro.' },
    { icon: '🎓', title: 'Cursos STEAM', desc: 'Inscribe a tus hij@s en nuestros cursos, un tiempo lleno de aprendizaje para desarrollar habilidades tecnológicas.' },
    { icon: '💻', title: 'Servicio técnico', desc: 'Técnicos con amplia experiencia en diagnóstico, reparación y verificación de equipos de cómputo y periféricos.' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        
        if (entry.isIntersecting) {
          // Activate cards with delays
          visibleCards.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 200)
          })
        } else {
          // Reset visibility when scrolling out
          setVisibleCards([false, false, false, false])
        }
      },
      { threshold: 0.1 }
    )

    const sectionElement = document.getElementById('tienda')
    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [])

  return (
    <section id="tienda" className={`section transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 transform transition-all duration-700" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Beneficios en nuestra <span className="gradient-text">Tienda</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Descuentos, atención prioritaria, tratamiento VIP y otros beneficios que faciliten tu integración digital.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {servicios.map((servicio, index) => (
            <div key={index} 
              className={`card transform transition-all duration-700 ${visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{transitionDelay: `${index * 200}ms`}}
            >
              <div className="text-4xl mb-4 transform transition-transform duration-500 hover:scale-110">{servicio.icon}</div>
              <h3 className="text-lg font-bold mb-2">{servicio.title}</h3>
              <p className="text-gray-400 text-sm">{servicio.desc}</p>
            </div>
          ))}
        </div>

        {/* STEAM Section */}
        <div className={`glass rounded-2xl p-8 transform transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Aprende una habilidad nueva</h3>
              <p className="text-gray-400 mb-6">
                Queremos elevar el talento de tus hij@s que estén interesados en la informática, mediante el modelo 
                educativo STEM desarrollamos sus habilidades digitales.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span>📆</span>
                  <span className="text-gray-300">Consulta disponibilidad por WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏰</span>
                  <span className="text-gray-300">Horario: Mañanas de 10 a 12</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>👩🏻‍💻</span>
                  <span className="text-gray-300">Para niños entre 7 a 12 años</span>
                </div>
              </div>
              <a href={`https://wa.me/${WHATSAPP_TIENDA}?text=${encodeURIComponent('¡Hola! Me gustaría información sobre los cursos STEAM.')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 btn-whatsapp transform transition-transform duration-300 hover:scale-105">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Reserva de Cupos
              </a>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden glass transform transition-transform duration-500 hover:scale-105">
              <Image src="/software-3d.png" alt="Cursos STEAM" fill className="object-contain p-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// CONDICIONES SECTION
// ============================================
function CondicionesSection() {
  const condiciones = [
    { title: 'Sin contrato obligatorio', desc: 'No hay un contrato de permanencia obligatoria. Puedes estar con nuestro servicio el tiempo que desees.' },
    { title: 'Equipos en comodato', desc: 'Los equipos son entregados en calidad de préstamo. Deben ser devueltos al finalizar el servicio.' },
    { title: 'Prueba gratuita', desc: 'Se otorga un periodo de prueba del servicio. Si no es de tu agrado, puedes no aceptar sin problemas.' },
    { title: 'Pagas lo que consumes', desc: 'El servicio es prepago. Paga por transferencia o en nuestra tienda. No acumulas deudas ni hay multas.' },
    { title: 'Corte de servicio', desc: 'Si no se renueva, el sistema corta a los 10 días. Pasaremos a recoger los equipos en los siguientes 15 días.' },
    { title: 'Rehabilitación', desc: 'Para rehabilitar, cancela la mensualidad. Si excede 60 días, se cobra 100 Bs de reincorporación.' }
  ]

  return (
    <section id="condiciones" className="section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Condiciones de <span className="gradient-text">Servicio</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Consideramos la transparencia como valor de responsabilidad al cliente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {condiciones.map((cond, index) => (
            <div key={index} className="card">
              <h3 className="text-lg font-bold mb-2">{cond.title}</h3>
              <p className="text-gray-400 text-sm">{cond.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 glass rounded-2xl p-6">
          <h4 className="font-bold mb-4">Velocidades mínimas garantizadas</h4>
          <p className="text-gray-400 text-sm mb-4">
            En cumplimiento al Artículo 120 parágrafo VIII del Reglamento General de Telecomunicaciones:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="text-[#8b5cf6]">💡</span>
              <span className="text-gray-300 text-sm">Planes de enlace vecinal: 20% de la velocidad máxima contratada</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-[#8b5cf6]">💡</span>
              <span className="text-gray-300 text-sm">Planes de enlace dedicado: 90% de la velocidad máxima contratada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// FAQ SECTION
// ============================================
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const faqs = [
    { 
      q: '¿Cuál es el costo de instalación?', 
      a: 'El costo de instalación actual es de 200 Bs en todas las zonas de cobertura. Este costo cubre la instalación, los equipos son entregados en calidad de comodato (préstamo).'
    },
    { 
      q: '¿Qué necesito para contratar el servicio?', 
      a: 'Para disfrutar del servicio debes mandar tu dirección de domicilio, te indicaremos si tu ubicación es favorable a una visita técnica, pasado la visita se le instalará el servicio.'
    },
    { 
      q: '¿No hay cobertura en mi barrio?', 
      a: 'Si deseas nuestro servicio en tu barrio, puedes solicitar la ampliación de cobertura. También es posible mediante un enlace dedicado privado, sujeto a condiciones específicas.'
    },
    { 
      q: '¿Cómo funciona la conexión inalámbrica?', 
      a: 'Ubicamos una antena de radio especializada en transmisión de datos, te dejamos un router WiFi dentro de tu casa u oficina, una vez configurado dispondrás de internet.'
    },
    { 
      q: '¿Qué es un enlace dedicado?', 
      a: 'Significa que contarás con una velocidad de internet determinada y garantizada todo el tiempo, permitiéndote navegar de forma estable, sin variación. Ideal para negocios como ciber café.'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    const sectionElement = document.getElementById('faq')
    if (sectionElement) {
      observer.observe(sectionElement)
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement)
      }
    }
  }, [])

  return (
    <section id="faq" className={`section transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 transform transition-all duration-700" style={{opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)'}}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Preguntas <span className="gradient-text">Frecuentes</span>
          </h2>
        </div>

        <div className={`space-y-4 transform transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {faqs.map((faq, index) => (
            <div key={index} 
                 className={`glass rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02] ${openIndex === index ? 'ring-2 ring-[#8b5cf6]' : ''}`}>
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between">
                <span className="font-semibold">{faq.q}</span>
                <svg className={`w-5 h-5 text-[#8b5cf6] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-48 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-400 text-sm">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <a href="#inicio" className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image src="/logo.png" alt="Zona Center Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold gradient-text">Zona Center</span>
            </a>
            <p className="text-gray-400 max-w-md mb-4">
              Tu proveedor de confianza para internet inalámbrico en Cochabamba. 
              Conectamos tu mundo con tecnología de vanguardia.
            </p>
            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#beneficios" className="text-gray-400 hover:text-white transition-colors">Beneficios</a></li>
              <li><a href="#planes" className="text-gray-400 hover:text-white transition-colors">Planes</a></li>
              <li><a href="#cobertura" className="text-gray-400 hover:text-white transition-colors">Cobertura</a></li>
              <li><a href="#tienda" className="text-gray-400 hover:text-white transition-colors">Tienda</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Cochabamba, Bolivia</li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-gray-400 hover:text-white transition-colors">
                  +591 62649081
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${WHATSAPP_TIENDA}`} className="text-gray-400 hover:text-white transition-colors">
                  +591 62651988 (Tienda)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Zona Center - #zonawimax. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <BeneficiosSection />
      <PlanesSection />
      <CoberturaSection />
      <TiendaSection />
      <CondicionesSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
