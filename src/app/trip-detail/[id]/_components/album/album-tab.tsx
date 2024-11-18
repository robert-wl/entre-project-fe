"use client";

import { FC } from "react";
import EmptyTab from "../empty-tab";
import { Album } from "@/models/album";
import FloatActionButton from "@/components/ui/float-action-button";
import AlbumItem from "@/app/trip-detail/[id]/_components/album/album-item";
import { useRouter } from "next/navigation";

interface IProps {
  tripId: number;
  albums: Album[];
}

const AlbumTab: FC<IProps> = ({ albums, tripId }) => {
  const router = useRouter();

  if (albums.length === 0) {
    return (
      <EmptyTab
        routeName="/create-album"
        tabName="Add Album"
        tripId={tripId}
      />
    );
  }

  return (
    <div
      className="w-full h-full grid grid-cols-2
    p-4 gap-4">
      {albums.map((album) => (
        <AlbumItem
          album={album}
          key={album.id}
        />
      ))}
      <div className="w-full flex-1">
        <FloatActionButton onClick={() => router.push(`/trip-detail/${tripId}/create-destination`)}>+</FloatActionButton>
      </div>
    </div>
  );
};

export default AlbumTab;
