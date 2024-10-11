"use client";

import { FC, useState } from "react";
import ItineraryDateForm from "./itinerary-date-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateItineraryDTO, createItinerarySchema } from "@/models/schema/itinerary/create-itinerary.dto";
import { useForm } from "react-hook-form";
import { Trip } from "@/models/trip";
import ItineraryItemForm from "./itinerary-item-form";

interface IProps {
  trip: Trip;
}

const CreateItineraryForm: FC<IProps> = ({ trip }) => {
  const [step, setStep] = useState(1);

  const { handleSubmit, getValues, control } = useForm<CreateItineraryDTO>({
    resolver: zodResolver(createItinerarySchema),
    shouldUnregister: false
  });

  const handleNavigate = (key: number) => {
    if (key === 1) {
      const startDate = getValues("startDate");
      const endDate = getValues("endDate");
      if (!startDate || !endDate || startDate > endDate) {
        return;
      }
      setStep(2);
    } else if (key === -1) {
      setStep(1);
    }
  };

  const createItinerary = async (data: CreateItineraryDTO) => {

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
