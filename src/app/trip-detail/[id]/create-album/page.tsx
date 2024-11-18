import { FC } from "react";
import TripService from "@/services/trip-service";
import { redirect } from "next/navigation";
import CreateAlbumForm from "@/app/trip-detail/[id]/create-album/_components/create-album-form";

interface IProps {
  params: { id: string };
}

const CreateAlbum: FC<IProps> = async ({ params: { id } }) => {
  const [response, error] = await TripService.getTripWithDetails(Number.parseInt(id));

  if (error) {
    redirect("/home");
  }

  return <CreateAlbumForm trip={response.result} />;
};

export default CreateAlbum;
