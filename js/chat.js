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

<div class="composer">

    <textarea

        id="prompt"

        rows="1"

        placeholder="Message OEDXBOT...">

    </textarea>

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
        .getElementById("backBtn")
        .onclick = reloadHome;

    document
        .getElementById("send")
        .onclick = sendMessage;

const textarea=document.getElementById("prompt");

textarea.addEventListener("input",autoResizeTextarea);

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

// ==========================================
// Streaming Message Helpers
// ==========================================

function createStreamingMessage(){

    const messages = document.getElementById("messages");

    const container = document.createElement("div");

    container.className = "ai";

    container.innerHTML = `

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

        <span class="stream-text"></span>

        <span class="cursor">▌</span>

    </div>

    `;

    messages.appendChild(container);

    messages.scrollTop = messages.scrollHeight;

    return container;

}

function updateStreamingMessage(container,text){

    const stream = container.querySelector(".stream-text");

    if(stream){

        stream.innerHTML = marked.parse(text);

    }

    container.scrollIntoView({

        behavior:"smooth",

        block:"end"

    });

}

function finishStreamingMessage(container){

    const cursor = container.querySelector(".cursor");

    if(cursor){

        cursor.remove();

    }

    document
    .querySelectorAll("pre code")
    .forEach(block=>{

        hljs.highlightElement(block);

    });

    enhanceCodeBlocks();

}

function enhanceCodeBlocks(){

    document.querySelectorAll(".markdown-body pre").forEach(pre=>{

        if(pre.parentElement.classList.contains("code-block")){

            return;

        }

        const wrapper=document.createElement("div");

        wrapper.className="code-block";

        const header=document.createElement("div");

        header.className="code-header";

        const language=document.createElement("span");

        const code=pre.querySelector("code");

        let lang="Code";

        if(code){

            const match=[...code.classList]
                .find(c=>c.startsWith("language-"));

            if(match){

                lang=match.replace("language-","");

            }

        }

        language.textContent=lang;

        const button=document.createElement("button");

        button.className="copy-btn";

        button.textContent="📋 Copy";

        button.onclick=()=>{

            navigator.clipboard.writeText(pre.innerText);

            button.textContent="✅ Copied";

            setTimeout(()=>{

                button.textContent="📋 Copy";

            },2000);

        };

        header.appendChild(language);

        header.appendChild(button);

        pre.parentNode.insertBefore(wrapper,pre);

        wrapper.appendChild(header);

        wrapper.appendChild(pre);

    });

}

    document
        .querySelectorAll("pre code")
        .forEach(block => {

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

function autoResizeTextarea(){

    const textarea=document.getElementById("prompt");

    if(!textarea) return;

    textarea.style.height="auto";

    textarea.style.height=textarea.scrollHeight+"px";

}
