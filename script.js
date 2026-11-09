// ── Modal images map ──
const projectImages = {
  'project1-images': [
    'images/project1.1.webp',
    'images/project1.2.webp',
    'images/project1.3.webp',
    'images/project1.4.webp',
  ],
  'project2-images': [
    'images/project2.1.webp',
    'images/project2.2.webp',
    'images/project2.3.webp',
    'images/project2.4.webp',
    'images/project2.5.webp',
  ],
  'project3-images': [
    'images/project3.1.webp',
    'images/project3.2.webp',
    'images/project3.3.webp',
    'images/project3.4.webp',
    'images/project3.5.webp',
    'images/project3.6.webp',
    'images/project3.7.webp',
    'images/project3.8.webp',
    'images/project3.9.webp',
  ],
  'project4-images': [
    'images/project4.1.webp',
    'images/project4.2.webp',
    'images/project4.3.webp',
    'images/project4.4.webp',
    'images/project4.5.webp',
    'images/project4.6.webp',
    'images/project4.7.webp',
    'images/project4.8.webp',
  ],
  'project5-images': [
    'images/project5.1.webp',
    'images/project5.2.webp',
    'images/project5.3.webp',
  ],
  'project6-images': [
    'images/project6.1.svg',
    'images/project6.2.svg',
  ],
  'project7-images': [
    'images/project7.1.svg',
    'images/project7.2.svg',
  ],
  'project8-images': [
    'images/project8.1.svg',
    'images/project8.2.svg',
  ],
};

