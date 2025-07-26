export const i18n = {
    defaultLocale: "en",
    locales: ["en", "es", "fr", "pt-BR", "it", "ro", "sv"],
} as const

export type Locale = (typeof i18n)["locales"][number]

export const localeNames: Record<Locale, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    "pt-BR": "Português (BR)",
    it: "Italiano",
    ro: "Română",
    sv: "Svenska",
}

export const localeFlags: Record<Locale, string> = {
    en: "🇺🇸",
    es: "🇪🇸",
    fr: "🇫🇷",
    "pt-BR": "🇧🇷",
    it: "🇮🇹",
    ro: "🇷🇴",
    sv: "🇸🇪",
}