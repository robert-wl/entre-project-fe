import { z } from "zod";

export const createAlbumDetailSchema = z.object({
  name: z.string().min(1, "Album name must be at least 1 character"),
  image: z.string().min(1, "Image must be at least 1 character"),
});

export type CreateAlbumDetailDTO = z.infer<typeof createAlbumDetailSchema>;
