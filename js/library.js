function renderLibrary() {
  const grid = document.getElementById("library");
  if (!grid) return;

  const publisher = grid.dataset.publisher;
  const publisherTitles = titlesData[publisher];
  if (!publisherTitles || publisherTitles.length === 0) return;

  grid.innerHTML = "";

  publisherTitles.forEach((title, index) => {
    const card = document.createElement("div");
    card.className = "title-card";
    card.onclick = () => openModal(publisher, index);

    card.innerHTML = `
      <img src="${title.cover_uk}" alt="${title.name}">
      <p>${title.name}</p>
    `;

    grid.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", renderLibrary);