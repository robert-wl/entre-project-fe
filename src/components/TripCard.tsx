import Link from "next/link";
import { FC } from "react";

interface Props {
  trip: Trip;
}

const TripCard: FC<Props> = ({ trip }) => {
  return (
    <div className="w-full max-w-sm p-4 rounded-2xl shadow-lg">
      <div className="gap-4 min-h-32">
        <p className="text-2xl font-semibold">{trip.name}</p>
        <p className="text-lg text-gray-400">{trip.members.length + 1} traveler(s)</p>
      </div>
      <Link
        href={"/trip-detail"}
        className="w-full">
        <p className="w-full text-right text-gray-400 underline ">{"View Detail >"}</p>
      </Link>
    </div>
  );
};

export default TripCard;
