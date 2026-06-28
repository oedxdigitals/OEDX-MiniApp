function showChat(id){

    const app = document.getElementById("app");

    app.innerHTML = `

<div class="chat-header">

<button id="backBtn">

← Back

</button>

<h2>${id.toUpperCase()} AI</h2>

</div>

<div id="messages">

<div class="ai">

Hello 👋

I'm your ${id.toUpperCase()} AI.

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
