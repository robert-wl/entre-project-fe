"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import IconMenu from "@/components/icons/icon-menu";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex sticky top-0 h-fit z-[10] px-8 py-4 w-full bg-white items-center justify-between shadow-md">
      <Link href={"/home"}>
        <img
          className="w-1/4 min-w-28 max-w-40 h-auto"
          src={"/logo-cropped.png"}
          alt=""
        />
      </Link>
      <Sheet>
        <SheetTrigger
          className="size-6 flex justify-center items-center"
          asChild>
          <IconMenu className="text-primary" />
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
