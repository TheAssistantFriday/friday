import fs from 'node:fs'
import path from 'node:path'
import {
    Client,
    Collection,
    MessageCreateOptions,
    Partials,
    REST,
    Snowflake,
    TextChannel
} from 'discord.js'
import { Routes } from 'discord-api-types/v10'
import dotenv from 'dotenv'
import { GatewayIntentBits } from './utility/constants'
import { BotCommand } from './commands/model'
import { BotEvent } from './events/model'

dotenv.config()

const token = process.env.BOT_TOKEN
const appId = process.env.APPLICATION_ID

class AppClient extends Client {
    commands: Collection<string, BotCommand> = new Collection()
}

const client = new AppClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
})

client.login(token).then()

const commands = []
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

const eventsPath = path.join(__dirname, 'events')
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command: BotCommand = require(filePath).default

    commands.push(command.data.toJSON())
    client.commands.set(command.data.name, command)
}

for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file)
    const event: BotEvent = require(filePath).default

    if (event.once) {
        client.once(event.event, (...args) => event.execute(...args))
    } else {
        client.on(event.event, (...args) => event.execute(...args))
    }
}

export function sendMessageToChannel(channelId: Snowflake, payload: MessageCreateOptions) {
    client.channels.fetch(channelId).then(channel => {
        if (!channel || !(channel instanceof TextChannel)) {
            return
        }
        channel.send(payload).then()
    })
}

async function updateCommands() {
    try {
        console.log(`Started refreshing ${client.commands.size} application (/) commands.`)
        const data = await new REST({version: '10'}).setToken(token).put(
            Routes.applicationCommands(appId),
            {body: commands}
        ) as any
        console.log(`Successfully reloaded ${data.length} application (/) commands.`)
    } catch (e) {
        console.log(e)
    }
}

updateCommands().then()