import l10n from './l10n.json'
import {Localisation, LOCALES} from "./locales";

let CURRENT_LOCAL: Localisation = LOCALES.RU

export interface ITranslationTextModel {
    [key: string]: string
}

export interface ITranslation {
    [key: string]: ITranslationTextModel
}

export const setLocale = (locale: Localisation) => {
    CURRENT_LOCAL = locale
}

export const getLocale = (): Localisation => {
    return CURRENT_LOCAL
}

const translate = (key: string): string => {
    const translateData: ITranslation = l10n
    const translateString = translateData[key]

    if (translateString) {
        return translateString[CURRENT_LOCAL]
    }

    return key
}

export {translate}
