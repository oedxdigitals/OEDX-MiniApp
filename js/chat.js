function showChat(ai) {

    const app = document.getElementById("app");

    currentAI = ai.id;

    app.innerHTML = `

<div class="chat-page">

    <div class="chat-header">

        <div class="chat-left">

            <button
                id="backBtn"
                class="back-btn">

                ←

            </button>

            <div class="chat-title">

                <span>

                    ${ai.icon}

                </span>

                <span>

                    ${ai.name}

                </span>

            </div>

        </div>

    </div>

    <div id="messages">

    </div>

    <div class="chat-input">

        <input
            id="prompt"
            type="text"
            placeholder="Ask anything...">

        <button id="send">

            Send

        </button>

    </div>

</div>

`;

    document
        .getElementById("backBtn")
        .onclick = reloadHome;

    document
        .getElementById("send")
        .onclick = sendMessage;

    document
        .getElementById("prompt")
        .addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                sendMessage();

            }

        });

    loadChatHistory();

}

function addUserMessage(text) {

    const messages = document.getElementById("messages");

    messages.innerHTML += `

<div class="user">

${text}

</div>

`;

    const history = getCurrentChat();

    history.push({

        role: "user",

        content: text

    });

    saveCurrentChat(history);

    messages.scrollTop = messages.scrollHeight;

}

function addAIMessage(text) {

    const messages = document.getElementById("messages");

    messages.innerHTML += `

<div class="ai markdown-body">

${marked.parse(text)}

</div>

`;

    document
        .querySelectorAll("pre code")
        .forEach(block => {

            hljs.highlightElement(block);

        });

    const history = getCurrentChat();

    history.push({

        role: "ai",

        content: text

    });

    saveCurrentChat(history);

    messages.scrollTop = messages.scrollHeight;

}

function loadChatHistory() {

    const messages = document.getElementById("messages");

    messages.innerHTML = "";

    const history = getCurrentChat();

    if (history.length === 0) {

        messages.innerHTML = `

<div class="ai">

👋 Hello! I'm your <strong>${currentAI.toUpperCase()}</strong> AI.

<br><br>

How can I help you today?

</div>

`;

        return;

    }

    history.forEach(msg => {

        if (msg.role === "user") {

            messages.innerHTML += `

<div class="user">

${msg.content}

</div>

`;

        } else {

            messages.innerHTML += `

<div class="ai markdown-body">

${marked.parse(msg.content)}

</div>

`;

        }

    });

    document
        .querySelectorAll("pre code")
        .forEach(block => {

            hljs.highlightElement(block);

        });

    messages.scrollTop = messages.scrollHeight;

}
