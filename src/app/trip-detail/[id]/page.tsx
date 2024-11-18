import { redirect } from "next/navigation";
import { FC } from "react";
import { cn } from "@/lib/utils";
import TripService from "@/services/trip-service";
import GradientLayout from "@/components/layouts/gradient-layout";
import TripDetailHeader from "@/app/trip-detail/[id]/_components/trip-detail-header";
import Link from "next/link";
import TabComponent from "./_components/tab-component";

interface IProps {
  params: { id: number };
  searchParams: { tab: string };
}

const pageTabs = ["destination", "itinerary", "bills", "albums"];

const TripDetail: FC<IProps> = async ({ params: { id }, searchParams: { tab } }) => {
  const currentTab = tab || pageTabs[0];
  const [response, error] = await TripService.getTripWithDetails(id);

  if (error) {
    redirect("/home");
  }

  return (
    <GradientLayout showFooter={false}>
      <TripDetailHeader trip={response.result} />
      <div className="w-full flex-col flex-1 whitespace-nowrap rounded-md border">
        <div className="flex w-screen overflow-x-scroll flex-1 space-x-4 px-4">
          {pageTabs.map((tab) => {
            return (
              <Link
                href={`/trip-detail/${id}?tab=${tab}`}
                className={cn(currentTab === tab ? "border-black border-b" : "", `p-2 text-center capitalize w-2/5 flex-shrink-0`)}
                key={tab}>
                {tab}
              </Link>
            );
          })}
        </div>
        <TabComponent
          currentTab={currentTab}
          response={response}
        />
      </div>
    </GradientLayout>
  );
};

export default TripDetail;
