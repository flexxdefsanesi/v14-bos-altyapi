const Discord = require("discord.js");

module.exports = {
  slash: new Discord.SlashCommandBuilder()
    .setName("select-menu")
    .setDescription("Örnek select menu kullanımı."),
    
  execute: async (client, interaction) => {
    const row = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.StringSelectMenuBuilder()
          .setCustomId("secim_menu")
          .setPlaceholder("Bir yiyecek veya içecek seçin")
          .addOptions([
            {
              label: "Ayran",
              description: "Serinleten bir içecek",
              value: "ayran",
              emoji: "🥛"
            },
            {
              label: "Lahmacun",
              description: "Acılı bir lezzet",
              value: "lahmacun",
              emoji: "🌮"
            },
            {
              label: "Kebap",
              description: "Enfes bir et yemeği",
              value: "kebap",
              emoji: "🍖"
            },
            {
              label: "Baklava",
              description: "Tatlı bir atıştırmalık",
              value: "baklava",
              emoji: "🍰"
            },
            {
              label: "Çay",
              description: "Demli bir içecek",
              value: "cay",
              emoji: "🍵"
            }
          ])
      );

    const embed = new Discord.EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Menü Örneği")
      .setDescription("Aşağıdaki menüden bir yiyecek veya içecek seçin")
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
          content: "Bu menüyü sadece komutu kullanan kişi kullanabilir.",
          ephemeral: true
        });
      }
      
      const selection = i.values[0];
      let description;
      
      if (selection === "ayran") {
        description = "Ayran, yoğurdun sulandırılıp tuz eklenmesiyle yapılan serinletici bir içecektir.";
      } else if (selection === "lahmacun") {
        description = "Lahmacun, ince hamurun üzerine kıyma ve sebze karışımı konarak pişirilen geleneksel bir yemektir.";
      } else if (selection === "kebap") {
        description = "Kebap, çeşitli etlerin şişe takılarak veya doğrudan ateşte pişirilmesiyle hazırlanan lezzetli bir yemektir.";
      } else if (selection === "baklava") {
        description = "Baklava, ince yufkalar arasına fındık veya fıstık konularak hazırlanan şerbetli bir tatlıdır.";
      } else if (selection === "cay") {
        description = "Çay, demlenmiş çay yapraklarından elde edilen geleneksel ve sevilen bir içecektir.";
      }
      
      const newEmbed = new Discord.EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`${i.values[0].charAt(0).toUpperCase() + i.values[0].slice(1)} seçildi`)
        .setDescription(description)
        .setTimestamp();
      
      await i.update({
        embeds: [newEmbed],
        components: [row]
      });
    });
    
    collector.on("end", collected => {
      row.components[0].setDisabled(true);
      
      interaction.editReply({
        content: "Menü artık devre dışı.",
        components: [row]
      });
    });
  },
};