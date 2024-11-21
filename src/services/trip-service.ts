import BaseService from "@/services/base-service";
import { CreateTripDTO } from "@/models/schema/trip/create-trip.dto";
import { CreateTripResponse } from "@/models/responses/trip/create-trip.response";
import { GetMyTripsResponse } from "@/models/responses/trip/get-my-trips.response";
import { InviteTripMembersDTO } from "@/models/schema/trip/invite-trip-member.dto";
import { GetTripWithDetailsResponse } from "@/models/responses/trip/get-trip-with-details.response";

export default class TripService extends BaseService {
  public static async createTrip(dto: CreateTripDTO) {
    return this.post<CreateTripResponse>("/trips/createTrip", dto);
  }

  public static async getMyTrips() {
    return this.get<GetMyTripsResponse>("/trips/getMyTrips");
  }

  public static async getTripWithDetails(tripId: number) {
    return this.get<GetTripWithDetailsResponse>(`/trips/getTripWithDetails/${tripId}`);
  }

  public static async inviteTripMembers(dto: InviteTripMembersDTO, tripId: number) {
    return this.post("/trips/inviteTripMembers", {
      ...dto,
      tripId,
    });
  }
}
