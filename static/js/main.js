// Nav scroll state
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Service detail panels
document.addEventListener('DOMContentLoaded', function () {

  function closeAll() {
    document.querySelectorAll('.service-detail').forEach(function (d) {
      d.style.display = 'none';
    });
    document.querySelectorAll('.service-card').forEach(function (c) {
      c.classList.remove('is-active');
    });
  }

  // Learn more buttons
  document.querySelectorAll('.js-service-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var target = btn.getAttribute('data-target');
      var detail = document.getElementById('detail-' + target);
      var card = btn.closest('.service-card');

      if (!detail) return;

      var isOpen = detail.style.display === 'block';

      closeAll();

      if (!isOpen) {
        detail.style.display = 'block';
        if (card) card.classList.add('is-active');
        setTimeout(function () {
          detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
    });
  });

  // Close buttons
  document.querySelectorAll('.js-service-close').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      var detail = btn.closest('.service-detail');
      if (!detail) return;

      var id = detail.id.replace('detail-', '');
      var card = document.querySelector('[data-service="' + id + '"]');

      detail.style.display = 'none';
      if (card) {
        card.classList.remove('is-active');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
});
// Service Details Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
  const allDetails = document.querySelectorAll('.service-details');

  // Hide all panels on load (belt-and-suspenders)
  allDetails.forEach(function (d) { d.style.display = 'none'; });

  // Learn more buttons
  document.querySelectorAll('.service-card').forEach(function (card) {
    const button = card.querySelector('.service-card__button');
    const serviceId = card.getAttribute('data-service');
    if (!button || !serviceId) return;

    button.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector('.service-details[data-service="' + serviceId + '"]');
      if (!target) return;

      const isOpen = target.style.display === 'block';

      // Close all
      allDetails.forEach(function (d) {
        d.style.display = 'none';
        d.classList.remove('active');
      });

      // Open this one if it wasn't already open
      if (!isOpen) {
        target.style.display = 'block';
        target.classList.add('active');
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    });
  });

  // Close buttons
  allDetails.forEach(function (detail) {
    const closeBtn = detail.querySelector('.service-details__close');
    if (!closeBtn) return;
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      detail.style.display = 'none';
      detail.classList.remove('active');
    });
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      allDetails.forEach(function (d) {
        d.style.display = 'none';
        d.classList.remove('active');
      });
    }
  });
});
