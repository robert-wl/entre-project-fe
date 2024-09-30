"use client";
import TripCard from "@/components/TripCard";
import TripCardSkeleton from "@/components/TripCardSkeleton";
import { Button } from "@/components/ui/button";
import TripService from "@/services/trip-service";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const Home: FC = () => {
  const [trips, setTrips] = useState<Trip[] | undefined>();

  const getMyTrips = async () => {
    const result = await TripService.getMyTrips();
    console.log(result);

    setTrips(result);
  };

  useEffect(() => {
    getMyTrips();
  }, []);

  if (trips === undefined) {
    return <TripCardSkeleton />;
  }

  if (trips.length === 0) {
    return (
      <>
        <div className="flex flex-col flex-1 gap-8 px-10 justify-center items-center">
          <div className="flex flex-col text-center gap-2">
            <p className="font-semibold text-2xl">Let's start your</p>
            <p className="font-bold underline text-3xl text-primary">first trip</p>
          </div>
          <p className="text-center">
            Experience the easiest way to plan your itinerary and effortlessly split expenses with your travel companions - all in one place, with{" "}
            <b className="text-primary">Splan & Go!</b>
          </p>
          <Link
            className="w-full"
            href={"/create-trip"}>
            <Button className="w-full py-6 rounded-full font-semibold text-base">Get Started</Button>
          </Link>
        </div>
        <div className="flex flex-col items-center flex-1">
          <img
            src="home.png"
            alt=""
          />
          <p className="text-sm text-gray-400">© SplanNGo All rights reserved</p>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col w-full gap-6 p-6">
      {trips.map((t, idx) => (
        <TripCard
          trip={t}
          key={idx}
        />
      ))}
    </div>
  );
};

export default Home;