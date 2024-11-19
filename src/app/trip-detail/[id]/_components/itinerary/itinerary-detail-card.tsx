"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FC } from "react";
import ItineraryItemCard from "./itinerary-item-card";
import { Control, useFieldArray, UseFormHandleSubmit } from "react-hook-form";
import { EditItineraryDetailDTO } from "@/models/schema/itinerary/edit-itinerary-detail.dto";
import { Button } from "@/components/ui/button";

interface IProps {
  control: Control<EditItineraryDetailDTO>;
  dateString: string;
  detailIndex: number;
}

const ItineraryDetailCard: FC<IProps> = ({ control, dateString, detailIndex }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `itineraryDetails.${detailIndex}.itineraryItems`,
  });

  const addItineraryItem = () => {
    append({ startHour: "", endHour: "", detailName: "", id: null });
  };

  return (
    <div className="bg-white rounded-lg px-4 shadow-lg">
      <Accordion
        type="single"
        collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{dateString}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {fields.map((_, idx) => (
              <ItineraryItemCard
                control={control}
                detailIndex={detailIndex}
                itemIndex={idx}
                key={idx}
              />
            ))}
            <button
              type="button"
              className="w-full bg-gray-200 p-1"
              onClick={addItineraryItem}>
              +
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItineraryDetailCard;
