// =============================================================================
// CODEKIDS ACADEMY - ACHIEVEMENT & XP SYSTEM (TAHAP 3A)
// =============================================================================

// Fallback registry matching pelajaran.js curriculum exactly
const DEFAULT_CURRICULUM_MODULE_COUNTS = {
  HTML: { beginner: 17, explorer: 22, builder: 11 },
  CSS: { beginner: 18, explorer: 19, builder: 13 },
  JavaScript: { beginner: 32, explorer: 24, builder: 17 },
  Python: { beginner: 26, explorer: 23, builder: 18 },
  'C++': { beginner: 22, explorer: 22, builder: 22 },
  Scratch: { beginner: 14, explorer: 15, builder: 11 }
};

function getCurriculumModuleCount(language, level) {
  const langKey = (language || '').trim();
  const lvlKey = (level || '').toLowerCase() === 'newbie' ? 'beginner' : (level || '').toLowerCase();

  // 1. Try reading live curriculum from window.CodeKidsCurriculum or window.lessons if available
  if (typeof window !== 'undefined') {
    if (window.CodeKidsCurriculum && typeof window.CodeKidsCurriculum.getModuleCount === 'function') {
      const liveCount = window.CodeKidsCurriculum.getModuleCount(langKey, lvlKey);
      if (typeof liveCount === 'number' && liveCount > 0) return liveCount;
    }
    if (window.lessons) {
      const langLower = langKey.toLowerCase();
      const lObj = window.lessons[langLower] || Object.values(window.lessons).find(l => (l.name || '').toLowerCase() === langLower);
      if (lObj && lObj.levels && Array.isArray(lObj.levels[lvlKey])) {
        return lObj.levels[lvlKey].length;
      }
    }
  }

  // 2. Fallback to standard curriculum structure
  const foundLang = Object.keys(DEFAULT_CURRICULUM_MODULE_COUNTS).find(k => k.toLowerCase() === langKey.toLowerCase());
  if (foundLang && DEFAULT_CURRICULUM_MODULE_COUNTS[foundLang][lvlKey]) {
    return DEFAULT_CURRICULUM_MODULE_COUNTS[foundLang][lvlKey];
  }
  return 0;
}

