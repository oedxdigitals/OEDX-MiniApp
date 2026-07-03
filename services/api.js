// ==========================================
// OEDXBOT v3.1
// API Service
// ==========================================

const API_URL =
"https://oedxbot-backend-production.up.railway.app/chat/";

// ==========================================
// AI Specialists
// ==========================================

let specialists = [];

// ==========================================
// Load Specialists
// ==========================================

async function loadSpecialists() {

    try {

        const response = await fetch("data/specialists.json");

        specialists = await response.json();

        const cards = document.getElementById("cards");

        if (!cards) return;

        cards.innerHTML = "";

        specialists.forEach(ai => {

            const card = document.createElement("div");

            card.className = "card";

            card.innerHTML = `

<div class="icon">

${ai.icon}

</div>

<h3>

${ai.name}

</h3>

<p>

${ai.description}

</p>

`;

            card.onclick = () => openAI(ai);

            cards.appendChild(card);

        });

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// Send Message
// ==========================================

async function sendMessage() {

    const input = document.getElementById("prompt");

    if (!input) return;

    const text = input.value.trim();

    if (!text) return;

    addUserMessage(text);

    input.value = "";

    input.style.height = "auto";

    const stream = createStreamingMessage();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                specialist: currentAI.id,

                message: text

            })

        });

        const result = await response.json();

        if (result.success) {

            updateStreamingMessage(

                stream,

                result.reply

            );

        } else {

            updateStreamingMessage(

                stream,

                result.reply ||

                "Unknown Error"

            );

        }

    } catch (error) {

        console.error(error);

        updateStreamingMessage(

            stream,

            "❌ Unable to reach OEDXBOT backend."

        );

    }

    finishStreamingMessage(stream);

}

// ==========================================
// Keyboard
// ==========================================

document.addEventListener("keydown", e => {

    const input = document.getElementById("prompt");

    if (!input) return;

    if (

        document.activeElement !== input

    ) return;

    if (

        e.key === "Enter" &&

        !e.shiftKey

    ) {

        e.preventDefault();

        sendMessage();

    }

});

window.sendMessage = sendMessage;
window.loadSpecialists = loadSpecialists;
