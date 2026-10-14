import { readFileSync } from "fs";
import path from "path";
import { prisma } from "../lib/prisma";

type JsonMessage = {
  name: string;
  content: string;
  createdAt: string;
};

async function main() {
  const jsonPath = path.join(process.cwd(), "data", "guestbook.json");
  const raw = readFileSync(jsonPath, "utf-8");
  const messages: JsonMessage[] = JSON.parse(raw);

  await prisma.message.createMany({
    data: messages.map((message) => ({
      name: message.name,
      content: message.content,
      createdAt: new Date(message.createdAt),
    })),
  });

  console.log(`Migrated ${messages.length} guestbook messages to MySQL.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
