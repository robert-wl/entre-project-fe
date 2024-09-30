import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
