const Discord = require("discord.js");

module.exports = {
  slash: new Discord.SlashCommandBuilder()
    .setName("button")
    .setDescription("Örnek buton kullanımı."),
    
  execute: async (client, interaction) => {
    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId("birinci_buton")
          .setLabel("Birinci Buton")
          .setStyle(Discord.ButtonStyle.Primary),
          
        new Discord.ButtonBuilder()
          .setCustomId("ikinci_buton")
          .setLabel("İkinci Buton")
          .setStyle(Discord.ButtonStyle.Success),
          
        new Discord.ButtonBuilder()
          .setCustomId("ucuncu_buton")
          .setLabel("Üçüncü Buton")
          .setStyle(Discord.ButtonStyle.Danger)
      );

    const embed = new Discord.EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Buton Örneği")
      .setDescription("Aşağıdaki butonlardan herhangi birine tıklayabilirsiniz.")
      .setTimestamp();
    
    const message = await interaction.reply({
      embeds: [embed],
      components: [row],
      fetchReply: true
    });
    
    const collector = message.createMessageComponentCollector({
      time: 120000
    });
    
    collector.on("collect", async i => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({
          content: "Bu butonları sadece komutu kullanan kişi kullanabilir.",
          ephemeral: true
        });
      }
      
      if (i.customId === "birinci_buton") {
        await i.reply({
          content: "Birinci butona tıkladınız!",
          ephemeral: true
        });
      }
      
      if (i.customId === "ikinci_buton") {
        await i.reply({
          content: "İkinci butona tıkladınız!",
          ephemeral: true
        });
      }
      
      if (i.customId === "ucuncu_buton") {
        await i.reply({
          content: "Üçüncü butona tıkladınız!",
          ephemeral: true
        });
      }
    });
    
    collector.on("end", collected => {
      row.components.forEach(button => button.setDisabled(true));
      
      interaction.editReply({
        components: [row],
        content: "Butonlar artık devre dışı."
      });
    });
  },
};