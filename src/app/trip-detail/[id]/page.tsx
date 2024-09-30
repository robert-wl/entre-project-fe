"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import TripService from "@/services/trip-service";
import { FC, useEffect, useState } from "react";

const tabs = ["Destination", "Itinerary", "Bills"];

interface Props {
  params: { id: number };
}

const TripDetail: FC<Props> = ({
  params: { id },
}) => {
  const [trip, setTrip] = useState<Trip | undefined>();
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  const fetchTripDetail = async () => {
    const result = await TripService.getTripWithDetails(id);
    setTrip(result)
  }

  useEffect(() => {
    fetchTripDetail()
  }, []);

  return <>
    <div className="w-full px-8 py-4 mb-4">
      {trip === undefined ? (
        <>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />
          <div className="flex flex-col w-fit gap-2">
            <Skeleton className="h-4 w-24" />
            <Button className="w-24 text-base font-bold rounded-full">Invite</Button>
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl font-bold">{trip.name}</p>
          <p>{trip.description}</p>
          <div className="flex flex-col w-fit gap-2">
            <p className="text-s text-gray-400">{trip.members.length + 1} traveler(s)</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-24 text-base font-bold rounded-full">Invite</Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col items-center w-3/4 max-w-xl rounded-xl">
                <DialogHeader>
                  <DialogTitle>Invitation</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Input
                  placeholder="Email"
                  className="w-full max-w-lg"
                />
                <Button className="w-24 font-bold rounded-full">Send</Button>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </div>
    <div className="w-full">
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
    </div>
  </>
};

export default TripDetail;
