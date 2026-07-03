function renderTopBar(title = "OEDXBOT") {

    return `

<div class="topbar">

    <div class="topbar-left">

        <img
            src="assets/images/oedxbot-logo.png"
            class="top-logo">

        <span class="top-title">

            ${title}

        </span>

    </div>

    <div class="topbar-right">

	<button
	class="top-icon"
	onclick="reloadHome()"
	title="Home">

	🏠

	</button>

	<button
	    class="top-icon"
	    title="Search">

	    🔍

	</button>

    </div>

</div>

`;

}
