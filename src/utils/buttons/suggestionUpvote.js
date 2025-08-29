const { 
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    customId: "suggestionUpvote",
    label: "Suggestion Upvote",
    async execute(interaction, client) {
        const messageId = interaction.message.id;
        const userId = interaction.user.id;
        
        // Pairnoume ta dedomena apo ti database
        const voteData = await client.db.get(`suggestion_${messageId}`) || {
            upvotes: 0,
            downvotes: 0,
            voters: []
        };

        // Elegxoume an o xristis exei idi psijisei
        if (voteData.voters.includes(userId)) {
            return interaction.reply({ 
                content: "Έχετε ήδη ψηφίσει σε αυτή την πρόταση!", 
                flags: 64 
            });
        }

        // Prosthetoume to vote
        voteData.upvotes += 1;
        voteData.voters.push(userId);

        // Apothikeuoume sta dedomena
        await client.db.set(`suggestion_${messageId}`, voteData);

        // Ananeonoume ta koumpia me ta nea votes
        const updatedButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('suggestionUpvote')
                .setLabel(`⬆️: ${voteData.upvotes}`)
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('suggestionDownvote')
                .setLabel(`⬇️: ${voteData.downvotes}`)
                .setStyle(ButtonStyle.Danger)
        );

        // Ananeonoume to minima
        await interaction.update({ components: [updatedButtons] });
    }
}
