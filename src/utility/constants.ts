export enum GatewayIntentBits {
    Guilds = 1,
    GuildMembers = 2,
    GuildModeration = 4,
    GuildEmojisAndStickers = 8,
    GuildIntegrations = 16,
    GuildWebhooks = 32,
    GuildInvites = 64,
    GuildVoiceStates = 128,
    GuildPresences = 256,
    GuildMessages = 512,
    GuildMessageReactions = 1024,
    GuildMessageTyping = 2048,
    DirectMessages = 4096,
    DirectMessageReactions = 8192,
    DirectMessageTyping = 16384,
    MessageContent = 32768,
    GuildScheduledEvents = 65536,
    AutoModerationConfiguration = 1048576,
    AutoModerationExecution = 2097152
}

export enum TextInputStyle {
    Short = 1,
    Paragraph = 2
}

export const imageLink = {
    armsRace1: 'https://i.imgur.com/mquyplZ.png',
    armsRace2: 'https://i.imgur.com/1S3xnYJ.png',
    duel: 'https://i.imgur.com/QHqtzWW.png',
    star: 'https://i.imgur.com/vNAG2e6.png'
}

export const colors = {
    red: 0xe91a47,
    blue: 0x0099FF,
    purple: 0x800080,
    green: 0x0ea18c,
    pink: 0xA64D79
}

export const invitationLink = 'https://discord.com/api/oauth2/authorize?client_id=1090686552113434825&permissions=534723951680&scope=bot%20applications.commands'