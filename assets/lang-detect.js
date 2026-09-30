/* Legacy /uk/ to /ua/ path forwarding & cleanup */
(function() {
  try {
    localStorage.removeItem('fourever_lang_pref');
    var path = window.location.pathname;
    if (path.indexOf('/uk/') !== -1 || path.endsWith('/uk')) {
      var fixedPath = path.replace(/\/uk(\/|$)/, '/ua$1');
      window.location.replace(fixedPath + window.location.search + window.location.hash);
    }
  } catch (e) {}
})();
