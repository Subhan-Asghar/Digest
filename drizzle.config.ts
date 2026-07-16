import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./db/migrations",
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/digest",
  },
})