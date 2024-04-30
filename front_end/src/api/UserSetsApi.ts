import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/user-sets";

export const GetUSerSetsListApi = async () => {
    const response = await AxiosConfig.get(`${BASE_URL}/my-sets`);
    return response;
}

export const AddCardToSetApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}/add-card`, data);
    return response;
}

export const CreateSetApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}`, data);
    return response;
}

export const EditSetApi = async ({ id, data }: { id: string, data: any }) => {
    const response = await AxiosConfig.put(`${BASE_URL}/${id}`, data);
    return response;
}

export const DeleteSetApi = async (id: string) => {
    const response = await AxiosConfig.delete(`${BASE_URL}/${id}`);
    return response;
}