import axios, { AxiosRequestConfig } from "axios";

export const authenticationInstance = axios.create({
  baseURL:
    (process.env.NEXT_PUBLIC_API_BASE_URL || "localhost") + "/user/api/v1/auth",
});
