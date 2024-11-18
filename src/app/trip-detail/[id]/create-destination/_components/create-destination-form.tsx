"use client";

import IconCancel from "@/components/icons/icon-cancel";
import IconImageUpload from "@/components/icons/icon-image-upload";
import GradientLayout from "@/components/layouts/gradient-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useToast, { ToastType } from "@/hooks/use-toast";
import { convertToBase64 } from "@/lib/utils";
import { CreateDestinationDTO, createDestinationSchema } from "@/models/schema/destination/create-destination.dto";
import { Trip } from "@/models/trip";
import DestinationService from "@/services/destination-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useRef } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  trip: Trip;
}

const CreateDestinationForm: FC<IProps> = ({ trip }) => {
  const router = useRouter();
  const { trigger } = useToast();
  const destinationImageInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch } = useForm<CreateDestinationDTO>({
    resolver: zodResolver(createDestinationSchema),
    defaultValues: {
      destination: "",
      notes: "",
      image: "",
      tripId: trip.id,
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const base64image = await convertToBase64(file[0]);
      setValue("image", base64image);
    }
  };

  const createDestination = async (data: CreateDestinationDTO) => {
    const [_, error] = await DestinationService.createDestination(data);
    if (error?.message) {
      trigger(error.message, ToastType.Error);
      return;
    }
    trigger("Destination created successfully", ToastType.Success);
    router.replace(`/trip-detail/${trip.id}?tab=destination`);
    router.refresh();
  };

  return (
    <GradientLayout
      showNavbar={false}
      className="p-8 gap-4">
      <div className="w-full flex justify-between py-2">
        <button className="text-lg font-semibold">Add a destination</button>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(createDestination)}
        className="flex flex-col w-full gap-4 flex-1">
        <Input
          {...register("destination")}
          placeholder="Destination"
          className="bg-white py-6"
        />
        <Textarea
          {...register("notes")}
          placeholder="Notes"
          className="bg-white py-4"
        />
        <Input
          {...register("image")}
          type="file"
          className="hidden"
          accept="image/*"
          ref={destinationImageInputRef}
          onChange={handleImageChange}
        />
        {watch().image ? (
          <img
            onClick={() => destinationImageInputRef.current?.click()}
            src={watch().image}
            className="h-32 w-full object-cover"
            alt="Uploaded"
          />
        ) : (
          <Button
            type="button"
            onClick={() => destinationImageInputRef.current?.click()}
            className="bg-white h-32 flex flex-col">
            <IconImageUpload className="size-6 text-gray-400" />
            <p className="text-gray-400 text-base underline">Upload image</p>
          </Button>
        )}
        <img
          src={"/create-destination.png"}
          alt="Uploaded"
        />
        <div className="flex flex-col flex-1 justify-end">
          <Button
            type="submit"
            className="rounded-full p-6 font-bold">
            Add destination
          </Button>
        </div>
      </form>
    </GradientLayout>
  );
};

export default CreateDestinationForm;
