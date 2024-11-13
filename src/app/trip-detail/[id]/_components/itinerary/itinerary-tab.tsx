"use client";

import { FC } from "react";
import EmptyTab from "../empty-tab";
import { Itinerary } from "@/models/itinerary";
import FloatActionButton from "@/components/ui/float-action-button";
import { useRouter } from "next/navigation";
import ItineraryItem from "./itinerary-item";

interface IProps {
  tripId: number;
  itineraries: Itinerary[];
}

const ItineraryTab: FC<IProps> = ({ tripId, itineraries }) => {
  const router = useRouter();

  if (itineraries.length === 0) {
    return (
      <EmptyTab
        routeName="/create-itinerary"
        tabName="Add Itinerary"
        tripId={tripId}
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col flex-1 p-4 gap-4">
      {itineraries.map((itinerary, idx) => (
        <ItineraryItem
          itinerary={itinerary}
          key={idx}
        />
      ))}
      <div className="w-full flex-1">
        <FloatActionButton onClick={() => router.push(`/trip-detail/${tripId}/create-itinerary`)}>+</FloatActionButton>
      </div>
    </div>
  );
};

export default ItineraryTab;
