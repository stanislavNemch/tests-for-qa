import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import type {
    RegistrationRequest,
    RegistrationResponse,
    LoginRequest,
    LoginResponse,
    RefreshResponse,
    UserData,
    Question,
    Answer,
    TestResult,
} from "../types/auth";

// Можно вынести в .env (как обсуждали ранее)
const BASE_URL =
    import.meta.env.VITE_API_BASE_URL ?? "https://protest-backend.goit.global";

const instance = axios.create({
    baseURL: BASE_URL,
});

// Расширяем конфиг для отметки повторной попытки
interface RetriableAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Очередь для запросов, которые ждут обновления токена
interface FailedQueueItem {
    resolve: (value: string | PromiseLike<string | null> | null) => void;
    reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    failedQueue = [];
};

export const authService = {
    setToken: (token: string | null) => {
        if (token) {
            instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            delete instance.defaults.headers.common.Authorization;
        }
    },

    register: (data: RegistrationRequest) =>
        instance.post<RegistrationResponse>("/auth/register", data),

    login: (data: LoginRequest) =>
        instance.post<LoginResponse>("/auth/login", data),

    refresh: (sid: string) =>
        instance.post<RefreshResponse>("/auth/refresh", { sid }),

    logout: () => instance.post<void>("/auth/logout"),

    getCurrentUser: async (): Promise<UserData> => {
        const { data } = await instance.get<UserData>("/user");
        return data;
    },

    getTechQuestions: () => instance.get<Question[]>("/qa-test/tech"),
    getTheoryQuestions: () => instance.get<Question[]>("/qa-test/theory"),

    // Типизируем отправку результатов
    sendTechResults: (answers: Answer[]) =>
        instance.post<TestResult>("/qa-test/tech-results", { answers }),

    sendTheoryResults: (answers: Answer[]) =>
        instance.post<TestResult>("/qa-test/theory-results", { answers }),
};

// Перехватчик запросов (оставляем без доп. логики пока)
instance.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Перехватчик ответов
instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as
            | RetriableAxiosRequestConfig
            | undefined;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                // Ждем обновления токена
                return new Promise<string | null>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (token) {
                            originalRequest.headers = {
                                ...(originalRequest.headers || {}),
                                Authorization: `Bearer ${token}`,
                            };
                        }
                        return instance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");
            const sid = localStorage.getItem("sid");

            if (!refreshToken || !sid) {
                return Promise.reject(error);
            }

            try {
                // Временно используем refreshToken
                authService.setToken(refreshToken);
                const { data } = await authService.refresh(sid);

                localStorage.setItem("accessToken", data.newAccessToken);
                localStorage.setItem("refreshToken", data.newRefreshToken);
                localStorage.setItem("sid", data.newSid);

                authService.setToken(data.newAccessToken);

                processQueue(null, data.newAccessToken);

                originalRequest.headers = {
                    ...(originalRequest.headers || {}),
                    Authorization: `Bearer ${data.newAccessToken}`,
                };

                return instance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.reload();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
