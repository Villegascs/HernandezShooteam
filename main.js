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
    // Usamos el truco del iframe oculto para evitar la recarga de la página
    // y mantener 100% la inmunidad contra AdBlockers.
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const hiddenIframe = document.getElementById('hidden_iframe');
    let formSubmitted = false;

    if (contactForm && hiddenIframe) {
        contactForm.addEventListener('submit', function() {
            formSubmitted = true;
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerText = "Enviando...";
        });

        hiddenIframe.addEventListener('load', function() {
            if (formSubmitted) {
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('formSuccessMessage').style.display = 'block';
                contactForm.reset();
                formSubmitted = false;
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

async function cargarCursosSanity() {
    const cursosGrid = document.getElementById('cursosGrid')
    if (!cursosGrid) return // Solo ejecutar en la página de cursos

    try {
        const projectId = 'wnfb3rqp'
        const dataset = 'production'
        // Traemos todos los cursos ordenados por "orden" ascendente
        const query = encodeURIComponent(`*[_type == "curso"] | order(orden asc) {
            _id,
            titulo,
            descripcion,
            nivel,
            "imagenURL": coalesce(imagen.asset->url, imagen),
            premium
        }`)
        const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`

        const response = await fetch(url)
        const data = await response.json()
        const cursos = data.result

        if (cursos && cursos.length > 0) {
            // Limpiar contenedor (por si acaso)
            cursosGrid.innerHTML = ''
            
            let delay = 1;
            cursos.forEach(curso => {
                // Determinar el texto del nivel
                let nivelTexto = 'Básico';
                let nivelClase = '';
                if (curso.nivel === 'inter') {
                    nivelTexto = 'Intermedio';
                    nivelClase = 'accent';
                } else if (curso.nivel === 'advanced') {
                    nivelTexto = 'Avanzado';
                    nivelClase = 'premium';
                }

                // Si es premium, podemos forzar el badge premium si es necesario,
                // aunque el esquema tiene "nivel" y "premium" por separado.
                if (curso.premium) {
                    nivelTexto = 'Premium';
                    nivelClase = 'premium';
                }

                // Si no hay imagen, usar una por defecto
                const imageUrl = curso.imagenURL ? curso.imagenURL : 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=600';

                // Crear HTML de la tarjeta
                const cardHTML = `
                    <div class="course-card fade-up delay-${delay > 3 ? 3 : delay} visible">
                        <div class="course-img placeholder-img" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
                            <span class="level-badge ${nivelClase}">${nivelTexto}</span>
                        </div>
                        <div class="course-content">
                            <h3>${curso.titulo || 'Sin Título'}</h3>
                            <p>${curso.descripcion || 'Sin descripción'}</p>
                            <div class="course-actions" style="display: flex; justify-content: flex-end; align-items: center; margin-top: 1rem;">
                                <a href="curso-player.html?id=${curso._id}" class="btn btn-primary btn-buy">Ver curso</a>
                            </div>
                        </div>
                    </div>
                `;
                
                cursosGrid.insertAdjacentHTML('beforeend', cardHTML);
                delay++;
            });
        } else {
            cursosGrid.innerHTML = '<p style="text-align:center; width:100%; color:var(--clr-text-muted);">No hay cursos disponibles por el momento.</p>'
        }
    } catch (error) {
        console.log('Sanity error al cargar cursos:', error)
        cursosGrid.innerHTML = '<p style="text-align:center; width:100%; color:var(--clr-text-muted);">Error al cargar los cursos. Por favor intenta de nuevo más tarde.</p>'
    }
}

async function cargarCursoPlayerSanity() {
    const isPlayerPage = document.getElementById('headerCourseTitle');
    if (!isPlayerPage) return; // Solo ejecutar en curso-player.html

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    if (!courseId) {
        document.getElementById('courseHeroTitle').textContent = 'Curso no encontrado';
        document.getElementById('courseHeroDesc').textContent = 'No se ha especificado un curso válido.';
        return;
    }

    try {
        const projectId = 'wnfb3rqp';
        const dataset = 'production';
        const query = encodeURIComponent(`*[_type == "curso" && _id == "${courseId}"][0]{..., "imagenURL": coalesce(imagen.asset->url, imagen)}`);
        const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;

        const response = await fetch(url);
        const data = await response.json();
        const curso = data.result;

        if (!curso) {
            document.getElementById('courseHeroTitle').textContent = 'Curso no encontrado';
            return;
        }

        // 1. Textos Generales
        document.getElementById('headerCourseTitle').textContent = curso.titulo || 'Curso';
        document.getElementById('courseHeroTitle').textContent = curso.titulo || 'Sin título';
        document.getElementById('courseHeroDesc').textContent = curso.descripcion || 'Sin descripción';
        
        // 2. Badge de Nivel
        const badge = document.getElementById('courseHeroBadge');
        if (curso.premium) {
            badge.textContent = 'Premium';
            badge.style.background = 'var(--clr-primary)';
            badge.style.display = 'inline-block';
        } else if (curso.nivel === 'advanced') {
            badge.textContent = 'Avanzado';
            badge.style.background = 'var(--clr-primary)';
            badge.style.display = 'inline-block';
        } else if (curso.nivel === 'inter') {
            badge.textContent = 'Intermedio';
            badge.style.background = '#f59e0b';
            badge.style.color = '#000';
            badge.style.display = 'inline-block';
        } else if (curso.nivel === 'basic') {
            badge.textContent = 'Básico';
            badge.style.background = '#22c55e';
            badge.style.display = 'inline-block';
        }

        // 3. Sidebar (Imagen, Precios)
        if (curso.imagenURL) document.getElementById('courseSidebarImg').src = curso.imagenURL;
        if (curso.precio) document.getElementById('courseSidebarPrice').textContent = `$${curso.precio.toFixed(2)}`;
        if (curso.precioAnterior) document.getElementById('courseSidebarOldPrice').textContent = `$${curso.precioAnterior.toFixed(2)}`;

        // 4. Beneficios
        const benefitsContainer = document.getElementById('courseBenefitsContainer');
        benefitsContainer.innerHTML = '';
        if (curso.beneficios && curso.beneficios.length > 0) {
            curso.beneficios.forEach(beneficio => {
                benefitsContainer.innerHTML += `<div style="display: flex; align-items: center; gap: 0.8rem;"><i class='bx bx-check-circle' style="font-size: 1.2rem; color: var(--clr-primary);"></i> ${beneficio}</div>`;
            });
        } else {
            benefitsContainer.innerHTML = '<p style="color:var(--clr-text-muted);">Información no disponible.</p>';
        }

        // 5. Módulos y Clases
        const modulesContainer = document.getElementById('courseModulesContainer');
        const summary = document.getElementById('courseModulesSummary');
        modulesContainer.innerHTML = '';
        
        if (curso.modulos && curso.modulos.length > 0) {
            let totalClases = 0;
            let sectionCount = curso.modulos.length;
            
            curso.modulos.forEach((modulo, index) => {
                const numClases = modulo.clases ? modulo.clases.length : 0;
                totalClases += numClases;
                
                let clasesHTML = '';
                if (modulo.clases) {
                    modulo.clases.forEach(clase => {
                        clasesHTML += `
                            <li class="lesson" style="padding: 0.8rem 1.5rem; display: flex; align-items: center; gap: 1rem;">
                                <i class='bx bx-play-circle' style="color: var(--clr-text-muted);"></i>
                                <span class="lesson-title" style="flex: 1;">${clase.titulo || 'Clase'}</span>
                                <span class="lesson-time" style="color: var(--clr-text-muted); font-size: 0.85rem;">${clase.duracion || '--:--'}</span>
                            </li>
                        `;
                    });
                }

                // El primer módulo se muestra expandido
                const isExpanded = index === 0 ? 'expanded' : '';
                
                const moduleHTML = `
                    <div class="module ${isExpanded}" style="border-bottom: 1px solid var(--glass-border);">
                        <div class="module-header" onclick="this.parentElement.classList.toggle('expanded')" style="background: rgba(255,255,255,0.02); padding: 1rem 1.5rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                            <h4 style="margin: 0; font-size: 1.1rem;">${modulo.titulo || 'Módulo'}</h4>
                            <div style="display: flex; align-items: center; gap: 1rem; color: var(--clr-text-muted); font-size: 0.9rem;">
                                <span>${numClases} clases</span>
                                <i class='bx bx-chevron-down'></i>
                            </div>
                        </div>
                        <ul class="module-lessons" style="padding: 1rem 0; margin: 0; list-style: none;">
                            ${clasesHTML}
                        </ul>
                    </div>
                `;
                modulesContainer.innerHTML += moduleHTML;
            });
            
            summary.textContent = `${sectionCount} secciones • ${totalClases} clases`;
        } else {
            summary.textContent = 'El temario no está disponible aún.';
            modulesContainer.style.display = 'none';
        }

    } catch (error) {
        console.error('Error cargando los detalles del curso:', error);
        document.getElementById('courseHeroTitle').textContent = 'Error';
        document.getElementById('courseHeroDesc').textContent = 'No pudimos cargar la información del curso.';
    }
}

cargarContenidoSanity()
cargarCursosSanity()
cargarCursoPlayerSanity()