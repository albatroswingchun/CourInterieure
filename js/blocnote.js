// Simple notepad popup handling
// Creates a notepad button and popup if they don't exist,
// then loads and saves notes to localStorage.

(function() {
  const NOTE_KEY = 'blocnote-content';

  document.addEventListener('DOMContentLoaded', () => {
    let popup = document.getElementById('notePopup');
    if (!popup) {
      popup = document.createElement('div');
      popup.id = 'notePopup';
      popup.className = 'popupOverlay';
      popup.style.display = 'none';
      popup.innerHTML = `
        <div class="popupContent" style="flex-direction: column; background:#111; padding:20px; border-radius:12px;">
          <span class="closePopup">&times;</span>
          <textarea id="noteArea" placeholder="N'hésites pas à prendre des notes ici..." style="width:100%;height:300px;padding:10px;font-size:1rem;border-radius:8px;background:#222;color:white;border:1px solid #555;"></textarea>
        </div>`;
      document.body.appendChild(popup);
    }

    let noteBtn = document.getElementById('noteBtn');
    if (!noteBtn) {
      noteBtn = document.createElement('button');
      noteBtn.id = 'noteBtn';
      noteBtn.className = 'noteBtn';
      noteBtn.innerHTML = '<span style="font-size:32px">\uD83D\uDCDD</span>';
      document.body.appendChild(noteBtn);
    }

    const noteArea = popup.querySelector('#noteArea');
    noteArea.value = localStorage.getItem(NOTE_KEY) || '';

    noteArea.addEventListener('input', () => {
      localStorage.setItem(NOTE_KEY, noteArea.value);
    });

    function openPopup() {
      popup.style.display = 'flex';
      document.body.classList.add('modal-open');
    }

    function closePopup() {
      popup.style.display = 'none';
      document.body.classList.remove('modal-open');
    }

    noteBtn.addEventListener('click', openPopup);
    popup.querySelector('.closePopup').addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
      if (e.target === popup) closePopup();
    });
  });
})();
