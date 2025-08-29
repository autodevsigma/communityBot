const { 
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = { 
    customId: "suggestionModalDscSuggestion",
    label: "Discord Suggestion Modal",
    async execute(interaction, client) {
        try {
            const response = interaction.fields.getTextInputValue("suggestionInput");

            // Prowthisi tou suggestion sto suggestion kanali
            const suggestionChannelId = '1074673797099180073';
            const suggestionChannel = await client.channels.fetch(suggestionChannelId);

            if (suggestionChannel) {
                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('suggestionUpvote')
                        .setLabel('⬆️: 0')
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setCustomId('suggestionDownvote')
                        .setLabel('⬇️: 0')
                        .setStyle(ButtonStyle.Danger)
                );
                
                const suggestionEmbed = new EmbedBuilder()
                    .setDescription(`## <:cg_discord:1411094156138250280>Discord Suggestion\n${response}\n-# /suggest in <#1074673797099180073>`)
                    .setColor(0x5865F2) 
                    .setThumbnail(interaction.guild.iconURL())
                    .setTimestamp()
                    .setFooter({ text: `Submitted by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

                const sentMessage = await suggestionChannel.send({ embeds: [suggestionEmbed], components: [buttons] });
                
                // Arxikopoioume ta dedomena gia to suggestion
                await client.db.set(`suggestion_${sentMessage.id}`, {
                    upvotes: 0,
                    downvotes: 0,
                    voters: [],
                    type: 'dscSuggestion'
                });

                // Apantisi ston xristi oti i protasi tou apothikeutike
                await interaction.reply({ content: "Ευχαριστούμε για την πρότασή σας για το Discord! Έχει υποβληθεί επιτυχώς.", flags: 64 });
            } else {
                await interaction.reply({ content: "Λυπούμαι, δεν μπόρεσα να βρω το κανάλι προτάσεων. Επικοινωνήστε με έναν διαχειριστή.", flags: 64 });
            }
        } catch (error) {
            console.error('Error in discordSuggestion modal:', error);
            await interaction.reply({ content: "Προέκυψε σφάλμα κατά την υποβολή της πρότασής σας. Παρακαλώ δοκιμάστε ξανά.", flags: 64 });
        }
    }
}
