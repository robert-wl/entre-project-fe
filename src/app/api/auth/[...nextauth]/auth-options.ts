import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import AuthService from "@/services/auth-service";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60,
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) throw new Error("Email and Password are required");

        const [result, error] = await AuthService.login({
          email,
          password,
        });

        if (error) {
          throw new Error(error.message);
        }

        return {
          ...result.user,
          token: result.access_token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth",
    signOut: "/logout",
    verifyRequest: "/auth",
    newUser: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.expires = new Date(new Date().getTime() + 0.25 * 60 * 60 * 1000).toISOString();
      }

      if (token.expires && new Date() > new Date(token.expires)) {
        return {} as JWT;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token?.expires) {
        return {} as Session;
      }

      if (session?.user) {
        session.user.id = token.id;
        session.user.token = token.token;
        session.user.expires = token?.expires;
      }

      return session;
    },
  },
};
