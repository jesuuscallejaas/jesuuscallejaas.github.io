const documentRoot = document.documentElement;
const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.querySelector('.nav-panel');
const navLinks = [...document.querySelectorAll('.nav-link')];
const themeToggle = document.querySelector('.theme-toggle');
const currentYear = document.querySelector('#current-year');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (currentYear) currentYear.textContent = new Date().getFullYear();

const profileTerminal = document.querySelector('.hero-terminal .terminal-content');
const profileWindowTitle = document.querySelector('.hero-terminal .window-title');
if (profileWindowTitle) profileWindowTitle.textContent = 'Perfil';
if (profileTerminal) {
	profileTerminal.innerHTML = `<div class="profile-details"><p><span>Nombre</span> Jesús Callejas Soto</p><p><span>Especialidad</span> Tecnologías de la Información</p><p><span>Enfoque</span> Desarrollo Web Full Stack</p><p><span>Stack</span> Angular · Spring Boot · MySQL</p><p><span>Ubicación</span> Almodóvar del Campo, España</p><p><span>Estado</span> Disponible para proyectos</p></div>`;
}

const heroEyebrow = document.querySelector('.hero .eyebrow');
if (heroEyebrow) heroEyebrow.remove();

const heroRole = document.querySelector('.hero .hero-role');
if (heroRole) heroRole.textContent = 'Estudiante de Ingeniería Informática · Full Stack';

const heroLead = document.querySelector('.hero .hero-lead');
if (heroLead) heroLead.innerHTML = 'Transformo ideas en <span>soluciones digitales funcionales</span>.';

const aboutCopy = document.querySelector('#sobre-mi .about-copy');
if (aboutCopy) {
	aboutCopy.innerHTML = `<h3>Estudiante de Ingeniería Informática</h3><p>Soy una persona curiosa, perseverante y orientada al aprendizaje continuo. Me interesa comprender cómo funcionan las cosas y convertir ideas en soluciones digitales claras, útiles y bien estructuradas.</p><p>Disfruto trabajando en proyectos que combinan lógica, creatividad y atención al detalle. Mi objetivo es seguir creciendo en el ámbito de las Tecnologías de la Información y aportar valor en equipos de desarrollo.</p>`;
}

const profileWindowLabel = document.querySelector('#sobre-mi .profile-frame .window-title');
if (profileWindowLabel) profileWindowLabel.textContent = 'Mi foto';

const workKicker = document.querySelector('#experiencia .section-kicker');
if (workKicker) workKicker.textContent = '05 / Vida laboral';

const profileLines = document.querySelectorAll('.hero .profile-details p');
if (profileLines.length && !reducedMotion) {
	profileLines.forEach((line) => {
		const value = line.childNodes[1];
		if (!value) return;
		const text = value.textContent;
		value.textContent = '';
		line.dataset.value = text;
	});
	let currentLine = 0;
	const typeProfileLine = () => {
		if (currentLine >= profileLines.length) return;
		const line = profileLines[currentLine];
		const value = line.childNodes[1];
		const text = line.dataset.value || '';
		let character = 0;
		const typeCharacter = () => {
			value.textContent += text.charAt(character);
			character += 1;
			if (character < text.length) setTimeout(typeCharacter, 18);
			else { currentLine += 1; setTimeout(typeProfileLine, 120); }
		};
		typeCharacter();
	};
	typeProfileLine();
}

const socialIcons = {
	GitHub: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.84c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
	LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9h3.6v11.5H3.4V9Zm5.8 0h3.4v1.57h.05c.47-.9 1.62-1.85 3.34-1.85 3.57 0 4.23 2.35 4.23 5.4v6.38h-3.55v-5.66c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98v5.76H9.2V9Z"/></svg>',
	Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>'
};
document.querySelectorAll('.hero .social-links a').forEach((link) => {
	const label = link.textContent.trim();
	link.setAttribute('aria-label', label);
	link.innerHTML = socialIcons[label] || label;
});

const downloadLink = document.querySelector('.hero .text-link');
if (downloadLink) downloadLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11 3h2v10.17l3.59-3.58L18 11l-6 6-6-6 1.41-1.41L11 13.17V3Zm-6 16h14v2H5v-2Z"/></svg> Descargar CV';

const contactGrid = document.querySelector('.contact-section .contact-grid');
if (contactGrid) {
	contactGrid.innerHTML = `<div class="contact-heading reveal"><p class="section-kicker">07 / CONTACTO</p><h2 class="section-title" id="contact-title">Contáctame</h2></div><div class="contact-layout"><div class="contact-copy-full reveal"><h3>Hablemos</h3><p class="section-intro">¿Tienes un proyecto en mente? Me encantaría escucharlo. Escríbeme y hablamos.</p><div class="contact-list"><a href="mailto:jesuscs2004@gmail.com">jesuscs2004@gmail.com</a><a href="tel:+34747494232">+34 747 49 42 32</a><a href="https://www.linkedin.com/in/jesus-callejas-soto-110485331/?isSelfProfile=true" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com/jesuuscallejaas" target="_blank" rel="noopener noreferrer">GitHub</a><span>Almodóvar del Campo, España</span></div><div class="contact-actions"><button class="contact-copy" type="button" id="copy-email">Copiar email</button><p class="copy-status" id="copy-status" aria-live="polite"></p><a class="text-link" href="mailto:jesuscs2004@gmail.com?subject=Contacto%20desde%20tu%20portfolio">Escribirme por email</a></div></div><form class="contact-form-card reveal" id="contact-form"><label for="contact-name">Nombre</label><input id="contact-name" name="name" type="text" placeholder="Tu nombre" required><label for="contact-email">Email</label><input id="contact-email" name="email" type="email" placeholder="Tu email" required><label for="contact-subject">Asunto</label><input id="contact-subject" name="subject" type="text" placeholder="Asunto" required><label for="contact-message">Mensaje</label><textarea id="contact-message" name="message" rows="5" placeholder="Tu mensaje" required></textarea><button class="button contact-primary" type="submit">Enviar mensaje</button><p class="form-note" aria-live="polite">Se abrirá tu cliente de correo.</p></form></div>`;
}

