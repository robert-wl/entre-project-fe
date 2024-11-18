import GradientLayout from "@/components/layouts/gradient-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const EmptyHome: FC = () => {
  return (
    <GradientLayout>
      <div className="flex flex-col flex-1 gap-8 px-8 justify-center items-center">
        <div className="flex flex-col text-center gap-2">
          <p className="font-semibold text-2xl">Let's start your</p>
          <p className="font-bold underline text-3xl text-primary">first trip</p>
        </div>
        <p className="text-center">
          Experience the easiest way to plan your itinerary and effortlessly split expenses with your travel companions - all in one place, with{" "}
          <b className="text-primary">Splan & Go!</b>
        </p>
        <Link
          className="w-full"
          href={"/create-trip"}>
          <Button className="w-full py-6 rounded-full font-semibold text-base">Get Started</Button>
        </Link>
      </div>
      <div className="flex flex-col items-center flex-1">
        <img
          src="home.png"
          alt=""
        />
        <p className="text-sm text-gray-400">© SplanNGo All rights reserved</p>
      </div>
    </GradientLayout>
  );
};

export default EmptyHome;
