function showTab(name, event) {
    document.getElementById("tab-manga").style.display = name === "manga" ? "block" : "none";
    document.getElementById("tab-publishers").style.display = name === "publishers" ? "block" : "none";
    document.getElementById("tab-video").style.display = name === "video" ? "block" : "none";
    document.getElementById("tab-about").style.display = name === "about" ? "block" : "none";

    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    if (event && event.target) {
        const key = event.target.dataset.i18n;
        document.querySelectorAll(".tab").forEach(btn => {
            if (btn.dataset.i18n === key) btn.classList.add("active");
        });
    }
    closeDropdown();
}

function closeDropdown() {
    const dropdown = document.getElementById("tabs-dropdown");
    const hamburger = document.getElementById("tabs-hamburger");
    if (dropdown) dropdown.classList.remove("open");
    if (hamburger) hamburger.classList.remove("open");
}

function toggleDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById("tabs-dropdown");
    const hamburger = document.getElementById("tabs-hamburger");
    if (!dropdown) return;
    // Позиціонуємо dropdown під tabsBar
    const tabsBar = document.querySelector(".tabs");
    const rect = tabsBar.getBoundingClientRect();
    dropdown.style.top = (rect.bottom + window.scrollY) + "px";
    dropdown.style.left = rect.left + "px";
    dropdown.style.width = rect.width + "px";
    const isOpen = dropdown.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
}

function syncDropdownText() {
    const dropdown = document.getElementById("tabs-dropdown");
    if (!dropdown) return;
    const originalTabs = Array.from(document.querySelectorAll(".tabs > .tab"));
    const clones = Array.from(dropdown.querySelectorAll(".tab"));
    originalTabs.forEach((btn, i) => {
        if (clones[i]) clones[i].textContent = btn.textContent;
    });
}

function checkOverflow(tabsBar) {
    tabsBar.classList.remove("narrow");

    const tabs = Array.from(tabsBar.querySelectorAll(".tab"));
    tabs.forEach(t => t.style.display = "");

    const gap = 10;
    const paddingH = 40;

    let totalW = paddingH;
    tabs.forEach(t => { totalW += t.offsetWidth + gap; });

    const containerW = tabsBar.offsetWidth;
    const needsCollapse = totalW > containerW;

    tabsBar.classList.toggle("narrow", needsCollapse);
}

document.addEventListener("DOMContentLoaded", () => {
    const tabsBar = document.querySelector(".tabs");
    if (!tabsBar) return;

    const hamburger = document.createElement("button");
    hamburger.id = "tabs-hamburger";
    hamburger.className = "tabs-hamburger";
    hamburger.textContent = "☰";
    hamburger.addEventListener("click", toggleDropdown);
    tabsBar.appendChild(hamburger);

    // Dropdown додаємо в body а не в .tabs
    const dropdown = document.createElement("div");
    dropdown.id = "tabs-dropdown";
    dropdown.className = "tabs-dropdown";
    dropdown.addEventListener("click", e => e.stopPropagation());

    tabsBar.querySelectorAll(".tab").forEach(btn => {
        const clone = btn.cloneNode(true);
        const tabName = btn.dataset.i18n === "what_is_manga" ? "manga"
                      : btn.dataset.i18n === "publishers" ? "publishers"
                      : btn.dataset.i18n === "video" ? "video"
                      : "about";
        clone.addEventListener("click", () => {
            showTab(tabName, { target: clone });
        });
        dropdown.appendChild(clone);
    });

    document.body.appendChild(dropdown);

    setTimeout(syncDropdownText, 100);

    const origToggleLang = window.toggleLang;
    if (typeof origToggleLang === "function") {
        window.toggleLang = function() {
            origToggleLang();
            setTimeout(syncDropdownText, 50);
        };
    }

    document.addEventListener("click", () => closeDropdown());

    const observer = new ResizeObserver(() => checkOverflow(tabsBar));
    observer.observe(tabsBar);

    requestAnimationFrame(() => {
        setTimeout(() => checkOverflow(tabsBar), 50);
    });

    if (window.location.hash === "#publishers") {
        showTab("publishers", null);
        document.querySelectorAll(".tab").forEach(btn => {
            if (btn.dataset.i18n === "publishers") btn.classList.add("active");
        });
    }
});