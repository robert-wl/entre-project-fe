"use client";
import Navbar from "@/components/Navbar";
import TripDetailPlaceholder from "@/components/TripDetailPlaceholder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InviteTripMembersDTO, inviteTripMembersSchema } from "@/models/schema/trip/invite-trip-member-dto";
import TripService from "@/services/trip-service";
import { Nullable } from "@/types/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const tabs = ["Destination", "Itinerary", "Bills"];
const billFilters = ["All", "Active"];

interface Props {
  params: { id: number };
}

const TripDetail: FC<Props> = ({ params: { id } }) => {
  const router = useRouter();
  const [trip, setTrip] = useState<Nullable<Trip>>(null);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const [selectedBillFilter, setSelectedBillFilter] = useState<string>(billFilters[0]);

  const { register, handleSubmit, reset } = useForm<InviteTripMembersDTO>({
    resolver: zodResolver(inviteTripMembersSchema),
  });

  const fetchTripDetail = async () => {
    const result = await TripService.getTripWithDetails(id);
    setTrip(result);
  };

  const inviteTripMembers = async (data: InviteTripMembersDTO) => {
    await TripService.inviteTripMembers(data, trip!.id);
    reset();
  };

  useEffect(() => {
    fetchTripDetail();
  }, []);

  return (
    <>
      <Navbar />
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

      <div className="w-full h-full flex flex-col flex-1">
        <div className="w-full flex justify-evenly">
          {tabs.map((tab) => (
            <p
              className={`flex-1 p-2 text-center 
                          ${activeTab === tab ? "border-black border-b" : ""}
                      `}
              onClick={() => setActiveTab(tab)}
              key={tab}>
              {tab}
            </p>
          ))}
        </div>
        {activeTab === "Bills" && (
          <div className="w-full h-full flex flex-col flex-1 p-4 gap-4">
            <Select
              value={selectedBillFilter}
              onValueChange={(value) => setSelectedBillFilter(value)}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Bill" />
              </SelectTrigger>
              <SelectContent>
                {billFilters.map((filter) => (
                  <SelectItem
                    value={filter}
                    key={filter}>
                    {filter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="w-full flex-1">
              <Button
                className="fixed bottom-2 right-2 text-3xl rounded-full size-16"
                onClick={() => router.push(`/trip-detail/${id}/create-bill`)}>
                +
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TripDetail;
