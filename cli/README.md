# garz-ai-cli 🤖

**Terminal AI Chat - Powered by Cerebras AI**

Chat dengan AI langsung dari terminal, CMD, atau Termux kamu. Cepat, aman, dan mudah!

## ✨ Features

✨ **Auto Code Generation** - `garz-ai-cli init` generate kode sendiri
💬 **Interactive Chat** - Chat langsung di terminal
🔐 **Secure Auth** - Token-based, aman & terenkripsi
⚡ **Cerebras Power** - Fast & accurate AI responses
🌍 **Cross-Platform** - Windows, Mac, Linux, Termux

## 📥 Installation

```bash
npm install -g garz-ai-cli
```

## 🚀 Quick Start (3 Steps)

### Step 1: Generate Code & Authenticate

```bash
garz-ai-cli init
```

Ini akan:
1. Generate kode unik (misal: `GRZ-ABC123`)
2. Show instruksi untuk approve di website
3. Tunggu sampai website approve (polling otomatis)

### Step 2: Open Website (di browser)

```
https://garz-ai.vercel.app/cli
```

- Paste kode dari terminal
- Klik "Validasi & Otorisasi Node"
- Terminal akan confirm otomatis

### Step 3: Start Chatting

```bash
garz-ai-cli chat
```

Done! 🎉 Sekarang bisa chat dengan AI!

## 💻 Usage

### Interactive Chat Mode

```bash
garz-ai-cli chat
```

Ketik pesan & tekan Enter. Ketik `exit` untuk keluar.

```
🤖 garz-ai Chat - Powered by Cerebras AI
Ketik "exit" untuk keluar

You: What is AI?
Assistant: Artificial intelligence is...

You: exit
Goodbye! 👋
```

### Single Message Mode

```bash
garz-ai-cli chat "Apa itu Cerebras?"
```

Langsung dapat jawaban tanpa interactive mode.

### Show Help

```bash
garz-ai-cli help
```

### Re-authenticate (New Code)

```bash
garz-ai-cli init --code=GRZ-ABC123
```

Atau tanpa code (auto-generate):

```bash
garz-ai-cli init
```

## Commands

| Command | Description |
|---------|-------------|
| `init --code=CODE` | Authenticate with a CLI code |
| `chat` | Start interactive chat mode |
| `chat "message"` | Send a single message |
| `help` | Show help information |

## Configuration

Your authentication token is stored locally at:
- **Linux/macOS**: `~/.garz-ai/config.json`
- **Windows**: `%USERPROFILE%\.garz-ai\config.json`

This file contains your token and website URL. Keep it safe!

## Examples

### Get a definition

```bash
$ garz-ai-cli chat "Define artificial intelligence"
Assistant:
Artificial intelligence (AI) refers to the simulation of human intelligence...
```

### Code help

```bash
$ garz-ai-cli chat "How do I center a div with CSS flexbox?"
Assistant:
To center a div with CSS flexbox, use these properties...
```

### Creative writing

```bash
$ garz-ai-cli chat "Write a short poem about programming"
Assistant:
Lines of code dancing on the screen,
Logic woven between the pixels...
```

## Troubleshooting

### "Invalid or expired CLI code"

- Generate a new code at https://garz-ai.vercel.app/cli
- Each code expires after 24 hours

### "Not authenticated"

- Run `garz-ai-cli init --code=YOUR_CODE` first
- Check that your code is correct

### Network errors

- Check your internet connection
- The website might be temporarily unavailable
- Try again in a few moments

### Command not found

Make sure you've installed globally:

```bash
npm install -g garz-ai-cli
```

## Custom Website URL

If you're using a custom deployment:

```bash
garz-ai-cli init --code=YOUR_CODE --website=https://your-website.com
garz-ai-cli chat --website=https://your-website.com
```

## Development

### Build from source

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run
node dist/index.js help
```

### Development mode

```bash
pnpm dev
```

## API Reference

The CLI communicates with these endpoints:

- `POST /api/cli/verify` - Verify CLI code and get token
- `POST /api/cli/chat` - Send message with token

See the main website code for API implementation details.

## License

MIT

## Support

For issues or questions, visit:
- Website: https://garz-ai.vercel.app
- Code Generator: https://garz-ai.vercel.app/cli

## Version

Current version: 1.0.0

---

Made with ❤️ by garz-ai team
