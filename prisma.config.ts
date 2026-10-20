import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // `generate` does not need a live database, so only attach the URL when it exists.
  datasource: process.env.DATABASE_URL
    ? { url: process.env.DATABASE_URL }
    : undefined,
});