// -----------------------------------------------------------------------------
// ACHIEVEMENT CATALOG (SINGLE SOURCE OF TRUTH)
// -----------------------------------------------------------------------------
const achievementCatalog = [
  // 📚 1. PROGRESS (Berdasarkan jumlah modul selesai)
  { title: 'First Step', category: 'Progress', xp: 10, description: 'Menyelesaikan 1 materi.', test: s => s.completed >= 1 },
  { title: 'Getting Started', category: 'Progress', xp: 25, description: 'Menyelesaikan 5 materi.', test: s => s.completed >= 5 },
  { title: 'Bookworm', category: 'Progress', xp: 50, description: 'Menyelesaikan 25 materi.', test: s => s.completed >= 25 },
  { title: 'Knowledge Seeker', category: 'Progress', xp: 75, description: 'Menyelesaikan 50 materi.', test: s => s.completed >= 50 },
  { title: 'Code Learner', category: 'Progress', xp: 150, description: 'Menyelesaikan 100 materi.', test: s => s.completed >= 100 },
  { title: 'Code Master', category: 'Progress', xp: 500, description: 'Menyelesaikan 250 materi.', test: s => s.completed >= 250 },

  // 🎓 2. LEVEL MASTERY (Menyelesaikan 100% modul pada level terkait untuk minimal satu bahasa)
  { title: 'Newbie Coder', category: 'Level', xp: 100, description: 'Menyelesaikan seluruh materi level Newbie/Beginner dari satu bahasa.', test: s => s.masteredLevels.beginner.size >= 1 },
  { title: 'Intermediate Coder', category: 'Level', xp: 250, description: 'Menyelesaikan seluruh materi level Explorer/Intermediate dari satu bahasa.', test: s => s.masteredLevels.explorer.size >= 1 },
  { title: 'Builder', category: 'Level', xp: 500, description: 'Menyelesaikan seluruh materi level Builder dari satu bahasa.', test: s => s.masteredLevels.builder.size >= 1 },
  { title: 'Language Master', category: 'Level', xp: 750, description: 'Menyelesaikan seluruh level (Beginner, Explorer, Builder) dari satu bahasa.', test: s => s.masteredLanguages.size >= 1 },

  // 💻 3. BAHASA (Mastery level dasar tiap bahasa)
  { title: 'Web Architect', category: 'Bahasa', xp: 250, description: 'Menyelesaikan materi dasar HTML.', test: s => s.masteredLevels.beginner.has('HTML') },
  { title: 'Stylist', category: 'Bahasa', xp: 250, description: 'Menyelesaikan materi dasar CSS.', test: s => s.masteredLevels.beginner.has('CSS') },
  { title: 'Script Runner', category: 'Bahasa', xp: 250, description: 'Menyelesaikan materi dasar JavaScript.', test: s => s.masteredLevels.beginner.has('JavaScript') },
  { title: 'Python Tamer', category: 'Bahasa', xp: 250, description: 'Menyelesaikan materi dasar Python.', test: s => s.masteredLevels.beginner.has('Python') },
  { title: 'C++ Engineer', category: 'Bahasa', xp: 250, description: 'Menyelesaikan materi dasar C++.', test: s => s.masteredLevels.beginner.has('C++') },
  { title: 'Block Master', category: 'Bahasa', xp: 250, description: 'Menyelesaikan materi dasar Scratch.', test: s => s.masteredLevels.beginner.has('Scratch') },

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

  // 🔥 6. STREAK (Aktif dengan backend daily tracker)
  { title: 'On Fire', category: 'Streak', xp: 50, description: 'Belajar 3 hari berturut-turut.', test: s => s.streak >= 3 },
  { title: 'Keep Going', category: 'Streak', xp: 100, description: 'Belajar 7 hari berturut-turut.', test: s => s.streak >= 7 },
  { title: 'Unstoppable', category: 'Streak', xp: 250, description: 'Belajar 14 hari berturut-turut.', test: s => s.streak >= 14 },
  { title: 'Dedicated Coder', category: 'Streak', xp: 500, description: 'Belajar 30 hari berturut-turut.', test: s => s.streak >= 30 },
  { title: 'Legendary Streak', category: 'Streak', xp: 1000, description: 'Belajar 100 hari berturut-turut.', test: s => s.streak >= 100 },

  // 🧭 7. EXPLORATION
  { title: 'Explorer', category: 'Exploration', xp: 50, description: 'Mempelajari 2 bahasa berbeda.', test: s => s.languageCount >= 2 },
  { title: 'Code Traveler', category: 'Exploration', xp: 100, description: 'Mempelajari 3 bahasa berbeda.', test: s => s.languageCount >= 3 },
  { title: 'Polyglot Coder', category: 'Exploration', xp: 250, description: 'Mempelajari 5 bahasa berbeda.', test: s => s.languageCount >= 5 },
  { title: 'Code Polyglot', category: 'Exploration', xp: 2000, description: 'Menyelesaikan level Newbie pada seluruh 6 bahasa.', test: s => s.masteredLevels.beginner.size >= 6 },

  // 🧩 8. KOMBINASI
  { title: 'Web Developer', category: 'Combination', xp: 300, description: 'Selesaikan HTML, CSS, dan JavaScript Newbie.', test: s => s.masteredLevels.beginner.has('HTML') && s.masteredLevels.beginner.has('CSS') && s.masteredLevels.beginner.has('JavaScript') },
  { title: 'Frontend Developer', category: 'Combination', xp: 500, description: 'Selesaikan HTML, CSS, dan JavaScript Intermediate.', test: s => s.masteredLevels.explorer.has('HTML') && s.masteredLevels.explorer.has('CSS') && s.masteredLevels.explorer.has('JavaScript') },
  { title: 'Algorithmic Mind', category: 'Combination', xp: 700, description: 'Selesaikan C++ Intermediate dan 20 materi.', test: s => s.masteredLevels.explorer.has('C++') && s.completed >= 20 },

  // 👀 9. RAHASIA (Dinonaktifkan sementara hingga tracker perilaku aktif)
  { title: 'Curious Coder', category: 'Secret', xp: 100, description: 'Mempelajari 4 bahasa pemrograman.', secret: true, test: s => s.languageCount >= 4 },
  { title: 'Night Owl', category: 'Secret', xp: 100, description: 'Secret Achievement.', secret: true, test: () => false },
  { title: 'Early Bird', category: 'Secret', xp: 100, description: 'Secret Achievement.', secret: true, test: () => false },
  { title: 'Perfectionist', category: 'Secret', xp: 200, description: 'Secret Achievement.', secret: true, test: () => false },
  { title: 'Clean Coder', category: 'Secret', xp: 200, description: 'Secret Achievement.', secret: true, test: () => false },

  // 🏆 10. MILESTONE BESAR
  { title: 'Ultimate Code Master', category: 'Milestone', xp: 2000, description: 'Menyelesaikan seluruh level Builder dari satu bahasa.', test: s => s.masteredLevels.builder.size >= 1 },
  { title: 'Grand Builder', category: 'Milestone', xp: 3000, description: 'Menyelesaikan project dari 3 bahasa dan 1 level Builder.', test: s => s.projectLanguages >= 3 && s.masteredLevels.builder.size >= 1 },
  { title: 'Legend', category: 'Milestone', xp: 5000, description: 'Menyelesaikan seluruh 346 materi kurikulum.', test: s => s.completed >= 346 },
  { title: 'Polyglot Master', category: 'Milestone', xp: 4000, description: 'Menyelesaikan seluruh level dari 5 bahasa.', test: s => s.masteredLanguages.size >= 5 }
];

