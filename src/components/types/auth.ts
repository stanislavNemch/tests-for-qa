export interface RegistrationRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegistrationResponse {
    email: string;
    id: string;
}

export interface UserData {
    email: string;
    id: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    sid: string;
    userData: UserData;
}

export interface RefreshResponse {
    newAccessToken: string;
    newRefreshToken: string;
    newSid: string;
}

export interface Question {
    question: string;
    questionId: number;
    answers: string[];
}

export interface Answer {
    questionId: number;
    answer: string;
}

export interface TestResult {
    result: string;
    mainMessage: string;
    secondaryMessage: string;
}
