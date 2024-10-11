import IconCancel from "@/components/icons/icon-cancel";
import GradientLayout from "@/components/layouts/gradient-layout";
import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import { Trip } from "@/models/trip";
import { FC } from "react";
import { Control, UseFormGetValues } from "react-hook-form";
import ItineraryDetailForm from "./itinerary-detail-form";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";

interface IProps {
  control: Control<CreateItineraryDTO, any>;
  getValues: UseFormGetValues<CreateItineraryDTO>;
  handleNavigate: (key: number) => void;
  handleSubmit: () => Promise<void>;
  trip: Trip;
}

const ItineraryItemForm: FC<IProps> = ({
  control,
  handleNavigate,
  handleSubmit,
  getValues,
  trip,
}) => {
  const startDate = getValues("startDate");
  const endDate = getValues("endDate");

  const days = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1
  );

  const getFormattedDate = (dayIndex: number) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayIndex);
    return `Day ${dayIndex + 1} - ${format(currentDate, "dd MMMM yyyy")}`
  };

  return (
    <GradientLayout showNavbar={false} className="p-8 gap-4">
      <div className="w-full flex justify-between py-2">
        <p className="text-lg font-semibold">{trip.name}</p>
        <button onClick={() => handleNavigate(-1)}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-2">
        {[...Array(days)].map((_, index) => {
          return (
            <ItineraryDetailForm
              datestring={getFormattedDate(index)}
              control={control}
              index={index}
              key={index} />
          );
        })}
        <div className="w-full flex flex-col flex-1 justify-end bg-red">
          <Button className="w-full rounded-full shadow-xl text-lg font-bold py-6"
            type="submit">
            Add Itinerary
          </Button>
        </div>
      </form>
    </GradientLayout>
  );
};

export default ItineraryItemForm;
