// OEDXBOT v1.0
// Main Application

document.addEventListener("DOMContentLoaded", () => {
    init();
});

async function init() {

    try {

        // Initialize Telegram Mini App
        if (typeof initTelegram === "function") {
            initTelegram();
        }

        // Load AI specialists
        if (typeof loadSpecialists === "function") {
            await loadSpecialists();
        }

    } catch (error) {

        console.error("Initialization Error:", error);

        const welcome = document.getElementById("welcome");

        if (welcome) {
            welcome.textContent = "Failed to load OEDXBOT.";
        }

    }

}

// Return to Home Screen
function reloadHome() {
    location.reload();
}
