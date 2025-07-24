import { type NextRequest, NextResponse, type NextFetchEvent } from "next/server"
import { getSessionCookie } from "better-auth/cookies"
import aj from "./lib/arcjet"
import { detectBot, shield } from "arcjet"
import { createMiddleware } from "@arcjet/next"

// This function contains your core authentication and redirection logic.
// It now also accepts the 'event' argument to match the expected signature for createMiddleware.
async function authAndRedirectHandler(request: NextRequest, event: NextFetchEvent) {
    const sessionCookie = getSessionCookie(request)
    const { pathname } = request.nextUrl

    // Define paths that should always be accessible without a session cookie.
    const publicPaths = [
        "/sign-in", // Your sign-in page
        "/api/auth", // Better Auth API routes (e.g., /api/auth/sign-in/social, /api/auth/callback/google)
        // Add any other public routes here, e.g., '/about', '/contact', '/privacy-policy'
    ]

    // Check if the current path starts with any of the public paths.
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

    // If it's a public path, allow the request to proceed without checking for a session.
    if (isPublicPath) {
        return NextResponse.next()
    }

    // If it's not a public path and no session cookie is found, redirect to the sign-in page.
    // This is an optimistic check; full session validation happens in protected pages/routes.
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    // If a session cookie exists and it's not a public path, allow the request to proceed.
    return NextResponse.next()
}

// Arcjet validation rules
const arcjetRules = aj
    .withRule(shield({ mode: "LIVE" }))
    .withRule(detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE", "G00G1E_CRAWLER"] }))

// Create the Arcjet middleware instance that wraps your auth handler
// Pass authAndRedirectHandler as the second argument to createMiddleware
const arcjetMiddleware = createMiddleware(arcjetRules, authAndRedirectHandler)

// The main middleware function that Vercel will invoke.
// This is where we add the conditional bypass for Vercel's internal requests.
// Ensure it accepts both 'request' and 'event'.
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    // Check for Vercel internal headers to bypass Arcjet for previews.
    const vercelIdHeader = request.headers.get("x-vercel-id")

    if (vercelIdHeader) {
        // If it's a Vercel internal request, bypass Arcjet and just run your
        // authentication/redirection logic directly. Pass both request and event.
        return authAndRedirectHandler(request, event)
    }

    // Otherwise, apply Arcjet rules first, then your authentication/redirection logic.
    // Pass both request and event to arcjetMiddleware.
    return arcjetMiddleware(request, event)
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
}