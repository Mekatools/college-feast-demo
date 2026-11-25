// =========================================================
// SCRIPT.JS — Makes the website interactive!
// Reads content from SITE_DATA (in data.js).
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  // Check if the user's device prefers reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  initInstagramLinks();
  initMobileNav();
  initCountdown();
  initStats(prefersReducedMotion);
  initEvents();
  initTeam();
  initGallery();
  initVolunteerForm();
  initScrollReveal(prefersReducedMotion);
});

/* ---------------------------------------------------------
   HELPER: Safe text escaping + Built-in Festival SVG Art
   --------------------------------------------------------- */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Generates crisp SVG festival artwork when an item has no real photo yet
function getMediaMarkup(item) {
  if (item.image && item.image.trim() !== "") {
    return `<img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" loading="lazy" />`;
  }

  const artPresets = {
    concert: {
      bg1: "#1e1548",
      bg2: "#ff4d2e",
      accent: "#ffb703",
      shape: `
        <polygon points="80,220 175,40 245,220" fill="rgba(255,183,3,0.22)"/>
        <polygon points="185,220 275,30 350,220" fill="rgba(0,180,216,0.24)"/>
        <circle cx="200" cy="110" r="36" fill="#ffb703" opacity="0.9"/>
        <path d="M40 190 Q120 140 200 185 T360 175 L400 240 L0 240 Z" fill="#131026" opacity="0.85"/>
      `
    },
    food: {
      bg1: "#ff6b35",
      bg2: "#ffb703",
      accent: "#ffffff",
      shape: `
        <rect x="65" y="95" width="270" height="115" rx="14" fill="rgba(19,16,38,0.85)"/>
        <path d="M55 95 L90 50 L310 50 L345 95 Z" fill="#ffffff" opacity="0.92"/>
        <circle cx="135" cy="150" r="24" fill="#ffb703"/>
        <circle cx="200" cy="150" r="24" fill="#ff4d2e"/>
        <circle cx="265" cy="150" r="24" fill="#00b4d8"/>
      `
    },
    neon: {
      bg1: "#0f0c29",
      bg2: "#7b2cbf",
      accent: "#00b4d8",
      shape: `
        <circle cx="200" cy="120" r="68" fill="none" stroke="#00b4d8" stroke-width="8" opacity="0.85"/>
        <circle cx="200" cy="120" r="42" fill="none" stroke="#ff4d2e" stroke-width="6" opacity="0.9"/>
        <polygon points="200,82 232,144 168,144" fill="#ffb703" opacity="0.92"/>
      `
    },
    crowd: {
      bg1: "#240046",
      bg2: "#ff4d2e",
      accent: "#ffb703",
      shape: `
        <circle cx="110" cy="125" r="22" fill="#ffb703"/>
        <circle cx="200" cy="105" r="26" fill="#ffffff"/>
        <circle cx="290" cy="125" r="22" fill="#00b4d8"/>
        <path d="M55 225 C55 170 165 170 165 225 Z" fill="#ffb703" opacity="0.88"/>
        <path d="M135 225 C135 155 265 155 265 225 Z" fill="#ffffff" opacity="0.92"/>
        <path d="M235 225 C235 170 345 170 345 225 Z" fill="#00b4d8" opacity="0.88"/>
      `
    },
    stage: {
      bg1: "#131026",
      bg2: "#00b4d8",
      accent: "#ffb703",
      shape: `
        <rect x="40" y="165" width="320" height="45" rx="8" fill="#ffb703"/>
        <circle cx="130" cy="95" r="28" fill="#ff4d2e" opacity="0.9"/>
        <circle cx="270" cy="95" r="28" fill="#ffffff" opacity="0.85"/>
        <rect x="175" y="70" width="50" height="80" rx="25" fill="#00b4d8"/>
      `
    },
    sunset: {
      bg1: "#ff4d2e",
      bg2: "#7b2cbf",
      accent: "#ffb703",
      shape: `
        <circle cx="200" cy="135" r="56" fill="#ffb703"/>
        <path d="M0 165 Q100 135 200 165 T400 155 L400 240 L0 240 Z" fill="#131026" opacity="0.85"/>
      `
    }
  };

  const theme = artPresets[item.artTheme] || artPresets.concert;
  const gradId = `grad-${item.artTheme}-${item.id}`;

  return `
    <svg viewBox="0 0 400 240" role="img" aria-label="${escapeHtml(item.title)} illustration" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${theme.bg1}" />
          <stop offset="100%" stop-color="${theme.bg2}" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#${gradId})" />
      ${theme.shape}
    </svg>
  `;
}

/* ---------------------------------------------------------
   1. INSTAGRAM LINKS
   --------------------------------------------------------- */
