"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import IconMenu from "@/components/icons/IconMenu";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="flex h-fit p-8 w-full items-center justify-between">
      <Link href={'/home'}>
        <img
          className="w-5/12 min-w-36 max-w-40 h-auto"
          src={"logo-cropped.png"}
          alt=""
        />
      </Link>
      <Sheet>
        <SheetTrigger
          className="size-8 flex justify-center items-center"
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
