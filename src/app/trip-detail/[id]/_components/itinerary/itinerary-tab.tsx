"use client";

import { FC } from "react";
import EmptyTab from "../empty-tab";
import { Itinerary } from "@/models/itinerary";
import { useRouter } from "next/navigation";
import ItineraryItem from "./itinerary-item";

interface IProps {
  tripId: number;
  itinerary: Itinerary;
}

const ItineraryTab: FC<IProps> = ({ tripId, itinerary }) => {
  if (itinerary === null) {
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
      {itinerary.itineraryDetails.map((itDetail, idx) => (
        <ItineraryItem key={idx} itineraryDetail={itDetail} />
      ))}
    </div>
  );
};

export default ItineraryTab;
