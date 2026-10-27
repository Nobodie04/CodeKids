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

function getMakassarDateString() {
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Makassar' }).format(new Date());
  } catch (e) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const makassarTime = new Date(utc + (3600000 * 8));
    return makassarTime.toISOString().slice(0, 10);
  }
}

function getLanguageKey(rawLang) {
  const l = (rawLang || '').toLowerCase().trim();
  if (l === 'html') return 'html';
  if (l === 'css') return 'css';
  if (l === 'javascript' || l === 'js') return 'javascript';
  if (l === 'python' || l === 'py') return 'python';
  if (l === 'c++' || l === 'cpp') return 'cpp';
  if (l === 'scratch') return 'scratch';
  return 'html';
}

function getLanguageDisplayName(key) {
  const map = { html: 'HTML', css: 'CSS', javascript: 'JavaScript', python: 'Python', cpp: 'C++', scratch: 'Scratch' };
  return map[key] || 'HTML';
}

function determineResumeRecommendation(user) {
  if (!user || !user.progress || Object.keys(user.progress).length === 0) {
    return null;
  }

  const items = Object.values(user.progress).filter(it => it && typeof it === 'object');
  if (items.length === 0) return null;

  // Sort by updatedAt descending
  items.sort((a, b) => {
    const tA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const tB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return tB - tA;
  });

  const latest = items[0];
  const langKey = getLanguageKey(latest.language);
  const langName = getLanguageDisplayName(langKey);
  let lvlKey = (latest.level || 'beginner').toLowerCase() === 'newbie' ? 'beginner' : (latest.level || 'beginner').toLowerCase();

  const totalMod = typeof getCurriculumModuleCount === 'function' ? getCurriculumModuleCount(langName, lvlKey) : 17;

  // Find completed modules for this language and level
  const completedInLevel = new Set();
  items.forEach(it => {
    const itLang = getLanguageKey(it.language);
    const itLvl = (it.level || 'beginner').toLowerCase() === 'newbie' ? 'beginner' : (it.level || 'beginner').toLowerCase();
    if (itLang === langKey && itLvl === lvlKey && it.completed && typeof it.module === 'number') {
      completedInLevel.add(it.module);
    }
  });

  let nextMod = 1;
  while (nextMod <= totalMod && completedInLevel.has(nextMod)) {
    nextMod++;
  }

  // If level is 100% complete, advance to next level
  if (nextMod > totalMod) {
    if (lvlKey === 'beginner') {
      lvlKey = 'explorer';
      nextMod = 1;
    } else if (lvlKey === 'explorer') {
      lvlKey = 'builder';
      nextMod = 1;
    } else {
      // Completed all levels of this language!
      return {
        languageKey: langKey,
        languageName: langName,
        levelKey: 'builder',
        levelName: 'Builder',
        moduleNumber: totalMod,
        moduleTitle: `${langName} Selesai 100% 🎉`,
        url: `pelajaran.html?bahasa=${langKey}&level=builder&modul=${totalMod}`,
        isMastered: true
      };
    }
  }

  const levelDisplayName = lvlKey === 'beginner' ? 'Beginner' : (lvlKey[0].toUpperCase() + lvlKey.slice(1));
  const latestModuleTitle = latest.title ? `Modul ${nextMod}: ${latest.title}` : `Modul ${nextMod}`;

  return {
    languageKey: langKey,
    languageName: langName,
    levelKey: lvlKey,
    levelName: levelDisplayName,
    moduleNumber: nextMod,
    moduleTitle: latestModuleTitle,
    url: `pelajaran.html?bahasa=${langKey}&level=${lvlKey}&modul=${nextMod}`,
    isMastered: false
  };
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

  if (user && typeof evaluateAchievements === 'function') {
    evaluateAchievements(user);
  }

  const userXp = user ? (user.xp || 0) : 0;
  const badgeInfo = typeof getXpBadge === 'function' ? getXpBadge(userXp) : { name: 'Rookie Coder', icon: '🌱', progress: 0 };
  const xpPercent = badgeInfo.progress;

  const startLearning = document.getElementById('startLearning');
  const profileAvatar = document.getElementById('profileAvatar');
  const guestHero = document.getElementById('guestHero');
  const studentHero = document.getElementById('studentHero');

  const progressItems = user ? Object.values(user.progress || {}) : [];
  const completed = progressItems.filter((item) => item && item.completed).length;
  const totalBeginnerModules = 129;
  const progressPercent = Math.min(100, Math.round((completed / totalBeginnerModules) * 100));
  const achievements = user?.achievements || [];

  const todayMakassarStr = getMakassarDateString();
  const streak = user?.streak || { current: 0, longest: 0, last_date: '', history: [] };
  const isTodayRecorded = streak.last_date === todayMakassarStr;

  if (user) {
    // -------------------------------------------------------------
    // LOGGED-IN REGISTERED USER VIEW
    // -------------------------------------------------------------
    if (guestHero) guestHero.style.display = 'none';
    if (studentHero) studentHero.style.display = 'grid';

    // Header Profile & CTA
    startLearning.href = 'pelajaran.html?level=beginner';
    startLearning.textContent = 'Lanjut Belajar';
    const avatarSrc = getAvatarUrl(user.avatar);
    if (avatarSrc) {
      profileAvatar.style.backgroundImage = `url('${avatarSrc}')`;
      profileAvatar.textContent = '';
    } else {
      profileAvatar.style.backgroundImage = 'none';
      profileAvatar.textContent = user.name ? user.name.trim().charAt(0).toUpperCase() : 'U';
    }
    profileAvatar.title = `Profil ${user.name}`;
    profileAvatar.classList.remove('hidden');

    // Personalized Hero Greeting
    const greetingTitle = document.getElementById('studentGreetingTitle');
    if (greetingTitle) greetingTitle.textContent = `Halo, ${user.name}! 👋`;

    // Hero Stats Row
    const heroXp = document.getElementById('studentHeroXp');
    const heroBadgeTier = document.getElementById('studentHeroBadgeTier');
    const heroStreak = document.getElementById('studentHeroStreak');
    const heroStreakStatus = document.getElementById('studentHeroStreakStatus');
    const heroCompleted = document.getElementById('studentHeroCompletedCount');

    if (heroXp) heroXp.textContent = `${userXp} XP`;
    if (heroBadgeTier) heroBadgeTier.textContent = `${badgeInfo.icon} ${badgeInfo.name}`;
    if (heroStreak) heroStreak.textContent = `🔥 ${streak.current || 0} Hari`;
    if (heroStreakStatus) heroStreakStatus.textContent = isTodayRecorded ? '✓ Belajar hari ini' : 'Belum belajar';
    if (heroCompleted) heroCompleted.textContent = `${completed} Modul`;

    // Streak Widget Card
    const streakCurrentDays = document.getElementById('streakCurrentDays');
    const streakLongestDays = document.getElementById('streakLongestDays');
    const streakTodayStatus = document.getElementById('streakTodayStatusText');

    if (streakCurrentDays) streakCurrentDays.textContent = streak.current || 0;
    if (streakLongestDays) streakLongestDays.textContent = streak.longest || 0;
    if (streakTodayStatus) {
      streakTodayStatus.innerHTML = isTodayRecorded
        ? '<span style="color:#10b981;font-weight:700">✓ Sudah belajar hari ini!</span>'
        : '<span style="color:#ea580c;font-weight:700">⏳ Belum belajar hari ini</span>';
    }

    // Rank Floating Card
    const cardRankTitle = document.getElementById('studentCardRankTitle');
    const cardXpBar = document.getElementById('studentCardXpBar');
    const cardXpNext = document.getElementById('studentCardXpNext');

    if (cardRankTitle) cardRankTitle.textContent = `${badgeInfo.icon} ${badgeInfo.name}`;
    if (cardXpBar) cardXpBar.style.width = `${xpPercent}%`;
    if (cardXpNext) {
      cardXpNext.textContent = badgeInfo.next 
        ? `${badgeInfo.next.minXp - userXp} XP lagi menuju ${badgeInfo.next.icon} ${badgeInfo.next.name}` 
        : 'Pangkat Tertinggi Tercapai! 🎉';
    }

    // Resume Learning Recommendation
    const resume = determineResumeRecommendation(user);
    const resumeLangLevelBadge = document.getElementById('resumeLangLevelBadge');
    const resumeStatusPill = document.getElementById('resumeStatusPill');
    const resumeModuleTitle = document.getElementById('resumeModuleTitle');
    const resumeModuleDesc = document.getElementById('resumeModuleDesc');
    const resumeActionRow = document.getElementById('resumeActionRow');

    if (resume) {
      if (resumeLangLevelBadge) resumeLangLevelBadge.textContent = `${resume.languageName} · ${resume.levelName}`;
      if (resumeStatusPill) resumeStatusPill.textContent = '📍 Terakhir Dipelajari';
      if (resumeModuleTitle) resumeModuleTitle.textContent = resume.moduleTitle;
      if (resumeModuleDesc) resumeModuleDesc.textContent = `Lanjutkan petualangan belajarmu di level ${resume.levelName}.`;
      if (resumeActionRow) {
        resumeActionRow.innerHTML = `
          <a href="${resume.url}" class="button button-primary" id="resumeLearningBtn">
            🚀 Lanjut Belajar: ${resume.languageName} Modul ${resume.moduleNumber} →
          </a>
        `;
      }
    } else {
      // User with NO progress yet
      if (resumeLangLevelBadge) resumeLangLevelBadge.textContent = 'Mulai Belajar';
      if (resumeStatusPill) resumeStatusPill.textContent = '🌟 Langkah Pertama';
      if (resumeModuleTitle) resumeModuleTitle.textContent = 'Pilih Bahasa Favoritmu untuk Mulai Belajar';
      if (resumeModuleDesc) resumeModuleDesc.textContent = 'Pilih HTML, CSS, JavaScript, Python, C++, atau Scratch dan selesaikan modul pertamamu!';
      if (resumeActionRow) {
        resumeActionRow.innerHTML = `
          <a href="pelajaran.html?bahasa=html&level=beginner" class="button button-primary">🌐 Mulai HTML</a>
          <a href="pelajaran.html?bahasa=python&level=beginner" class="button button-secondary" style="background:#fef3c7;color:#92400e">🐍 Mulai Python</a>
          <a href="pelajaran.html?bahasa=scratch&level=beginner" class="button button-secondary" style="background:#fed7aa;color:#9a3412">🧩 Mulai Scratch</a>
        `;
      }
    }
  } else {
    // -------------------------------------------------------------
    // GUEST VIEW (Belum Login)
    // -------------------------------------------------------------
    if (guestHero) guestHero.style.display = 'grid';
    if (studentHero) studentHero.style.display = 'none';

    startLearning.href = 'akun.html';
    startLearning.textContent = 'Masuk untuk Belajar';
    profileAvatar.classList.add('hidden');
  }

  // Common Platform Stats Rendering
  document.getElementById('completedModules').textContent = `${completed}/${totalBeginnerModules}`;
  document.getElementById('completedModulesBar').style.width = `${progressPercent}%`;
  document.getElementById('learningProgress').textContent = `${progressPercent}%`;
  document.getElementById('learningProgressBar').style.width = `${progressPercent}%`;
  document.getElementById('exerciseProgress').textContent = `${progressPercent}%`;
  document.getElementById('quizCount').textContent = progressItems.length;
  document.getElementById('achievementPoints').textContent = `${userXp} XP`;
  document.getElementById('achievementPointsBar').style.width = `${xpPercent}%`;

  const achievementList = document.getElementById('achievementList');
  achievementList.innerHTML = achievements.length
    ? achievements.slice(-3).reverse().map((achievement) => `<div class="achievement-item"><span>★</span><div><strong>${achievement.title}</strong><small>${achievement.description}</small></div></div>`).join('')
    : '<p class="stat-label">Belum ada achievement. Selesaikan modul pertamamu!</p>';

  const xpBadgeContainer = document.getElementById('xpBadgeContainer');
  if (xpBadgeContainer && typeof xpBadgeMarkup === 'function') {
    xpBadgeContainer.innerHTML = xpBadgeMarkup(userXp);
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
