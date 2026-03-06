'use client'

import { useState, useEffect } from 'react';
import { authenticate } from '@/lib/auth';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Page data state
  const [pageData, setPageData] = useState<any>({});
  const [sectionsVisible, setSectionsVisible] = useState<any>({});

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedPageData = localStorage.getItem('pageData');
    const storedSectionsVisible = localStorage.getItem('sectionsVisible');
    
    if (storedPageData) {
      setPageData(JSON.parse(storedPageData));
    } else {
      // Initialize with default values
      setPageData({
        empresa: {
          nombre: 'Zona Center',
          hashtag: '#zonawimax',
          direccion: 'Cochabamba, Bolivia',
          telefono_principal: '+591 62649081',
          telefono_tienda: '+591 62651988',
        },
        hero: {
          titulo: 'Internet Inalámbrico',
          subtitulo: 'A Bajo Costo ⚡️',
          descripcion: 'En <strong class="text-white">Zona Center</strong> ofrecemos un servicio de conexión inalámbrica denominado <span class="text-[#8b5cf6] font-semibold">#zonawimax</span>, brindando oportunidad de acceso a internet en zonas desatendidas de Cochabamba.',
        },
        beneficios: {
          titulo: '¿Qué te ofrecemos?',
          descripcion: 'Somos un equipo multidisciplinario de profesionales, ofreciendo una amplia gama de servicios de internet y soluciones IT, para ayudarte a conectarte al mundo digital.',
          items: [
            {
              icon: '📶',
              title: 'Prueba nuestro servicio',
              description: 'Se le otorga un periodo de prueba del servicio con la certeza de que será de su agrado, caso contrario puede no aceptar el servicio sin problemas.'
            },
            {
              icon: '📶',
              title: 'Facilidades de pago',
              description: 'Puedes pagar directamente en nuestro local comercial, pagar por transferencia bancaria o por código QR desde la comodidad de tu casa.'
            },
            {
              icon: '📶',
              title: 'Sin contratos forzosos',
              description: 'No hay un contrato de permanencia obligatoria. Lo que significa que puedes estar con nuestro servicio el tiempo que desees.'
            },
            {
              icon: '📶',
              title: 'Beneficios a clientes',
              description: 'Descuentos, atención prioritaria, tratamiento VIP y otros beneficios que faciliten tu integración digital. Accede a estos beneficios desde nuestro local comercial.'
            }
          ],
          promocion: {
            texto: '¡Obtén el <strong class="text-[#8b5cf6]">20% de descuento</strong> en cualquier servicio que supere el costo mínimo de <strong class="text-white">10 Bs de consumo</strong>!',
            facebook_texto: 'Facebook',
            whatsapp_texto: 'WhatsApp'
          }
        },
        planes: {
          titulo: 'Planes de Internet Inalámbrico',
          descripcion: 'Elige el plan que mejor se adapte a tus necesidades. Precios en Bolivianos (Bs).',
          promocion_texto: 'Promoción tarifa semestral y anual vigente',
          periodos: [
            { key: 'mensual', label: 'Mensual' },
            { key: 'trimestral', label: 'Trimestral' },
            { key: 'semestral', label: 'Semestral' },
            { key: 'anual', label: 'Anual' }
          ],
          planes: [
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
          ],
          mapa_cobertura_texto: 'Mapa de Cobertura',
          solicitud_ampliacion_texto: 'Solicitud de Ampliación'
        },
        cobertura: {
          titulo: 'Área de Cobertura',
          descripcion: 'Verifica si tu ubicación está dentro de nuestra zona de cobertura en Cochabamba.',
          iframe_src: 'https://www.google.com/maps/d/embed?mid=1izUhztL0r_G3XDU9h56e_b3tlIVbSO7N&ll=-17.47784992744687%2C-66.1406598&z=15',
          cobertura_disponible: {
            titulo: 'Cobertura Disponible',
            descripcion: 'Zonas donde podemos instalar el servicio de internet inalámbrico de inmediato.'
          },
          sin_cobertura: {
            titulo: 'Sin Cobertura Confirmada',
            descripcion: 'Zonas en evaluación para ampliación de cobertura. Solicita el servicio para considerar tu zona.'
          }
        },
        tienda: {
          titulo: 'Beneficios en nuestra Tienda',
          descripcion: 'Descuentos, atención prioritaria, tratamiento VIP y otros beneficios que faciliten tu integración digital.',
          servicios: [
            { icon: '📚', title: 'Imprime tus textos académicos', desc: 'No leas más en computadora, ahora puedes tener tus libros impresos y anillados, por WhatsApp sin tener que hacer filas.' },
            { icon: '📸', title: 'Imprime tus fotos favoritas', desc: 'Como las fotos de toda la vida, pero en vez de ir al foto estudio, por WhatsApp. Formato rectangular o estilo retro.' },
            { icon: '🎓', title: 'Cursos STEAM', desc: 'Inscribe a tus hij@s en nuestros cursos, un tiempo lleno de aprendizaje para desarrollar habilidades tecnológicas.' },
            { icon: '💻', title: 'Servicio técnico', desc: 'Técnicos con amplia experiencia en diagnóstico, reparación y verificación de equipos de cómputo y periféricos.' }
          ],
          steam: {
            titulo: 'Aprende una habilidad nueva',
            descripcion: 'Queremos elevar el talento de tus hij@s que estén interesados en la informática, mediante el modelo educativo STEM desarrollamos sus habilidades digitales.',
            horarios: [
              { icon: '📅', texto: 'Consulta disponibilidad por WhatsApp' },
              { icon: '⏰', texto: 'Horario: Mañanas de 10 a 12' },
              { icon: '👩🏻‍💻', texto: 'Para niños entre 7 a 12 años' }
            ],
            boton_texto: 'Reserva de Cupos'
          }
        },
        faq: {
          titulo: 'Preguntas Frecuentes',
          items: [
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
        },
        footer: {
          descripcion: 'Tu proveedor de confianza para internet inalámbrico en Cochabamba. Conectamos tu mundo con tecnología de vanguardia.',
          enlaces: [
            { href: '#beneficios', label: 'Beneficios' },
            { href: '#planes', label: 'Planes' },
            { href: '#cobertura', label: 'Cobertura' },
            { href: '#tienda', label: 'Tienda' },
            { href: '#faq', label: 'FAQ' },
          ]
        }
      });
    }
    
    if (storedSectionsVisible) {
      setSectionsVisible(JSON.parse(storedSectionsVisible));
    } else {
      // Initialize with default values
      setSectionsVisible({
        inicio: true,
        beneficios: true,
        planes: true,
        cobertura: true,
        tienda: true,
        faq: true,
      });
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authenticate(email, password)) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const handleSaveChanges = () => {
    // Save to localStorage
    localStorage.setItem('pageData', JSON.stringify(pageData));
    localStorage.setItem('sectionsVisible', JSON.stringify(sectionsVisible));
    
    alert('Cambios guardados exitosamente!');
  };

  const updatePageData = (section: string, field: string, value: any) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedField = (section: string, subSection: string, field: string, value: any) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subSection]: {
          ...prev[section][subSection],
          [field]: value
        }
      }
    }));
  };

  const updateArrayItem = (section: string, arrayName: string, index: number, field: string, value: any) => {
    setPageData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayName]: prev[section][arrayName].map((item: any, i: number) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const updatePlanPrice = (planIndex: number, periodo: string, value: number) => {
    setPageData(prev => ({
      ...prev,
      planes: {
        ...prev.planes,
        planes: prev.planes.planes.map((plan: any, i: number) => 
          i === planIndex 
            ? { 
                ...plan, 
                precios: { 
                  ...plan.precios, 
                  [periodo]: Number(value) 
                } 
              } 
            : plan
        )
      }
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Panel de Administración</h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="soto@zonacenter.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="satoscode"
                required
              />
            </div>
            
            {loginError && (
              <div className="mb-4 text-red-400 text-center">{loginError}</div>
            )}
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center py-6 border-b border-gray-700">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            Cerrar Sesión
          </button>
        </header>

        <div className="mt-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSaveChanges}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition duration-300"
            >
              Guardar Cambios
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Secciones Visibles */}
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Visibilidad de Secciones</h2>
              
              <div className="space-y-4">
                {Object.keys(sectionsVisible).map((section) => (
                  <div key={section} className="flex items-center justify-between">
                    <label className="text-gray-300 capitalize">{section}</label>
                    <div className="relative inline-block w-12 h-6">
                      <input
                        type="checkbox"
                        checked={sectionsVisible[section]}
                        onChange={(e) => setSectionsVisible(prev => ({
                          ...prev,
                          [section]: e.target.checked
                        }))}
                        className="sr-only"
                        id={`toggle-${section}`}
                      />
                      <label
                        htmlFor={`toggle-${section}`}
                        className={`block w-12 h-6 rounded-full cursor-pointer transition-colors ${
                          sectionsVisible[section] ? 'bg-purple-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            sectionsVisible[section] ? 'transform translate-x-6' : ''
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Información de la Empresa */}
            <div className="bg-gray-800 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Información de la Empresa</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Nombre</label>
                  <input
                    type="text"
                    value={pageData.empresa?.nombre || ''}
                    onChange={(e) => updatePageData('empresa', 'nombre', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Hashtag</label>
                  <input
                    type="text"
                    value={pageData.empresa?.hashtag || ''}
                    onChange={(e) => updatePageData('empresa', 'hashtag', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Dirección</label>
                  <input
                    type="text"
                    value={pageData.empresa?.direccion || ''}
                    onChange={(e) => updatePageData('empresa', 'direccion', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Teléfono Principal</label>
                  <input
                    type="text"
                    value={pageData.empresa?.telefono_principal || ''}
                    onChange={(e) => updatePageData('empresa', 'telefono_principal', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Teléfono Tienda</label>
                  <input
                    type="text"
                    value={pageData.empresa?.telefono_tienda || ''}
                    onChange={(e) => updatePageData('empresa', 'telefono_tienda', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            {/* Sección Hero */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección Hero</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    value={pageData.hero?.titulo || ''}
                    onChange={(e) => updatePageData('hero', 'titulo', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Subtítulo</label>
                  <input
                    type="text"
                    value={pageData.hero?.subtitulo || ''}
                    onChange={(e) => updatePageData('hero', 'subtitulo', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Descripción</label>
                  <textarea
                    value={pageData.hero?.descripcion || ''}
                    onChange={(e) => updatePageData('hero', 'descripcion', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Sección Beneficios */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección Beneficios</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    value={pageData.beneficios?.titulo || ''}
                    onChange={(e) => updatePageData('beneficios', 'titulo', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Descripción</label>
                  <input
                    type="text"
                    value={pageData.beneficios?.descripcion || ''}
                    onChange={(e) => updatePageData('beneficios', 'descripcion', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Items de Beneficios</h3>
              <div className="space-y-4">
                {pageData.beneficios?.items?.map((item: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-gray-300 mb-2">Icono</label>
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => updateArrayItem('beneficios', 'items', index, 'icon', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Título</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => updateArrayItem('beneficios', 'items', index, 'title', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">Descripción</label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateArrayItem('beneficios', 'items', index, 'description', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sección Planes */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección Planes</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    value={pageData.planes?.titulo || ''}
                    onChange={(e) => updatePageData('planes', 'titulo', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Descripción</label>
                  <input
                    type="text"
                    value={pageData.planes?.descripcion || ''}
                    onChange={(e) => updatePageData('planes', 'descripcion', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Texto de Promoción</label>
                <input
                  type="text"
                  value={pageData.planes?.promocion_texto || ''}
                  onChange={(e) => updatePageData('planes', 'promocion_texto', e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-4">Planes</h3>
              <div className="space-y-6">
                {pageData.planes?.planes?.map((plan: any, planIndex: number) => (
                  <div key={planIndex} className="p-4 bg-gray-700 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Nombre del Plan</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => updateArrayItem('planes', 'planes', planIndex, 'name', e.target.value)}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Velocidad (Mbps)</label>
                        <input
                          type="number"
                          value={plan.speed}
                          onChange={(e) => updateArrayItem('planes', 'planes', planIndex, 'speed', Number(e.target.value))}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Popular</label>
                        <select
                          value={plan.popular.toString()}
                          onChange={(e) => updateArrayItem('planes', 'planes', planIndex, 'popular', e.target.value === 'true')}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        >
                          <option value="true">Sí</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>
                    
                    <h4 className="font-bold mb-3">Precios por Periodo</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {pageData.planes?.periodos?.map((periodo: any) => (
                        <div key={periodo.key}>
                          <label className="block text-gray-300 mb-2">{periodo.label}</label>
                          <input
                            type="number"
                            value={plan.precios[periodo.key]}
                            onChange={(e) => updatePlanPrice(planIndex, periodo.key, Number(e.target.value))}
                            className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sección Cobertura */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección Cobertura</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    value={pageData.cobertura?.titulo || ''}
                    onChange={(e) => updatePageData('cobertura', 'titulo', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Descripción</label>
                  <input
                    type="text"
                    value={pageData.cobertura?.descripcion || ''}
                    onChange={(e) => updatePageData('cobertura', 'descripcion', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">URL del Mapa</label>
                <input
                  type="text"
                  value={pageData.cobertura?.iframe_src || ''}
                  onChange={(e) => updatePageData('cobertura', 'iframe_src', e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-bold mb-3">Cobertura Disponible</h3>
                  <div className="mb-3">
                    <label className="block text-gray-300 mb-2">Título</label>
                    <input
                      type="text"
                      value={pageData.cobertura?.cobertura_disponible?.titulo || ''}
                      onChange={(e) => updateNestedField('cobertura', 'cobertura_disponible', 'titulo', e.target.value)}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Descripción</label>
                    <input
                      type="text"
                      value={pageData.cobertura?.cobertura_disponible?.descripcion || ''}
                      onChange={(e) => updateNestedField('cobertura', 'cobertura_disponible', 'descripcion', e.target.value)}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-bold mb-3">Sin Cobertura</h3>
                  <div className="mb-3">
                    <label className="block text-gray-300 mb-2">Título</label>
                    <input
                      type="text"
                      value={pageData.cobertura?.sin_cobertura?.titulo || ''}
                      onChange={(e) => updateNestedField('cobertura', 'sin_cobertura', 'titulo', e.target.value)}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Descripción</label>
                    <input
                      type="text"
                      value={pageData.cobertura?.sin_cobertura?.descripcion || ''}
                      onChange={(e) => updateNestedField('cobertura', 'sin_cobertura', 'descripcion', e.target.value)}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección Tienda */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección Tienda</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    value={pageData.tienda?.titulo || ''}
                    onChange={(e) => updatePageData('tienda', 'titulo', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Descripción</label>
                  <input
                    type="text"
                    value={pageData.tienda?.descripcion || ''}
                    onChange={(e) => updatePageData('tienda', 'descripcion', e.target.value)}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-4">Servicios</h3>
              <div className="space-y-4 mb-6">
                {pageData.tienda?.servicios?.map((servicio: any, index: number) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-700 rounded-lg">
                    <div>
                      <label className="block text-gray-300 mb-2">Icono</label>
                      <input
                        type="text"
                        value={servicio.icon}
                        onChange={(e) => updateArrayItem('tienda', 'servicios', index, 'icon', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Título</label>
                      <input
                        type="text"
                        value={servicio.title}
                        onChange={(e) => updateArrayItem('tienda', 'servicios', index, 'title', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-300 mb-2">Descripción</label>
                      <input
                        type="text"
                        value={servicio.desc}
                        onChange={(e) => updateArrayItem('tienda', 'servicios', index, 'desc', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Sección STEAM</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Título</label>
                    <input
                      type="text"
                      value={pageData.tienda?.steam?.titulo || ''}
                      onChange={(e) => updateNestedField('tienda', 'steam', 'titulo', e.target.value)}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Texto del Botón</label>
                    <input
                      type="text"
                      value={pageData.tienda?.steam?.boton_texto || ''}
                      onChange={(e) => updateNestedField('tienda', 'steam', 'boton_texto', e.target.value)}
                      className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Descripción</label>
                  <textarea
                    value={pageData.tienda?.steam?.descripcion || ''}
                    onChange={(e) => updateNestedField('tienda', 'steam', 'descripcion', e.target.value)}
                    className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                    rows={3}
                  />
                </div>
                
                <h4 className="font-bold mb-3">Horarios</h4>
                <div className="space-y-3">
                  {pageData.tienda?.steam?.horarios?.map((horario: any, index: number) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-2">Icono</label>
                        <input
                          type="text"
                          value={horario.icon}
                          onChange={(e) => updateArrayItem('tienda', 'steam.horarios', index, 'icon', e.target.value)}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 mb-2">Texto</label>
                        <input
                          type="text"
                          value={horario.texto}
                          onChange={(e) => updateArrayItem('tienda', 'steam.horarios', index, 'texto', e.target.value)}
                          className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sección FAQ */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección FAQ</h2>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Título</label>
                <input
                  type="text"
                  value={pageData.faq?.titulo || ''}
                  onChange={(e) => updatePageData('faq', 'titulo', e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                />
              </div>
              
              <h3 className="text-xl font-bold mb-4">Preguntas Frecuentes</h3>
              <div className="space-y-4">
                {pageData.faq?.items?.map((item: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-700 rounded-lg">
                    <div className="mb-3">
                      <label className="block text-gray-300 mb-2">Pregunta</label>
                      <input
                        type="text"
                        value={item.q}
                        onChange={(e) => updateArrayItem('faq', 'items', index, 'q', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Respuesta</label>
                      <textarea
                        value={item.a}
                        onChange={(e) => updateArrayItem('faq', 'items', index, 'a', e.target.value)}
                        className="w-full p-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sección Footer */}
            <div className="bg-gray-800 p-6 rounded-2xl lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Sección Footer</h2>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Descripción</label>
                <textarea
                  value={pageData.footer?.descripcion || ''}
                  onChange={(e) => updatePageData('footer', 'descripcion', e.target.value)}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}