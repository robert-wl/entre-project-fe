import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = async ({ children }) => {
  return <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-primary-foreground">{children}</div>;
};

export default Layout;
