import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/admin/approve-set';

export const getPendingSetsListApi = async () => {
  const response = await AxiosConfig.get(`${BASE_URL}/pending`);
  return response;
};

export const approveSetApi = async ({
  setId,
  level,
}: {
  setId: string;
  level?: number;
}) => {
  const response = await AxiosConfig.post(`${BASE_URL}/approve`, {
    setId,
    level,
  });
  return response;
};
export const rejectSetApi = async (setId: string) => {
  const response = await AxiosConfig.post(`${BASE_URL}/reject`, { setId });
  return response;
};

export const getSetByAdminApi = async (setId: string) => {
  const response = await AxiosConfig.post(`${BASE_URL}/get-set`, {
    setId: setId,
  });
  return response;
};