function initInstagramLinks() {
  const url = SITE_DATA.instagramUrl || "#";
  ["nav-ig-link", "section-ig-link", "footer-ig-link"].forEach((id) => {
    const link = document.getElementById(id);
    if (link) link.href = url;
  });
}

/* ---------------------------------------------------------
   2. MOBILE NAVIGATION MENU
   --------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after tapping any link on mobile
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   3. LIVE COUNTDOWN TIMER
   --------------------------------------------------------- */
function initCountdown() {
  const titleEl = document.getElementById("countdown-event-name");
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-minutes");
  const secsEl = document.getElementById("cd-seconds");
  const statusEl = document.getElementById("countdown-status");

  if (!titleEl || !SITE_DATA.nextFeast) return;

  titleEl.textContent = SITE_DATA.nextFeast.title;
  const targetTime = new Date(SITE_DATA.nextFeast.date).getTime();

  function updateClock() {
    const now = Date.now();
    const diff = targetTime - now;

    if (Number.isNaN(targetTime) || diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      statusEl.textContent = "🎉 It’s feast time! (Update the next date in data.js)";
      return false;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(mins).padStart(2, "0");
    secsEl.textContent = String(secs).padStart(2, "0");
    return true;
  }

  if (updateClock()) {
    const timer = setInterval(() => {
      if (!updateClock()) clearInterval(timer);
    }, 1000);
  }
}

/* ---------------------------------------------------------
   4. ANIMATED COUNTERS
   --------------------------------------------------------- */
function initStats(prefersReducedMotion) {
  const grid = document.getElementById("stats-grid");
  if (!grid || !SITE_DATA.stats) return;

  grid.innerHTML = SITE_DATA.stats
    .map(
      (stat) => `
      <div class="stat-card">
        <div class="stat-number" data-target="${stat.target}" data-suffix="${escapeHtml(stat.suffix)}">
          ${prefersReducedMotion ? stat.target + escapeHtml(stat.suffix) : "0" + escapeHtml(stat.suffix)}
        </div>
        <div class="stat-label">${escapeHtml(stat.label)}</div>
      </div>
    `
    )
    .join("");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    grid.querySelectorAll(".stat-number").forEach((el) => {
      el.textContent = el.dataset.target + el.dataset.suffix;
    });
    return;
  }

  let hasAnimated = false;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        grid.querySelectorAll(".stat-number").forEach(animateNumber);
        observer.disconnect();
      }
    },
    { threshold: 0.35 }
  );

  observer.observe(grid);
}

function animateNumber(el) {
  const target = Number(el.dataset.target);
  const suffix = el.dataset.suffix || "";
  const duration = 1100;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------
   5. EVENTS + UPCOMING / PAST FILTER
   --------------------------------------------------------- */
function initEvents() {
  const grid = document.getElementById("events-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (!grid || !SITE_DATA.events) return;

  function renderEvents(filter) {
    const filtered =
      filter === "all"
        ? SITE_DATA.events
        : SITE_DATA.events.filter((ev) => ev.category === filter);

    grid.innerHTML = filtered
      .map(
        (ev) => `
        <article class="event-card">
          <div class="event-media">
            ${getMediaMarkup(ev)}
            <span class="event-badge ${ev.category === "past" ? "is-past" : ""}">
              ${escapeHtml(ev.category)}
            </span>
          </div>
          <div class="event-body">
            <div class="event-meta">
              <span>${escapeHtml(ev.tag)}</span>
              <span>${escapeHtml(ev.date)}</span>
            </div>
            <h3>${escapeHtml(ev.title)}</h3>
            <p>${escapeHtml(ev.description)}</p>
          </div>
        </article>
      `
      )
      .join("");
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderEvents(btn.dataset.filter);
    });
  });

  renderEvents("all");
}

/* ---------------------------------------------------------
   6. TEAM CARDS (Tap / Click to Expand)
   --------------------------------------------------------- */
