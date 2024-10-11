import IconDotsVertical from "@/components/icons/icon-dots-vertical";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Destination } from "@/models/destination";
import { FC } from "react";

interface IProps {
  destination: Destination;
}

const DestinationItem: FC<IProps> = ({ destination }) => {
  return (
    <div className="w-full h-32 flex bg-white rounded-lg shadow-lg gap-2">
      <img
        className="max-w-lg w-2/5 h-full"
        src={destination.image}
        alt=""
      />
      <div className="p-2 gap-4 w-full">
        <div className="w-full flex justify-between">
          <p className="font-bold text-lg">{destination.destination}</p>

          <Popover>
            <PopoverTrigger>
              <IconDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 mr-4">
              <div className="flex flex-col gap-1">
                <button className="px-3 py-1 text-left">Edit</button>
                <button className="px-3 py-1 text-left">Delete</button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-gray-500 text-sm">{destination.notes}</p>
      </div>
    </div>
  );
};

export default DestinationItem;
