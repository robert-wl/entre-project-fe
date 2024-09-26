import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            number: string;
            email: string;
            name: string;
            token: string;
        } & DefaultSession;
    }

    interface User extends DefaultUser {
        token: string;
        id: string;
        number: string;
        email: string;
        name: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        token: string;
        expires: string;
    }
}
