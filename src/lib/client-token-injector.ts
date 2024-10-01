import { InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

export default async function injectClientToken(config: InternalAxiosRequestConfig<any>) {
  let session = await getSession();
  config.headers.Authorization = `Bearer ${session?.user?.token}`;
  return config;
}
