let currentFont = localStorage.getItem("font") || "m";

function applyFont() {
    document.body.classList.remove("font-s", "font-m", "font-l");
    document.body.classList.add("font-" + currentFont);
    document.querySelectorAll(".font-controls button").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.size === currentFont);
    });
}

function setFont(size) {
    currentFont = size;
    localStorage.setItem("font", currentFont);
    applyFont();
}

document.addEventListener("DOMContentLoaded", () => {
    const controls = document.querySelector(".font-controls");
    if (!controls) return;

    controls.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => setFont(btn.dataset.size));
    });

    applyFont();
});