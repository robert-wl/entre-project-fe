import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

const Register: React.FC = () => {
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <img src="logo-cropped.png" className="w-10/12" alt="" />
        <p className="font-semibold text-lg">Sign up to start your journey</p>
      </div>
      <form
        action=""
        className="w-full flex flex-col items-center gap-4">
        <Input
          className="py-6"
          type="text"
          placeholder="Name"
        />
        <Input
          className="py-6"
          type="text"
          placeholder="Email"
        />
        <Input
          className="py-6"
          type="password"
          placeholder="Password"
        />
        <Input
          className="py-6"
          type="password"
          placeholder="Confirm Password"
        />
        <Input
          className="py-6"
          type="text"
          placeholder="Phone Number"
        />
        <Button className="w-full py-6 rounded-3xl font-bold text-background">Sign Up</Button>
        <Link href={'/login'}>
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
