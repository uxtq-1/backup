/*****************************************************
 * main.js
 * Handles language switching, side menu toggles,
 * services sub-menu, modals, and form submissions.
 *****************************************************/
document.addEventListener('DOMContentLoaded', function() {

  /* ==================================================================
     1) Language Toggle (EN ↔ ES)
     ================================================================== */
  let currentLanguage = localStorage.getItem('language') || 'en';

  // Desktop & Mobile toggle buttons
  const langToggleDesktop = document.getElementById('language-toggle-desktop');
  const langToggleMobile = document.getElementById('language-toggle-mobile');

  // Helper function to switch text
  function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
      el.textContent = (lang === 'en')
        ? el.getAttribute('data-en')
        : el.getAttribute('data-es');
    });
  }

  // Initialize language
  document.body.setAttribute('lang', currentLanguage);
  updateLanguage(currentLanguage);
  if (langToggleDesktop) {
    langToggleDesktop.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
  }
  if (langToggleMobile) {
    // Usually it's the <span> inside the button that we change
    const mobileSpan = langToggleMobile.querySelector('span') || langToggleMobile;
    mobileSpan.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
  }

  // Toggle function
  function toggleLanguage() {
    currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage(currentLanguage);
    document.body.setAttribute('lang', currentLanguage);

    // Update button labels
    if (langToggleDesktop) {
      langToggleDesktop.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
    }
    if (langToggleMobile) {
      const mobileSpan = langToggleMobile.querySelector('span') || langToggleMobile;
      mobileSpan.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
    }
  }

  // Event listeners for toggles
  if (langToggleDesktop) {
    langToggleDesktop.addEventListener('click', toggleLanguage);
  }
  if (langToggleMobile) {
    langToggleMobile.addEventListener('click', toggleLanguage);
  }

  /* ==================================================================
     2) Right-Side Main Menu: Open/Close
     ================================================================== */
  const menuOpenBtn = document.getElementById('menu-open');
  const menuCloseBtn = document.getElementById('menu-close');
  const rightSideMenu = document.getElementById('rightSideMenu');

  if (menuOpenBtn && menuCloseBtn && rightSideMenu) {
    // Open side menu (slide in)
    menuOpenBtn.addEventListener('click', () => {
      rightSideMenu.classList.add('open');
    });
    // Close side menu (slide out)
    menuCloseBtn.addEventListener('click', () => {
      rightSideMenu.classList.remove('open');
      // Ensure sub-menu is also closed
      if (servicesSubMenu) {
        servicesSubMenu.classList.remove('open');
      }
    });
  }

  /* ==================================================================
     3) Services Sub-Menu: Slide Up
     ================================================================== */
  const servicesTrigger = document.querySelector('.services-trigger button');
  const servicesSubMenu = document.getElementById('servicesSubMenu');

  if (servicesTrigger && servicesSubMenu) {
    // Toggle sub-menu open/close on button click
    servicesTrigger.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent immediate closing
      servicesSubMenu.classList.toggle('open');
    });

    // Close sub-menu if user clicks outside
    document.addEventListener('click', (evt) => {
      const clickInsideTrigger = servicesTrigger.contains(evt.target);
      const clickInsideSubMenu = servicesSubMenu.contains(evt.target);
      if (!clickInsideTrigger && !clickInsideSubMenu) {
        servicesSubMenu.classList.remove('open');
      }
    });
  }

  /* ==================================================================
     4) Modals (Join Us & Contact Us)
     ================================================================== */
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const floatingIcons = document.querySelectorAll('.floating-icon');
  const closeModalButtons = document.querySelectorAll('[data-close]');

  // Open modal on icon click
  floatingIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const modalId = icon.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  // Close modal (close button)
  closeModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      if (parentModal) {
        parentModal.classList.remove('active');
      }
    });
  });

  // Close modal on clicking outside or pressing ESC
  modalOverlays.forEach(overlay => {
    // Click outside the modal-content
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    // ESC key
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  });

  /* ==================================================================
     5) Form Submissions: Alert + Reset
     ================================================================== */
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for joining us! We have received your details.');
      joinForm.reset();
      // Optional: close the modal
      document.getElementById('join-modal').classList.remove('active');
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting us! We will get back to you soon.');
      contactForm.reset();
      // Optional: close the modal
      document.getElementById('contact-modal').classList.remove('active');
    });
  }

});
