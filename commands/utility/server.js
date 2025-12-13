const { SlashCommandBuilder, MediaGalleryBuilder, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction, client) {

		const media = new MediaGalleryBuilder()
			.addItems([
				{
					media: {
						url: 'https://external.api.yle.fi/v1/teletext/images/100/1.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a'
					}
				},
				{
					media: {
						url: 'https://external.api.yle.fi/v1/teletext/images/101/1.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a'
					}
				},
				{
					media: {
						url: 'https://external.api.yle.fi/v1/teletext/images/102/1.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a'
					}
				},
				{
					media: {
						url: 'https://external.api.yle.fi/v1/teletext/images/103/1.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a'
					}
				},
				{
					media: {
						url: 'https://external.api.yle.fi/v1/teletext/images/200/1.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a'
					}
				},
				{
					media: {
						url: 'https://external.api.yle.fi/v1/teletext/images/201/1.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a'
					}
				},
			]);

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [media],
		})
	},
};