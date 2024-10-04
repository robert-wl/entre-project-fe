export interface Bill {
  id: number;
  tripId: number;
  date: string;
  name: string;
  billOwnerId: number;
  billOwner?: User;
  billDetails?: BillDetail[];
}

export interface BillDetail {
  id: number;
  billId: number;
  userId: number;
  paid: boolean;
  totalPrice: number;
  billItems?: BillItem[];
  user?: User;
}

export interface BillItem {
  id: number;
  billDetailId: number;
  itemName: string;
  price: number;
  quantity: number;
}
