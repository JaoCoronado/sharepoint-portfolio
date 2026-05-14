// Modal images map — all available screenshots per project
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

// EN / ES translations for all 7 projects
const translations = {
  en: {
    'project1-title': 'Financial Operations Management',
    'project1-desc': 'Developed a SharePoint-based system using JavaScript, CSS, and HTML for web components, Power Automate for document creation and approvals, and SharePoint Online for secure storage.',
    'project2-title': 'Company Voting System',
    'project2-desc': 'Designed a secure voting system using SharePoint, JavaScript, and Bootstrap, implementing real-time reporting and encrypted voting processes.',
    'project3-title': 'Corporate Requests System',
    'project3-desc': 'Created a ticketing system for pricing offers and product management, integrated with Power Automate for approvals and Excel exports.',
    'project4-title': 'Corporate Intranet Portal',
    'project4-desc': 'Migrated a legacy intranet to SharePoint using SPFx, React, and TypeScript, enabling role-based content management and scalable deployment.',
    'project5-title': 'P10 Intranet Portal',
    'project5-desc': 'Created an intranet portal for P10 company with real-time stock ticker and SharePoint-based content management.',
    'project6-title': 'Future You – Learning Platform',
    'project6-desc': 'Developed an SPFx platform for AT&T enabling personalized learning paths, career growth tracking, and talent retention tools to help collaborators grow within the company.',
    'project7-title': 'Self Nomination Portal',
    'project7-desc': 'Built a Power Apps solution to track self-nomination workflows for training courses — covering open access enrollment, supervisor review, and HRBP approval stages.',
  },
  es: {
    'project1-title': 'Gestión de Operaciones Financieras',
    'project1-desc': 'Desarrollé un sistema basado en SharePoint utilizando JavaScript, CSS y HTML para componentes web, Power Automate para la creación y aprobación de documentos, y SharePoint Online para almacenamiento seguro.',
    'project2-title': 'Sistema de Votación Empresarial',
    'project2-desc': 'Diseñé un sistema de votación seguro utilizando SharePoint, JavaScript y Bootstrap, implementando informes en tiempo real y procesos de votación cifrados.',
    'project3-title': 'Sistema de Solicitudes Corporativas',
    'project3-desc': 'Creé un sistema de gestión de solicitudes y ofertas de precios, integrado con Power Automate para aprobaciones y exportaciones a Excel.',
    'project4-title': 'Portal de Intranet Corporativa',
    'project4-desc': 'Migré una intranet antigua a SharePoint utilizando SPFx, React y TypeScript, permitiendo la gestión de contenido basada en roles y un despliegue escalable.',
    'project5-title': 'Portal Intranet P10',
    'project5-desc': 'Creé un portal intranet para la empresa P10 con ticker de acciones en tiempo real y gestión de contenido basada en SharePoint.',
    'project6-title': 'Future You – Plataforma de Aprendizaje',
    'project6-desc': 'Desarrollé una plataforma SPFx para AT&T que ofrece rutas de aprendizaje personalizadas, seguimiento del crecimiento profesional y herramientas de retención de talento.',
    'project7-title': 'Portal de Auto-Nominación',
    'project7-desc': 'Desarrollé una solución en Power Apps para gestionar nominaciones a cursos de formación, incluyendo acceso abierto, revisión de supervisores y aprobación de HRBPs.',
  },
};

// Global modal functions (must be global for inline onclick attributes)
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
    modalContent.innerHTML = '<p>No additional images available.</p>';
  }

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
};

window.closeModal = function () {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', function () {
  // ── Language toggle ──
  const languageToggle = document.getElementById('languageToggle');
  let currentLanguage = 'en';

  function applyLanguage(lang) {
    Object.entries(translations[lang]).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', function () {
      currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
      languageToggle.textContent = currentLanguage === 'en' ? 'Español' : 'English';
      applyLanguage(currentLanguage);
    });
  }

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

  // ── IntersectionObserver for card entrance animation ──
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));

  // ── Close modal on backdrop click ──
  document.getElementById('modal').addEventListener('click', function (e) {
    if (e.target === this) window.closeModal();
  });

  // ── Close modal on Escape key ──
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') window.closeModal();
  });
});
