"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthService from "@/services/auth-service";
import { useRouter } from "next/navigation";

const registerFormSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    phoneNumber: z.string().min(11),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

type RegistrationForm = z.infer<typeof registerFormSchema>;

const Register: React.FC = () => {
  const { register, handleSubmit } = useForm<RegistrationForm>({
    resolver: zodResolver(registerFormSchema),
  });
  const router = useRouter();

  const registerUser = async (data: RegistrationForm) => {
    const response = await AuthService.register(data.name, data.email, data.password, data.phoneNumber);

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
          className="w-full py-6 rounded-3xl font-bold text-background">
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
