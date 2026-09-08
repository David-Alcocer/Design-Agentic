# Centum Astra

Plataforma educativa de preparación para el examen EXANI-II (acceso a carreras de salud en México). Diseñada para tres perfiles de usuario: administrador, profesor y alumno.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework | React 19 + Vite 8 |
| Estilos | Tailwind CSS 3 + CSS custom (index.css) |
| Animaciones | Framer Motion 13 |
| Gráficas | Recharts 3 |
| Iconos | Lucide React |
| Linter | Oxlint |

No usa TypeScript ni backend — todo el estado es local (mock data en `src/data/mockData.js`).

## Estructura del proyecto

```
src/
├── App.jsx                  # Shell principal, routing por estado activo
├── index.css                # Sistema de diseño completo (tokens, clases globales)
├── main.jsx
│
├── components/
│   ├── auth/
│   │   └── Login.jsx        # Pantalla de ingreso con fondo Milky Way doble capa
│   ├── layout/
│   │   ├── Sidebar.jsx      # Navegación lateral por rol (admin/teacher/student)
│   │   └── Header.jsx       # Barra superior con título de sección en Orbitron
│   ├── admin/
│   │   ├── AdminDashboard.jsx   # Tabla de alumnos con búsqueda y filtros
│   │   └── Statistics.jsx       # Gráficas de rendimiento (Bar + Line + barras horizontales)
│   ├── teacher/
│   │   └── TeacherDashboard.jsx # Panel del profesor con chart de progreso grupal
│   ├── student/
│   │   └── StudentDashboard.jsx # Dashboard con progreso, anillo, módulos y scores
│   ├── modules/
│   │   └── FileManager.jsx      # Gestión de recursos por módulo, upload modal
│   ├── video/
│   │   └── VideoLibrary.jsx     # Videoteca con filtros por materia y modal de reproducción
│   ├── forum/
│   │   └── Forum.jsx            # Foro de dudas con hilo de respuestas
│   ├── exam/
│   │   └── ExamSimulator.jsx    # Simulador EXANI-II con timer, navegación y resultados
│   ├── whiteboard/
│   │   └── Whiteboard.jsx       # Pizarra canvas (pluma, borrador, línea, rect, círculo)
│   └── ui/
│       └── Stars.jsx            # Partículas de estrellas animadas (fondo global)
│
├── context/
│   └── AuthContext.jsx      # Autenticación mock por rol
│
└── data/
    └── mockData.js          # Datos simulados (alumnos, módulos, videos, foro, examen)

public/                      # Imágenes estáticas (servidas directamente)
├── timrael-space-4984262_1920.jpg         # Milky Way (login background)
├── poldychromos-astronaut-6947813_1920.jpg # Astronauta dorado (student dashboard)
├── 51581-solar-system-439046_1920.jpg     # Sistema solar (sidebar strip)
├── fernandozhiminaicela-face-mask-5042631_1920.jpg # Estethoscope (medical cards)
├── wikiimages-astronaut-11080_1920.jpg    # Astronauta NASA
├── nomevisualizzato-the-medicine-4764731_1920.jpg  # Medicina general
├── favicon.svg
└── icons.svg
```

## Sistema de diseño

El proyecto implementa **Raw Form** — un sistema brutalista de alta tipografía adaptado a tema espacial.

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `space-void` | `#030a1a` | Fondo base |
| `gold-bright` | `#f5c842` | Acento principal, CTAs |
| `gold-deep` | `#b8880f` | Degradados dorados |
| `clinical-teal` | `#1de9b6` | Módulos Pre-medicina / Ciencias de la Salud |
| `danger` | `#f87171` | Errores, respuestas incorrectas |
| `success` | `#34d399` | Confirmaciones, respuestas correctas |

### Tipografía

| Familia | Rol | Características |
|---|---|---|
| Orbitron | Títulos, datos numéricos, header | 700–800, tracking -0.02 a -0.05em, UPPERCASE |
| Syne | Subtítulos, sección dividers | 700, tracking 0.1em |
| Inter | Cuerpo, formularios, labels | 400–600 |

