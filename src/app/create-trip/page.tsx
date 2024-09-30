"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTripDTO, createTripSchema } from "@/models/schema/trip/create-trip.dto";
import TripService from "@/services/trip-service";

const CreateTrip: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripDTO>({
    resolver: zodResolver(createTripSchema),
  });

  console.log(errors);
  const createTrip = async (data: CreateTripDTO) => {
    const result = await TripService.createTrip(data);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-[2] flex-col p-8 justify-center items-center">
        <p className="text-2xl">
          <span className="font-bold text-primary">Plan</span> your trips
        </p>
        <p className="text-2xl">
          <span className="font-bold text-primary">Split</span> your bills
        </p>
        <p className="text-2xl">easier now!</p>
      </div>
      <div className="w-full flex flex-[4] items-start justify-center">
        <Sheet>
          <SheetTrigger>Add</SheetTrigger>
          <SheetContent
            side={"bottom"}
            className="w-full h-3/5 flex flex-col p-8 gap-8 items-center bg-gradient-to-b from-primary-foreground to-background rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>
                <p className="text-2xl font-semibold text-center">Let's start with the</p>
                <p className="text-2xl font-bold text-primary text-center">trip details! 🎉</p>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <form
              onSubmit={handleSubmit(createTrip)}
              className="w-full h-full flex flex-col gap-4">
              <Input
                {...register("name")}
                className="py-6 bg-background"
                type="text"
                placeholder="Trip name"
              />
              <Input
                {...register("description")}
                className="py-6 bg-background"
                type="text"
                placeholder="Description"
              />
              <Input
                {...register("numberOfTravelers", { valueAsNumber: true })}
                type="number"
                className="py-6 bg-background"
                placeholder="Number of travelers"
              />
              <Button
                type="submit"
                className="w-full py-6 rounded-3xl text-background font-bold">
                Continue
              </Button>
            </form>
            <p className="text-sm text-gray-400">© SplanNGo All rights reserved</p>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CreateTrip;
