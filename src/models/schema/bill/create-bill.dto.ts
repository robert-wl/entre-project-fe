import { z } from "zod";

export const createBillSchema = z.object({
  description: z.string().min(1, "Description is required"),
  tripId: z.number(),
  billDetail: z
    .array(
      z.object({
        userId: z.string().min(1, "You must choose a user"),
        items: z
          .array(
            z.object({
              itemName: z.string().min(1, "Item name is required"),
              price: z.number().min(1, "Price must be at least 1"),
              quantity: z.number().min(1, "Quantity must be at least 1"),
            }),
          )
          .nonempty("At least one item is required"),
      }),
    )
    .nonempty("At least one bill detail is required"),
});

export type CreateBillDTO = z.infer<typeof createBillSchema>;
