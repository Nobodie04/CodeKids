const filterButtons = document.querySelectorAll('.filter-button');
const languageCards = document.querySelectorAll('.language-card');
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const faqItems = document.querySelectorAll('.faq-item');

function getAvatarUrl(avatar) {
  if (!avatar) return '';
  if (avatar.startsWith('data:image/') || avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('blob:')) {
    return avatar;
  }
  const clean = avatar.startsWith('/') ? avatar.slice(1) : avatar;
  if (clean.startsWith('uploads/avatars/')) {
    return `http://localhost:8000/${clean}`;
  }
  return `http://localhost:8000/uploads/avatars/${clean}`;
}

async function syncAccountHomepage() {
  const sessionUserId = localStorage.getItem('codekids_session_user_id');
  const sessionEmail = localStorage.getItem('codekids_session');
  let user = null;

  // 1. Try reading from cached current user first for instant UI response
  try {
    const cached = localStorage.getItem('codekids_current_user');
    if (cached) user = JSON.parse(cached);
  } catch (e) {}

  // 2. Fetch fresh user data from REST API backend
  if (sessionUserId || sessionEmail) {
    try {
      const endpoint = sessionUserId 
        ? `http://localhost:8000/api/users/${sessionUserId}` 
        : `http://localhost:8000/api/users`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) {
        if (sessionUserId && data.user) {
          user = data.user;
        } else if (Array.isArray(data.users)) {
          user = data.users.find(u => u.email.toLowerCase() === (sessionEmail || '').toLowerCase()) || null;
        }
        if (user) {
          localStorage.setItem('codekids_current_user', JSON.stringify(user));
          localStorage.setItem('codekids_session', user.email);
          localStorage.setItem('codekids_session_user_id', user.id);
        }
      }
    } catch (err) {
      console.warn('Backend API not reachable from homepage, using cached user if available.');
    }
  }

  const startLearning = document.getElementById('startLearning');
  const profileAvatar = document.getElementById('profileAvatar');
  const progressItems = user ? Object.values(user.progress || {}) : [];
  const completed = progressItems.filter((item) => item && item.completed).length;
  const totalBeginnerModules = 128;
  const progressPercent = Math.min(100, Math.round((completed / totalBeginnerModules) * 100));
  const achievements = user?.achievements || [];
  const achievementPoints = achievements.length * 50;

  if (user) {
    startLearning.href = 'pelajaran.html?level=beginner';
    startLearning.textContent = 'Lanjut Belajar';
    const avatarSrc = getAvatarUrl(user.avatar);
    if (avatarSrc) {
      profileAvatar.style.backgroundImage = `url('${avatarSrc}')`;
      profileAvatar.textContent = '';
    } else {
      profileAvatar.style.backgroundImage = 'none';
      profileAvatar.textContent = user.name.trim().charAt(0).toUpperCase();
    }
    profileAvatar.title = `Profil ${user.name}`;
    profileAvatar.classList.remove('hidden');
  } else {
    startLearning.href = 'akun.html';
    startLearning.textContent = 'Masuk untuk Belajar';
    profileAvatar.classList.add('hidden');
  }

  document.getElementById('completedModules').textContent = `${completed}/${totalBeginnerModules}`;
  document.getElementById('completedModulesBar').style.width = `${progressPercent}%`;
  document.getElementById('learningProgress').textContent = `${progressPercent}%`;
  document.getElementById('learningProgressBar').style.width = `${progressPercent}%`;
  document.getElementById('exerciseProgress').textContent = `${progressPercent}%`;
  document.getElementById('quizCount').textContent = progressItems.length;
  document.getElementById('achievementPoints').textContent = `${achievementPoints} XP`;
  document.getElementById('achievementPointsBar').style.width = `${Math.min(100, achievementPoints)}%`;

  const achievementList = document.getElementById('achievementList');
  achievementList.innerHTML = achievements.length
    ? achievements.slice(-3).reverse().map((achievement) => `<div class="achievement-item"><span>★</span><div><strong>${achievement.title}</strong><small>${achievement.description}</small></div></div>`).join('')
    : '<p class="stat-label">Belum ada achievement. Selesaikan modul pertamamu!</p>';

  const xpBadgeContainer = document.getElementById('xpBadgeContainer');
  if (xpBadgeContainer && typeof xpBadgeMarkup === 'function') {
    xpBadgeContainer.innerHTML = xpBadgeMarkup(user ? user.xp || 0 : 0);
  }
}

