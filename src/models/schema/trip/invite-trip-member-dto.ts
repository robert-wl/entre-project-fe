import { z } from "zod";

export const inviteTripMembersSchema = z.object({
  emails: z.string().min(1),
});

export type InviteTripMembersDTO = z.infer<typeof inviteTripMembersSchema>;
