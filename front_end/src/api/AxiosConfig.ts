import { ErrorCode } from '@/enums/ErrorCode'
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
// import { v4 } from 'uuid'

const onRequest = (
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    const ACCESS_TOKEN = localStorage.getItem('access_token')
    if (ACCESS_TOKEN) {
        config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`
    }
    return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    if (error.status === ErrorCode.UNAUTHORIZED) {
        localStorage.removeItem('access_token')
    }
    return Promise.reject(error)
}

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError)
    axiosInstance.interceptors.response.use(onResponse, onResponseError)
    return axiosInstance
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
        // 'x-request-id': v4(),
    },
})

export const AxiosConfig = setupInterceptorsTo(axiosInstance)