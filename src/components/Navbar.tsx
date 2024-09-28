"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import IconMenu from "@/components/icons/IconMenu";

const Navbar: React.FC = () => {
  return (
    <nav className="flex h-fit px-2 py-8 w-full items-center justify-between">
      <img
        className="w-5/12 h-auto"
        src={"logo-cropped.png"}
        alt=""
      />
      <Sheet>
        <SheetTrigger
          className="w-1/12 h-auto flex justify-center items-center"
          asChild>
          <IconMenu className="size-full" />
        </SheetTrigger>
        <SheetContent
          side={"right"}
          title="Test">
          <SheetHeader>
            <SheetTitle>SplanNGo</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div></div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
