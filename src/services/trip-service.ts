import BaseService from "@/services/base-service";
import { CreateTripDTO } from "@/models/schema/trip/create-trip.dto";
import { CreateTripResponse } from "@/models/responses/trip/create-trip.response";
import { GetMyTripsResponse } from "@/models/responses/trip/get-my-trips.response";
import { InviteTripMembersDTO } from "@/models/schema/trip/invite-trip-member-dto";
import { GetTripWithDetailsResponse } from "@/models/responses/trip/get-trip-with-details.response";

export default class TripService extends BaseService {
  public static async createTrip(dto: CreateTripDTO) {
    const { data } = await this.axios.post<CreateTripResponse>("/trips/createTrip", dto);

    return data;
  }

  public static async getMyTrips() {
    const { data } = await this.axios.get<GetMyTripsResponse>("/trips/getMyTrips");

    return data.result;
  }

  public static async getTripWithDetails(tripId: number) {
    const { data } = await this.axios.get<GetTripWithDetailsResponse>(`/trips/getTripWithDetails/${tripId}`);
    console.log(data);

    return data.result;
  }

  public static async inviteTripMembers(dto: InviteTripMembersDTO, tripId: number) {
    const { data } = await this.axios.post("/trips/inviteTripMembers", {
      ...dto,
      tripId,
    });

    return data;
  }
}