// ── Translations ──
const translations = {
  en: {
    'hero-badge':          'Open to senior roles · freelance',
    'hero-name':           'Jair Y. Coronado A.',
    'hero-title':          'Senior Software Engineer · SharePoint Developer',
    'hero-tagline':        '6+ years building Microsoft 365 and frontend solutions for enterprise clients like AT&T and Southwest Airlines. SPFx, Power Platform, React, TypeScript and AI-assisted development.',
    'hero-cta-projects':   'View Projects',
    'hero-cta-contact':    'Contact Me',
    'exp-section-title':   'Experience',
    'exp1-role':           'Senior Software Engineer',
    'exp1-period':         'Jul 2025 – Present',
    'exp1-type':           'Employee',
    'exp1-b1':             'Automated self-nomination workflows for 10,000+ users, eliminating manual intervention in the annual training cycle',
    'exp1-b2':             'Resolved critical SharePoint throttling bugs that blocked processing of 1,000+ records in batch operations',
    'exp2-role':           'SharePoint Developer',
    'exp2-period':         'Dec 2021 – Jul 2025',
    'exp2-type':           'Employee',
    'exp2-b1':             'Delivered 9 SPFx solutions in production for enterprise clients across multiple industries',
    'exp2-b2':             'Led end-to-end development of SharePoint portals, automated workflows, and data management tools',
    'exp3-role':           'SharePoint Developer',
    'exp3-period':         'Feb 2025',
    'exp3-type':           'Freelance',
    'exp3-b1':             'Built the main intranet portal for P10 Holdings with real-time stock data via Alphavantage API',
    'exp4-company':        'Independent Freelance',
    'exp4-role':           'SharePoint Developer',
    'exp4-period':         'Oct 2021 – Dec 2022',
    'exp4-type':           'Freelance',
    'exp4-b1':             'Delivered 3 end-to-end projects autonomously with 2 additional clients in pipeline and ongoing active maintenance',
    'exp5-role':           'Web Developer',
    'exp5-period':         'Jun 2020 – Sep 2021',
    'exp5-type':           'Employee',
    'exp5-b1':             'Developed web solutions and digital tools as part of an in-house product team',
    'exp1-b3':             'Built integrated solutions connecting SharePoint with Power Automate flows, Outlook, and Azure Functions across enterprise environments',
    'exp1-b4':             'Worked with React + TypeScript, Azure DevOps, GitHub repos, Veracode security scan pipelines, and Terraform-based infrastructure',
    'exp1-company-period': 'Jul 2025 – Present',
    'exp1-sw-client':      'Client: Southwest Airlines',
    'exp1-sw-role':        'Senior Software Engineer',
    'exp1-sw-period':      'May 2026 – Oct 2026',
    'exp1-sw-desc':        'Worked on the frontend of a flight booking platform for a major US airline, built on micro frontends with React and TypeScript.',
    'exp1-sw-b1':          'Delivered third-party UI integrations and defect fixes in the booking confirmation flow, responsive across all breakpoints, in coordination with Product, UX and QA',
    'exp1-sw-b2':          'Coordinated and published releases of a shared component library through automated semantic-release pipelines consumed by the booking application',
    'exp1-sw-b3':          'Improved CI reliability by centralizing visual regression mocks in the shared library, reducing maintenance and flaky test failures',
    'exp1-sw-b4':          'Applied AI-assisted workflows with Kiro and Claude Code to analyze tickets and plan implementations, and built a Power Automate flow that routes GitLab MR notifications to Teams for the whole team',
    'exp2-b3':             'Designed component architecture and produced user documentation across multiple enterprise client projects',
    'exp3-b2':             'Managed portal content through SharePoint lists and libraries, integrating both internal and external data sources',
    'exp4-b2':             'Handled full project delivery: requirements gathering, solution design, negotiation, and frontend development using JS, jQuery, Bootstrap, HTML5, and CSS3',
    'exp5-b2':             'Administered SharePoint Online environments — created and configured sites, lists, and Master Pages while defining technical requirements with clients',
    'proj-section-title':  'Projects',
    'project1-title':      'Financial Operations Management',
    'project1-desc':       'Developed a SharePoint-based system using JavaScript, CSS, and HTML for web components, Power Automate for document creation and approvals, and SharePoint Online for secure storage.',
    'project2-title':      'Company Voting System',
    'project2-desc':       'Designed a secure voting system using SharePoint, JavaScript, and Bootstrap, implementing real-time reporting and encrypted voting processes.',
    'project3-title':      'Corporate Requests System',
    'project3-desc':       'Created a ticketing system for pricing offers and product management, integrated with Power Automate for approvals and Excel exports.',
    'project4-title':      'Corporate Intranet Portal',
    'project4-desc':       'Migrated a legacy intranet to SharePoint using SPFx, React, and TypeScript, enabling role-based content management and scalable deployment.',
    'project5-title':      'P10 Intranet Portal',
    'project5-desc':       'Created an intranet portal for P10 Holdings with real-time stock ticker and SharePoint-based content management.',
    'project6-title':      'Future You – Learning Platform',
    'project6-desc':       'Developed an SPFx platform for AT&T enabling personalized learning paths, career growth tracking, and talent retention tools to help collaborators grow within the company.',
    'project7-title':      'Self Nomination Portal',
    'project8-title':      'Flight Booking Platform',
    'project8-desc':       'Built frontend features for a flight booking platform on a micro frontends architecture, integrating third-party components into the confirmation flow and strengthening visual regression testing in CI. Worked with React and TypeScript, using Kiro and Claude Code to analyze and implement tickets.',
    'project7-desc':       'Built a Power Apps solution to track self-nomination workflows for training courses — covering open access enrollment, supervisor review, and HRBP approval stages.',
    'skills-title':        'Skills',
    'skill-cat1':          'SharePoint / M365',
    'skill-cat2':          'Frontend',
    'skill-cat3':          'Power Platform',
    'skill-cat4':          'DevOps / Tools',
    'contact-title':       'Contact',
    'contact-tagline':     'Open to new opportunities and freelance projects.',
    'stat1-label':         'SPFx solutions in production',
    'stat2-label':         'users impacted',
    'stat3-label':         'years of experience',
    'stat4-label':         'freelance clients delivered',
    'form-label-name':     'Name',
    'form-label-email':    'Email',
    'form-label-msg':      'Message',
    'form-submit':         'Send Message',
    'hero-cta-cv':         'Download CV',
    'nav-about':           'About',
    'nav-experience':      'Experience',
    'nav-projects':        'Projects',
    'nav-skills':          'Skills',
    'nav-contact':         'Contact',
    'hero-location':       'Bogotá, Colombia · English B2',
    'filter-all':          'All',
    'exp1-client':         'Client: AT&T',
    'exp3-client':         'Client: P10 Holdings',
    'card-client-p6':      'AT&T · Omnicom',
    'card-client-p7':      'AT&T · Omnicom',
    'card-client-p8':      'Southwest Airlines · Omnicom',
    'card-client-p4':      'Independent',
    'card-client-p5':      'P10 Holdings · SIIMPL',
    'card-client-p1':      'Independent',
    'card-client-p2':      'Independent',
    'card-client-p3':      'Independent',
  },
  es: {
    'hero-badge':          'Abierto a roles senior · freelance',
    'hero-name':           'Jair Y. Coronado A.',
    'hero-title':          'Ingeniero de Software Senior · Desarrollador SharePoint',
    'hero-tagline':        'Más de 6 años construyendo soluciones Microsoft 365 y frontend para clientes enterprise como AT&T y Southwest Airlines. SPFx, Power Platform, React, TypeScript y desarrollo asistido por IA.',
    'hero-cta-projects':   'Ver Proyectos',
    'hero-cta-contact':    'Contáctame',
    'exp-section-title':   'Experiencia',
    'exp1-role':           'Ingeniero de Software Senior',
    'exp1-period':         'Jul 2025 – Presente',
    'exp1-type':           'Empleado',
    'exp1-b1':             'Automaticé flujos de auto-nominación para más de 10,000 usuarios, eliminando la intervención manual en el ciclo anual de formación',
    'exp1-b2':             'Resolví bugs críticos de throttling en SharePoint que bloqueaban el procesamiento de más de 1,000 registros en operaciones batch',
    'exp2-role':           'Desarrollador SharePoint',
    'exp2-period':         'Dic 2021 – Jul 2025',
    'exp2-type':           'Empleado',
    'exp2-b1':             'Entregué 9 soluciones SPFx en producción para clientes enterprise de múltiples industrias',
    'exp2-b2':             'Lideré el desarrollo end-to-end de portales SharePoint, flujos automatizados y herramientas de gestión de datos',
    'exp3-role':           'Desarrollador SharePoint',
    'exp3-period':         'Feb 2025',
    'exp3-type':           'Freelance',
    'exp3-b1':             'Construí el portal intranet principal de P10 Holdings con datos bursátiles en tiempo real via Alphavantage API',
    'exp4-company':        'Freelance Independiente',
    'exp4-role':           'Desarrollador SharePoint',
    'exp4-period':         'Oct 2021 – Dic 2022',
    'exp4-type':           'Freelance',
    'exp4-b1':             'Entregué 3 proyectos end-to-end de forma autónoma con 2 clientes adicionales en pipeline y mantenimiento activo continuo',
    'exp5-role':           'Desarrollador Web',
    'exp5-period':         'Jun 2020 – Sep 2021',
    'exp5-type':           'Empleado',
    'exp5-b1':             'Desarrollé soluciones web y herramientas digitales como parte de un equipo de producto interno',
    'exp1-b3':             'Construí soluciones integradas conectando SharePoint con flujos de Power Automate, Outlook y Azure Functions en entornos enterprise',
    'exp1-b4':             'Trabajé con React + TypeScript, Azure DevOps, repositorios GitHub, pipelines de seguridad Veracode e infraestructura basada en Terraform',
    'exp1-company-period': 'Jul 2025 – Presente',
    'exp1-sw-client':      'Cliente: Southwest Airlines',
    'exp1-sw-role':        'Ingeniero de Software Senior',
    'exp1-sw-period':      'May 2026 – Oct 2026',
    'exp1-sw-desc':        'Trabajé en el frontend de una plataforma de reservas de vuelos para una aerolínea importante de Estados Unidos, construida con micro frontends, React y TypeScript.',
    'exp1-sw-b1':          'Entregué integraciones de componentes de UI de terceros y correcciones de defectos en el flujo de confirmación de reserva, responsive en todos los breakpoints, en coordinación con Producto, UX y QA',
    'exp1-sw-b2':          'Coordiné y publiqué releases de una librería de componentes compartida mediante pipelines automatizados de semantic-release, consumidos por la aplicación de reservas',
    'exp1-sw-b3':          'Mejoré la confiabilidad del CI centralizando los mocks de regresión visual en la librería compartida, reduciendo el mantenimiento y las fallas intermitentes',
    'exp1-sw-b4':          'Apliqué flujos de trabajo asistidos por IA con Kiro y Claude Code para analizar tickets y planear implementaciones, y construí un flujo de Power Automate que envía las notificaciones de MRs de GitLab a Teams para todo el equipo',
    'exp2-b3':             'Diseñé arquitecturas de componentes y produje documentación de usuario para múltiples proyectos de clientes enterprise',
    'exp3-b2':             'Gestioné el contenido del portal mediante listas y bibliotecas de SharePoint, integrando fuentes de datos internas y externas',
    'exp4-b2':             'Gestioné la entrega end-to-end de proyectos: levantamiento de requerimientos, diseño de soluciones, negociación y desarrollo frontend con JS, jQuery, Bootstrap, HTML5 y CSS3',
    'exp5-b2':             'Administré entornos de SharePoint Online — creé y configuré sitios, listas y Master Pages mientras definía requerimientos técnicos con los clientes',
    'proj-section-title':  'Proyectos',
    'project1-title':      'Gestión de Operaciones Financieras',
    'project1-desc':       'Desarrollé un sistema basado en SharePoint usando JavaScript, CSS y HTML para componentes web, Power Automate para creación y aprobación de documentos, y SharePoint Online para almacenamiento seguro.',
    'project2-title':      'Sistema de Votación Empresarial',
    'project2-desc':       'Diseñé un sistema de votación seguro usando SharePoint, JavaScript y Bootstrap, implementando reportes en tiempo real y procesos de votación cifrados.',
    'project3-title':      'Sistema de Solicitudes Corporativas',
    'project3-desc':       'Creé un sistema de gestión de solicitudes y ofertas de precios integrado con Power Automate para aprobaciones y exportaciones a Excel.',
    'project4-title':      'Portal de Intranet Corporativa',
    'project4-desc':       'Migré una intranet heredada a SharePoint con SPFx, React y TypeScript, habilitando gestión de contenido por roles y despliegue escalable.',
    'project5-title':      'Portal Intranet P10',
    'project5-desc':       'Creé un portal intranet para P10 Holdings con ticker bursátil en tiempo real y gestión de contenido basada en SharePoint.',
    'project6-title':      'Future You – Plataforma de Aprendizaje',
    'project6-desc':       'Desarrollé una plataforma SPFx para AT&T con rutas de aprendizaje personalizadas, seguimiento de crecimiento profesional y herramientas de retención de talento.',
    'project7-title':      'Portal de Auto-Nominación',
    'project8-title':      'Plataforma de Reservas de Vuelos',
    'project8-desc':       'Desarrollé funcionalidades frontend para una plataforma de reservas de vuelos con arquitectura de micro frontends, integrando componentes de terceros en el flujo de confirmación y fortaleciendo las pruebas de regresión visual en CI. Trabajé con React y TypeScript, apoyado en Kiro y Claude Code para el análisis y la implementación de tickets.',
    'project7-desc':       'Desarrollé una solución en Power Apps para gestionar nominaciones a cursos de formación, incluyendo acceso abierto, revisión de supervisores y aprobación de HRBPs.',
    'skills-title':        'Habilidades',
    'skill-cat1':          'SharePoint / M365',
    'skill-cat2':          'Frontend',
    'skill-cat3':          'Power Platform',
    'skill-cat4':          'DevOps / Herramientas',
    'contact-title':       'Contacto',
    'contact-tagline':     'Disponible para nuevas oportunidades y proyectos freelance.',
    'stat1-label':         'soluciones SPFx en producción',
    'stat2-label':         'usuarios impactados',
    'stat3-label':         'años de experiencia',
    'stat4-label':         'clientes freelance entregados',
    'form-label-name':     'Nombre',
    'form-label-email':    'Correo',
    'form-label-msg':      'Mensaje',
    'form-submit':         'Enviar Mensaje',
    'hero-cta-cv':         'Descargar CV',
    'nav-about':           'Acerca',
    'nav-experience':      'Experiencia',
    'nav-projects':        'Proyectos',
    'nav-skills':          'Habilidades',
    'nav-contact':         'Contacto',
    'hero-location':       'Bogotá, Colombia · Inglés B2',
    'filter-all':          'Todos',
    'exp1-client':         'Cliente: AT&T',
    'exp3-client':         'Cliente: P10 Holdings',
    'card-client-p6':      'AT&T · Omnicom',
    'card-client-p7':      'AT&T · Omnicom',
    'card-client-p8':      'Southwest Airlines · Omnicom',
    'card-client-p4':      'Independiente',
    'card-client-p5':      'P10 Holdings · SIIMPL',
    'card-client-p1':      'Independiente',
    'card-client-p2':      'Independiente',
    'card-client-p3':      'Independiente',
  },
};

