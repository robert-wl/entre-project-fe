"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import IconMenu from "@/components/icons/icon-menu";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import IconInstagram from "./icons/icon-instagram";
import IconFacebook from "./icons/icon-facebook";
import IconTiktok from "./icons/icon-tiktok";

const Navbar: React.FC = () => {
  const router = useRouter();
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
          <div className="flex flex-col justify-center h-5/6 gap-12">
            <div>
              <p className="text-center">Welcome to SplanNGo! Navigate through the options to explore.</p>
              <img src="/navbar-content.png" alt="Navigation options" />
              <p className="text-center">Need help? Visit our support page or contact us for assistance.</p>
            </div>
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-center font-bold">Contact Us:</p>
              <div className="flex gap-4 justify-evenly">
                <a href="https://www.instagram.com/splanngo/">
                  <IconInstagram className="size-6" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61566916730658">
                  <IconFacebook href="" className="size-6" />
                </a>
                <a href="https://www.tiktok.com/@splanngo">
                  <IconTiktok href="" className="size-6" />
                </a>
              </div>
            </div>
          </div>
          <Button
            onClick={() => router.push("/logout")}
            className="absolute w-3/4 bottom-8 left-0 right-0 m-auto py-6 rounded-full text-lg">
            Logout
          </Button>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
