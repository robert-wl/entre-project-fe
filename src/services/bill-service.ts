import { CreateBillDTO } from "@/models/schema/bill/create-bill.dto";
import BaseService from "./base-service";
import { CreateBillResponse } from "@/models/responses/bills/create-bills.response";
import { GetBillsResponse } from "@/models/responses/bills/get-bills.response";
import { GetBillResponse } from "@/models/responses/bills/get-bill.response";
import { ConfirmBillResponse } from "@/models/responses/bills/confirm-bill.response";

export default class BillService extends BaseService {
  public static async createBill(dto: CreateBillDTO) {
    return this.post<CreateBillResponse>("/bills", dto);
  }

  public static async getBills(tripId: number) {
    return this.get<GetBillsResponse>(`/bills/trip/${tripId}`);
  }

  public static async getBill(billId: number) {
    return this.get<GetBillResponse>(`/bills/${billId}`);
  }

  public static async confirmBill(billDetailId: number) {
    return this.put<ConfirmBillResponse>(`/bills/confirm/${billDetailId}`);
  }
}
