const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('Mostra as últimas mensagens de um canal')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Canal que deseja logar')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('mensagens')
                .setDescription('Número de mensagens')
                .setRequired(true)),
    async execute(interaction) {
        const canal = interaction.options.getChannel('canal');
        const quantidade = interaction.options.getInteger('mensagens');

        if (!canal || !canal.isTextBased()) {
            return interaction.reply({ content: 'Canal inválido!', ephemeral: true });
        }

        const mensagens = await canal.messages.fetch({ limit: quantidade });
        let texto = `Últimas ${quantidade} mensagens em ${canal}:\n`;

        mensagens.reverse().forEach(msg => {
            texto += `${msg.author.username}: ${msg.content}\n`;
        });

        if (texto.length > 2000) texto = texto.substring(0, 1997) + '...';

        await interaction.reply(texto);
    },
};