function initTeam() {
  const grid = document.getElementById("team-grid");
  if (!grid || !SITE_DATA.team) return;

  grid.innerHTML = SITE_DATA.team
    .map(
      (member) => `
      <button type="button" class="team-card" aria-expanded="false">
        <div class="team-top">
          <div class="team-avatar" data-accent="${escapeHtml(member.accent)}">
            ${escapeHtml(member.initials)}
          </div>
          <div class="team-heading">
            <h3>${escapeHtml(member.name)}</h3>
            <p class="team-role">${escapeHtml(member.role)}</p>
          </div>
          <span class="team-toggle-icon" aria-hidden="true">+</span>
        </div>
        <span class="team-hint">Tap to see responsibilities</span>
        <div class="team-details">
          <strong>Manages:</strong> ${escapeHtml(member.manages)}
        </div>
      </button>
    `
    )
    .join("");

  grid.querySelectorAll(".team-card").forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.classList.toggle("is-open");
      card.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

/* ---------------------------------------------------------
   7. GALLERY + LIGHTBOX (Click, Keyboard & Touch Swipe)
   --------------------------------------------------------- */
function initGallery() {
  const grid = document.getElementById("gallery-grid");
  const lightbox = document.getElementById("lightbox");
  const mediaBox = document.getElementById("lightbox-media");
  const captionEl = document.getElementById("lightbox-caption");
  const counterEl = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!grid || !lightbox || !SITE_DATA.gallery) return;

  const items = SITE_DATA.gallery;
  let currentIndex = 0;
  let touchStartX = 0;

  grid.innerHTML = items
    .map(
      (item, index) => `
      <button type="button" class="gallery-card" data-index="${index}" aria-label="Open ${escapeHtml(item.title)}">
        ${getMediaMarkup(item)}
        <div class="gallery-overlay">${escapeHtml(item.title)}</div>
      </button>
    `
    )
    .join("");

  function showSlide(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    mediaBox.innerHTML = getMediaMarkup(item);
    captionEl.textContent = `${item.title} — ${item.caption}`;
    counterEl.textContent = `${currentIndex + 1} / ${items.length}`;
  }

  function openLightbox(index) {
    showSlide(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  grid.querySelectorAll(".gallery-card").forEach((btn) => {
    btn.addEventListener("click", () => openLightbox(Number(btn.dataset.index)));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => showSlide(currentIndex + 1));

  // Close when tapping the dark background around the photo
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard support (Escape, Left, Right)
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
    if (e.key === "ArrowRight") showSlide(currentIndex + 1);
  });

  // Touch swipe support on phones
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diffX) > 45) {
        if (diffX < 0) showSlide(currentIndex + 1);
        else showSlide(currentIndex - 1);
      }
    },
    { passive: true }
  );
}

/* ---------------------------------------------------------
   8. VOLUNTEER FORM (Front-end Validation + Success State)
   --------------------------------------------------------- */
function initVolunteerForm() {
  const form = document.getElementById("volunteer-form");
  const successBox = document.getElementById("form-success");
  const successMsg = document.getElementById("success-message");
  const resetBtn = document.getElementById("reset-form-btn");

  if (!form || !successBox) return;

  const fields = {
    name: document.getElementById("vol-name"),
    contact: document.getElementById("vol-contact"),
    year: document.getElementById("vol-year"),
    role: document.getElementById("vol-role")
  };

  function setError(key, message) {
    const input = fields[key];
    const errEl = document.getElementById(`err-${key}`);
    if (!input || !errEl) return;
    errEl.textContent = message;
    input.classList.toggle("input-error", Boolean(message));
  }

  // Clear error message as soon as user edits a field
  Object.keys(fields).forEach((key) => {
    fields[key].addEventListener("input", () => setError(key, ""));
    fields[key].addEventListener("change", () => setError(key, ""));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const nameVal = fields.name.value.trim();
    const contactVal = fields.contact.value.trim();
    const yearVal = fields.year.value.trim();
    const roleVal = fields.role.value.trim();

    if (nameVal.length < 2) {
      setError("name", "Please enter your full name.");
      isValid = false;
    }

    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
    const digitsOnly = contactVal.replace(/\D/g, "");
    const looksLikePhone = digitsOnly.length >= 7 && digitsOnly.length <= 15;

    if (!looksLikeEmail && !looksLikePhone) {
      setError("contact", "Enter a valid phone number or college email.");
      isValid = false;
    }

    if (yearVal.length < 2) {
      setError("year", "Please enter your year or department.");
      isValid = false;
    }

    if (!roleVal) {
      setError("role", "Please select a preferred team.");
      isValid = false;
    }

    if (!isValid) return;

    /* HOW TO CONNECT THIS LATER (when your seniors approve the site):
       1. Create a free Formspree.io form (or Google Apps Script endpoint).
       2. Use fetch("https://formspree.io/f/your-id", { method: "POST", body: new FormData(form) })
          right here before showing the success box!
       For this demo, everything stays safely in the browser. */

    form.hidden = true;
    successBox.hidden = false;
    successMsg.textContent = `Thanks, ${nameVal}! Your demo application for "${roleVal}" is ready.`;
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    Object.keys(fields).forEach((key) => setError(key, ""));
    successBox.hidden = true;
    form.hidden = false;
  });
}

/* ---------------------------------------------------------
   9. SCROLL-REVEAL ANIMATIONS
   --------------------------------------------------------- */
function initScrollReveal(prefersReducedMotion) {
  const revealItems = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((el) => observer.observe(el));
}
