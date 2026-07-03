// ==========================================
// Open Chat
// ==========================================

function showChat(ai) {

    currentAI = ai;

    document.getElementById("topbar").innerHTML =
        renderTopBar(ai.icon + " " + ai.name);

    const page = document.getElementById("page");

    page.innerHTML = `

<div class="chat-page">

    <div id="messages" class="messages"></div>

    <div class="composer">

        <textarea
            id="prompt"
            rows="1"
            placeholder="Message ${ai.name}..."></textarea>

        <div class="composer-actions">

            <button
                id="attachBtn"
                class="composer-icon"
                title="Coming Soon">

                📎

            </button>

            <button
                id="send"
                class="send-btn">

                ➜

            </button>

        </div>

    </div>

</div>

`;

    document
        .getElementById("send")
        .onclick = sendMessage;

    const textarea =
        document.getElementById("prompt");

    textarea.addEventListener(
        "input",
        autoResizeTextarea
    );

    loadChatHistory();

}

// User Message
// ==========================================

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

// ==========================================
// AI Message
// ==========================================

function addAIMessage(text) {

    const messages = document.getElementById("messages");

    messages.innerHTML += `

<div class="ai">

    <div class="ai-header">

        <img

            src="assets/images/oedxbot-logo.png"

            class="ai-logo"

            alt="OEDXBOT">

        <span>

            OEDXBOT

        </span>

    </div>

    <div class="markdown-body ai-content">

        ${marked.parse(text)}

    </div>

</div>

`;

    document.querySelectorAll("pre code").forEach(block => {

        hljs.highlightElement(block);

    });

    enhanceCodeBlocks();

    const history = getCurrentChat();

    history.push({

        role: "ai",

        content: text

    });

    saveCurrentChat(history);

    messages.scrollTop = messages.scrollHeight;

}

// ==========================================
// Load History
// ==========================================

function loadChatHistory() {

    const messages = document.getElementById("messages");

    const history = getCurrentChat();

    messages.innerHTML = "";

    if (history.length === 0) {

        addAIMessage(

`👋 Hello!

I'm your ${currentAI.name}.

How can I help you today?`

        );

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

<div class="ai">

<div class="ai-header">

<img
src="assets/images/oedxbot-logo.png"
class="ai-logo">

<span>

OEDXBOT

</span>

</div>

<div class="markdown-body ai-content">

${marked.parse(msg.content)}

</div>

</div>

`;

        }

    });

    document.querySelectorAll("pre code").forEach(block => {

        hljs.highlightElement(block);

    });

    enhanceCodeBlocks();

    messages.scrollTop = messages.scrollHeight;

}

// ==========================================
// Auto Resize
// ==========================================

function autoResizeTextarea() {

    const textarea = document.getElementById("prompt");

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height =
        textarea.scrollHeight + "px";

}

// ==========================================
// Code Blocks
// ==========================================

function enhanceCodeBlocks() {

    document.querySelectorAll(".markdown-body pre").forEach(pre => {

        if (pre.parentElement.classList.contains("code-block")) {

            return;

        }

        const wrapper = document.createElement("div");

        wrapper.className = "code-block";

        const header = document.createElement("div");

        header.className = "code-header";

        const language = document.createElement("span");

        const code = pre.querySelector("code");

        let lang = "Code";

        if (code) {

            const match = [...code.classList]
                .find(c => c.startsWith("language-"));

            if (match) {

                lang = match.replace("language-", "");

            }

        }

        language.textContent = lang;

        const button = document.createElement("button");

        button.className = "copy-btn";

        button.textContent = "📋 Copy";

        button.onclick = () => {

            navigator.clipboard.writeText(pre.innerText);

            button.textContent = "✅ Copied";

            setTimeout(() => {

                button.textContent = "📋 Copy";

            }, 2000);

        };

        header.appendChild(language);

        header.appendChild(button);

        pre.parentNode.insertBefore(wrapper, pre);

        wrapper.appendChild(header);

        wrapper.appendChild(pre);

    });

}
