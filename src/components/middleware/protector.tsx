import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { redirect } from "next/navigation";

interface IProtectOptions {
  authenticated?: boolean;
  roles?: string[];
  redirectUrl?: string;
}

export default function ServerProtector(
  Component: (...arg0: any[]) => JSX.Element | Promise<JSX.Element>,
  { authenticated = true, roles = [], redirectUrl = "/home" }: IProtectOptions,
) {
  return async function WrappedComponent(props: any) {
    const session = await getServerSession(authOptions);

    if (session && new Date() > new Date(session.user.expires)) {
      redirect("/auth/logout");
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
