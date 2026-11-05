'use strict';

// Reveal the address only after a deliberate visitor interaction.
(() => {
  const button = document.getElementById('email-reveal');
  const output = document.getElementById('email-address');
  if (!button || !output) return;
  button.hidden = false;
  button.addEventListener('click', () => {
    const address = String.fromCharCode(...[99,111,110,116,97,99,116,64,115,97,109,105,116,116,97,110,100,117,107,97,114,46,99,111,109]);
    const link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = address + ' ↗';
    link.className = 'email-link';
    output.replaceChildren(link);
    button.hidden = true;
    link.focus();
  }, { once: true });
})();
