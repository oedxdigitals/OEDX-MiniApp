function loadRecentChats(){

    const recent=document.getElementById("recentList");

    if(!recent) return;

    const chats=getChats();

    recent.innerHTML="";

    Object.keys(chats).forEach(name=>{

        recent.innerHTML+=`

<div class="recent-item">

💬 ${name}

</div>

`;

    });

}
