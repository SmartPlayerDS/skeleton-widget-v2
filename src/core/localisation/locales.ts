interface ILocales {
    [key: string]: Localisation
}

export const LOCALES: ILocales = {
    RU: 'ru',
    EN: 'en'
}

export type Localisation = 'ru' | 'en'