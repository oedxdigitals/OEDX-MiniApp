document.addEventListener("DOMContentLoaded", init);

async function init(){

    initTelegram();

    await loadSpecialists();

}
