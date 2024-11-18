import { FC } from "react";
import BillTab from "./bill/bill-tab";
import BillService from "@/services/bill-service";
import DestinationTab from "./destination/destination-tab";
import DestinationService from "@/services/destination-service";
import ItineraryTab from "./itinerary/itinerary-tab";
import ItineraryService from "@/services/itinerary-service";
import AlbumTab from "./album/album-tab";
import AlbumService from "@/services/album-service";
import { GetTripWithDetailsResponse } from "@/models/responses/trip/get-trip-with-details.response";
import { redirect } from "next/navigation";

interface IProps {
  response: GetTripWithDetailsResponse;
  currentTab: string;
}

const TabComponent: FC<IProps> = async ({ response, currentTab }) => {
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

export default TabComponent;
