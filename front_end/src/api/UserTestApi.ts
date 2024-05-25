import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/tests";

export const createQuestionsBySetId = async (setId: string) => {
    const response = await AxiosConfig.post(`${BASE_URL}`, { setId: setId });
    return response;
}