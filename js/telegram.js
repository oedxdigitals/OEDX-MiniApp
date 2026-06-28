function initTelegram(){

    const tg = window.Telegram.WebApp;

    tg.ready();

    tg.expand();

    const user = tg.initDataUnsafe.user;

    const welcome =
    document.getElementById("welcome");

    if(user){

        welcome.innerHTML =
        `Welcome, ${user.first_name}`;

    }else{

        welcome.innerHTML =
        "Welcome to OEDXBOT";

    }

}
