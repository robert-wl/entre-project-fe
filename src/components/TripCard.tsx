import { FC } from "react";

interface Props {
    trip: Trip
}

const TripCard: FC<Props> = ({
    trip
}) => {
    return (
        <div className="w-full p-4 rounded-2xl shadow-lg">
            <div className="gap-4 min-h-32">
                <p className="text-2xl font-semibold">{trip.name}</p>
                <p className="text-lg text-gray-400"> traveler(s)</p>
            </div>
            <p className="w-full text-right text-gray-400 underline ">{"View Detail >"}</p>
        </div>
    );
}

export default TripCard;