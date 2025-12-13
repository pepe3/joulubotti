const { SlashCommandBuilder, MediaGalleryBuilder, MessageFlags, ButtonBuilder, ButtonStyle, SeparatorBuilder, SeparatorSpacingSize, ActionRowBuilder, ApplicationCommandOptionType, InteractionContextType, Guild } = require('discord.js');
const { request } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tekstitv')
		.setDescription('Bonjour.')
		.setContexts(InteractionContextType.Guild)
		.addIntegerOption((option) =>
			option.setName('sivunumero')
				.setDescription('Näytä tämä Teksti TV sivu')
				.setMaxValue(900)
				.setMinValue(100)
		),

	async execute(interaction) {

		const pageNumber = interaction.options.get('sivunumero') ?? 100;

		let subpages = [1];
		// if (interaction.isButton()) {
		// 	if (interaction.customId == 'nextPageButton') {

		// hae seuraava sivun numero
		const currentPageUrl = `https://external.api.yle.fi/v1/teletext/pages/${pageNumber.value}.json?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a`;
		const response = await request(currentPageUrl);
		const json = await response.body.json();
		for (let index = 1; index < json.teletext.page.subpagecount; index++) {
			subpages.push(index);
		}
		// 	}
		// }

		const separator = new SeparatorBuilder()
			.setSpacing(SeparatorSpacingSize.Small)

		const prevPageButton = new ButtonBuilder()

			.setCustomId('prevPageButton')
			.setLabel('Edellinen')
			.setStyle(ButtonStyle.Primary)

		const nextPageButton = new ButtonBuilder()

			.setCustomId('nextPageButton')
			.setLabel('Seuraava')
			.setStyle(ButtonStyle.Secondary)

		const row = new ActionRowBuilder()
			.addComponents([prevPageButton, nextPageButton])

			let items = [];
			subpages.forEach(subpage => {
			console.log(subpage)
			items.push({
				media: {
					url: `https://external.api.yle.fi/v1/teletext/images/${pageNumber.value}/${subpage}.png?app_id=e9b08e2d2dcca4dc62d2f1e3ebfd456b&app_key=adace51a`
				}
			})
		});

		const media = new MediaGalleryBuilder()
			.addItems(items);

		await interaction.reply({
			flags: MessageFlags.IsComponentsV2,
			components: [media, separator, row],
		})
	},
};