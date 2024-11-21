import { z } from "zod";

export const inviteTripMembersSchema = z.object({
  emails: z.string().min(1, "Emails must be at least 1 character"),
});

export type InviteTripMembersDTO = z.infer<typeof inviteTripMembersSchema>;
