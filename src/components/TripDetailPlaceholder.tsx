import { FC } from "react";
import { Skeleton } from "./ui/skeleton";
import { Nullable } from "@/types/utils";

interface Props {
  trip: Nullable<Trip>;
}

const TripDetailPlaceholder: FC<Props> = ({ trip }) => {
  if (!trip) {
    return (
      <>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-4 w-24 mb-4" />
      </>
    );
  }
  return (
    <>
      <p className="text-2xl font-bold">{trip.name}</p>
      <p>{trip.description}</p>
      <p className="text-s text-gray-400 mb-4">{trip.members.length + 1} traveler(s)</p>
    </>
  );
};

export default TripDetailPlaceholder;
