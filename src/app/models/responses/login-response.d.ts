import {User} from "next-auth";


export interface LoginResponse {
    access_token: string;
    user: Omit<User, "password">;
}