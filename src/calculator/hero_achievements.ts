import { Result, Hero, Achievement } from './model'

const achievements: Array<Achievement> = [
    {levels: [30, 40, 50, 60, 70, 80, 90, 100], quantities: [5, 10], points: 2000},
    {levels: [30, 60, 80, 100], quantities: [15, 20, 25, 30], points: 3000},
]

function calculateQuantity(heroes: Array<Hero>, level: number): number {
    return heroes.reduce((prev, current) => current.level >= level ? prev + current.quantity : prev, 0)
}

export function calculateHeroAchievements(heroes: Array<Hero>): Array<Result> {
    const results: Array<Result> = [
        {level: 30, quantity: calculateQuantity(heroes, 30), totalPoints: 0},
        {level: 40, quantity: calculateQuantity(heroes, 40), totalPoints: 0},
        {level: 50, quantity: calculateQuantity(heroes, 50), totalPoints: 0},
        {level: 60, quantity: calculateQuantity(heroes, 60), totalPoints: 0},
        {level: 70, quantity: calculateQuantity(heroes, 70), totalPoints: 0},
        {level: 80, quantity: calculateQuantity(heroes, 80), totalPoints: 0},
        {level: 90, quantity: calculateQuantity(heroes, 90), totalPoints: 0},
        {level: 100, quantity: calculateQuantity(heroes,100), totalPoints: 0},
    ]

    results.forEach(result => {
        if (result.quantity <= 0) {
            return
        }

        achievements.forEach(achievement => {
            if (!achievement.levels.includes(result.level)) {
                return
            }

            achievement.quantities.forEach(quantity => {
                if (result.quantity >= quantity) {
                    result.totalPoints += achievement.points
                }
            })
        })
    })

    return results.filter(it => it.quantity > 0)
}
