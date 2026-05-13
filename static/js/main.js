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

// Service accordion
document.querySelectorAll('.svc-row').forEach(function (row) {
  var btn = row.querySelector('.svc-row__head');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var isOpen = row.classList.contains('svc-row--open');
    // Close all rows
    document.querySelectorAll('.svc-row--open').forEach(function (r) {
      r.classList.remove('svc-row--open');
      r.querySelector('.svc-row__head').setAttribute('aria-expanded', 'false');
    });
    // Open this one if it was closed
    if (!isOpen) {
      row.classList.add('svc-row--open');
      btn.setAttribute('aria-expanded', 'true');
      setTimeout(function () {
        row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  });
});
