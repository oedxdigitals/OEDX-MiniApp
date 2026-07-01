const API_URL = "https://oedxbot-backend-production.up.railway.app/chat/";

async function loadSpecialists() {

    const response = await fetch("data/specialists.json");

    const data = await response.json();

    const cards = document.getElementById("cards");

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

}

async function sendMessage() {

    const input = document.getElementById("prompt");

    const text = input.value.trim();

    if (!text) return;

    const messages = document.getElementById("messages");

    // Show user message and save to history
    addUserMessage(text);

    input.value = "";

    // Exclude the latest user message from history
    const historyToSend = chatHistory.slice(0, -1);

    // Thinking indicator
    const thinking = document.createElement("div");

    thinking.className = "ai";

    thinking.id = "thinking";

    thinking.innerHTML = "Thinking...";

    messages.appendChild(thinking);

    messages.scrollTop = messages.scrollHeight;

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

        thinking.remove();

        if (result.success) {

            addAIMessage(result.reply);

        } else {

            addAIMessage("❌ " + (result.reply || "Unknown error."));

        }

    } catch (error) {

        thinking.remove();

        addAIMessage("❌ Unable to reach OEDXBOT backend.");

        console.error(error);

    }

    messages.scrollTop = messages.scrollHeight;

}

document.addEventListener("keypress", function(e) {

    if (e.key === "Enter") {

        const input = document.getElementById("prompt");

        if (document.activeElement === input) {

            sendMessage();

        }

    }

});
