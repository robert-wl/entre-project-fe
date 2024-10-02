import { z } from "zod";

export const createBillSchema = z.object({
  description: z.string().min(1),
  tripId: z.number(),
  billDetail: z.array(
    z.object({
      userId: z.number(),
      items: z.array(
        z.object({
          itemName: z.string().min(1),
          price: z.number().min(0),
          quantity: z.number().min(0),
        }),
      ),
    }),
  ),
});

export type CreateBillDTO = z.infer<typeof createBillSchema>;
