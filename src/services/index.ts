import axios from "axios";
import { apiUrl, apiKey } from "src/utils/config";

const requestConfig = {
    // Auth Config
    auth: {
        headers: {
            "Api-Key": apiKey,
            "Access-Token":
                typeof window !== "undefined" &&
                localStorage.getItem("access_token"),
        },
    },
    // Guest Config
    guest: {
        headers: {
            "Api-Key": apiKey,
        },
    },
};

export const guestRequest = {
    get: async (endpoint: any): Promise<any> => {
        const res = await axios.get(
            `${apiUrl}${endpoint}`,
            requestConfig.guest,
        );
        return res.data;
    },
    post: async (endpoint: any, data: any): Promise<any> => {
        const res = await axios.post(
            `${apiUrl}${endpoint}`,
            data,
            requestConfig.guest,
        );
        return res.data;
    },
    patch: async (endpoint: any, data: any): Promise<any> => {
        const res = await axios.patch(
            `${apiUrl}${endpoint}`,
            data,
            requestConfig.guest,
        );
        return res.data;
    },
    delete: async (endpoint: any): Promise<any> => {
        const res = await axios.delete(
            `${apiUrl}${endpoint}`,
            requestConfig.guest,
        );
        return res.data;
    },
};

export const authRequest = {
    get: async (endpoint: any, headers?: any): Promise<any> => {
        const res = await axios.get(`${apiUrl}${endpoint}`, requestConfig.auth);
        return res.data;
    },
    post: async (endpoint: any, data: any, headers?: any): Promise<any> => {
        const res = await axios.post(
            `${apiUrl}${endpoint}`,
            data,
            requestConfig.auth,
        );
        return res.data;
    },
    patch: async (endpoint: any, data: any, headers?: any): Promise<any> => {
        const res = await axios.patch(
            `${apiUrl}${endpoint}`,
            data,
            requestConfig.auth,
        );
        return res.data;
    },
    delete: async (endpoint: any, headers?: any): Promise<any> => {
        const res = await axios.delete(
            `${apiUrl}${endpoint}`,
            requestConfig.auth,
        );
        return res.data;
    },
};
