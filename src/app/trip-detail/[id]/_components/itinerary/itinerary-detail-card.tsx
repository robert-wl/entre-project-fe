"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ItineraryDetail } from "@/models/itinerary";
import { FC } from "react";
import ItineraryItemCard from "./itinerary-item-card";
import { useFieldArray, useForm } from "react-hook-form";
import { EditItineraryDetailDTO, editItineraryDetailSchema } from "@/models/schema/itinerary/edit-itinerary-detail.dto";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import ItineraryService from "@/services/itinerary-service";
import useToast, { ToastType } from "@/hooks/use-toast";

interface IProps {
  detail: ItineraryDetail;
  dateString: string;
}

const ItineraryDetailCard: FC<IProps> = ({ detail, dateString }) => {
  const { control, handleSubmit } = useForm<EditItineraryDetailDTO>({
    defaultValues: {
      id: detail.id,
      itineraryItems: detail.itineraryItems,
    },
    resolver: zodResolver(editItineraryDetailSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: `itineraryItems`,
  });

  const addItineraryItem = () => {
    append({ startHour: "", endHour: "", detailName: "", id: null });
  };

  const { trigger } = useToast();

  const editItineraryDetail = async (data: EditItineraryDetailDTO) => {
    const [_, error] = await ItineraryService.editItineraryDetail(data);

    if (error) {
      trigger(error.message, ToastType.Error);
      return;
    }

    trigger("Itinerary detail updated successfully", ToastType.Success);
  };

  return (
    <div className="bg-white rounded-lg px-4 shadow-lg">
      <Accordion
        type="single"
        collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>{dateString}</AccordionTrigger>

          <AccordionContent>
            <form
              onSubmit={handleSubmit(editItineraryDetail)}
              className="flex flex-col gap-2">
              {fields.map((_, idx) => (
                <ItineraryItemCard
                  control={control}
                  index={idx}
                  key={idx}
                />
              ))}
              <button
                type="button"
                className="w-full bg-gray-100 p-1"
                onClick={addItineraryItem}>
                +
              </button>
              <Button
                type="submit"
                className="hidden">
                Save Changes
              </Button>
            </form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItineraryDetailCard;
