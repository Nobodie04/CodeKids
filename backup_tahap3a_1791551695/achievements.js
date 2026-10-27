const achievementCatalog = [
  // 📚 1. PROGRESS
  { title: 'First Step', category: 'Progress', xp: 10, description: 'Menyelesaikan 1 materi.', test: s => s.completed >= 1 },
  { title: 'Getting Started', category: 'Progress', xp: 25, description: 'Menyelesaikan 5 materi.', test: s => s.completed >= 5 },
  { title: 'Bookworm', category: 'Progress', xp: 50, description: 'Menyelesaikan 25 materi.', test: s => s.completed >= 25 },
  { title: 'Knowledge Seeker', category: 'Progress', xp: 75, description: 'Menyelesaikan 50 materi.', test: s => s.completed >= 50 },
  { title: 'Code Learner', category: 'Progress', xp: 150, description: 'Menyelesaikan 100 materi.', test: s => s.completed >= 100 },
  { title: 'Code Master', category: 'Progress', xp: 500, description: 'Menyelesaikan 250 materi.', test: s => s.completed >= 250 },

  // 🎓 2. LEVEL
  { title: 'Newbie Coder', category: 'Level', xp: 100, description: 'Menyelesaikan level Newbie suatu bahasa.', test: s => s.levels.beginner >= 1 },
  { title: 'Intermediate Coder', category: 'Level', xp: 250, description: 'Menyelesaikan level Intermediate.', test: s => s.levels.explorer >= 1 },
  { title: 'Builder', category: 'Level', xp: 500, description: 'Menyelesaikan level Builder.', test: s => s.levels.builder >= 1 },
  { title: 'Language Master', category: 'Level', xp: 750, description: 'Menyelesaikan semua level dari satu bahasa.', test: s => s.languageMasterCount >= 1 },

  // 💻 3. BAHASA
  { title: 'Web Architect', category: 'Bahasa', xp: 250, description: 'Selesaikan seluruh materi HTML.', test: s => s.languages.HTML >= 3 },
  { title: 'Stylist', category: 'Bahasa', xp: 250, description: 'Selesaikan seluruh materi CSS.', test: s => s.languages.CSS >= 3 },
  { title: 'Script Runner', category: 'Bahasa', xp: 250, description: 'Selesaikan seluruh materi JavaScript.', test: s => s.languages.JavaScript >= 3 },
  { title: 'Python Tamer', category: 'Bahasa', xp: 250, description: 'Selesaikan seluruh materi Python.', test: s => s.languages.Python >= 3 },
  { title: 'C++ Engineer', category: 'Bahasa', xp: 250, description: 'Selesaikan seluruh materi C++.', test: s => s.languages['C++'] >= 3 },
  { title: 'Block Master', category: 'Bahasa', xp: 250, description: 'Selesaikan seluruh materi Scratch.', test: s => s.languages.Scratch >= 3 },

  // 🔥 4. CHALLENGE
  { title: 'First Challenge', category: 'Challenge', xp: 10, description: 'Menyelesaikan 1 challenge.', test: s => s.challenges >= 1 },
  { title: 'Challenger', category: 'Challenge', xp: 50, description: 'Menyelesaikan 10 challenge.', test: s => s.challenges >= 10 },
  { title: 'Challenge Hunter', category: 'Challenge', xp: 150, description: 'Menyelesaikan 50 challenge.', test: s => s.challenges >= 50 },
  { title: 'Challenge Beast', category: 'Challenge', xp: 300, description: 'Menyelesaikan 100 challenge.', test: s => s.challenges >= 100 },

  // 🏗️ 5. PROJECT
  { title: 'First Build', category: 'Project', xp: 100, description: 'Menyelesaikan project pertama.', test: s => s.projects >= 1 },
  { title: 'Project Builder', category: 'Project', xp: 250, description: 'Menyelesaikan 5 project.', test: s => s.projects >= 5 },
  { title: 'Project Architect', category: 'Project', xp: 500, description: 'Menyelesaikan 10 project.', test: s => s.projects >= 10 },
  { title: 'Master Builder', category: 'Project', xp: 1000, description: 'Menyelesaikan project dari 3 bahasa.', test: s => s.projectLanguages >= 3 },

  // 🔥 6. STREAK
  { title: 'On Fire', category: 'Streak', xp: 50, description: 'Belajar 3 hari berturut-turut.', test: s => s.streak >= 3 },
  { title: 'Keep Going', category: 'Streak', xp: 100, description: 'Belajar 7 hari berturut-turut.', test: s => s.streak >= 7 },
  { title: 'Unstoppable', category: 'Streak', xp: 250, description: 'Belajar 14 hari berturut-turut.', test: s => s.streak >= 14 },
  { title: 'Dedicated Coder', category: 'Streak', xp: 500, description: 'Belajar 30 hari berturut-turut.', test: s => s.streak >= 30 },
  { title: 'Legendary Streak', category: 'Streak', xp: 1000, description: 'Belajar 100 hari berturut-turut.', test: s => s.streak >= 100 },

  // 🧭 7. EXPLORATION
  { title: 'Explorer', category: 'Exploration', xp: 50, description: 'Mempelajari 2 bahasa berbeda.', test: s => s.languageCount >= 2 },
  { title: 'Code Traveler', category: 'Exploration', xp: 100, description: 'Mempelajari 3 bahasa berbeda.', test: s => s.languageCount >= 3 },
  { title: 'Polyglot Coder', category: 'Exploration', xp: 250, description: 'Mempelajari 5 bahasa berbeda.', test: s => s.languageCount >= 5 },
  { title: 'Code Polyglot', category: 'Exploration', xp: 2000, description: 'Menyelesaikan level Newbie pada seluruh bahasa tersedia.', test: s => s.beginnerLanguages >= 6 },

  // 🧩 8. KOMBINASI
  { title: 'Web Developer', category: 'Combination', xp: 300, description: 'Selesaikan HTML, CSS, dan JavaScript Newbie.', test: s => s.beginnerSet.has('HTML') && s.beginnerSet.has('CSS') && s.beginnerSet.has('JavaScript') },
  { title: 'Frontend Developer', category: 'Combination', xp: 500, description: 'Selesaikan HTML, CSS, dan JavaScript Intermediate.', test: s => s.explorerSet.has('HTML') && s.explorerSet.has('CSS') && s.explorerSet.has('JavaScript') },
  { title: 'Algorithmic Mind', category: 'Combination', xp: 700, description: 'Selesaikan C++ Intermediate dan 20 challenge.', test: s => s.explorerSet.has('C++') && s.challenges >= 20 },

  // 👀 9. RAHASIA
  { title: 'Curious Coder', category: 'Secret', xp: 100, description: 'Secret Achievement.', secret: true, test: s => s.languageCount >= 4 },
  { title: 'Night Owl', category: 'Secret', xp: 100, description: 'Secret Achievement.', secret: true, test: s => s.nightActivities >= 5 },
  { title: 'Early Bird', category: 'Secret', xp: 100, description: 'Secret Achievement.', secret: true, test: s => s.earlyActivities >= 7 },
  { title: 'Perfectionist', category: 'Secret', xp: 200, description: 'Secret Achievement.', secret: true, test: s => s.perfectQuizzes >= 10 },
  { title: 'Clean Coder', category: 'Secret', xp: 200, description: 'Secret Achievement.', secret: true, test: s => s.noHintChallenges >= 10 },

  // 🏆 10. MILESTONE BESAR
  { title: 'Ultimate Code Master', category: 'Milestone', xp: 2000, description: 'Menyelesaikan seluruh level Builder dari satu bahasa.', test: s => s.builderLanguageCount >= 1 },
  { title: 'Grand Builder', category: 'Milestone', xp: 3000, description: 'Menyelesaikan final project dari 3 bahasa.', test: s => s.projectLanguages >= 3 && s.builderLanguageCount >= 1 },
  { title: 'Legend', category: 'Milestone', xp: 5000, description: 'Menyelesaikan 500 materi/challenge/project secara keseluruhan.', test: s => s.totalActivities >= 500 },
  { title: 'Polyglot Master', category: 'Milestone', xp: 4000, description: 'Menyelesaikan seluruh level dari 5 bahasa.', test: s => s.languageMasterCount >= 5 }
];

