import axios from "axios";
import type {
    RegistrationRequest,
    RegistrationResponse,
    LoginRequest,
    LoginResponse,
    RefreshResponse,
} from "../types/auth";

const BASE_URL = "https://protest-backend.goit.global";

const instance = axios.create({
    baseURL: BASE_URL,
});

export const authService = {
    // Функция для динамической установки токена
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

    // Новый метод для обновления токенов
    refresh: (sid: string) =>
        instance.post<RefreshResponse>("/auth/refresh", { sid }),

    logout: () => instance.post("/auth/logout"),
};

// --- Интерцептор для автоматического обновления токенов ---
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Перехватчик запросов
instance.interceptors.request.use(
    (config) => {
        // В будущем, здесь можно будет добавить логику для получения токена из localStorage
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Перехватчик ответов
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Если ошибка 401 и запрос еще не был повторен
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Если уже идет процесс обновления, ставим запрос в очередь
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");
            const sid = localStorage.getItem("sid");

            if (!refreshToken || !sid) {
                // Если токена нет, просто выходим
                return Promise.reject(error);
            }

            try {
                // Меняем заголовок авторизации на refreshToken
                authService.setToken(refreshToken);
                const { data } = await authService.refresh(sid);

                // Обновляем токены в localStorage и в axios
                localStorage.setItem("accessToken", data.newAccessToken);
                localStorage.setItem("refreshToken", data.newRefreshToken);
                localStorage.setItem("sid", data.newSid);
                authService.setToken(data.newAccessToken);

                processQueue(null, data.newAccessToken);

                // Повторяем исходный запрос с новым токеном
                originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;
                return instance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                // Если обновление не удалось, выходим из системы
                localStorage.clear();
                window.location.reload(); // Перезагружаем страницу для полного выхода
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
