// Navegación - Menú móvil
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú móvil
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navegación activa según scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animar barras de progreso
            if (entry.target.classList.contains('skill-category')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
            }
            
            // Animar tarjetas de proyectos universitarios en secuencia
            if (entry.target.classList.contains('university-project-card')) {
                const cards = document.querySelectorAll('.university-project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = `fadeInUp 0.6s ease forwards`;
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

// Observar elementos para animaciones - ACTUALIZADO
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .about-content, .university-project-card, .timeline-item, .experience-card');
animatedElements.forEach(el => observer.observe(el));

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Validación básica
    if (nombre && email && asunto && mensaje) {
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch para enviar a un servidor o servicio de email
        
        // Mensaje de éxito
        alert('¡Mensaje enviado con éxito! Te responderé pronto.');
        
        // Limpiar formulario
        contactForm.reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de escritura para el título (opcional)
const heroTitle = document.querySelector('.nombre');
if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar después de un pequeño delay
    setTimeout(typeWriter, 500);
}

// Cambiar estilo del navbar al hacer scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo - ocultar navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scroll hacia arriba - mostrar navbar
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Contador de habilidades animado (opcional)
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '%';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observar las barras de habilidades para animar números
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const percentageElements = entry.target.querySelectorAll('.skill-info span:last-child');
            percentageElements.forEach(el => {
                const value = parseInt(el.textContent);
                animateValue(el, 0, value, 1500);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Partículas de fondo animadas (opcional - efecto visual)
const createParticle = () => {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float 4s infinite ease-in-out;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    if (hero) {
        hero.style.position = 'relative';
        hero.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 4000);
    }
};

// Crear partículas periódicamente
setInterval(createParticle, 300);

// Agregar animación de partículas al CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio cargado exitosamente! 🚀');

// ⚽ EFECTOS DE FÚTBOL ADICIONALES ⚽

// Confeti de celebración en tarjetas de proyectos
function createConfetti(x, y) {
    const colors = ['#2ecc71', '#27ae60', '#f39c12', '#e67e22', '#ffffff'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${x}px;
            top: ${y}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 10000;
            animation: confettiFall ${0.5 + Math.random() * 1}s ease-out forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Añadir animación de confeti al CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(${200 + Math.random() * 200}px) 
                       translateX(${-100 + Math.random() * 200}px) 
                       rotate(${360 + Math.random() * 360}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Añadir confeti a las tarjetas de proyectos universitarios
document.querySelectorAll('.university-project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});

// Efecto de gol cuando haces hover en los botones principales
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        createGoalEffect(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
});

function createGoalEffect(x, y) {
    const goalText = document.createElement('div');
    goalText.textContent = '⚽ ¡GOL!';
    goalText.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 2rem;
        font-weight: bold;
        color: #2ecc71;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        z-index: 10000;
        animation: goalAnimation 1s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(goalText);
    setTimeout(() => goalText.remove(), 1000);
}

const goalStyle = document.createElement('style');
goalStyle.textContent = `
    @keyframes goalAnimation {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(goalStyle);

// Animación especial para las tarjetas de experiencia
document.querySelectorAll('.experience-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100 * index);
});

// Efecto de estadio - parpadeo de luces
const stadiumLights = document.querySelectorAll('.stadium-light');
setInterval(() => {
    stadiumLights.forEach((light, index) => {
        setTimeout(() => {
            light.style.animation = 'none';
            setTimeout(() => {
                light.style.animation = 'lightFlicker 3s ease-in-out infinite';
            }, 50);
        }, index * 200);
    });
}, 5000);

// Animación de entrada para timeline items
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// Shake animation para el balón cuando haces scroll cerca
let lastBallShake = 0;
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastBallShake > 2000) { // Cada 2 segundos máximo
        const ball = document.querySelector('.ball');
        if (ball && Math.random() > 0.7) {
            ball.style.animation = 'none';
            setTimeout(() => {
                ball.style.animation = 'ballRotate 4s linear infinite, shake 0.5s ease';
            }, 10);
            lastBallShake = now;
        }
    }
});

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg) translateX(0); }
        25% { transform: rotate(5deg) translateX(-5px); }
        75% { transform: rotate(-5deg) translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

console.log('⚽ Efectos de fútbol activados! 🎉');

// Efecto Parallax suave
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.soccer-container, .hero-content');
    
    parallaxElements.forEach(element => {
        const speed = element.classList.contains('soccer-container') ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Efecto de resplandor en los iconos sociales
document.querySelectorAll('.social-links a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'heartbeat 0.6s ease, glow 1s ease-in-out infinite';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
});

// Animación especial para los títulos de sección
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'bounceIn 1s ease';
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => titleObserver.observe(title));

// Efecto de typing mejorado para el nombre
const nombreElement = document.querySelector('.nombre');
if (nombreElement) {
    const text = nombreElement.textContent;
    nombreElement.textContent = '';
    nombreElement.style.borderRight = '3px solid #2ecc71';
    nombreElement.style.paddingRight = '5px';
    nombreElement.style.display = 'inline-block';
    
    let index = 0;
    const typeSpeed = 100;
    
    function type() {
        if (index < text.length) {
            nombreElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        } else {
            nombreElement.style.borderRight = 'none';
        }
    }
    
    setTimeout(type, 1000);
}

// Añadir estrellas de celebración alrededor del balón periódicamente
setInterval(() => {
    const ball = document.querySelector('.ball');
    if (ball && Math.random() > 0.5) {
        const rect = ball.getBoundingClientRect();
        createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }
}, 3000);

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${x + (Math.random() - 0.5) * 100}px;
        top: ${y + (Math.random() - 0.5) * 100}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1000;
        animation: sparkleFloat 2s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleFloat {
        0% {
            transform: translateY(0) scale(0);
            opacity: 1;
        }
        50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 1;
        }
        100% {
            transform: translateY(-60px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

console.log('✨ Efectos adicionales de animación activados! ⚽');

