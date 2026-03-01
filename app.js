/* =============================================
   Sakura壁纸 — App Logic
   ============================================= */

// ---------- Wallpaper Data ----------
const wallpapers = [
    {
        id: 1,
        file: 'src/city.png',
        title: '霓虹城市夜景',
        category: ['city', 'scenery'],
        type: 'pc'
    },
    {
        id: 2,
        file: 'src/illustration-anime-city.jpg',
        title: '插画 · 动漫城市',
        category: ['anime', 'city', 'illustration'],
        type: 'pc'
    },
    {
        id: 3,
        file: 'src/fantasy-scene-anime-style.jpg',
        title: '幻想场景 · 动漫风格',
        category: ['anime', 'illustration'],
        type: 'pc'
    },
    {
        id: 4,
        file: 'src/pexels-veeterzy-39811.jpg',
        title: '极光森林',
        category: ['scenery'],
        type: 'pc'
    },
    {
        id: 5,
        file: 'src/sky-meets-winter-landscape-cumulus-floats-generated-by-ai.jpg',
        title: '天空 · 冬日原野',
        category: ['scenery'],
        type: 'pc'
    },
    {
        id: 6,
        file: 'src/【哲风壁纸】光影-夜景-安静.png',
        title: '光影 · 夜景 · 安静',
        category: ['city', 'scenery'],
        type: 'pc'
    },
    {
        id: 7,
        file: 'src/【哲风壁纸】夕阳-夜空-天际线.png',
        title: '夕阳 · 夜空 · 天际线',
        category: ['scenery'],
        type: 'pc'
    },
    {
        id: 8,
        file: 'src/view.jpg',
        title: '城市风光',
        category: ['city', 'scenery'],
        type: 'pc'
    },
    {
        id: 9,
        file: 'src/100858431_p0_master1200.jpg',
        title: '插画精选',
        category: ['anime', 'illustration'],
        type: 'pc'
    },
    {
        id: 10,
        file: 'src/Asuka Langley (Evangelion).jpg',
        title: '明日香 · 新世纪福音战士',
        category: ['anime'],
        type: 'mobile'
    },
    {
        id: 11,
        file: 'src/Chisato_Nishikigi.png',
        title: '�的喜多 · 莉可丽丝',
        category: ['anime'],
        type: 'mobile'
    },
    {
        id: 12,
        file: 'src/GafgCH9bQAA3OEy.jpg',
        title: '动漫角色',
        category: ['anime'],
        type: 'mobile'
    },
    {
        id: 13,
        file: 'src/nayami.png',
        title: '少女心事',
        category: ['anime', 'illustration'],
        type: 'pc'
    },
    {
        id: 14,
        file: 'src/hd wallpaper.jpg',
        title: '高清壁纸精选',
        category: ['scenery'],
        type: 'pc'
    },
    {
        id: 15,
        file: 'src/thumb-1920-1281677.jpg',
        title: '动漫壁纸',
        category: ['anime'],
        type: 'pc'
    },
    {
        id: 16,
        file: 'src/download.jpg',
        title: '精选下载',
        category: ['anime', 'illustration'],
        type: 'mobile'
    }
];

// Hero featured images
const heroImages = [
    'src/city.png',
    'src/fantasy-scene-anime-style.jpg',
    'src/sky-meets-winter-landscape-cumulus-floats-generated-by-ai.jpg',
    'src/illustration-anime-city.jpg',
    'src/【哲风壁纸】夕阳-夜空-天际线.png'
];


// ---------- DOM Refs ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const galleryGrid = $('#gallery-grid');
const searchInput = $('#search-input');
const lightbox = $('#lightbox');
const lightboxImg = $('#lightbox-img');
const lightboxTitle = $('#lightbox-title');
const lightboxDownload = $('#lightbox-download');
const heroBg = $('#hero-bg');
const heroIndicators = $('#hero-indicators');
const backToTop = $('#back-to-top');

// ---------- State ----------
let currentFilter = 'all';
let currentCategoryNav = 'all';
let currentSort = 'default';
let searchQuery = '';
let lightboxIndex = -1;
let filteredList = [...wallpapers];
let heroIdx = 0;
let heroTimer = null;


// ---------- Render Gallery ----------
function getFilteredWallpapers() {
    let list = [...wallpapers];

    // Category nav filter
    if (currentCategoryNav === 'pc') {
        list = list.filter(w => w.type === 'pc');
    } else if (currentCategoryNav === 'mobile') {
        list = list.filter(w => w.type === 'mobile');
    } else if (currentCategoryNav === 'anime') {
        list = list.filter(w => w.category.includes('anime'));
    } else if (currentCategoryNav === 'scenery') {
        list = list.filter(w => w.category.includes('scenery'));
    }

    // Chip filter
    if (currentFilter !== 'all') {
        list = list.filter(w => w.category.includes(currentFilter));
    }

    // Search
    if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        list = list.filter(w =>
            w.title.toLowerCase().includes(q) ||
            w.category.some(c => c.includes(q))
        );
    }

    // Sort
    if (currentSort === 'name') {
        list.sort((a, b) => a.title.localeCompare(b.title, 'zh'));
    }

    return list;
}

