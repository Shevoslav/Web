let currentPublisher = null;
let currentIndex = 0;

function openModal(publisher, index) {
  currentPublisher = publisher;
  currentIndex = index;
  renderModal();
  document.getElementById("modal").style.display = "flex";
}

function renderModal() {
  const title = titlesData[currentPublisher][currentIndex];
  const name = currentLang === "uk" ? title.name_uk : title.name_en;
  const synopsis = currentLang === "uk" ? title.synopsis_uk : title.synopsis_en;
  const t = translations[currentLang];

  document.getElementById("modal-cover").src = title.cover_uk;
  document.getElementById("modal-name").textContent = name;
  document.getElementById("modal-synopsis-label").textContent = t.synopsis;
  document.getElementById("modal-synopsis").textContent = synopsis;
  document.getElementById("modal-volumes-original").textContent = `${t.volumes_original}: ${title.volumes_original}`;
  document.getElementById("modal-volumes-translated").textContent = `${t.volumes_translated}: ${title.volumes_translated}`;
  document.getElementById("modal-close").textContent = t.close;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function prevTitle() {
  const total = titlesData[currentPublisher].length;
  currentIndex = (currentIndex - 1 + total) % total;
  renderModal();
}

function nextTitle() {
  const total = titlesData[currentPublisher].length;
  currentIndex = (currentIndex + 1) % total;
  renderModal();
}