/**
 * main.js — Interações Gerais da Landing Page
 * Michelle Milan Eventos
 * -------------------------------------------------------
 * Funcionalidades:
 * 1. Header: scroll spy (classe .scrolled + glassmorphism)
 * 2. Menu Mobile: toggle do drawer + backdrop
 * 3. Nav Links: destaque do item ativo conforme seção visível
 * 4. Scroll Suave: smooth scroll nos links âncora
 * 5. Reveal on Scroll: animação de entrada das seções
 * 6. Footer: ano atual dinâmico
 */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────────────────
     UTILITÁRIOS
  ──────────────────────────────────────────────────────────── */

  /**
   * Seleciona um elemento pelo seletor.
   * @param {string} selector
   * @param {Element} [parent=document]
   * @returns {Element|null}
   */
  function $(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  /**
   * Seleciona múltiplos elementos.
   * @param {string} selector
   * @param {Element} [parent=document]
   * @returns {NodeList}
   */
  function $$(selector, parent) {
    return (parent || document).querySelectorAll(selector);
  }

  /* ────────────────────────────────────────────────────────────
     1. HEADER — SCROLL SPY (GLASSMORPHISM)
  ──────────────────────────────────────────────────────────── */
  var header = $('#site-header');

  if (header) {
    var scrollThreshold = 60; // px para ativar o header sólido

    function handleHeaderScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Checa estado inicial (útil em reload com scroll salvo)
    handleHeaderScroll();

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  }

  /* ────────────────────────────────────────────────────────────
     2. MENU MOBILE — DRAWER TOGGLE
  ──────────────────────────────────────────────────────────── */
  var hamburger   = $('#nav-hamburger');
  var navMenu     = $('#nav-menu');
  var navBackdrop = $('#nav-backdrop');

  var menuIsOpen = false;

  function openMobileMenu() {
    menuIsOpen = true;
    navMenu.classList.add('is-open');
    navBackdrop.classList.add('is-visible');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fechar menu de navegação');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    menuIsOpen = false;
    navMenu.classList.remove('is-open');
    navBackdrop.classList.remove('is-visible');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.style.overflow = '';
  }

  if (hamburger && navMenu && navBackdrop) {

    // Toggle ao clicar no hamburger
    hamburger.addEventListener('click', function () {
      menuIsOpen ? closeMobileMenu() : openMobileMenu();
    });

    // Fecha ao clicar no backdrop
    navBackdrop.addEventListener('click', closeMobileMenu);

    // Fecha ao clicar em qualquer link do menu
    var navLinks = $$('.nav-link, .nav-cta', navMenu);
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // Fecha ao pressionar Escape
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && menuIsOpen) {
        closeMobileMenu();
        hamburger.focus();
      }
    });

    // Fecha ao redimensionar para desktop
    var mql = window.matchMedia('(min-width: 1024px)');
    mql.addEventListener('change', function (e) {
      if (e.matches && menuIsOpen) {
        closeMobileMenu();
      }
    });
  }

  /* ────────────────────────────────────────────────────────────
     3. NAV LINKS — DESTAQUE ATIVO (INTERSECTION OBSERVER)
  ──────────────────────────────────────────────────────────── */
  var allNavLinks = $$('.nav-link');

  // Mapeia seções rastreadas
  var sections = ['sobre', 'servicos', 'portfolio', 'faq'].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  if (sections.length && allNavLinks.length) {

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var id = entry.target.id;

        // Remove .active de todos
        allNavLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        // Adiciona .active no link correspondente
        var activeLink = $('[href="#' + id + '"]');
        if (activeLink && activeLink.classList.contains('nav-link')) {
          activeLink.classList.add('active');
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px', // Ativa quando a seção está no terço central da tela
      threshold: 0,
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ────────────────────────────────────────────────────────────
     4. SCROLL SUAVE — ÂNCORAS INTERNAS
  ──────────────────────────────────────────────────────────── */
  var anchorLinks = $$('a[href^="#"]');
  var headerHeight = header ? header.offsetHeight : 80;

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId  = link.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Recalcula altura do header (pode variar com scrolled)
      var currentHeaderHeight = header ? header.offsetHeight : 80;
      var offset = targetEl.getBoundingClientRect().top + window.scrollY - currentHeaderHeight - 16;

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    });
  });

  /* ────────────────────────────────────────────────────────────
     5. REVEAL ON SCROLL — ANIMAÇÃO DE ENTRADA
  ──────────────────────────────────────────────────────────── */

  // Adiciona a classe .reveal nos elementos desejados
  var revealTargets = [
    '.section-about .about-image-wrapper',
    '.section-about .about-content',
    '.service-card',
    '.coverage-card',
    '.gallery-item',
    '.faq-item',
    '.section-header',
    '.services-cta',
    '.faq-cta',
    '.footer-brand',
    '.footer-nav',
    '.footer-contact',
  ];

  var revealElements = [];

  revealTargets.forEach(function (selector) {
    var els = $$(selector);
    els.forEach(function (el, i) {
      el.classList.add('reveal');

      // Delay escalonado para grupos (cards, gallery items)
      var delay = Math.min(i * 0.08, 0.40); // máx 400ms de delay
      el.style.transitionDelay = delay + 's';

      revealElements.push(el);
    });
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // Observa apenas uma vez
        }
      });
    }, {
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.08,
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback para browsers sem suporte: exibe tudo
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ────────────────────────────────────────────────────────────
     6. FOOTER — ANO ATUAL DINÂMICO
  ──────────────────────────────────────────────────────────── */
  var yearSpan = $('#footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ────────────────────────────────────────────────────────────
     7. PERFORMANCE — Lazy loading nativo como fallback
  ──────────────────────────────────────────────────────────── */
  // Já usamos loading="lazy" no HTML; este bloco adiciona
  // suporte para browsers que não implementam nativamente.
  if (!('loading' in HTMLImageElement.prototype)) {
    var lazyImages = $$('img[loading="lazy"]');
    var lazyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          lazyObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function (img) {
      lazyObserver.observe(img);
    });
  }

})();
