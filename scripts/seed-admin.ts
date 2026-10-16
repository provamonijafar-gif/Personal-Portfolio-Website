import "dotenv/config";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const adminSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "管理员用户名不能为空")
    .max(20, "管理员用户名最多 20 字"),
  password: z
    .string()
    .min(6, "管理员密码至少 6 位")
    .max(72, "管理员密码最多 72 位"),
});

async function main() {
  const parsed = adminSchema.safeParse({
    username: process.env.ADMIN_INITIAL_USERNAME,
    password: process.env.ADMIN_INITIAL_PASSWORD,
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "管理员环境变量不合法");
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const admin = await prisma.adminUser.upsert({
    where: {
      username: parsed.data.username,
    },
    update: {
      passwordHash,
    },
    create: {
      username: parsed.data.username,
      passwordHash,
    },
  });

  console.log(`Admin account ready: ${admin.username}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
