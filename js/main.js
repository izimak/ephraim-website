/**
 * EphrAIm Solutions - Main JavaScript
 * Vanilla JS for interactions and scroll animations
 */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // MOBILE NAVIGATION TOGGLE
  // ============================================

  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });

    // Close nav when clicking a link
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================

  const header = document.querySelector('.header');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================

  const fadeElements = document.querySelectorAll('.fade-in');
  const staggerContainers = document.querySelectorAll('.stagger');

  // Intersection Observer for fade-in elements
  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(function(el) {
    fadeObserver.observe(el);
  });

  // Intersection Observer for stagger containers
  const staggerObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  staggerContainers.forEach(function(el) {
    staggerObserver.observe(el);
  });

  // ============================================
  // FLIP CARDS - Tap to flip on mobile
  // ============================================

  const flipCards = document.querySelectorAll('.flip-card');

  flipCards.forEach(function(card) {
    card.addEventListener('click', function() {
      // Only toggle on touch devices
      if (window.innerWidth <= 768 || 'ontouchstart' in window) {
        this.classList.toggle('flipped');
      }
    });
  });

  // ============================================
  // IMAGE HOVER EFFECT (Remove grayscale)
  // ============================================

  const grayscaleImages = document.querySelectorAll('img[style*="grayscale"]');

  grayscaleImages.forEach(function(img) {
    img.addEventListener('mouseenter', function() {
      this.style.filter = 'grayscale(0%)';
    });
    img.addEventListener('mouseleave', function() {
      this.style.filter = 'grayscale(100%)';
    });
  });

  // ============================================
  // FORM VALIDATION (for contact page)
  // ============================================

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Basic validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');

      requiredFields.forEach(function(field) {
        const errorEl = field.parentElement.querySelector('.form__error');

        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
          if (errorEl) errorEl.style.display = 'block';
        } else {
          field.classList.remove('error');
          if (errorEl) errorEl.style.display = 'none';
        }
      });

      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          isValid = false;
          emailField.classList.add('error');
        }
      }

      if (isValid) {
        // Show success message
        const successMessage = document.getElementById('form-success');
        if (successMessage) {
          contactForm.style.display = 'none';
          successMessage.style.display = 'block';
        }

        // In production, you would submit to your backend here
        console.log('Form submitted:', data);
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

});
