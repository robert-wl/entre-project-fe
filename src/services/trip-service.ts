import BaseService from "@/services/base-service";
import { LoginResponse } from "@/models/responses/auth/login.response";

export default class TripService extends BaseService {
  public static async login(email: string, password: string) {
    const payload = {
      email,
      password,
    };

    const { data } = await this.axios.post<LoginResponse>("/auth/login", payload);

    console.log(data);
    return data;
  }
}
