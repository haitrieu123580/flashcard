import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/vocabulary-card";

export const createCardApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}`, data);
    return response;
}
export const editCardApi = async ({ id, data }: { id: string, data: any }) => {
    const response = await AxiosConfig.put(`${BASE_URL}/${id}`, data);
    return response;
}

export const deleteCardApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}`, data);
    return response;
}