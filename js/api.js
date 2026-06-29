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

	messages.innerHTML += `

	<div class="ai markdown-body">

	${marked.parse(reply)}

	</div>

	`;
    input.value = "";

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

                message: text

            })

        });

        const result = await response.json();

        thinking.remove();

        messages.innerHTML += `
            <div class="ai">
                ${result.reply}
            </div>
        `;

    } catch (error) {

        thinking.remove();

        messages.innerHTML += `
            <div class="ai">
                ❌ Unable to reach OEDXBOT backend.
            </div>
        `;

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
