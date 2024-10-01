import { FC, ReactNode } from "react";
import TripService from "@/services/trip-service";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = async ({ children }) => {
  const result = await TripService.getTripWithDetails(1);

  console.log("RESULT DAT", result);
  return <div className="w-screen min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-primary-foreground">{children}</div>;
};

export default Layout;
