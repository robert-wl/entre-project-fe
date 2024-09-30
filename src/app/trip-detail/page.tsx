"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";

const tabs = ["Destination", "Itinerary", "Bills"];

const TripDetail: FC = () => {
  const [trip, setTrip] = useState<Trip | undefined>();
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <>
      <div className="w-full px-8 py-4 mb-4">
        <p className="text-2xl font-bold">Birthday Trip</p>
        <p>Birthday Trip</p>
        <div className="flex flex-col w-fit gap-2">
          <p className="text-s text-gray-400">0 traveler(s)</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full text-base font-bold rounded-full">Invite</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center w-3/4 max-w-xl">
              <DialogHeader>
                <DialogTitle>Invitation</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Email"
                className="w-full max-w-lg"
              />
              <Button className="w-full font-bold rounded-full">Send</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex justify-evenly">
          {tabs.map((tab) => (
            <p
              className={`flex-1 p-2 text-center 
                          ${activeTab === tab && "border-black border-b"}
                      `}
              onClick={() => setActiveTab(tab)}
              key={tab}>
              {tab}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripDetail;
