import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/user";

export const EditProfileApi = async (data: any) => {
    const response = await AxiosConfig.put(`${BASE_URL}`, data);
    return response;
}
