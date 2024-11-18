"use client";
import IconCancel from "@/components/icons/icon-cancel";
import GradientLayout from "@/components/layouts/gradient-layout";
import { FC, useRef } from "react";
import { useRouter } from "next/navigation";
import useToast, { ToastType } from "@/hooks/use-toast";
import { Album } from "@/models/album";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import FloatActionButton from "@/components/ui/float-action-button";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IconImageUpload from "@/components/icons/icon-image-upload";
import AlbumService from "@/services/album-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAlbumDetailDTO, createAlbumDetailSchema } from "@/models/schema/album/create-album-detail.dto";
import { convertToBase64 } from "@/lib/utils";
import IconImage from "@/components/icons/icon-image";
import AlbumDetailCombobox from "@/app/trip-detail/[id]/album/[albumId]/_components/album-detail-combobox";

interface IProps {
  tripId: number;
  album: Album;
}

const AlbumContent: FC<IProps> = ({ tripId, album }) => {
  const router = useRouter();
  const { trigger } = useToast();
  const albumImageInputRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, setValue, watch } = useForm<CreateAlbumDetailDTO>({
    resolver: zodResolver(createAlbumDetailSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const createAlbum = async (data: CreateAlbumDetailDTO) => {
    const [_, error] = await AlbumService.createAlbumDetail(data, album.id);
    if (error?.message) {
      trigger(error.message, ToastType.Error);
    }
    router.back();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      const base64image = await convertToBase64(file[0]);
      setValue("image", base64image);
    }
  };

  return (
    <GradientLayout
      showFooter={false}
      className="p-8 gap-4"
      showNavbar={false}>
      <div className="w-full flex justify-between py-2">
        <div>
          <p className="text-lg font-semibold btn">Album - {album.name}</p>
        </div>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <div className="flex flex-col flex-grow h-fit items-center justify-between gap-4">
        <div className="gap-4 min-w-full grid grid-cols-2">
          {album.albumDetail?.map((detail) => (
            <div
              key={detail.id}
              className="bg-white rounded-lg shadow-lg flex flex-col w-full max-w-xl">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <IconImage className="size-4" /> <p className="p-2">{detail.name}</p>
                </div>
                <AlbumDetailCombobox albumDetail={detail} />
              </div>
              <img
                src={detail.imageUrl}
                className="h-32 w-full object-cover rounded-b-lg"
                alt="Uploaded"
              />
            </div>
          ))}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <FloatActionButton>+</FloatActionButton>
          </SheetTrigger>
          <SheetContent
            side={"bottom"}
            className="w-full h-3/5 overflow-y-auto flex flex-col p-8 gap-8 items-center bg-gradient-to-b from-primary-foreground to-background rounded-t-2xl">
            <SheetHeader>
              <SheetTitle>
                <p className="text-2xl font-semibold text-center">Lets add things to the album!</p>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <form
              onSubmit={handleSubmit(createAlbum)}
              className="flex flex-col w-full gap-4 flex-1">
              <Input
                {...register("name")}
                placeholder="Name"
                className="bg-white py-6"
              />
              <Input
                {...register("image")}
                type="file"
                className="hidden"
                accept="image/*"
                ref={albumImageInputRef}
                onChange={handleImageChange}
              />
              {watch().image ? (
                <img
                  onClick={() => albumImageInputRef.current?.click()}
                  src={watch().image}
                  className="h-32 w-full object-cover"
                  alt="Uploaded"
                />
              ) : (
                <Button
                  type="button"
                  onClick={() => albumImageInputRef.current?.click()}
                  className="bg-white h-32 flex flex-col">
                  <IconImageUpload className="size-6 text-gray-400" />
                  <p className="text-gray-400 text-base underline">Upload image</p>
                </Button>
              )}
              <div className="flex flex-col flex-1 justify-end">
                <Button
                  type="submit"
                  className="rounded-full p-6 font-bold">
                  Add Photo
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>
    </GradientLayout>
  );
};

export default AlbumContent;
