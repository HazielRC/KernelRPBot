const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  run: async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `[ERROR] No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.run(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: `There was an error while executing this command!`,
        ephemeral: true,
      });
    }
  }
};
