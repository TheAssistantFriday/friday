import path from 'node:path'
import { LanguageResult, Translate } from '@google-cloud/translate/build/src/v2'

interface TranslateResult {
    text: string,
    detectedLanguageCode: string
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../..', 'polyglot-service-account.json')

const translator = new Translate()
const languages: Array<LanguageResult> = []

translator.getLanguages().then(result => {
    languages.push(...result[0])
})

export async function detectLanguage(text?: string) {
    if (typeof text !== 'string') {
        return 'en'
    }

    const result = await translator.detect(text)
    return result.length > 0 ? result[0].language : 'en'
}

export async function translateText(text: string, targetLanguage: string) : Promise<TranslateResult> {
    if (typeof text !== 'string' || typeof targetLanguage !== 'string') {
        return
    }

    const result = await translator.translate(text, targetLanguage)

    // noinspection TypeScriptUnresolvedVariable
    return {
        text: result[0],
        detectedLanguageCode: result[1].data.translations[0].detectedSourceLanguage
    }
}

export function getLanguage(codeOrName: string | null | undefined) {
    if (typeof codeOrName !== 'string') {
        return
    }

    if (codeOrName === 'fil') {
        codeOrName = 'tl'
    }

    return languages.find(value => value.code.toLowerCase() === codeOrName.toLowerCase() || value.name.toLowerCase() === codeOrName.toLowerCase())
}
