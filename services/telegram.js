// ==========================================
// OEDXBOT Telegram Support
// Works in Telegram and normal browsers
// ==========================================

let tg = null;

function initTelegram() {

    if (
        typeof window.Telegram !== "undefined" &&
        window.Telegram.WebApp
    ) {

        tg = window.Telegram.WebApp;

        tg.ready();
        tg.expand();

        console.log("Telegram Mini App detected.");

        const user = tg.initDataUnsafe?.user;

        const welcome = document.getElementById("welcome");

        if (welcome) {

            if (user) {

                welcome.textContent =
                    `Welcome, ${user.first_name}`;

            } else {

                welcome.textContent =
                    "Welcome to OEDXBOT";

            }

        }

    } else {

        console.log("Running in Browser.");

    }

}
