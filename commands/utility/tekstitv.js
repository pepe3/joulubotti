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
				.setMaxValue(899)
				.setMinValue(100)
		),

	async execute(interaction) {

		let pageNumber = 100;

		if (interaction.options) {
			pageNumber = interaction.options.get("sivunumero").value
		}

		let subpages = [1];

		// if (interaction.isButton()) {
		// 	// hae seuraava pääsivun numero
		// 	if (interaction.customId == 'nextPageButton') {

		// 	}
		// 	// hae edellisen pääsivun numero
		// }

		const currentPageUrl = `https://external.api.yle.fi/v1/teletext/pages/${pageNumber}.json?app_id=${process.env.YLE_APP_ID}&app_key=${process.env.YLE_API_KEY}`;
		const response = await request(currentPageUrl);
		const json = await response.body.json();

		for (let index = 2; index <= json.teletext.page.subpagecount; index++) {
			subpages.push(index);
		}

		const separator = new SeparatorBuilder()
			.setSpacing(SeparatorSpacingSize.Small)

		const prevPageButton = new ButtonBuilder()

			.setCustomId('prevPageButton')
			.setLabel('Edellinen')
			.setDisabled(true)
			.setStyle(ButtonStyle.Primary)

		const nextPageButton = new ButtonBuilder()

			.setCustomId('nextPageButton')
			.setLabel('Seuraava')
			.setDisabled(true)
			.setStyle(ButtonStyle.Secondary)

		const row = new ActionRowBuilder()
			.addComponents([prevPageButton, nextPageButton])

		let items = [];
		subpages.forEach(subpage => {
			console.log(`fetching.. ${pageNumber}/${subpage}`)
			items.push({
				media: {
					url: `https://external.api.yle.fi/v1/teletext/images/${pageNumber}/${subpage}.png?app_id=${process.env.YLE_APP_ID}&app_key=${process.env.YLE_API_KEY}`
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