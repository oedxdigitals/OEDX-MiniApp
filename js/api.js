async function loadSpecialists(){

    const response =
    await fetch("data/specialists.json");

    const data =
    await response.json();

    const cards =
    document.getElementById("cards");

    cards.innerHTML="";

    data.forEach(ai=>{

        cards.innerHTML +=`

<div class="card"

onclick="openAI('${ai.id}')">

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

function sendMessage(){

    const input =
    document.getElementById("prompt");

    const text =
    input.value.trim();

    if(text==="") return;

    const messages =
    document.getElementById("messages");

    messages.innerHTML += `

<div class="user">

${text}

</div>

`;

    messages.innerHTML += `

<div class="ai">

Thinking...

</div>

`;

    input.value="";

}
