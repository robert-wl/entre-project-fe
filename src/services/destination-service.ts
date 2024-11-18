import { CreateDestinationDTO } from "@/models/schema/destination/create-destination.dto";
import BaseService from "./base-service";
import { CreateDestinationResponse } from "@/models/responses/destinations/create-destinations-response";
import { DeleteDestinationResponse } from "@/models/responses/destinations/delete-destination-response";
import { EditDestinationDTO } from "@/models/schema/destination/edit-destination.dto";
import { EditDestinationResponse } from "@/models/responses/destinations/edit-destination-response";
import { GetDestinationsFromTripResponse } from "@/models/responses/destinations/get-destinations-from-trip-response";
import { GetDestinationResponse } from "@/models/responses/destinations/get-destination-response";

export default class DestinationService extends BaseService {
  public static async createDestination(dto: CreateDestinationDTO) {
    return this.post<CreateDestinationResponse>("/destinations", dto);
  }

  public static async deleteDestination(destinationId: number) {
    return this.post<DeleteDestinationResponse>("/destinations/delete", { destinationId });
  }

  public static async editDestination(dto: EditDestinationDTO) {
    return this.post<EditDestinationResponse>("/destinations/edit", dto);
  }

  public static async getDestinationsFromTrip(tripId: number) {
    return this.get<GetDestinationsFromTripResponse>(`/destinations/trip/${tripId}`);
  }

  public static async getDestination(destinationId: number) {
    return this.get<GetDestinationResponse>(`/destinations/${destinationId}`);
  }

}
