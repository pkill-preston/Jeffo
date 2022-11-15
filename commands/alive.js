const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('answer')
    .setDescription('brings to life'),
  async execute(interaction){
    console.log('here it is my man: ', interaction)
    await interaction.reply("It's Alive!");
  }
}
