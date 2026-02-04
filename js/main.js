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

  // Create overlay element
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  function openNav() {
    nav.classList.add('open');
    navToggle.classList.add('active');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when clicking overlay
    navOverlay.addEventListener('click', closeNav);

    // Close nav when clicking a link (except dropdown triggers)
    nav.querySelectorAll('a:not(.nav__dropdown-trigger)').forEach(function(link) {
      link.addEventListener('click', closeNav);
    });

    // Handle mobile dropdown toggles
    nav.querySelectorAll('.nav__dropdown-trigger').forEach(function(trigger) {
      trigger.addEventListener('click', function(e) {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          const dropdown = this.closest('.nav__dropdown');
          dropdown.classList.toggle('open');
        }
      });
    });

    // Close nav on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        closeNav();
      }
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

  // ============================================
  // DYNAMICALLY SET YEAR IN FOOTER/NO HARCODED YEAR
  // ============================================

  const yearElement = document.getElementById('copyright-year');
  if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
  }

  // ============================================
  // AI TRIGGER LABEL - Show on load, hide after 3s
  // ============================================

  const aiTriggerLabel = document.querySelector('.ai-trigger__label');

  if (aiTriggerLabel) {
    // Hide the label after 5 seconds
    setTimeout(function() {
      aiTriggerLabel.classList.add('ai-trigger__label--hidden');
    }, 5000);
  }


// ============================================
// Code for timeline-spine
// ============================================

// JavaScript to dynamically position nodes based on step cards
  const steps = document.querySelectorAll('.spine-node');
  const timelineNodes = document.querySelector('.timeline-nodes');
  const timelineSpine = document.querySelector('.timeline-spine');
  const numSteps = steps.length;
  
  // Get mobile breakpoint from data attribute
  const mobileBreakpoint = parseInt(timelineSpine.getAttribute('data-mobile-breakpoint')) || 1024;
  
  // Clear any existing nodes
  timelineNodes.innerHTML = '';
  
  // Create beginning node (small)
  const beginNode = document.createElement('div');
  beginNode.className = 'timeline-node timeline-node--start';
  timelineNodes.appendChild(beginNode);
  
  // Create content nodes (one for each step)
  for (let i = 0; i < numSteps; i++) {
    const node = document.createElement('div');
    node.className = 'timeline-node timeline-node--content hollow';
    node.setAttribute('data-step', i);
    timelineNodes.appendChild(node);
  }
  
  // Create ending node (large with checkmark)
  const endNode = document.createElement('div');
  endNode.className = 'timeline-node timeline-node--end';
  timelineNodes.appendChild(endNode);
  
  // Function to check screen width and toggle mobile class
  function checkMobileBreakpoint() {
    if (window.innerWidth <= mobileBreakpoint) {
      timelineSpine.classList.add('mobile-screen');
    } else {
      timelineSpine.classList.remove('mobile-screen');
    }
  }
  
  // Function to align nodes
  function alignNodes() {
    const spineRect = timelineSpine.getBoundingClientRect();
    const contentNodes = document.querySelectorAll('.timeline-node--content');
    
    // Position beginning node at the left edge
    beginNode.style.left = '0%';
    beginNode.style.position = 'absolute';
    
    // Position content nodes aligned with step cards
    steps.forEach((step, index) => {
      const stepRect = step.getBoundingClientRect();
      const stepCenter = stepRect.left + stepRect.width / 2;
      const spineLeft = spineRect.left;
      const spineWidth = spineRect.width;
      const relativePosition = ((stepCenter - spineLeft) / spineWidth) * 100;
      
      if (contentNodes[index]) {
        contentNodes[index].style.left = `${relativePosition}%`;
        contentNodes[index].style.transform = 'translateX(-50%)';
        contentNodes[index].style.position = 'absolute';
      }
    });
    
    // Position ending node at the right edge
    endNode.style.left = '100%';
    endNode.style.transform = 'translateX(-50%)';
    endNode.style.position = 'absolute';
  }
  
  // Check breakpoint and align on load
  checkMobileBreakpoint();
  setTimeout(alignNodes, 100); // Small delay to ensure layout is complete
  
  // Check breakpoint and align on resize
  window.addEventListener('resize', function() {
    checkMobileBreakpoint();
    alignNodes();
  });
});


