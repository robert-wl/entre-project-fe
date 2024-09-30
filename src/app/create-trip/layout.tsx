import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";
import Protector from "@/components/middleware/protector";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-45% from-background to-primary">
      <Navbar />
      {children}
    </div>
  );
};

export default Protector(Layout, {});
