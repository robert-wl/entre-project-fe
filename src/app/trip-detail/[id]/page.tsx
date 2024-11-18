import { redirect } from "next/navigation";
import { FC } from "react";
import { cn } from "@/lib/utils";
import TripService from "@/services/trip-service";
import GradientLayout from "@/components/layouts/gradient-layout";
import TripDetailHeader from "@/app/trip-detail/[id]/_components/trip-detail-header";
import Link from "next/link";
import BillTab from "./_components/bill/bill-tab";
import BillService from "@/services/bill-service";
import DestinationTab from "./_components/destination/destination-tab";
import DestinationService from "@/services/destination-service";
import ItineraryTab from "./_components/itinerary/itinerary-tab";
import ItineraryService from "@/services/itinerary-service";
import AlbumTab from "./_components/album/album-tab";
import AlbumService from "@/services/album-service";

interface Props {
  params: { id: number };
  searchParams: { tab: string };
}

const pageTabs = ["destination", "itinerary", "bills", "albums"];

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
    } else if (currentTab === "itinerary") {
      const [response, error] = await ItineraryService.getItinerary(trip.id);

      if (error) {
        redirect("/home");
      }

      return (
        <ItineraryTab
          tripId={trip.id}
          itinerary={response.result}
        />
      );
    } else if (currentTab === "destination") {
      const [response, error] = await DestinationService.getDestinationsFromTrip(trip.id);

      if (error) {
        redirect("/home");
      }

      return (
        <DestinationTab
          tripId={trip.id}
          destinations={response.result}
        />
      );
    } else if (currentTab === "albums") {
      const [response, error] = await AlbumService.getAlbums(trip.id);

      if (error) {
        redirect("/home");
      }

      return (
        <AlbumTab
          albums={response.result}
          tripId={trip.id}
        />
      );
    }
  };

  return (
    <GradientLayout showFooter={false}>
      <TripDetailHeader trip={response.result} />
      <div className="w-full flex-col flex-1 whitespace-nowrap rounded-md border">
        <div className="flex w-screen overflow-x-scroll flex-1 space-x-4 p-4">
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
        <TabComponent />
      </div>
    </GradientLayout>
  );
};

export default TripDetail;
