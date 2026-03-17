import { NextAuth } from "@auth/nextjs";
import type { NextAuthConfig } from "@auth/nextjs";
import Credentials from "@auth/core/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const credentialsProvider: any = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials: any, request?: Request) {
    console.log("Auth authorize called:", (credentials as any).email);
    try {
      if (!credentials?.email || !credentials?.password) {
        console.log("Missing credentials");
        return null;
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email.toLowerCase().trim() },
      });

      if (!user) {
        console.log("User not found");
        return null;
      }

      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (!isValid) {
        console.log("Invalid password");
        return null;
      }

      console.log("Auth success:", user.email);
      return { id: user.id, email: user.email, name: user.name };
    } catch (error) {
      console.error("Auth error:", error);
      return null;
    }
  },
});

export const authOptions: NextAuthConfig = {
  providers: [credentialsProvider],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: async () => true,
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token.user) session.user = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const { auth } = NextAuth(authOptions);

async function buildCookieHeader() {
  const cookieStore = await cookies();
  const cookieItems = cookieStore.getAll().map((c) => `${c.name}=${c.value}`);
  return cookieItems.join("; ");
}

export async function getAuthSession() {
  const headers = new Headers();
  const cookieHeader = await buildCookieHeader();
  if (cookieHeader) headers.set("cookie", cookieHeader);
  return auth(headers);
}

export async function getCurrentUser() {
  const session = await getAuthSession();
  return session?.user;
}

export async function requireAuth() {
  const session = await getAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  return session.user;
}
