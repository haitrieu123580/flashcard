import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/question";

export const getQuestionsListBySetIdApi = async (setId: string) => {
    const response = await AxiosConfig.get(`${BASE_URL}/list/${setId}`);
    return response;
}

export const editQuestionApi = async ({ id, data }: { id: string, data: any }) => {
    const response = await AxiosConfig.put(`${BASE_URL}/${id}`, data);
    return response;
}

export const createQuestionApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}`, data);
    return response;
}

export const deleteQuestionApi = async (id: string) => {
    const response = await AxiosConfig.delete(`${BASE_URL}/${id}`);
    return response;
}
