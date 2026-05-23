import { api } from '../libs/api';

export interface User {
    id: string;
    login: string;
    name: string;
    email: string;
    role: string;
}

export interface SignInData {
    login: string;
    password: string;
}

export interface SignUpData {
    login: string;
    name: string;
    email: string;    
    password: string;
    confirmPassword: string;
}

export interface SignInResponse {
    success: boolean;
    user: User;
}

export interface SignUpResponse {
    success: boolean;
    user: User;
}

export const AuthService = {
    signin: async (credentials: SignInData): Promise<User> => {
        const response = await api.post<SignInResponse>('/auth/login', credentials);
        return response.data.user;
    },
    
    signup: async (data: SignUpData): Promise<User> => {
        const response = await api.post<SignUpResponse>('/auth/signup', data);
        return response.data.user;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    },

    getProfile: async (): Promise<User> => {
        const response = await api.get<{ user: User }>('/auth/me');
        return response.data.user;
    }
};