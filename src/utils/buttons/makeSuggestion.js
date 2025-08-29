const { 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder 
} = require("discord.js");

module.exports = {
    customId: "makeSuggestion",
    label: "Make Suggestion",
    async execute(interaction, client) {
        // Apostoli modal gia tin protasi

        const suggestionModal = new ModalBuilder()
            .setCustomId('suggestionModal')
            .setTitle('Make a Suggestion');

        const suggestionInput = new TextInputBuilder()
            .setCustomId('suggestionInput')
            .setLabel("Ποια είναι η πρότασή σας;")
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(50)
            .setMaxLength(1024)
            .setPlaceholder('Γράψτε την πρότασή σας εδώ...')
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);

        suggestionModal.addComponents(firstActionRow);

        await interaction.showModal(suggestionModal);
    }
}