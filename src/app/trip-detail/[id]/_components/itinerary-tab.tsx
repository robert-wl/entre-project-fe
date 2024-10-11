"use client";

import { FC } from "react";
import EmptyTab from "./empty-tab";

interface IProps {
  tripId: number;
  itineraries: [];
}

const ItineraryTab: FC<IProps> = ({ tripId, itineraries }) => {
  if (itineraries.length === 0) {
    return (
      <EmptyTab
        routeName="/create-itinerary"
        tabName="Add Itinerary"
        tripId={tripId}
      />
    );
  }

  return <div></div>;
};

export default ItineraryTab;
