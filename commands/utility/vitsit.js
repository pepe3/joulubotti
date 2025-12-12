const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vitsit')
        .setDescription('Jouluaiheisia vitsejä ho ho ho'),

    async execute(interaction) {

        await interaction.reply({
            content: '🎅' + getJokeContentInDecember(),
            components: [],
            withResponse: true,
        });
    },
};

function getJokeContentInDecember() {
    const jokes = [
        "- Mistä tiedät, että on joulu?- Almanakasta.",
        "- Mikä on kissan suosikkijoululaulu?- Varpunen jouluaamuna.",
        "- Miksi joulupukki joutui oikeuteen?- Häntä syytettiin lahjonnasta.",
        "- Mitä joulupukki pelkää?- Säkkipimeää.",
        "- Mitä eroa on pukilla ja joulupukilla?- Joulupukilla on leikkikalut.",
        "- Miksi joulupukki ajaa poroilla tuntureiden yli.- Koska ei pääse niiden läpi.",
        "- Mikä on suurempi kuin joulukuusi?- Jouluseitsemän.",
        "- Mikä on juopon joulukalenteri? -Kaljakori",
        "- Mitä dementiapotilaat laulavat jouluna? Koska meillä on joulu?",
        "- Mitä tapahtui tontulle joka hukkasi lakkinsa?- Siltä jäätyi korva tunturilla.",
        "- Elämän neljä vaihetta: 1. Uskot joulupukkiin 2. Et usko joulupukkiin 3. Pukeudut joulupukiksi 4. Näytät joulupukilta.",
        "- Miksi joulupukki on niin iloinen?  Koska hän tietää, missä tuhmat tytöt asuvat.",
        "- Miksi wanhan mielestä joulu on hauskempaa kuin seksi?- Joulu on useammin.",
        "- Joulu on peruutettu, Joosef on tunnustanut.",
        "- Mikä on narsistin joululaulu?- Mää oon niin kaunis.",
        "- Mikä on majavien joululaulu?- Joulupuu on nakerrettu.",
        "- Mikä on porojen suurin toive?- Päästä vetämään joulupukkia.",
        "- Miksi jouluaatto muistuttaa tavallista työpäivää?- Sinä teet itse kaikki työt, mutta lihava mies puvussa saa kaiken kunnian.",
        "- Miksi joulupukilla on niin isot pussit?- Koska pukki tulee vain kerran vuodessa.",
        "- Mitkä on joulun parhaat jouluvalot?- Anopin auton takavalot.",
        "- Mikä on jokaisen joulukortin keskellä?- K-kirjain.",
        "- Miksi joulupukki ei jää eläkkeelle? Kun on töissä vain yhden päivän vuodessa, ei paljon eläkettä kerkeä karttumaan.",
        "- Mitä joulupukki sanoi syödessään lihaa?- Hyvästi Petteri",
        "- Miksi kiinalaiset lapset eivät usko joulupukkiin? -Koska he tekevät joululahjat.",
    ];

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

    // Palautetaan tulos.
    return jokes[days] ?? 'Joulua odotellessa';
}