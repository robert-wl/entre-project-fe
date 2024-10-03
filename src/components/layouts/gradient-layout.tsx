import { FC, ReactNode } from "react";
import Navbar from "../Navbar";
import { cn } from "@/lib/utils";

interface IProps {
  children: ReactNode;
  disabled?: boolean;
  from?: string;
  to?: string;
  showNavbar?: boolean;
}

const GradientLayout: FC<IProps> = ({ children, disabled = false, showNavbar = true, from = "rgba(0,217,166,0.2)", to = "rgba(0,217,166,0.1)" }) => {
  return (
    <div className={cn(disabled ? "" : `bg-gradient-to-t from-[${from}] to-[${to}]`, "w-screen min-h-screen flex flex-col items-center")}>
      {showNavbar && <Navbar />}
      {children}
    </div>
  );
};

export default GradientLayout;
