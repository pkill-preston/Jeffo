const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('answer')
    .setDescription('brings to life')
    .addStringOption(option =>
      option
        .setName('word')
        .setDescription('Word to answer to')
        .setRequired(false)),
  async execute(interaction){
    let answerOption = interaction.options._hoistedOptions[0]?.value ?? "You didn't say anything"
    console.log('here it is my man: ', interaction)
    console.log('the options : ', answerOption)
    await interaction.reply(`${answerOption}`);
  }
}
