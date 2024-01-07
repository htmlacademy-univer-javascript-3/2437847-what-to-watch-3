import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token.ts';
import { toast } from 'react-toastify';
import { Errors, ErrorType } from '../types/error.ts';

const BACKEND_URL = 'https://13.design.pages.academy/wtw';

const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: number[] = [
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
];

const shouldDisplayError = (response: AxiosResponse): boolean =>
  StatusCodeMapping.includes(response.status);

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const { message, errorType, details } = error.response.data;

        if (errorType === Errors.VALIDATION_ERROR) {
          toast.error(details[0].messages[0]);
        } else if (errorType !== Errors.COMMON_ERROR) {
          toast.warn(message);
        }
      }

      throw error;
    },
  );

  return api;
};
