"use client";

import BillDetailForm from "@/components/bills/BillDetailForm";
import IconCancel from "@/components/icons/IconCancel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateBillDTO, createBillSchema } from "@/models/schema/bill/create-bill.dto";
import { Trip } from "@/models/trip";
import BillService from "@/services/bill-service";
import TripService from "@/services/trip-service";
import { Nullable } from "@/types/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface Props {
  params: { id: string };
}

const CreateBill: FC<Props> = ({ params: { id } }) => {
  const [trip, setTrip] = useState<Nullable<Trip>>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateBillDTO>({
    defaultValues: {
      tripId: Number.parseInt(id),
      description: "",
      billDetail: [
        {
          userId: 1,
          items: [{ itemName: "", price: 0, quantity: 0 }],
        },
      ],
    },
    resolver: zodResolver(createBillSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "billDetail",
  });

  const addBillDetail = () => {
    append({
      userId: 1,
      items: [{ itemName: "", price: 0, quantity: 0 }],
    });
  };

  const createBill = async (data: CreateBillDTO) => {
    const [result, error] = await BillService.createBill(data);
  };

  const fetchTripDetail = async () => {
    const [response, error] = await TripService.getTripWithDetails(Number.parseInt(id));

    if (error) {
      return;
    }

    setTrip(response.result);
  };

  useEffect(() => {
    fetchTripDetail();
  }, []);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <div className="w-full flex justify-between">
        <button className="text-lg font-semibold btn">Add a bill</button>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(createBill)}
        className="flex flex-col items-center gap-4">
        <Input
          {...register("description")}
          className="py-6 max-w-xl bg-white"
          placeholder="Bill name"
        />
        <p className="w-full max-w-xl">Details</p>
        {fields.map((field, index) => (
          <BillDetailForm
            key={field.id}
            index={index}
            control={control}
            tripMembers={trip?.members ?? []}
          />
        ))}
        <div className="flex items-center justify-center w-full gap-2">
          <Button
            type="button"
            className="text-2xl bg-red-500 hover:bg-red-600 rounded-full size-12"
            onClick={() => remove(fields.length - 1)}>
            ~
          </Button>
          <Button
            type="button"
            className="text-2xl rounded-full size-12"
            onClick={addBillDetail}>
            +
          </Button>
        </div>
        <Button type="submit">Add bill</Button>
      </form>
    </>
  );
};

export default CreateBill;
