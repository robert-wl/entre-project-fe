"use client";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterDTO, registerSchema } from "@/models/schema/register/register.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GradientLayout from "@/components/layouts/gradient-layout";
import useToast, { ToastType } from "@/hooks/use-toast";

const RegisterForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(registerSchema),
  });
  const { trigger } = useToast();
  const router = useRouter();

  const registerUser = async (data: RegisterDTO) => {
    const [_, error] = await AuthService.register(data);

    if (error) {
      trigger(error.message, ToastType.Error);
      return;
    }

    router.push("/login");
  };

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        const error = errors[key as keyof typeof errors];
        if (error?.message) {
          trigger(error.message, ToastType.Error);
        }
      });
    }
  }, [errors]);

  return (
    <GradientLayout
      disabled
      className="items-center justify-center p-8"
      showNavbar={false}>
      <div className="w-full flex flex-col items-center">
        <img
          src="/logo-cropped.png"
          className="w-10/12 max-w-xs"
          alt=""
        />
        <p className="font-semibold text-lg pb-8">Sign up to start your journey</p>
      </div>
      <form
        onSubmit={handleSubmit(registerUser)}
        className="w-full flex flex-col items-center gap-4">
        <Input
          {...register("name")}
          className="py-6 max-w-xl"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Name"
        />
        <Input
          {...register("email")}
          className="py-6 max-w-xl"
          name="email"
          type="text"
          autoComplete="email"
          placeholder="Email"
        />
        <Input
          {...register("password")}
          className="py-6 max-w-xl"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Password"
        />
        <Input
          {...register("confirmPassword")}
          className="py-6 max-w-xl"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm Password"
        />
        <Input
          {...register("phoneNumber")}
          className="py-6 max-w-xl"
          name="phoneNumber"
          type="text"
          autoComplete="tel"
          placeholder="Phone Number"
        />
        <Button
          type="submit"
          className="w-full py-6 max-w-xl rounded-3xl font-bold">
          Sign Up
        </Button>
        <Link href={"/login"}>
          <p className="text-xs font-medium text-gray-400">
            Already have an account?
            <span className="text-primary font-bold">Sign In</span>
          </p>
        </Link>
      </form>
    </GradientLayout>
  );
};

export default RegisterForm;
