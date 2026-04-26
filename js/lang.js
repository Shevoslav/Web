let currentLang = localStorage.getItem("lang") || "uk";

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

function loadContent() {
  const el = document.getElementById("content");
  if (!el) return;

  // Спершу перевіряємо чи є вбудований контент у markdownContent (з data.js)
  const base = el.dataset.md;
  if (typeof markdownContent !== "undefined") {
    // Витягуємо ключ: "../text/nasha-idea" → "nasha-idea"
    const key = base.replace(/^.*\//, "");
    const langKey = currentLang === "uk" ? key : key + ".en";
    if (markdownContent[langKey]) {
      el.innerHTML = marked.parse(markdownContent[langKey]);
      return;
    }
    // Fallback на uk якщо en не знайдено
    if (markdownContent[key]) {
      el.innerHTML = marked.parse(markdownContent[key]);
      return;
    }
  }

  // Якщо вбудованого контенту немає — пробуємо fetch
  const suffix = currentLang === "uk" ? "" : `.${currentLang}`;
  const url = `${base}${suffix}.md`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("not found");
      return response.text();
    })
    .then(data => {
      el.innerHTML = marked.parse(data);
    })
    .catch(() => {
      // file:// або файл не знайдено — показуємо порожній блок без помилки
      el.innerHTML = "";
    });
}

function toggleLang() {
  currentLang = currentLang === "uk" ? "en" : "uk";
  localStorage.setItem("lang", currentLang);
  applyTranslations();
  loadContent();

  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = currentLang === "uk" ? "EN" : "UA";
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  loadContent();

  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = currentLang === "uk" ? "EN" : "UA";
});