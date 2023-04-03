import { BotEvent } from './model'
import { Events } from 'discord.js'

const event: BotEvent = {
    event: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) {
            return
        }

        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`)
            return
        }

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`)
            console.error(error)
        }
    }
}

export default event