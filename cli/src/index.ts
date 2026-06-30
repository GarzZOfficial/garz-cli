#!/usr/bin/env node

import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { chatCommand } from './commands/chat.js';
import { helpCommand } from './commands/help.js';

async function main() {
  const args = process.argv.slice(2);

  // Parse arguments
  const command = args[0];
  let code: string | undefined;
  let websiteUrl: string | undefined;

  // Extract options
  for (const arg of args) {
    if (arg.startsWith('--code=')) {
      code = arg.replace('--code=', '');
    }
    if (arg.startsWith('--website=')) {
      websiteUrl = arg.replace('--website=', '');
    }
  }

  try {
    if (!command || command === 'help' || command === '--help' || command === '-h') {
      helpCommand();
    } else if (command === 'init') {
      await initCommand(code || '', websiteUrl);
    } else if (command === 'chat') {
      // If there are more arguments after 'chat', treat them as the message
      const message = args.slice(1).join(' ').replace(/^["']|["']$/g, '');
      await chatCommand(message || undefined);
    } else {
      console.log(chalk.red(`❌ Unknown command: ${command}\n`));
      helpCommand();
      process.exit(1);
    }
  } catch (error) {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
  }
}

main();
