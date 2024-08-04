import { AUTH_TOKEN_NAME } from "../config/auth";
import { ApiService } from "./ApiService";

export type AuthSession = {
  token: string;
};

type AuthLoginPayload = {
  email: string;
  password: string;
};

type AuthSignUpPayload = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export class AuthService extends ApiService {
  static PATH = "/user";

  static async signIn(payload: AuthLoginPayload): Promise<AuthSession> {
    const { token } = await ApiService.post(
      `${AuthService.PATH}/signin`,
      payload,
      { headers: { Authorization: undefined! } }
    );
    localStorage.setItem(AUTH_TOKEN_NAME, token);
    return { token };
  }

  static async signOut(): Promise<void> {
    window.localStorage.removeItem(AUTH_TOKEN_NAME);
  }

  static async signUp(payload: AuthSignUpPayload): Promise<AuthSession> {
    const { token } = await ApiService.post(
      `${AuthService.PATH}/signup`,
      payload,
      { headers: { Authorization: undefined! } }
    );
    return { token };
  }
}
