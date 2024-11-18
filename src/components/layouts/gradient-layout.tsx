import { FC, ReactNode } from "react";
import Navbar from "../Navbar";
import { cn } from "@/lib/utils";

interface IProps {
  children: ReactNode;
  disabled?: boolean;
  from?: string;
  to?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
  innerClassName?: string;
}

const GradientLayout: FC<IProps> = ({
  children,
  disabled = false,
  showNavbar = true,
  showFooter = true,
  from = "rgba(0,217,166,0.2)",
  to = "rgba(255,255,255,0.1)",
  className,
}) => {
  const backgroundStyle = {
    background: `linear-gradient(0deg, ${from} 0%, ${to} 100%)`,
  };

  return (
    <div
      style={!disabled ? backgroundStyle : {}}
      className={cn("w-screen justify-between h-screen flex flex-col items-center")}>
      <div className={cn("flex flex-col flex-grow h-full min-h-full w-full", className)}>
        {showNavbar && <Navbar />}
        {children}
      </div>
      {showFooter && <p className="py-3 text-gray-500 text-sm font-poppins">© SplanNGo All rights reserved</p>}
    </div>
  );
};

export default GradientLayout;
