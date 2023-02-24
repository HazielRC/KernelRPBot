const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Ve la informacion del servidor."),
  run: async (interaction) => {
    let embed = new EmbedBuilder();
    embed.setTitle(interaction.guild.name)
    .setThumbnail(interaction.guild.iconURL())
    .setImage(interaction.guild.iconURL({ format: 'jpg', size: 512}));

    interaction.reply({ embeds: [embed] });
  },
};
