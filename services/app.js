// ==========================================
// OEDXBOT v4.0
// Application Bootstrap
// ==========================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    console.log("🚀 Starting OEDXBOT...");

    // Telegram Mini App (optional)
    try {
        if (typeof initTelegram === "function") {
            initTelegram();
        } else {
            // safe fallback: create a stub so other code can call it
            window.initTelegram = function(){ console.log("telegram not initialized (stub)"); };
        }
    } catch(e){
        console.warn("telegram init error", e);
    }

    // Sidebar
    if (typeof renderSidebar === "function") {

        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.innerHTML = renderSidebar();
        }

    }

    // Wire sidebar interactions (delegated)
    wireSidebarEvents();

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

    } else {
        // fallback: render simple home if showBots missing
        const page = document.getElementById("page");
        if (page) page.innerHTML = `<div class="empty-state">Welcome to OEDXBOT — select a chat or start a new one.</div>`;
    }

}

// ==========================================
// Sidebar wiring & helpers
// ==========================================
function wireSidebarEvents(){

    const sidebar = document.getElementById("sidebar");
    if (!sidebar) return;

    // delegate clicks
    sidebar.addEventListener("click", (ev) => {
        const target = ev.target.closest("[data-route], .history-item, #new-chat-btn");
        if (!target) return;

        // New chat
        if (target.id === "new-chat-btn") {
            createNewChat();
            return;
        }

        // Menu routes
        const route = target.getAttribute("data-route");
        if (route) {
            // update active state
            sidebar.querySelectorAll(".sidebar-item").forEach(el => el.classList.remove("active"));
            const clicked = sidebar.querySelector(`.sidebar-item[data-route="${route}"]`);
            if (clicked) clicked.classList.add("active");

            if (route === "chats") {
                // show chats page
                if (typeof showBots === "function") showBots(); // reuse bots/listing
            } else if (route === "bots") {
                if (typeof showBots === "function") showBots();
            } else {
                // other small pages: show placeholder
                const page = document.getElementById("page");
                if (page) page.innerHTML = `<div class="empty-state">Page: ${route} — coming soon</div>`;
            }
            return;
        }

        // History / chat item clicked
        const chatId = target.getAttribute("data-chat-id");
        if (chatId) {
            if (typeof showChat === "function") {
                showChat({ id: chatId, title: target.textContent.trim() });
            }
        }
    });

    // keyboard support
    sidebar.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
            ev.target.click();
        }
    });

    // Load initial recent chats
    if (typeof loadRecentChats === "function") loadRecentChats();
}

// ==========================================
// Small UI helpers & placeholder implementations
// (so the app does not throw and the UI renders)
// ==========================================
function createNewChat(){
    // create an example chat and open it
    const newChat = { id: `chat-${Date.now()}`, title: "New Chat" };
    // prepend to recent list
    const recent = document.getElementById("recent-list");
    if (recent) {
        const el = document.createElement("div");
        el.className = "history-item";
        el.setAttribute("data-chat-id", newChat.id);
        el.textContent = "🆕 " + newChat.title;
        recent.prepend(el);
    }
    if (typeof showChat === "function") showChat(newChat);
}

// Demo data for specialists / bots
const DEMO_SPECIALISTS = [
    {id: "coding-ai", title: "Coding AI", desc: "Helps with code, debugging and reviews", emoji: "💻"},
    {id: "general-ai", title: "General AI", desc: "General purpose assistant", emoji: "🌐"}
];

// ==========================================
// loadRecentChats
// Populate the 'Recent Chats' section from localStorage (or demo data)
// ==========================================
function loadRecentChats(){
    const recent = document.getElementById("recent-list");
    if (!recent) return;

    // load from localStorage if available
    let chats = [];
    try {
        const raw = localStorage.getItem("oedx_recent_chats");
        chats = raw ? JSON.parse(raw) : [];
    } catch(e) {
        chats = [];
    }

    // If no chats in storage, use DEMO_SPECIALISTS
    if (!chats || chats.length === 0) {
        chats = DEMO_SPECIALISTS.map(s => ({ id: s.id, title: s.title, emoji: s.emoji }));
    }

    recent.innerHTML = "";
    chats.forEach(c => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.setAttribute("data-chat-id", c.id);
        div.textContent = `${c.emoji || "💬"} ${c.title}`;
        recent.appendChild(div);
    });
}

