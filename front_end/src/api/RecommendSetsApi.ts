import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_FAST_SERVER_URL;

export const getRecommendSetstBySetIdApi = async (setId: string) => {
  const response = await AxiosConfig.get(`${BASE_URL}/recommend`, {
    params: {
      set_id: setId,
    },
  });
  return response;
};
