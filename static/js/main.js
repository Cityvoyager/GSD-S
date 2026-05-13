// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Service detail panels
const serviceToggles = document.querySelectorAll('.js-service-toggle');
const serviceDetails = document.querySelectorAll('.service-detail');
const serviceCards = document.querySelectorAll('.service-card');

function closeAll() {
  serviceDetails.forEach(d => {
    d.setAttribute('aria-hidden', 'true');
  });
  serviceCards.forEach(c => c.classList.remove('is-active'));
}

serviceToggles.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    const detail = document.getElementById('detail-' + target);
    const card = btn.closest('.service-card');
    const isOpen = detail.getAttribute('aria-hidden') === 'false';

    closeAll();

    if (!isOpen) {
      detail.setAttribute('aria-hidden', 'false');
      card.classList.add('is-active');
      // Scroll smoothly to the detail panel
      setTimeout(() => {
        detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  });
});

document.querySelectorAll('.js-service-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail = btn.closest('.service-detail');
    const id = detail.id.replace('detail-', '');
    const card = document.querySelector('[data-service="' + id + '"]');
    detail.setAttribute('aria-hidden', 'true');
    if (card) {
      card.classList.remove('is-active');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}
