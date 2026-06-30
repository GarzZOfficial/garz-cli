import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import type { CLICode } from './cli-types';

const ENCRYPTION_KEY = process.env.CEREBRAS_API_KEY || 'fallback-key';

// In-memory store (in production, use database like Neon/Supabase)
const codeStore = new Map<string, CLICode>();

export function generateCLICode(): { code: string; token: string } {
  const token = uuidv4();
  const code = generateReadableCode();

  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

  const cliCode: CLICode = {
    id: uuidv4(),
    code,
    token: encryptToken(token),
    createdAt: new Date(),
    expiresAt,
    used: false,
  };

  codeStore.set(code, cliCode);

  return { code, token };
}

export function verifyCLICode(code: string): { token: string; success: boolean } | null {
  const cliCode = codeStore.get(code);

  if (!cliCode) {
    return null;
  }

  // Check expiry
  if (new Date() > cliCode.expiresAt) {
    codeStore.delete(code);
    return null;
  }

  // Check if already used
  if (cliCode.used) {
    return null;
  }

  // Mark as used
  cliCode.used = true;
  cliCode.usedAt = new Date();
  codeStore.set(code, cliCode);

  return { token: decryptToken(cliCode.token), success: true };
}

export function validateCLIToken(token: string): boolean {
  // Check if token exists in any cliCode
  for (const cliCode of codeStore.values()) {
    if (decryptToken(cliCode.token) === token && cliCode.used) {
      // Check if not expired
      if (new Date() <= new Date(cliCode.expiresAt.getTime() + 24 * 60 * 60 * 1000)) {
        return true;
      }
    }
  }
  return false;
}

function encryptToken(token: string): string {
  return CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
}

function decryptToken(encryptedToken: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

function generateReadableCode(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'GARZ-';

  for (let i = 0; i < 12; i++) {
    if (i === 4 || i === 8) {
      code += '-';
    }
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}

// Cleanup expired codes periodically
setInterval(() => {
  const now = new Date();
  for (const [code, cliCode] of codeStore.entries()) {
    if (now > cliCode.expiresAt) {
      codeStore.delete(code);
    }
  }
}, 60 * 60 * 1000); // Run every hour
