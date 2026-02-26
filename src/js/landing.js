document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("hero-start-btn");

    if(!startBtn) return;

    startBtn.addEventListener("click", () => {
        window.location.href = "app.html";
    });
});