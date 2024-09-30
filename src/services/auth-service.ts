import BaseService from "@/services/base-service";
import { LoginResponse } from "@/models/responses/auth/login.response";
import { RegisterResponse } from "@/models/responses/auth/register.response";
import { RegisterDTO } from "@/models/schema/register/register.dto";
import { LoginDTO } from "@/models/schema/register/login.dto";

export default class AuthService extends BaseService {
  public static async login(dto: LoginDTO) {
    const { data } = await this.axios.post<LoginResponse>("/auth/login", dto);

    console.log("LOGIN RESPONSE", data);
    return data;
  }

  public static async register(dto: RegisterDTO) {
    const { data } = await this.axios.post<RegisterResponse>("/auth/register", dto);

    return data;
  }
}
