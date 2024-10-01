import { User } from "next-auth";

interface Trip {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  members: User[];
  owner?: User;
}
