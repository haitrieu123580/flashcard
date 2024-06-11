import { Axios } from 'axios';

import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/auth';

export const LoginApi = async (data: any) => {
  const response = await AxiosConfig.post(`${BASE_URL}/sign-in`, data);
  return response;
};

export const GetProfileApi = async () => {
  const response = await AxiosConfig.get(`${BASE_URL}/me`);
  return response;
};

export const GetNewAccessTokenApi = async (refresh_token: string | any) => {
  const response = await AxiosConfig.post(
    `${BASE_URL}/get-token`,
    JSON.stringify({ refresh_token }),
  );
  return response;
};

export const SignupApi = async (data: any) => {
  //data already convert to json
  const response = await AxiosConfig.post(`${BASE_URL}/sign-up`, data);
  return response;
};

export const ForgotPasswordApi = async (data: any) => {
  //data already convert to json
  const response = await AxiosConfig.post(`${BASE_URL}/forgot-password`, data);
  return response;
};

export const ResetPasswordApi = async (data: any) => {
  const response = await AxiosConfig.post(`${BASE_URL}/reset-password`, data);
  return response;
};

export const logoutApi = async () => {
  const response = await AxiosConfig.get(`${BASE_URL}/logout`);
  return response;
};

export const LoginWithOauthApi = async () => {
  const response = await AxiosConfig.get(
    `${import.meta.env.VITE_API_URL}/passport/login/success`,
    {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return response;
};
