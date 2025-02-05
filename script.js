document.addEventListener("DOMContentLoaded", function () {
    const projects = document.querySelectorAll(".project");

    const checkVisibility = () => {
        projects.forEach((project) => {
            const rect = project.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isVisible) {
                project.classList.add("visible");
            }
        });
    };

    // Verificar visibilidad al cargar la página y al hacer scroll
    window.addEventListener("load", checkVisibility);
    window.addEventListener("scroll", checkVisibility);
});