import { Input } from "@/components/ui/input";
import { EditItineraryDetailDTO } from "@/models/schema/itinerary/edit-itinerary-detail.dto";
import { FC } from "react";
import { Control, Controller } from "react-hook-form";

interface IProps {
  control: Control<EditItineraryDetailDTO>;
  index: number;
}

const ItineraryItemCard: FC<IProps> = ({ control, index }) => {
  return (
    <Controller
      control={control}
      name={`itineraryItems.${index}`}
      render={({ field }) => (
        <div className="flex gap-1 items-center">
          <Input
            className="flex-1"
            {...control.register(`itineraryItems.${index}.startHour`)}
            placeholder="Start hour"
          />

          <p>-</p>

          <Input
            className="flex-1"
            {...control.register(`itineraryItems.${index}.endHour`)}
            placeholder="End hour"
          />

          <p>-</p>

          <Input
            className="flex-[2]"
            {...control.register(`itineraryItems.${index}.detailName`)}
            placeholder="Detail name"
          />
        </div>
      )}
    />
  );
};

export default ItineraryItemCard;
