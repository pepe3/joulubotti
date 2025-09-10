const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const ytdl = require("@distube/ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonjour')
        .setDescription('Kutsuu botin kanavalle, joka alkaa soittamaan joululaulua'),

    async execute(interaction) {
        console.log('Starting Christmas music playback!');

        await interaction.reply({ content: 'Bonjour! Starting Christmas music playback!', components: [], withResponse: true });

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.followUp({ content: 'You need to be in a voice channel to play music!', components: [], withResponse: true });
            return;
        }

        const connection = joinVoiceChannel({
            channelId: "1304520203501178981",
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        connection.subscribe(player);

        const songUrl = 'https://www.youtube.com/watch?v=MXP6wTyMnGo';
        const stream = ytdl(songUrl, { filter: 'audioonly', quality: 'highestaudio', highWaterMark: 1 << 25 });
        const resource = createAudioResource(stream);

        player.play(resource);

        player.on(AudioPlayerStatus.Playing, () => {
            console.log('Music started playing!');
        });

        player.on(AudioPlayerStatus.Idle, () => {
            console.log('Music finished, disconnecting.');
            connection.destroy();
        });
    },
};