import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import BaseService from "./base-service";
import { CreateItineraryResponse } from "@/models/responses/itineraries/create-itineraries-response";
import { GetItinerariesResponse } from "@/models/responses/itineraries/get-itineraries-response";

export default class ItineraryService extends BaseService {
  static async createItinerary(data: CreateItineraryDTO) {
    const result = await this.post<CreateItineraryResponse>("/itineraries", data);
    return result;
  }

  static async getItineraries(tripId: number) {
    const result = await this.get<GetItinerariesResponse>(`/itineraries/trip/${tripId}`);
    return result;
  }
}
