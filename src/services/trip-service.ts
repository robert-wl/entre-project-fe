import BaseService from "@/services/base-service";
import { CreateTripDTO } from "@/models/schema/trip/create-trip.dto";
import { CreateTripResponse } from "@/models/responses/trip/create-trip.response";

export default class TripService extends BaseService {
  public static async createTrip(dto: CreateTripDTO) {
    const { data } = await this.axios.post<CreateTripResponse>("/trips", dto);

    return data;
  }
}
