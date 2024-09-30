import { User } from "next-auth";

export interface Trip {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  startDate: Date;
  endDate: Date;
  owner: User;
  members: User[];
  // tripDetails: TripDetail[];
}
