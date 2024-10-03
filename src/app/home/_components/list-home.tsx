"use client";
import GradientLayout from "@/components/layouts/gradient-layout";
import { FC } from "react";
import TripCard from "./trip-card";
import { Trip } from "@/models/trip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface IProps {
  tripList: Trip[];
}

const ListHome: FC<IProps> = ({ tripList }) => {
  const router = useRouter();
  return (
    <GradientLayout>
      <div className="flex flex-wrap justify-center w-full gap-6 p-6">
        {tripList.map((trip) => (
          <TripCard
            trip={trip}
            key={trip.id}
          />
        ))}
      </div>
      <Button
        className="fixed bottom-4 right-4 text-3xl rounded-full size-12"
        onClick={() => router.push(`/create-trip`)}>
        +
      </Button>
    </GradientLayout>
  );
};

export default ListHome;
