const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joulu')
        .setDescription('Palauttaa montako yötä ja päivää on jäljellä jouluaattoon'),

    async execute(interaction) {

        // Kutsutaan funktiota ja tulostetaan tulos
        const result = countDaysUntilChristmas();
        await interaction.reply({
            content: result.days + ' päivää ja ' + result.nights + ' yötä Jouluun!',
            components: [],
            withResponse: true,
        });
    },
};