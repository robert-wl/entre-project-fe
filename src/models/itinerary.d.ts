export interface Itinerary {
  id: number;
  tripId: number;
  startDate: string;
  endDate: string;
  itineraryDetails: ItineraryDetail[];
  itineraryOwnerId: number;
}

export interface ItineraryDetail {
  id: number;
  date: string;
  itineraryItems: ItineraryItem[];
}

export interface ItineraryItem {
  startHour: string;
  endHour: string;
  detailName: string;
}
