/* Automatic language detection & smart redirect */
(function() {
  try {
    var savedPref = localStorage.getItem('fourever_lang_pref');
    // Migrate legacy 'uk' preference to 'ua'
    if (savedPref === 'uk') {
      savedPref = 'ua';
      try { localStorage.setItem('fourever_lang_pref', 'ua'); } catch (e) {}
    }

    var sysLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    var isGermanSys = sysLang.indexOf('de') === 0;
    var isUkrainianSys = sysLang.indexOf('uk') === 0 || sysLang.indexOf('ua') === 0;

    // Target language: saved preference has top priority; fallback to system language
    var targetLang = savedPref ? savedPref : (isGermanSys ? 'de' : (isUkrainianSys ? 'ua' : 'en'));
    if (targetLang === 'uk') {
      targetLang = 'ua';
    }

    var path = window.location.pathname;
    var isGermanPage = path.indexOf('/de/') !== -1 || path.endsWith('/de');
    var isUkrainianPage = path.indexOf('/ua/') !== -1 || path.endsWith('/ua');
    var isLegacyUkPage = path.indexOf('/uk/') !== -1 || path.endsWith('/uk');
    var isLocalizedPage = isGermanPage || isUkrainianPage;

    // Immediate forward for any legacy /uk/ page
    if (isLegacyUkPage) {
      var fixedPath = path.replace(/\/uk(\/|$)/, '/ua$1');
      window.location.replace(fixedPath + window.location.search + window.location.hash);
      return;
    }

    function buildLocalizedPath(lang) {
      if (path.indexOf('/privacy-policy/ios/') !== -1) {
        return path.replace('/privacy-policy/ios/', '/' + lang + '/privacy-policy/ios/');
      } else if (path.indexOf('/privacy-policy/android/') !== -1) {
        return path.replace('/privacy-policy/android/', '/' + lang + '/privacy-policy/android/');
      } else if (path.indexOf('/privacy-policy/') !== -1) {
        return path.replace('/privacy-policy/', '/' + lang + '/privacy-policy/');
      } else if (path.indexOf('/support/') !== -1) {
        return path.replace('/support/', '/' + lang + '/support/');
      } else if (path.indexOf('/roadmap/') !== -1) {
        return path.replace('/roadmap/', '/' + lang + '/roadmap/');
      } else if (path.indexOf('/accessibility/ios/') !== -1) {
        return path.replace('/accessibility/ios/', '/' + lang + '/accessibility/ios/');
      } else {
        if (path.endsWith('index.html')) {
          return path.replace('index.html', lang + '/index.html');
        } else {
          return path.endsWith('/') ? path + lang + '/' : path + '/' + lang + '/';
        }
      }
    }

    if ((targetLang === 'de' || targetLang === 'ua') && !isLocalizedPage) {
      var newPath = buildLocalizedPath(targetLang);
      window.location.replace(newPath + window.location.search + window.location.hash);
    } else if (targetLang === 'en' && isLocalizedPage && savedPref === 'en') {
      var enPath = path.replace('/de/', '/').replace('/ua/', '/');
      if (enPath !== path) {
        window.location.replace(enPath + window.location.search + window.location.hash);
      }
    } else if (targetLang === 'de' && isUkrainianPage) {
      var dePath = path.replace('/ua/', '/de/');
      if (dePath !== path) {
        window.location.replace(dePath + window.location.search + window.location.hash);
      }
    } else if (targetLang === 'ua' && isGermanPage) {
      var ukPath = path.replace('/de/', '/ua/');
      if (ukPath !== path) {
        window.location.replace(ukPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {}
})();
