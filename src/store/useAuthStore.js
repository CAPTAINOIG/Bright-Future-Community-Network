import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (credentials) => {
        // Mock login - in real app, this would call an API
        if (credentials.email === 'admin@bfcn.org' && credentials.password === 'admin123') {
          const user = {
            id: 1,
            name: 'BFCN Admin',
            email: credentials.email,
            role: 'admin'
          };
          
          set({ user, isAuthenticated: true });
          return { success: true, user };
        }
        
        return { success: false, error: 'Invalid credentials' };
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuth: () => {
        const state = get();
        return state.isAuthenticated && state.user;
      }
    }),
    {
      name: 'bfcn-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

export default useAuthStore;