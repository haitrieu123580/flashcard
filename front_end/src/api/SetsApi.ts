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