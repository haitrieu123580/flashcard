import { AxiosConfig } from './AxiosConfig';

const BASE_URL = 'http://localhost:8001';

export const getRecommendSetstBySetIdApi = async (setId: string) => {
  const response = await AxiosConfig.get(`${BASE_URL}/recommend`, {
    params: {
      set_id: setId,
    },
  });
  return response;
};