document.querySelector('.contact-actions')?.remove();
document.querySelector('.form-note')?.remove();

const educationCertificate = [...document.querySelectorAll('#formacion .education-item')]
	.find((item) => item.querySelector('h3')?.textContent.includes('Inglés B1'));
if (educationCertificate) educationCertificate.remove();

const additionalSection = document.querySelector('#informacion-adicional');
const contactSection = document.querySelector('#contacto');
if (additionalSection && contactSection) {
	contactSection.parentNode.insertBefore(additionalSection, contactSection);
	additionalSection.querySelector('.section-kicker').textContent = '06 / extras';
}

const copyEmailButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
copyEmailButton?.addEventListener('click', async () => {
	const email = 'jesuscs2004@gmail.com';
	try {
		await navigator.clipboard.writeText(email);
	} catch {
		const fallback = document.createElement('textarea');
		fallback.value = email;
		fallback.setAttribute('readonly', '');
		fallback.style.position = 'fixed';
		fallback.style.opacity = '0';
		document.body.appendChild(fallback);
		fallback.select();
		document.execCommand('copy');
		fallback.remove();
	}
	if (copyStatus) {
		copyStatus.textContent = '¡Copiado!';
		setTimeout(() => { copyStatus.textContent = ''; }, 2000);
	}
});

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	const subject = encodeURIComponent(document.querySelector('#contact-subject').value);
	const message = encodeURIComponent(`Nombre: ${document.querySelector('#contact-name').value}\nEmail: ${document.querySelector('#contact-email').value}\n\n${document.querySelector('#contact-message').value}`);
	window.location.href = `mailto:jesuscs2004@gmail.com?subject=${subject}&body=${message}`;
});

const sectionTitles = {
	'#about-title': '~/Sobre mí',
	'#projects-title': '~/Proyectos',
	'#skills-title': '~/Habilidades',
	'#education-title': '~/Formación',
	'#experience-title': '~/Experiencia personal',
	'#contact-title': 'Contáctame'
};
Object.entries(sectionTitles).forEach(([selector, title]) => {
	const element = document.querySelector(selector);
	if (element) element.textContent = title;
});

const sectionKickers = {
	'#sobre-mi': '01 / SOBRE MÍ',
	'#proyectos': '02 / PROYECTOS',
	'#habilidades': '03 / HABILIDADES',
	'#formacion': '04 / FORMACIÓN',
	'#experiencia': '05 / VIDA LABORAL',
	'#informacion-adicional': '06 / INFORMACIÓN ADICIONAL',
	'#contacto': '07 / CONTACTO'
};
Object.entries(sectionKickers).forEach(([selector, label]) => {
		const element = document.querySelector(`${selector} .section-kicker`);
		if (element) element.textContent = label;
});

const eyebrow = document.querySelector('.eyebrow');
if (eyebrow) eyebrow.textContent = '> perfil';

const additionalNote = document.querySelector('.license-note');
if (additionalNote) additionalNote.remove();

const setTheme = (theme) => {
	documentRoot.dataset.theme = theme;
	localStorage.setItem('portfolio-theme', theme);
	if (!themeToggle) return;
	const isLight = theme === 'light';
	themeToggle.textContent = isLight ? 'Dark' : 'Light';
	themeToggle.setAttribute('aria-pressed', String(isLight));
	themeToggle.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
};

setTheme(localStorage.getItem('portfolio-theme') || 'dark');
themeToggle?.addEventListener('click', () => setTheme(documentRoot.dataset.theme === 'dark' ? 'light' : 'dark'));

menuToggle?.addEventListener('click', () => {
	const isOpen = navPanel.classList.toggle('is-open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.forEach((link) => link.addEventListener('click', () => {
	navPanel?.classList.remove('is-open');
	menuToggle?.setAttribute('aria-expanded', 'false');
}));

const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
	});
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const revealElements = document.querySelectorAll('.reveal');
if (reducedMotion) revealElements.forEach((element) => element.classList.add('is-visible'));
else {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.12 });
	revealElements.forEach((element) => revealObserver.observe(element));
}

const heroName = document.querySelector('.hero-name');
if (heroName) {
	heroName.dataset.text = 'Jesús Callejas Soto';
	const text = heroName.dataset.text;
	if (reducedMotion) heroName.textContent = text;
	else {
		heroName.textContent = '';
		[...text].forEach((character, index) => setTimeout(() => { heroName.textContent += character; }, index * 75));
	}
}
