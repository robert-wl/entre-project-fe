"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import EmptyTab from "./empty-tab";
import { Destination } from "@/models/destination";
import DestinationItem from "./destination-item";
import FloatActionButton from "@/components/ui/float-action-button";

interface IProps {
  tripId: number;
  destinations: Destination[];
}

const DestinationTab: FC<IProps> = ({ tripId, destinations }) => {
  const router = useRouter();
  if (destinations.length === 0) {
    return (
      <EmptyTab
        tripId={tripId}
        tabName="Add Destination"
        routeName="create-destination"
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col flex-1 p-4 gap-4">
      {destinations.map((destination, idx) => (
        <DestinationItem
          destination={destination}
          key={idx}
        />
      ))}
      <div className="w-full flex-1">
        <FloatActionButton onClick={() => router.push(`/trip-detail/${tripId}/create-destination`)}>+</FloatActionButton>
      </div>
    </div>
  );
};

export default DestinationTab;
