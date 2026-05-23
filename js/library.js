function renderLibrary() {
  const grid = document.getElementById("library");
  if (!grid) return;

  const publisher = grid.dataset.publisher;
  const publisherTitles = titlesData[publisher];
  if (!publisherTitles || publisherTitles.length === 0) return;

  grid.innerHTML = "";
  grid.className = "library-slider";

  let current = 0;
  const total = publisherTitles.length;
  const visible = 3;

  const btnPrev = document.createElement("button");
  btnPrev.className = "library-nav";
  btnPrev.textContent = "←";

  const btnNext = document.createElement("button");
  btnNext.className = "library-nav";
  btnNext.textContent = "→";

  const track = document.createElement("div");
  track.className = "library-track";

  function render() {
    track.innerHTML = "";
    for (let i = 0; i < visible; i++) {
      const idx = (current + i) % total;
      const title = publisherTitles[idx];
      const name = currentLang === "uk" ? title.name_uk : title.name_en;

      const card = document.createElement("div");
      card.className = "library-card";
      card.innerHTML = `
        <img src="${title.cover_uk}" alt="${name}">
        <p>${name}</p>
      `;
      card.onclick = () => openModal(publisher, idx);
      track.appendChild(card);
    }
  }

  btnPrev.onclick = () => {
    current = (current - 1 + total) % total;
    render();
  };

  btnNext.onclick = () => {
    current = (current + 1) % total;
    render();
  };

  grid.appendChild(btnPrev);
  grid.appendChild(track);
  grid.appendChild(btnNext);

  render();
}

document.addEventListener("DOMContentLoaded", renderLibrary);