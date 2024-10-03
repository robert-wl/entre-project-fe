import React from "react";
import RegisterForm from "@/app/register/_components/register-form";
import Protector from "@/components/middleware/protector";

const Page: React.FC = () => {
  return <RegisterForm />;
};

export default Protector(Page, {
  authenticated: false,
  redirectUrl: "/home",
});
