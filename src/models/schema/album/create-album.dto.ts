import { z } from "zod";

export const createAlbumSchema = z.object({
  name: z.string().min(1, "Album name must be at least 1 character"),
});

export type CreateAlbumDTO = z.infer<typeof createAlbumSchema>;
