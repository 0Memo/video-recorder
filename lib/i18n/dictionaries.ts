import type { Locale } from "./config"

const dictionaries = {
    en: () => import("./dictionaries/en.json").then((module) => module.default),
    es: () => import("./dictionaries/es.json").then((module) => module.default),
    fr: () => import("./dictionaries/fr.json").then((module) => module.default),
    "pt-BR": () => import("./dictionaries/pt.json").then((module) => module.default),
    it: () => import("./dictionaries/it.json").then((module) => module.default),
    ro: () => import("./dictionaries/ro.json").then((module) => module.default),
    sv: () => import("./dictionaries/sv.json").then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
    return dictionaries[locale]?.() ?? dictionaries.en()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>