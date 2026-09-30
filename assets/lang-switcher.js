/* Language switcher: toggle on click for mobile and desktop */
(function() {
  function setupLangSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
      if (btn.dataset.langInit) return;
      btn.dataset.langInit = 'true';

      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        var switcher = btn.closest('.lang-switcher');
        if (!switcher) return;

        var isOpen = switcher.classList.contains('open');

        // Close all switchers
        document.querySelectorAll('.lang-switcher.open').forEach(function(el) {
          el.classList.remove('open');
        });

        if (!isOpen) {
          switcher.classList.add('open');
        } else {
          btn.blur();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLangSwitcher);
  } else {
    setupLangSwitcher();
  }

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.lang-switcher')) {
      document.querySelectorAll('.lang-switcher.open').forEach(function(el) {
        el.classList.remove('open');
      });
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.lang-switcher.open').forEach(function(el) {
        el.classList.remove('open');
      });
    }
  });
})();
