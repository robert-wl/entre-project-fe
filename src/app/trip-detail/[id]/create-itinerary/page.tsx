import { FC } from "react";
import CreateItineraryForm from "./_components/create-itinerary-form";
import TripService from "@/services/trip-service";
import { redirect } from "next/navigation";

interface IProps {
  params: { id: string };
}

const CreateItinerary: FC<IProps> = async ({ params: { id } }) => {
  const [response, error] = await TripService.getTripWithDetails(Number.parseInt(id));

  if (error) {
    redirect("/home");
  }

  return <CreateItineraryForm trip={response.result} />;
};

export default CreateItinerary;
