// ── Modal images map ──
const projectImages = {
  'project1-images': [
    'images/project1.1.png',
    'images/project1.2.png',
    'images/project1.3.png',
    'images/project1.4.png',
  ],
  'project2-images': [
    'images/project2.1.png',
    'images/project2.2.png',
    'images/project2.3.png',
    'images/project2.4.png',
    'images/project2.5.png',
  ],
  'project3-images': [
    'images/project3.1.png',
    'images/project3.2.png',
    'images/project3.3.png',
    'images/project3.4.png',
    'images/project3.5.png',
    'images/project3.6.png',
    'images/project3.7.png',
    'images/project3.8.png',
    'images/project3.9.png',
  ],
  'project4-images': [
    'images/project4.1.png',
    'images/project4.2.png',
    'images/project4.3.png',
    'images/project4.4.png',
    'images/project4.5.png',
    'images/project4.6.png',
    'images/project4.7.png',
    'images/project4.8.png',
  ],
  'project5-images': [
    'images/project5.1.png',
    'images/project5.2.png',
    'images/project5.3.png',
  ],
  'project6-images': [
    'images/project6.1.svg',
    'images/project6.2.svg',
  ],
  'project7-images': [
    'images/project7.1.svg',
    'images/project7.2.svg',
  ],
};

// ── Translations ──
const translations = {
  en: {
    'hero-badge':          'Available for freelance projects',
    'hero-name':           'Jair Y. Coronado A.',
    'hero-title':          'Senior Software Engineer · SharePoint Developer',
    'hero-tagline':        '6+ years building Microsoft 365 solutions for enterprise clients — SPFx, Power Platform, React & TypeScript.',
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
  },
  es: {
    'hero-badge':          'Disponible para proyectos freelance',
    'hero-name':           'Jair Y. Coronado A.',
    'hero-title':          'Ingeniero de Software Senior · Desarrollador SharePoint',
    'hero-tagline':        'Más de 6 años construyendo soluciones Microsoft 365 para clientes enterprise — SPFx, Power Platform, React y TypeScript.',
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
  },
};

// ── Global modal (must be window-scoped for inline onclick) ──
window.openModal = function (projectId) {
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = '';
  const images = projectImages[projectId];
  if (images && images.length > 0) {
    images.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Project screenshot';
      modalContent.appendChild(img);
    });
  } else {
    modalContent.innerHTML = '<p style="padding:20px;color:var(--text-muted)">No additional images available.</p>';
  }
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

window.closeModal = function () {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', function () {

  // ── Dark mode ──
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark');
    themeIcon.textContent = '☾';
  }
  themeToggle.addEventListener('click', function () {
    const isDark = document.body.classList.toggle('dark');
    themeIcon.textContent = isDark ? '☾' : '☀';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // ── Language toggle ──
  const languageToggle = document.getElementById('languageToggle');
  let currentLang = 'en';

  function applyLanguage(lang) {
    Object.entries(translations[lang]).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });
  }

  languageToggle.addEventListener('click', function () {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    languageToggle.textContent = currentLang === 'en' ? 'Español' : 'English';
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
      btn.disabled = true;
      btn.textContent = '...';
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
          status.textContent = 'Message sent! I\'ll get back to you soon.';
          contactForm.reset();
        } else {
          throw new Error('server');
        }
      } catch {
        status.className = 'form-status error';
        status.textContent = 'Something went wrong. Please email me directly.';
      }
      btn.disabled = false;
      btn.textContent = currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message';
    });
  }

  // ── Modal: close on backdrop or Escape ──
  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) window.closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeModal();
  });
});
