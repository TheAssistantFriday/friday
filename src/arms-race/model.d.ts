import { Snowflake } from 'discord.js'

type ArmsRaceTheme = 'Interstellar Trade' | 'Army Expansion' | 'Hero Initiative' | 'Age of Science' | 'Base Expansion'

export interface ArmsRace {
    theme: ArmsRaceTheme
    name: string
    tasks: Array<string>
}

export interface ArmsRaceGroup {
    en: Array<ArmsRace>
    vn?: Array<ArmsRace>
    jp?: Array<ArmsRace>
    id?: Array<ArmsRace>
    th?: Array<ArmsRace>
}

export interface ArmsRaceTime {
    '00:00': ArmsRaceTheme
    '04:00': ArmsRaceTheme
    '08:00': ArmsRaceTheme
    '12:00': ArmsRaceTheme
    '16:00': ArmsRaceTheme
    '20:00': ArmsRaceTheme
}

export interface ArmsRaceSchedule {
    monday: ArmsRaceTime
    tuesday: ArmsRaceTime
    wednesday: ArmsRaceTime
    thursday: ArmsRaceTime
    friday: ArmsRaceTime
    saturday: ArmsRaceTime
    sunday: ArmsRaceTime
}

export interface ArmsRaceTemplate {
    start: string
    end: string
}

export interface ArmsRaceTemplateGroup {
    en: ArmsRaceTemplate,
    vn?: ArmsRaceTemplate,
    jp?: ArmsRaceTemplate,
    id?: ArmsRaceTemplate,
    th?: ArmsRaceTemplate
}

export interface ArmsRaceSubscriber {
    id: Snowflake
    language: string
}

export interface ArmsRaceMap {
    [key: string]: string
}