import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import { FC } from "react";
import { Control } from "react-hook-form";

interface IProps {
    control: Control<CreateItineraryDTO>;
    index: number;
    datestring: string;
}

const ItineraryDetailForm: FC<IProps> = ({
    control,
    index,
    datestring
}) => {
    return (
        <div className="bg-white rounded-lg border w-full">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="px-4">
                        <p className="w-full rounded-lg text-left">
                            {datestring}
                        </p>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 flex items-center gap-2">
                        <Input {...control.register(`itineraryDetail.${index}.startHour`)}
                            placeholder="hh:mm"
                            className="flex-1 border rounded-lg" />
                        -
                        <Input {...control.register(`itineraryDetail.${index}.endHour`)}
                            placeholder="hh:mm"
                            className="flex-1 border rounded-lg" />
                        -
                        <Input {...control.register(`itineraryDetail.${index}.detailName`)}
                            className="flex-[2] border rounded-lg" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default ItineraryDetailForm;