import { CreateDestinationDTO } from "@/models/schema/destination/create-destination.dto";
import BaseService from "./base-service";
import { Destination } from "@/models/destination";
import { GetDestinationsResponse } from "@/models/responses/destination/get-destinations-response";

export default class DestinationService extends BaseService {
  public static async createDestination(dto: CreateDestinationDTO) {
    return this.post("/destinations", dto);
  }

  public static async getDestinations(tripId: number) {
    return this.get<GetDestinationsResponse>(`destinations/trip/${tripId}`);
  }
}
