import { CreateItineraryDTO } from "@/models/schema/itinerary/create-itinerary.dto";
import BaseService from "./base-service";
import { CreateItineraryResponse } from "@/models/responses/itineraries/create-itineraries-response";

export default class ItineraryService extends BaseService {
  static async createItinerary(data: CreateItineraryDTO) {
    const result = await this.post<CreateItineraryResponse>("/itineraries", data);
    return result;
  }
}
