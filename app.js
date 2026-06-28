const tg = window.Telegram.WebApp;

tg.ready();

tg.expand();

let user = tg.initDataUnsafe.user;

if(user){

document.getElementById("welcome").innerHTML =
"Welcome, <b>" + user.first_name + "</b>";

}else{

document.getElementById("welcome").innerHTML =
"Welcome to OEDXBOT";

}

document.getElementById("website").onclick=function(){

window.open(
"https://6a3eeca15ce12.site123.me",
"_blank"
);

}

document.getElementById("ai").onclick=function(){

alert("AI Assistant Coming Soon");

}

document.getElementById("terminal").onclick=function(){

alert("RNX Workspace Coming Soon");

}

document.getElementById("tools").onclick=function(){

alert("Tools Coming Soon");

}

document.getElementById("settings").onclick=function(){

alert("Settings Coming Soon");

}
