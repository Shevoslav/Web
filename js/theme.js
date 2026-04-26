const toggle = document.getElementById("theme-toggle");
if (toggle) {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    toggle.textContent = "🌙";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    toggle.textContent = isLight ? "🌙" : "☀️";
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}