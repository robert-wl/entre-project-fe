"use client";
import { FC, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FloatActionButton from "@/components/ui/float-action-button";
import { useRouter } from "next/navigation";
import { Bill } from "@/models/bill";
import BillItem from "./bill-item";
import EmptyTab from "../empty-tab";

const billFilters = ["All", "Active"];

interface IProps {
  tripId: number;
  bills: Bill[];
}

const BillTab: FC<IProps> = ({ tripId, bills }) => {
  const [selectedBillFilter, setSelectedBillFilter] = useState<string>(billFilters[0]);
  const router = useRouter();

  if (bills.length === 0) {
    return (
      <EmptyTab
        image={"/empty-bill.png"}
        tripId={tripId}
        tabName="Add Bill"
        routeName="create-bill"
      />
    );
  }

  return (
    <div className="w-full flex flex-col flex-1 p-4 gap-4">
      <Select
        value={selectedBillFilter}
        onValueChange={(value) => setSelectedBillFilter(value)}>
        <SelectTrigger className="w-32 bg-white">
          <SelectValue placeholder="Bill" />
        </SelectTrigger>
        <SelectContent className="shadow-md">
          {billFilters.map((filter) => (
            <SelectItem
              value={filter}
              key={filter}>
              {filter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {bills.map((bill) => (
        <BillItem
          key={bill.id}
          bill={bill}
        />
      ))}
      <div className="w-full flex-1">
        <FloatActionButton onClick={() => router.push(`/trip-detail/${tripId}/create-bill`)}>+</FloatActionButton>
      </div>
    </div>
  );
};

export default BillTab;
