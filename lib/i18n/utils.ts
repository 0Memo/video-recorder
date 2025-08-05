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
    const cleanPathname = removeLocaleFromPathname(pathname);

    // Avoid adding locale if it's the default and you're not using default prefixing
    if (locale === i18n.defaultLocale) {
        return cleanPathname === "/" ? "/" : cleanPathname;
    }

    return `/${locale}${cleanPathname === "/" ? "" : cleanPathname}`;
}

export function getPathnameWithoutLocale(pathname: string): string {
    return removeLocaleFromPathname(pathname);
}