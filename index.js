const { Client, Intents, Sweepers, DataManager, GuildMemberRoleManager } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  console.log(commandName)

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(`${interaction.guild.name} best server 😎 ${interaction.guild.iconURL()}`);
  } else if (commandName === 'user') {
    const data = [];
    const guildRoles = interaction.guild.roles.fetch().then(response => console.table(response))
    await interaction.reply(`Here: ` + JSON.stringify(guildRoles));
  } else if (commandName === 'random') {
    await interaction.reply(`Here: `+ Math.floor(Math.random() * 99999));
  } else if (commandName === 'clear') {
    limit = await (await interaction.channel.fetch()).messages
    console.log(limit)
    await interaction.reply(`Delete messages from 200 seconds`);
  }
});


client.login(token);