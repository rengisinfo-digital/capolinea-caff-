/**
 * Capolinea Caffè & Ristorante — Fermo
 * Interactive Navigation, Editorial Sliders & Menu Spotlight
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. FULL-SCREEN DARK OVERLAY MENU (Screenshot 17.55.23)
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navOverlay = document.getElementById('nav-overlay');
  const overlayLinks = document.querySelectorAll('.nav-overlay-link');

  function toggleMenu(forceState) {
    const isOpen =
      typeof forceState === 'boolean'
        ? forceState
        : !document.body.classList.contains('menu-open');

    document.body.classList.toggle('menu-open', isOpen);
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    }
    if (navOverlay) {
      navOverlay.setAttribute('aria-hidden', String(!isOpen));
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => toggleMenu());
  }

  overlayLinks.forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
      toggleMenu(false);
    }
  });

  /* ==========================================================================
     2. HERO IMMERSIVE SLIDESHOW (Screenshot 17.54.00)
     ========================================================================== */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentHeroIndex = 0;
  let heroInterval = null;

  function setHeroSlide(index) {
    currentHeroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('opacity-100', i === currentHeroIndex);
      slide.classList.toggle('opacity-0', i !== currentHeroIndex);
    });
    heroDots.forEach((dot, i) => {
      if (i === currentHeroIndex) {
        dot.classList.remove('bg-white/40');
        dot.classList.add('bg-capolinea-gold');
      } else {
        dot.classList.remove('bg-capolinea-gold');
        dot.classList.add('bg-white/40');
      }
    });
  }

  function startHeroTimer() {
    clearInterval(heroInterval);
    heroInterval = setInterval(() => {
      setHeroSlide(currentHeroIndex + 1);
    }, 5500);
  }

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIdx = Number(dot.getAttribute('data-slide') || 0);
      setHeroSlide(slideIdx);
      startHeroTimer();
    });
  });

  if (heroSlides.length > 1) {
    startHeroTimer();
  }

  /* ==========================================================================
     3. SPECIALTIES / MENU SPOTLIGHT (Screenshot 17.54.43)
        Strictly using only verified Category 1 Food & Drink Photography
     ========================================================================== */
  const ASSET_BASE = 'assets/images/';

  const menuCatalog = {
    primi: {
      label: 'Primi & Pasta Fresca',
      hours: 'Tutti i giorni · Pranzo 12:00 - 15:00 · Cena 19:30 - 23:30',
      copy: `
        <p>
          La nostra cucina celebra l'eccellenza della pasta all'uovo marchigiana, dai leggendari <strong class="font-semibold text-black">Maccheroncini e Tagliatelle di Campofilone IGT</strong> ai ravioli chiusi a mano ogni mattina.
        </p>
        <p>
          Sughi lenti della tradizione, funghi porcini, guanciale croccante e pecorino stagionato si alternano a condimenti creativi che valorizzano le materie prime di stagione.
        </p>
      `,
      dishes: [
        {
          title: 'Mezze Maniche del Capolinea',
          desc: 'Sugo ricco, funghi, guanciale croccante, pecorino e basilico fresco',
          img: ASSET_BASE + '2026-07-04_18-27-07_UTC.jpg',
        },
        {
          title: 'Ravioli Fatti a Mano ai Pistacchi e Guanciale',
          desc: 'Sfoglia fresca all\'uovo, pomodorino confit, guanciale e granella di pistacchio',
          img: ASSET_BASE + '2022-09-16_11-45-49_UTC.webp',
        },
        {
          title: 'Maccheroncini di Campofilone IGT al Ragù',
          desc: 'Sottilissimi fili d\'uovo con ragù tradizionale marchigiano a lenta cottura',
          img: ASSET_BASE + '2025-02-12_20-19-15_UTC.webp',
        },
        {
          title: 'Tagliatelle ai Funghi Porcini & Ragù',
          desc: 'Servite su ceramica decorata a mano con prezzemolo fresco e profumi di bosco',
          img: ASSET_BASE + '2022-10-12_12-32-36_UTC.webp',
        },
      ],
    },
    mare: {
      label: "Mare dell'Adriatico",
      hours: 'Pesce fresco selezionato · Pranzo & Cena',
      copy: `
        <p>
          Il profumo della vicina costa adriatica arriva in tavola attraverso <strong class="font-semibold text-black">crudi, crostacei e grandi classici di mare</strong> preparati al momento.
        </p>
        <p>
          Dalle linguine all'astice ai paccheri con scampi freschi fino al baccalà su crema di nero di seppia o in umido con patate e olive.
        </p>
      `,
      dishes: [
        {
          title: 'Paccheri agli Scampi dell\'Adriatico',
          desc: 'Scampi interi freschissimi, pomodorini datterini e prezzemolo',
          img: ASSET_BASE + '2023-05-17_12-50-29_UTC.webp',
        },
        {
          title: 'Linguine all\'Astice',
          desc: 'Mezzo astice reale in bellavista con sugo leggero di crostacei e datterini',
          img: ASSET_BASE + '2023-04-29_13-08-49_UTC.webp',
        },
        {
          title: 'Trancio di Baccalà su Specchio al Nero di Seppia',
          desc: 'Filetto morbido con pomodorini confit arrostiti e crema vellutata al nero',
          img: ASSET_BASE + '2023-04-29_13-04-21_UTC.webp',
        },
        {
          title: 'Spaghetti alle Vongole Veraci',
          desc: 'Vongole dell\'Adriatico, aglio dorato, olio extravergine marchigiano e prezzemolo',
          img: ASSET_BASE + '2023-12-24_12-48-00_UTC.webp',
        },
      ],
    },
    carni: {
      label: 'Carni & Tartare',
      hours: 'Selezioni Marchigiane · Pranzo & Cena',
      copy: `
        <p>
          Per gli amanti dei sapori di terra, selezioniamo <strong class="font-semibold text-black">carni pregiate di scottona</strong> per tartare battute al coltello, tagliate ed entrecôte alla griglia.
        </p>
        <p>
          Completano il percorso i fritti dorati della tradizione e le polpette servite sulle iconiche maioliche dipinte a mano.
        </p>
      `,
      dishes: [
        {
          title: 'Tartare di Scottona Gourmet',
          desc: 'Battuta al coltello con pinoli tostati, tuorlo marinato, confit e corallo croccante',
          img: ASSET_BASE + '2025-02-13_21-49-22_UTC.webp',
        },
        {
          title: 'Tagliata di Manzo al Rosmarino e Pepe Rosa',
          desc: 'Cottura alla brace, sale Maldon in fiocchi, pepe rosa e olio nuovo',
          img: ASSET_BASE + '2024-01-21_19-39-30_UTC.webp',
        },
        {
          title: 'Entrecôte alla Griglia ai Profumi Mediterranei',
          desc: 'Taglio nobile succoso servito con rametti di rosmarino fresco e grani aromatici',
          img: ASSET_BASE + '2024-01-28_19-22-26_UTC.webp',
        },
        {
          title: 'Polpette Dorate su Maiolica Artigianale',
          desc: 'Croccanti fuori e morbide dentro, con riduzione di pomodoro dolce e basilico',
          img: ASSET_BASE + '2025-07-12_13-00-03_UTC.webp',
        },
      ],
    },
    dolci: {
      label: 'Dolci & Caffetteria',
      hours: 'Tutti i giorni · Colazione dalle 07:30 & Fine Pasto',
      copy: `
        <p>
          Dalla prima colazione al dessert serale, la <strong class="font-semibold text-black">pasticceria interna del Capolinea</strong> firma dolci al cucchiaio, torte farcite e creazioni golose.
        </p>
        <p>
          Il nostro celebre tiramisù in coppa, la cheesecake ai frutti di bosco e il tortino dal cuore caldo al cioccolato rendono unico ogni momento della giornata.
        </p>
      `,
      dishes: [
        {
          title: 'Coppa Diplomatica alle Fragole Fresche',
          desc: 'Strati di crema vellutata, fragole fresche a cubetti e foglioline di menta',
          img: ASSET_BASE + '2026-05-27_00-48-22_UTC.jpg',
        },
        {
          title: 'Il Nostro Tiramisù in Coppa su Maiolica',
          desc: 'Crema al mascarpone artigianale, espresso della casa e cacao amaro',
          img: ASSET_BASE + '2023-09-05_12-10-54_UTC.webp',
        },
        {
          title: 'Cheesecake ai Frutti di Bosco e Ribes',
          desc: 'Base croccante, crema soffice e coulis lucido di ribes rossi e mirtilli',
          img: ASSET_BASE + '2022-09-16_12-26-31_UTC.webp',
        },
        {
          title: 'Tortino al Cioccolato dal Cuore Caldo',
          desc: 'Servito tiepido con ciuffo di panna montata e decorazione al cioccolato fondente',
          img: ASSET_BASE + '2024-01-09_15-17-44_UTC_1.webp',
        },
      ],
    },
  };

  let activeCategoryKey = 'primi';
  let activeDishIndex = 0;

  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const hoursEl = document.getElementById('menu-category-hours');
  const copyEl = document.getElementById('menu-category-copy');
  const dishesListEl = document.getElementById('menu-dishes-list');
  const showcaseImg = document.getElementById('dish-showcase-img');
  const showcaseTag = document.getElementById('dish-showcase-tag');
  const showcaseTitle = document.getElementById('dish-showcase-title');
  const peekImg = document.getElementById('dish-peek-img');

  function updateDishShowcase() {
    const category = menuCatalog[activeCategoryKey];
    if (!category) return;
    const dishes = category.dishes;
    const currentDish = dishes[activeDishIndex];
    const nextDish = dishes[(activeDishIndex + 1) % dishes.length];

    if (showcaseImg) {
      showcaseImg.style.opacity = '0.35';
      setTimeout(() => {
        showcaseImg.src = currentDish.img;
        showcaseImg.alt = currentDish.title;
        showcaseImg.style.opacity = '1';
      }, 140);
    }
    if (showcaseTag) {
      showcaseTag.textContent = `${category.label} · 0${activeDishIndex + 1} / 0${dishes.length}`;
    }
    if (showcaseTitle) {
      showcaseTitle.textContent = currentDish.title;
    }
    if (peekImg && nextDish) {
      peekImg.src = nextDish.img;
      peekImg.alt = nextDish.title;
    }

    // Highlight active dish row in the left list
    const rows = dishesListEl ? dishesListEl.querySelectorAll('[data-dish-index]') : [];
    rows.forEach((row, idx) => {
      const numBadge = row.querySelector('span');
      const titleH4 = row.querySelector('h4');
      if (idx === activeDishIndex) {
        row.classList.add('bg-capolinea-ivory/70', 'px-3', '-mx-3');
        if (numBadge) {
          numBadge.classList.remove('text-capolinea-muted', 'font-light');
          numBadge.classList.add('text-capolinea-goldDark', 'font-semibold');
        }
        if (titleH4) {
          titleH4.classList.add('text-capolinea-burgundy');
        }
      } else {
        row.classList.remove('bg-capolinea-ivory/70', 'px-3', '-mx-3');
        if (numBadge) {
          numBadge.classList.add('text-capolinea-muted', 'font-light');
          numBadge.classList.remove('text-capolinea-goldDark', 'font-semibold');
        }
        if (titleH4) {
          titleH4.classList.remove('text-capolinea-burgundy');
        }
      }
    });
  }

  function renderCategory(categoryKey) {
    if (!menuCatalog[categoryKey]) return;
    activeCategoryKey = categoryKey;
    activeDishIndex = 0;
    const category = menuCatalog[categoryKey];

    // Update Pill Buttons
    tabBtns.forEach((btn) => {
      const isSelected = btn.getAttribute('data-category') === categoryKey;
      btn.setAttribute('aria-selected', String(isSelected));
      if (isSelected) {
        btn.className =
          'menu-tab-btn px-5 py-2 rounded-full text-[13px] font-normal tracking-wide transition-all bg-black text-white';
      } else {
        btn.className =
          'menu-tab-btn px-5 py-2 rounded-full text-[13px] font-normal tracking-wide transition-all bg-capolinea-ivory text-capolinea-charcoal hover:bg-capolinea-gold/20';
      }
    });

    if (hoursEl) hoursEl.textContent = category.hours;
    if (copyEl) copyEl.innerHTML = category.copy;

    if (dishesListEl) {
      dishesListEl.innerHTML = category.dishes
        .map(
          (dish, idx) => `
          <div class="py-3.5 flex items-baseline justify-between gap-4 cursor-pointer group transition-all" data-dish-index="${idx}">
            <div>
              <h4 class="text-[15px] font-medium text-black group-hover:text-capolinea-goldDark transition-colors">${dish.title}</h4>
              <p class="text-[13px] text-capolinea-muted font-light">${dish.desc}</p>
            </div>
            <span class="text-xs uppercase tracking-widest text-capolinea-muted font-light shrink-0">0${idx + 1}</span>
          </div>
        `
        )
        .join('');

      dishesListEl.querySelectorAll('[data-dish-index]').forEach((row) => {
        row.addEventListener('click', () => {
          activeDishIndex = Number(row.getAttribute('data-dish-index') || 0);
          updateDishShowcase();
        });
      });
    }

    updateDishShowcase();
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      if (cat) renderCategory(cat);
    });
  });

  // Connect 3-Column Experience Cards to Menu Filters
  document.querySelectorAll('.moment-trigger').forEach((link) => {
    link.addEventListener('click', () => {
      const targetCat = link.getAttribute('data-filter-target');
      if (targetCat) renderCategory(targetCat);
    });
  });

  function stepDish(delta) {
    const dishes = menuCatalog[activeCategoryKey].dishes;
    activeDishIndex = (activeDishIndex + delta + dishes.length) % dishes.length;
    updateDishShowcase();
  }

  const prevDishBtn = document.getElementById('dish-prev-btn');
  const nextPeekBtn = document.getElementById('dish-next-peek');
  const prevMobileBtn = document.getElementById('dish-prev-mobile');
  const nextMobileBtn = document.getElementById('dish-next-mobile');

  if (prevDishBtn) prevDishBtn.addEventListener('click', () => stepDish(-1));
  if (nextPeekBtn) nextPeekBtn.addEventListener('click', () => stepDish(1));
  if (prevMobileBtn) prevMobileBtn.addEventListener('click', () => stepDish(-1));
  if (nextMobileBtn) nextMobileBtn.addEventListener('click', () => stepDish(1));

  // Initialize default category styling
  renderCategory('primi');

  /* ==========================================================================
     4. BURGUNDY PROMOTIONAL / EXPERIENCE BANNER SLIDER (Screenshot 17.54.23)
     ========================================================================== */
  const bannerExperiences = [
    {
      pill: 'CANTINA & COCKTAIL DINNER',
      title: "Le Grandi Cantine Marchigiane & Serate d'Autore",
      desc: 'Dall\'aperitivo al dopocena, il Capolinea accompagna ogni piatto con una selezione curata delle migliori etichette del territorio — <strong class="font-medium text-capolinea-goldLight">Podere Santa Lucia, Velenosi, Cantina d\'Ercoli, Il Conte Villa Prandone e Cherri d\'Acquaviva</strong> — insieme a Cocktail Dinner ed eventi esclusivi nel cuore di Fermo.',
      img: ASSET_BASE + '2024-01-07_20-34-17_UTC.webp',
    },
    {
      pill: 'EVENTI PRIVATI & RICORRENZE',
      title: 'Il Tuo Evento Sotto le Volte Storiche di Fermo',
      desc: 'Dalle cene aziendali alle lauree e ricorrenze in famiglia, progettiamo menu personalizzati di carne o di pesce nelle nostre sale storiche con volte in mattoni o nella veranda riservata.',
      img: ASSET_BASE + '2023-02-15_20-13-03_UTC_1.webp',
    },
    {
      pill: 'DAL MATTINO ALLA SERA',
      title: 'Il Rito del Caffè & Pasticceria Artigianale',
      desc: 'Ogni giornata inizia al bancone storico del Capolinea con miscele d\'espresso selezionate, cappuccini cremosi e dolci sfornati dalla nostra cucina per una pausa di puro piacere.',
      img: ASSET_BASE + '2021-12-17_02-54-55_UTC.jpg',
    },
  ];

  let currentEventIdx = 0;
  const eventPillEl = document.getElementById('event-pill');
  const eventTitleEl = document.getElementById('event-title');
  const eventDescEl = document.getElementById('event-description');
  const bannerSlideImg = document.getElementById('banner-slide-img');
  const eventNextBtn = document.getElementById('event-next-btn');
  const eventPrevBtn = document.getElementById('event-prev-btn');

  function updateBannerExperience(newIndex) {
    currentEventIdx = (newIndex + bannerExperiences.length) % bannerExperiences.length;
    const item = bannerExperiences[currentEventIdx];
    if (eventPillEl) eventPillEl.textContent = item.pill;
    if (eventTitleEl) eventTitleEl.textContent = item.title;
    if (eventDescEl) eventDescEl.innerHTML = item.desc;
    if (bannerSlideImg) bannerSlideImg.src = item.img;
  }

  if (eventNextBtn) {
    eventNextBtn.addEventListener('click', () => updateBannerExperience(currentEventIdx + 1));
  }
  if (eventPrevBtn) {
    eventPrevBtn.addEventListener('click', () => updateBannerExperience(currentEventIdx - 1));
  }

  /* ==========================================================================
     5. INTERSECTION OBSERVER SCROLL REVEAL
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-up');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});
