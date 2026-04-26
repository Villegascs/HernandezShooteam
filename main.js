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

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
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



    // ==========================================
    // --- Lógica del Formulario de Contacto ---
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            // Si la acción es la de ejemplo de Formspree, prevenimos el envío real
            // para que el usuario pueda ver el feedback visual en el código.
            if (this.action.includes('XXXXXX')) {
                e.preventDefault();
                alert("¡Configuración necesaria! Por favor, crea una cuenta en Formspree.io y reemplaza 'XXXXXX' en el archivo index.html con tu ID de formulario.");
                return;
            }

            e.preventDefault();
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = "Enviando...";
            submitBtn.disabled = true;

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    document.getElementById('contactForm').style.display = 'none';
                    document.getElementById('formSuccessMessage').style.display = 'block';
                    this.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert("Hubo un error al enviar la solicitud. Por favor, intenta de nuevo.");
                    }
                }
            } catch (error) {
                alert("Error de conexión. Por favor, verifica tu internet e intenta de nuevo.");
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

});

// Función global para el curso-player.html
window.loadVideo = function (item, title) {
    document.querySelectorAll('.lesson').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('videoTitle').innerText = title;

    // Simulate loading different video based on selection
    const video = document.getElementById('courseVideoPlayer');
    if (video) {
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
        const projectId = 'wnfb3rqp'
        const dataset = 'production'
        const query = encodeURIComponent(`*[_type == "inicio"][0]`)
        const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`

        const response = await fetch(url)
        const data = await response.json()
        const inicio = data.result

        if (inicio) {
            const titulo = document.querySelector('.title')
            const subtitulo = document.querySelector('.subtitle')
            const descripcion = document.querySelector('.description')
            const boton = document.querySelector('.btn.btn-primary')

            // if (titulo && inicio.titulo) titulo.childNodes[0].textContent = inicio.titulo
            if (subtitulo && inicio.subtitulo) subtitulo.textContent = inicio.subtitulo
            if (descripcion && inicio.descripcion) descripcion.textContent = inicio.descripcion
            if (boton && inicio.botonTexto) boton.textContent = inicio.botonTexto
        }

    } catch (error) {
        console.log('Sanity error:', error)
    }
}

cargarContenidoSanity()