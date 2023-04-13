import { BotCommand } from './model'
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { armsRaceConfig } from '../configuration/configs'
import { getLanguage } from '../translator/translator'
import { colors } from '../utility/constants'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('enable_arms_race')
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The language of the arms race description')
                .addChoices(...[
                    {name: 'English', value: 'en'},
                    {name: 'Vietnamese', value: 'vn'},
                    {name: 'Japanese', value: 'jp'},
                    {name: 'Bahasa Indonesia', value: 'id'},
                    {name: 'Thai', value: 'th'}
                ])
                .setRequired(true)
        )
        .setDescription('Enable the arms race reminder'),
    async execute(interaction) {
        const language = (interaction as ChatInputCommandInteraction).options.getString('language')

        const embed = new EmbedBuilder()
            .setColor(colors.purple)
            .setDescription(`Arms race reminder has been enabled on this channel.`)
            .setFooter({
                text: `Language: ${getLanguage(language).name}`
            } as any)

        armsRaceConfig.addSubscriber(interaction.channelId, language)
        await (interaction as ChatInputCommandInteraction).reply({embeds: [embed]})
    }
}

export default command