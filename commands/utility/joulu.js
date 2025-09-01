const { SlashCommandBuilder } = require('discord.js');

function countDaysUntilChristmas() {
    // Haetaan tämänhetkinen päivämäärä
    const today = new Date();

    const christmas = new Date(today.getFullYear(), 11, 24); // Kuukausi 11 on joulukuu (0-pohjainen indeksointi)

    // Jos tämänhetkinen päivämäärä on jouluaaton jälkeen, lasketaan seuraavan vuoden jouluun
    if (today.getMonth() === 11 && today.getDate() > 24) {
        christmas.setFullYear(christmas.getFullYear() + 1);
    }

    // Lasketaan jäljellä olevat millisekunnit
    const timeLeft = christmas.getTime() - today.getTime();

    // Muunnetaan millisekunnit päiviksi jakamalla 1000 (millisekunnit) * 60 (sekuntia) * 60 (minuuttia) * 24 (tuntia)
    const days = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

    // Päivien lukumäärä on se, kuinka monta päivää nykypäivän jälkeen on jouluun.
    // Öiden lukumäärä on se, kuinka monta yötä nykypäivän jälkeen on jouluaattoon. Jos päivä on sama, öitä on 0, jos seuraava päivä, yötä on yksi jne.
    const nights = Math.ceil(days) - 1;

    // Palautetaan tulos.
    return {
        days: days,
        nights: nights
    };
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joulu')
        .setDescription('Replies with days and nights until Christmas!'),

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