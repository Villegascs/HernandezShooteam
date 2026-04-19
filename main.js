document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation & Header Logic ---
    const header = document.getElementById('header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll background
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileToggle && navbar) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navbar.classList.contains('active')) {
                    icon.classList.replace('bx-menu', 'bx-x');
                } else {
                    icon.classList.replace('bx-x', 'bx-menu');
                }
            }
        });
    }

    // Close mobile menu when clicking a link
    if (navLinks && navbar && mobileToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.replace('bx-x', 'bx-menu');
                    }
                }
            });
        });
    }


    // --- Scroll Active State (Intersection Observer) ---
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollDown = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for header
            const sectionId = current.getAttribute('id');
            const sectionsClass = document.querySelector('.nav-list a[href*=' + sectionId + ']');

            if (!sectionsClass) return;

            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active');
            } else {
                sectionsClass.classList.remove('active');
            }
        });
    };
    if (sections.length > 0) {
        window.addEventListener('scroll', scrollActive);
    }


    // --- Entrance Animations (Intersection Observer) ---
    const faders = document.querySelectorAll('.fade-up, .fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });

    // --- Form Submission (Prevent Default for now) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerText = 'Mensaje Enviado';
                btn.style.backgroundColor = '#4CAF50'; // Green success color
                btn.style.opacity = '1';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // ==========================================
    // --- Lógica de Cursos ---
    // Manejado por el módulo Firebase en index.html
    // ==========================================

});

// Función global para el curso-player.html
window.loadVideo = function(item, title) {
    document.querySelectorAll('.lesson').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('videoTitle').innerText = title;
    
    // Simulate loading different video based on selection
    const video = document.getElementById('courseVideoPlayer');
    if(video) {
        video.pause();
        video.currentTime = 0;
        video.play();
    }
};
// ==========================================
// --- Conexión con Sanity ---
// ==========================================

async function cargarContenidoSanity() {
  try {
    const { createClient } = await import('./node_modules/@sanity/client/dist/index.browser.esm.js')
    
    const client = createClient({
      projectId: 'wnfb3rqp',
      dataset: 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    })

    // Cargar página de inicio
    const inicio = await client.fetch(`*[_type == "inicio"][0]`)
    if (inicio) {
      const titulo = document.querySelector('.title')
      const subtitulo = document.querySelector('.subtitle')
      const descripcion = document.querySelector('.description')
      const boton = document.querySelector('.btn.btn-primary')

      if (titulo && inicio.titulo) titulo.textContent = inicio.titulo
      if (subtitulo && inicio.subtitulo) subtitulo.textContent = inicio.subtitulo
      if (descripcion && inicio.descripcion) descripcion.textContent = inicio.descripcion
      if (boton && inicio.botonTexto) boton.textContent = inicio.botonTexto
    }

  } catch (error) {
    console.log('Sanity no disponible:', error)
  }
}

cargarContenidoSanity()