const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const navDropdown = document.querySelector('.nav-dropdown');
const dropdownTrigger = document.querySelector('.dropdown-trigger');

function closeMenu() {
	menuToggle.setAttribute('aria-expanded', 'false');
	menuToggle.setAttribute('aria-label', 'Open navigation');
	primaryNav.classList.remove('is-open');
	document.body.classList.remove('menu-open');
}

menuToggle.addEventListener('click', () => {
	const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
	menuToggle.setAttribute('aria-expanded', String(!isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
	primaryNav.classList.toggle('is-open', !isOpen);
	document.body.classList.toggle('menu-open', !isOpen);
});

dropdownTrigger.addEventListener('click', () => {
	const isOpen = navDropdown.classList.toggle('is-open');
	dropdownTrigger.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.primary-nav a').forEach((link) => {
	link.addEventListener('click', () => {
		if (link.hash) closeMenu();
	});
});

document.querySelectorAll('.rule-open').forEach((button) => {
	button.addEventListener('click', (event) => {
		event.preventDefault();
		const row = button.closest('.rule-row');
		const isOpen = row.classList.toggle('is-open');
		button.setAttribute('aria-expanded', String(isOpen));
	});
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	document.documentElement.classList.add('reveal-ready');
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.08 });

	document.querySelectorAll('.section-pad, .support-band').forEach((section) => revealObserver.observe(section));
}

window.addEventListener('resize', () => {
	if (window.innerWidth > 780) closeMenu();
});
