import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return <div className="w-screen h-screen p-8 gap-8 flex flex-col justify-center items-center">{children}</div>;
};

export default Layout;
