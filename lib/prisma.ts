import "dotenv/config";
import fs from "node:fs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function readSslCa(): string | undefined {
  if (process.env.DATABASE_SSL_CA) {
    return process.env.DATABASE_SSL_CA;
  }

  if (process.env.DATABASE_SSL_CA_PATH) {
    return fs.readFileSync(process.env.DATABASE_SSL_CA_PATH, "utf8");
  }

  return undefined;
}

function createPrismaClient() {
  const ca = readSslCa();

  if (process.env.DATABASE_SSL === "true" && !ca) {
    throw new Error(
      "DATABASE_SSL=true requires DATABASE_SSL_CA or DATABASE_SSL_CA_PATH"
    );
  }

  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 5,
    ssl:
      process.env.DATABASE_SSL === "true"
        ? {
            ca,
            rejectUnauthorized: true,
          }
        : undefined,
  });

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
