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
    // --- Lógica de Sesión y Cursos (TIPO Udemy) ---
    // ==========================================
    
    const currentUser = JSON.parse(localStorage.getItem('hs_user'));
    
    // 1. Navbar dinámico según estado de sesión
    const authNavContainer = document.getElementById('auth-nav-container');
    if (authNavContainer) {
        if (currentUser) {
            authNavContainer.innerHTML = `<a href="mis-cursos.html" class="nav-link btn-contact" style="background-color: var(--clr-primary); color: #fff;">Mis Cursos</a>`;
        } else {
            authNavContainer.innerHTML = `<a href="login.html" class="nav-link btn-contact">Iniciar Sesión</a>`;
        }
    }

    // 2. Lógica de Auth Forms (login.html)
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    if (switchToRegister && switchToLogin) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            document.querySelector('.auth-title').innerText = 'Crea una cuenta nueva';
        });
        
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            document.querySelector('.auth-title').innerText = 'Inicia sesión en tu cuenta';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button[type="submit"]');
            const email = document.getElementById('email').value;
            
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Iniciando...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerText = '¡Bienvenido!';
                btn.style.backgroundColor = '#4CAF50';
                btn.style.opacity = '1';
                
                // Simulando inicio de sesión exitoso
                const user = { name: email.split('@')[0], email: email, purchasedCourses: JSON.parse(localStorage.getItem('hs_courses_' + email)) || [] };
                localStorage.setItem('hs_user', JSON.stringify(user));
                
                setTimeout(() => {
                    window.location.href = 'mis-cursos.html';
                }, 800);
            }, 1000);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = registerForm.querySelector('button[type="submit"]');
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Registrando...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                btn.innerText = '¡Cuenta Creada!';
                btn.style.backgroundColor = '#4CAF50'; // Verde de éxito
                btn.style.opacity = '1';

                // Simulando registro exitoso
                const user = { name: name, email: email, purchasedCourses: [] };
                localStorage.setItem('hs_user', JSON.stringify(user));
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            }, 1000);
        });
    }

    // 3. Comprar curso desde index.html
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!currentUser) {
                alert('Debes iniciar sesión para comprar un curso.');
                window.location.href = 'login.html';
                return;
            }
            
            const courseId = btn.getAttribute('data-course-id');
            const courseTitle = btn.getAttribute('data-course-title');
            const courseImg = btn.getAttribute('data-course-img');

            // Verificar si ya lo compró
            const hasCourse = currentUser.purchasedCourses.find(c => c.id === courseId);
            if (hasCourse) {
                alert('Ya tienes este curso en tu panel.');
                window.location.href = 'mis-cursos.html';
                return;
            }

            // "Comprar"
            btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Procesando...';
            setTimeout(() => {
                const newCourse = { id: courseId, title: courseTitle, img: courseImg, date: new Date().toLocaleDateString() };
                currentUser.purchasedCourses.push(newCourse);
                localStorage.setItem('hs_user', JSON.stringify(currentUser));
                localStorage.setItem('hs_courses_' + currentUser.email, JSON.stringify(currentUser.purchasedCourses)); // backup
                
                window.location.href = 'mis-cursos.html';
            }, 1000);
        });
    });

    // 4. Panel Mis Cursos (mis-cursos.html)
    const userGreeting = document.getElementById('userGreeting');
    const myCoursesGrid = document.getElementById('myCoursesGrid');
    const noCoursesMessage = document.getElementById('noCoursesMessage');
    const btnLogout = document.getElementById('btnLogout');

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('hs_user');
            window.location.href = 'index.html';
        });
    }

    if (userGreeting && myCoursesGrid) {
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        userGreeting.innerText = `Hola, ${currentUser.name}`;

        if (currentUser.purchasedCourses && currentUser.purchasedCourses.length > 0) {
            myCoursesGrid.innerHTML = '';
            currentUser.purchasedCourses.forEach(course => {
                const card = document.createElement('div');
                card.className = 'course-card fade-in visible';
                card.innerHTML = `
                    <div class="course-img" style="background-image: url('${course.img}'); background-size: cover; background-position: center; height: 160px;"></div>
                    <div class="course-content" style="padding: 1.5rem;">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">${course.title}</h3>
                        <p style="font-size: 0.8rem; color: var(--clr-text-muted); margin-bottom: 1rem;">Adquirido el ${course.date}</p>
                        <div class="progress-bar" style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-bottom: 1rem;">
                            <div style="width: 0%; height: 100%; background: var(--clr-primary); border-radius: 3px;"></div>
                        </div>
                        <p style="font-size: 0.8rem; margin-bottom: 1rem;">0% Completado</p>
                        <a href="curso-player.html?course=${course.id}" class="btn btn-primary w-100" style="padding: 0.6rem;">Ver Curso</a>
                    </div>
                `;
                myCoursesGrid.appendChild(card);
            });
        } else {
            noCoursesMessage.style.display = 'block';
        }
    }
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
