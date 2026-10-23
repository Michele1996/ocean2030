// Main JS behaviors for Marine Robotics IROS 2026

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // 1. Sticky / Scrolled Header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Check initial scroll in case page is loaded scrolled down
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  }

  // 2. Mobile Nav Toggle
  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== navToggle) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });

  // 3. Highlight Active Link & Scroll Spy
  const currentPath = window.location.pathname;
  const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const navItems = document.querySelectorAll('.nav-links a');

  // Close mobile nav when clicking a link
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navToggle) navToggle.classList.remove('active');
      if (navLinks) navLinks.classList.remove('active');
    });
  });

  if (currentFile === 'venue.html') {
    navItems.forEach(item => {
      if (item.getAttribute('href') === 'venue.html') {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  } else {
    // Scroll Spy for index.html / homepage sections
    const sections = document.querySelectorAll('main section[id]');
    
    const scrollSpy = () => {
      let currentSectionId = '';
      const scrollPosition = window.scrollY + 150; // offset for header

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (window.scrollY < 100) {
        currentSectionId = 'overview';
      }

      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        currentSectionId = 'authors';
      }

      navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === `#${currentSectionId}`) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Run initially
  }
});
