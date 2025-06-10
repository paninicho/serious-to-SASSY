````markdown
# Serious-to-Sassy

Convert formal prose—academic papers, news articles, classic drama, and more—into contemporary Gen-Z styles (**emo**, **hip-hop**, **flirty**, **sarcastic**, **sassy**).  
Built with **Node 18 + Express**, vanilla HTML/CSS/JavaScript, and **OpenAI GPT-4o**.

[![Node.js](https://img.shields.io/badge/node-%3E=18.x-green?logo=node.js)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/server-express-blue?logo=express)](https://expressjs.com/) 
[![OpenAI GPT-4o](https://img.shields.io/badge/LLM-GPT-4o-API-red?logo=openai&logoColor=white)](https://platform.openai.com/) 
[![License: MIT](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

---

## Key Features

| Capability | Description |
|------------|-------------|
| **Style Transfer** | Five tone presets: *emo*, *hip-hop*, *flirty*, *sarcastic*, *sassy*. |
| **A/B Variant Generation** | Two rewrites per request so users can pick the stronger result. |
| **Bilingual Input** | Accepts English **and** Korean text. |
| **User Feedback Loop** | Preferred outputs are appended to `feedback_log.json` for future evaluation. |
| **Rich Frontend** | Pixel-art style selector, looped 8-bit BGM, hover “meow” SFX. |
| **Stateless API** | Simple `/style` and `/feedback` endpoints; the server stores nothing but optional feedback logs. |

---

## Project Architecture

```text
Client (HTML + CSS + JS)  ─┬─►  POST /style     ─┐
                           │                     │
                           └─►  POST /feedback   ─┴─► OpenAI GPT-4o
                                                   │
                                              feedback_log.json
````

---

## Prerequisites

* **Node 18** or newer
* **npm** (bundled with Node)
* An **OpenAI API key** with GPT-4o access

---

## Local Installation

```bash
# 1 Clone repository
git clone https://github.com/<ORG_OR_USER>/serious_to_sassy_server.git
cd serious_to_sassy_server

# 2 Install Node dependencies
npm install

# 3 Provide API credentials
cp .env.example .env        # then edit .env and set OPENAI_API_KEY

# 4 Launch development server
npm run dev                 # nodemon → http://localhost:3000
```

---

## Environment Variables

| Key              | Required | Description                                            |
| ---------------- | -------- | ------------------------------------------------------ |
| `OPENAI_API_KEY` | **Yes**  | Secret key used to authenticate requests to OpenAI API |

`PORT` is optional (defaults to **3000**).

---

## Usage

1. Open **[http://localhost:3000](http://localhost:3000)** in the browser.
2. Click a pixel-cat card to choose the style.
3. Paste or type the source text.
4. Press **GenZfy**. Two rewrites (🅰️ / 🅱️) appear.
5. Copy your preferred version or record feedback.
6. Feedback is stored in `feedback_log.json` for later analysis or model tuning.

---

## Directory Layout

```text
serious_to_sassy_server/
├── server.js                     # Express server + OpenAI integration
├── package.json / package-lock.json
├── .env                          # API key (untracked)
├── feedback_log.json             # Auto-generated feedback archive
└── serious_to_sassy_navigate/    # Static frontend (served by Express)
    ├── assets/                   # Images + audio
    │   ├── cat1.png …            # Style cats
    │   ├── bgm.mp3               # 8-bit background loop
    │   └── meow.mp3              # Hover SFX
    ├── index.html                # Style-selection landing page
    ├── script.js                 # Landing-page logic (BGM, routing)
    ├── style.css                 # Retro fonts + layout
    ├── translate.html            # Editor / A-B picker
    └── translate.js              # fetchStyle, copy, feedback, loading UI
```

---

## Extending the Application

### Add a New Style

1. **Update prompts** in `server.js`:

```js
stylePrompts['whimsical'] =
  'Do not answer… Rewrite the text in a whimsical, fairy-core Gen-Z tone 🧚‍♀️.';
```

2. **Create an asset** (`assets/cat6.png`), then insert a card in **`index.html`**:

```html
<img src="assets/cat6.png" class="card-img"
     onclick="goTranslate('whimsical')" onmouseenter="playMeow()" />
```

The client passes any `style` string directly to `/style`; no further wiring required.

### Deploy

The app runs on any Node-compatible platform (Heroku, Render, Fly.io, Railway, Docker, etc.).
Just set `OPENAI_API_KEY` and, if necessary, `PORT`.

---

## Roadmap

| Milestone                                    | Status  |
| -------------------------------------------- | ------- |
| Local Hugging Face fallback for offline mode | Planned |
| Vector-store caching to reduce token spend   | Planned |
| Drag-and-drop PDF ingestion                  | Planned |
| Dockerfile for one-command deploy            | Planned |

---

## Contributing

Pull requests and issues are welcome.
Guidelines:

* Use **conventional commits** (`feat: …`, `fix: …`, `docs: …`).
* Run `npm test` (if present) before pushing.
* Target the `main` branch unless otherwise noted.

---

## License

Released under the MIT License. See [`LICENSE`](LICENSE) for details.

```
```