const placeholders = {
  en: {
    'form-name':    'Your name',
    'form-message': 'Tell me about your project or opportunity…',
  },
  es: {
    'form-name':    'Tu nombre',
    'form-message': 'Cuéntame sobre tu proyecto u oportunidad…',
  },
};

const messages = {
  en: {
    sending: 'Sending…',
    submit:  'Send Message',
    success: 'Message sent! I’ll get back to you soon.',
    error:   'Something went wrong. Please email me directly.',
  },
  es: {
    sending: 'Enviando…',
    submit:  'Enviar Mensaje',
    success: 'Mensaje enviado. Te responderé pronto.',
    error:   'Algo salió mal. Escríbeme directamente por correo.',
  },
};

// Strings that are not element textContent (aria-labels, alt text, modal UI).
// Kept apart from `translations` because they have no matching element id.
const uiStrings = {
  en: {
    cardCue:     'View details',
    themeToggle: 'Dark mode',
    modalClose:  'Close',
    modalEmpty:  'No additional images available.',
    modalLabel:  (label) => label + ', screenshots',
    imageAlt:    (label, i, n) => label + ', screenshot ' + i + ' of ' + n,
  },
  es: {
    cardCue:     'Ver detalles',
    themeToggle: 'Modo oscuro',
    modalClose:  'Cerrar',
    modalEmpty:  'No hay imágenes adicionales disponibles.',
    modalLabel:  (label) => label + ', capturas',
    imageAlt:    (label, i, n) => label + ', captura ' + i + ' de ' + n,
  },
};

