/**
 * gallery.js — Lógica do Lightbox / Modal da Galeria
 * Michelle Milan Eventos
 * -------------------------------------------------------
 * Funcionalidades:
 * - Abre o modal ao clicar em qualquer imagem da galeria
 * - Navega entre imagens (anterior / próxima)
 * - Navega pelo teclado (←, →, Esc)
 * - Fecha ao clicar no backdrop
 * - Transição suave de fade entre imagens
 * - Contador dinâmico "X de Y"
 * - Bloqueia scroll do body quando o modal está aberto
 * - Swipe touch (mobile)
 */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────────────────────
     1. REFERÊNCIAS DO DOM
  ────────────────────────────────────────────────────────────── */
  const galleryGrid    = document.getElementById('gallery-grid');
  const modal          = document.getElementById('gallery-modal');
  const modalImage     = document.getElementById('modal-image');
  const modalCounter   = document.getElementById('modal-counter');
  const modalClose     = document.getElementById('modal-close');
  const modalPrev      = document.getElementById('modal-prev');
  const modalNext      = document.getElementById('modal-next');
  const modalBackdrop  = document.getElementById('modal-backdrop');

  if (!galleryGrid || !modal) return; // Aborta se a galeria não existir na página

  /* ──────────────────────────────────────────────────────────────
     2. COLETA DE DADOS DAS IMAGENS
  ────────────────────────────────────────────────────────────── */

  /** @type {{ src: string, alt: string }[]} */
  const images = [];

  const galleryButtons = galleryGrid.querySelectorAll('.gallery-item-btn');

  galleryButtons.forEach(function (btn, i) {
    const img = btn.querySelector('.gallery-img');
    if (!img) return;

    images.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || 'Foto do evento',
    });

    // Armazena o índice no botão para recuperar rapidamente
    btn.dataset.index = String(i);
  });

  /* ──────────────────────────────────────────────────────────────
     3. ESTADO DO MODAL
  ────────────────────────────────────────────────────────────── */
  let currentIndex = 0;
  let isOpen       = false;

  /* ──────────────────────────────────────────────────────────────
     4. FUNÇÕES PRINCIPAIS
  ────────────────────────────────────────────────────────────── */

  /**
   * Abre o modal e exibe a imagem do índice fornecido.
   * @param {number} index
   */
  function openModal(index) {
    if (images.length === 0) return;

    currentIndex = clamp(index, 0, images.length - 1);
    isOpen = true;

    // Atualiza imagem e counter sem animação de fade (primeira abertura)
    setImage(currentIndex, false);

    // Exibe o modal
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // Bloqueia scroll do body
    document.body.style.overflow = 'hidden';

    // Foco no botão de fechar para acessibilidade
    requestAnimationFrame(function () {
      modalClose.focus();
    });
  }

  /**
   * Fecha o modal.
   */
  function closeModal() {
    if (!isOpen) return;
    isOpen = false;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');

    // Restaura scroll
    document.body.style.overflow = '';

    // Devolve foco ao botão que abriu o modal
    const opener = galleryGrid.querySelector('[data-index="' + currentIndex + '"]');
    if (opener) opener.focus();
  }

  /**
   * Navega para o índice anterior.
   */
  function prevImage() {
    const nextIdx = (currentIndex - 1 + images.length) % images.length;
    setImage(nextIdx, true);
    currentIndex = nextIdx;
  }

  /**
   * Navega para o próximo índice.
   */
  function nextImage() {
    const nextIdx = (currentIndex + 1) % images.length;
    setImage(nextIdx, true);
    currentIndex = nextIdx;
  }

  /**
   * Atualiza a imagem exibida no modal.
   * @param {number} index
   * @param {boolean} withFade — aplica transição de fade
   */
  function setImage(index, withFade) {
    var data = images[index];
    if (!data) return;

    if (withFade) {
      // Fade out
      modalImage.classList.add('is-fading');

      setTimeout(function () {
        modalImage.src = data.src;
        modalImage.alt = data.alt;
        updateCounter(index);

        // Fade in
        modalImage.classList.remove('is-fading');
      }, 220);
    } else {
      modalImage.src = data.src;
      modalImage.alt = data.alt;
      updateCounter(index);
    }
  }

  /**
   * Atualiza o texto do contador.
   * @param {number} index
   */
  function updateCounter(index) {
    modalCounter.textContent = (index + 1) + ' de ' + images.length;
  }

  /**
   * Garante que um valor esteja entre min e max.
   * @param {number} val
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  /* ──────────────────────────────────────────────────────────────
     5. EVENT LISTENERS — CLIQUE NAS IMAGENS
  ────────────────────────────────────────────────────────────── */
  galleryButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var index = parseInt(btn.dataset.index, 10);
      openModal(index);
    });
  });

  /* ──────────────────────────────────────────────────────────────
     6. EVENT LISTENERS — CONTROLES DO MODAL
  ────────────────────────────────────────────────────────────── */

  // Fechar
  modalClose.addEventListener('click', closeModal);

  // Backdrop
  modalBackdrop.addEventListener('click', closeModal);

  // Navegação
  modalPrev.addEventListener('click', prevImage);
  modalNext.addEventListener('click', nextImage);

  /* ──────────────────────────────────────────────────────────────
     7. TECLADO
  ────────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', function (e) {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
      case 'Esc':
        closeModal();
        break;
      case 'ArrowLeft':
      case 'Left':
        e.preventDefault();
        prevImage();
        break;
      case 'ArrowRight':
      case 'Right':
        e.preventDefault();
        nextImage();
        break;
    }
  });

  /* ──────────────────────────────────────────────────────────────
     8. SWIPE TOUCH (MOBILE)
  ────────────────────────────────────────────────────────────── */
  var touchStartX = 0;
  var touchStartY = 0;
  var swipeThreshold = 50; // px mínimo para considerar swipe

  modal.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  modal.addEventListener('touchend', function (e) {
    if (!isOpen) return;

    var deltaX = e.changedTouches[0].screenX - touchStartX;
    var deltaY = Math.abs(e.changedTouches[0].screenY - touchStartY);

    // Só registra swipe horizontal (ignora scroll vertical)
    if (Math.abs(deltaX) < swipeThreshold || deltaY > 60) return;

    if (deltaX < 0) {
      nextImage(); // Swipe para esquerda → próxima
    } else {
      prevImage(); // Swipe para direita → anterior
    }
  }, { passive: true });

  /* ──────────────────────────────────────────────────────────────
     9. ACESSIBILIDADE — Trap de foco no modal
  ────────────────────────────────────────────────────────────── */
  modal.addEventListener('keydown', function (e) {
    if (!isOpen || e.key !== 'Tab') return;

    var focusable = modal.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusable.length === 0) return;

    var firstEl = focusable[0];
    var lastEl  = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });

})();
