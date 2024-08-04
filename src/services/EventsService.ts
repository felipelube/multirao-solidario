import { ApiService } from "./ApiService";
import qs from "qs";

export enum EventStatus {
  Organizing = "ORGANIZING",
  Confirmed = "CONFIRMED",
  Done = "DONE",
  Canceled = "CANCELED",
  Postponed = "POSTPONED",
}

type Organizer = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
};

export type Event = {
  id: number;
  organizer: Organizer;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  distance: number | null;
  minVolunteers: number;
  maxVolunteers: number;
  currentVolunteers: number;
  status: EventStatus;
  date: string;
};

type EventFilters = Partial<
  Pick<Event, "status"> & {
    organizerId: number;
    dateFrom: string;
    dateTo: string;
    radius: number;
    latitude: number;
    longitude: number;
  }
>;

export class EventService extends ApiService {
  static PATH = "/event";
  static PATH_FOR_ID = "/event/:id";

  static async getPublicEvents(filters?: EventFilters): Promise<Event[]> {
    const queryString = qs.stringify(filters);

    return ApiService.get(`${EventService.PATH}?${queryString}`, {
      headers: { Authorization: undefined! },
    });
  }

  static async getEvents(filters?: EventFilters): Promise<Event[]> {
    const queryString = qs.stringify(filters);

    return ApiService.get(`${EventService.PATH}?${queryString}`);
  }

  static async getEvent(eventId: number): Promise<Event[]> {
    return ApiService.get(
      EventService.PATH_FOR_ID.replace(":id", eventId.toString())
    );
  }

  static async createEvent(event: Omit<Event, "id">): Promise<void> {
    return ApiService.post(EventService.PATH, event);
  }

  static async updateEvent(
    eventId: string,
    event: Omit<Event, "id">
  ): Promise<void> {
    return ApiService.put(
      EventService.PATH_FOR_ID.replace(":id", eventId),
      event
    );
  }

  static async deleteEvent(eventId: number): Promise<string> {
    return ApiService.delete(
      EventService.PATH_FOR_ID.replace(":id", eventId.toString())
    );
  }
}
