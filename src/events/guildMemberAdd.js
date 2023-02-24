const { Events, EmbedBuilder } = require('discord.js');
const { welcomes } = require('../config.json');

function stringFormat(str, ...args) {
  return str.replace(/{(\d+)}/g, function(match, index) {
    return typeof args[index] != 'undefined' ? args[index] : match;
  });
}

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  run: async(member) => {
    const embed = new EmbedBuilder()
      .setDescription(stringFormat(welcomes.welcome_message, `<@${member.user.id}>`, member.user.id, member.user.tag))
      .setColor("Green");
    member.guild.channels.cache.get(welcomes.welcome_channel).send({content: `<@${member.user.id}>`,embeds: [embed]});
  }
}