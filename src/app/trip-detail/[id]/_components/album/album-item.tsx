"use client";
import { FC } from "react";
import { Album } from "@/models/album";
import Link from "next/link";

interface IProps {
  album: Album;
}

const AlbumItem: FC<IProps> = ({ album }) => {
  return (
    <Link
      href={`/trip-detail/${album.tripId}/album/${album.id}`}
      className="bg-white h-fit rounded-lg shadow-lg">
      <div className="w-full h-fit flex flex-col justify-between gap-2">
        <img
          src={album.albumDetail![0]?.image}
          className="aspect-square"
        />
        <p className="font-semibold px-3 py-1">{album.name}</p>
      </div>
    </Link>
  );
};

export default AlbumItem;
