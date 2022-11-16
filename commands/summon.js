const { SlashCommandBuilder } = require('discord.js')
const { joinVoiceChannel, createAudioPlayer, createAudioResource , StreamType, demuxProbe, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice');
const play = require('play-dl')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('summon')
    .setDescription('Get over here')
    .addStringOption(option =>
      option
        .setName('song')
        .setDescription('Song to be played')
        .setRequired(false)),
  async execute(interaction){
    let answerOption = interaction.options._hoistedOptions[0]?.value ?? "You didn't say anything"
    const userId = interaction.user.id
    const guildId = interaction.guild.id
    const channels = interaction.guild.channels.cache
    let summonChannel = ''
    play.getFreeClientID().then((clientID) => {
      play.setToken({
        soundcloud : {
          client_id : clientID
        }
      })
    })
    // console.log(interaction.guild)
    try {
      channels.forEach((element) => {
        if(element.type === 2){
          const channelMembers = interaction.guild.channels.cache.get(element.id).members
          channelMembers.forEach( (item) => {
            if(item.id === userId){
              summonChannel = element.id
              // console.log('Found ya:', item.user.username)
              // console.log('At channel:', element.name)
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
    let stream = await play.stream(answerOption)
    let resource = createAudioResource(stream.stream, {
      inputType: stream.type
    })
    let player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play
      }
    })
    player.play(resource)

    connection.subscribe(player)

  }
}
