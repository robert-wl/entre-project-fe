import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "next/navigation";
import { FC } from "react";

interface IProtectOptions {
  authenticated?: boolean;
  roles?: string[];
  redirectUrl?: string;
}

type ComponentType = ((...arg0: any[]) => JSX.Element | Promise<JSX.Element>) | FC<any>;

export default function Protector(Component: ComponentType, { authenticated = true, roles = [], redirectUrl = "/login" }: IProtectOptions) {
  return async function WrappedComponent(props: any) {
    const session = await getServerSession(authOptions);

    if (session && new Date() > new Date(session.user.expires)) {
      redirect("/logout");
    }

    if (authenticated) {
      if (!session) {
        redirect(redirectUrl);
      }

      // if (!roles.some((r) => r === session?.user.role)) {
      //   redirect(redirectUrl);
      // }
    }

    if (!authenticated) {
      if (session) {
        redirect(redirectUrl);
      }
    }

    return <Component {...props} />;
  };
}
