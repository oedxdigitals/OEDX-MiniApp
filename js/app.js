// OEDXBOT v3.0
// Main Application
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    init();
});

// ------------------------------------------
// Initialize App
// ------------------------------------------

async function init() {

    try {

        // Initialize Telegram Mini App
        if (typeof initTelegram === "function") {
            initTelegram();
        }

        // Render Desktop Sidebar
        renderSidebarComponent();

        // Open default page
        if (typeof showBots === "function") {
            showBots();
        }

    } catch (error) {

        console.error("Initialization Error:", error);

        const app = document.getElementById("app");

        if (app) {

            app.innerHTML = `

            <div class="page">

                <h2>⚠️ OEDXBOT Error</h2>

                <p>Failed to load OEDXBOT.</p>

            </div>

            `;

        }

    }

}

// ------------------------------------------
// Render Desktop Sidebar
// ------------------------------------------

function renderSidebarComponent() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    if (typeof renderSidebar === "function") {

        sidebar.innerHTML = renderSidebar();

    }

}

// ------------------------------------------
// Refresh Sidebar
// (Call this after future updates such as
// chat history changes or login/logout.)
// ------------------------------------------

function refreshSidebar() {

    renderSidebarComponent();

}

// ------------------------------------------
// Return Home
// ------------------------------------------

function reloadHome() {

    renderSidebarComponent();

    if (typeof showBots === "function") {

        showBots();

    }

}
