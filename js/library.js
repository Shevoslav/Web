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

  const isMobile = () => window.innerWidth <= 600;
  const getVisible = () => isMobile() ? 1 : 3;

  const btnPrev = document.createElement("button");
  btnPrev.className = "library-nav";
  btnPrev.textContent = "←";

  const btnNext = document.createElement("button");
  btnNext.className = "library-nav";
  btnNext.textContent = "→";

  const track = document.createElement("div");
  track.className = "library-track";

  // Кнопки для мобільного (знизу)
  const mobileControls = document.createElement("div");
  mobileControls.className = "library-controls-mobile";
  const mobilePrev = document.createElement("button");
  mobilePrev.className = "library-nav";
  mobilePrev.textContent = "←";
  const mobileNext = document.createElement("button");
  mobileNext.className = "library-nav";
  mobileNext.textContent = "→";
  mobileControls.appendChild(mobilePrev);
  mobileControls.appendChild(mobileNext);

  function render() {
    track.innerHTML = "";
    const visible = getVisible();
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

  const prev = () => { current = (current - 1 + total) % total; render(); };
  const next = () => { current = (current + 1) % total; render(); };

  btnPrev.onclick = prev;
  btnNext.onclick = next;
  mobilePrev.onclick = prev;
  mobileNext.onclick = next;

  grid.appendChild(btnPrev);
  grid.appendChild(track);
  grid.appendChild(btnNext);
  grid.appendChild(mobileControls);

  render();

  window.addEventListener("resize", render);
}

document.addEventListener("DOMContentLoaded", renderLibrary);