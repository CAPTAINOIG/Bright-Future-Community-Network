import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const DEMO_EMAIL = 'admin@bfcn.org';
const DEMO_PASSWORD = 'admin123';

export default create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        await new Promise((r) => setTimeout(r, 600));
        if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
          throw new Error('Invalid email or password.');
        }
        set({
          user: { email: DEMO_EMAIL, name: 'BFCN Admin', role: 'Administrator' },
          token: 'demo-token-' + Date.now(),
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        try { localStorage.removeItem('bfcn.auth'); } catch (e) { void e; }
      },
    }),
    {
      name: 'bfcn.auth',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
