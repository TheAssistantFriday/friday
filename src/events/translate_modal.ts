import { BotEvent } from './model'
import { blockQuote, bold, EmbedBuilder, Events } from 'discord.js'
import { getLanguage, translateText } from '../translator/translator'
import { colors } from '../utility/constants'

const event: BotEvent = {
    event: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isModalSubmit()) {
            return
        }

        if (interaction.customId === 'translate_modal') {
            const text = interaction.fields.getTextInputValue('text')
            const targetLanguage = interaction.fields.getTextInputValue('target_language')
            const language = getLanguage(targetLanguage)

            if (language) {
                translateText(text, language.code)
                    .then(result => {
                        const embed = new EmbedBuilder()
                            .setColor(colors.blue)
                            .setDescription(blockQuote(result.text))
                            .setFooter({
                                text: `Translated from ${getLanguage(result.detectedLanguageCode).name} to ${language.name}.`,
                                iconURL: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png',
                            } as any)
                        interaction.reply({embeds: [embed], ephemeral: true})
                    })
                    .catch(console.log)
            } else {
                const embed = new EmbedBuilder()
                    .setColor(colors.red)
                    .setDescription(`Language ${bold(targetLanguage)} is currently not supported.`)
                interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
}

export default event