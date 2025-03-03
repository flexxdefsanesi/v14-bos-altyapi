const Discord = require("discord.js");

module.exports = {
  slash: new Discord.SlashCommandBuilder()
    .setName("modal")
    .setDescription("Örnek modal kullanımı."),
    
  execute: async (client, interaction) => {
    const modal = new Discord.ModalBuilder()
      .setCustomId("bilgi_formu")
      .setTitle("Bilgi Formu");
      
    const kullaniciAdiInput = new Discord.TextInputBuilder()
      .setCustomId("kullaniciAdi")
      .setLabel("Kullanıcı Adınız")
      .setPlaceholder("Örnek: AyranCodeShare")
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(3)
      .setMaxLength(25)
      .setRequired(true);
      
    const yasInput = new Discord.TextInputBuilder()
      .setCustomId("yas")
      .setLabel("Yaşınız")
      .setPlaceholder("Örnek: 25")
      .setStyle(Discord.TextInputStyle.Short)
      .setMinLength(1)
      .setMaxLength(3)
      .setRequired(true);
      
    const hakkindaInput = new Discord.TextInputBuilder()
      .setCustomId("hakkinda")
      .setLabel("Kendiniz hakkında bilgi")
      .setPlaceholder("Kendiniz hakkında kısa bir bilgi yazın...")
      .setStyle(Discord.TextInputStyle.Paragraph)
      .setMinLength(10)
      .setMaxLength(300)
      .setRequired(true);
    
    const firstActionRow = new Discord.ActionRowBuilder().addComponents(kullaniciAdiInput);
    const secondActionRow = new Discord.ActionRowBuilder().addComponents(yasInput);
    const thirdActionRow = new Discord.ActionRowBuilder().addComponents(hakkindaInput);
    
    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);
    
    await interaction.showModal(modal);
    
    const filter = i => i.customId === "bilgi_formu" && i.user.id === interaction.user.id;
    
    interaction.awaitModalSubmit({ filter, time: 120000 })
      .then(async modalInteraction => {
        const kullaniciAdi = modalInteraction.fields.getTextInputValue("kullaniciAdi");
        const yas = modalInteraction.fields.getTextInputValue("yas");
        const hakkinda = modalInteraction.fields.getTextInputValue("hakkinda");
        
        const embed = new Discord.EmbedBuilder()
          .setColor("#00FF00")
          .setTitle("Form Bilgileri")
          .addFields(
            { name: "Kullanıcı Adı", value: kullaniciAdi, inline: false },
            { name: "Yaş", value: yas, inline: false },
            { name: "Hakkında", value: hakkinda, inline: false }
          )
          .setTimestamp()
          .setFooter({ text: `${interaction.user.tag} tarafından gönderildi` });
        
        await modalInteraction.reply({ embeds: [embed], ephemeral: true });
      })
      .catch(error => {
        console.error("Modal zaman aşımına uğradı veya bir hata oluştu:", error);
      });
  },
};