const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, NoSubscriberBehavior } = require('@discordjs/voice');
const ytdl = require("@distube/ytdl-core");
const playdl = require('play-dl');

const VOICE_CHANNEL_ID = '1304520203501178981';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonjour')
        .setDescription('Replies with Pong!'),

    async execute(interaction) {
        console.log('Starting Christmas music playback!');

        await interaction.reply({ content: 'Bonjour! Starting Christmas music playback!', components: [], withResponse: true });

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.followUp({ content: 'You need to be in a voice channel to play music!', components: [], withResponse: true });
            return;
        }

        const connection = joinVoiceChannel({
            channelId: VOICE_CHANNEL_ID,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        connection.subscribe(player);

        const songUrl = 'https://www.youtube.com/watch?v=OfSESrxRtSE';
        const stream = ytdl(songUrl, { filter: 'audioonly' });
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