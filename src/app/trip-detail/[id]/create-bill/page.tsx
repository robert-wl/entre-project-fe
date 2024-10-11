import { FC } from "react";
import CreateBillForm from "./_components/create-bill-form";
import TripService from "@/services/trip-service";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const CreateBill: FC<Props> = async ({ params: { id } }) => {
  const [response, error] = await TripService.getTripWithDetails(Number.parseInt(id));

  if (error) {
    console.log(error);
    return redirect("/home");
  }

  return <CreateBillForm trip={response.result} />;
};

export default CreateBill;
