import React from "react";
import LoginForm from "@/app/login/_components/login-form";
import Protector from "@/components/middleware/protector";

const Page: React.FC = () => {
  return <LoginForm />;
};

export default Protector(Page, {
  authenticated: false,
  redirectUrl: "/home",
});
