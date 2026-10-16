import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authConfig } from "./auth.config";
import { prisma } from "./prisma";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, "用户名不能为空")
    .max(20, "用户名最多 20 字"),
  password: z
    .string()
    .min(1, "密码不能为空")
    .max(72, "密码最多 72 位"),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const admin = await prisma.adminUser.findUnique({
          where: {
            username: parsed.data.username,
          },
        });

        if (!admin) {
          return null;
        }

        const isValid = await bcrypt.compare(
          parsed.data.password,
          admin.passwordHash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: String(admin.id),
          name: admin.username,
          role: "admin",
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.sub ?? "";
      session.user.role = token.role;

      return session;
    },
  },
});
