import { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

type SessionType = Session & {
    user: {
      id?: string;
    };
  };
  
  type TokenType = JWT & {
    sub?: string;
  };
  
  type UserType = {
    id?: string;
  };
  
  async function sessionCallback({
    session,
    token,
  }: {
    session: Session;
    token: JWT;
  }): Promise<Session> {
    if (token?.sub && session.user) {
      (session.user as SessionType["user"]).id = token.sub;
    }
    return session;
  }
  
  export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
  
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const user = { id: "1", name: "demo", email: "demo@example.com" };
  
          if (
            credentials?.username === "demo" &&
            credentials?.password === "demo"
          ) {
            return user;
          } else {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      session: sessionCallback,
      async jwt({ token, user }: { token: TokenType; user?: UserType }) {
        if (user) {
          token.sub = user.id;
        }
        return token;
      },
      async redirect({ url, baseUrl }) {
        console.log("Redirect callback fired:");
        console.log("→ URL:", url);
        console.log("→ Base URL:", baseUrl);
    
        if (url.startsWith(baseUrl) || url.startsWith("/")) {
          return url;
        }
    
        return baseUrl;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
    debug: true,
  };
  