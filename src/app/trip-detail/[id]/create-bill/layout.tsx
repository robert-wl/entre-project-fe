import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return <div className="w-screen min-h-screen flex flex-col p-8 gap-4">{children}</div>;
};

export default Layout;
