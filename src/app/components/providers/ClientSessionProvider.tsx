"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Nullable } from "@/types/utils";
import { Session } from "next-auth";

interface Props {
    children: ReactNode;
    session?: Nullable<Session>;
}

export default function ClientSessionProvider({ children, session }: Props) {
    return (
        <>
            <SessionProvider
                session={session}
                basePath="/api/auth">
                {children}
            </SessionProvider>
        </>
    );
}
