//http://localhost:3000/api/auth/callback/google

import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/auth-options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
