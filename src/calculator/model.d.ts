
export interface Hero {
    level: number
    quantity: number
}

export interface Achievement {
    levels: Array<number>
    quantities: Array<number>
    points: number
}

export interface Result {
    level: number
    quantity: number
    totalPoints: number
}

export type CalculatorId = 'hero_achievements'
export type CalculatorModalId = 'hero_achievements_modal'
export type HeroAchievementField = 'lv30/lv40' | 'lv50/lv60' | 'lv70/lv80' | 'lv90/lv100'

export interface Calculator {
    id: CalculatorId
    modalId: CalculatorModalId
    name: string
    fields: Array<HeroAchievementField>
}