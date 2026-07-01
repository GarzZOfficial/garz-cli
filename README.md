# ██████╗  █████╗ ██████╗ ███████╗     ██████╗██╗     ██╗
# ██╔════╝ ██╔══██╗██╔══██╗╚══███╔╝    ██╔════╝██║     ██║
# ██║  ███╗███████║██████╔╝  ███╔╝     ██║     ██║     ██║
# ██║   ██║██╔══██║██╔══██╗ ███╔╝      ██║     ██║     ██║
# ╚██████╔╝██║  ██║██║  ██║███████╗    ╚██████╗███████╗██║
#  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝╚══════╝╚═╝

# garz-ai-cli

> **Terminal AI Chat Tool** — Chat langsung dengan Garz AI / Cerebras AI dari Terminal, CMD, PowerShell, Linux, macOS, maupun Termux.

---

# 🚀 Quick Installation

```bash
# 1. Clone repository
git clone https://github.com/garzzsiu/garz-ai-cli.git

# 2. Masuk ke folder CLI
cd garz-ai-cli/cli

# 3. Install dependencies (PENTING!)
npm install

# 4. Build project
npm run build

# 5. Link secara global
npm link

# 6. Test CLI
garz-ai-cli help
garz-ai-cli init
garz-ai-cli chat
```

---

# Authentication

Jalankan:

```bash
garz-ai-cli init
```

CLI akan membuat kode seperti:

```
GRZ-ABC123
```

Lalu buka:

```
https://garz-ai.vercel.app/cli
```

Masukkan kode tersebut kemudian klik:

```
Validasi & Otorisasi Node
```

Terminal akan otomatis terhubung.

---

# Start Chat

Interactive Chat

```bash
garz-ai-cli chat
```

Single Message

```bash
garz-ai-cli chat "Halo Garz AI"
```

---

# Commands

```bash
garz-ai-cli help

garz-ai-cli init

garz-ai-cli init --code=GRZ-ABC123

garz-ai-cli chat

garz-ai-cli chat "Hello World"
```

---

# API Integration

CLI menggunakan endpoint dari Garz AI.

### Authentication

```
GET /api/cli-auth?action=check_code_status&code=GRZ-ABC123
```

```
POST /api/cli-auth
```

Action:

```
approve_session
```

---

# AI Chat

CLI mengirim request ke Cerebras menggunakan:

```
CEREBRAS_API_KEY
```

Response akan langsung ditampilkan di Terminal.

---

# Project Structure

```
cli/
├── src/
│   ├── index.ts
│   ├── store.ts
│   ├── api.ts
│   └── commands/
│       ├── init.ts
│       ├── chat.ts
│       └── help.ts
├── dist/
└── package.json
```

---

# Environment

Untuk deployment (Vercel)

```
CEREBRAS_API_KEY=your_api_key
```

Untuk development

```
.env.local

CEREBRAS_API_KEY=your_api_key
```

---

# Local Testing

```bash
npm run build

garz-ai-cli help

garz-ai-cli init

garz-ai-cli chat "Hello"
```

---

# Publish Package

```bash
npm publish
```

Install dari npm

```bash
npm install -g garz-ai-cli
```

---

# Documentation

Dokumentasi lengkap tersedia di:

```
cli/README.md
```

---

Made with ❤️ by Garz AI
