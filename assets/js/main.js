/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

document.addEventListener('DOMContentLoaded', function() {
  // Select the form and success message elements
  const form = document.querySelector('.php-email-form');
  const successMessage = document.getElementById('success-message');

  // Hide the success message initially
  successMessage.style.display = 'none';

  // Handle form submission
  form.addEventListener('submit', function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Show the success message
      successMessage.style.display = 'block';

      // Optionally, you can add logic here to actually submit the form using AJAX
      // or handle any other required behavior.
      // For example:
      // form.submit(); // Uncomment this line if you want to submit the form normally
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const imagesToPreload = [
    'assets/img/main-bg.png',
    'assets/img/main-bg-2.jpg',
    'assets/img/main-bg.png' // Ensure different URLs if images differ
  ];

  imagesToPreload.forEach(function(src) {
    const img = new Image();
    img.src = src;
  });
});


function toggleMode() {
  const switchInput = document.querySelector('.switch input');
  const currentMode = switchInput.classList.contains('mode-blue') ? 'blue' :
                      switchInput.classList.contains('mode-red') ? 'red' : 'green';

  switch (currentMode) {
    case 'green':
      switchInput.classList.remove('mode-green');
      switchInput.classList.add('mode-blue');
      document.documentElement.setAttribute('data-mode', 'blue');
      document.documentElement.style.setProperty('--accent-color', 'blue');
      document.documentElement.style.setProperty('--default-color', 'blue');
      document.documentElement.style.setProperty('--nav-color', 'blue');
      document.documentElement.style.setProperty('--nav-hover-color', 'blue');
      break;
    case 'blue':
      switchInput.classList.remove('mode-blue');
      switchInput.classList.add('mode-red');
      document.documentElement.setAttribute('data-mode', 'red');
      document.documentElement.style.setProperty('--accent-color', 'red');
      document.documentElement.style.setProperty('--default-color', 'red');
      document.documentElement.style.setProperty('--nav-color', 'red');
      document.documentElement.style.setProperty('--nav-hover-color', 'red');
      break;
    case 'red':
      switchInput.classList.remove('mode-red');
      switchInput.classList.add('mode-green');
      document.documentElement.setAttribute('data-mode', 'green');
      document.documentElement.style.setProperty('--accent-color', 'green');
      document.documentElement.style.setProperty('--default-color', 'green');
      document.documentElement.style.setProperty('--nav-color', 'green');
      document.documentElement.style.setProperty('--nav-hover-color', 'green');
      break;
  }
  updateHeroImage();
}

function updateHeroImage() {
  const mode = document.documentElement.getAttribute('data-mode');
  const heroImage = document.querySelector('#home img');
  switch (mode) {
    case 'blue':
      heroImage.src = heroImage.getAttribute('data-blue-src') + '?' + new Date().getTime();
      break;
    case 'red':
      heroImage.src = heroImage.getAttribute('data-red-src') + '?' + new Date().getTime();
      break;
    case 'green':
    default:
      heroImage.src = heroImage.getAttribute('data-green-src') + '?' + new Date().getTime();
      break;
  }
}












