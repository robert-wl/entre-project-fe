import { Input } from "@/components/ui/input";
import { EditItineraryDetailDTO } from "@/models/schema/itinerary/edit-itinerary-detail.dto";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<EditItineraryDetailDTO>;
  detailIndex: number;
  itemIndex: number;
}

const ItineraryItemCard: FC<IProps> = ({ control, detailIndex, itemIndex }) => {
  return (
    <Controller
      control={control}
      name={`itineraryDetails.${detailIndex}.itineraryItems.${itemIndex}`}
      render={({ field }) => (
        <div className="flex gap-1 items-center">
          <Input
            className="flex-1"
            {...control.register(`itineraryDetails.${detailIndex}.itineraryItems.${itemIndex}.startHour`)}
            placeholder="Start hour"
          />

          <p>-</p>

          <Input
            className="flex-1"
            {...control.register(`itineraryDetails.${detailIndex}.itineraryItems.${itemIndex}.endHour`)}
            placeholder="End hour"
          />

          <p>-</p>

          <Input
            className="flex-[2]"
            {...control.register(`itineraryDetails.${detailIndex}.itineraryItems.${itemIndex}.detailName`)}
            placeholder="Detail name"
          />
        </div>
      )}
    />
  );
};

export default ItineraryItemCard;
