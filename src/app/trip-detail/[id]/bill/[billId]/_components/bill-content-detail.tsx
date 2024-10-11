import { Input } from "@/components/ui/input";
import { BillDetail } from "@/models/bill";
import { FC } from "react";

interface IProps {
  billDetail: BillDetail;
}

const BillContentDetail: FC<IProps> = ({ billDetail }) => {
  return (
    <div className="flex flex-col w-full p-2 gap-2 items-center bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between w-full">
        <Input
          disabled
          className="text-xs !py-0.5 !w-32 !px-1"
          value={billDetail.user?.name}
        />
        {billDetail.paid ? (
          <p className="text-sm font-bold italic pe-2 text-green-500">Paid</p>
        ) : (
          <p className="text-sm font-bold italic pe-2 text-red-500">Not Paid</p>
        )}
      </div>
      {billDetail.billItems?.map((item, index) => (
        <div
          key={item.id}
          className="flex gap-2 justify-center items-center">
          <Input
            disabled
            className="flex-1 text-xs !py-0.5 !px-1"
            placeholder="Item name"
            value={item.itemName}
          />
          <Input
            disabled
            className="w-8 text-xs !py-0.5 !px-1"
            type="number"
            value={item.price}
          />
          <p className="flex items-center justify-center text-base">×</p>
          <Input
            disabled
            className="flex-1 text-xs !py-0.5 !px-1"
            type="number"
            value={item.quantity}
          />
        </div>
      ))}
      <div className="flex w-full justify-end">
        <p className="text-sm font-bold pe-2">Total: {billDetail.totalPrice}</p>
      </div>
    </div>
  );
};

export default BillContentDetail;
