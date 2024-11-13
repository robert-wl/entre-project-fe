import IconDotsVertical from "@/components/icons/icon-dots-vertical";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import useToast, { ToastType } from "@/hooks/use-toast";
import { Destination } from "@/models/destination";
import DestinationService from "@/services/destination-service";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface IProps {
  destination: Destination;
}

const DestinationItem: FC<IProps> = ({ destination }) => {
  const { trigger } = useToast()
  const router = useRouter()

  const handleDeleteDestination = async () => {
    const [_, error] = await DestinationService.deleteDestination(destination.id);

    if (error) {
      trigger(error.error, ToastType.Error)
    }

    router.refresh()

  }

  return (
    <div className="w-full h-32 flex bg-white rounded-lg shadow-lg gap-2">
      <img
        className="max-w-lg w-2/5 h-full"
        src={destination.image}
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
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button className="px-3 py-1 text-left">Delete</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure to delete {destination.destination} ?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteDestination}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
