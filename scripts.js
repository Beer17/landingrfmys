/**
 * =============================================================================
 * LANDING PAGE — Rafael Mayorga Santos
 * Archivo: scripts.js
 * Descripción: Lógica interactiva de la landing page.
 *
 * ÍNDICE DE MÓDULOS:
 *   1. Inicialización — DOMContentLoaded
 *   2. Año dinámico en footer
 *   3. Menú móvil (hamburger toggle)
 *   4. Header scroll-aware (sombra y fondo al hacer scroll)
 *   5. Navegación activa (highlight del link actual por sección)
 *   6. Acordeón FAQ
 *   7. Preselección de servicio desde CTAs contextuales
 *   8. Formulario de contacto — validación y confirmación
 *   9. Modal Aviso de Privacidad
 *  10. Animación de entrada por scroll (Intersection Observer)
 * =============================================================================
 */

/* --------------------------------------------------------------------------
   UTILIDADES INTERNAS (funciones de ayuda privadas)
   -------------------------------------------------------------------------- */

/**
 * Selecciona un elemento del DOM de forma segura.
 * @param {string} selector - Selector CSS.
 * @param {Element} [scope=document] - Nodo raíz de búsqueda.
 * @returns {Element|null}
 */
const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Selecciona múltiples elementos del DOM.
 * @param {string} selector - Selector CSS.
 * @param {Element} [scope=document] - Nodo raíz de búsqueda.
 * @returns {NodeList}
 */
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

