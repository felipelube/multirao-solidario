import { ApiService } from "./ApiService";

export type Registration = {
  id: number;
  userId: number;
  eventId: number;
};

export class RegistrationService extends ApiService {
  static PATH = "/registration";
  static PATH_FOR_ID = "/registration/:id";
  static PATH_BY_EVENT_ID = "/registration/byEventId/:id";
  static PATH_BY_USER_ID = "/registration/byUserId/:id";

  static async createRegistration(
    registration: Omit<Registration, "id">
  ): Promise<void> {
    return ApiService.post(RegistrationService.PATH, registration);
  }

  static async deleteRegistration(registrationId: number): Promise<string> {
    return ApiService.delete(
      RegistrationService.PATH_FOR_ID.replace(":id", registrationId.toString())
    );
  }

  static async getRegistrationsByUserId(
    userId: number
  ): Promise<Registration[]> {
    return ApiService.get(
      RegistrationService.PATH_BY_USER_ID.replace(":id", userId.toString())
    );
  }

  static async getRegistrationsByEventId(
    eventId: number
  ): Promise<Registration[]> {
    return ApiService.get(
      RegistrationService.PATH_BY_EVENT_ID.replace(":id", eventId.toString())
    );
  }
}
