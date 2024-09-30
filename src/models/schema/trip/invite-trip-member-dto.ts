import { z } from "zod";

export const inviteTripMembersSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type InviteTripMembersDTO = z.infer<typeof inviteTripMembersSchema>;
