const { SlashCommandBuilder } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('summon')
    .setDescription('Get over here'),
  async execute(interaction){
    const userId = interaction.user.id
    const guildId = interaction.guild.id
    const userInfo = interaction.guild.members.cache.get(userId)
    const channels = interaction.guild.channels.cache
    console.log(interaction.guild)
    let summonChannel = ''
    try {
      channels.forEach((element) => {
        if(element.type === 2){
          const channelMembers = interaction.guild.channels.cache.get(element.id).members
          channelMembers.forEach( (item) => {
            if(item.id === userId){
              summonChannel = element.id
              console.log('Found ya:', item.user.username)
              console.log('At channel:', element.name)
            }
          })
        }
      })
      const connection = joinVoiceChannel({
        channelId: summonChannel,
        guildId: guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
    } catch (e){
      console.log(e)
    }

  }
}
