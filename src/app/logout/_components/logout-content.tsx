"use client";
import { signOut } from "next-auth/react";
import { FC, useLayoutEffect } from "react";

const LogoutContent: FC = () => {
  useLayoutEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    }).then();
  }, []);
  return <></>;
};

export default LogoutContent;
