/*****************************************************
 * main.js
 * Handles language switching, side menu toggles,
 * services sub-menu, modals, form submissions, and
 * theme toggles (desktop & mobile).
 *****************************************************/
document.addEventListener('DOMContentLoaded', function() {

  /* ==================================================================
     1) Language Toggle (EN ↔ ES)
     ================================================================== */
  let currentLanguage = localStorage.getItem('language') || 'en';

  const langToggleDesktop = document.getElementById('language-toggle-desktop');
  const langToggleMobile = document.getElementById('language-toggle-mobile');

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

  // Set initial button labels
  function setLanguageButtonLabels() {
    if (langToggleDesktop) {
      langToggleDesktop.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
    }
    if (langToggleMobile) {
      const mobileSpan = langToggleMobile.querySelector('span') || langToggleMobile;
      mobileSpan.textContent = (currentLanguage === 'en') ? 'ES' : 'EN';
    }
  }
  setLanguageButtonLabels();

  // Toggle language function
  function toggleLanguage() {
    currentLanguage = (currentLanguage === 'en') ? 'es' : 'en';
    localStorage.setItem('language', currentLanguage);
    document.body.setAttribute('lang', currentLanguage);
    updateLanguage(currentLanguage);
    setLanguageButtonLabels();
  }

  // Event listeners for language toggles
  if (langToggleDesktop) {
    langToggleDesktop.addEventListener('click', toggleLanguage);
  }
  if (langToggleMobile) {
    langToggleMobile.addEventListener('click', toggleLanguage);
  }


  /* ==================================================================
     2) Theme Toggle (Desktop & Mobile)
     ================================================================== */
  const themeToggleDesktop = document.getElementById('theme-toggle-desktop'); 
  const themeToggleMobile  = document.getElementById('mobile-theme-toggle'); 
  const bodyElement = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';

  // Set initial theme on page load
  bodyElement.setAttribute('data-theme', savedTheme);

  // Helper to initialize a given button
  function setupThemeToggle(button) {
    if (!button) return;  // If there's no such element, do nothing

    // Display initial button text
    button.textContent = (savedTheme === 'light') ? 'Dark' : 'Light';

    button.addEventListener('click', function() {
      const currentTheme = bodyElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        bodyElement.setAttribute('data-theme', 'dark');
        button.textContent = 'Light';  // Offer user the chance to go back to Light
        localStorage.setItem('theme', 'dark');
      } else {
        bodyElement.setAttribute('data-theme', 'light');
        button.textContent = 'Dark';  // Offer user the chance to go to Dark
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Initialize toggles
  setupThemeToggle(themeToggleDesktop);
  setupThemeToggle(themeToggleMobile);


  /* ==================================================================
     3) Right-Side Main Menu: Open/Close
     ================================================================== */
  const menuOpenBtn = document.getElementById('menu-open');
  const menuCloseBtn = document.getElementById('menu-close');
  const rightSideMenu = document.getElementById('rightSideMenu');

  if (menuOpenBtn && menuCloseBtn && rightSideMenu) {
    menuOpenBtn.addEventListener('click', () => {
      rightSideMenu.classList.add('open');
    });
    menuCloseBtn.addEventListener('click', () => {
      rightSideMenu.classList.remove('open');
      if (servicesSubMenu) {
        servicesSubMenu.classList.remove('open');
      }
    });
  }

  /* ==================================================================
     4) Services Sub-Menu: Slide Up
     ================================================================== */
  const servicesTrigger = document.querySelector('.services-trigger button');
  const servicesSubMenu = document.getElementById('servicesSubMenu');

  if (servicesTrigger && servicesSubMenu) {
    servicesTrigger.addEventListener('click', (e) => {
      e.stopPropagation(); 
      servicesSubMenu.classList.toggle('open');
    });

    document.addEventListener('click', (evt) => {
      const clickInsideTrigger = servicesTrigger.contains(evt.target);
      const clickInsideSubMenu = servicesSubMenu.contains(evt.target);
      if (!clickInsideTrigger && !clickInsideSubMenu) {
        servicesSubMenu.classList.remove('open');
      }
    });
  }


  /* ==================================================================
     5) Modals (Join Us & Contact Us)
     ================================================================== */
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const floatingIcons = document.querySelectorAll('.floating-icon');
  const closeModalButtons = document.querySelectorAll('[data-close]');

  // Open modal on floating icon click
  floatingIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const modalId = icon.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
      }
    });
  });

  // Close modal via close button
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
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
    overlay.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        overlay.classList.remove('active');
      }
    });
  });


  /* ==================================================================
     6) Form Submissions: Alert + Reset
     ================================================================== */
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for joining us! We have received your details.');
      joinForm.reset();
      document.getElementById('join-modal').classList.remove('active');
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for contacting us! We will get back to you soon.');
      contactForm.reset();
      document.getElementById('contact-modal').classList.remove('active');
    });
  }

});
