import IconCancel from "@/components/icons/icon-cancel";
import GradientLayout from "@/components/layouts/gradient-layout";
import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import { Trip } from "@/models/trip";
import { FC } from "react";
import { Control, useFieldArray, UseFormGetValues } from "react-hook-form";
import ItineraryItemForm from "./itinerary-item-form";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface IProps {
  control: Control<CreateItineraryDTO, any>;
  getValues: UseFormGetValues<CreateItineraryDTO>;
  handleNavigate: (key: number) => void;
  handleSubmit: () => Promise<void>;
  trip: Trip;
}

const ItineraryDetailForm: FC<IProps> = ({
  control,
  handleNavigate,
  handleSubmit,
  getValues,
  trip
}) => {
  const startDate = getValues("startDate");

  const { fields } = useFieldArray({
    control,
    name: "itineraryDetail",
  });

  const getFormattedDate = (dayIndex: number) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayIndex);
    return `Day ${dayIndex + 1} - ${format(currentDate, "dd MMMM yyyy")}`;
  };

  return (
    <GradientLayout
      showNavbar={false}
      className="p-8">
      <div className="w-full flex justify-end h-7">
        <button onClick={()=>handleNavigate(-1)}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 gap-4">
        {fields.map((_, index) => {
          return (
            <ItineraryItemForm
              datestring={getFormattedDate(index)}
              control={control}
              itineraryIndex={index}
              key={index}
            />
          );
        })}
        <div className="w-full flex flex-col flex-1 justify-end bg-red">
          <Button
            className="w-full rounded-full shadow-xl text-lg font-bold py-6"
            type="submit">
            Add Itinerary
          </Button>
        </div>
      </form>
    </GradientLayout>
  );
};

export default ItineraryDetailForm;
