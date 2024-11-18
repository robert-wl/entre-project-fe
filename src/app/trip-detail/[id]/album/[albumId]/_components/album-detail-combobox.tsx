"use client";

import { FC, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import IconTrash from "@/components/icons/icon-trash";
import IconShare from "@/components/icons/icon-share";
import AlbumService from "@/services/album-service";
import { useRouter } from "next/navigation";
import { AlbumDetail } from "@/models/album";

interface IProps {
  albumDetail: AlbumDetail;
}

const AlbumDetailCombobox: FC<IProps> = ({ albumDetail }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    await AlbumService.deleteAlbumDetail(albumDetail.id);

    router.refresh();
  };

  const shareImage = async () => {
    await navigator.share({
      title: albumDetail.name,
      text: "Check out this image",
      url: albumDetail.imageUrl,
    });
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button>
          <MoreHorizontal />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[100px]">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={shareImage}>
            <IconShare />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600">
            <IconTrash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlbumDetailCombobox;
