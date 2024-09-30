import BaseService from "@/services/base-service";
import { LoginResponse } from "@/models/responses/auth/login.response";
import { RegisterResponse } from "@/models/responses/auth/register.response";

export default class AuthService extends BaseService {
  public static async login(email: string, password: string) {
    const payload = {
      email,
      password,
    };

    const { data } = await this.axios.post<LoginResponse>("/auth/login", payload);

    console.log(data);
    return data;
  }

  public static async register(name: string, email: string, password: string, phoneNumber: string) {
    const payload = {
      name,
      email,
      password,
      phoneNumber,
    };

    const { data } = await this.axios.post<RegisterResponse>("/auth/register", payload);

    return data;
  }
}
