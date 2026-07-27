(function () {
  'use strict';

  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (calm) return; /* leave the page in its plain, still state */

  /* ---- drifting hearts ---- */

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
})();
