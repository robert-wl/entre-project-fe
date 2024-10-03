import { FC, ReactNode } from "react";
import Navbar from "../Navbar";
import { cn } from "@/lib/utils";

interface IProps {
  children: ReactNode;
  disabled?: boolean;
  from?: string;
  to?: string;
  showNavbar?: boolean;
  className?: string;
}

const GradientLayout: FC<IProps> = ({
  children,
  disabled = false,
  showNavbar = true,
  from = "rgba(0,217,166,0.2)",
  to = "rgba(0,217,166,0.1)",
  className,
}) => {
  return (
    <div
      className={cn(
        className,
        disabled ? "" : `bg-gradient-to-t from-[${from}] to-[${to}]`,
        "w-screen justify-between min-h-screen h-full flex flex-col items-center",
      )}>
      <div>
        {showNavbar && <Navbar />}
        {children}
      </div>
      <p className="py-3 text-gray-500 text-sm font-poppins">© SplanNGo All rights reserved</p>
    </div>
  );
};

export default GradientLayout;