function currentUi() {
  return uiStrings[document.documentElement.lang === 'es' ? 'es' : 'en'];
}

// ── Global modal (must be window-scoped for inline onclick) ──
let modalHideTimer = null;

function setPageInert(on) {
  const modal = document.getElementById('modal');
  Array.from(document.body.children).forEach((el) => {
    if (el === modal || el.tagName === 'SCRIPT') return;
    if (on) el.setAttribute('inert', '');
    else el.removeAttribute('inert');
  });
}

window.openModal = function (projectId) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const ui = currentUi();
  clearTimeout(modalHideTimer);
  if (!modal.classList.contains('open')) window._modalLastFocused = document.activeElement;
  modalContent.textContent = '';
  const base = projectId.replace('-images', '');
  const titleEl = document.getElementById(base + '-title');
  const descEl = document.getElementById(base + '-desc');
  const label = titleEl ? titleEl.textContent.trim() : 'Project';

  const heading = document.createElement('h3');
  heading.className = 'modal-title';
  heading.textContent = label;
  modalContent.appendChild(heading);
  if (descEl) {
    const desc = document.createElement('p');
    desc.className = 'modal-desc';
    desc.textContent = descEl.textContent.trim();
    modalContent.appendChild(desc);
  }

  const images = projectImages[projectId];
  if (images && images.length > 0) {
    images.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = ui.imageAlt(label, i + 1, images.length);
      img.loading = 'lazy';
      img.decoding = 'async';
      modalContent.appendChild(img);
    });
  } else {
    const empty = document.createElement('p');
    empty.className = 'modal-empty';
    empty.textContent = ui.modalEmpty;
    modalContent.appendChild(empty);
  }
  modal.setAttribute('aria-label', ui.modalLabel(label));
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  setPageInert(true);
  requestAnimationFrame(() => modal.classList.add('open'));
  const closeBtn = modal.querySelector('.close');
  if (closeBtn) {
    closeBtn.setAttribute('aria-label', ui.modalClose);
    closeBtn.focus();
  }
};

