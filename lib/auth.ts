/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from '@/drizzle/schema'
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile: (profile: { sub: any; name: any; email: any; email_verified: any; picture: any; }) => {
                console.log("Raw Google Profile Data:", profile)
                return {
                    id: profile.sub, // Google's unique user ID
                    name: profile.name,
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture ?? null,
                }
            },
        }
    },
    plugins: [ nextCookies() ],
    baseURL: process.env.NEXT_PUBLIC_BASE_URL!
})