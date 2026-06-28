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
