const STORAGE_KEY = "oedxbot_chats";

function getChats(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(!data){

        return {};

    }

    return JSON.parse(data);

}

function saveChats(chats){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(chats)

    );

}

function getCurrentChat(){

    const chats = getChats();

    if(!chats[currentAI]){

        chats[currentAI] = [];

    }

    return chats[currentAI];

}

function saveCurrentChat(messages){

    const chats = getChats();

    chats[currentAI] = messages;

    saveChats(chats);

}