// ==========================================
// loadSpecialists
// Fill the home/page area with cards of specialists
// ==========================================
function loadSpecialists(){
    const page = document.getElementById("page");
    if (!page) return;

    const wrapper = document.createElement("div");
    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = "repeat(auto-fill,minmax(240px,1fr))";
    wrapper.style.gap = "16px";

    DEMO_SPECIALISTS.forEach(s => {
        const card = document.createElement("div");
        card.style.background = "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))";
        card.style.padding = "16px";
        card.style.borderRadius = "12px";
        card.style.cursor = "pointer";
        card.innerHTML = `<div style="font-size:22px;margin-bottom:8px">${s.emoji} <strong>${s.title}</strong></div>
                          <div style="color:var(--muted);font-size:13px">${s.desc || ""}</div>`;
        card.addEventListener("click", () => {
            if (typeof showChat === "function") showChat(s);
        });
        wrapper.appendChild(card);
    });

    page.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = "Specialists";
    title.style.marginTop = "6px";
    page.appendChild(title);
    page.appendChild(wrapper);
}

// ==========================================
// showBots
// Render a simple listing of bots (reuses specialists)
// ==========================================
function showBots(){
    loadSpecialists();
}

// ==========================================
// showChat
// Render a chat UI skeleton into #page
// ==========================================
function showChat(ai){
    const page = document.getElementById("page");
    if (!page) return;

    const title = (ai && (ai.title || ai.name)) ? (ai.title || ai.name) : "Chat";
    page.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="display:flex;gap:10px;align-items:center">
          <div style="font-size:22px">💬</div>
          <div style="font-weight:700">${title}</div>
        </div>
      </div>
      <div id="chat-area" style="height:calc(100vh - 230px);overflow:auto;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.01), transparent);padding:16px">
        <div style="color:var(--muted)">This is a placeholder chat for <strong>${title}</strong>. Connect your chat service / API and replace this area with real conversation rendering.</div>
      </div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <input id="chat-input" placeholder="Type your message..." style="flex:1;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.03);background:transparent;color:var(--text)">
        <button id="send-btn" style="padding:10px 14px;border-radius:10px;border:none;background:var(--accent);color:white;cursor:pointer">Send</button>
      </div>
    `;

    // wire send button (no network by default)
    const input = document.getElementById("chat-input");
    const send = document.getElementById("send-btn");
    const chatArea = document.getElementById("chat-area");
    if (send && input && chatArea) {
        send.onclick = () => {
            const text = input.value && input.value.trim();
            if (!text) return;
            const msg = document.createElement("div");
            msg.style.marginTop = "8px";
            msg.style.padding = "10px";
            msg.style.background = "rgba(255,255,255,0.02)";
            msg.style.borderRadius = "8px";
            msg.textContent = "You: " + text;
            chatArea.appendChild(msg);
            chatArea.scrollTop = chatArea.scrollHeight;
            input.value = "";
        };
    }
}

// Telegram init stub (safe)
function initTelegram(){
    // If you're using the Telegram WebApp JavaScript API, initialize here.
    // Keep this small and defensive so it doesn't break in normal browsers.
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            console.log("Telegram WebApp initialized");
        } else {
            console.log("Telegram WebApp not available");
        }
    } catch(e){
        console.warn("Error initializing Telegram WebApp", e);
    }
}

// ==========================================
// Global Functions
// ==========================================
window.reloadHome = reloadHome;
window.refreshSidebar = refreshSidebar;
window.showChat = showChat;
window.showBots = showBots;
window.loadRecentChats = loadRecentChats;
window.loadSpecialists = loadSpecialists;
window.initTelegram = initTelegram;
