import chalk from 'chalk';
export function helpCommand() {
    console.log(chalk.cyan('\n🤖 garz-ai CLI\n'));
    console.log(chalk.yellow('Usage:'));
    console.log('  garz-ai-cli [command] [options]\n');
    console.log(chalk.yellow('Commands:'));
    console.log('  init                      Authenticate with a CLI code');
    console.log('  chat                      Start interactive chat');
    console.log('  chat "message"            Send a single message');
    console.log('  help                      Show this help message\n');
    console.log(chalk.yellow('Options:'));
    console.log('  --code=CODE              CLI code for initialization');
    console.log('  --website=URL            Custom website URL (default: https://garz-ai.vercel.app)\n');
    console.log(chalk.yellow('Examples:'));
    console.log('  Get a CLI code:');
    console.log(chalk.cyan('    Visit https://garz-ai.vercel.app/cli\n'));
    console.log('  Initialize:');
    console.log(chalk.cyan('    garz-ai-cli init --code=GARZ-ABC123-XYZ456\n'));
    console.log('  Start chat:');
    console.log(chalk.cyan('    garz-ai-cli chat\n'));
    console.log('  Send message:');
    console.log(chalk.cyan('    garz-ai-cli chat "What is Cerebras AI?"\n'));
    console.log(chalk.gray('For more info, visit: https://garz-ai.vercel.app'));
    console.log('');
}
