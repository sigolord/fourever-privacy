/* Automatic German language detection & smart redirect */
(function() {
  try {
    var savedPref = localStorage.getItem('fourever_lang_pref');
    var sysLang = (navigator.language || (navigator.languages && navigator.languages[0]) || '').toLowerCase();
    var isGermanSys = sysLang.indexOf('de') === 0;

    // Target language: saved preference has top priority; fallback to system language
    var targetLang = savedPref ? savedPref : (isGermanSys ? 'de' : 'en');

    var path = window.location.pathname;
    var isGermanPage = path.indexOf('/de/') !== -1 || path.endsWith('/de');

    if (targetLang === 'de' && !isGermanPage) {
      var dePath;
      if (path.indexOf('/privacy-policy/ios/') !== -1) {
        dePath = path.replace('/privacy-policy/ios/', '/de/privacy-policy/ios/');
      } else if (path.indexOf('/privacy-policy/android/') !== -1) {
        dePath = path.replace('/privacy-policy/android/', '/de/privacy-policy/android/');
      } else if (path.indexOf('/privacy-policy/') !== -1) {
        dePath = path.replace('/privacy-policy/', '/de/privacy-policy/');
      } else if (path.indexOf('/support/') !== -1) {
        dePath = path.replace('/support/', '/de/support/');
      } else if (path.indexOf('/roadmap/') !== -1) {
        dePath = path.replace('/roadmap/', '/de/roadmap/');
      } else {
        if (path.endsWith('index.html')) {
          dePath = path.replace('index.html', 'de/index.html');
        } else {
          dePath = path.endsWith('/') ? path + 'de/' : path + '/de/';
        }
      }
      window.location.replace(dePath + window.location.search + window.location.hash);
    } else if (targetLang === 'en' && isGermanPage && savedPref === 'en') {
      var enPath = path.replace('/de/', '/');
      if (enPath !== path) {
        window.location.replace(enPath + window.location.search + window.location.hash);
      }
    }
  } catch (e) {}
})();
