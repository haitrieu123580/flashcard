import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/vocabulary-set";

export const GetSetsApi = async (queryParams: any) => {
    const { page_size, page_index, query } = queryParams
    const response = await AxiosConfig.get(`${BASE_URL}/public-sets`,
        {
            params: {
                page_size,
                page_index,
                query
            }
        });
    return response;
}