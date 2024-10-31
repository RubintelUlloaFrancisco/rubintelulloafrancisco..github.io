document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("header nav a");
  
    // Función para activar secciones visibles en el viewport
    const activateVisibleSection = () => {
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
          section.classList.add("active");
          updateActiveNavLink(section.id);
        } else {
          section.classList.remove("active");
        }
      });
    };
  
    // Actualizar el enlace activo en la navegación
    const updateActiveNavLink = (activeId) => {
      navLinks.forEach((link) => {
        if (link.getAttribute("href").substring(1) === activeId) {
          link.classList.add("active-link");
        } else {
          link.classList.remove("active-link");
        }
      });
    };
  
    // Evento para animar secciones al hacer scroll
    window.addEventListener("scroll", activateVisibleSection);
    activateVisibleSection(); // Llamada inicial
  
    // Smooth scroll para los enlaces de navegación
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  });
  