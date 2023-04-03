interface EmojiData {
    emoji: string
    language: string
}

const emojis: Array<EmojiData> = [
    {emoji: '🇺🇸', language: 'en'},
    {emoji: '🇪🇸', language: 'es'},
    {emoji: '🇮🇩', language: 'id'},
    {emoji: '🇲🇾', language: 'ms'},
    {emoji: '🇻🇳', language: 'vi'},
    {emoji: '🇵🇭', language: 'tl'},
    {emoji: '🇸🇦', language: 'ar'},
    {emoji: '🇨🇳', language: 'zh-CN'},
    {emoji: '🇹🇼', language: 'zh-TW'},
    {emoji: '🇫🇷', language: 'fr'},
    {emoji: '🇧🇾', language: 'be'},
    {emoji: '🇷🇺', language: 'ru'},
    {emoji: '🇹🇭', language: 'th'},
    {emoji: '🇩🇪', language: 'de'},
    {emoji: '🇳🇱', language: 'nl'},
    {emoji: '🇰🇷', language: 'ko'},
    {emoji: '🇯🇵', language: 'ja'},
    {emoji: '🇹🇷', language: 'tr'},
]

export function getEmojiData(emoji: string): EmojiData | null {
    return emojis.find(value => value.emoji === emoji) ?? null
}