// Helper: Normalize language name string
function normalizeLanguageName(rawName) {
  if (!rawName) return 'CodeKids';
  const l = rawName.trim().toLowerCase();
  if (l === 'html') return 'HTML';
  if (l === 'css') return 'CSS';
  if (l === 'javascript' || l === 'js') return 'JavaScript';
  if (l === 'python' || l === 'py') return 'Python';
  if (l === 'c++' || l === 'cpp') return 'C++';
  if (l === 'scratch') return 'Scratch';
  return rawName.trim();
}

// -----------------------------------------------------------------------------
// ACHIEVEMENT STATS CALCULATOR
// -----------------------------------------------------------------------------
function achievementStats(user) {
  const progress = Object.values(user.progress || {});
  const completed = progress.filter(item => item && item.completed);

  // Group completed modules count by (language, level)
  const completedByLangLevel = {};
  const languages = {};
  const projectLanguages = new Set();

  completed.forEach(item => {
    const lang = normalizeLanguageName(item.language);
    const level = (item.level === 'newbie' ? 'beginner' : (item.level || 'beginner')).toLowerCase();
    
    languages[lang] = (languages[lang] || 0) + 1;
    
    if (!completedByLangLevel[lang]) {
      completedByLangLevel[lang] = { beginner: 0, explorer: 0, builder: 0 };
    }
    if (completedByLangLevel[lang][level] !== undefined) {
      completedByLangLevel[lang][level] += 1;
    }

    if (item.title && item.title.toLowerCase().includes('project')) {
      projectLanguages.add(lang);
    }
  });

  // Calculate full level masteries per language (100% completed of level's total modules)
  const masteredLevels = {
    beginner: new Set(),
    explorer: new Set(),
    builder: new Set()
  };
  const masteredLanguages = new Set();

  Object.entries(completedByLangLevel).forEach(([lang, levelsCount]) => {
    ['beginner', 'explorer', 'builder'].forEach(lvl => {
      const required = getCurriculumModuleCount(lang, lvl);
      if (required > 0 && levelsCount[lvl] >= required) {
        masteredLevels[lvl].add(lang);
      }
    });

    if (masteredLevels.beginner.has(lang) && masteredLevels.explorer.has(lang) && masteredLevels.builder.has(lang)) {
      masteredLanguages.add(lang);
    }
  });

  const streakCount = user && user.streak && typeof user.streak.current === 'number'
    ? user.streak.current
    : (user && user.streak && typeof user.streak.count === 'number' ? user.streak.count : 0);

  return {
    completed: completed.length,
    challenges: completed.length,
    projects: completed.filter(item => item.title && item.title.toLowerCase().includes('project')).length,
    projectLanguages: projectLanguages.size,
    languages,
    languageCount: Object.keys(languages).length,
    masteredLevels,
    masteredLanguages,
    streak: streakCount,
    totalActivities: completed.length
  };
}

