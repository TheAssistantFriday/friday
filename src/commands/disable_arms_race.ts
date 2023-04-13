import { BotCommand } from './model'
import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js'
import { armsRaceConfig } from '../configuration/configs'
import { colors } from '../utility/constants'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('disable_arms_race')
        .setDescription('Disable the arms race reminder'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(colors.purple)
            .setDescription('Arms race reminder has been disabled on this channel.')

        armsRaceConfig.removeSubscriber(interaction.channelId)
        await (interaction as ChatInputCommandInteraction).reply({embeds: [embed]})
    }
}

export default command