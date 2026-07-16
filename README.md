# GBIKE — Sitio web

Landing page de GBIKE, taller de bicicletas en Providencia, Santiago de Chile.
React 19 + Vite + TypeScript + Tailwind CSS v4. Sitio 100% estático, pensado
para desplegarse en hosting compartido (cPanel).

## Comandos

- `npm run dev` — servidor de desarrollo (Vite)
- `npm run build` — verificación de tipos (`tsc -b`) + build de producción en `dist/`
- `npm run typecheck` — solo verificación de tipos
- `npm run preview` — sirve el build de producción localmente
- `npm run format` — formateo con oxfmt

## Arquitectura de datos del negocio

Los datos editables por la clienta (teléfono, WhatsApp, correo, dirección,
horarios, redes) viven en `public/business.json` y se cargan en runtime:

- `src/config/site.ts` — tipos, defaults compilados (fallback) y datos no editables
- `src/config/loadBusinessConfig.ts` — fetch con validación campo a campo;
  un campo inválido cae a su default sin afectar al resto
- `src/config/BusinessConfigContext.tsx` — provider + hook `useBusinessConfig()`

Editar `business.json` en el servidor actualiza la página sin recompilar.
La página nunca queda sin datos: si el JSON falta o está corrupto, se usan
los defaults compilados.

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

Subir únicamente el contenido de `dist/` al hosting. `robots.txt`,
`sitemap.xml` y `business.json` se copian automáticamente desde `public/`.

## Estilo

Tailwind CSS v4 vía plugin de Vite (sin config de PostCSS). Colores de marca:
rojo `#E30613`, negro `#0D0D0D`, superficies oscuras `#181818`.
