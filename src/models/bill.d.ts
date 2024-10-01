export interface Bill {
  id: number;
  tripId: number;
  date: string;
  description: string;
  billOwnerId: number;
  billOwner: User;
  billDetails: BillDetail[];
}

export interface BillDetail {
  id: number;
  billId: number;
  userId: number;
  price: number;
  quantity: number;
  paid: boolean;
}
