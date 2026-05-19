function scNormalize(value) {
  return String(value || "").toLowerCase().trim();
}

function scViewsToNumber(value) {
  const text = String(value || "0").toUpperCase();
  const num = parseFloat(text) || 0;

  if (text.includes("M")) return num * 1000000;
  if (text.includes("K")) return num * 1000;

  return num;
}

function scTagMatches(a = [], b = []) {
  const first = a.map(scNormalize);
  const second = b.map(scNormalize);

  return first.filter(tag => second.includes(tag)).length;
}

function scScoreVideo(video, options = {}) {
  const {
    baseVideo = null,
    allVideos = []
  } = options;

  let score = 0;

  if (baseVideo) {
    if (scNormalize(video.category) === scNormalize(baseVideo.category)) {
      score += 70;
    }

    score += scTagMatches(
      video.tags || [],
      baseVideo.tags || []
    ) * 28;
  }

  score += Math.min(scViewsToNumber(video.views) / 10000, 25);

  if (video.premium) score += 8;

  score += Math.random() * 10;

  return score;
}

function scGetRecommendations(allVideos = [], options = {}) {
  const {
    baseVideo = null,
    limit = 12
  } = options;

  return allVideos
    .filter(v => v && v.video)
    .filter(v => Number(v.id) !== Number(baseVideo?.id))
    .map(v => ({
      ...v,
      scScore: scScoreVideo(v, {
        baseVideo,
        allVideos
      })
    }))
    .sort((a, b) => b.scScore - a.scScore)
    .slice(0, limit);
}

window.SEXcamposRecommendations = {
  getRecommendations: scGetRecommendations
};