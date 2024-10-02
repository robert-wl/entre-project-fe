import { CreateBillDTO } from "@/models/schema/bill/create-bill.dto";
import BaseService from "./base-service";
import { CreateBillResponse } from "@/models/responses/bills/create-bills.response";

export default class BillService extends BaseService {
  public static async createBill(dto: CreateBillDTO) {
    const payload = {
      tripId: dto.tripId,
      description: dto.description,
      billDetail: dto.billDetail
        .map((billDetail) => {
          return billDetail.items
            .map((item) => {
              return {
                userId: billDetail.userId,
                itemName: item.itemName,
                price: item.price,
                quantity: item.quantity,
              };
            })
            .flat();
        })
        .flat(),
    };

    console.log("PAYLOAD", payload);

    return this.post<CreateBillResponse>("/bills/createBill", payload);
  }
}
