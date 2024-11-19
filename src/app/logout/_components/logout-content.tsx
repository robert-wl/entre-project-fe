"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useLayoutEffect } from "react";

const LogoutContent: FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });

    router.push("/login");
  };
  useLayoutEffect(() => {
    handleSignOut();
  }, []);
  return <></>;
};

export default LogoutContent;
