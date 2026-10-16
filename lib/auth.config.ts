import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    authorized({ request, auth }) {
      if (request.nextUrl.pathname === "/admin/login") {
        return true;
      }

      return Boolean(auth?.user);
    },
  },
} satisfies NextAuthConfig;