function achievementStats(user) {
  const progress = Object.values(user.progress || {});
  const completed = progress.filter(item => item.completed);
  const levels = { beginner: 0, explorer: 0, builder: 0 };
  const languages = {};
  const beginnerSet = new Set();
  const explorerSet = new Set();
  const builderSet = new Set();
  const projectLanguages = new Set();
  const languageMasterCount = new Set();

  completed.forEach(item => {
    const level = item.level === 'newbie' ? 'beginner' : item.level;
    if (levels[level] !== undefined) levels[level] += 1;
    languages[item.language] = (languages[item.language] || 0) + 1;
    if (level === 'beginner') beginnerSet.add(item.language);
    if (level === 'explorer') explorerSet.add(item.language);
    if (level === 'builder') builderSet.add(item.language);
    if (item.title && item.title.toLowerCase().includes('project')) projectLanguages.add(item.language);
  });

  // Hitung bahasa yang menyelesaikan semua level (beginner + explorer + builder)
  const allLanguages = new Set([...beginnerSet, ...explorerSet, ...builderSet]);
  allLanguages.forEach(lang => {
    if (beginnerSet.has(lang) && explorerSet.has(lang) && builderSet.has(lang)) {
      languageMasterCount.add(lang);
    }
  });

  const dates = [...new Set(user.activityDates || [])].sort();
  let streak = 0;
  let current = null;
  dates.forEach(date => {
    const day = new Date(`${date}T00:00:00`);
    if (!current || (day - current) / 86400000 === 1) streak += 1;
    else streak = 1;
    current = day;
  });

  return {
    completed: completed.length,
    challenges: completed.length,
    projects: completed.filter(item => item.title && item.title.toLowerCase().includes('project')).length,
    levels,
    languages,
    languageCount: Object.keys(languages).length,
    beginnerLanguages: beginnerSet.size,
    beginnerSet,
    explorerSet,
    builderSet,
    projectLanguages: projectLanguages.size,
    languageMasterCount: languageMasterCount.size,
    builderLanguageCount: builderSet.size,
    totalActivities: completed.length,
    streak,
    nightActivities: user.nightActivities || 0,
    earlyActivities: user.earlyActivities || 0,
    perfectQuizzes: user.perfectQuizzes || 0,
    noHintChallenges: user.noHintChallenges || 0
  };
}

