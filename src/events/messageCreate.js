const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,
  run: async(message) => {
    if(message.channel.id == "1072027757082591263") {
      message.react('✅')
      message.react('❌')
    }
  }
}