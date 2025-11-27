import axios from "axios";
import { getAccessToken } from "@/lib/utils";
import { signOut } from "next-auth/react";

const apiClient = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const keycloakApi = axios.create({
    baseURL: process.env.AUTH_KEYCLOAK_ISSUER,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await getAccessToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.status === 401) {
            return signOut({ redirectTo: "/login" });
        }
        return Promise.reject(error);
    },
);

apiClient.interceptors.response.use(
    (resolve) => resolve,
    (reject) => {
        if (reject.status === 401) {
            return signOut({ redirectTo: "/login" });
        }
        return Promise.reject(reject);
    },
);

export default apiClient;
