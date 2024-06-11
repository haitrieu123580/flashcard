import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/multiple-choice-test';

export const getMultipleChoiceTestBySetIdApi = async (setId: string) => {
  const response = await AxiosConfig.get(`${BASE_URL}/${setId}`);
  return response;
};

export const submitMultipleChoiceTestApi = async (data: any) => {
  const response = await AxiosConfig.post(`${BASE_URL}/submit`, data);
  return response;
};
