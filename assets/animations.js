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
})();
