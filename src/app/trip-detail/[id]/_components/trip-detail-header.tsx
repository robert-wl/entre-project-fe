"use client";
import { FC } from "react";
import TripDetailPlaceholder from "@/components/TripDetailPlaceholder";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trip } from "@/models/trip";
import { useForm } from "react-hook-form";
import { InviteTripMembersDTO, inviteTripMembersSchema } from "@/models/schema/trip/invite-trip-member.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import TripService from "@/services/trip-service";
import useToast, { ToastType } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface IProps {
  trip: Trip;
}

const TripDetailHeader: FC<IProps> = ({ trip }) => {
  const { trigger } = useToast();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<InviteTripMembersDTO>({
    resolver: zodResolver(inviteTripMembersSchema),
  });

  const inviteTripMembers = async (data: InviteTripMembersDTO) => {
    const [_, error] = await TripService.inviteTripMembers(data, trip!.id);

    if (error?.message) {
      trigger(error.message, ToastType.Error);
      return;
    }

    trigger("Invitation sent successfully", ToastType.Success);
    reset();
    router.refresh();
  };

  return (
    <div className="w-full px-8 py-4 mb-4">
      <TripDetailPlaceholder trip={trip} />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-24 text-base font-bold rounded-full">Invite</Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center w-3/4 max-w-xl rounded-xl">
          <DialogHeader>
            <DialogTitle>Invitation</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(inviteTripMembers)}
            className="w-full">
            <Input
              {...register("emails")}
              placeholder="Email"
              className="w-full mb-4"
            />
            <Button
              type="submit"
              className="w-full font-bold rounded-full">
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripDetailHeader;
