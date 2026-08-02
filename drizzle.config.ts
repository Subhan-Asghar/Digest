import { defineConfig } from "drizzle-kit";

if (! process.env.DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export default defineConfig({
  out: "./db/migrations",
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL as string ,
  },
})