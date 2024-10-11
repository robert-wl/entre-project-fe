import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import { FC } from "react";
import { Control, useFieldArray } from "react-hook-form";

interface IProps {
  control: Control<CreateItineraryDTO>;
  itineraryIndex: number;
  datestring: string;
}

const ItineraryDetailForm: FC<IProps> = ({ control, itineraryIndex, datestring }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `itineraryDetail.${itineraryIndex}.itineraryItems`,
  });

  const appendItineraryItem = () => {
    append({ startHour: "", endHour: "", detailName: "" });
  };

  const removeItineraryItem = (index: number) => {
    remove(index);
  };

  return (
    <div className="bg-white rounded-lg border w-full">
      <Accordion
        type="single"
        collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="px-4">
            <p className="w-full rounded-lg text-left">{datestring}</p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-2 px-4 ">
              {fields.map((_, itemIndex) => (
                <div
                  className="flex items-center gap-1"
                  key={itemIndex}>
                  <Input
                    {...control.register(`itineraryDetail.${itineraryIndex}.itineraryItems.${itemIndex}.startHour`)}
                    placeholder="hh:mm"
                    className="flex-1 border rounded-lg"
                  />
                  -
                  <Input
                    {...control.register(`itineraryDetail.${itineraryIndex}.itineraryItems.${itemIndex}.endHour`)}
                    placeholder="hh:mm"
                    className="flex-1 border rounded-lg"
                  />
                  -
                  <Input
                    {...control.register(`itineraryDetail.${itineraryIndex}.itineraryItems.${itemIndex}.detailName`)}
                    placeholder="detail"
                    className="flex-[2] border rounded-lg"
                  />
                  <button
                    type="button"
                    className="w-full flex flex-1 justify-center max-w-4 items-center size-4 rounded-full bg-destructive text-white"
                    onClick={() => removeItineraryItem(itemIndex)}>
                    -
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  type="button"
                  className="w-full flex justify-center p-2 rounded-lg bg-gray-100 text-white"
                  onClick={appendItineraryItem}>
                  <p className="flex justify-center items-center bg-gray-500 rounded-full size-4">+</p>
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItineraryDetailForm;
