function renderTopBar(title){

    return `

<header class="topbar">

    <div class="topbar-left">

        <img src="assets/logo.png" class="top-logo">

        <span class="top-title">

            ${title}

        </span>

    </div>

    <div class="topbar-right">

	<button

	class="top-icon"

	onclick="openSearch()">

	🔍

	</button>

        <button class="top-icon">

            ＋

        </button>

    </div>

</header>

`;

}
