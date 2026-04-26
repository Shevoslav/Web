document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("tab-video");
    if (!container) return;

    videosData.forEach(video => {
        const div = document.createElement("div");
        div.className = "video-container";
        div.style.cssText = "position:relative; cursor:pointer; background:#000; border-radius:10px; overflow:hidden;";
        div.innerHTML = `
            <img 
                src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg"
                style="width:100%; display:block; aspect-ratio:16/9; object-fit:cover; opacity:0.85;"
                alt="video thumbnail"
            >
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                        width:68px; height:48px; background:#ff0000; border-radius:12px;
                        display:flex; align-items:center; justify-content:center;">
                <div style="width:0; height:0; border-top:12px solid transparent;
                            border-bottom:12px solid transparent;
                            border-left:20px solid white; margin-left:4px;"></div>
            </div>
        `;
        div.onclick = () => window.open(`https://www.youtube.com/watch?v=${video.id}`, "_blank");
        container.appendChild(div);
    });
});