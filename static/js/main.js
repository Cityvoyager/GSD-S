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
