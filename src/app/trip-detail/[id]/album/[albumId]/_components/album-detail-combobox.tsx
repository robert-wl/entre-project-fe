"use client";

import { FC, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import IconTrash from "@/components/icons/icon-trash";
import IconShare from "@/components/icons/icon-share";
import AlbumService from "@/services/album-service";
import { useRouter } from "next/navigation";
import { AlbumDetail } from "@/models/album";
import useToast, { ToastType } from "@/hooks/use-toast";

interface IProps {
  albumDetail: AlbumDetail;
}

const AlbumDetailCombobox: FC<IProps> = ({ albumDetail }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { trigger } = useToast();

  const handleDelete = async () => {
    await AlbumService.deleteAlbumDetail(albumDetail.id);

    trigger("Album deleted successfully", ToastType.Success);
    router.refresh();
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: albumDetail.name,
          text: "Check out this image",
          url: albumDetail.imageUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        const shareText = `Check out this image: ${albumDetail.imageUrl}`;
        await navigator.clipboard.writeText(shareText);
        trigger("Link copied to clipboard!", ToastType.Success);
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        trigger("Failed to copy link. Please try again.", ToastType.Error);
      }
    }
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
