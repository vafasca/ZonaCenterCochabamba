# Zona Center - Landing Page

Landing page para Zona Center - Internet Inalámbrico a Bajo Costo (#zonawimax)

## 🚀 Despliegue en Netlify

### Opción 1: Despliegue desde Git

1. **Sube el código a GitHub/GitLab/Bitbucket**

2. **Conecta con Netlify:**
   - Ve a [netlify.com](https://netlify.com) e inicia sesión
   - Click en "Add new site" → "Import an existing project"
   - Conecta tu proveedor de Git y selecciona el repositorio

3. **Configuración de build (se detecta automáticamente):**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 20

4. **Click en "Deploy site"**

### Opción 2: Despliegue Manual (Drag & Drop)

1. **Instala Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Construye el proyecto:**
   ```bash
   npm run build
   ```

3. **Despliega:**
   ```bash
   netlify deploy --prod
   ```

### Opción 3: Drag & Drop desde la Web

1. Construye el proyecto: `npm run build`
2. Ve a [app.netlify.com](https://app.netlify.com)
3. Arrastra la carpeta `.next` a la zona de drop

## 📁 Estructura del Proyecto

```
├── public/
│   ├── logo.png              # Logo de Zona Center
│   ├── hero-wireless.png     # Imagen hero principal
│   ├── wireless-tower.png    # Imagen de torre
│   └── ...                   # Otras imágenes
├── src/
│   └── app/
│       ├── page.tsx          # Página principal
│       ├── layout.tsx        # Layout raíz
│       └── globals.css       # Estilos globales
├── netlify.toml              # Configuración de Netlify
├── next.config.ts            # Configuración de Next.js
├── package.json              # Dependencias
└── .nvmrc                    # Versión de Node.js
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar lint
npm run lint
```

## 📞 Contacto

- WhatsApp Principal: +591 62649081
- WhatsApp Tienda: +591 62651988
- Facebook: facebook.com/zonawimax

## 🎨 Colores del Tema

- Primary: #1a1a2e (azul oscuro)
- Secondary: #16213e
- Accent: #0f3460
- Highlight: #8b5cf6 (morado)
- Cyan: #06b6d4

## 📋 Secciones

1. **Hero** - Internet Inalámbrico A Bajo Costo
2. **Beneficios** - 4 beneficios principales
3. **Planes** - Planes de internet con precios en Bs
4. **Cobertura** - Mapa de Google Maps
5. **Tienda** - Servicios adicionales
6. **Condiciones** - Términos del servicio
7. **FAQ** - Preguntas frecuentes
8. **Footer** - Contacto y redes sociales

## 🔧 Tecnologías

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript
- Google Fonts (Poppins, Inter)
