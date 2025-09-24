const { Events } = require('discord.js');
const cron = require('node-cron');
const joulu = require('../commands/utility/joulu');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        cron.schedule('2 9 * * *', () => {

            console.log('running a task every day at 8:00');
            // Hae kanava, johon haluat lähettää viestin
            const channel = client.channels.cache.get(process.env.TEXT_CHANNEL_ID); // korvaa KANAVAN_ID oikealla kanavan ID:llä 

            // Kutsu komentoa ja lähetä viesti kanavalle
            joulu.execute({
            reply: (message) => {
                if (channel) {
                channel.send(message);
                } else {
                console.log('Kanavaa ei löytynyt');
                }
            }
            });
        });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};