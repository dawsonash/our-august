(function () {
  'use strict';

  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Cards start hidden only once we know JS is running to reveal them again,
     so the page still reads fine with scripting off. */
  if (!calm) document.documentElement.classList.add('js');

  /* ---- drifting hearts ---- */

  function sowHearts() {
    var layer = document.querySelector('.hearts');
    if (!layer) return;

    for (var i = 0; i < 14; i++) {
      var heart = document.createElement('span');
      heart.textContent = '♡';
      heart.style.left = (Math.random() * 100).toFixed(2) + '%';
      heart.style.fontSize = (0.7 + Math.random() * 1.1).toFixed(2) + 'rem';
      heart.style.animationDuration = (16 + Math.random() * 18).toFixed(1) + 's';
      heart.style.animationDelay = (Math.random() * -30).toFixed(1) + 's';
      layer.appendChild(heart);
    }
  }

  /* ---- fade cards in as they scroll into view ---- */

  function revealOnScroll() {
    var cards = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < cards.length; i++) cards[i].classList.add('shown');
      return;
    }

    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('shown');
        watcher.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    cards.forEach(function (card) { watcher.observe(card); });
  }

  if (!calm) {
    sowHearts();
    revealOnScroll();
  }
})();
