import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Login: React.FC = () => {
    return (
        <>
            <div className="w-full flex justify-center">
                <p className="font-semibold text-lg">Sign in to continue</p>
            </div>
            <form action="" className="w-full flex flex-col items-center gap-4">
                <Input className="py-6" type="text" placeholder="Email" />
                <Input className="py-6" type="password" placeholder="Password" />
                <p className="w-full text-xs underline text-gray-400">Forgot Password?</p>
                <Button className="w-full py-6 rounded-3xl">Sign In</Button>
                <p className="text-xs font-medium text-gray-400">
                    Don't have an account?
                    <span className="text-primary font-bold">Sign Up</span>
                </p>
            </form>
        </>
    )
}

export default Login;