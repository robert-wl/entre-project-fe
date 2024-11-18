import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import { register } from "module";
import { FC } from "react";
import { Control, useFieldArray } from "react-hook-form";

interface IProps {
  control: Control<CreateItineraryDTO>;
  itineraryIndex: number;
  datestring: string;
}

const ItineraryItemForm: FC<IProps> = ({ control, itineraryIndex, datestring }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <p className="text-lg font-bold">{datestring}</p>
      <Input
        {...control.register(`itineraryDetail.${itineraryIndex}.itineraryItems.0.detailName`)}
        placeholder="Activity Title"
        className="bg-white"
      />
      <div className="flex gap-4">
        <Input
          {...control.register(`itineraryDetail.${itineraryIndex}.itineraryItems.0.startHour`)}
          placeholder="Start Time"
          className="bg-white"
        />
        <Input
          {...control.register(`itineraryDetail.${itineraryIndex}.itineraryItems.0.endHour`)}
          placeholder="End Time"
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default ItineraryItemForm;
