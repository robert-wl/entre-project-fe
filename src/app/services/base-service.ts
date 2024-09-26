import axios from "axios";
import { getSession } from "next-auth/react";

export default abstract class BaseService {
  private static BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  private static axiosInstance = axios.create();

  protected static get axios() {
    this.axiosInstance.interceptors.request.use(async (config) => {
      const session = await getSession();
      config.headers.Authorization = `Bearer ${session?.user?.token}`;
      config.baseURL = this.BACKEND_URL;

      return config;
    });

    return this.axiosInstance;
  }
}