// -----------------------------------------------------------------------------
// ACHIEVEMENT NORMALIZER & EVALUATOR
// -----------------------------------------------------------------------------
function normalizeAchievementItem(item) {
  if (!item) return null;
  if (typeof item === 'string') {
    const title = item.trim();
    const match = achievementCatalog.find(c => c.title.toLowerCase() === title.toLowerCase());
    return {
      title,
      category: match ? match.category : 'General',
      description: match ? match.description : `Pencapaian: ${title}`,
      xp: match ? match.xp : 10,
      secret: match ? !!match.secret : false,
      earnedAt: new Date().toISOString()
    };
  }
  if (typeof item === 'object') {
    const title = (item.title || item.name || '').trim();
    if (!title) return null;
    const match = achievementCatalog.find(c => c.title.toLowerCase() === title.toLowerCase());
    return {
      title,
      category: item.category || (match ? match.category : 'General'),
      description: item.description || (match ? match.description : ''),
      xp: typeof item.xp === 'number' ? item.xp : (match ? match.xp : 10),
      secret: typeof item.secret === 'boolean' ? item.secret : (match ? !!match.secret : false),
      earnedAt: item.earnedAt || new Date().toISOString()
    };
  }
  return null;
}

function evaluateAchievements(user) {
  if (!user) return user;

  // 1. Normalize existing achievements array safely
  const rawAchievements = Array.isArray(user.achievements) ? user.achievements : [];
  const normalizedList = [];
  const seenTitles = new Set();

  rawAchievements.forEach(rawItem => {
    const item = normalizeAchievementItem(rawItem);
    if (item && !seenTitles.has(item.title.toLowerCase())) {
      seenTitles.add(item.title.toLowerCase());
      normalizedList.push(item);
    }
  });

  user.achievements = normalizedList;
  const stats = achievementStats(user);

  // 2. Evaluate catalog rules
  achievementCatalog.forEach(catalogItem => {
    const titleLower = catalogItem.title.toLowerCase();
    if (!seenTitles.has(titleLower)) {
      try {
        if (catalogItem.test(stats)) {
          seenTitles.add(titleLower);
          user.achievements.push({
            title: catalogItem.title,
            category: catalogItem.category,
            description: catalogItem.description,
            xp: catalogItem.xp,
            secret: !!catalogItem.secret,
            earnedAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn(`Error evaluating achievement rule '${catalogItem.title}':`, err);
      }
    }
  });

  // 3. Compute XP deterministically, preserving any higher admin-assigned XP balance
  const calculatedAchievementXp = user.achievements.reduce((total, item) => total + (item.xp || 0), 0);
  user.xp = Math.max(user.xp || 0, calculatedAchievementXp);

  return user;
}

// -----------------------------------------------------------------------------
// 🏅 SISTEM BADGE XP & TIERS
// -----------------------------------------------------------------------------
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

