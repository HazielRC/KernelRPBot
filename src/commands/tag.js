const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tag")
    .setDescription("Solicita que se te agregue un tag en el servidor.")
    .addStringOption((o) =>
      o
        .setName("jugador")
        .setDescription("Nombre ig del jugador que lo solicita.")
        .setRequired(true)
    )
    .addStringOption((o) =>
      o.setName("tag").setDescription("tag que se solicita.").setRequired(true)
    ),
  run: async (interaction) => {
    var jugador = interaction.options.getString("jugador");
    var tag = interaction.options.getString("tag");

    var embed = new EmbedBuilder()
    .setColor("Blue")
    .addFields(
      {name: "Jugador", value:jugador, inline: true},
      {name: "Tag", value:tag, inline: true},
      {name: "Discord", value:`<@${interaction.user.id}>`}
    );
    interaction.client.channels.cache.get("1078561358892761108").send({ embeds: [embed] }).then(msg => {
      msg.react('✅')
    })
    interaction.reply({content: `<@${interaction.user.id}> tu peticion fue enviada correctamente, se te notificara cuando tu tag sea asignado.`, ephemeral: true});
  },
};
