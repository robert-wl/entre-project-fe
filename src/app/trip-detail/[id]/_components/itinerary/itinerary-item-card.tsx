import { ItineraryItem } from "@/models/itinerary";
import { FC } from "react";

interface IProps {
    item: ItineraryItem
}

const ItineraryItemCard: FC<IProps> = ({
    item
}) => {
    return (
        <div className="flex gap-1">
            <p className="text-gray-500 font-semibold">{item.startHour} - </p>
            <p className="text-gray-500 font-semibold">{item.endHour} - </p>
            <p className="text-gray-500">{item.detailName}</p>
        </div>
    );
}

export default ItineraryItemCard;