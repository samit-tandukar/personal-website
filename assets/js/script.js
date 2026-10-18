'use strict';
(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  const modes = ['system', 'light', 'dark'];
  let mode = 'system';
  try {
    const stored = localStorage.getItem('theme');
    if (modes.includes(stored)) mode = stored;
  } catch (_) { /* System theme still works when storage is unavailable. */ }
  function apply() {
    if (mode === 'system') root.removeAttribute('data-theme');
    else root.dataset.theme = mode;
    button.textContent = `Theme: ${mode[0].toUpperCase()}${mode.slice(1)}`;
    button.setAttribute('aria-label', `Colour theme: ${mode}. Change to ${modes[(modes.indexOf(mode) + 1) % modes.length]}.`);
    const dark = mode === 'dark' || (mode === 'system' && preference.matches);
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => {
      meta.content = dark ? '#0b0c0f' : '#f5f5f7';
    });
  }
  button.addEventListener('click', () => {
    mode = modes[(modes.indexOf(mode) + 1) % modes.length];
    try { localStorage.setItem('theme', mode); } catch (_) {}
    apply();
  });
  preference.addEventListener('change', apply);
  apply();
})();
