interface Trip {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  members: number[];
  owner: {
    id ?: number;
  }
}
