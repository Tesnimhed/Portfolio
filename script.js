document.addEventListener('DOMContentLoaded', () => {
    // 1. Animation au scroll (Fade + Timeline)
    const animatedElements = document.querySelectorAll('.fade, .timeline-item');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const appearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                appearObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => appearObserver.observe(el));

    // 2. Smooth scroll avec compensation du header fixe
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Année dynamique dans le footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // === NOUVEAU : Gestion du menu hamburger mobile ===
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.getElementById('main-nav');
    const navLinksMobile = nav?.querySelectorAll('a');

    if (menuToggle && nav) {
        // Ouvrir/fermer le menu
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        // Fermer le menu quand on clique sur un lien
        navLinksMobile?.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Fermer en cliquant en dehors du menu
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && !e.target.closest('.menu-toggle')) {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});