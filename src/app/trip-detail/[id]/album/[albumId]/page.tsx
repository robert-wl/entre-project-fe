import { redirect } from "next/navigation";
import { FC } from "react";
import AlbumService from "@/services/album-service";
import AlbumContent from "@/app/trip-detail/[id]/album/[albumId]/_components/album-content";

interface IProps {
  params: { id: number; albumId: number };
}

const Page: FC<IProps> = async ({ params: { id, albumId } }) => {
  const [response, error] = await AlbumService.getAlbumWithDetails(albumId);

  if (error) {
    redirect(`trip-detail/${id}`);
  }
  return (
    <AlbumContent
      tripId={id}
      album={response.result}
    />
  );
};

export default Page;
