import { User } from "next-auth";
import { Trip } from "@/models/trip";

export interface Album {
  id: number;
  name: string;
  tripId: number;

  trip?: Trip;
  albumDetail?: AlbumDetail[];
}

export interface AlbumDetail {
  id: number;
  name: string;
  albumId: number;
  userId: number;
  image: string;

  user?: User;
  album?: Album;
}
