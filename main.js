(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks  = document.querySelector('.nav-links');

  if (!navToggle || !navLinks) return;

  /* ── Hamburger toggle ── */
  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) clearDropdowns();
  });

  /* ── Close menu on outside click ── */
  document.addEventListener('click', function (e) {
    if (!e.target.closest('nav')) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      clearDropdowns();
    }
  });

  /* ── Close menu when a non-dropdown link is clicked ── */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      var parentLi = this.parentElement;
      if (window.innerWidth <= 960 && !parentLi.classList.contains('has-dropdown')) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        clearDropdowns();
      }
    });
  });

  /* ── Mobile sub-menu toggle ── */
  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        this.parentElement.classList.toggle('dd-open');
      }
    });
  });

  function clearDropdowns() {
    document.querySelectorAll('.has-dropdown.dd-open').forEach(function (li) {
      li.classList.remove('dd-open');
    });
  }
})();
