// Applies the saved theme before first paint, to avoid a flash. Kept as its own file so the
// Content-Security-Policy can forbid inline scripts.
try {
  var s = JSON.parse(localStorage.getItem('pujo-by-metro') || '{}');
  document.documentElement.dataset.theme = s.state && s.state.theme === 'dark' ? 'dark' : 'light';
} catch (e) {}
