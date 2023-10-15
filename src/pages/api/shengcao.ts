import { URLSearchParams } from "url"
import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

const GOOGLE_TRANSLATE_URL = 'http://translate.google.com/m'

const langs = {
    'af': 'Afrikaans',
    'ga': 'Irish',
    'sq': 'Albanian',
    'it': 'Italian',
    'ar': 'Arabic',
    'ja': 'Japanese',
    'az': 'Azerbaijani',
    'kn': 'Kannada',
    'eu': 'Basque',
    'ko': 'Korean',
    'bn': 'Bengali',
    'la': 'Latin',
    'be': 'Belarusian',
    'lv': 'Latvian',
    'bg': 'Bulgarian',
    'lt': 'Lithuanian',
    'ca': 'Catalan',
    'mk': 'Macedonian',
    'zh-CN': 'Chinese Simplified',
    'ms': 'Malay',
    'zh-TW': 'Chinese Traditional',
    'mt': 'Maltese',
    'hr': 'Croatian',
    'no': 'Norwegian',
    'cs': 'Czech',
    'fa': 'Persian',
    'da': 'Danish',
    'pl': 'Polish',
    'nl': 'Dutch',
    'pt': 'Portuguese',
    'en': 'English',
    'ro': 'Romanian',
    'eo': 'Esperanto',
    'ru': 'Russian',
    'et': 'Estonian',
    'sr': 'Serbian',
    'tl': 'Filipino',
    'sk': 'Slovak',
    'fi': 'Finnish',
    'sl': 'Slovenian',
    'fr': 'French',
    'es': 'Spanish',
    'gl': 'Galician',
    'sw': 'Swahili',
    'ka': 'Georgian',
    'sv': 'Swedish',
    'de': 'German',
    'ta': 'Tamil',
    'el': 'Greek',
    'te': 'Telugu',
    'gu': 'Gujarati',
    'th': 'Thai',
    'ht': 'Haitian Creole',
    'tr': 'Turkish',
    'iw': 'Hebrew',
    'uk': 'Ukrainian',
    'hi': 'Hindi',
    'ur': 'Urdu',
    'hu': 'Hungarian',
    'vi': 'Vietnamese',
    'is': 'Icelandic',
    'cy': 'Welsh',
    'id': 'Indonesian',
    'yi': 'Yiddish',
}

export default async function shengcao(req: NextApiRequest, res: NextApiResponse) {
    const { text, to_language = 'auto', text_language = 'auto' } = req.query
    const { repeat } = req.body
    try {
        const response = await translate(text as string, to_language as string, text_language as string)
        let thisResult = response.toString()
        if (thisResult && thisResult != '' && repeat && (repeat as number) > 1 && (repeat as number) % 2 === 0) {
            let from_lang = text_language.toString()
            let to_lang = randomKey(to_language.toString())
            for (let i = 2; i < repeat; i++) {
                if (i === repeat - 1) to_lang = to_language.toString()
                console.log(from_lang, to_lang, thisResult, i)
                thisResult = await translate(thisResult, to_lang, from_lang)
                if (i != repeat - 1) {
                    let lang = to_lang
                    to_lang = randomKey(from_lang)
                    from_lang = lang
                }
            }
        }
        res.status(200).send(thisResult)
    } catch (error) {
        res.status(500).send('Translation failed')
    }
}

/**
 * Google Translate
 */
async function translate(text: string, to_language: string, text_language: string): Promise<string> {
    const params = new URLSearchParams()
    params.append('q', text as any)
    params.append('tl', to_language as any)
    params.append('sl', text_language as any)
    const response = await axios.get(GOOGLE_TRANSLATE_URL, { params })
    const data = response.data
    // console.info(JSON.stringify(data))
    const expr = /class="(?:t0|result-container)">(.*?)</
    const result = expr.exec(data)
    if (result) {
        return result[1]
    }
    return ''
}

// 随机选取langs中不等于入参的一个key
const randomKey = (lang: string) => {
    const keys = Object.keys(langs)
    const k = keys.filter((key) => key != lang)
    return k[Math.floor(Math.random() * k.length)]
}