import { Input } from "@/components/ui/input";
import { FC } from "react";
import { User } from "next-auth";
import { Control, useFieldArray } from "react-hook-form";

interface IProps {
  control: Control<any>;
  index: number;
  tripMembers: User[];
}

const BillDetailForm: FC<IProps> = ({ control, index, tripMembers = [] }) => {
  const { fields, append } = useFieldArray({
    control,
    name: `billDetail[${index}].items`, // Ensure proper naming
  });

  const addBillItem = () => {
    append({ itemName: "", price: 0, quantity: 0 }); // Ensure items are appended correctly
  };

  return (
    <div className="flex flex-col w-full p-2 gap-2 items-center bg-white rounded-lg shadow-lg">
      <div className="flex items-start justify-start w-full">
        <select
          {...control.register(`billDetail[${index}].userId`, {
            valueAsNumber: true,
          })}
          className="w-32 bg-white border border-gray-300 text-sm !p-1 rounded-lg
          ">
          <option value="">Select User</option>
          {tripMembers.map((member) => (
            <option
              value={member.id}
              key={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </div>
      {fields.map((field, itemIndex) => (
        <div
          key={field.id}
          className="flex gap-2">
          <Input
            className="flex-1 text-sm !p-1"
            placeholder="Item name"
            {...control.register(`billDetail[${index}].items[${itemIndex}].itemName`)}
          />
          <Input
            className="w-20 text-sm !p-1"
            type="number"
            placeholder="Price"
            {...control.register(`billDetail[${index}].items[${itemIndex}].price`, {
              valueAsNumber: true,
            })}
          />
          <p className="flex items-center justify-center text-base">×</p>
          <Input
            className="flex-1 text-sm !p-1"
            type="number"
            placeholder="Quantity"
            {...control.register(`billDetail[${index}].items[${itemIndex}].quantity`, {
              valueAsNumber: true,
            })}
          />
        </div>
      ))}
      <div className="flex items-center justify-center bg-gray-200 w-full rounded-lg">
        <button
          type="button"
          onClick={addBillItem}
          className="flex items-center justify-center text-white bg-gray-500 w-5 h-5 pt-[0.175rem] my-1 rounded-full">
          +
        </button>
      </div>
    </div>
  );
};

export default BillDetailForm;
