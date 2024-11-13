"use client";

import { FC } from "react";
import EmptyTab from "../empty-tab";

interface IProps {
  tripId: number;
  albums: [];
}

const AlbumTab: FC<IProps> = ({ albums, tripId }) => {
  if (albums.length === 0) {
    return (
      <EmptyTab
        routeName="/create-album"
        tabName="Add Album"
        tripId={tripId}
      />
    );
  }

  return <div></div>;
};

export default AlbumTab;
