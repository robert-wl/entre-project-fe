import { CreateBillDTO } from "@/models/schema/bill/create-bill.dto";
import BaseService from "./base-service";
import { CreateBillResponse } from "@/models/responses/bills/create-bills.response";
import { GetBillsResponse } from "@/models/responses/bills/get-bills.response";

export default class BillService extends BaseService {
  public static async createBill(dto: CreateBillDTO) {
    return this.post<CreateBillResponse>("/bills/createBill", dto);
  }

  public static async getBills(tripId: number) {
    return this.get<GetBillsResponse>(`/bills/getBills/${tripId}`);
  }
}
