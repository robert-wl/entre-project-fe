"use client";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { User } from "next-auth";
import { Control, Controller, useFieldArray } from "react-hook-form";
import IconAddOutline from "@/components/icons/icon-add-outline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IconMinus from "@/components/icons/icon-minus";

interface IProps {
  control: Control<any>;
  index: number;
  tripMembers: User[];
  removeField: (index: number) => void;
}

const BillDetailForm: FC<IProps> = ({ control, index, tripMembers = [], removeField }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `billDetail[${index}].billItems`,
  });

  const addBillItem = () => {
    append({ itemName: "", price: 0, quantity: 0 });
  };

  const removeBillItem = (index: number) => {
    remove(index);
    if (fields.length === 1) {
      removeField(index);
    }
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2 items-center bg-white rounded-lg shadow-lg">
      <div className="flex items-start justify-start w-full">
        <Controller
          name={`billDetail[${index}].userId`}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(+value)}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Name..." />
              </SelectTrigger>
              <SelectContent ref={field.ref}>
                {tripMembers.map((member) => (
                  <SelectItem
                    value={member.id}
                    key={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      {fields.map((field, itemIndex) => (
        <div
          key={field.id}
          className="flex gap-2 justify-center items-center">
          <Input
            className="flex-1 text-xs !py-0.5 !px-1"
            placeholder="Item name"
            {...control.register(`billDetail[${index}].billItems[${itemIndex}].itemName`)}
          />
          <Input
            className="w-8 text-xs !py-0.5 !px-1"
            type="number"
            {...control.register(`billDetail[${index}].billItems[${itemIndex}].price`, {
              valueAsNumber: true,
            })}
          />
          <p className="flex items-center justify-center text-base">×</p>
          <Input
            className="flex-1 text-xs !py-0.5 !px-1"
            type="number"
            {...control.register(`billDetail[${index}].billItems[${itemIndex}].quantity`, {
              valueAsNumber: true,
            })}
          />
          <button
            onClick={() => removeBillItem(itemIndex)}
            className="flex items-center justify-center text-base bg-red-500 hover:bg-red-600 text-white shadow-md rounded-full size-6">
            <IconMinus />
          </button>
        </div>
      ))}
      <div
        onClick={addBillItem}
        className="flex items-center justify-center bg-gray-200 w-full rounded-lg">
        <button
          type="button"
          className="flex items-center justify-center text-white bg-gray-500 w-5 h-5 my-1 rounded-full">
          <IconAddOutline />
        </button>
      </div>
    </div>
  );
};

export default BillDetailForm;
