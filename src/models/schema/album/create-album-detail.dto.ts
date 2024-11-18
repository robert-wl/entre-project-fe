import { z } from "zod";

export const createAlbumDetailSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
});

export type CreateAlbumDetailDTO = z.infer<typeof createAlbumDetailSchema>;
