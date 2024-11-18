import { redirect } from "next/navigation";
import { FC } from "react";
import EditDestinationForm from "./_components/edit-destination-form";
import DestinationService from "@/services/destination-service";

interface IProps {
  params: { id: string };
}

const EditDestination: FC<IProps> = async ({ params: { id } }) => {
  const [response, error] = await DestinationService.getDestination(Number.parseInt(id));

  if (error) {
    redirect("/home");
  }

  return <EditDestinationForm destination={response.result} />;
};

export default EditDestination;
