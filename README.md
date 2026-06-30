# garz-ai-cli

Terminal AI Chat Tool - CLI yang chat langsung dengan Cerebras AI dari terminal/CMD/Termux.

## Setup Cepat

### 1. Install CLI

```bash
npm install -g garz-ai-cli
```

### 2. Login

```bash
garz-ai-cli init
```

- Akan generate kode (GRZ-ABC123)
- Copy kode ke: https://garz-ai.vercel.app/cli
- Klik "Validasi & Otorisasi Node"
- Terminal akan approve otomatis

### 3. Chat!

```bash
garz-ai-cli chat
```

## API Integration

CLI menggunakan API dari website kak yang sudah di-deploy:

**Endpoints yang digunakan:**
- `GET /api/cli-auth?action=check_code_status&code=GRZ-ABC` - Poll status kode
- `POST /api/cli-auth` dengan `action=approve_session` - Website approve kode

**Chat dengan Cerebras:**
- CLI kirim message ke Cerebras API menggunakan `CEREBRAS_API_KEY`
- Response ditampilkan di terminal

## Project Structure

```
cli/
├── src/
│   ├── index.ts - Entry point
│   ├── store.ts - Local config storage
│   ├── commands/
│   │   ├── init.ts - Authentication & code polling
│   │   ├── chat.ts - Chat dengan Cerebras
│   │   └── help.ts - Help command
│   └── api.ts - API client (optional)
├── dist/ - Compiled JavaScript
└── package.json
```

## Commands

```bash
garz-ai-cli init                          # Generate & validate code
garz-ai-cli init --code=GRZ-ABC          # Use existing code
garz-ai-cli chat                          # Start interactive chat
garz-ai-cli chat "Your message"          # Send single message
garz-ai-cli help                          # Show help
```

## Environment

Untuk Vercel deployment, set:
```
CEREBRAS_API_KEY = your_api_key
```

Untuk local dev, buat `.env.local`:
```
CEREBRAS_API_KEY=your_api_key
```

## Local Testing

```bash
# Build
cd cli && pnpm build

# Test commands
node dist/index.js help
node dist/index.js init
node dist/index.js chat "Hello"
```

## Publishing

```bash
cd cli
npm publish
```

Users then install dengan:
```bash
npm install -g garz-ai-cli
```

## Docs

Lihat `cli/README.md` untuk dokumentasi lengkap.
