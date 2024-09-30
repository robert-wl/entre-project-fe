import BaseService from "@/services/base-service";
import { CreateTripDTO } from "@/models/schema/trip/create-trip.dto";
import { CreateTripResponse } from "@/models/responses/trip/create-trip.response";
import { GetMyTripsResponse } from "@/models/responses/trip/get-my-trips.response";

export default class TripService extends BaseService {
  public static async createTrip(dto: CreateTripDTO) {
    const { data } = await this.axios.post<CreateTripResponse>("/trips/createTrip", dto);

    return data;
  }

  public static async getMyTrips() {
    const { data } = await this.axios.get<GetMyTripsResponse>("/trips/getMyTrips");

    return data.result;
  }
}
