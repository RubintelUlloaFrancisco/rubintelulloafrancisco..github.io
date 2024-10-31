document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");
  const contactForm = document.querySelector("#contact form");
  
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
  
  // Ajuste de enlaces para redes sociales
  document.querySelectorAll('.social-icons a').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
  
  // Animación de la imagen de perfil
  const profilePic = document.querySelector(".profile-photo");
  if (profilePic) {
    profilePic.style.opacity = 0;
    profilePic.style.transform = "scale(0.5)";
    setTimeout(() => {
      profilePic.style.transition = "opacity 1s ease, transform 1s ease";
      profilePic.style.opacity = 1;
      profilePic.style.transform = "scale(1)";
    }, 300);
  }
  
  // Manejo del Formulario de Contacto
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Crear mensaje de éxito
      const successMessage = document.createElement("p");
      successMessage.textContent = "¡Mensaje enviado correctamente! Me pondré en contacto contigo pronto.";
      successMessage.classList.add("success-message");
      
      // Crear mensaje de error
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.";
      errorMessage.classList.add("error-message");
      
      // Enviar formulario utilizando Fetch API
      fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          contactForm.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());
          contactForm.appendChild(successMessage);
        } else {
          contactForm.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());
          contactForm.appendChild(errorMessage);
        }
      }).catch(error => {
        contactForm.querySelectorAll('.success-message, .error-message').forEach(msg => msg.remove());
        contactForm.appendChild(errorMessage);
      });
    });
  }
});
