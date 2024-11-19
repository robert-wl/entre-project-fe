"use client";

import { FC } from "react";
import EmptyTab from "../empty-tab";
import { Itinerary } from "@/models/itinerary";
import { format } from "date-fns";
import ItineraryDetailCard from "./itinerary-detail-card";

interface IProps {
  tripId: number;
  itinerary: Itinerary;
}

const getFormattedDateString = (startDateString: string, currDateString: string) => {
  const currDate = new Date(currDateString);
  const startDate = new Date(startDateString);
  const day = (currDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  return `Day ${day} - ${format(currDate, "dd MMM yyyy")}`;
};

const ItineraryTab: FC<IProps> = ({ tripId, itinerary }) => {
  if (itinerary === null) {
    return (
      <EmptyTab
        image={"/empty-itinerary.png"}
        routeName="/create-itinerary"
        tabName="Add Itinerary"
        tripId={tripId}
      />
    );
  }

  return (
    <div className="w-full flex flex-col flex-1 p-4 gap-4">
      {itinerary.itineraryDetails.map((detail, idx) => (
        <ItineraryDetailCard
          key={idx}
          detail={detail}
          dateString={getFormattedDateString(itinerary.startDate, detail.date)}
        />
      ))}
    </div>
  );
};

export default ItineraryTab;
