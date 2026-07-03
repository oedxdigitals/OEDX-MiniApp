// ==========================================
// OEDXBOT v4.0
// Application Bootstrap
// ==========================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    console.log("🚀 Starting OEDXBOT...");

    // Telegram Mini App
    if (typeof initTelegram === "function") {
        initTelegram();
    }

    // Sidebar
    if (typeof renderSidebar === "function") {

        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.innerHTML = renderSidebar();
        }

    }

    // Home page
    reloadHome();

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
