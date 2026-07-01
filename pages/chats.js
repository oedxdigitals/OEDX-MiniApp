function showChats(){

    const app = document.getElementById("app");

    app.innerHTML = `

${renderTopBar("Chats")}

<div class="chat-list">

<div class="chat-card">

<div>

<h3>Welcome 👋</h3>

<p>Start chatting with OEDXBOT AI</p>

</div>

<span>Now</span>

</div>

</div>

`;

}
