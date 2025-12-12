const { Events } = require('discord.js');
const cron = require('node-cron');
const joulu = require('../commands/utility/joulu');
const vitsit = require('../commands/utility/vitsit');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        
        cron.schedule('0 0 8 * * *', () => {

            console.log('running a task every day at 8:00');
            // Hae kanava, johon haluat lähettää viestin
            const channel = client.channels.cache.get(process.env.TEXT_CHANNEL_ID);

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

        cron.schedule('0 0 9 * * *', () => {

            console.log('running a task every day at 9:00');
            
            const channel = client.channels.cache.get(process.env.TEXT_CHANNEL_ID);

            // Kutsu komentoa ja lähetä viesti kanavalle
            vitsit.execute({
                reply: (message) => {
                    if (channel) {
                        channel.send(message);
                    } else {
                        console.log('Kanavaa ei löytynyt');
                    }
                }
            });
        }, {
            name: 'Joululaskuri',
            timezone: 'Europe/Helsinki',
        });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};