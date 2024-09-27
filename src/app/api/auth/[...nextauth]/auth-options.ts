import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import BackendService from "@/services/backend-service";
import { extractCookie } from "@/utils/cookie-utils";
import { cookies } from "next/headers";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 0.25 * 60 * 60,
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _) {
        const username = credentials?.username;
        const password = credentials?.password;

        const response = await BackendService.login(username, password);

        if (response.error) {
          console.warn("AUTH ERROR: " + response.error.message);
          throw new Error("Error when validating credentials in backend");
        }

        const { body, headers } = response.content!;

        if (!body) {
          console.warn("AUTH ERROR: Invalid Credentials!");
          throw new Error("Invalid Credentials");
        }

        const cookie = extractCookie(headers);
        cookies().set(cookie);

        const userResponse = await BackendService.getCurrentBinusian();

        if (userResponse.error) {
          console.warn("AUTH ERROR: " + userResponse.error.message);
          throw new Error("Error when fetching user data");
        }

        if (!userResponse.content) {
          console.warn("AUTH ERROR: No user data found!");
          throw new Error("No user data found");
        }

        const userData = userResponse.content!;

        return {
          id: userData.BinusianId,
          number: userData.BinusianNumber,
          name: userData.Name,
          email: userData.BinusEmail,
          image: userData.PictureId,
          role: userData.Role,
          cookie: cookie.value,
        };
      },
    }),
  ],
  pages: {
    signIn: "/nar/auth",
    error: "/nar/auth",
    signOut: "/nar/auth",
    verifyRequest: "/nar/auth",
    newUser: "/nar/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.cookie = user.cookie;
        token.expires = new Date(
          new Date().getTime() + 0.25 * 60 * 60 * 1000
        ).toISOString();
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
        session.user.role = token?.role;
        session.user.cookie = token?.cookie;
        session.user.expires = token?.expires;
      }

      return session;
    },
  },
};
