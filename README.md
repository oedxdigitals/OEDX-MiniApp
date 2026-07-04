# 🤖 OEDXBOT MiniApp

> A modern AI-powered Telegram Mini App and Web Chat Platform built by **OEDX DIGITALS**.

OEDXBOT MiniApp is a lightweight, responsive AI platform that allows users to chat with multiple AI specialists from a beautiful ChatGPT-inspired interface. It works both as a **Telegram Mini App** and as a **web application**, connecting to the OEDXBOT Backend API.

---

# ✨ Features

## 🤖 Multiple AI Specialists

Choose from specialized AI assistants including:

- 💻 Coding AI
- 🌐 General AI
- 📈 Business AI
- 📚 Education AI
- ✍️ Writing AI
- 🎨 Creative AI
- 🛡️ Cybersecurity AI
- 📱 Social Media AI
- and more...

---

## 💬 Modern Chat Interface

- ChatGPT-inspired layout
- Responsive UI
- Telegram Mini App support
- Desktop & Mobile friendly
- Beautiful Markdown rendering
- AI code highlighting
- Copy code button
- Auto-resizing message composer

---

## 🧠 AI Backend

Supports multiple AI providers through OEDXBOT Backend.

Current provider:

- Groq API

Future providers:

- Ollama
- OpenAI
- Claude
- Gemini
- DeepSeek

---

# 📁 Project Structure

```
OEDX-MiniApp/
│
├── assets/
│   ├── icons/
│   └── images/
│
├── components/
│   ├── sidebar.js
│   ├── topbar.js
│   └── search.js
│
├── css/
│   ├── style.css
│   ├── chat.css
│   └── components.css
│
├── data/
│   └── specialists.json
│
├── pages/
│   ├── home.js
│   └── chat.js
│
├── services/
│   ├── api.js
│   ├── app.js
│   ├── chat.js
│   ├── router.js
│   ├── storage.js
│   └── telegram.js
│
├── index.html
└── README.md
```

---

# 🚀 Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- Telegram Mini App SDK
- Markdown (Marked.js)
- Highlight.js
- REST API
- Railway Backend

---

# 🌍 Backend API

The MiniApp communicates with the OEDXBOT Backend.

```
POST /chat/
```

Example request:

```json
{
  "specialist": "coding",
  "message": "Write a Python API"
}
```

Example response:

```json
{
  "success": true,
  "reply": "Sure! Here's a FastAPI example..."
}
```

---

# 📱 Telegram Mini App

Supports:

- Telegram WebApp SDK
- User detection
- Full-screen mode
- Responsive layout
- Mobile optimization

---

# 🖥️ Browser Support

Works on:

- Chrome
- Edge
- Firefox
- Brave
- Opera
- Safari

---

# 🎨 UI Highlights

- Modern dark theme
- ChatGPT-inspired design
- Desktop sidebar
- Mobile responsive layout
- Sticky message composer
- Smooth animations
- Markdown support
- Syntax highlighting
- Copy code button

---

# 🔥 Current Version

## v4.0

### UI Redesign

- New application layout
- Modern sidebar
- Responsive top bar
- Improved chat experience
- Better routing architecture
- Cleaner project structure

### Architecture

Migrated from:

```
js/
```

to

```
services/
```

Added:

```
pages/
components/
```

Result:

- Better maintainability
- Modular architecture
- Easier future expansion

---

# 📌 Roadmap

## v4.1

- Chat History
- Search Conversations
- Authentication
- AI Streaming
- Better Error Handling

---

## v4.2

- Image Generation
- Video Generation
- Voice Input
- File Upload
- PDF Support

---

## v5.0

- AI Marketplace
- Plugins
- AI Memory
- Team Workspace
- Cloud Sync

---

# ⚙️ Local Development

Clone the repository:

```bash
git clone https://github.com/oedxdigitals/OEDX-MiniApp.git
```

Enter project:

```bash
cd OEDX-MiniApp
```

Run a local server:

Python:

```bash
python -m http.server
```

or

Node:

```bash
npx serve
```

Open:

```
http://localhost:8000
```

---

# 🌐 Deployment

Recommended platforms:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

---

# 📷 Screenshots

Coming Soon

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 🛡️ License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Obinna Emmanuel Duru**

Founder & Lead Developer

**OEDX DIGITALS**

---

# 🌐 Links

GitHub

https://github.com/oedxdigitals

Backend

https://github.com/oedxdigitals/OEDXBOT-Backend

Website

https://oedxdigitals.com *(Coming Soon)*

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

Your support helps improve OEDXBOT and future AI projects.

---

## Built with ❤️ by OEDX DIGITALS
