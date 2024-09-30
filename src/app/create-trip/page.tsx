"use client";
import Protector from "@/components/middleware/protector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import TripService from "@/services/trip-service";
import { useForm } from "react-hook-form";

interface ICreateTripForm {
  name: string;
  description: string;
}

const CreateTrip: React.FC = () => {
  const { register, handleSubmit } = useForm<ICreateTripForm>();

  const createTrip = async (data: ICreateTripForm) => {
    const response = await TripService.createTrip({
      name: data.name,
      description: data.description,
    });
    console.log(response);
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
            className="w-full h-3/5 overflow-y-auto flex flex-col p-8 gap-8 items-center bg-gradient-to-b from-primary-foreground to-background rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>
                <p className="text-2xl font-semibold text-center">Let's start with the</p>
                <p className="text-2xl font-bold text-primary text-center">trip details! 🎉</p>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <form
              onSubmit={handleSubmit(createTrip)}
              className="w-full h-full items-center flex flex-col gap-4">
              <div className="w-full flex flex-col items-center flex-1 gap-4">
                <Input
                  {...register("name")}
                  className="max-w-xl py-6 bg-background"
                  type="text"
                  placeholder="Trip name"
                />
                <Input
                  {...register("description")}
                  className="max-w-xl py-6 bg-background"
                  type="text"
                  placeholder="Description"
                />
              </div>
              <Button className="w-full max-w-xl py-6 rounded-3xl font-bold">Continue</Button>
            </form>
            <p className="text-sm text-gray-400">© SplanNGo All rights reserved</p>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CreateTrip;
