function showChat(ai){

    const app = document.getElementById("app");

    app.innerHTML = `

<div class="chat-header">

<button id="backBtn" class="back-btn">

←

</button>

<div class="chat-title">

<span class="chat-icon">

${ai.icon}

</span>

<span>

${ai.name}

</span>

</div>

</div>

<div id="messages"></div>

<div class="chat-input">

<input
id="prompt"
type="text"
placeholder="Ask anything...">

<button id="send">

Send

</button>

</div>

`;

    document
        .getElementById("backBtn")
        .onclick = reloadHome;

    document
        .getElementById("send")
        .onclick = sendMessage;

	loadChatHistory();
}


/* ==========================
   User Message
========================== */

function addUserMessage(text){

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

/* ==========================
   AI Message
========================== */

function addAIMessage(text){

    const messages = document.getElementById("messages");

    messages.innerHTML += `
        <div class="ai markdown-body">
            ${marked.parse(text)}
        </div>
    `;

    document.querySelectorAll("pre code").forEach((block)=>{
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

function loadChatHistory(){

    const history = getCurrentChat();

    if(history.length === 0){

        addAIMessage(`Hello 👋

I'm your ${currentAI.toUpperCase()} AI.

Ask me anything.`);

        return;

    }

    const messages = document.getElementById("messages");

    messages.innerHTML = "";

    history.forEach(msg=>{

        if(msg.role==="user"){

            messages.innerHTML += `
                <div class="user">
                    ${msg.content}
                </div>
            `;

        }else{

            messages.innerHTML += `
                <div class="ai markdown-body">
                    ${marked.parse(msg.content)}
                </div>
            `;

        }

    });

    document.querySelectorAll("pre code").forEach(block=>{
        hljs.highlightElement(block);
    });

    messages.scrollTop = messages.scrollHeight;

}


function addCopyButtons(){

    document.querySelectorAll("pre").forEach((pre)=>{

        if(pre.querySelector(".copy-btn")) return;

        const button = document.createElement("button");

        button.className = "copy-btn";

        button.textContent = "📋 Copy";

        button.onclick = async ()=>{

            const code = pre.querySelector("code").innerText;

            await navigator.clipboard.writeText(code);

            button.textContent = "✅ Copied";

            setTimeout(()=>{

                button.textContent = "📋 Copy";

            },2000);

        };

        pre.style.position = "relative";

        pre.appendChild(button);

    });

}
