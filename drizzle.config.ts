import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: './.env' })

export default defineConfig({
    schema: './drizzle/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        host: process.env.PGHOST!,
        port: Number(process.env.PGPORT ?? 5432),
        user: process.env.PGUSER!,
        password: process.env.PGPASSWORD!,
        database: process.env.PGDATABASE!,
        ssl: "require",
    },
})