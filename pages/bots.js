function showBots(){

    const app = document.getElementById("app");

    app.innerHTML = `

${renderTopBar("Bots")}

<div class="bots-grid" id="cards">

<!-- AI bots will load here -->

</div>

`;

    loadSpecialists();

}
