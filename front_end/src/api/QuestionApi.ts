import { AxiosConfig } from './AxiosConfig';

const BASE_URL = import.meta.env.VITE_API_URL + '/api/test-kit';

export const getQuestionsListBySetIdApi = async (setId: string) => {
  const response = await AxiosConfig.get(
    `${BASE_URL}/get-all-test-kits/${setId}`,
  );
  return response;
};

export const editQuestionApi = async ({
  questionId,
  testKitId,
  data,
}: {
  questionId: string;
  testKitId: string;
  data: any;
}) => {
  const response = await AxiosConfig.post(
    `${BASE_URL}/question/${testKitId}/${questionId}`,
    data,
  );
  return response;
};

export const createQuestionApi = async ({
  testId,
  data,
}: {
  testId: string;
  data: any;
}) => {
  const response = await AxiosConfig.post(
    `${BASE_URL}/question/${testId}`,
    data,
  );
  return response;
};

export const deleteQuestionApi = async (id: string) => {
  const response = await AxiosConfig.delete(`${BASE_URL}/question/${id}`);
  return response;
};

export const createTestKitApi = async ({
  setId,
  level,
}: {
  setId: string;
  level: any;
}) => {
  const response = await AxiosConfig.post(`${BASE_URL}/create-test-kit`, {
    setId,
    level,
  });
  return response;
};