### Clases CSS globales clave (`index.css`)

```css
.glass            /* Card base oscura con border sutil */
.glass-gold       /* Card con acento dorado */
.glass-clinical   /* Card con acento teal para módulos médicos */
.btn-fill         /* CTA directional fill: dorado desliza de izquierda a derecha */
.btn-gold         /* Botón sólido dorado */
.btn-ghost        /* Botón outline translúcido */
.stat-display     /* Número grande Orbitron (KPIs, scores) */
.stat-label       /* Label uppercase de estadística */
.section-divider  /* Divisor tipográfico con línea degradada dorada */
.blob-gold        /* Blob animado dorado (fondo atmosférico) */
.blob-teal        /* Blob animado teal */
.blob-navy        /* Blob animado azul marino */
.nav-link         /* Ítem de navegación sidebar */
.field            /* Input con underline animado al focus */
```

### Blobs de fondo

Dos blobs globales en `App.jsx` con `position: fixed` y `z-index: 0` persisten en todos los paneles. Son `div` con `filter: blur(140px)` y animación de drift lento (14–18s), usando `mix-blend-mode: multiply`.

## Roles de usuario (mock)

| Rol | Email | Contraseña | Acceso |
|---|---|---|---|
| Administrador | admin@centum.mx | admin123 | Todo + gestión de alumnos |
| Profesor | sofia@centum.mx | prof123 | Módulos, foro, simulador, estadísticas |
| Alumno | ana@centum.mx | alu123 | Dashboard personal, módulos, foro, simulador |

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Genera dist/ optimizado
npm run preview    # Previsualiza el build
npm run lint       # Oxlint
```

## Despliegue en GitHub Pages

1. Verificar que `vite.config.js` tenga `base: '/centum-astra/'` (o el nombre de tu repositorio).

2. Construir y subir el contenido de `dist/` a la rama `gh-pages`:

```bash
npm run build
npx gh-pages -d dist
```

O con GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. En GitHub → Settings → Pages → Source: selecciona la rama `gh-pages`, carpeta `/ (root)`.

La app estará disponible en `https://<usuario>.github.io/centum-astra/`.

## Mejoras futuras

### Backend e integración real
- Conectar a Supabase o Firebase para autenticación real, perfil de usuario y persistencia de progreso
- API REST o GraphQL para módulos, videos, foro y resultados de examen
- Integración con Zoom / Google Meet para sesiones en vivo desde la Videoteca
- Subida real de archivos en FileManager (S3 / Cloudflare R2)

### Funcionalidades del alumno
- Banco de preguntas expandido con más de 500 reactivos clasificados por subtema
- Retroalimentación explicativa con IA por respuesta incorrecta
- Historial de simulacros con gráfica de evolución de puntaje
- Sistema de logros y rachas de estudio (gamificación)
- Modo estudio por flashcard separado del simulador

### Funcionalidades del profesor / admin
- Editor de módulos drag-and-drop para reordenar temas y subir recursos
- Panel de analítica por alumno: tiempo de estudio, preguntas débiles, predicción de puntaje
- Notificaciones en tiempo real (nuevas dudas en foro, alumnos inactivos)
- Exportación de reportes en PDF / Excel

### Técnicas y arquitectura
- Migrar a TypeScript para tipado estricto de props y mock data
- Separar mock data a una capa de servicio con interfaces para intercambio transparente por APIs reales
- Code splitting automático por sección para reducir el bundle inicial (830 KB → < 300 KB)
- PWA: service worker + manifest para uso offline del simulador
- Tests de componentes con Vitest + Testing Library

### Accesibilidad y rendimiento
- Auditoría WCAG 2.1 AA: roles ARIA en tabla de alumnos, foco de teclado en modales
- Lazy loading de imágenes grandes con `loading="lazy"` y formatos WebP/AVIF
- Reducir tamaño de imágenes en `public/` (actualmente ~5 MB por foto en 1920px)
