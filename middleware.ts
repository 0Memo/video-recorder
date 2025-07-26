import { type NextRequest, NextResponse, type NextFetchEvent } from "next/server"
import { getSessionCookie } from "better-auth/cookies"
import aj from "./lib/arcjet"
import { detectBot, shield } from "arcjet"
import { createMiddleware } from "@arcjet/next"
import { i18n, type Locale } from "./lib/i18n/config"
import { getLocaleFromPathname, addLocaleToPathname, removeLocaleFromPathname } from "./lib/i18n/utils"

// Locale detection and redirection
function handleLocaleRedirect(request: NextRequest): NextResponse | null {
    const pathname = request.nextUrl.pathname
    const currentLocale = getLocaleFromPathname(pathname)

    // If no locale in URL and not default locale, redirect to add locale
    if (currentLocale === i18n.defaultLocale && !pathname.startsWith(`/${i18n.defaultLocale}`)) {
        // Check if we should add a locale prefix
        const acceptLanguage = request.headers.get("accept-language")
        let preferredLocale: Locale = i18n.defaultLocale

        if (acceptLanguage) {
            // Simple language detection - you can make this more sophisticated
            for (const locale of i18n.locales) {
                if (acceptLanguage.includes(locale.split("-")[0])) {
                    preferredLocale = locale
                    break
                }
            }
        }

        // Only redirect if not default locale
        if (preferredLocale !== i18n.defaultLocale) {
            const newUrl = new URL(addLocaleToPathname(pathname, preferredLocale), request.url)
            return NextResponse.redirect(newUrl)
        }
    }

    return null
}

// This function contains your core authentication and redirection logic.
async function authAndRedirectHandler(request: NextRequest, event: NextFetchEvent) {
    // Handle locale first
    const localeRedirect = handleLocaleRedirect(request)
    if (localeRedirect) {
        return localeRedirect
    }

    const sessionCookie = getSessionCookie(request)
    const { pathname } = request.nextUrl
    const currentLocale = getLocaleFromPathname(pathname)
    const pathnameWithoutLocale = removeLocaleFromPathname(pathname)

    // Define paths that should always be accessible without a session cookie.
    const publicPaths = [
        "/sign-in", // Your sign-in page
        "/api/auth", // Better Auth API routes
    ]

    // Check if the current path (without locale) starts with any of the public paths.
    const isPublicPath = publicPaths.some((path) => pathnameWithoutLocale.startsWith(path))

    // If it's a public path, allow the request to proceed without checking for a session.
    if (isPublicPath) {
        return NextResponse.next()
    }

    // If it's not a public path and no session cookie is found, redirect to the sign-in page.
    if (!sessionCookie) {
        const signInUrl = new URL(addLocaleToPathname("/sign-in", currentLocale), request.url)
        return NextResponse.redirect(signInUrl)
    }

    // If a session cookie exists and it's not a public path, allow the request to proceed.
    return NextResponse.next()
}

// Arcjet validation rules
const arcjetRules = aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE", "G00G1E_CRAWLER"] }))

// Create the Arcjet middleware instance that wraps your auth handler
const arcjetMiddleware = createMiddleware(arcjetRules, authAndRedirectHandler)

// The main middleware function that Vercel will invoke.
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    // Check for Vercel internal headers to bypass Arcjet for previews.
    const vercelIdHeader = request.headers.get("x-vercel-id")
    if (vercelIdHeader) {
        return authAndRedirectHandler(request, event)
    }

    // Otherwise, apply Arcjet rules first, then your authentication/redirection logic.
    return arcjetMiddleware(request, event)
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
}