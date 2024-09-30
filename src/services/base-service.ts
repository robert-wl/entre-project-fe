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

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log(error.response.status);
        if (error.response.status === 401) {
          //redirect user
          if (typeof window !== "undefined") window.location.href = "/logout";
        }

        return Promise.reject(error);
      },
    );

    return this.axiosInstance;
  }
}
