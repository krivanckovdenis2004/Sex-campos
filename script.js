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

let allVideos = [];
let currentSort = "popular";
let currentTag = "all";

const randomViews = () => {
  return Math.floor(Math.random() * 900000) + 10000;
};

const randomWatching = () => {
  return Math.floor(Math.random() * 500) + 20;
};

function normalizeTags(tags) {
  if (!tags) return [];

  if (Array.isArray(tags)) return tags;

  return tags
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
}

function createCard(v) {
  const card = document.createElement("a");

  card.href = `video.html?id=${v.id}`;
  card.className = "video-card";

  const views = randomViews();
  const watching = randomWatching();

  const tags = normalizeTags(v.tags);

  card.innerHTML = `
    <div class="thumb-wrap">

      <img
        src="${v.image || "logo.jpg"}"
        class="thumb"
      >

      <div class="duration">
        ${v.duration || "13:43"}
      </div>

    </div>

    <div class="video-info">

      <h3>
        ${v.title || "Без названия"}
      </h3>

      <div class="meta">
        👁 ${views}
        <span class="watching">
          🟢 ${watching} смотрят
        </span>
      </div>

      <div class="tag-list">
        ${tags
          .slice(0, 5)
          .map(
            t => `
            <span class="tag">
              + ${t}
            </span>
          `
          )
          .join("")}
      </div>

    </div>
  `;

  return card;
}

function renderVideos(list) {
  if (!grid) return;

  grid.innerHTML = "";

  videoCount.textContent = `${list.length} видео`;

  list.forEach(v => {
    grid.appendChild(createCard(v));
  });
}

function buildTags() {
  if (!categoryList) return;

  const tags = new Set();

  allVideos.forEach(v => {
    normalizeTags(v.tags).forEach(t => tags.add(t));
  });

  categoryList.innerHTML = `
    <button class="cat-btn active">
      + все
    </button>
  `;

  [...tags]
    .slice(0, 30)
    .forEach(tag => {
      const btn = document.createElement("button");

      btn.className = "cat-btn";

      btn.textContent = `+ ${tag}`;

      btn.onclick = () => {
        currentTag = tag;

        document
          .querySelectorAll(".cat-btn")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        filterVideos();
      };

      categoryList.appendChild(btn);
    });
}

function filterVideos() {
  let filtered = [...allVideos];

  const search = searchInput?.value
    ?.toLowerCase()
    ?.trim();

  if (search) {
    filtered = filtered.filter(v => {
      const tags = normalizeTags(v.tags).join(" ");

      return (
        v.title?.toLowerCase().includes(search) ||
        tags.toLowerCase().includes(search)
      );
    });
  }

  if (currentTag !== "all") {
    filtered = filtered.filter(v =>
      normalizeTags(v.tags).includes(currentTag)
    );
  }

  if (currentSort === "new") {
    filtered.reverse();

    pageTitle.textContent = "Новые видео";
  }

  if (currentSort === "trend") {
    filtered.sort(() => Math.random() - 0.5);

    pageTitle.textContent = "🔥 В тренде";
  }

  if (currentSort === "popular") {
    pageTitle.textContent = "Релевантные видео";
  }

  renderVideos(filtered);
}

window.setSort = type => {
  currentSort = type;

  filterVideos();
};

async function loadVideos() {
  const q = query(
    collection(db, "videos"),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  allVideos = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  buildTags();

  filterVideos();
}

searchInput?.addEventListener("input", filterVideos);

loadVideos();
window.enterSite = function () {
  const ageGate = document.getElementById("ageGate");

  if (ageGate) {
    ageGate.style.display = "none";
  }

  localStorage.setItem("age_ok", "yes");
};

if (localStorage.getItem("age_ok") === "yes") {
  const ageGate = document.getElementById("ageGate");

  if (ageGate) {
    ageGate.style.display = "none";
  }
}