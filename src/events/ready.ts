import { BotEvent } from './model'
import { Events } from 'discord.js'
import { initArmsRace } from '../arms-race/arms_race'

const event: BotEvent = {
    event: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)
        initArmsRace()
    }
}

export default event