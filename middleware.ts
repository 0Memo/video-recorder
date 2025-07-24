import { type NextRequest, NextResponse } from "next/server"
import { getSessionCookie } from "better-auth/cookies"
import aj from "./lib/arcjet"
import { detectBot, shield } from "arcjet"
import { createMiddleware } from "@arcjet/next"

async function authAndRedirectMiddleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request)
    const { pathname } = request.nextUrl

    // Define paths that should always be accessible without a session cookie.
    // This typically includes your sign-in page and the Better Auth API routes.
    const publicPaths = [
        "/sign-in",
        "/api/auth",
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

// Export the combined middleware using createMiddleware from @arcjet/next
// It takes the Arcjet rules as the first argument and your custom middleware function as the second.
export default createMiddleware(arcjetRules, authAndRedirectMiddleware)

export const config = {
    // This matcher will apply the middleware to all routes except those starting with
    // _next/static, _next/image, favicon.ico, your sign-in page, and assets.
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
}