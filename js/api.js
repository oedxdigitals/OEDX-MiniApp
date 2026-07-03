// ==========================================
// OEDXBOT v3.1
// API Service
// ==========================================

const API_URL = "https://oedxbot-backend-production.up.railway.app/chat/";

// ==========================================
// Load AI Specialists
// ==========================================

async function loadSpecialists() {

    try {

        const response = await fetch("data/specialists.json");

        const data = await response.json();

        const cards = document.getElementById("cards");

        if (!cards) return;

        cards.innerHTML = "";

        data.forEach(ai => {

            cards.innerHTML += `

            <div class="card" onclick="openAI('${ai.id}')">

                <div class="icon">

                    ${ai.icon}

                </div>

                <h3>

                    ${ai.name}

                </h3>

                <p>

                    ${ai.description}

                </p>

            </div>

            `;

        });

    } catch (error) {

        console.error("Failed to load specialists:", error);

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

    // Show user message
    addUserMessage(text);

    // Clear composer
    input.value = "";
    input.style.height = "auto";

    // Previous conversation only
    const historyToSend = chatHistory.slice(0, -1);

    // Create streaming container
    const stream = createStreamingMessage();

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                specialist: currentAI,

                message: text,

                history: historyToSend

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

                "❌ " + (result.reply || "Unknown error.")

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
// Keyboard Shortcuts
// ==========================================

document.addEventListener("keydown", function (e) {

    const input = document.getElementById("prompt");

    if (!input) return;

    if (

        e.key === "Enter" &&

        !e.shiftKey &&

        document.activeElement === input

    ) {

        e.preventDefault();

        sendMessage();

    }

});
