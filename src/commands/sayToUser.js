const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("saytouser")
    .setDescription("Enviale un mensaje a un usuario como el bot")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption((o) =>
      o
        .setName("user")
        .setDescription("Usuario al que se le mandara")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o
        .setName("message")
        .setDescription("Mensaje que se mandara")
        .setRequired(true)
    ),
  run: async (interaction) => {
    let user = interaction.options.getUser("user");
    let msg = interaction.options.getString("message");

    try {
      user.send(msg);
      interaction.reply({
        content: "Mensaje enviado correctamente",
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply({ content: "Algo salio mal!", ephemeral: true });
      console.error(error);
    }
  },
};
