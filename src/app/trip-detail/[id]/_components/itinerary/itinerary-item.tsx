"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Itinerary, ItineraryDetail } from "@/models/itinerary";
import { FC } from "react";

interface IProps {
  itineraryDetail: ItineraryDetail;
}

const ItineraryItem: FC<IProps> = ({ itineraryDetail }) => {

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      <div className="w-full flex justify-between gap-2">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>

            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ItineraryItem;
