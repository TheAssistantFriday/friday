import { blockQuote, bold, EmbedBuilder } from 'discord.js'
import { sendMessageToChannel } from '../app'
import { armsRaceConfig } from '../configuration/configs'
import { DateTime } from 'luxon'
import {
    ArmsRace,
    ArmsRaceGroup,
    ArmsRaceMap,
    ArmsRaceSchedule,
    ArmsRaceTemplate,
    ArmsRaceTemplateGroup,
    ArmsRaceTheme
} from './model'
import { db } from '../firebase/firebase'
import {
    defaultArmsRacesGroup,
    defaultArmsRaceTemplateGroup,
    defaultEndsTime,
    defaultSchedules,
    defaultStartsTime
} from './updater'
import { imageLink } from '../utility/constants'

let armsRacesGroup: ArmsRaceGroup = defaultArmsRacesGroup
let schedules: ArmsRaceSchedule = defaultSchedules
let startsTime: ArmsRaceMap = defaultStartsTime
let endsTime: ArmsRaceMap = defaultEndsTime
let templateGroup: ArmsRaceTemplateGroup = defaultArmsRaceTemplateGroup

db.ref('arms-races').on('value', snapshot => {
    if (!snapshot.val()) {
        return
    }
    armsRacesGroup = snapshot.val()
    console.log('Arms Races has been updated.')
})

db.ref('arms-race-schedules').on('value', snapshot => {
    if (!snapshot.val()) {
        return
    }
    schedules = snapshot.val()
    console.log('Arms Race Schedules has been updated.')
})

db.ref('arms-race-starts-time').on('value', snapshot => {
    if (!snapshot.val()) {
        return
    }
    startsTime = snapshot.val()
    console.log('Arms Race starts time has been updated.')
})

db.ref('arms-race-ends-time').on('value', snapshot => {
    if (!snapshot.val()) {
        return
    }
    endsTime = snapshot.val()
    console.log('Arms Race ends has been updated.')
})

function buildEmbed(armsRace: ArmsRace, template: ArmsRaceTemplate, isEnding: boolean) {
    const tasks = armsRace.tasks.map(value => `♦ ${value}\r\n`).join('')

    const description = isEnding
        ? template.end.replace('${name}', bold(armsRace.name))
        : template.start.replace('${name}', bold(armsRace.name)).replace('${tasks}', blockQuote(tasks))

    return new EmbedBuilder()
        .setColor(0x0ea18c)
        .setAuthor({
            name: 'Arms Race',
            iconURL: imageLink.armsRace1
        } as any)
        .setDescription(description)
}

function sendMessage(theme: ArmsRaceTheme, isEnding: boolean) {
    armsRaceConfig.getSubscribers().forEach(subscriber => {
        const armsRaces = armsRacesGroup[subscriber.language]
            ? armsRacesGroup[subscriber.language]
            : armsRacesGroup.en

        const armsRace = armsRaces.find(value => value.theme === theme)

        const template = templateGroup[subscriber.language]
            ? templateGroup[subscriber.language]
            : templateGroup.en

        sendMessageToChannel(subscriber.id, {embeds: [buildEmbed(armsRace, template, isEnding)]})
    })
}

function checkArmsRace(time: string, weekday: string) {
    const schedule = schedules[weekday.toLowerCase()]

    const start = startsTime[time]
    if (start) {
        sendMessage(schedule[start], false)
        return
    }

    const end = endsTime[time]
    if (end) {
        sendMessage(schedule[end], true)
    }
}

let timer: NodeJS.Timer | null = null

export function initArmsRace() {
    console.log(`[Arms Race] scheduler will be set in ${60 - DateTime.now().second} seconds.`)

    setTimeout(() => {
        if (timer) {
            return
        }

        timer = setInterval(() => {
            checkArmsRace(
                DateTime.now().setZone('UTC-2').toFormat('HH:mm'),
                DateTime.now().setZone('UTC-2').setLocale('us').weekdayLong
            )
        }, 60000)

        console.log(`[Arms Race] scheduler has been initialized.`)
    }, (60 - DateTime.now().second) * 1000)
}