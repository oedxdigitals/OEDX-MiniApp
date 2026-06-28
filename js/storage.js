const chats = {};

function getChat(ai) {
    if (!chats[ai]) {
        chats[ai] = [];
    }
    return chats[ai];
}

function addMessage(ai, role, text) {
    getChat(ai).push({
        role,
        text,
        time: Date.now()
    });
}

function clearChat(ai) {
    chats[ai] = [];
}
