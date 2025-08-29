const { EmbedBuilder } = require("discord.js");

module.exports = {
    customId: "cancelSuggestion",
    label: "Cancel Suggestion",
    async execute(interaction, client) {
        // Akiroume tin protasi
        const cancelEmbed = new EmbedBuilder()
            .setTitle("Suggestion Cancelled")
            .setDescription("Η πρότασή σας ακυρώθηκε.")
            .setColor(0xff0000);

        await interaction.update({ 
            embeds: [cancelEmbed], 
            components: [] 
        });
    }
}
