import BaseService from "@/services/base-service";
import { CreateAlbumDTO } from "@/models/schema/album/create-album.dto";
import { GetAlbumsResponse } from "@/models/responses/album/get-albums.response";
import { GetAlbumDetailsResponse } from "@/models/responses/album/get-album-details.response";
import { CreateAlbumResponse } from "@/models/responses/album/create-album.response";
import { CreateAlbumDetailDTO } from "@/models/schema/album/create-album-detail.dto";
import { CreateAlbumDetailResponse } from "@/models/responses/album/create-album-detail.response";
import { DeleteAlbumResponse } from "@/models/responses/album/delete-album.response";

export default class AlbumService extends BaseService {
  public static async getAlbums(tripId: number) {
    return this.get<GetAlbumsResponse>(`/albums?tripId=${tripId}`);
  }

  public static async getAlbumWithDetails(albumId: number) {
    return this.get<GetAlbumDetailsResponse>(`/albums/${albumId}/details`);
  }

  public static async createAlbum(dto: CreateAlbumDTO, tripId: number) {
    return this.post<CreateAlbumResponse>("/albums", {
      ...dto,
      tripId,
    });
  }

  public static async createAlbumDetail(dto: CreateAlbumDetailDTO, albumId: number) {
    return this.post<CreateAlbumDetailResponse>("/albums/detail", {
      ...dto,
      albumId,
    });
  }

  public static async deleteAlbumDetail(detailId: number) {
    return this.delete<DeleteAlbumResponse>(`/albums/detail/${detailId}`);
  }
}
