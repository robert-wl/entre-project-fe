"use client";
import IconCancel from "@/components/icons/icon-cancel";
import GradientLayout from "@/components/layouts/gradient-layout";
import { FC } from "react";
import { Bill } from "@/models/bill";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BillContentDetail from "./bill-content-detail";
import { useSession } from "next-auth/react";
import BillService from "@/services/bill-service";
import useToast, { ToastType } from "@/hooks/use-toast";

interface IProps {
  bill: Bill;
}

const BillContent: FC<IProps> = ({ bill }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { trigger } = useToast();

  const totalPrice = bill.billDetails?.reduce((total, detail) => {
    const itemsTotal = detail.billItems?.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    return total + (itemsTotal ?? 0);
  }, 0);

  const userId = session?.user.id ? +session?.user.id : -1;
  const myBill = bill.billDetails?.find((billDetail) => billDetail.userId === userId);

  const confirmBill = async () => {
    if (!myBill) return;

    const [response, error] = await BillService.confirmBill(myBill.id);

    if (error) {
      console.error(error);
      trigger("Failed to confirm payment", ToastType.Error);
    }

    router.refresh();
  };

  return (
    <GradientLayout
      className="p-8 gap-4"
      showNavbar={false}>
      <div className="w-full flex justify-between py-2">
        <div>
          <p className="text-lg font-semibold btn">{bill.name}</p>
          <p className="text-xs text-gray-500">Bill Owner: {bill.billOwner.name}</p>
        </div>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <div className="flex flex-col min-h-full flex-grow h-fit items-center justify-between gap-4">
        <div className="flex flex-col gap-4 min-w-full items-center">
          <p className="w-full max-w-xl">Details</p>
          {bill.billDetails?.map((detail) => (
            <BillContentDetail
              key={detail.id}
              billDetail={detail}
            />
          ))}
          <div className="flex font-poppins font-medium justify-end w-full gap-8">
            <p>Total</p>
            <p>{totalPrice}</p>
          </div>
        </div>
        {myBill && !myBill.paid && (
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <p className="w-full max-w-xl text-gray-500 font-bold text-center">You need to pay: {myBill.totalPrice}</p>
            <Button
              onClick={confirmBill}
              className="w-full rounded-full shadow-xl text-lg font-bold py-6"
              type="submit">
              Confirm Payment
            </Button>
          </div>
        )}
      </div>
    </GradientLayout>
  );
};

export default BillContent;
