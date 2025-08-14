import { type Locale, i18n } from "./config";

export function getLocaleFromPathname(pathname: string): Locale {
    const segments = pathname.split("/").filter(Boolean);
    const potentialLocale = segments[0];
    if (i18n.locales.includes(potentialLocale as Locale)) {
        return potentialLocale as Locale;
    }
    return i18n.defaultLocale;
}

export function removeLocaleFromPathname(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean);
    const potentialLocale = segments[0];
    if (i18n.locales.includes(potentialLocale as Locale)) {
        return "/" + segments.slice(1).join("/");
    }
    return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
    const cleanPathname = removeLocaleFromPathname(pathname)

    // Always add locale prefix for all languages, including default
    return `/${locale}${cleanPathname === "/" ? "" : cleanPathname}`
}

export function getPathnameWithoutLocale(pathname: string): string {
    return removeLocaleFromPathname(pathname);
}