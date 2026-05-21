import {
  db,
  collection,
  getDocs,
  query,
  orderBy
} from "./firebase.js";

const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");
const pageTitle = document.getElementById("pageTitle");
const videoCount = document.getElementById("videoCount");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const menuBtn = document.getElementById("menuBtn");

let allVideos = [];
let currentSort = "popular";
let currentTag = "all";
let visibleCount = 12;

window.enterSite = function () {
  const ageGate = document.getElementById("ageGate");
  if (ageGate) ageGate.style.display = "none";
  localStorage.setItem("age_ok", "yes");
};

if (localStorage.getItem("age_ok") === "yes") {
  const ageGate = document.getElementById("ageGate");
  if (ageGate) ageGate.style.display = "none";
}

window.toggleTagMenu = function () {
  const menu = document.getElementById("tagMenu");
  if (!menu) return;

  menu.classList.toggle("show");

  const isOpen = menu.classList.contains("show");
  if (menuBtn) menuBtn.textContent = isOpen ? "× Закрыть меню" : "☰ Открыть меню";
};

menuBtn?.addEventListener("click", window.toggleTagMenu);

function normalizeTags(tags) {
  if (!tags) return [];

  if (Array.isArray(tags)) {
    return tags.map(t => String(t).trim()).filter(Boolean);
  }

  return String(tags)
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
}

function viewsNumber(value) {
  const n = parseFloat(String(value || "0").replace(",", ".")) || 0;
  const t = String(value || "").toLowerCase();

  if (t.includes("m")) return n * 1000000;
  if (t.includes("k")) return n * 1000;

  return n;
}

function randomWatching(id) {
  return 20 + (String(id).split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 17) % 480;
}

function createCard(v) {
  const a = document.createElement("a");

  a.href = `video.html?id=${v.id}`;
  a.className = "card video-card";

  a.innerHTML = `
    <div class="thumb-wrap">
      <img src="${v.image || "preview.jpg"}" class="thumb" loading="lazy">
      <video src="${v.video || ""}" muted playsinline preload="metadata" class="hover-preview"></video>
      ${v.premium ? '<span class="badge">Premium</span>' : ''}
      <span class="duration">${v.duration || "0:00"}</span>
    </div>

    <h3>${v.title || "Без названия"}</h3>

    <div class="meta">
      <span>👁 ${v.views || "0"}</span>
      <span>🟢 ${randomWatching(v.id)} смотрят</span>
      <span>🏷 ${v.category || "новое"}</span>
    </div>
  `;

  const video = a.querySelector(".hover-preview");
  const img = a.querySelector(".thumb");

  function preview() {
    if (!video || !v.video) return;

    img.style.opacity = ".2";
    video.style.opacity = "1";

    try {
      video.currentTime = Math.min(2 + Math.random() * 8, 10);
    } catch (e) {}

    video.play().catch(() => {});
  }

  function stop() {
    if (!video) return;

    video.pause();
    video.style.opacity = "0";
    img.style.opacity = "1";
  }

  a.addEventListener("touchstart", preview, { passive: true });
  a.addEventListener("mouseenter", preview);
  a.addEventListener("mouseleave", stop);
  a.addEventListener("touchend", () => setTimeout(stop, 650), { passive: true });

  return a;
}

function renderVideos(list) {
  if (!grid) return;

  const visible = list.slice(0, visibleCount);

  grid.innerHTML = "";

  if (videoCount) {
    videoCount.textContent = `${list.length} видео`;
  }

  if (!visible.length) {
    grid.innerHTML = `<div class="empty-state"><h3>Пока нет видео</h3><p>Добавь ролики через Admin.</p></div>`;
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  visible.forEach(v => grid.appendChild(createCard(v)));

  if (loadMoreBtn) {
    loadMoreBtn.style.display = visible.length < list.length ? "block" : "none";
  }
}

function buildTags() {
  if (!categoryList) return;

  const tags = new Set();

  allVideos.forEach(v => {
    normalizeTags(v.tags).forEach(t => tags.add(t));

    if (v.category) tags.add(v.category);

    if (Array.isArray(v.models)) {
      v.models.forEach(m => tags.add(m));
    }
  });

  categoryList.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.className = "category-btn active";
  allBtn.type = "button";
  allBtn.textContent = "+ все";
  allBtn.onclick = () => selectTag("all", allBtn);
  categoryList.appendChild(allBtn);

  [...tags]
    .filter(Boolean)
    .slice(0, 120)
    .forEach(tag => {
      const btn = document.createElement("button");
      btn.className = "category-btn";
      btn.type = "button";
      btn.textContent = `+ ${tag}`;

      btn.onclick = () => selectTag(tag, btn);

      categoryList.appendChild(btn);
    });
}

function selectTag(tag, btn) {
  currentTag = tag;
  visibleCount = 12;

  document
    .querySelectorAll(".category-btn")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");

  if (tag !== "all" && searchInput) {
    searchInput.value = tag;
  }

  filterVideos();
}

function filterVideos() {
  let list = [...allVideos];

  const s = searchInput?.value?.toLowerCase().trim();

  if (s) {
    list = list.filter(v => {
      const tags = normalizeTags(v.tags).join(" ").toLowerCase();
      const models = Array.isArray(v.models) ? v.models.join(" ").toLowerCase() : "";

      return (
        String(v.title || "").toLowerCase().includes(s) ||
        String(v.category || "").toLowerCase().includes(s) ||
        tags.includes(s) ||
        models.includes(s)
      );
    });
  }

  if (currentTag !== "all") {
    list = list.filter(v =>
      normalizeTags(v.tags).includes(currentTag) ||
      v.category === currentTag ||
      (Array.isArray(v.models) && v.models.includes(currentTag))
    );
  }

  if (currentSort === "new") {
    list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (pageTitle) pageTitle.textContent = "Новые видео";
  } else if (currentSort === "trend") {
    list.sort((a, b) => viewsNumber(b.views) - viewsNumber(a.views));
    if (pageTitle) pageTitle.textContent = "В тренде";
  } else if (currentSort === "premium") {
    list = list.filter(v => v.premium);
    if (pageTitle) pageTitle.textContent = "Премиум";
  } else {
    if (pageTitle) pageTitle.textContent = "Релевантные видео";
  }

  renderVideos(list);
}

window.setSort = function (type) {
  currentSort = type;
  visibleCount = 12;
  filterVideos();
};

searchInput?.addEventListener("input", () => {
  currentTag = "all";
  visibleCount = 12;

  document
    .querySelectorAll(".category-btn")
    .forEach(b => b.classList.remove("active"));

  const first = document.querySelector(".category-btn");
  if (first) first.classList.add("active");

  filterVideos();
});

loadMoreBtn?.addEventListener("click", () => {
  visibleCount += 12;
  filterVideos();
});

async function loadVideos() {
  try {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    allVideos = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    buildTags();
    filterVideos();
  } catch (e) {
    console.error(e);

    if (grid) {
      grid.innerHTML = `<div class="empty-state"><h3>Ошибка Firebase</h3><p>${e.message}</p></div>`;
    }
  }
}

loadVideos();
