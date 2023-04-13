import { BotEvent } from './model'
import { bold, EmbedBuilder, Events, hyperlink, ModalSubmitInteraction } from 'discord.js'
import { CalculatorId, CalculatorModalId, Hero, HeroAchievementField, Result } from '../calculator/model'
import { colors, imageLink } from '../utility/constants'
import { getCalculator } from '../commands/calculator'
import { calculateHeroAchievements } from '../calculator/hero_achievements'

function getInputValue(interaction: any, id: HeroAchievementField): string | null {
    return interaction.fields.getTextInputValue(id)
}

function parseHeroLevel(firstLevel: number, secondLevel: number, combinedHeroQuantity: string): Array<Hero> | null {
    const list = combinedHeroQuantity.split('/')
    if (list.length !== 2) {
        return null
    }

    const firstQuantity = parseInt(list[0])
    const secondQuantity = parseInt(list[1])

    if (isNaN(firstQuantity) || isNaN(secondQuantity) || firstQuantity < 0 || firstQuantity > 100 || secondQuantity < 0 || secondQuantity > 100) {
        return null
    }

    return [
        {level: firstLevel, quantity: firstQuantity},
        {level: secondLevel, quantity: secondQuantity}
    ]
}

function parseHeroLevels(lv30_40: string, lv50_60: string, lv70_80: string, lv90_100: string): Array<Hero> | null {
    const lv30_40_heroes = parseHeroLevel(30, 40, lv30_40)
    const lv50_60_heroes = parseHeroLevel(50, 60, lv50_60)
    const lv70_80_heroes = parseHeroLevel(70, 80, lv70_80)
    const lv90_100_heroes = parseHeroLevel(90, 100, lv90_100)

    if (!lv30_40_heroes || !lv50_60_heroes || !lv70_80_heroes || !lv90_100_heroes) {
        return null
    }

    return [
        ...lv30_40_heroes,
        ...lv50_60_heroes,
        ...lv70_80_heroes,
        ...lv90_100_heroes,
    ]
}

function getHeroDescription(result: Result): string {
    return `Number of Lv. ${result.level} heroes: ${bold(result.quantity.toString())}${result.quantity.toString().length > 1 ? ' ' : ''}  (${result.totalPoints} pts)`
}

function getDescription(results: Array<Result>): string {
    const description = results.reduce((prev, current) => `${prev}${getHeroDescription(current)}\n`, '')
    const totalPoints = results.reduce((prev, current) => prev + current.totalPoints, 0)
    return `${description}\nTotal points: ${bold(`${totalPoints} pts`)}`
}

const event: BotEvent = {
    event: Events.InteractionCreate,
    once: false,
    async execute(interaction: ModalSubmitInteraction) {
        if (!interaction.isModalSubmit()) {
            return
        }

        const calculator = getCalculator(interaction.customId as CalculatorModalId)
        if (!calculator) {
            return
        }

        const user = await interaction.guild.members.fetch(interaction.user.id)

        if (calculator.modalId === 'hero_achievements_modal') {
            const lv30_40 = getInputValue(interaction, 'lv30/lv40')
            const lv50_60 = getInputValue(interaction, 'lv50/lv60')
            const lv70_80 = getInputValue(interaction, 'lv70/lv80')
            const lv90_100 = getInputValue(interaction, 'lv90/lv100')

            const heroes = parseHeroLevels(lv30_40, lv50_60, lv70_80, lv90_100)

            if (heroes) {
                const results = calculateHeroAchievements(heroes)
                const embed = new EmbedBuilder()
                    .setColor(colors.pink)
                    .setAuthor({
                        name: calculator.name,
                        iconURL: imageLink.star
                    } as any)
                    .setDescription(`${getDescription(results)}\n${hyperlink('See detailed result', 'https://vlordofspy.000webhostapp.com/')}`)
                    .setFooter({text: `requested by ${user.displayName ?? user.nickname ?? user.user.username}`} as any)
                await interaction.reply({embeds: [embed]})
            } else {
                const embed = new EmbedBuilder()
                    .setColor(colors.red)
                    .setDescription(`The provided hero level is invalid. Hero level must be separated by '/'. For example, if you have 0 Lv30 heroes and 9 Lv40 heroes, the hero level must be written as ${bold('0/9')}.`)
                await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
}

export default event