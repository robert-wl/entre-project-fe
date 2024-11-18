import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ItineraryDetail } from "@/models/itinerary";
import { FC } from "react";
import ItineraryItemCard from "./itinerary-item-card";

interface IProps {
  detail: ItineraryDetail;
  dateString: string;
}

const ItineraryDetailCard: FC<IProps> = ({ detail, dateString }) => {
  return (
    <div className="bg-white rounded-lg px-4 shadow-lg">
      <Accordion
        type="single"
        collapsible>
        <AccordionItem value="item-1">

          <AccordionTrigger>
            {dateString}
          </AccordionTrigger>

          <AccordionContent>
            {detail.itineraryItems.map((item, idx) => (
              <ItineraryItemCard key={idx} item={item} />
            ))}

          </AccordionContent>

        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ItineraryDetailCard;
