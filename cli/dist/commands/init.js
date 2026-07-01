import chalk from 'chalk';
import ora from 'ora';
import axios from 'axios';
import { store } from '../store.js';

function generateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'GRZ-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// ==========================================================================
// NEW: FUNGSI DETAK JANTUNG (Menjaga status 'active: true' di Blok B API-mu)
// ==========================================================================
function startHeartbeat(token: string, websiteUrl: string) {
  // Jalankan interval di background agar tidak mengganggu proses CLI utama
  setInterval(async () => {
    try {
      await axios.post(`${websiteUrl}/api/cli-auth`, {
        action: 'termux_heartbeat',
        token: token,
        errorLog: null
      }, { timeout: 4000 });
    } catch (err) {
      // Di-silent agar tidak merusak tampilan terminal user saat chat
    }
  }, 25000); // Kirim setiap 25 detik (Aman di bawah batas limit 60 detik milikmu)
}

export async function initCommand(code: string = '', websiteUrl: string = 'https://garz-ai.vercel.app'): Promise<void> {
  try {
    let authCode = code;
    if (!authCode) {
      authCode = generateCode();

      // Mendaftarkan kode baru ke server Next.js (Memicu Blok REGISTRASI KODE AWAL)
      try {
        await axios.post(`${websiteUrl}/api/cli-auth`, {
          action: 'register_code',
          code: authCode
        }, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
      } catch (regError) {
        // Tetap lanjut polling jika terjadi gangguan minor jaringan
      }

      // Tampilan ASCII Art "GARZ CLI"
      console.log(chalk.cyan(`
 ██████╗  █████╗ ██████╗ ███████╗     ██████╗██╗     ██╗
██╔════╝ ██╔══██╗██╔══██╗╚══███╔╝    ██╔════╝██║     ██║
██║  ███╗███████║██████╔╝  ███╔╝     ██║     ██║     ██║
██║   ██║██╔══██║██╔══██╗ ███╔╝      ██║     ██║     ██║
╚██████╔╝██║  ██║██║  ██║███████╗    ╚██████╗███████╗██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝╚══════╝╚═╝
      `));
      console.log(chalk.gray('═'.repeat(60)));
      console.log(chalk.cyan(' 🔐 Garz AI - Terminal Authentication Hub'));
      console.log(chalk.gray('═'.repeat(60)));
      console.log(chalk.yellow(`\n 📝 Your authentication code:\n`));
      console.log(chalk.bold.cyan(`    ${authCode}\n`));
      console.log(chalk.white(' Steps:'));
      console.log(chalk.gray(`  1. Buka browser ke: ${websiteUrl}/cli`));
      console.log(chalk.gray(`  2. Input kode di atas`));
      console.log(chalk.gray(`  3. Klik "Validasi & Otorisasi Node"`));
      console.log(chalk.gray(`\n ⏳ Waiting for website confirmation...`));
      console.log(chalk.gray(' (Press Ctrl+C to cancel)\n'));
    }

    const spinner = ora(chalk.cyan('⏳ Polling server untuk konfirmasi kode...')).start();

    // Polling sampai code disetujui di website (Memicu Blok A: TERMUX POLLING CHECKER)
    let maxAttempts = 120; // 2 menit timeout
    let attempt = 0;
    let token = '';
    let approved = false;

    while (attempt < maxAttempts && !approved) {
      try {
        const response = await axios.get(`${websiteUrl}/api/cli-auth`, {
          params: {
            action: 'check_code_status',
            code: authCode,
          },
          timeout: 5000,
        });

        if (response.data.status === 'authorized') {
          token = response.data.token;
          approved = true;
          break;
        }
      } catch (error) {
        // Lanjutkan polling secara diam-diam jika terjadi galat jaringan sesaat
      }

      attempt++;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Jeda 1 detik
    }

    if (!approved) {
      spinner.fail();
      console.log(chalk.red('\n❌ Timeout: Kode tidak disetujui dalam 2 menit'));
      console.log(chalk.yellow(`\nSilakan coba lagi dengan kode baru`));
      process.exit(1);
    }

    // Mengamankan token yang valid dari server
    const finalToken = token || 'GRZ-WEB-MEMBER-TOKEN-DEFAULT';

    // Menyimpan data konfigurasi ke local store bawaan CLI-mu
    store.setConfig({
      token: finalToken,
      websiteUrl,
      authCode,
      createdAt: new Date().toISOString(),
    });

    spinner.succeed();
    console.log(chalk.green('\n✓ Kode berhasil diverifikasi!'));
    
    // ==========================================================================
    // SINKRONISASI NYATA: Jalankan detak jantung agar indikator web menyala hijau
    // ==========================================================================
    startHeartbeat(finalToken, websiteUrl);

    console.log(chalk.cyan('\nSekarang kamu bisa mulai chatting:'));
    console.log(chalk.white('    $ garz-ai-cli chat'));
    console.log(chalk.gray('    $ garz-ai-cli chat "Halo Garz AI!"'));
    console.log(chalk.gray('\n'));
    
  } catch (error) {
    console.log(chalk.red('\n❌ Terjadi error'));
    if (error instanceof Error) {
      console.error(chalk.gray(error.message));
    }
    process.exit(1);
  }
}
