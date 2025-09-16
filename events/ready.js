const { Events } = require('discord.js');
const cron = require('node-cron');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        cron.schedule('* * * * *', () => {
            console.log('running a task every minute');
        });
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};