import { type Locale, i18n } from "./config"

export function getLocaleFromPathname(pathname: string): Locale {
    const segments = pathname.split("/")
    const potentialLocale = segments[1]

    if (i18n.locales.includes(potentialLocale as Locale)) {
        return potentialLocale as Locale
    }

    return i18n.defaultLocale
}

export function removeLocaleFromPathname(pathname: string): string {
    const segments = pathname.split("/")
    const potentialLocale = segments[1]

    if (i18n.locales.includes(potentialLocale as Locale)) {
        return "/" + segments.slice(2).join("/")
    }

    return pathname
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
    if (locale === i18n.defaultLocale) {
        return pathname
    }

    const cleanPathname = removeLocaleFromPathname(pathname)
    return `/${locale}${cleanPathname === "/" ? "" : cleanPathname}`
}

export function getPathnameWithoutLocale(pathname: string): string {
    return removeLocaleFromPathname(pathname)
}