import axios from 'axios';

const baseURL = import.meta.env.API_URL || 'http://localhost:3000/api';

export const api = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// interceptor to handle 401 Unauthorized globally (e.g., token expiration)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Expired session detected. You can handle logout or token refresh here.');
        }
        return Promise.reject(error);
    }
);