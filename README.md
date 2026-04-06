# deepseek-chat-exporter
Export your entire DeepSeek conversation history as a single Markdown file – no manual scrolling, no API keys, just paste and run.
# DeepSeek Chat Exporter

Export **every message** from any DeepSeek conversation (including the very first one) directly to a clean Markdown file. Works entirely in your browser console – no extensions, no API calls, no manual scrolling.

## ✨ Features

- 📜 **Full history** – automatically loads older messages by simulating human‑like scrolling.
- 🚀 **One‑click export** – paste a single script, wait, and download.
- 🔒 **Privacy‑first** – runs locally, no data leaves your browser.
- 📁 **Markdown output** – alternating `## User:` / `## DeepSeek:` blocks, ready for notes, backup, or sharing.
- 🧩 **Zero configuration** – works on `chat.deepseek.com` out of the box.

## 🧪 How to use

1. Open your DeepSeek conversation in a browser.
2. Press `F12` to open Developer Tools → **Console**.
3. Copy and paste the script (see below) and press `Enter`.
4. Wait while the page automatically scrolls up and loads all messages.
5. The `.md` file will download automatically.

## 📜 The script

```javascript
// Paste the final script from above (the one that worked for you)
