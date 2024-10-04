"use client";
import IconDotsVertical from "@/components/icons/icon-dots-vertical";
import { cn } from "@/lib/utils";
import { Bill } from "@/models/bill";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

interface IProps {
  bill: Bill;
}

const BillItem: FC<IProps> = ({ bill }) => {
  const { data: session } = useSession();
  const userId = session?.user.id ? +session?.user.id : -1;
  const myBill = bill.billDetails?.find((billDetail) => billDetail.userId === userId);

  const getBillColor = () => {
    if (!myBill || bill.billOwnerId === userId) {
      return "bg-white";
    }
    if (myBill?.paid) {
      return "bg-green-200";
    }
    return "bg-red-200";
  };

  return (
    <Link
      href={`/trip-detail/${bill.tripId}/bill/${bill.id}`}
      className={cn(getBillColor(), "flex flex-col w-full p-2 gap-8 rounded-lg shadow-lg")}>
      <div className="flex justify-between">
        <p className="font-semibold text-base">{bill.name}</p>
        <IconDotsVertical />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-500">Bill Owner: {bill.billOwner.name}</p>
        <p>IDR {myBill?.totalPrice}</p>
      </div>
    </Link>
  );
};

export default BillItem;
