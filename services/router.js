// ==========================================
// OEDXBOT v3.1
// Router
// ==========================================

let currentAI = null;

// ==========================================
// Open AI
// ==========================================

function openAI(ai) {

    currentAI = ai;

    showChat(ai);

}

// ==========================================
// Home
// ==========================================

function reloadHome() {

    currentAI = null;

    document.getElementById("topbar").innerHTML =
        renderTopBar("AI Specialists");

    const page =
        document.getElementById("page");

    page.innerHTML = `

<div class="home">

    <section id="cards"></section>

</div>

`;

    loadSpecialists();

}


    if (typeof loadRecentChats === "function") {

        loadRecentChats();

    }

}

window.reloadHome = reloadHome;
window.openAI = openAI;
