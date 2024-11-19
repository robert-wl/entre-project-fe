"use client";

import { FC } from "react";
import EmptyTab from "../empty-tab";
import { Itinerary } from "@/models/itinerary";
import { format } from "date-fns";
import ItineraryDetailCard from "./itinerary-detail-card";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { EditItineraryDetailDTO, editItineraryDetailSchema } from "@/models/schema/itinerary/edit-itinerary-detail.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import ItineraryService from "@/services/itinerary-service";
import useToast, { ToastType } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface IProps {
  tripId: number;
  itinerary: Itinerary;
}

const getFormattedDateString = (startDateString: string, currDateString: string) => {
  const currDate = new Date(currDateString);
  const startDate = new Date(startDateString);
  const day = (currDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
  return `Day ${day} - ${format(currDate, "dd MMM yyyy")}`;
};

const ItineraryTab: FC<IProps> = ({ tripId, itinerary }) => {
  if (itinerary === null) {
    return (
      <EmptyTab
        image={"/empty-itinerary.png"}
        routeName="/create-itinerary"
        tabName="Add Itinerary"
        tripId={tripId}
      />
    );
  }

  const { trigger } = useToast();

  const { control, handleSubmit } = useForm<EditItineraryDetailDTO>({
    defaultValues: {
      id: itinerary.id,
      itineraryDetails: itinerary.itineraryDetails,
    },
    resolver: zodResolver(editItineraryDetailSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "itineraryDetails",
  });

  const editItineraryDetail = async (data: EditItineraryDetailDTO) => {
    const [_, error] = await ItineraryService.editItineraryDetail(data);
    if (error) {
      trigger(error.message, ToastType.Error);
      return;
    }
    trigger("Itinerary detail updated successfully", ToastType.Success);
  };

  const onError = (errors: any) => {
    console.error("Form Validation Errors:", errors);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(editItineraryDetail, onError)}
        className="w-full flex flex-col flex-1 p-4 gap-4">
        {fields.map((field, idx) => (
          <ItineraryDetailCard
            dateString={getFormattedDateString(itinerary.startDate, field.date)}
            control={control}
            detailIndex={idx}
            key={idx}
          />
        ))}
        <div className="fixed bottom-4 right-0 left-0 w-full p-4">
          <Button
            type="submit"
            className="w-full p-6 rounded-full text-lg font-bold">
            Update Itinerary
          </Button>
        </div>
      </form>
    </>
  );
};

export default ItineraryTab;
