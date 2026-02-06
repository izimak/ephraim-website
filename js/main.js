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

    navToggle.addEventListener('click', function() {
      if (nav.classList.contains('open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when clicking overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', closeNav);
    }

    // Close nav when clicking a link (except dropdown triggers)
    const navLinks = nav.querySelectorAll('a:not(.nav__dropdown-trigger)');
    if (navLinks.length > 0) {
      navLinks.forEach(function(link) {
        link.addEventListener('click', closeNav);
      });
    }

    // Handle mobile dropdown toggles
    const dropdownTriggers = nav.querySelectorAll('.nav__dropdown-trigger');
    if (dropdownTriggers.length > 0) {
      dropdownTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
          if (window.innerWidth <= 900) {
            e.preventDefault();
            const dropdown = this.closest('.nav__dropdown');
            if (dropdown) {
              dropdown.classList.toggle('open');
            }
          }
        });
      });
    }

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
  if (fadeElements.length > 0) {
    const fadeObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && entry.target) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(function(el) {
      if (el) {
        fadeObserver.observe(el);
      }
    });
  }

  // Intersection Observer for stagger containers
  if (staggerContainers.length > 0) {
    const staggerObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && entry.target) {
          entry.target.classList.add('visible');
          staggerObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    staggerContainers.forEach(function(el) {
      if (el) {
        staggerObserver.observe(el);
      }
    });
  }

  // ============================================
  // FLIP CARDS - Tap to flip on mobile
  // ============================================

  const flipCards = document.querySelectorAll('.flip-card');

  if (flipCards.length > 0) {
    flipCards.forEach(function(card) {
      if (card) {
        card.addEventListener('click', function() {
          // Only toggle on touch devices
          if (window.innerWidth <= 768 || 'ontouchstart' in window) {
            this.classList.toggle('flipped');
          }
        });
      }
    });
  }

  // ============================================
  // IMAGE HOVER EFFECT (Remove grayscale)
  // ============================================

  const grayscaleImages = document.querySelectorAll('img[style*="grayscale"]');

  if (grayscaleImages.length > 0) {
    grayscaleImages.forEach(function(img) {
      if (img) {
        img.addEventListener('mouseenter', function() {
          this.style.filter = 'grayscale(0%)';
        });
        img.addEventListener('mouseleave', function() {
          this.style.filter = 'grayscale(100%)';
        });
      }
    });
  }

  // ============================================
  // FORM VALIDATION (Basic - for non-contact pages)
  // ============================================

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    // Basic validation handler (this will be overridden by webhook handler below)
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    if (requiredFields.length > 0) {
      requiredFields.forEach(function(field) {
        if (field) {
          field.addEventListener('blur', function() {
            const errorEl = this.parentElement ? this.parentElement.querySelector('.form__error') : null;
            
            if (!this.value.trim()) {
              this.classList.add('error');
              if (errorEl) errorEl.style.display = 'block';
            } else {
              this.classList.remove('error');
              if (errorEl) errorEl.style.display = 'none';
            }
          });
        }
      });
    }

    // Email validation
    const emailField = contactForm.querySelector('input[type="email"]');
    if (emailField) {
      emailField.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
          this.classList.add('error');
        } else {
          this.classList.remove('error');
        }
      });
    }
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  if (anchorLinks.length > 0) {
    anchorLinks.forEach(function(anchor) {
      if (anchor) {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href && href !== '#') {
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
      }
    });
  }

  // ============================================
  // DYNAMICALLY SET YEAR IN FOOTER/NO HARDCODED YEAR
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

  const steps = document.querySelectorAll('.spine-node');
  const timelineNodes = document.querySelector('.timeline-nodes');
  const timelineSpine = document.querySelector('.timeline-spine');

  // Only run timeline code if all required elements exist
  if (steps.length > 0 && timelineNodes && timelineSpine) {
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
      if (timelineSpine && window.innerWidth <= mobileBreakpoint) {
        timelineSpine.classList.add('mobile-screen');
      } else if (timelineSpine) {
        timelineSpine.classList.remove('mobile-screen');
      }
    }
    
    // Function to align nodes
    function alignNodes() {
      if (!timelineSpine || !beginNode || !endNode) return;
      
      const spineRect = timelineSpine.getBoundingClientRect();
      if (!spineRect || spineRect.width === 0) return;
      
      const contentNodes = document.querySelectorAll('.timeline-node--content');
      
      // Position beginning node at the left edge
      beginNode.style.left = '0%';
      beginNode.style.position = 'absolute';
      
      // Position content nodes aligned with step cards
      steps.forEach((step, index) => {
        if (!step) return;
        
        const stepRect = step.getBoundingClientRect();
        if (!stepRect) return;
        
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
  }

  // ============================================
  // Contact form webhook submission
  // ============================================

  const webhookForm = document.getElementById('contact-form');
  
  if (webhookForm) {
    webhookForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const submitButton = this.querySelector('button[type="submit"]');
      const formContainer = document.getElementById('contact-form');
      const successMessage = document.getElementById('form-success');
      
      
      // Safety check - ensure all required elements exist
      if (!submitButton || !formContainer || !successMessage) {
        console.error('Required form elements not found');
        alert('There was an error with the form. Please email us directly at hello@ephraim.solutions');
        return;
      }
      
      // Disable submit button
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending...';
      
      // Get form data with null checks
      const firstNameEl = document.getElementById('firstName');
      const lastNameEl = document.getElementById('lastName');
      const emailEl = document.getElementById('email');
      const companyEl = document.getElementById('company');
      const roleEl = document.getElementById('role');
      const revenueEl = document.getElementById('revenue');
      const industryEl = document.getElementById('industry');
      const interestEl = document.getElementById('interest');
      const messageEl = document.getElementById('message');
      
      // Validate required fields exist
      if (!firstNameEl || !lastNameEl || !emailEl || !companyEl || !messageEl) {
        console.error('Required form fields not found');
        alert('There was an error with the form. Please email us directly at hello@ephraim.solutions');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        return;
      }
      
      // Prepare data
      const webhookData = {
        name: `${firstNameEl.value} ${lastNameEl.value}`,
        email: emailEl.value,
        company: companyEl.value,
        message: messageEl.value,
        role: roleEl ? roleEl.value : '',
        revenue: revenueEl ? revenueEl.value : '',
        industry: industryEl ? industryEl.value : '',
        interest: interestEl ? interestEl.value : ''
      };
      
      try {
        const response = await fetch('https://services.leadconnectorhq.com/hooks/Bzlv7WXaYANtvUQKWqm5/webhook-trigger/0c9efb11-3f0d-4fac-b27c-5051635c12fd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });
        
        // Show success message (webhook may not return proper CORS headers)
        formContainer.style.display = 'none';
        successMessage.style.display = 'block';
        
      } catch (error) {
        console.error('Fetch error:', error);
        alert('There was an error sending your message. Please try again or email us directly at hello@ephraim.solutions');
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      }
    });
  }

  // Auto-scroll functionality for pipeline on mobile
(function() {
  const pipelineVisual = document.querySelector('.pipeline-visual');

  if (!pipelineVisual) {
    
    return;
  }
  
  let autoScrollAnimationFrame = null;
  let userInteractionTimeout = null;
  let isUserInteracting = false;
  let isResetting = false;
  let lastScrollTime = 0;
  
  const SCROLL_SPEED = 0.5; // pixels per frame
  const RESET_DELAY = 3000; // 3 seconds
  const SCROLL_INTERVAL = 16; // ~60fps
  const RESET_ANIMATION_TIME = 800; // Time for smooth scroll back to start

  function isMobile() {
    const mobile = window.innerWidth <= 768;
    return mobile;
  }

  function autoScroll(currentTime) {
    if (!isMobile() || isUserInteracting || isResetting) {
      autoScrollAnimationFrame = null;
      return;
    }

    if (currentTime - lastScrollTime >= SCROLL_INTERVAL) {
      const maxScroll = pipelineVisual.scrollWidth - pipelineVisual.clientWidth;
      const currentScroll = pipelineVisual.scrollLeft;
      if (!document.body.contains(pipelineVisual)) { 
        cleanup();
        return;
      }

      if (currentScroll >= maxScroll - 1) {
        
        isResetting = true;
        stopAutoScroll(); // FIXED: Stop the animation before resetting
        pipelineVisual.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        
        // Resume auto-scroll after smooth animation completes
        setTimeout(() => {
          isResetting = false;
          if (isMobile() && !isUserInteracting) {
            startAutoScroll();
          }
        }, RESET_ANIMATION_TIME);
        return;
      } else {
        pipelineVisual.scrollLeft += SCROLL_SPEED;
      }
      lastScrollTime = currentTime;
    }
    autoScrollAnimationFrame = requestAnimationFrame(autoScroll);
  }

  function startAutoScroll() {
    
    if (!isMobile() || isUserInteracting || isResetting || autoScrollAnimationFrame) {
      return;
    }

    autoScrollAnimationFrame = requestAnimationFrame(autoScroll);
  }

  function stopAutoScroll() {
    
    if (autoScrollAnimationFrame) {
      cancelAnimationFrame(autoScrollAnimationFrame);
      autoScrollAnimationFrame = null;
      
    }
  }

  function handleUserInteraction(event) {
    
    isUserInteracting = true;
    isResetting = false; // Cancel any ongoing reset
    stopAutoScroll();

    if (userInteractionTimeout) {
      clearTimeout(userInteractionTimeout);
      
    }

    userInteractionTimeout = setTimeout(() => {
      
      isUserInteracting = false;
      if (isMobile() && document.body.contains(pipelineVisual)) {
        startAutoScroll();
      }
    }, RESET_DELAY);
  }

  function handleResize() {
    
    if (isMobile() && !isUserInteracting) {
      startAutoScroll();
    } else if (!isMobile()) {
      stopAutoScroll();
    }
  }

  function cleanup() {
    
    stopAutoScroll();
    
    if (userInteractionTimeout) {
      clearTimeout(userInteractionTimeout);
      userInteractionTimeout = null;
    }

    pipelineVisual.removeEventListener('touchstart', handleUserInteraction);
    pipelineVisual.removeEventListener('mousedown', handleUserInteraction);
    pipelineVisual.removeEventListener('wheel', handleUserInteraction);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('beforeunload', cleanup);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    
    
  }

  function handleVisibilityChange() {
    
    if (document.hidden) {
      stopAutoScroll();
    } else if (isMobile() && !isUserInteracting) {
      startAutoScroll();
    }
  }

  pipelineVisual.addEventListener('touchstart', handleUserInteraction, { passive: true });
  pipelineVisual.addEventListener('mousedown', handleUserInteraction);
  pipelineVisual.addEventListener('wheel', handleUserInteraction, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('beforeunload', cleanup);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  if (isMobile()) {
    
    startAutoScroll();
  } else {
    
  }
})();
});