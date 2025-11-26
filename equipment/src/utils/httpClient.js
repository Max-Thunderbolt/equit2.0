import axios from "axios";
import env from "../config/env.js";
import logger from "../config/logger.js";

const httpClient = axios.create({
  baseURL: env.externalApiBaseUrl,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (env.externalApiKey) {
      config.headers.Authorization = `Bearer ${env.externalApiKey}`;
    }
    logger.debug(
      `HTTP ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );
    return config;
  },
  (error) => {
    logger.error("HTTP request error %o", error);
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    logger.error(
      "HTTP response error (%s): %o",
      status ?? "no-status",
      error.response?.data ?? error.message
    );
    return Promise.reject(error);
  }
);

export default httpClient;
