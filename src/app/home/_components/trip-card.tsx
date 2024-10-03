import Link from "next/link";
import { FC } from "react";
import { Trip } from "@/models/trip";

interface Props {
  trip: Trip;
}

const TripCard: FC<Props> = ({ trip }) => {
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-2xl drop-shadow-lg">
      <div className="gap-4 min-h-32">
        <p className="text-2xl font-semibold">{trip.name}</p>
        <p className="text-lg text-gray-400">{trip.members.length} traveler(s)</p>
      </div>
      <Link
        href={`/trip-detail/${trip.id}`}
        className="w-full">
        <p className="w-full text-right text-gray-400 underline ">{"View Detail >"}</p>
      </Link>
    </div>
  );
};

export default TripCard;