function renderGallery() {
    filteredList = getFilteredWallpapers();

    if (filteredList.length === 0) {
        galleryGrid.innerHTML = '<div class="no-results">😕 没有找到匹配的壁纸，换个关键词试试？</div>';
        return;
    }

    galleryGrid.innerHTML = filteredList.map((w, i) => `
    <div class="wallpaper-card" data-index="${i}" style="animation-delay:${i * 0.06}s">
      <img src="${w.file}" alt="${w.title}" loading="lazy" />
      <div class="card-overlay">
        <span class="card-title">${w.title}</span>
        <div class="card-actions">
          <button class="card-btn preview-btn" data-action="preview" data-index="${i}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"/></svg>
            预览
          </button>
          <a class="card-btn download-btn" href="${w.file}" download="${w.title}" data-action="download" onclick="event.stopPropagation()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            下载
          </a>
        </div>
      </div>
    </div>
  `).join('');

    // Attach card click
    $$('.wallpaper-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="download"]')) return;
            const idx = parseInt(card.dataset.index);
            openLightbox(idx);
        });
    });
}


// ---------- Lightbox ----------
function openLightbox(idx) {
    lightboxIndex = idx;
    const w = filteredList[idx];
    lightboxImg.src = w.file;
    lightboxImg.alt = w.title;
    lightboxTitle.textContent = w.title;
    lightboxDownload.href = w.file;
    lightboxDownload.setAttribute('download', w.title);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

function navLightbox(dir) {
    if (filteredList.length === 0) return;
    lightboxIndex = (lightboxIndex + dir + filteredList.length) % filteredList.length;
    const w = filteredList[lightboxIndex];
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = w.file;
        lightboxImg.alt = w.title;
        lightboxTitle.textContent = w.title;
        lightboxDownload.href = w.file;
        lightboxDownload.setAttribute('download', w.title);
        lightboxImg.style.opacity = '1';
    }, 200);
}

$('#lightbox-close').addEventListener('click', closeLightbox);
$('#lightbox-overlay').addEventListener('click', closeLightbox);
$('#lightbox-prev').addEventListener('click', () => navLightbox(-1));
$('#lightbox-next').addEventListener('click', () => navLightbox(1));

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
});


// ---------- Hero Carousel ----------
function setHeroBg(idx) {
    heroBg.style.backgroundImage = `url('${heroImages[idx]}')`;
    // Update dots
    $$('.hero-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
}

function initHero() {
    // Create dots
    heroIndicators.innerHTML = heroImages.map((_, i) =>
        `<span class="hero-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></span>`
    ).join('');

    $$('.hero-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            heroIdx = parseInt(dot.dataset.idx);
            setHeroBg(heroIdx);
            resetHeroTimer();
        });
    });

    setHeroBg(0);
    startHeroTimer();
}

function startHeroTimer() {
    heroTimer = setInterval(() => {
        heroIdx = (heroIdx + 1) % heroImages.length;
        setHeroBg(heroIdx);
    }, 5000);
}

function resetHeroTimer() {
    clearInterval(heroTimer);
    startHeroTimer();
}


// ---------- Nav Links ----------
$$('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentCategoryNav = link.dataset.category;
        renderGallery();
    });
});


// ---------- Filter Chips ----------
$$('.filter-chip[data-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
        $$('.filter-chip[data-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter;
        renderGallery();
    });
});

$$('.filter-chip[data-sort]').forEach(chip => {
    chip.addEventListener('click', () => {
        $$('.filter-chip[data-sort]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentSort = chip.dataset.sort;
        renderGallery();
    });
});


// ---------- Search ----------
searchInput.addEventListener('input', () => {
    searchQuery = searchInput.value;
    renderGallery();
});

$('#search-btn').addEventListener('click', () => {
    searchQuery = searchInput.value;
    renderGallery();
});


// ---------- Theme Toggle ----------
const themeToggle = $('#theme-toggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'light' ? 'dark' : 'light');
});

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);


// ---------- Scroll Effects ----------
const header = $('#header');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header shadow
    header.classList.toggle('scrolled', scrollY > 20);

    // Back to top
    backToTop.classList.toggle('visible', scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    renderGallery();
});