function evaluateAchievements(user) {
  user.achievements = user.achievements || [];
  const stats = achievementStats(user);
  achievementCatalog.forEach(item => {
    if (item.test(stats) && !user.achievements.some(earned => earned.title === item.title)) {
      user.achievements.push({
        title: item.title,
        category: item.category,
        description: item.description,
        xp: item.xp,
        secret: !!item.secret,
        earnedAt: new Date().toISOString()
      });
    }
  });
  user.xp = user.achievements.reduce((total, item) => total + (item.xp || 0), 0);
  return user;
}

// 🏅 SISTEM BADGE XP
const xpBadgeTiers = [
  { name: 'Rookie Coder', icon: '🌱', minXp: 0, color: '#8d99ae', description: 'Memulai perjalanan coding' },
  { name: 'Bronze Coder', icon: '🥉', minXp: 500, color: '#cd7f32', description: 'Mengumpulkan 500 XP' },
  { name: 'Silver Coder', icon: '🥈', minXp: 1000, color: '#a8b2c1', description: 'Mengumpulkan 1.000 XP' },
  { name: 'Gold Coder', icon: '🥇', minXp: 2500, color: '#ffd700', description: 'Mengumpulkan 2.500 XP' },
  { name: 'Platinum Coder', icon: '💎', minXp: 5000, color: '#7dd3fc', description: 'Mengumpulkan 5.000 XP' },
  { name: 'Diamond Coder', icon: '🔮', minXp: 10000, color: '#c084fc', description: 'Mengumpulkan 10.000 XP' },
  { name: 'Legend Coder', icon: '👑', minXp: 20000, color: '#fbbf24', description: 'Mengumpulkan 20.000 XP' }
];

function getXpBadge(xp) {
  const totalXp = xp || 0;
  let current = xpBadgeTiers[0];
  let next = null;
  for (let i = 0; i < xpBadgeTiers.length; i++) {
    if (totalXp >= xpBadgeTiers[i].minXp) {
      current = xpBadgeTiers[i];
      next = xpBadgeTiers[i + 1] || null;
    }
  }
  const progress = next ? Math.min(100, Math.round(((totalXp - current.minXp) / (next.minXp - current.minXp)) * 100)) : 100;
  return { ...current, next, progress, totalXp };
}

function xpBadgeMarkup(xp) {
  const badge = getXpBadge(xp);
  const nextText = badge.next
    ? `<small>${badge.next.minXp - badge.totalXp} XP lagi menuju ${badge.next.icon} ${badge.next.name}</small>`
    : '<small>Badge tertinggi tercapai! 🎉</small>';
  return `<div class="xp-badge-card" style="--badge-color:${badge.color}">
    <div class="xp-badge-icon">${badge.icon}</div>
    <div class="xp-badge-info">
      <strong>${badge.name}</strong>
      <span>${badge.description}</span>
      ${nextText}
      <div class="xp-badge-track"><i style="width:${badge.progress}%"></i></div>
    </div>
  </div>`;
}
