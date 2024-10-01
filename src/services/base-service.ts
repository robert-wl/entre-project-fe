import axios from "axios";
import { getSession, SessionContext } from "next-auth/react";
import { redirect } from "next/navigation";

export default abstract class BaseService {
  private static BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  private static axiosInstance = axios.create();

  protected static get axios() {
    this.axiosInstance.interceptors.request.use(async (config) => {
      let session = await getSession();

      console.log("SESSION DATA", SessionContext);
      config.headers.Authorization = `Bearer ${session?.user?.token}`;
      config.baseURL = this.BACKEND_URL;

      return config;
    });

    this.axiosInstance.interceptors.response.use(
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

    return this.axiosInstance;
  }
}
