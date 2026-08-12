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

  // Home page hero photo: zoom-settle on load, then a slow continued zoom
  // while it's pinned (see the sticky/z-index rules in styles.css) and
  // .hero-intro rises to cover it. Pure scale on an object-fit: cover
  // image can never expose a gap -- scaling up only crops more -- so
  // unlike a pan effect this needs no slack/clamp math at all.
  var hero = document.querySelector('.hero');
  var heroImg = hero ? hero.querySelector('img') : null;
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var REST_SCALE = 1.06;
    var START_SCALE = 1.12;
    var MAX_SCROLL_SCALE = 1.18;
    var ENTRANCE_MS = 1000;
    var entranceDone = false;
    var loadStart = performance.now();

    function applyScrollScale() {
      var h = hero.getBoundingClientRect().height;
      var progress = Math.max(0, Math.min(1, window.scrollY / h));
      var scale = REST_SCALE + (MAX_SCROLL_SCALE - REST_SCALE) * progress;
      heroImg.style.transform = 'scale(' + scale.toFixed(4) + ')';
    }

    function entranceFrame(now) {
      var t = Math.min(1, (now - loadStart) / ENTRANCE_MS);
      var eased = 1 - Math.pow(1 - t, 3);
      heroImg.style.transform = 'scale(' + (START_SCALE + (REST_SCALE - START_SCALE) * eased).toFixed(4) + ')';
      if (t < 1) {
        window.requestAnimationFrame(entranceFrame);
      } else {
        entranceDone = true;
        applyScrollScale();
      }
    }
    window.requestAnimationFrame(entranceFrame);

    var scaleTicking = false;
    window.addEventListener('scroll', function () {
      if (!entranceDone || scaleTicking) return;
      scaleTicking = true;
      window.requestAnimationFrame(function () {
        applyScrollScale();
        scaleTicking = false;
      });
    }, { passive: true });
  }
})();
