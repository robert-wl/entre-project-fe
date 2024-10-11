import BillService from "@/services/bill-service";
import { redirect } from "next/navigation";
import { FC } from "react";
import BillContent from "./_components/bill-content";

interface IProps {
  params: { id: number; billId: number };
}

const Page: FC<IProps> = async ({ params: { id, billId } }) => {
  const [response, error] = await BillService.getBill(billId);

  if (error) {
    redirect(`trip-detail/${id}`);
  }
  return <BillContent bill={response.result} />;
};

export default Page;