window.closeModal = function () {
  const modal = document.getElementById('modal');
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setPageInert(false);
  clearTimeout(modalHideTimer);
  modalHideTimer = setTimeout(() => { modal.style.display = 'none'; }, 200);
  const last = window._modalLastFocused;
  if (last && last.focus) last.focus();
  window._modalLastFocused = null;
};

// Keep Tab / Shift+Tab inside the open modal.
function trapModalFocus(e) {
  const modal = document.getElementById('modal');
  if (!modal.classList.contains('open')) return;
  const focusable = Array.from(modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )).filter((el) => !el.disabled);
  if (focusable.length === 0) { e.preventDefault(); return; }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (!modal.contains(active)) {
    e.preventDefault();
    first.focus();
  } else if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}

document.addEventListener('DOMContentLoaded', function () {

  // ── Dark mode ──
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    themeIcon.textContent = '☾';
  }
  themeToggle.setAttribute('aria-pressed', String(saved === 'dark'));
  themeToggle.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeIcon.textContent = isDark ? '☾' : '☀';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ── Language toggle ──
  const languageToggle = document.getElementById('languageToggle');

  function detectInitialLang() {
    // Default to English for international recruiters; only honor an explicit
    // previous choice saved by the visitor.
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'en' || savedLang === 'es') return savedLang;
    return 'en';
  }

  let currentLang = detectInitialLang();

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    // The button always advertises the OTHER language you can switch to.
    languageToggle.textContent = lang === 'en' ? 'Español' : 'English';
    languageToggle.setAttribute('lang', lang === 'en' ? 'es' : 'en');
    const ui = uiStrings[lang];
    themeToggle.setAttribute('aria-label', ui.themeToggle);
    document.querySelectorAll('.card-cue').forEach((cue) => {
      cue.firstChild.nodeValue = ui.cardCue + ' ';
    });
    const modalClose = document.querySelector('#modal .close');
    if (modalClose) modalClose.setAttribute('aria-label', ui.modalClose);
    Object.entries(translations[lang]).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });
    Object.entries(placeholders[lang]).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('placeholder', text);
    });
  }

  applyLanguage(currentLang);

  languageToggle.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
  });

  // ── Filter bar ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        if (filter === 'all') {
          card.classList.remove('hidden');
        } else {
          const tags = card.dataset.tags || '';
          card.classList.toggle('hidden', !tags.includes(filter));
        }
      });
    });
  });

  // ── Stats count-up animation ──
  function animateCount(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number[data-target]').forEach(animateCount);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(statsBar);
  }

  // ── IntersectionObserver: project cards ──
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  cards.forEach((card) => {
    card.classList.add('card-pre-animate');
    cardObserver.observe(card);
    // Keyboard accessibility: the card acts as a button that opens the modal
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ── IntersectionObserver: timeline & skill reveals ──
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── Scroll spy: highlight active nav link ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => spyObserver.observe(section));

  // ── Nav scroll shadow ──
  const mainNav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    mainNav.style.boxShadow = window.scrollY > 10
      ? '0 2px 16px rgba(0,0,0,0.12)'
      : 'none';
  }, { passive: true });

  // ── Contact form (Formspree AJAX) ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn    = document.getElementById('form-submit');
      const status = document.getElementById('formStatus');
      const t = messages[currentLang] || messages.en;
      btn.disabled = true;
      btn.textContent = t.sending;
      status.className = 'form-status';
      status.textContent = '';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' },
        });
        if (res.ok) {
          status.className = 'form-status success';
          status.textContent = t.success;
          contactForm.reset();
        } else {
          throw new Error('server');
        }
      } catch {
        status.className = 'form-status error';
        status.textContent = t.error;
      }
      btn.disabled = false;
      btn.textContent = t.submit;
    });
  }

  // ── Modal: close on backdrop or Escape ──
  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) window.closeModal();
  });

  document.addEventListener('keydown', function (e) {
    const modalOpen = document.getElementById('modal').classList.contains('open');
    if (e.key === 'Escape' && modalOpen) window.closeModal();
    else if (e.key === 'Tab') trapModalFocus(e);
  });

  // ── Analytics: count CV downloads as an event ──
  // The link carries both `download` and `target="_blank"`, so this document
  // is never unloaded and an ordinary call has time to finish — no beacon
  // needed. The guard is for the other race: count.js is async, so a fast
  // click can land before it exists, and an adblocker may mean it never does.
  const cvLink = document.querySelector('.btn-cv');
  if (cvLink) {
    cvLink.addEventListener('click', function () {
      if (window.goatcounter && typeof window.goatcounter.count === 'function') {
        window.goatcounter.count({
          path:  'cv-download',
          title: 'CV download',
          event: true,
        });
      }
    });
  }
});
