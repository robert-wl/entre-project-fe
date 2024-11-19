import axios, { AxiosInstance } from "axios";
import { redirect } from "next/navigation";
import { BackendResponse } from "@/models/backend/backend.response";

export default abstract class BaseService {
  private static BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  private static BACKEND_DOCKER_URL = process.env.NEXT_PUBLIC_BACKEND_DOCKER_URL;
  private static axiosInstance: AxiosInstance;

  private static get axios() {
    if (!this.axiosInstance || this.axiosInstance.defaults.headers.common["Authorization"] === undefined) {
      this.axiosInstance = this.getAxiosInstance();
    }

    return this.axiosInstance;
  }

  protected static async get<T>(url: string): Promise<BackendResponse<T>> {
    try {
      const { data } = await this.axios.get<T>(url);

      return [data, null];
    } catch (error) {
      return [null, this.handleError(error)];
    }
  }

  protected static async post<T>(url: string, body: Object): Promise<BackendResponse<T>> {
    try {
      const { data } = await this.axios.post<T>(url, body);

      return [data, null];
    } catch (error) {
      return [null, this.handleError(error)];
    }
  }

  protected static async put<T>(url: string): Promise<BackendResponse<T>> {
    try {
      const { data } = await this.axios.put<T>(url);

      return [data, null];
    } catch (error) {
      return [null, this.handleError(error)];
    }
  }

  protected static async delete<T>(url: string): Promise<BackendResponse<T>> {
    try {
      const { data } = await this.axios.delete<T>(url);

      return [data, null];
    } catch (error) {
      return [null, this.handleError(error)];
    }
  }

  private static getAxiosInstance() {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(async (config) => {
      if (typeof window !== "undefined") {
        const { default: injectClientToken } = await import("@/lib/client-token-injector");
        await injectClientToken(config);
      } else {
        const { default: injectServerToken } = await import("@/lib/server-token-injector");
        await injectServerToken(config);
      }

      if (process.env.NEXT_PUBLIC_IS_CONTAINER) {
        if (typeof window !== "undefined") {
          config.baseURL = this.BACKEND_URL;
        } else {
          config.baseURL = this.BACKEND_DOCKER_URL;
        }
      } else {
        config.baseURL = this.BACKEND_URL;
      }

      return config;
    });

    return axiosInstance;
  }

  private static handleError(error: any) {
    if (axios.isAxiosError(error)) {
      console.log("THIS IS ERROR", error);
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        } else {
          redirect("/login");
        }
      }

      return {
        message: error.response?.data.message || "An unknown error occurred",
        statusCode: error.response?.status || 500,
        error: error.response?.data.error || "Internal Server Error",
      };
    }

    return {
      message: "An unknown error occurred",
      statusCode: 500,
      error: "Internal Server Error",
    };
  }
}
