# Lehuye WebSocket Server

This is a lightweight WebSocket server built with Node.js. It listens on port `30725` and can be packaged as a standalone executable for macOS, Windows, and Linux using `pkg`.

## 📦 Features

- Minimal Node.js WebSocket server (`server.js` only)
- Runs on port `30725` for real-time communication
- Cross-platform: builds `.exe`, `.dmg`, and Linux binaries
- Does **not** require Node.js after packaging

## 🛠️ Installation

Install dependencies using Yarn:

```bash
yarn install
```

🚀 Run in Development

Start the server manually with the following command:

```bash
node server.js
```

📦 Build Standalone Executables

You can build cross-platform binaries using the following command:

```bash
yarn build
```

This will generate executable files in the applications/ directory. If the folder does not exist, it will be created automatically.

🔧 Build Script

Ensure your package.json includes the following script:

```bash
"scripts": {
  "build": "mkdir -p applications && pkg . --targets node18-linux-x64,node18-macos-x64,node18-win-x64 --out-path applications"
}
```


📁 Output Files

After building, you will find the following files in the applications/ folder:
	•	Lehuye_Server-linux
	•	Lehuye_Server-macos
	•	Lehuye_Server-win.exe

Each of these can run independently — no Node.js runtime required.


📄 License

MIT © Lehuye

Email & Paypal: aboutworks@outlook.com