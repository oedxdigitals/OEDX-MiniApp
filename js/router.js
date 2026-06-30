let currentAI = null;
let currentAIData = null;
let chatHistory = [];

async function openAI(id){

    currentAI = id;

    const response = await fetch("data/specialists.json");
    const data = await response.json();

    currentAIData = data.find(ai => ai.id === id);

    showChat(currentAIData);

}
