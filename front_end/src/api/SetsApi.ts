import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/vocabulary-set";

export const GetSetsApi = async (queryParams: any) => {
    const { page_size, page_index, filter, name } = queryParams
    const response = await AxiosConfig.get(`${BASE_URL}/public-sets`,
        {
            params: {
                page_size,
                page_index,
                filter,
                name,
            }
        });
    return response;
}

export const GetSetByIdApi = async (id: string) => {
    const response = await AxiosConfig.get(`${BASE_URL}/${id}`);
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