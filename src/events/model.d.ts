
export interface BotEvent {
    event: any
    once: boolean
    execute(...args: Array<any>) : Promise<void>
}
