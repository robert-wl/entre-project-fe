"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { RegisterDTO, registerSchema } from "@/models/schema/register/register.dto";

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegisterDTO>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const registerUser = async (data: RegisterDTO) => {
    const response = await AuthService.register(data);

    if (!response) return;

    router.push("/login");
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <img
          src="/logo-cropped.png"
          className="w-10/12"
          alt=""
        />
        <p className="font-semibold text-lg">Sign up to start your journey</p>
      </div>
      <form
        onSubmit={handleSubmit(registerUser)}
        className="w-full flex flex-col items-center gap-4">
        <Input
          {...register("name")}
          className="py-6"
          type="text"
          placeholder="Name"
        />
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
        <Input
          {...register("confirmPassword")}
          className="py-6"
          type="password"
          placeholder="Confirm Password"
        />
        <Input
          {...register("phoneNumber")}
          className="py-6"
          type="text"
          placeholder="Phone Number"
        />
        <Button
          type="submit"
          className="w-full py-6 rounded-3xl font-bold">
          Sign Up
        </Button>
        <Link href={"/login"}>
          <p className="text-xs font-medium text-gray-400">
            Already have an account?
            <span className="text-primary font-bold">Sign In</span>
          </p>
        </Link>
      </form>
    </>
  );
};

export default Register;
