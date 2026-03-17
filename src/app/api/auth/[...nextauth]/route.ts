import { NextAuth } from "@auth/nextjs";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;
