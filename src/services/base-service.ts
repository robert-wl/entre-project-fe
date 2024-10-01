import axios, { AxiosInstance } from "axios";
import { redirect } from "next/navigation";
import injectClientToken from "@/lib/client-token-injector";

export default abstract class BaseService {
  private static BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  private static axiosInstance: AxiosInstance;

  protected static get axios() {
    if (!this.axiosInstance) {
      this.axiosInstance = this.getAxiosInstance();
    }
    return this.axiosInstance;
  }

  private static getAxiosInstance() {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(async (config) => {
      if (typeof window !== "undefined") {
        await injectClientToken(config);
      } else {
        const { default: injectServerToken } = await import("@/lib/server-token-injector");
        await injectServerToken(config);
      }

      config.baseURL = this.BACKEND_URL;

      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          //redirect user
          if (typeof window !== "undefined") {
            window.location.href = "/logout";
          } else {
            redirect("/logout");
          }
        }

        return Promise.reject(error);
      },
    );

    return axiosInstance;
  }
}
