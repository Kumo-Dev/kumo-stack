import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import { db } from "./db";
import discord from "next-auth/providers/discord";
import google from "next-auth/providers/google";
import { env } from "@/env";

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
        // ...other properties
        // role: UserRole;
      } & DefaultSession["user"];
    }
  
    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
  }

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
    pages: {
        signIn: "/login",
        signOut: "/logout"
    },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "database" },
  providers: [
    discord({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
