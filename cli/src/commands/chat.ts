import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import axios from 'axios';
import { store } from '../store.js';

export async function chatCommand(userMessage?: string): Promise<void> {
  // Check if authenticated
  const config = store.getConfig();
  if (!config || !config.token) {
    console.log(chalk.red('❌ Belum login. Jalankan dulu:'));
    console.log(chalk.cyan('  $ garz-ai-cli init'));
    process.exit(1);
  }

  // If message provided, use it directly
  if (userMessage) {
    await sendMessage(config.token, userMessage);
    return;
  }

  // Otherwise, start interactive chat
  console.log(chalk.cyan(`
 ██████╗  █████╗ ██████╗ ███████╗     ██████╗██╗     ██╗
██╔════╝ ██╔══██╗██╔══██╗╚══███╔╝    ██╔════╝██║     ██║
██║  ███╗███████║██████╔╝  ███╔╝     ██║     ██║     ██║
██║   ██║██╔══██║██╔══██╗ ███╔╝      ██║     ██║     ██║
╚██████╔╝██║  ██║██║  ██║███████╗    ╚██████╗███████╗██║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝╚══════╝╚═╝
  `));
  console.log(chalk.gray('═'.repeat(60)));
  console.log(chalk.cyan('🤖 Garz AI Chat - Powered by Garz AI CLI'));
  console.log(chalk.gray('Ketik "exit" untuk keluar'));
  console.log(chalk.gray('═'.repeat(60) + '\n'));

  let continueChat = true;

  while (continueChat) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: chalk.cyan('You:'),
        validate: (input: string) => {
          if (!input.trim()) return 'Masukkan pesan';
          return true;
        },
      },
    ]);

    const message = answers.message.trim();

    if (message.toLowerCase() === 'exit') {
      console.log(chalk.cyan('\nGoodbye! 👋\n'));
      continueChat = false;
      break;
    }

    await sendMessage(config.token, message);
  }
}

async function sendMessage(token: string, message: string): Promise<void> {
  const spinner = ora(chalk.cyan('Thinking...')).start();

  try {
    const response = await axios.post('https://api.cerebras.ai/v1/chat/completions', {
      model: 'llama-3.1-70b',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }, {
      headers: {
        // 🔥 PERBAIKAN: Menggunakan token verifikasi dari store/website yang dilewatkan ke fungsi ini
        'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY || token}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    spinner.stop();

    if (response.data && response.data.choices && response.data.choices[0]) {
      const assistantMessage = response.data.choices[0].message.content;
      console.log(chalk.green('\nAssistant:'));
      console.log(chalk.white(`${assistantMessage}\n`));
    } else {
      console.log(chalk.red('\n❌ Tidak ada response dari API'));
    }
  } catch (error: any) {
    spinner.fail();
    if (error.response?.status === 401) {
      console.log(chalk.red('\n❌ Verifikasi Gagal: Token atau API Key tidak valid.'));
    } else if (error.code === 'ECONNABORTED') {
      console.log(chalk.red('\n❌ Request timeout - coba lagi'));
    } else {
      console.log(chalk.red(`\n❌ Error: ${error.message}`));
    }
  }
}
