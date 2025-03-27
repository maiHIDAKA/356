const form = document.getElementById('sangoroku-form');
const history = document.getElementById('history');
const modal = document.getElementById('card-modal');
const cardContent = document.getElementById('card-content');
const closeModal = document.getElementById('close-modal');

// 保存されたデータの読み込み
const saved = JSON.parse(localStorage.getItem('sangoroku') || '[]');

// モーダル開く処理
function openCard(entry) {
  cardContent.innerHTML = `
    <div class="date">${entry.date}</div>
    <div class="words">${entry.words.join('、')}</div>
    <div style="font-size: 2rem; margin-top: 0.5rem;">🪸</div>
  `;
  modal.classList.remove('hidden');
}

// 閉じるボタン処理
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// 履歴表示処理（クリックイベント付き）
function renderHistory() {
  history.innerHTML = '';
  saved.forEach(entry => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="date">${entry.date}</div>
      <div class="words">${entry.words.join('、')}</div>
    `;
    li.addEventListener('click', () => openCard(entry));
    history.appendChild(li);
  });
}

// 初期表示
renderHistory();

// 新規登録
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const words = [
    document.getElementById('word1').value,
    document.getElementById('word2').value,
    document.getElementById('word3').value
  ];
  const date = new Date().toLocaleDateString();
  const entry = { date, words };

  saved.push(entry);
  localStorage.setItem('sangoroku', JSON.stringify(saved));
  renderHistory();
  form.reset();
});
