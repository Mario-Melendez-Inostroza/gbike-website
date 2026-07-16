# GBIKE — Sitio web

Landing page de GBIKE, taller de bicicletas en Providencia, Santiago de Chile.
React 19 + Vite + TypeScript + Tailwind CSS v4, desplegado en **Vercel**
(sitio estático + funciones serverless para el panel de administración).

## Comandos

- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — verificación de tipos (`tsc -b`) + build de producción en `dist/`
- `npm run typecheck` — solo verificación de tipos
- `npm run preview` — sirve el build de producción localmente
- `npm run format` — formateo con oxfmt

## Arquitectura de datos del negocio

Los datos del negocio se cargan en runtime desde tres fuentes en cascada
(la página nunca queda sin datos):

1. `GET /api/business` — datos guardados desde el panel `/panel` (Vercel Blob)
2. `public/business.json` — fallback estático
3. Defaults compilados en `src/config/site.ts`

Piezas:

- `src/config/site.ts` — tipos, defaults compilados y datos no editables
- `src/config/loadBusinessConfig.ts` — carga + `mergeBusinessConfig` (validación
  campo a campo; un campo inválido cae a su default sin afectar al resto)
- `src/config/BusinessConfigContext.tsx` — provider + hook `useBusinessConfig()`

## Panel de administración (`/panel`)

Página mínima para que la clienta edite WhatsApp, dirección y horarios.
Los campos editables se declaran en `src/config/editableFields.ts` — **ese
archivo es la plantilla**: para reutilizar el panel en otro proyecto solo se
cambia ese esquema; el editor (`src/panel/`) y las funciones (`api/`) son
genéricos.

- `api/login.ts` — autenticación de un solo administrador: contraseña contra
  `ADMIN_PASSWORD`, sesión como cookie httpOnly firmada (HMAC + `AUTH_SECRET`)
- `api/business.ts` — GET público (lee Blob con fallback a defaults);
  PUT protegido (valida con `mergeBusinessConfig` y escribe el Blob)
- `panel.html` + `src/panel/` — entrada Vite separada: el sitio público no
  carga nada del panel

### Configuración necesaria en Vercel

1. Conectar un **Blob store** al proyecto (Storage → Create → Blob).
2. Variables de entorno:
   - `ADMIN_PASSWORD` — contraseña del panel
   - `AUTH_SECRET` — cadena aleatoria larga (p. ej. `openssl rand -hex 32`)
3. Desarrollo local de las funciones: `vercel dev` (con `npm run dev` a secas
   la API no existe y el sitio usa los fallbacks — comportamiento normal).

## Estructura

- `src/components/` — secciones de la landing (Header, Hero, Services, WhyUs,
  Gallery, Location, Contact, Footer, WhatsAppFloat) y utilidades
  (WhatsAppIcon, SeoJsonLd)
- `src/components/Services.tsx` exporta `services`: única fuente de verdad de
  los servicios; el `<select>` del formulario de contacto deriva de ahí
- `public/images/` — todos los assets del sitio en WebP optimizado
- `design-assets/originals/` — fotografías originales de la clienta
  (respaldo, NO se despliega)

## Despliegue

Vercel construye con `npm run build` y sirve `dist/` + las funciones de
`api/`. `vercel.json` activa `cleanUrls` (la página `/panel.html` se sirve
como `/panel`). El panel está excluido de robots.txt y lleva `noindex`.

## Estilo

Tailwind CSS v4 vía plugin de Vite (sin config de PostCSS). Colores de marca:
rojo `#E30613`, negro `#0D0D0D`, superficies oscuras `#181818`.
