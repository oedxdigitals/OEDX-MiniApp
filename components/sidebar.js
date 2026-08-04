function renderSidebar(){

return `

<nav class="sidebar-container" aria-label="Main sidebar">

  <div class="sidebar-header">
    <img src="assets/images/oedxbot-logo.png" class="sidebar-logo" alt="OEDXBOT">
    <h2>OEDXBOT</h2>
  </div>

  <button id="new-chat-btn" class="sidebar-new" aria-label="New chat">＋ New Chat</button>

  <div class="sidebar-menu" role="menu" aria-label="Primary">
    <div class="sidebar-item active" role="button" tabindex="0" data-route="chats">💬 Chats</div>
    <div class="sidebar-item" role="button" tabindex="0" data-route="bots">🤖 Bots</div>
    <div class="sidebar-item" role="button" tabindex="0" data-route="create">✨ Create</div>
    <div class="sidebar-item" role="button" tabindex="0" data-route="contact">📩 Contact</div>
    <div class="sidebar-item" role="button" tabindex="0" data-route="profile">👤 Profile</div>
  </div>

  <div class="sidebar-history" aria-label="Recent chats">
    <h4>Recent Chats</h4>
    <div id="recent-list">
      <div class="history-item" role="button" tabindex="0" data-chat-id="coding-ai">💻 Coding AI</div>
      <div class="history-item" role="button" tabindex="0" data-chat-id="general-ai">🌐 General AI</div>
    </div>
  </div>

  <div class="sidebar-footer" aria-hidden="false">
    <strong>OEDXBOT AI</strong>
    <small>Built by Obinna Emmanuel Duru</small>
    <small>Powered by OEDX DIGITALS</small>
    <small>v3.0 Beta</small>
  </div>

</nav>

`;

}
