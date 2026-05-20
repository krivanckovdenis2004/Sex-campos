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
const loadMoreBtn = document.getElementById("loadMoreBtn");
const videoCount = document.getElementById("videoCount");
const pageTitle = document.getElementById("pageTitle");

let allVideos = [];
let currentCategory = "все";
let currentSort = "popular";
let visibleCount = 12;
const step = 12;

const categories = [
  "все",
  "русское",
  "грязные разговоры",
  "с разговорами",
  "pov",
  "измена",
  "красивое",
  "соблазнение девушки",
  "непостановочное",
  "спящие",
  "крупным планом",
  "чулки",
  "мжм",
  "жмж",
  "бдсм",
  "сексвайф",
  "в поезде",
  "в тренде",
  "новые"
];

window.enterSite = function () {
  document.getElementById("ageGate").style.display = "none";
  localStorage.setItem("age_ok", "yes");
};

if (localStorage.getItem("age_ok") === "yes" && document.getElementById("ageGate")) {
  document.getElementById("ageGate").style.display = "none";
}

window.openMenu = function () {
  document.getElementById("menuOverlay")?.classList.add("show");
  document.getElementById("sideMenu")?.classList.add("show");
};

window.closeMenu = function () {
  document.getElementById("menuOverlay")?.classList.remove("show");
  document.getElementById("sideMenu")?.classList.remove("show");
};

function onlineNow(id) {
  return 20 + (String(id).split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 17) % 480;
}

function viewsToNumber(value) {
  const text = String(value || "0").toUpperCase().replace(",", ".");
  const num = parseFloat(text) || 0;

  if (text.includes("M")) return num * 1000000;
  if (text.includes("K")) return num * 1000;

  return num;
}

function isTrending(video) {
  return video.premium || String(video.category || "").includes("тренд");
}

function renderCategories() {
  const buttons = categories.map(category => `
    <button
      class="category-btn ${category === currentCategory ? "active" : ""}"
      onclick="setCategory('${category}')"
    >
      ${category}
    </button>
  `).join("");

  categoryList.innerHTML = `
    <div class="category-track">${buttons}${buttons}</div>
    <div class="category-track reverse">${buttons}${buttons}</div>
  `;
}

function getFilteredVideos() {
  const text = searchInput.value.toLowerCase().trim();

  let list = allVideos.filter(video => {
    const matchesSearch =
      String(video.title || "").toLowerCase().includes(text) ||
      String(video.category || "").toLowerCase().includes(text) ||
      (video.tags || []).join(" ").toLowerCase().includes(text);

    const matchesCategory =
      currentCategory === "все" ||
      video.category === currentCategory ||
      (video.tags || []).includes(currentCategory);

    return matchesSearch && matchesCategory;
  });

  if (currentSort === "popular") {
    list = list.sort((a, b) => viewsToNumber(b.views) - viewsToNumber(a.views));
  }

  if (currentSort === "new") {
    list = list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  if (currentSort === "trend") {
    list = list.filter(video => isTrending(video));
  }

  if (currentSort === "premium") {
    list = list.filter(video => video.premium);
  }

  return list;
}

function renderVideos() {
  const list = getFilteredVideos();
  const visible = list.slice(0, visibleCount);

  videoCount.innerText = `${list.length} видео`;

  if (!visible.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Пока нет видео</h3>
        <p>Добавь ролики через Admin — они сохранятся в Firebase и будут видны всем.</p>
      </div>
    `;

    loadMoreBtn.style.display = "none";
    return;
  }

  grid.innerHTML = visible.map((video, index) => {
    const adCard = index > 0 && index % 8 === 0 ? `
      <a href="https://t.me/sex_campos" target="_blank" class="ad-card">
        <div class="ad-card-inner">
          <div class="ad-title">🔥 Тут может быть ваша реклама</div>
          <div class="ad-text">Разместить рекламу на сайте</div>
          <div class="ad-button">Написать в Telegram</div>
        </div>
      </a>
    ` : "";

    return adCard + `
      <a href="video.html?id=${video.id}" class="card">
        <div class="thumb-wrap">
          <img class="thumb" src="${video.image || ""}" loading="lazy" />
          ${video.premium ? '<span class="badge">Premium</span>' : ""}
          ${isTrending(video) ? '<span class="trend-badge">🔥 Trending</span>' : ""}
          <span class="duration">${video.duration || "0:00"}</span>
        </div>

        <h3>${video.title || "Без названия"}</h3>

        <div class="meta">
          <span>👁 ${video.views || "0"}</span>
          <span>🟢 ${onlineNow(video.id)} смотрят</span>
          <span>🏷 ${video.category || "новое"}</span>
        </div>
      </a>
    `;
  }).join("");

  loadMoreBtn.style.display = visible.length < list.length ? "block" : "none";
}

window.setCategory = function (category) {
  currentCategory = category;
  visibleCount = step;
  pageTitle.innerText = category === "все" ? "Релевантные видео" : category;

  renderCategories();
  renderVideos();
};

window.setSort = function (sort) {
  currentSort = sort;
  visibleCount = step;

  if (sort === "popular") pageTitle.innerText = "Релевантные видео";
  if (sort === "new") pageTitle.innerText = "Новые видео";
  if (sort === "trend") pageTitle.innerText = "В тренде";

  renderVideos();
};

window.setPremium = function () {
  currentSort = "premium";
  visibleCount = step;
  pageTitle.innerText = "Premium";

  renderVideos();
};

searchInput.addEventListener("input", () => {
  visibleCount = step;
  renderVideos();
});

loadMoreBtn.addEventListener("click", () => {
  visibleCount += step;
  renderVideos();
});

async function loadVideosFromFirebase() {
  try {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);

    allVideos = snap.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));

    renderCategories();
    renderVideos();
  } catch (error) {
    console.error(error);

    videoCount.innerText = "ошибка Firebase";

    grid.innerHTML = `
      <div class="empty-state">
        <h3>Ошибка Firebase</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
}

loadVideosFromFirebase();