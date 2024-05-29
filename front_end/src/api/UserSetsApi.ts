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

export const GetUserSetByIdApi = async (id: string) => {
    const response = await AxiosConfig.get(`${BASE_URL}/${id}`);
    return response;
}

export const CreateUserSetApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}/create-set`, data);
    return response;
}

export const EditUserSetApi = async ({ id, data }: { id: string, data: any }) => {
    const response = await AxiosConfig.put(`${BASE_URL}/${id}`, data);
    return response;
}

export const DeleteUserSetApi = async (id: string) => {
    const response = await AxiosConfig.delete(`${BASE_URL}/${id}`);
    return response;
}

export const AddCardToNewSetApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}/quick-create-set`, data);
    return response;
}

export const RequestToApproveSetApi = async (setId: string) => {
    const response = await AxiosConfig.post(`${BASE_URL}/request-to-approve-set`, { setId });
    return response;
}