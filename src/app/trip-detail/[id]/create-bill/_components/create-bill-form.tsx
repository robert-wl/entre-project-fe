"use client";
import { FC, useMemo } from "react";
import { Trip } from "@/models/trip";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { CreateBillDTO, createBillSchema } from "@/models/schema/bill/create-bill.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import BillDetailForm from "@/app/trip-detail/[id]/create-bill/_components/bill-detail-form";
import { Input } from "@/components/ui/input";
import IconCancel from "@/components/icons/icon-cancel";
import GradientLayout from "@/components/layouts/gradient-layout";
import { Button } from "@/components/ui/button";
import IconMinus from "@/components/icons/icon-minus";
import useFormError from "@/hooks/use-form-error";
import BillService from "@/services/bill-service";
import useToast, { ToastType } from "@/hooks/use-toast";

interface IProps {
  trip: Trip;
}

const CreateBillForm: FC<IProps> = ({ trip }) => {
  const router = useRouter();
  const { onError } = useFormError();
  const { trigger } = useToast();
  const { register, handleSubmit, control, watch } = useForm<CreateBillDTO>({
    defaultValues: {
      tripId: +trip.id,
      name: "",
      billDetail: [
        {
          userId: -1,
          billItems: [{ itemName: "", price: 0, quantity: 0 }],
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
      userId: -1,
      billItems: [{ itemName: "", price: 0, quantity: 0 }],
    });
  };

  const createBill = async (data: CreateBillDTO) => {
    const [_, error] = await BillService.createBill(data);

    if (error) {
      trigger("Error when creating bill", ToastType.Error);
    }

    trigger("Bill created successfully", ToastType.Success);
    router.replace(`/trip-detail/${trip.id}`);
    router.refresh();
  };

  const values = watch();

  const totalPrice = useMemo(() => {
    return values.billDetail.reduce((total, detail) => {
      const itemsTotal = detail.billItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      return total + itemsTotal;
    }, 0);
  }, [values]);

  return (
    <GradientLayout
      className="p-8 gap-4"
      showNavbar={false}>
      <div className="w-full flex justify-between py-2">
        <button className="text-lg font-semibold btn">Add a bill</button>
        <button onClick={router.back}>
          <IconCancel className="size-full" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(createBill, onError)}
        className="flex flex-col h-full flex-grow items-center justify-between gap-4">
        <div className="flex flex-col gap-4 min-w-full items-center">
          <Input
            {...register("name")}
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
              removeField={remove}
            />
          ))}
          <div className="flex items-center justify-center w-full gap-2">
            <Button
              type="button"
              className="text-2xl bg-red-500 hover:bg-red-600 rounded-full size-12"
              onClick={() => remove(fields.length - 1)}>
              <IconMinus />
            </Button>
            <Button
              type="button"
              className="text-2xl rounded-full size-12"
              onClick={addBillDetail}>
              +
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex font-poppins font-medium justify-end w-full gap-8">
            <p>Total</p>
            <p>{totalPrice}</p>
          </div>
          <Button
            className="w-full rounded-full shadow-xl text-lg font-bold py-6"
            type="submit">
            Add bill
          </Button>
        </div>
      </form>
    </GradientLayout>
  );
};

export default CreateBillForm;
