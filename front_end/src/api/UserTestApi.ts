import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/user-tests";

type UserAnswer = {
    testId: string;
    answers: [{ questionId: string, answer: string }];
}

export const createQuestionsBySetId = async (setId: string) => {
    const response = await AxiosConfig.post(`${BASE_URL}/create-test`, { setId: setId });
    return response;
}

export const saveUserAnswerTestIdApi = async (data: UserAnswer) => {
    const response = await AxiosConfig.post(`${BASE_URL}/test-results`, data);
    return response;
}

export const getTestHistoryBySetIdApi = async (setId: string) => {
    const response = await AxiosConfig.get(`${BASE_URL}/${setId}`);
    return response;
}

export const getUserTestResultApi = async (testId: string) => {
    const response = await AxiosConfig.get(`${BASE_URL}/test-result/${testId}`);
    return response;
}