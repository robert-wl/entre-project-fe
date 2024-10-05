import { FC } from "react";
import TripService from "@/services/trip-service";
import { redirect } from "next/navigation";
import GradientLayout from "@/components/layouts/gradient-layout";
import TripDetailHeader from "@/app/trip-detail/[id]/_components/trip-detail-header";
import Link from "next/link";
import BillTab from "@/app/trip-detail/[id]/_components/bill-tab";
import BillService from "@/services/bill-service";
import { cn } from "@/lib/utils";

interface Props {
  params: { id: number };
  searchParams: { tab: string };
}

const pageTabs = ["destination", "itinerary", "bills"];

const TripDetail: FC<Props> = async ({ params: { id }, searchParams: { tab } }) => {
  const currentTab = tab || pageTabs[0];
  const [response, error] = await TripService.getTripWithDetails(id);

  if (error) {
    redirect("/home");
  }

  const TabComponent = async () => {
    const trip = response.result;

    if (currentTab === "bills") {
      const [response, error] = await BillService.getBills(trip.id);

      if (error) {
        redirect("/home");
      }

      return (
        <BillTab
          tripId={trip.id}
          bills={response.result}
        />
      );
    }
  };

  return (
    <GradientLayout>
      <TripDetailHeader trip={response.result} />

      <div className="w-full h-full flex flex-col flex-1">
        <div className="w-full flex justify-evenly">
          {pageTabs.map((tab) => {
            console.log(tab, currentTab);
            return (
              <Link
                href={`/trip-detail/${id}?tab=${tab}`}
                className={cn(currentTab === tab ? "border-black border-b" : "", `flex-1 p-2 text-center capitalize`)}
                key={tab}>
                {tab}
              </Link>
            );
          })}
        </div>
        <TabComponent />
      </div>
    </GradientLayout>
  );
};

export default TripDetail;
