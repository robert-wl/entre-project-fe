"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const router = useRouter();

  const login = async (data: ILoginForm) => {
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!response?.error) {
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <img
          src="logo-cropped.png"
          className="w-10/12"
          alt=""
        />
        <p className="font-semibold text-lg">Sign in to continue</p>
      </div>
      <form
        onSubmit={handleSubmit(login)}
        className="w-full flex flex-col items-center gap-4">
        <Input
          {...register("email")}
          className="py-6"
          type="text"
          placeholder="Email"
        />
        <Input
          {...register("password")}
          className="py-6"
          type="password"
          placeholder="Password"
        />
        <p className="w-full text-xs underline text-gray-400">Forgot Password?</p>
        <Button
          type="submit"
          className="w-full py-6 rounded-3xl text-background font-bold">
          Sign In
        </Button>
        <Link href={"/auth/register"}>
          <p className="text-xs font-medium text-gray-400">
            Don't have an account?
            <span className="text-primary font-bold">Sign Up</span>
          </p>
        </Link>
      </form>
    </>
  );
};

export default Login;
