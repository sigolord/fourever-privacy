/* Language switcher: toggle on click for mobile */
document.querySelectorAll('.lang-btn').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var switcher = btn.closest('.lang-switcher');
    switcher.classList.toggle('open');
  });
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.lang-switcher')) {
    document.querySelectorAll('.lang-switcher.open').forEach(function(el) { el.classList.remove('open'); });
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.lang-switcher.open').forEach(function(el) { el.classList.remove('open'); });
  }
});
