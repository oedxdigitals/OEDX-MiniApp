const tg = window.Telegram.WebApp;

tg.ready();

tg.expand();

const welcome = document.getElementById("welcome");

const user = tg.initDataUnsafe.user;

if(user){

    welcome.innerHTML =
    `Welcome, ${user.first_name}!`;

}else{

    welcome.innerHTML =
    "Welcome to OEDXBOT";

}

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("click",()=>{

        const ai = card.innerText.trim();

        alert(ai + " will be connected in the next step.");

    });

});
