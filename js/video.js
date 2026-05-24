document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-video");
    if (!container) return;

    let current = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    const wrapper = document.createElement("div");
    wrapper.className = "video-wrapper";

    const btnPrev = document.createElement("button");
    btnPrev.className = "video-nav";
    btnPrev.textContent = "←";

    const btnNext = document.createElement("button");
    btnNext.className = "video-nav";
    btnNext.textContent = "→";

    const div = document.createElement("div");
    div.className = "video-container";

    // Мобільні кнопки знизу
    const mobileControls = document.createElement("div");
    mobileControls.className = "video-controls-mobile";
    const mobilePrev = document.createElement("button");
    mobilePrev.className = "video-nav";
    mobilePrev.textContent = "←";
    const mobileNext = document.createElement("button");
    mobileNext.className = "video-nav";
    mobileNext.textContent = "→";
    mobileControls.appendChild(mobilePrev);
    mobileControls.appendChild(mobileNext);

    function render() {
        const video = videosData[current];
        div.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="video thumbnail">
            <div class="play-btn"><div class="play-arrow"></div></div>
        `;
        div.onclick = () => window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank");
    }

    function prev() {
        current = (current - 1 + videosData.length) % videosData.length;
        render();
    }

    function next() {
        current = (current + 1) % videosData.length;
        render();
    }

    btnPrev.onclick = prev;
    btnNext.onclick = next;
    mobilePrev.onclick = prev;
    mobileNext.onclick = next;

    div.addEventListener("touchstart", e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    div.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            diff > 0 ? next() : prev();
        }
    }, { passive: true });

    wrapper.appendChild(btnPrev);
    wrapper.appendChild(div);
    wrapper.appendChild(btnNext);
    wrapper.appendChild(mobileControls);
    container.appendChild(wrapper);

    render();
});