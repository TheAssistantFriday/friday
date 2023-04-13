import { BotCommand } from './model'
import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    ModalBuilder,
    SlashCommandBuilder,
    TextInputBuilder
} from 'discord.js'
import { TextInputStyle } from '../utility/constants'

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate text to a target language'),
    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('translate_modal')
            .setTitle('Translate')

        const languageField = new TextInputBuilder()
            .setCustomId('target_language')
            .setLabel('Target Language')
            .setPlaceholder('Example: en, vn, jp, etc.')
            .setStyle(TextInputStyle.Short)
            .setMinLength(2)
            .setMaxLength(20)
            .setRequired(true)

        const textField = new TextInputBuilder()
            .setCustomId('text')
            .setLabel('Text')
            .setPlaceholder('Enter text...')
            .setStyle(TextInputStyle.Paragraph)
            .setMaxLength(500)
            .setRequired(true)

        const topRow = new ActionRowBuilder().addComponents(languageField as any)
        const bottomRow = new ActionRowBuilder().addComponents(textField as any)

        modal.addComponents(topRow as any, bottomRow as any)

        await (interaction as ChatInputCommandInteraction).showModal(modal)
    }
}

export default command