// Scroll-reveal and light interactive polish. Purely additive: content is
// already visible in the HTML/CSS without this file. See the js-reveal
// gate in styles.css -- if this script fails to load or run, nothing
// stays hidden.

(function () {
  var targets = document.querySelectorAll('.reveal, .reveal-group, .doc-list, .steps');

  function revealAll() {
    targets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  if (!('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });

    // Safety net: never leave content hidden if something above misfires.
    window.setTimeout(revealAll, 3000);
  }

  // Sticky header gains a little depth once you've scrolled.
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Home page hero photo: zoom-settle on load, then a slow parallax drift
  // as you scroll past it. The image is held permanently oversized so
  // there's slack to pan within -- offset is clamped to that slack
  // (recomputed from the live element size) so it can never show a gap.
  // PARALLAX_RATE is tied to REST_SCALE so the pan reaches its full travel
  // right around one hero-height of scrolling, instead of maxing out (and
  // then sitting frozen) in the first ~100px like an untuned rate would.
  var hero = document.querySelector('.hero');
  var heroImg = hero ? hero.querySelector('img') : null;
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var REST_SCALE = 1.15;
    var START_SCALE = 1.21;
    var PARALLAX_RATE = (REST_SCALE - 1) / 2;
    var ENTRANCE_MS = 1200;
    var entranceDone = false;
    var loadStart = performance.now();

    function slack() {
      var h = hero.getBoundingClientRect().height;
      return (h * REST_SCALE - h) / 2;
    }

    function applyTransform(scale) {
      var offset = Math.max(-slack(), Math.min(slack(), window.scrollY * PARALLAX_RATE));
      heroImg.style.transform = 'translateY(' + offset.toFixed(1) + 'px) scale(' + scale.toFixed(4) + ')';
    }

    function entranceFrame(now) {
      var t = Math.min(1, (now - loadStart) / ENTRANCE_MS);
      var eased = 1 - Math.pow(1 - t, 3);
      applyTransform(START_SCALE + (REST_SCALE - START_SCALE) * eased);
      if (t < 1) {
        window.requestAnimationFrame(entranceFrame);
      } else {
        entranceDone = true;
      }
    }
    window.requestAnimationFrame(entranceFrame);

    var parallaxTicking = false;
    window.addEventListener('scroll', function () {
      if (!entranceDone || parallaxTicking) return;
      parallaxTicking = true;
      window.requestAnimationFrame(function () {
        applyTransform(REST_SCALE);
        parallaxTicking = false;
      });
    }, { passive: true });
  }
})();
