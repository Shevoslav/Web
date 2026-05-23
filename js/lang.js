let currentLang = localStorage.getItem("lang") || "uk";

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}

function loadMarkdown(el) {
  if (!el) return;

  const base = el.dataset.md;
  if (typeof markdownContent !== "undefined") {
    const key = base.replace(/^.*\//, "");
    const langKey = currentLang === "uk" ? key : key + ".en";
    if (markdownContent[langKey]) {
      el.innerHTML = marked.parse(markdownContent[langKey]);
      return;
    }
    if (markdownContent[key]) {
      el.innerHTML = marked.parse(markdownContent[key]);
      return;
    }
  }

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
      el.innerHTML = "";
    });
}

function loadContent() {
  loadMarkdown(document.getElementById("content"));
  loadMarkdown(document.getElementById("content-about"));
}

function toggleLang() {
  currentLang = currentLang === "uk" ? "en" : "uk";
  localStorage.setItem("lang", currentLang);
  applyTranslations();
  loadContent();
  if (typeof renderLibrary === "function") renderLibrary();

  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = currentLang === "uk" ? "EN" : "UA";
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations();
  loadContent();

  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = currentLang === "uk" ? "EN" : "UA";
});