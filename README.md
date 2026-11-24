# Landing Page — Rafael Mayorga Santos
### Propiedad Intelectual Internacional · Defensa Energética CFE

---

## 📋 Descripción

Landing page profesional de una sola página para el despacho jurídico del **Lic. Rafael Mayorga Santos**, especializado en:

- Registro de marcas ante el **IMPI** (México), **USPTO** (Estados Unidos) y **EUIPO** (Unión Europea)
- Patentes, modelos de utilidad y diseños industriales
- **Defensa jurídica** contra multas, ajustes de facturación y cortes de suministro de la **CFE**

---

## 🗂 Estructura de archivos

```
landingrfmz/
├── index.html          # Documento principal — toda la landing
├── style.css           # Estilos personalizados (variables, animaciones, responsive)
├── scripts.js          # Lógica JavaScript (menú, FAQ, formulario, modal)
├── assets/
│   ├── css/            # (reservado para CSS adicional / vendor)
│   ├── js/             # (reservado para librerías de terceros)
│   ├── img/            # Imágenes: foto de perfil, logo, og-image
│   └── fonts/          # Fuentes autohospedadas (opcional)
└── README.md           # Este archivo
```

---

## 🧱 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Markup | HTML5 semántico |
| Estilos | **Tailwind CSS v3** (CDN) + `style.css` personalizado |
| Lógica | JavaScript ES2020+ — sin dependencias |
| Tipografía | Google Fonts: **Playfair Display** + **Plus Jakarta Sans** |
| Iconos | SVG inline (Heroicons) |

> **Sin frameworks JS** (React, Vue, etc.) — carga mínima, rendimiento máximo.

---

## 🏗 Secciones de la página

| `id` | Sección |
|---|---|
| `#inicio` | Hero — propuesta de valor + tarjeta ejecutiva |
| `#servicios` | 4 tarjetas de áreas de práctica |
| `#internacional` | Cobertura MX · US · EU |
| `#defensa-cfe` | Bloque CFE con protocolo de defensa |
| `#sobre-mi` | Perfil del abogado + pilares de valor |
| `#faq` | 4 preguntas frecuentes (acordeón) |
| `#contacto` | Formulario de consulta + datos de contacto |

---

## ⚙️ Funcionalidades JavaScript (`scripts.js`)

| Módulo | Descripción |
|---|---|
| **Menú móvil** | Toggle hamburger con `aria-expanded` |
| **Header scroll-aware** | Sombra dinámica al hacer scroll |
| **Scroll Spy** | Resalta el enlace activo según la sección visible |
| **Acordeón FAQ** | Un ítem abierto a la vez, animación CSS suave |
| **Preselección CTA** | El `select` del formulario se autocompletaa según el botón clickeado |
| **Formulario** | Validación client-side progresiva sin `alert()` |
| **Modal privacidad** | Apertura/cierre + tecla Escape + clic en overlay |
| **Scroll animations** | `IntersectionObserver` para fade-in de elementos |

---

## 🎨 Variables de diseño (Design Tokens)

Definidas en `style.css` bajo `:root`:

```css
/* Paleta de marca */
--color-navy-950: #060D19;   /* Fondo oscuro principal */
--color-gold-500: #C59B48;   /* Color de acción / CTA */

/* Tipografía */
--font-serif: 'Playfair Display';  /* Encabezados — autoridad */
--font-sans:  'Plus Jakarta Sans'; /* Cuerpo — legibilidad */
```

---

## 🚀 Cómo ejecutar localmente

### Opción A — Servidor simple con Python
```bash
# Python 3
python -m http.server 3000
# Abrir: http://localhost:3000
```

### Opción B — Live Server (VS Code)
1. Instala la extensión **Live Server** (Ritwick Dey)
2. Clic derecho en `index.html` → **Open with Live Server**

### Opción C — OpenCode (Editor con IA)
```bash
# Requiere Node.js ≥ 18
npm install -g opencode-ai
opencode
```

---

## 🖼 Imagen de perfil

Para agregar la foto del Lic. Mayorga Santos:

1. Coloca el archivo en `assets/img/rafael-mayorga-perfil.webp` (formato WebP recomendado, 400×500px mínimo)
2. En `index.html`, reemplaza el avatar de iniciales `RMS` por:

```html
<!-- Reemplazar el div del avatar en la sección #sobre-mi -->
<img
  src="assets/img/rafael-mayorga-perfil.webp"
  alt="Lic. Rafael Mayorga Santos — Abogado especialista en Propiedad Intelectual"
  class="img-cover w-full h-full rounded-2xl"
  loading="lazy"
  decoding="async"
>
```

---

## 📬 Integración del formulario de contacto

Actualmente el formulario muestra una confirmación visual client-side.
Para envío real, integra uno de estos servicios:

| Servicio | Plan gratuito | Integración |
|---|---|---|
| **Formspree** | ✅ 50 envíos/mes | `action="https://formspree.io/f/XXXX"` |
| **Web3Forms** | ✅ 250/mes | `action="https://api.web3forms.com/submit"` |
| **EmailJS** | ✅ 200/mes | SDK JavaScript |

---

## 📱 Responsive Breakpoints (Tailwind)

| Prefijo | Ancho mínimo |
|---|---|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

---

## ✅ Checklist de lanzamiento

- [ ] Reemplazar correo de contacto placeholder (`contacto@rafaelmayorgalegal.com`)
- [ ] Agregar número de WhatsApp real con enlace `https://wa.me/52XXXXXXXXXX`
- [ ] Subir foto de perfil del abogado en `assets/img/`
- [ ] Configurar `og:image` para redes sociales (1200×630px)
- [ ] Integrar formulario con Formspree / Web3Forms
- [ ] Configurar Google Analytics 4 o similar
- [ ] Verificar accesibilidad con Lighthouse (meta: ≥ 90 en todos los scores)
- [ ] Registrar dominio y subir a hosting (Netlify, Vercel, cPanel)

---

## 📄 Licencia

Proyecto privado — todos los derechos reservados © Rafael Mayorga Santos.
Código base desarrollado bajo acuerdo de servicio profesional.
