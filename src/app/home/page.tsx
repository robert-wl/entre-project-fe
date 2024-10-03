import TripCard from "@/app/home/_components/trip-card";
import GradientLayout from "@/components/layouts/gradient-layout";
import { Button } from "@/components/ui/button";
import TripService from "@/services/trip-service";
import Email from "next-auth/providers/email";
import Link from "next/link";
import { FC } from "react";
import EmptyHome from "./_components/empty-home";
import ListHome from "./_components/list-home";

const Home: FC = async () => {
  const [response, error] = await TripService.getMyTrips();

  if (response && response?.result.length === 0) {
    return <EmptyHome />;
  }

  return <ListHome tripList={response!.result} />;
};

export default Home;
