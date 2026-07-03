let currentAI = null;

/*
==============================
Open selected AI
==============================
*/

function openAI(ai){

    currentAI = ai;

    showChat(ai);

}

/*
==============================
Home Screen
==============================
*/

function reloadHome(){

    currentAI = null;

    const app = document.getElementById("app");

    app.innerHTML = `

<div class="home">

    <div class="home-top">

        <div>

            <h1>Bots</h1>

            <p>
                Choose an AI specialist to begin chatting.
            </p>

        </div>

        <div class="home-actions">

            <button class="icon-btn">
                🔍
            </button>

            <button class="icon-btn">
                ＋
            </button>

        </div>

    </div>

    <section id="cards">

    </section>

</div>

`;

    loadSpecialists();

}
