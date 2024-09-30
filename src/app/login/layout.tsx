import { FC, ReactNode } from "react";
import Protector from "@/components/middleware/protector";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return <div className="w-screen min-h-screen p-8 gap-8 flex flex-col justify-center items-center">{children}</div>;
};

export default Protector(Layout, {
  authenticated: false,
  redirectUrl: "/home",
});
