import TripService from "@/services/trip-service";
import { redirect } from "next/navigation";
import { FC } from "react";
import CreateDestinationForm from "./_components/create-destination-form";

interface IProps {
  params: { id: string };
}

const CreateDestination: FC<IProps> = async ({ params: { id } }) => {
  const [response, error] = await TripService.getTripWithDetails(Number.parseInt(id));

  if (error) {
    console.log(error);
    redirect("/home");
  }

  return <CreateDestinationForm trip={response.result} />;
};

export default CreateDestination;
