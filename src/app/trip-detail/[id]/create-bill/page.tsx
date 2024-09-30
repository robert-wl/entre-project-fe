"use client";

import IconCancel from "@/components/icons/IconCancel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateBillDTO, createBillSchema } from "@/models/schema/bill/create-bill.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface Props {
    params: { id: string };
}

const CreateBill: FC<Props> = ({ params: { id } }) => {
    const router = useRouter();

    const { register, handleSubmit, watch, setValue } = useForm<CreateBillDTO>({
        values: {
            tripId: Number.parseInt(id),
            description: "",
            billDetail: [{
                userId: 1,
                items: [{
                    itemName: "",
                    price: 0,
                    quantity: 0,
                }]
            }],
        },
        resolver: zodResolver(createBillSchema),
    });

    const addBillDetail = () => {
        setValue("billDetail", [
            ...watch().billDetail,
            {
                userId: 1,
                items: [{
                    itemName: "",
                    price: 0,
                    quantity: 0,
                }],
            },
        ]);
    }

    const addBillDetailItem = (index: number) => {
        setValue(`billDetail.${index}.items`, [
            ...watch().billDetail[index].items,
            {
                itemName: "",
                price: 0,
                quantity: 0,
            },
        ]);
    }

    const createBill = async (data: CreateBillDTO) => {
        console.log(data);
    };

    return (
        <>
            <div className="w-full flex justify-between">
                <p className="text-lg font-semibold">Add a bill</p>
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
                {watch().billDetail.map((_, index) => (
                    <div key={index}>
                        {/* <Input
                            {...register("billDetail.${index}.userId")}
                            className="flex-[4]"
                            placeholder="Item name"
                        /> */}
                        {watch().billDetail[index].items.map((_, itemIndex) => (
                            <div className="flex flex-col p-2 gap-2 items-center bg-white" key={itemIndex}>
                                <div
                                    key={itemIndex}
                                    className="flex gap-2">
                                    <Input
                                        {...register(`billDetail.${index}.items.${itemIndex}.itemName`)}
                                        className="flex-[4]"
                                        placeholder="Item name"
                                    />
                                    <Input
                                        {...register(`billDetail.${index}.items.${itemIndex}.price`)}
                                        className="flex-[2]"
                                        placeholder="Description"
                                    />
                                    <p className="flex items-center justify-center">X</p>
                                    <Input
                                        {...register(`billDetail.${index}.items.${itemIndex}.quantity`)}
                                        className="flex-1"
                                        placeholder="Amount"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    className="text-sm rounded-full size-2 p-2 bg-gray-400"
                                    onClick={() => addBillDetailItem(index)}>
                                    +
                                </Button>
                            </div>
                        ))}
                    </div>
                ))}
                <Button
                    type="button"
                    className="text-2xl rounded-full size-12"
                    onClick={addBillDetail}>
                    +
                </Button>
                <Button type="submit">Add bill</Button>
            </form>
        </>
    );
};

export default CreateBill;
