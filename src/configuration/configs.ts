import { Snowflake } from 'discord.js'
import { db } from '../firebase/firebase'
import { ArmsRaceSubscriber } from '../arms-race/model'

let armsRaceSubscribers: Array<ArmsRaceSubscriber> = []

db.ref('arms-race-subscribers').on('value', snapshot => {
    if (!snapshot.val()) {
        console.log(`Current arms race subscribers count is 0.`)
        return
    }
    armsRaceSubscribers = snapshot.val()
    console.log(`Current arms race subscribers count is ${armsRaceSubscribers.length}.`)
})

export const armsRaceConfig = {
    getSubscribers() : Array<ArmsRaceSubscriber> {
        return armsRaceSubscribers
    },
    addSubscriber(channelId: Snowflake, language: string) : boolean {
        if (!armsRaceSubscribers.find(value => value.id === channelId)) {
            armsRaceSubscribers.push({id: channelId, language})
            db.ref('arms-race-subscribers')
                .set(armsRaceSubscribers)
                .then(() => console.log('Arms Race Subscribers has been updated.'))
            return true
        }
        return false
    },
    removeSubscriber(channelId: Snowflake) : boolean {
        const index = armsRaceSubscribers.findIndex(value => value.id === channelId)
        if (index !== -1) {
            armsRaceSubscribers.splice(index, 1)
            db.ref('arms-race-subscribers')
                .set(armsRaceSubscribers)
                .then(() => console.log('Arms Race Subscribers has been updated.'))
            return true
        }
        return false
    }
}


