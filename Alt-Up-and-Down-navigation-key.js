// ==UserScript==
// @name        Alt Up and Down navigation key
// @namespace   Violentmonkey Scripts
// @match       https://*/*
// @match       http://*/*
// @grant       none
// @version     1.0
// @author      thomaslinux + GPT-4o mini
// @description Add the Alt Up and Down navigations key to all pages, tested
// ==/UserScript==

let navigationEnabled = (localStorage.getItem('navigationEnabled') === 'true');

document.addEventListener('keydown', function(e) {
  if (e.altKey) {
    if (e.key === 'ArrowUp' && navigationEnabled) {
      localStorage.setItem('previousPage', window.location.href);
      window.location.href = window.location.origin;
      navigationEnabled = false;
      localStorage.setItem('navigationEnabled', 'false');
      e.preventDefault();
    }
    else if (e.key === 'ArrowDown') {
      const previousPage = localStorage.getItem('previousPage');
      if (previousPage) {
        window.location.href = previousPage;
        navigationEnabled = true;
        localStorage.setItem('navigationEnabled', 'true');
      }
      e.preventDefault();
    }
  } else {
    navigationEnabled = true;
    localStorage.setItem('navigationEnabled', 'true');
  }
});
