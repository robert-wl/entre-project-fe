"use client";
import React, { useLayoutEffect } from "react";
import { signOut } from "next-auth/react";

const Page: React.FC = () => {
  useLayoutEffect(() => {
    signOut({
      redirect: true,
      callbackUrl: "/login",
    }).then();
  }, []);
  return <></>;
};

export default Page;
