document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project");
    const languageToggle = document.getElementById("languageToggle");

    // Función para mostrar/ocultar imágenes adicionales
    projects.forEach((project) => {
        const mainImage = project.querySelector("img"); // Solo la imagen principal
        if (mainImage) {
            mainImage.addEventListener("click", function (event) {
                event.stopPropagation(); // Evita que el evento se propague
                const additionalImages = project.querySelector(".additional-images");
                if (additionalImages) {
                    additionalImages.classList.toggle("visible");
                }
            });
        }
    });

    // Función para verificar visibilidad de los proyectos
    const checkVisibility = () => {
        projects.forEach((project) => {
            const rect = project.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
            project.classList.toggle("visible", isVisible);
        });
    };

    // Diccionario de traducciones
    const translations = {
        en: {
            "project1-title": "Financial Operations Management",
            "project1-desc": "Developed a SharePoint-based system using JavaScript, CSS, and HTML for web components, Power Automate for document creation and approvals, and SharePoint Online for secure storage.",

            "project2-title": "Company Voting System",
            "project2-desc": "Designed a secure voting system using SharePoint, JavaScript, and Bootstrap, implementing real-time reporting and encrypted voting processes.",

            "project3-title": "Corporate Requests System",
            "project3-desc": "Created a ticketing system for pricing offers and product management, integrated with Power Automate for approvals and Excel exports.",

            "project4-title": "Corporate Intranet Portal",
            "project4-desc": "Migrated a legacy intranet to SharePoint using SPFx, React, and TypeScript, enabling role-based content management and scalable deployment."
        },
        es: {
            "project1-title": "Gestión de Operaciones Financieras",
            "project1-desc": "Desarrollé un sistema basado en SharePoint utilizando JavaScript, CSS y HTML para componentes web, Power Automate para la creación y aprobación de documentos, y SharePoint Online para almacenamiento seguro.",

            "project2-title": "Sistema de Votación Empresarial",
            "project2-desc": "Diseñé un sistema de votación seguro utilizando SharePoint, JavaScript y Bootstrap, implementando informes en tiempo real y procesos de votación cifrados.",

            "project3-title": "Sistema de Solicitudes Corporativas",
            "project3-desc": "Creé un sistema de gestión de solicitudes y ofertas de precios, integrado con Power Automate para aprobaciones y exportaciones a Excel.",

            "project4-title": "Portal de Intranet Corporativa",
            "project4-desc": "Migré una intranet antigua a SharePoint utilizando SPFx, React y TypeScript, permitiendo la gestión de contenido basada en roles y un despliegue escalable."
        }
    };

    let currentLanguage = "en";

    // Función para cambiar el idioma
    function toggleLanguage() {
        currentLanguage = currentLanguage === "en" ? "es" : "en";
        languageToggle.textContent = currentLanguage === "en" ? "Español" : "English";

        Object.keys(translations[currentLanguage]).forEach((key) => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = translations[currentLanguage][key];
            }
        });
    }

    // Verificar que el botón de idioma exista antes de agregar el evento
    if (languageToggle) {
        languageToggle.addEventListener("click", toggleLanguage);
    }

    // Verificar visibilidad al cargar la página y al hacer scroll
    window.addEventListener("load", checkVisibility);
    window.addEventListener("scroll", checkVisibility);
});
