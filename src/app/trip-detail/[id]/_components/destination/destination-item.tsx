import IconDotsVertical from "@/components/icons/icon-dots-vertical";
import IconEdit from "@/components/icons/icon-edit";
import IconTrash from "@/components/icons/icon-trash";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  const { trigger } = useToast();
  const router = useRouter();

  const handleDeleteDestination = async () => {
    const [_, error] = await DestinationService.deleteDestination(destination.id);

    if (error) {
      trigger(error.error, ToastType.Error);
      return;
    }

    trigger("Destination deleted successfully", ToastType.Success);
    router.refresh();
  };

  return (
    <div className="w-full h-32 flex bg-white rounded-lg shadow-lg gap-2">
      <img
        className="max-w-lg w-2/5 h-full object-cover"
        src={destination.imageUrl}
      />
      <div className="p-2 gap-4 w-full">
        <div className="w-full flex justify-between">
          <p className="font-bold text-lg">{destination.destination}</p>
          <Popover>
            <PopoverTrigger>
              <IconDotsVertical />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0 mr-4">
              <div className="flex flex-col gap-2 p-2">
                <button
                  className="flex gap-2 items-center "
                  onClick={() => router.push(`/edit-destination/${destination.id}`)}>
                  <IconEdit /> Edit
                </button>
                <AlertDialog>
                  <AlertDialogTrigger className="flex gap-2 items-center text-red-600">
                    <IconTrash /> Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure to delete {destination.destination} ?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteDestination}>Continue</AlertDialogAction>
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
