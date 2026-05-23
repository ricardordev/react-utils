import { create } from 'zustand';
import { AuthService, type User } from '../services/auth.service';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    
    // Ações
    setUser: (user: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => { set({ user }) },
    setLoading: (isLoading: boolean) => set({ isLoading }),
    fetchUser: async () => {
        set({ isLoading: true });
        try {
            const user = await AuthService.getProfile();
            set({ user });
        } catch (error) {
            set({ user: null });
        } finally {
            set({ isLoading: false });
        }
    },
    logout: async () => {
        try {
            await AuthService.logout(); // Endpoint POST /api/auth/logout
        } finally {
            set({ user: null });
            window.location.href = '/sign'; // Redirecionamento forçado
        }
    }
}));