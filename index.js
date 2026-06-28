/**
 * Carte d'anniversaire interactive - JavaScript
 * Gère les bougies flottantes, l'ouverture du cadeau et les animations
 */

(function() {
  "use strict";

  // --- 1. Générer les bougies ---
  function createCandles() {
    const candlesContainer = document.getElementById('candlesContainer');
    if (!candlesContainer) return;

    const emojis = ['🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️', '🕯️'];
    const count = 25;

    for (let i = 0; i < count; i++) {
      const candle = document.createElement('div');
      candle.classList.add('candle');
      
      let emoji = emojis[Math.floor(Math.random() * emojis.length)];
      if (i % 5 === 0 && i < 15) emoji = '🎂';
      
      candle.textContent = emoji;
      candle.style.left = (Math.random() * 92 + 2) + '%';
      
      const size = 0.9 + Math.random() * 0.8;
      candle.style.fontSize = (2.0 * size) + 'rem';
      
      const duration = 1.4 + Math.random() * 1.6;
      candle.style.animationDuration = duration + 's';
      candle.style.animationDelay = (Math.random() * 2.5) + 's';
      candle.style.bottom = (2 + Math.random() * 15) + '%';
      
      candlesContainer.appendChild(candle);
    }
  }

  // --- 2. Gérer l'ouverture ---
  function setupGiftInteraction() {
    const cardWrapper = document.getElementById('cardWrapper');
    const giftBox = document.getElementById('giftBox');
    let isOpen = false;

    if (!cardWrapper || !giftBox) return;

    function openGift(event) {
      if (isOpen) {
        giftBox.style.transition = 'transform 0.15s ease';
        giftBox.style.transform = 'scale(0.97)';
        setTimeout(() => {
          giftBox.style.transform = 'scale(1)';
        }, 150);
        return;
      }

      isOpen = true;
      cardWrapper.classList.add('open');

      giftBox.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      giftBox.style.transform = 'scale(1.04)';
      setTimeout(() => {
        giftBox.style.transform = 'scale(1)';
      }, 180);

      createFloatingHearts();
    }

    cardWrapper.addEventListener('click', openGift);
    cardWrapper.addEventListener('touchstart', openGift, { passive: true });
  }

  // --- 3. Cœurs flottants ---
  function createFloatingHearts() {
    const emojis = ['❤️', '💖', '💗', '♥️', '✨', '💕', '💞', '🌸', '🌺', '💝', '💍', '🌟'];
    const count = 22;

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '999';
      el.style.fontSize = (1.6 + Math.random() * 2.8) + 'rem';
      el.style.left = (10 + Math.random() * 80) + '%';
      el.style.top = (10 + Math.random() * 70) + '%';
      el.style.opacity = '0.9';
      el.style.transition = 'all 3s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = 'scale(0.3) rotate(0deg)';
      el.style.textShadow = '0 0 30px rgba(255,100,100,0.6)';
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        el.style.transform = `translateY(-${100 + Math.random() * 120}px) scale(1.8) rotate(${Math.random() * 80 - 40}deg)`;
        el.style.opacity = '0';
      });

      setTimeout(() => {
        if (el.parentNode) el.remove();
      }, 3200);
    }
  }

  // --- 4. Initialisation ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createCandles();
      setupGiftInteraction();
    });
  } else {
    createCandles();
    setupGiftInteraction();
  }

})();
