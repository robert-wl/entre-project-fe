import { z } from "zod";

export const createAlbumSchema = z.object({
  name: z.string().min(1),
});

export type CreateAlbumDTO = z.infer<typeof createAlbumSchema>;
