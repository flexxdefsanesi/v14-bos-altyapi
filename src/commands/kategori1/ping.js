const Discord = require("discord.js");

module.exports = {
  slash: new Discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun ping değerini gösterir"),
    
  execute: async (client, interaction) => {
    const botLatency = Date.now() - interaction.createdTimestamp;
    const apiLatency = client.ws.ping;
    
    const embed = new Discord.EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("🏓 Pong!")
      .addFields(
        { name: "Bot Gecikmesi", value: `${botLatency}ms`, inline: true },
        { name: "API Gecikmesi", value: `${apiLatency}ms`, inline: true }
      )
      .setFooter({ text: `${interaction.user.tag} tarafından istendi` })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
};