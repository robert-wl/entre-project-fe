"use client";

import { FC, useState } from "react";
import ItineraryDateForm from "./itinerary-date-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateItineraryDTO, createItinerarySchema } from "@/models/schema/itinerary/create-itinerary.dto";
import { useForm } from "react-hook-form";
import { Trip } from "@/models/trip";
import ItineraryItemForm from "./itinerary-detail-form";
import { useSession } from "next-auth/react";
import ItineraryService from "@/services/itinerary-service";
import useToast, { ToastType } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface IProps {
  trip: Trip;
}

const CreateItineraryForm: FC<IProps> = ({ trip }) => {
  const [step, setStep] = useState(1);

  const { trigger } = useToast();
  const router = useRouter();

  const { handleSubmit, getValues, setValue, control } = useForm<CreateItineraryDTO>({
    resolver: zodResolver(createItinerarySchema),
    shouldUnregister: false,
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      tripId: trip.id,
      itineraryDetail: [],
    },
  });

  const handleNavigate = (key: number) => {
    if (key === 1) {
      const startDate = getValues("startDate");
      const endDate = getValues("endDate");
      if (!startDate || !endDate || startDate > endDate) {
        return;
      }
      const days = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1);
      const itineraryDetail = Array.from({ length: days }, (_, index) => {
        const currDate = new Date(startDate);
        currDate.setDate(startDate.getDate() + index);
        return {
          date: currDate,
          itineraryItems: [
            {
              startHour: "",
              endHour: "",
              detailName: "",
            },
          ],
        };
      });
      setValue("itineraryDetail", itineraryDetail);
      setStep(2);
    } else if (key === -1) {
      setStep(1);
    }
  };

  const createItinerary = async (data: CreateItineraryDTO) => {
    const [_, error] = await ItineraryService.createItinerary(data);

    if (error?.error) {
      trigger(error.message, ToastType.Error);
    }

    trigger("Itinerary created successfully", ToastType.Success);
    router.push(`/trip-detail/${trip.id}?tab=itinerary`);
    router.refresh();
  };

  return step === 1 ? (
    <ItineraryDateForm
      control={control}
      handleNavigate={handleNavigate}
    />
  ) : (
    <ItineraryItemForm
      control={control}
      trip={trip}
      handleNavigate={handleNavigate}
      handleSubmit={handleSubmit(createItinerary)}
      getValues={getValues}
    />
  );
};

export default CreateItineraryForm;
