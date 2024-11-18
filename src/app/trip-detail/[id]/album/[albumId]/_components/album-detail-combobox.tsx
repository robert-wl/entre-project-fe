"use client";

import { FC, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import IconTrash from "@/components/icons/icon-trash";
import IconShare from "@/components/icons/icon-share";
import AlbumService from "@/services/album-service";
import { useRouter } from "next/navigation";

interface IProps {
  id: number;
}

const AlbumDetailCombobox: FC<IProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    await AlbumService.deleteAlbumDetail(id);

    router.refresh();
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
          <DropdownMenuItem>
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
