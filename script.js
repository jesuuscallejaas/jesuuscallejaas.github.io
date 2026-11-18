(() => {
    const root = document.documentElement;
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navPanel = document.querySelector('.nav-panel');
    const navLinks = [...document.querySelectorAll('.nav-link')];
    const themeToggle = document.querySelector('.theme-toggle');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Año del footer
    const year = document.querySelector('#current-year');
    if (year) year.textContent = new Date().getFullYear();

    // Tema claro / oscuro (respeta la preferencia del sistema por defecto)
    const currentTheme = () => root.dataset.theme || (darkQuery.matches ? 'dark' : 'light');
    const updateThemeLabel = () => {
        const next = currentTheme() === 'dark' ? 'claro' : 'oscuro';
        themeToggle?.setAttribute('aria-label', `Cambiar a modo ${next}`);
    };
    themeToggle?.addEventListener('click', () => {
        const theme = currentTheme() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = theme;
        try { localStorage.setItem('theme', theme); } catch (e) { /* almacenamiento no disponible */ }
        updateThemeLabel();
    });
    darkQuery.addEventListener?.('change', updateThemeLabel);
    updateThemeLabel();

    // Menú móvil
    const closeMenu = () => {
        navPanel?.classList.remove('is-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        menuToggle?.setAttribute('aria-label', 'Abrir menú');
    };
    menuToggle?.addEventListener('click', () => {
        const open = navPanel.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    navLinks.forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

    // Sombra del header al hacer scroll
    const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Enlace activo según la sección visible
    const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach((section) => sectionObserver.observe(section));
    }

    // Animación de aparición
    const revealElements = document.querySelectorAll('.reveal');
    if (reducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach((el) => el.classList.add('is-visible'));
    } else {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        revealElements.forEach((el) => revealObserver.observe(el));
    }

    // Filtro del stack tecnológico
    const techFilters = [...document.querySelectorAll('.tech-filter')];
    const techItems = [...document.querySelectorAll('.tech')];
    const applyFilter = (filter) => {
        techItems.forEach((item) => {
            const match = filter === 'all' || item.dataset.level === filter;
            item.classList.toggle('is-dim', !match);
        });
        techFilters.forEach((button) => {
            const active = button.dataset.filter === filter;
            button.classList.toggle('is-active', active);
            button.setAttribute('aria-pressed', String(active));
        });
    };
    techFilters.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
    if (techFilters.length) applyFilter('stack');

    // Copiar email
    document.querySelectorAll('[data-copy]').forEach((button) => {
        const label = button.querySelector('.copy-label');
        button.addEventListener('click', async () => {
            const value = button.dataset.copy;
            try {
                await navigator.clipboard.writeText(value);
            } catch (e) {
                const field = document.createElement('textarea');
                field.value = value;
                field.style.position = 'fixed';
                field.style.opacity = '0';
                document.body.appendChild(field);
                field.select();
                document.execCommand('copy');
                field.remove();
            }
            if (label) {
                label.textContent = '¡Copiado!';
                setTimeout(() => { label.textContent = 'Copiar'; }, 2000);
            }
        });
    });
})();
