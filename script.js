const savedVideos = JSON.parse(localStorage.getItem("my_videos") || "[]");
const allVideos = [...savedVideos, ...videos];

const grid = document.getElementById("videoGrid");
const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const videoCount = document.getElementById("videoCount");
const pageTitle = document.getElementById("pageTitle");

let currentCategory = "все";
let currentSort = "popular";
let visibleCount = 12;
const step = 12;

const categories = [
  "все",
  "русское",
  "крупным планом",
  "чулки",
  "мжм",
  "мать и дочь",
  "тик ток",
  "познавательное",
  "жмж",
  "бдсм",
  "сексвайф",
  "грязные разговоры",
  "в поезде",
  "женский куколдинг",
  "упругие попки",
  "куколд",
  "оргaзм",
  "с разговорами",
  "межрасовый",
  "кончают внутрь"
];

function enterSite() {
  document.getElementById("ageGate").style.display = "none";
  localStorage.setItem("age_ok", "yes");
}

if (localStorage.getItem("age_ok") === "yes") {
  document.getElementById("ageGate").style.display = "none";
}


function openCategory(category) {
  if (category === "все") {
    window.location.href = "index.html";
    return;
  }

  window.location.href = "category.html?name=" + encodeURIComponent(category);
}


function onlineNow(id) {
  return 20 + (Number(id) * 17) % 480;
}

function isTrending(video) {
  return video.premium || Number(video.id) % 5 === 0 || String(video.category).includes("тренде");
}

function renderCategories() {

  const buttons = categories.map(category => `
    <button
      class="category-btn ${category === currentCategory ? "active" : ""}"
      onclick="openCategory('${category}')"
    >
      ${category}
    </button>
  `).join("");

  categoryList.innerHTML = `
    <div class="category-track">
      ${buttons}
      ${buttons}
    </div>

    <div class="category-track reverse">
      ${buttons}
      ${buttons}
    </div>
  `;
}

function getFilteredVideos() {
  const text = searchInput.value.toLowerCase().trim();

  let list = allVideos.filter(video => {
    const matchesSearch =
      video.title.toLowerCase().includes(text) ||
      video.category.toLowerCase().includes(text) ||
      (video.tags || []).join(" ").toLowerCase().includes(text);

    const matchesCategory =
      currentCategory === "все" || video.category === currentCategory;

    return matchesSearch && matchesCategory;
  });

  if (currentSort === "popular") {
    list = list.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
  }

  if (currentSort === "trend") {
    list = list.filter((video, index) => index % 3 === 0);
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
          <img class="thumb" src="${video.image}" loading="lazy" />
          ${video.premium ? '<span class="badge">Premium</span>' : ''}
          ${isTrending(video) ? '<span class="trend-badge">🔥 Trending</span>' : ''}
          <span class="duration">${video.duration}</span>
        </div>
        <h3>${video.title}</h3>
        <div class="meta">
          <span>👁 ${video.views}</span>
          <span>🟢 ${onlineNow(video.id)} смотрят</span>
          <span>🏷 ${video.category}</span>
        </div>
      </a>
    `;
  }).join("");

  loadMoreBtn.style.display = visible.length < list.length ? "block" : "none";
}

function setCategory(category) {
  currentCategory = category;
  visibleCount = step;
  pageTitle.innerText = category === "все" ? "Релевантные видео" : category;
  renderCategories();
  renderVideos();
}

function setSort(sort) {
  currentSort = sort;
  visibleCount = step;

  if (sort === "popular") pageTitle.innerText = "Релевантные видео";
  if (sort === "new") pageTitle.innerText = "Новые видео";
  if (sort === "trend") pageTitle.innerText = "В тренде";

  renderVideos();
}

function setPremium() {
  currentSort = "premium";
  visibleCount = step;
  pageTitle.innerText = "Premium";
  renderVideos();
}

searchInput.addEventListener("input", () => {
  visibleCount = step;
  renderVideos();
});

loadMoreBtn.addEventListener("click", () => {
  visibleCount += step;
  renderVideos();
});

renderCategories();
renderVideos();


function openMenu() {
  document.getElementById("menuOverlay").classList.add("show");
  document.getElementById("sideMenu").classList.add("show");
}

function closeMenu() {
  document.getElementById("menuOverlay").classList.remove("show");
  document.getElementById("sideMenu").classList.remove("show");
}


window.addEventListener("scroll", () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;

  if (nearBottom && loadMoreBtn.style.display !== "none") {
    visibleCount += step;
    renderVideos();
  }
});
function deleteVideo(id) {
  if (!confirm("Удалить ролик?")) return;

  const list = getMyVideos().filter(v => Number(v.id) !== Number(id));

  saveMyVideos(list);
  renderAdmin();
}