const { 
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
 } = require("discord.js");



module.exports = { 
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Make a suggestion for the server!"), 
    async execute(interaction, client) {
        if (interaction.channel.id !== '1262444514862174311') {
            return interaction.reply({ content: "Αυτή η εντολή μπορεί να χρησιμοποιηθεί μόνο στο κανάλι <#1262444514862174311>.", flags: 64 });
        }
        // Dimiourgia embed
        const suggestionEmbed = new EmbedBuilder()
        .setTitle("Make a Suggestion")
        .setDescription(`Επιλέξτε τον τύπο πρότασης που θέλετε να κάνετε:`)
        .setColor(0x00ffff);

        // Dimiourgia select menu
        const suggestionSelectMenu = new StringSelectMenuBuilder()
        .setCustomId('suggestionTypeSelect')
        .setPlaceholder('Επιλέξτε τύπο πρότασης...')
        .addOptions([
            {
                label: 'Discord Suggestion',
                description: 'Κάντε μια πρόταση για το Discord server',
                value: 'dscSuggestion',
                emoji: '<:cg_discord:1411094156138250280>'
            },
            {
                label: 'YouTube Suggestion',
                description: 'Κάντε μια πρόταση για το YouTube κανάλι',
                value: 'ytSuggestion',
                emoji: '<:cg_youtube:1411094138828357723>'
            },
            {
                label: 'CommunityBot Suggestion',
                description: 'Κάντε μια πρόταση για το CommunityBot',
                value: 'cbSuggestion',
                emoji: '🤖'
            }
        ]);

        const sugActionRow = new ActionRowBuilder()
        .addComponents(suggestionSelectMenu);

        // Apostoli embed kai select menu
        return interaction.reply({ 
            embeds: [suggestionEmbed], // Embed
            components: [sugActionRow], // Select Menu
            flags: 64 // Ephemeral 
        });

         // handler select menu sto src/utils/selectMenus/*

    }
}