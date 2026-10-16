import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: "admin";
    } & DefaultSession["user"];
  }

  interface User {
    role?: "admin";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: "admin";
  }
}
