import { Interaction, SlashCommandBuilder } from 'discord.js'

export interface BotCommand {
    data: SlashCommandBuilder
    execute(interaction: Interaction): Promise<void>
}