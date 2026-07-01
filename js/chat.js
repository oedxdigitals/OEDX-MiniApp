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

<div id="messages">

<div class="ai">

Hello 👋

I'm your ${ai.name}.

Ask me anything.

</div>

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

`;

    document
        .getElementById("backBtn")
        .onclick = reloadHome;

    document
        .getElementById("send")
        .onclick = sendMessage;

}


/* ==========================
   User Message
========================== */

function addUserMessage(text){

    chatHistory.push({

        role: "user",

        content: text

    });

    const messages =
        document.getElementById("messages");

    messages.innerHTML += `

<div class="user">

${text}

</div>

`;

    messages.scrollTop =
        messages.scrollHeight;

}


/* ==========================
   AI Message
========================== */

function addAIMessage(text){

    chatHistory.push({

        role: "assistant",

        content: text

    });

    const messages =
        document.getElementById("messages");

    messages.innerHTML += `

<div class="ai markdown-body">

${marked.parse(text)}

</div>

`;

    document
        .querySelectorAll("pre code")
        .forEach((block)=>{

            hljs.highlightElement(block);

        });

    addCopyButtons();

    messages.scrollTop =
        messages.scrollHeight;

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
