import { BotCommand } from './model'
import {
    ActionRowBuilder,
    ChatInputCommandInteraction,
    ModalBuilder,
    SlashCommandBuilder,
    TextInputBuilder
} from 'discord.js'
import { TextInputStyle } from '../utility/constants'
import { Calculator, CalculatorId, CalculatorModalId, HeroAchievementField } from '../calculator/model'

const calculators: Array<Calculator> = [
    {
        id: 'hero_achievements',
        modalId: 'hero_achievements_modal',
        name: 'Hero Achievements',
        fields: ['lv30/lv40', 'lv50/lv60', 'lv70/lv80', 'lv90/lv100']
    }
]

export function getCalculator(id: CalculatorId | CalculatorModalId) {
    return calculators.find(it => it.id === id || it.modalId === id)
}

function buildHeroAchievementInput(id: HeroAchievementField) {
    return new TextInputBuilder()
        .setCustomId(id)
        .setLabel(`The number of ${id} heroes`)
        .setStyle(TextInputStyle.Short)
        .setMinLength(3)
        .setMaxLength(7)
        .setValue('0/0')
        .setRequired(true)
}

function getModal(calculator: Calculator | null): ModalBuilder | null {
    if (!calculator) {
        return null
    }

    const modal = new ModalBuilder()
        .setCustomId(calculator.modalId)
        .setTitle(`${calculator.name} Calculator`)

    switch (calculator.id) {
        case 'hero_achievements': {
            const lv30_40 = buildHeroAchievementInput('lv30/lv40')
            const lv50_60 = buildHeroAchievementInput('lv50/lv60')
            const lv70_80 = buildHeroAchievementInput('lv70/lv80')
            const lv90_100 = buildHeroAchievementInput('lv90/lv100')

            const row1 = new ActionRowBuilder().addComponents(lv30_40 as any)
            const row2 = new ActionRowBuilder().addComponents(lv50_60 as any)
            const row3 = new ActionRowBuilder().addComponents(lv70_80 as any)
            const row4 = new ActionRowBuilder().addComponents(lv90_100 as any)

            modal.addComponents(row1 as any, row2 as any, row3 as any, row4 as any)
            return modal
        }
        default:
            return null
    }
}

const command: BotCommand = {
    data: new SlashCommandBuilder()
        .setName('calculator')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Set the calculator mode')
                .addChoices(...calculators.map(it => ({name: it.name, value: it.id})))
                .setRequired(true)
        )
        .setDescription('Game rewards calculator'),
    async execute(interaction) {
        const mode = (interaction as ChatInputCommandInteraction).options.getString('mode')
        const modal = getModal(getCalculator(mode as CalculatorId))
        if (modal) {
            await (interaction as ChatInputCommandInteraction).showModal(modal)
        }
    }
}

export default command