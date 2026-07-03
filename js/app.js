// ==========================================
// OEDXBOT v3.1
// Main Application
// ==========================================

document.addEventListener("DOMContentLoaded", init);

// ==========================================
// Initialize Application
// ==========================================

async function init() {

    try {

        // Initialize Telegram Mini App
        if (typeof initTelegram === "function") {

            initTelegram();

        }

        // Render Sidebar
        renderSidebarComponent();

        // Load Recent Chats
        if (typeof loadRecentChats === "function") {

            loadRecentChats();

        }

        // Open Default Page
        if (typeof showBots === "function") {

            showBots();

        }

    } catch (error) {

        console.error("Initialization Error:", error);

        const app = document.getElementById("app");

        if (app) {

            app.innerHTML = `

            <div class="page error-page">

                <h2>⚠️ OEDXBOT Error</h2>

                <p>Failed to load OEDXBOT.</p>

            </div>

            `;

        }

    }

}

// ==========================================
// Render Sidebar
// ==========================================

function renderSidebarComponent() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    if (typeof renderSidebar === "function") {

        sidebar.innerHTML = renderSidebar();

    }

}

// ==========================================
// Refresh Sidebar
// ==========================================

function refreshSidebar() {

    renderSidebarComponent();

    if (typeof loadRecentChats === "function") {

        loadRecentChats();

    }

}

// ==========================================
// Return Home
// ==========================================

function reloadHome() {

    refreshSidebar();

    if (typeof showBots === "function") {

        showBots();

    }

}

// ==========================================
// Global Functions
// ==========================================

window.reloadHome = reloadHome;
window.refreshSidebar = refreshSidebar;
