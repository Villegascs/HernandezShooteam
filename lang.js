// =============================================================
// lang.js — Sistema de traducción Español / English
// Hernández Shoteam
// =============================================================

const translations = {
    es: {
        // Navbar
        nav_inicio: "Inicio",
        nav_sobre: "Sobre Nosotros",
        nav_logros: "Logros",
        nav_cursos: "Cursos",
        nav_contacto: "Contacto",
        nav_login: "Iniciar Sesión",
        // Profile Dropdown
        dd_mi_perfil: "Mi Perfil",
        dd_mis_cursos: "Mis Cursos",
        dd_mensajes: "Mensajes",
        dd_idioma: "Idioma",
        dd_salir: "Cerrar Sesión",
        // Hero
        hero_subtitle: "Precisión y Excelencia",
        hero_title_1: "Welcome to Hernández",
        hero_title_2: "Shooting Team",
        hero_desc: "Formando campeones, perfeccionando la técnica. Entrenamientos personalizados del más alto nivel táctico y competitivo.",
        hero_btn1: "Ver Cursos",
        hero_btn2: "Reservar Sesión",
        // About
        about_badge: "El Equipo",
        about_title: "Sobre",
        about_title_2: "Nosotros",
        about_lead: "Hernández Shoteam es un referente en el circuito internacional de tiro deportivo y táctico.",
        about_p: "Nuestra misión es llevar a los tiradores a su máximo potencial a través de metodologías probadas en competiciones de élite.",
        about_f1: "Instructores Internacionales",
        about_f2: "Metodología Avanzada",
        about_f3: "Mentalidad Competitiva",
        about_card_title: "Compromiso y Disciplina",
        about_card_p: "Forjando el carácter del tirador de élite a través del esfuerzo constante.",
        // Achievements
        ach_badge: "Palmarés",
        ach_title: "Nuestros",
        ach_title_2: "Logros",
        ach_desc: "El trabajo duro se refleja en los resultados obtenidos a nivel mundial.",
        ach_s1: "Podios Internacionales",
        ach_s2: "Campeonatos Nacionales",
        ach_s3: "Alumnos Entrenados",
        ach_s4: "Países Visitados",
        // Courses
        crs_badge: "Formación",
        crs_title: "Nuestros",
        crs_title_2: "Cursos",
        crs_desc: "Entrenamientos personalizados adaptados a tu nivel, desde fundamentos básicos hasta competición de élite.",
        crs_lvl_basic: "Básico",
        crs_lvl_int: "Intermedio",
        crs_lvl_adv: "Avanzado",
        crs_buy: "Comprar Curso",
        // Contact
        cnt_badge: "Únete al Equipo",
        cnt_title: "Contáctanos",
        cnt_desc: "¿Listo para llevar tu entrenamiento al siguiente nivel? Escríbenos para consultar disponibilidad.",
        cnt_email_lbl: "Email",
        cnt_phone_lbl: "Teléfono / WhatsApp",
        cnt_loc_lbl: "Ubicación Base",
        cnt_loc_val: "Campos Internacionales (Disponibles por Booking)",
        cnt_name: "Nombre Completo",
        cnt_email: "Correo Electrónico",
        cnt_level: "Nivel de Interés",
        cnt_lvl1: "Fundamentos Básico",
        cnt_lvl2: "Tiro Dinámico / Intermedio",
        cnt_lvl3: "Entrenamiento Competitivo",
        cnt_lvl4: "Asesoría / Otro",
        cnt_msg: "Mensaje",
        cnt_send: "Enviar Mensaje",
        // Footer
        footer_copy: "© 2026 Hernández Shoteam. Todos los derechos reservados.",
    },
    en: {
        // Navbar
        nav_inicio: "Home",
        nav_sobre: "About Us",
        nav_logros: "Achievements",
        nav_cursos: "Courses",
        nav_contacto: "Contact",
        nav_login: "Sign In",
        // Profile Dropdown
        dd_mi_perfil: "My Profile",
        dd_mis_cursos: "My Courses",
        dd_mensajes: "Messages",
        dd_idioma: "Language",
        dd_salir: "Sign Out",
        // Hero
        hero_subtitle: "Precision and Excellence",
        hero_title_1: "Welcome to Hernández",
        hero_title_2: "Shooting Team",
        hero_desc: "Building champions, perfecting technique. Personalized training of the highest tactical and competitive level.",
        hero_btn1: "View Courses",
        hero_btn2: "Book a Session",
        // About
        about_badge: "The Team",
        about_title: "About",
        about_title_2: "Us",
        about_lead: "Hernández Shoteam is a reference in the international sport and tactical shooting circuit.",
        about_p: "Our mission is to take shooters to their maximum potential through methodologies proven in elite competitions.",
        about_f1: "International Instructors",
        about_f2: "Advanced Methodology",
        about_f3: "Competitive Mindset",
        about_card_title: "Commitment & Discipline",
        about_card_p: "Forging the character of the elite shooter through constant effort.",
        // Achievements
        ach_badge: "Record",
        ach_title: "Our",
        ach_title_2: "Achievements",
        ach_desc: "Hard work is reflected in the results achieved at a world level.",
        ach_s1: "International Podiums",
        ach_s2: "National Championships",
        ach_s3: "Trained Students",
        ach_s4: "Countries Visited",
        // Courses
        crs_badge: "Training",
        crs_title: "Our",
        crs_title_2: "Courses",
        crs_desc: "Personalized training adapted to your level, from basic fundamentals to elite competition.",
        crs_lvl_basic: "Basic",
        crs_lvl_int: "Intermediate",
        crs_lvl_adv: "Advanced",
        crs_buy: "Buy Course",
        // Contact
        cnt_badge: "Join the Team",
        cnt_title: "Contact Us",
        cnt_desc: "Ready to take your training to the next level? Write to us to check availability.",
        cnt_email_lbl: "Email",
        cnt_phone_lbl: "Phone / WhatsApp",
        cnt_loc_lbl: "Base Location",
        cnt_loc_val: "International Fields (Available by Booking)",
        cnt_name: "Full Name",
        cnt_email: "Email Address",
        cnt_level: "Level of Interest",
        cnt_lvl1: "Basic Fundamentals",
        cnt_lvl2: "Dynamic Shooting / Intermediate",
        cnt_lvl3: "Competitive Training",
        cnt_lvl4: "Consulting / Other",
        cnt_msg: "Message",
        cnt_send: "Send Message",
        // Footer
        footer_copy: "© 2026 Hernández Shoteam. All rights reserved.",
    }
};

/**
 * Applies translations to all elements with data-lang attribute.
 * Usage: <span data-lang="hero_subtitle">Precisión y Excelencia</span>
 */
function applyLanguage(lang) {
    const t = translations[lang] || translations['es'];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (t[key] !== undefined) {
            el.innerText = t[key];
        }
    });
    // Also update html lang attribute
    document.documentElement.lang = lang;
    localStorage.setItem('hs_lang', lang);
}

// Auto-apply on load
document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('hs_lang') || 'es';
    applyLanguage(saved);

    // Sync any lang selectors already on page
    document.querySelectorAll('.lang-select').forEach(sel => {
        sel.value = saved;
        sel.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
            // Sync all selectors
            document.querySelectorAll('.lang-select').forEach(s => s.value = e.target.value);
        });
    });
});

// Export for module use if needed
window.applyLanguage = applyLanguage;
