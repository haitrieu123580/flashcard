import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/card';

export const createCardApi = async (data: any) => {
  const response = await AxiosConfig.post(`${BASE_URL}`, data);
  return response;
};
export const editCardApi = async ({ id, data }: { id: string; data: any }) => {
  const response = await AxiosConfig.put(`${BASE_URL}/${id}`, data);
  return response;
};

export const deleteCardApi = async (id: string) => {
  const response = await AxiosConfig.delete(`${BASE_URL}/${id}`);
  return response;
};
