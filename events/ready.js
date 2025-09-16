const { Events } = require('discord.js');
const cron = require('node-cron');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(interaction) {
        cron.schedule('0 8 * * *', () => {
            const result = countDaysUntilChristmas();
            
            // Kutsutaan funktiota ja tulostetaan tulos
            interaction.reply({
                content: result.days + ' päivää ja ' + result.nights + ' yötä Jouluun!',
                components: [],
                withResponse: true,
            });

        }); // Aseta ajastin suorittamaan joka päivä klo 8:00
        
    },
};