const { 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle, 
    ActionRowBuilder 
} = require("discord.js");

module.exports = {
    customId: "suggestionTypeSelect",
    label: "Suggestion Type Select",
    async execute(interaction, client) {
        const selectedType = interaction.values[0];
        
        // Analoga me ton typo protasis pou epilexthike
        let suggestionTitle = "";
        let suggestionLabel = "";
        let suggestionPlaceholder = "";
        let modalCustomId = "";
        
        switch(selectedType) {
            case 'dscSuggestion':
                suggestionTitle = "Discord Suggestion";
                suggestionLabel = "Ποια είναι η πρότασή σας για το Discord;";
                suggestionPlaceholder = "Γράψτε την πρότασή σας για το Discord εδώ...";
                modalCustomId = "suggestionModalDscSuggestion";
                break;
            case 'ytSuggestion':
                suggestionTitle = "YouTube Suggestion";
                suggestionLabel = "Ποια είναι η πρότασή σας για το YouTube;";
                suggestionPlaceholder = "Γράψτε την πρότασή σας για το YouTube εδώ...";
                modalCustomId = "suggestionModalYtSuggestion";
                break;
            case 'cbSuggestion':
                suggestionTitle = "CommunityBot Suggestion";
                suggestionLabel = "Ποια είναι η πρότασή σας για το CommunityBot;";
                suggestionPlaceholder = "Γράψτε την πρότασή σας για το CommunityBot εδώ...";
                modalCustomId = "suggestionModalCbSuggestion";
                break;
            default:
                return interaction.reply({ 
                    content: "Άγνωστος τύπος πρότασης!", 
                    flags: 64 
                });
        }

        // Dimiourgia modal gia tin protasi
        const suggestionModal = new ModalBuilder()
            .setCustomId(modalCustomId)
            .setTitle(suggestionTitle);

        const suggestionInput = new TextInputBuilder()
            .setCustomId('suggestionInput')
            .setLabel(suggestionLabel)
            .setStyle(TextInputStyle.Paragraph)
            .setMinLength(50)
            .setMaxLength(1024)
            .setPlaceholder(suggestionPlaceholder)
            .setRequired(true);

        const firstActionRow = new ActionRowBuilder().addComponents(suggestionInput);

        suggestionModal.addComponents(firstActionRow);

        await interaction.showModal(suggestionModal);
    }
}
