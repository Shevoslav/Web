function showTab(name, event) {
    document.getElementById("tab-manga").style.display = name === "manga" ? "block" : "none";
    document.getElementById("tab-publishers").style.display = name === "publishers" ? "block" : "none";
    document.getElementById("tab-video").style.display = name === "video" ? "block" : "none";

    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}