import chalk from 'chalk';

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(chalk.green(`✓ Logged in as ${client.user.tag}`));
    console.log(chalk.cyan(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`));
    console.log(chalk.white(`📊 Servers: ${client.guilds.cache.size}`));
    console.log(chalk.white(`👥 Users: ${client.users.cache.size}`));
    console.log(chalk.white(`📝 Commands: ${client.commands.size}\n`));
    
    client.user.setActivity('🎫 Tickets', { type: 'WATCHING' });
  }
};
