"use client";
import GradientLayout from "@/components/layouts/gradient-layout";
import { FC } from "react";
import TripCard from "./trip-card";
import { Trip } from "@/models/trip";
import { useRouter } from "next/navigation";
import FloatActionButton from "@/components/ui/float-action-button";

interface IProps {
  tripList: Trip[];
}

const ListHome: FC<IProps> = ({ tripList }) => {
  const router = useRouter();

  return (
    <GradientLayout showFooter={false}>
      <div className="flex flex-wrap justify-center w-full gap-6 p-6">
        {tripList.map((trip) => (
          <TripCard
            trip={trip}
            key={trip.id}
          />
        ))}
      </div>
      <FloatActionButton onClick={() => router.push(`/create-trip`)}>+</FloatActionButton>
    </GradientLayout>
  );
};

export default ListHome;
