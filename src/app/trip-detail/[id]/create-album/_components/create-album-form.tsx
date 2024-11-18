"use client";

import { FC, useEffect } from "react";
import IconCancel from "@/components/icons/icon-cancel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GradientLayout from "@/components/layouts/gradient-layout";
import { useRouter } from "next/navigation";
import useToast, { ToastType } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAlbumDTO, createAlbumSchema } from "@/models/schema/album/create-album.dto";
import AlbumService from "@/services/album-service";
import { Trip } from "@/models/trip";

interface IProps {
  trip: Trip;
}

const CreateAlbumForm: FC<IProps> = ({ trip }) => {
  const router = useRouter();
  const { trigger } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAlbumDTO>({
    resolver: zodResolver(createAlbumSchema),
    defaultValues: {
      name: "",
    },
  });

  const createAlbum = async (data: CreateAlbumDTO) => {
    const [_, error] = await AlbumService.createAlbum(data, trip.id);
    if (error?.message) {
      trigger(error.message, ToastType.Error);
    }
    router.back();
    router.refresh();
  };

  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((key) => {
        const error = errors[key as keyof typeof errors];
        if (error?.message) {
          trigger(error.message, ToastType.Error);
        }
      });
    }
  }, [errors]);

  return (
    <GradientLayout
      showNavbar={false}
      className="p-8 gap-4">
      <div className="w-full flex justify-between py-2">
        <button className="text-lg font-semibold">Add an Album</button>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(createAlbum)}
        className="flex flex-col w-full gap-4 flex-1">
        <Input
          {...register("name")}
          placeholder="Name"
          className="bg-white py-6"
        />
        <img
          src={"/create-album.png"}
          alt="Uploaded"
        />
        <div className="flex flex-col flex-1 justify-end">
          <Button
            type="submit"
            className="rounded-full p-6 font-bold">
            Add Album
          </Button>
        </div>
      </form>
    </GradientLayout>
  );
};

export default CreateAlbumForm;
