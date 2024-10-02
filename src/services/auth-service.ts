import BaseService from "@/services/base-service";
import { LoginResponse } from "@/models/responses/auth/login.response";
import { RegisterResponse } from "@/models/responses/auth/register.response";
import { RegisterDTO } from "@/models/schema/register/register.dto";
import { LoginDTO } from "@/models/schema/register/login.dto";

export default class AuthService extends BaseService {
  public static async login(dto: LoginDTO) {
    return this.post<LoginResponse>("/auth/login", dto);
  }

  public static async register(dto: RegisterDTO) {
    return this.post<RegisterResponse>("/auth/register", dto);
  }
}