syncAccountHomepage();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    languageCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
});

faqItems.forEach((item) => {
  item.addEventListener('click', () => {
    faqItems.forEach((faq) => faq.classList.remove('open'));
    item.classList.add('open');
  });
});

const quizData = [
  {
    question: 'Apa fungsi dari variabel dalam program?',
    answers: [
      { text: 'Menyimpan data untuk dipakai lagi', correct: true },
      { text: 'Membuat halaman lebih lapang', correct: false },
      { text: 'Menghapus kode lama', correct: false },
      { text: 'Menjalankan semua perintah sekaligus', correct: false }
    ]
  },
  {
    question: 'Pada HTML, fungsi dari tag <button> adalah?',
    answers: [
      { text: 'Membuat tombol yang bisa diklik', correct: true },
      { text: 'Menambah teks judul', correct: false },
      { text: 'Mengatur warna latar', correct: false },
      { text: 'Menyusun tabel data', correct: false }
    ]
  },
  {
    question: 'Apa arti dari loop dalam pemrograman?',
    answers: [
      { text: 'Mengulang perintah beberapa kali', correct: true },
      { text: 'Menghentikan program', correct: false },
      { text: 'Membuat gambar baru', correct: false },
      { text: 'Menyisipkan komentar', correct: false }
    ]
  }
];

const questionText = document.getElementById('questionText');
const answerList = document.getElementById('answerList');
const nextQuestionButton = document.getElementById('nextQuestion');
const scoreText = document.getElementById('scoreText');

let currentQuestionIndex = 0;
let score = 0;

function renderQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  answerList.innerHTML = '';

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = answer.text;
    button.addEventListener('click', () => {
      const isCorrect = answer.correct;
      if (isCorrect) {
        score += 1;
        scoreText.textContent = `Skor: ${score}`;
      }

      Array.from(answerList.children).forEach((child) => {
        child.disabled = true;
      });

      Array.from(answerList.children).forEach((child) => {
        const matched = currentQuestion.answers.find((item) => item.text === child.textContent);
        if (matched && matched.correct) {
          child.classList.add('correct');
        }
      });

      if (!isCorrect) {
        button.classList.add('wrong');
      }
    });

    answerList.appendChild(button);
  });
}

nextQuestionButton.addEventListener('click', () => {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  if (currentQuestionIndex === quizData.length - 1) {
    questionText.textContent = 'Kamu sudah menyelesaikan kuis! Ayo lanjut ke level berikutnya.';
    answerList.innerHTML = `<p style="margin:0; color: var(--muted);">Skor akhir kamu: ${score} dari ${quizData.length}</p>`;
    nextQuestionButton.textContent = 'Ulangi kuis';
    currentQuestionIndex = quizData.length;

    nextQuestionButton.onclick = () => {
      currentQuestionIndex = 0;
      score = 0;
      scoreText.textContent = 'Skor: 0';
      nextQuestionButton.textContent = 'Pertanyaan berikutnya';
      nextQuestionButton.onclick = null;
      nextQuestionButton.addEventListener('click', () => {
        if (currentQuestionIndex < quizData.length - 1) {
          currentQuestionIndex += 1;
          renderQuestion();
          return;
        }

        questionText.textContent = 'Kamu sudah menyelesaikan kuis! Ayo lanjut ke level berikutnya.';
        answerList.innerHTML = `<p style="margin:0; color: var(--muted);">Skor akhir kamu: ${score} dari ${quizData.length}</p>`;
      });
      renderQuestion();
    };
  }
});

renderQuestion();
