import { InternalAxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export default async function injectServerToken(config: InternalAxiosRequestConfig<any>) {
  const session = await getServerSession(authOptions);
  config.headers.Authorization = `Bearer ${session?.user?.token}`;
  return config;
}
