function initPopup(buttonId, popupId, images) {
  const btn = document.getElementById(buttonId);
  const popup = document.getElementById(popupId);
  if (!btn || !popup) return;
  const img = popup.querySelector('.popupImage');
  const left = popup.querySelector('.arrow.left');
  const right = popup.querySelector('.arrow.right');
  const close = popup.querySelector('.closePopup');

  let index = 0;

  function updateImage() {
    img.src = images[index];
    left.style.display = index === 0 ? 'none' : 'block';
    right.style.display = index === images.length - 1 ? 'none' : 'block';
  }

  btn.addEventListener('click', () => {
    popup.style.display = 'flex';
    document.body.classList.add('modal-open');
    index = 0;
    updateImage();
  });

  close.addEventListener('click', () => {
    popup.style.display = 'none';
    document.body.classList.remove('modal-open');
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
      document.body.classList.remove('modal-open');
    }
  });

  left.addEventListener('click', (e) => {
    e.stopPropagation();
    if (index > 0) {
      index--;
      updateImage();
    }
  });

  right.addEventListener('click', (e) => {
    e.stopPropagation();
    if (index < images.length - 1) {
      index++;
      updateImage();
    }
  });
}

initPopup('logoBtn', 'popup1', [
  'https://i.imgur.com/uGnH5XI.png',
  'https://i.imgur.com/javiPf0.png',
  'https://i.imgur.com/Lj0HqCo.png',
  'https://i.imgur.com/exxUNyF.png',
  'https://i.imgur.com/QZZqsrk.png',
  'https://i.imgur.com/6GtLt0X.png',
]);

initPopup('secondBtn', 'popup2', [
  'https://i.imgur.com/ayNer7u.png',
  'https://i.imgur.com/aLNoNg3.png',
  'https://i.imgur.com/br5f9WL.png',
  'https://i.imgur.com/78d9HDe.png',
  'https://i.imgur.com/ZVGY4HX.png'
]);

// Positionne l'image principale correctement une fois chargée
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const image = document.getElementById('mainImage');
  if (!container || !image) return;

  const tryScroll = (maxAttempts = 30, attempt = 0) => {
    if (image.naturalHeight > 0) {
      const imageHeight = image.naturalHeight * (image.clientWidth / image.naturalWidth);
      const scrollY = imageHeight * 0.63 - container.clientHeight / 2;
      container.scrollTop = scrollY;
    } else if (attempt < maxAttempts) {
      setTimeout(() => tryScroll(maxAttempts, attempt + 1), 100);
    }
  };

  if (image.complete) {
    tryScroll();
  } else {
    image.addEventListener('load', () => tryScroll());
  }
});

const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Erreur de passage en plein écran : ${err.message}`);
      });
      localStorage.setItem('forceFullscreen', 'true');
    } else {
      document.exitFullscreen();
      localStorage.setItem('forceFullscreen', 'false');
    }
  });
}

const dragonFinal = document.querySelector('.dragonfinal');
if (dragonFinal) {
  dragonFinal.addEventListener('click', () => {
    const popup = document.getElementById('codePopup');
    if (popup) {
      popup.style.display = 'flex';
      document.body.classList.add('modal-open');
      document.getElementById('secretInput').value = '';
      document.getElementById('codeError').style.display = 'none';
    }
  });
}

function normalize(text) {
  return text
    .trim()
    .toUpperCase()
    .replace(/’/g, "'")
    .replace(/[éèêë]/gi, 'E')
    .replace(/[àâä]/gi, 'A')
    .replace(/[îï]/gi, 'I')
    .replace(/[ôö]/gi, 'O')
    .replace(/[ùûü]/gi, 'U')
    .replace(/[^A-Z0-9 '\.]/g, '');
}

function checkSecretCode() {
  const input = document.getElementById('secretInput');
  if (!input) return;
  const correctCode = "Que l'équilibre des cinq éveillés unisse l'ombre et la lumière. L'heure est venue... réveille-toi Dragon";

  if (normalize(input.value) === normalize(correctCode)) {
    document.getElementById('codePopup').style.display = 'none';
    document.body.classList.remove('modal-open');
    playDragonReveal();
  } else {
    document.getElementById('codeError').style.display = 'block';
  }
}

function playDragonReveal() {
  const sequence = document.getElementById('awakeningSequence');
  const img1 = document.getElementById('dragonStep1');
  const img2 = document.getElementById('dragonStep2');
  if (!sequence || !img1 || !img2) return;

  img1.style.transition = 'none';
  img1.style.opacity = '0';
  img1.style.transform = 'scale(0.5)';
  img2.style.transition = 'none';
  img2.style.opacity = '0';

  void img1.offsetWidth;

  img1.style.transition = 'transform 3s ease, opacity 2s ease';
  img2.style.transition = 'transform 3s ease, opacity 2s ease';

  sequence.style.display = 'flex';

  setTimeout(() => {
    img1.style.opacity = '1';
    img1.style.transform = 'scale(1.3)';
  }, 50);

  setTimeout(() => {
    img1.style.opacity = '0';
    img2.style.opacity = '1';
  }, 3500);

  setTimeout(() => {
    sequence.style.display = 'none';
  }, 8000);
}

document.querySelectorAll('.extmont').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    localStorage.setItem('forceFullscreen', 'true');
    window.location.href = link.getAttribute('data-target');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const wantsFullscreen = localStorage.getItem('forceFullscreen') === 'true';
  if (wantsFullscreen && !document.fullscreenElement) {
    document.addEventListener('click', function enableFullscreenOnce() {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Échec du plein écran :', err);
      });
      document.removeEventListener('click', enableFullscreenOnce);
    });
  }
});
