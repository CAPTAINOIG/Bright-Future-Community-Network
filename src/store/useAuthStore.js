import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      isLoading: true,
      
       setAuth: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user) => set({ user }),

      setToken: (token) => set({ token }),
      
      logout: () => {
        set({ user: null, isAuthenticated: false, token: null, isLoading: false });
      },
      getUser: () => get().user,
      getToken: () => get().token,
      getIsAuthenticated: () => get().isAuthenticated,
    }),
    {
      name: 'bfcn-auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        isLoading: state.isLoading,
      })
    }
  )
);

export default useAuthStore;