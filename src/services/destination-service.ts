import { CreateDestinationDTO } from "@/models/schema/destination/create-destination.dto";
import BaseService from "./base-service";
import { GetDestinationsResponse } from "@/models/responses/destinations/get-destinations-response";
import { CreateDestinationResponse } from "@/models/responses/destinations/create-destinations-response";

export default class DestinationService extends BaseService {
  public static async createDestination(dto: CreateDestinationDTO) {
    return this.post<CreateDestinationResponse>("/destinations", dto);
  }

  public static async getDestinations(tripId: number) {
    return this.get<GetDestinationsResponse>(`destinations/trip/${tripId}`);
  }
}
