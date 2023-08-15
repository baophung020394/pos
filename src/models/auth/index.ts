export interface LoginResponse {
    success: boolean;
    data: string;
    statusCode: number;
    errors: string[];
}

export interface User {
    isAuthenticated: boolean;
    fullName: string;
    refreshToken: string;
    token: string;
    userId: string;
}
