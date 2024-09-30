import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-primary-foreground rounded-t-2xl">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
