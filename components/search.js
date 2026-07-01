function openSearch(){

    const modal=document.createElement("div");

    modal.id="searchModal";

    modal.innerHTML=`

<div class="search-box">

<div class="search-header">

<input

id="searchInput"

type="text"

placeholder="Search bots..."

autocomplete="off">

<button onclick="closeSearch()">

✕

</button>

</div>

<div id="searchResults">

</div>

</div>

`;

    document.body.appendChild(modal);

    document.getElementById("searchInput").focus();

    document
    .getElementById("searchInput")
    .addEventListener("input",searchBots);

}

function closeSearch(){

    const modal=document.getElementById("searchModal");

    if(modal){

        modal.remove();

    }

}

async function searchBots(e){

    const keyword=e.target.value.toLowerCase();

    const response=await fetch("data/specialists.json");

    const bots=await response.json();

    const results=document.getElementById("searchResults");

    results.innerHTML="";

    bots
    .filter(bot=>

        bot.name.toLowerCase().includes(keyword) ||

        bot.description.toLowerCase().includes(keyword)

    )
    .forEach(bot=>{

        results.innerHTML+=`

<div class="search-item"

onclick="

closeSearch();

openAI('${bot.id}')

">

${bot.icon}

<strong>

${bot.name}

</strong>

<br>

<small>

${bot.description}

</small>

</div>

`;

    });

}
