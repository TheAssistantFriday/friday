import { BotEvent } from './model'
import { blockQuote, EmbedBuilder, Events, hyperlink } from 'discord.js'
import { getEmojiData } from '../translator/emoji'
import { getLanguage, translateText } from '../translator/translator'
import { getAvatarUrl } from '../utility/utils'
import { colors } from '../utility/constants'

interface TranslateCache {
    [key: string]: Array<string>
}

const translateCache: TranslateCache = {}

const event: BotEvent = {
    event: Events.MessageReactionAdd,
    once: false,
    async execute(reaction, user) {
        if (user.bot || user.system) {
            return
        }

        if (reaction.partial) {
            try {
                await reaction.fetch()
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error)
                return
            }
        }

        const emoji = getEmojiData(reaction.emoji.name)
        if (!emoji || !reaction.message.content) {
            return
        }

        const targetLanguage = getLanguage(emoji.language)
        if (!targetLanguage) {
            return
        }

        let languageList = translateCache[reaction.message.id]
        if (!languageList) {
            languageList = []
            translateCache[reaction.message.id] = languageList
        } else if (languageList.includes(targetLanguage.code)) {
            return
        }

        const result = await translateText(reaction.message.content, targetLanguage.code)
        const sourceLanguage = getLanguage(result.detectedLanguageCode)
        if (!sourceLanguage) {
            console.log(`Language ${result.detectedLanguageCode} is not supported.`)
            return
        }

        if (sourceLanguage.code === targetLanguage.code) {
            return
        }

        const requesterMember = reaction.message.guild.members.cache.get(user.id)
        const requesterName = requesterMember ? requesterMember.displayName : user.username

        const embed = new EmbedBuilder()
            .setColor(colors.blue)
            .setAuthor({
                name: reaction.message.member.displayName,
                iconURL: getAvatarUrl(reaction.message.author.id, reaction.message.author.avatar)
            })
            .setDescription(`${blockQuote(result.text)}\n${hyperlink('See original', reaction.message.url)}\n`)
            .setFooter({
                text: `Translated from ${sourceLanguage.name} to ${targetLanguage.name}. Requested by ${requesterName}.`,
                iconURL: 'https://upload.wikimedia.org/wikipedia/commons/d/db/Google_Translate_Icon.png'
            } as any)

        const message = await reaction.message.channel.send({embeds: [embed]})
        if (!message) {
            return
        }

        languageList.push(targetLanguage.code)

        setTimeout(() => {
            const index = languageList.indexOf(targetLanguage.code)
            if (index !== -1) {
                languageList.splice(index, 1)
            }
        }, 600000)
    }
}

export default event