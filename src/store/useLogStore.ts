import { create } from 'zustand';

interface LogItem {
  id: string;
  timestamp: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface LogState {
  logs: LogItem[];
  addLog: (message: string, type?: 'success' | 'info' | 'error') => void;
  clearLogs: () => void;
}

export const useLogStore = create<LogState>((set) => ({
  logs: [],
  
  addLog: (message, type = 'info') => set((state) => ({
    logs: [
      {
        id: crypto.randomUUID(),
        timestamp: new Date().toLocaleTimeString(),
        message,
        type
      },
      ...state.logs
    ]
  })),

  clearLogs: () => set({ logs: [] })
}));