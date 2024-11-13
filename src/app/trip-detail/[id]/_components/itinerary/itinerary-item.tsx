"use client";
import { Itinerary } from "@/models/itinerary";
import { FC } from "react";

interface IProps {
  itinerary: Itinerary;
}

const ItineraryItem: FC<IProps> = ({ itinerary }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <div className="w-full flex justify-between gap-2">
        <p className="font-semibold">Start: {itinerary.startDate}</p>
        <p className="font-semibold">End: {itinerary.endDate}</p>
      </div>
    </div>
  );
};

export default ItineraryItem;
