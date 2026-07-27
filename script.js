(function () {
  'use strict';

  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (calm) return; /* leave the page in its plain, fully-visible state */

  /* Cards only start hidden once we know JS is running to bring them back,
     so the page still reads fine with scripting off. */
  document.documentElement.classList.add('js');

  /* ---- drifting hearts ---- */

  var layer = document.querySelector('.hearts');
  if (layer) {
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

  /* ---- fade cards in as they scroll into view ----
     Plain rect math rather than IntersectionObserver: the observer can fail
     to deliver a first callback in some situations, and a card that never
     gets `shown` is a card nobody ever reads. A timer backstop guarantees
     everything is visible regardless. */

  var cards = [].slice.call(document.querySelectorAll('.reveal'));

  function showAll() {
    cards.forEach(function (card) { card.classList.add('shown'); });
    cards.length = 0;
  }

  function sweep() {
    var fold = window.innerHeight || document.documentElement.clientHeight;

    /* No viewport yet (page opened in a background tab, say) means every
       rect measures as off-screen. Don't hide the page waiting for one. */
    if (!fold) { showAll(); return; }

    cards = cards.filter(function (card) {
      var box = card.getBoundingClientRect();
      if (box.top < fold * 0.92 && box.bottom > 0) {
        card.classList.add('shown');
        return false;
      }
      return true;
    });

    if (!cards.length) {
      window.removeEventListener('scroll', sweep);
      window.removeEventListener('resize', sweep);
      window.removeEventListener('pageshow', sweep);
      window.removeEventListener('load', sweep);
      document.removeEventListener('visibilitychange', sweep);
    }
  }

  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep);
  /* a tab opened in the background gets its real viewport only once shown,
     and its timers stay frozen until then */
  document.addEventListener('visibilitychange', sweep);
  window.addEventListener('pageshow', sweep);
  window.addEventListener('load', sweep);

  sweep();
  /* if anything above went sideways, show the content anyway */
  setTimeout(sweep, 400);
  setTimeout(showAll, 2500);
})();
