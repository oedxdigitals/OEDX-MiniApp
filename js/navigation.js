function showPage(page){

    switch(page){

	case "chats":
	    showChats();
	    break;

	case "bots":

	    showBots();

	    break;

        case "create":
            app.innerHTML = `
                <div class="page">
                    <h2>Create</h2>
                    <p>🚧 Image & Video Generator (Coming Soon)</p>
                </div>
            `;
            break;

        case "contact":
            app.innerHTML = `
                <div class="page">
                    <h2>Contact</h2>
                    <p>Email: support@oedxdigitals.com</p>
                </div>
            `;
            break;

        case "profile":
            app.innerHTML = `
                <div class="page">
                    <h2>Profile</h2>
                    <p>Login with Google or Facebook (Coming Soon)</p>
                </div>
            `;
            break;

    }

}
