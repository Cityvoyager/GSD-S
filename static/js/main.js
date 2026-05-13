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
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  const detailsContainer = document.querySelector('.service-details-container');
  const allDetails = document.querySelectorAll('.service-details');

  // Open service details when "Learn more" is clicked
  serviceCards.forEach(card => {
    const button = card.querySelector('.service-card__button');
    const serviceId = card.getAttribute('data-service');

    button.addEventListener('click', function(e) {
      e.preventDefault();
      openServiceDetails(serviceId);
    });
  });

  // Close button functionality
  allDetails.forEach(detail => {
    const closeButton = detail.querySelector('.service-details__close');
    closeButton.addEventListener('click', function(e) {
      e.preventDefault();
      closeServiceDetails();
    });
  });

  // Function to open service details
  function openServiceDetails(serviceId) {
    // Close any currently open details
    closeServiceDetails();

    // Open the requested service details
    const detailsElement = document.querySelector(
      `.service-details[data-service="${serviceId}"]`
    );

    if (detailsElement) {
      detailsElement.classList.add('active');
      detailsContainer.setAttribute('aria-hidden', 'false');

      // Smooth scroll to details
      setTimeout(() => {
        detailsElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

      // Update button state
      const button = document.querySelector(
        `.service-card[data-service="${serviceId}"] .service-card__button`
      );
      if (button) {
        button.setAttribute('aria-expanded', 'true');
      }
    }
  }

  // Function to close service details
  function closeServiceDetails() {
    allDetails.forEach(detail => {
      detail.classList.remove('active');
    });

    detailsContainer.setAttribute('aria-hidden', 'true');

    // Reset all button states
    serviceCards.forEach(card => {
      const button = card.querySelector('.service-card__button');
      button.setAttribute('aria-expanded', 'false');
    });
  }

  // Close details when pressing Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeServiceDetails();
    }
  });

  // Optional: Close details when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideDetails = event.target.closest('.service-details');
    const isClickInsideCard = event.target.closest('.service-card__button');

    if (!isClickInsideDetails && !isClickInsideCard) {
      // Optionally close - comment out if you prefer keeping it open
      // closeServiceDetails();
    }
  });
});
