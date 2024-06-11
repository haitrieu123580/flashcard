import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/user-progress';

export const updateUserProgressApi = async ({
  setId,
  cardId,
}: {
  setId: string;
  cardId: string;
}) => {
  const response = await AxiosConfig.post(`${BASE_URL}`, { setId, cardId });
  return response;
};

export const getUserLearningSetProgressApi = async (setId: string) => {
  const response = await AxiosConfig.get(`${BASE_URL}/progress/${setId}`);
  return response;
};

export const getUserProgressApi = async () => {
  const response = await AxiosConfig.get(`${BASE_URL}/progress`);
  return response;
};
