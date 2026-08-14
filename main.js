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
   * Always start a fresh load/refresh at the top of the page. Without this,
   * the browser restores whatever scroll position the tab had before the
   * refresh — which, on mobile, can be deep down the page (or on
   * Réservation) if the auto-scroll had moved it there beforehand.
   */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

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
      preloader.classList.add('preloader-fade');
      setTimeout(() => preloader.remove(), 600);
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
   * Animate the skills items on reveal: staggered bar fill + counting percentage
   */
  function animateSkillValue(el, target) {
    if (!el) return;
    const duration = 900;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(progress * target) + '%';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    const waypoint = new Waypoint({
      element: item,
      offset: '80%',
      handler: function() {
        let bars = item.querySelectorAll('.progress');
        bars.forEach((bar, index) => {
          setTimeout(() => {
            const progressBar = bar.querySelector('.progress-bar');
            const valEl = bar.querySelector('.val');
            const target = parseInt(progressBar.getAttribute('aria-valuenow'), 10);
            progressBar.style.width = target + '%';
            animateSkillValue(valEl, target);
          }, index * 150);
        });
        waypoint.destroy();
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

    function moveFilterIndicator(activeLi) {
      const indicator = isotopeItem.querySelector('.filter-indicator');
      if (!indicator || !activeLi) return;
      indicator.style.left = activeLi.offsetLeft + 'px';
      indicator.style.top = activeLi.offsetTop + 'px';
      indicator.style.width = activeLi.offsetWidth + 'px';
      indicator.style.height = activeLi.offsetHeight + 'px';
      indicator.classList.add('is-positioned');
    }

    window.addEventListener('load', function() {
      moveFilterIndicator(isotopeItem.querySelector('.isotope-filters .filter-active'));
    });

    window.addEventListener('resize', function() {
      moveFilterIndicator(isotopeItem.querySelector('.isotope-filters .filter-active'));
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        moveFilterIndicator(this);
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
    if (!window.location.hash) return;
    try {
      let section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    } catch (e) {
      // Invalid/unsafe selector in the URL hash — ignore silently.
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

  /**
   * Subtle hero parallax on scroll (disabled for users who prefer reduced motion)
   */
  const heroSection = document.querySelector('.hero');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (heroSection && !prefersReducedMotion) {
    const heroExtend = heroSection.querySelector('.hero-bg-extend');
    const heroLogo = heroSection.querySelector('.hero-bg-logo');
    let ticking = false;

    function applyHeroParallax() {
      const heroHeight = heroSection.offsetHeight;
      const scrollY = window.scrollY;

      if (scrollY < heroHeight) {
        if (heroExtend) heroExtend.style.transform = `scale(1.15) translateY(${scrollY * 0.15}px)`;
        if (heroLogo) heroLogo.style.transform = `scale(1.2) translateY(${scrollY * 0.25}px)`;
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(applyHeroParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Subtle 3D tilt on the About portrait (desktop pointer only)
   */
  const portraitWrap = document.querySelector('.about-portrait-wrap');
  const canHover = window.matchMedia('(pointer: fine)').matches;

  if (portraitWrap && canHover && !prefersReducedMotion) {
    const portraitImg = portraitWrap.querySelector('.about-portrait-img');

    portraitWrap.addEventListener('mousemove', (e) => {
      const rect = portraitWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      portraitImg.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    });

    portraitWrap.addEventListener('mouseleave', () => {
      portraitImg.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
  }

  /**
   * Services: animated tap hint (mobile only, driven by CSS media query).
   * The hint animates only while the section is on screen, and stops for
   * good once the visitor has opened a first panel.
   */
  const servicesSection = document.querySelector('.services');

  if (servicesSection) {
    if ('IntersectionObserver' in window) {
      const servicesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          servicesSection.classList.toggle('hint-visible', entry.isIntersecting);
        });
      }, { threshold: 0.15 });
      servicesObserver.observe(servicesSection);
    } else {
      servicesSection.classList.add('hint-visible');
    }

    servicesSection.querySelectorAll('.service-panel').forEach(panel => {
      panel.addEventListener('show.bs.collapse', () => {
        servicesSection.classList.add('hints-dismissed');
      }, { once: true });
    });
  }

  /**
   * Reservation date + time-range fields: block past dates and Sundays,
   * and prevent choosing a time interval that overlaps a slot already
   * blocked manually from the admin dashboard (other slots on the same
   * date remain available).
   */
  const reservationDateField = document.querySelector('#reservation-date-field');
  const reservationStartField = document.querySelector('#reservation-time-start-field');
  const reservationEndField = document.querySelector('#reservation-time-end-field');
  const reservationSubmitBtn = document.querySelector('.reservation .php-email-form button[type=submit]');

  if (reservationDateField && reservationStartField && reservationEndField) {
    const today = new Date();
    const minDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
    reservationDateField.min = minDate;

    const dateNote = reservationDateField.parentElement.querySelector('.field-note');
    const timeNote = document.querySelector('#reservation-time-note');
    const defaultTimeNoteText = timeNote ? timeNote.textContent : '';
    let blockedByDate = {};

    fetch('available-dates.php')
      .then(response => response.ok ? response.json() : {})
      .then(data => {
        if (data && typeof data === 'object') {
          blockedByDate = data;
        }
        validateSlot();
      })
      .catch(() => {});

    function setNote(el, text, isError) {
      if (!el) return;
      el.textContent = text;
      el.classList.toggle('field-note-error', !!isError);
    }

    function slotsOverlap(startA, endA, startB, endB) {
      return startA < endB && startB < endA;
    }

    function validateSlot() {
      const date = reservationDateField.value;
      const start = reservationStartField.value;
      const end = reservationEndField.value;

      setNote(timeNote, defaultTimeNoteText, false);

      if (!date || !start || !end) {
        if (reservationSubmitBtn) reservationSubmitBtn.disabled = false;
        return;
      }

      if (end <= start) {
        setNote(timeNote, "L'heure de fin doit être après l'heure de début.", true);
        if (reservationSubmitBtn) reservationSubmitBtn.disabled = true;
        return;
      }

      const blockedSlots = blockedByDate[date] || [];
      const conflict = blockedSlots.some(slot => slotsOverlap(start, end, slot.start, slot.end));

      if (conflict) {
        setNote(timeNote, 'Ce créneau est déjà pris sur cette date, merci d\'en choisir un autre.', true);
        if (reservationSubmitBtn) reservationSubmitBtn.disabled = true;
        return;
      }

      if (reservationSubmitBtn) reservationSubmitBtn.disabled = false;
    }

    reservationDateField.addEventListener('change', function() {
      if (!this.value) return;
      const selectedDate = new Date(this.value + 'T00:00:00');

      if (selectedDate.getDay() === 0) {
        this.value = '';
        setNote(dateNote, 'Fermé le dimanche, merci de choisir un autre jour.', true);
        validateSlot();
        return;
      }

      setNote(dateNote, 'Fermé le dimanche', false);
      validateSlot();
    });

    reservationStartField.addEventListener('change', validateSlot);
    reservationEndField.addEventListener('change', validateSlot);
  }

  /**
   * Mobile-only viewport check, shared by the background music and the
   * auto-scroll features below (same breakpoint as the rest of the site's
   * mobile-only motion design).
   */
  const isMobileViewport = window.matchMedia('(max-width: 991.98px)').matches;

  /**
   * Background music (mobile only): loops "Nuvole Bianche" and shows a
   * fixed bottom-right "now playing" toggle. Most mobile browsers block
   * autoplay with sound until a real user gesture, so if the initial
   * play() is rejected, playback starts on the visitor's first touch/click.
   */
  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');

  let attemptPlayMusic = () => {};

  if (bgMusic && musicToggle && isMobileViewport) {
    const setMusicState = (isPlaying) => {
      musicToggle.classList.toggle('is-playing', isPlaying);
      musicToggle.setAttribute('aria-pressed', String(isPlaying));
      musicToggle.setAttribute('aria-label', isPlaying ? 'Couper la musique de fond' : 'Activer la musique de fond');
    };

    attemptPlayMusic = () => {
      bgMusic.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
    };

    if (prefersReducedMotion) attemptPlayMusic();

    const resumeOnFirstGesture = () => attemptPlayMusic();
    document.addEventListener('touchstart', resumeOnFirstGesture, { once: true, passive: true });
    document.addEventListener('click', resumeOnFirstGesture, { once: true });

    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        attemptPlayMusic();
      } else {
        bgMusic.pause();
      }
    });

    bgMusic.addEventListener('play', () => setMusicState(true));
    bgMusic.addEventListener('pause', () => setMusicState(false));
  }

  /**
   * Mobile-only auto-scroll: after 5s without any interaction, gently
   * scrolls the page from top to bottom so visitors can read without having
   * to touch the screen, and starts the background music the first time it
   * kicks in. Any interaction (touch, mouse movement, wheel, click) pauses
   * it immediately and re-arms the 5s idle timer, so it resumes on its own
   * once the visitor stops interacting again. Whenever the page bottom is
   * reached — whether by the auto-scroll or by the visitor scrolling
   * manually — it waits 2s then moves to Réservation.
   */
  if (isMobileViewport && !prefersReducedMotion) {
    const AUTO_SCROLL_SPEED = 65; // pixels per second
    const BOTTOM_THRESHOLD = 4; // px tolerance to count as "at the bottom"
    const IDLE_DELAY = 5000; // ms of inactivity before auto-scroll (re)starts

    let rafId = null;
    let lastTimestamp = null;
    let idleTimerId = null;
    let musicStarted = false;
    let reservationRedirectPending = false;
    let reservationRedirectHandled = false;
    let reservationTimeoutId = null;

    const atPageBottom = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      return scrollable <= 0 || window.scrollY >= scrollable - BOTTOM_THRESHOLD;
    };

    const pauseAutoScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      lastTimestamp = null;
    };

    const autoScrollStep = (timestamp) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const elapsedSeconds = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (atPageBottom()) {
        pauseAutoScroll();
        return;
      }

      window.scrollBy(0, AUTO_SCROLL_SPEED * elapsedSeconds);
      rafId = requestAnimationFrame(autoScrollStep);
    };

    const startAutoScroll = () => {
      if (rafId || atPageBottom()) return;
      if (!musicStarted) {
        musicStarted = true;
        attemptPlayMusic();
      }
      rafId = requestAnimationFrame(autoScrollStep);
    };

    const scheduleAutoScroll = () => {
      clearTimeout(idleTimerId);
      idleTimerId = setTimeout(startAutoScroll, IDLE_DELAY);
    };

    const handleActivity = () => {
      pauseAutoScroll();
      scheduleAutoScroll();
    };

    ['touchstart', 'touchmove', 'mousedown', 'mousemove', 'wheel', 'click'].forEach((eventName) => {
      document.addEventListener(eventName, handleActivity, { passive: true });
    });

    scheduleAutoScroll();

    const goToReservation = () => {
      const reservationSection = document.getElementById('reservation');
      if (!reservationSection) return;
      const scrollMarginTop = getComputedStyle(reservationSection).scrollMarginTop;
      window.scrollTo({
        top: reservationSection.offsetTop - parseInt(scrollMarginTop),
        behavior: 'smooth'
      });
    };

    window.addEventListener('scroll', () => {
      if (reservationRedirectHandled) return;

      if (atPageBottom()) {
        if (!reservationRedirectPending) {
          reservationRedirectPending = true;
          reservationTimeoutId = setTimeout(() => {
            reservationRedirectHandled = true;
            goToReservation();
          }, 2000);
        }
      } else if (reservationRedirectPending) {
        reservationRedirectPending = false;
        clearTimeout(reservationTimeoutId);
      }
    }, { passive: true });
  }

})();