/**
 * Valida el formato de un correo electrónico.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/* --------------------------------------------------------------------------
   PUNTO DE ENTRADA PRINCIPAL
   Esperamos a que el DOM esté completamente construido antes de ejecutar
   cualquier lógica para evitar referencias a nodos inexistentes.
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. AÑO DINÁMICO EN FOOTER
     Actualiza automáticamente el copyright sin necesidad de edición manual.
     ========================================================================= */
  const yearEl = $('#current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================================================
     2. MENÚ MÓVIL — Hamburger Toggle
     Muestra/oculta el menú desplegable en pantallas pequeñas.
     Al hacer clic en cualquier enlace del menú, éste se cierra.
     ========================================================================= */
  const mobileMenuBtn = $('#mobile-menu-btn');
  const mobileMenu    = $('#mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    // Toggle del menú al presionar el botón hamburger
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);

      // Accesibilidad: actualizar aria-expanded en el botón
      mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Cerrar menú al hacer clic en cualquier enlace interno
    $$('.mobile-link', mobileMenu).forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================================================
     3. HEADER SCROLL-AWARE
     Añade la clase "scrolled" al header cuando el usuario desplaza la página
     más de 20px, lo que activa una sombra via CSS para mejorar la legibilidad.
     ========================================================================= */
  const header = $('header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };

    // Usar passive:true mejora el rendimiento del scroll en móvil
    window.addEventListener('scroll', onScroll, { passive: true });

    // Ejecutar una vez en caso de que la página cargue con scroll ya aplicado
    onScroll();
  }

  /* =========================================================================
     4. ENLACE DE NAVEGACIÓN ACTIVO (Scroll Spy)
     Detecta qué sección está en el viewport usando IntersectionObserver
     y resalta el enlace correspondiente en el menú de escritorio.
     ========================================================================= */
  const navLinks = $$('nav a[href^="#"]');
  const sections = $$('section[id]');

  if (navLinks.length && sections.length) {
    const activateLink = (id) => {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
        link.classList.toggle('text-gold-400', isActive);
      });
    };

    // Observer que detecta qué sección ocupa el centro de la pantalla
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            activateLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-45% 0px -45% 0px', // Activar sólo cuando la sección está centrada
        threshold: 0
      }
    );

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* =========================================================================
     5. ACORDEÓN FAQ
     Implementado con animación CSS de max-height para compatibilidad máxima.
     Solo un ítem permanece abierto a la vez (comportamiento de acordeón real).
     ========================================================================= */
  const faqButtons = $$('.faq-btn');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item    = button.closest('.faq-item');
      const content = $('.faq-content', item);
      const icon    = $('.faq-icon', item);
      const isOpen  = content.classList.contains('open');

      // --- Cerrar TODOS los ítems abiertos ---
      $$('.faq-item').forEach(el => {
        const c = $('.faq-content', el);
        const i = $('.faq-icon', el);
        const b = $('.faq-btn', el);

        if (c) {
          c.classList.remove('open');
          c.classList.add('hidden');     // Mantener .hidden para Tailwind
        }
        if (i) i.classList.remove('rotate-180');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      // --- Abrir el ítem clickeado si estaba cerrado ---
      if (!isOpen && content && icon) {
        content.classList.remove('hidden');
        // Pequeño delay para que el navegador procese el display antes de la transición
        requestAnimationFrame(() => content.classList.add('open'));
        icon.classList.add('rotate-180');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* =========================================================================
     6. PRESELECCIÓN DE SERVICIO DESDE CTAs CONTEXTUALES
     Cuando el usuario hace clic en un botón de servicio específico
     (marcado con data-service), el select del formulario se preselecciona
     automáticamente al llegar a la sección de contacto.
     ========================================================================= */
  const serviceSelect = $('#servicio');

  if (serviceSelect) {
    $$('.service-cta').forEach(cta => {
      cta.addEventListener('click', () => {
        const service = cta.getAttribute('data-service');
        if (service) {
          serviceSelect.value = service;
          // Disparar evento change para frameworks reactivos si los hubiera
          serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  }

  /* =========================================================================
     7. FORMULARIO DE CONTACTO
     Validación client-side progresiva con mensajes en contexto.
     Sin dependencias externas — puro JavaScript estándar.

     Flujo:
       a. Validar campos vacíos
       b. Validar formato de email
       c. Mostrar mensaje de éxito (sin recarga de página)
       d. Permitir reinicio del formulario
     ========================================================================= */
  const contactForm  = $('#contact-form');
  const formError    = $('#form-error');
  const formSuccess  = $('#form-success');
  const resetFormBtn = $('#reset-form-btn');

  if (contactForm && formError && formSuccess) {

    /**
     * Muestra un mensaje de error en el banner de validación.
     * @param {string} message - Texto del error a mostrar.
     */
    const showError = (message) => {
      formError.textContent = message;
      formError.classList.remove('hidden');
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    /** Oculta el banner de error. */
    const clearError = () => formError.classList.add('hidden');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearError();

      // Recoger valores de los campos
      const nombre      = $('#nombre', contactForm)?.value.trim()     || '';
      const correo      = $('#correo', contactForm)?.value.trim()     || '';
      const telefono    = $('#telefono', contactForm)?.value.trim()   || '';
      const servicio    = $('#servicio', contactForm)?.value          || '';
      const descripcion = $('#descripcion', contactForm)?.value.trim()|| '';

      // --- Validaciones en cadena (fail-fast) ---
      if (!nombre || !correo || !telefono || !servicio || !descripcion) {
        showError('Por favor completa todos los campos obligatorios (*) para evaluar tu caso.');
        return;
      }

      if (!isValidEmail(correo)) {
        showError('La dirección de correo electrónico no tiene un formato válido. Ejemplo: nombre@empresa.com');
        return;
      }

      if (telefono.replace(/\D/g, '').length < 10) {
        showError('Ingresa un número de teléfono válido (mínimo 10 dígitos).');
        return;
      }

      // --- Éxito: mostrar confirmación y ocultar formulario ---
      contactForm.classList.add('hidden');
      formSuccess.classList.remove('hidden');
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // Reiniciar formulario al hacer clic en "Enviar otra consulta"
    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        contactForm.reset();
        clearError();
        formSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
      });
    }
  }

  /* =========================================================================
     8. MODAL DE AVISO DE PRIVACIDAD
     Apertura y cierre del modal con soporte para:
       - Clic en botón "Aviso de Privacidad" del footer
       - Clic en botón "Entendido" dentro del modal
       - Clic en el overlay oscuro fuera del modal
       - Tecla Escape
     ========================================================================= */
  const privacyModal    = $('#privacy-modal');
  const openPrivacyBtn  = $('#open-privacy-btn');
  const closePrivacyBtn = $('#close-privacy-btn');

  if (privacyModal && openPrivacyBtn && closePrivacyBtn) {
    /** Abre el modal bloqueando el scroll del body. */
    const openModal = () => {
      privacyModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    };

    /** Cierra el modal y restaura el scroll. */
    const closeModal = () => {
      privacyModal.classList.add('hidden');
      document.body.style.overflow = '';
    };

    openPrivacyBtn.addEventListener('click', openModal);
    closePrivacyBtn.addEventListener('click', closeModal);

    // Cerrar al hacer clic en el overlay (fuera del contenido del modal)
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) closeModal();
    });

    // Cerrar con la tecla Escape (accesibilidad de teclado)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !privacyModal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  /* =========================================================================
     9. ANIMACIONES DE ENTRADA POR SCROLL (Intersection Observer)
     Aplica una clase .visible a elementos marcados con .animate-on-scroll
     cuando entran al viewport, disparando transiciones CSS definidas en style.css.

     Uso en HTML: añadir la clase `animate-on-scroll` a cualquier sección,
     tarjeta o bloque que deba aparecer con fade-in al hacer scroll.
     ========================================================================= */
  const animatables = $$('.animate-on-scroll');

  if (animatables.length) {
    const appearObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Una vez visible, dejar de observarlo para no repetir la animación
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12, // Elemento visible al 12% → se activa
        rootMargin: '0px 0px -40px 0px' // Anticipar ligeramente la aparición
      }
    );

    animatables.forEach(el => appearObserver.observe(el));
  }

}); // Fin de DOMContentLoaded
