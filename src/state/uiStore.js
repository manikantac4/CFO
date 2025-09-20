import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      // Dark mode
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // Modal states
      modals: {
        exportReport: false,
        purchaseCredits: false,
        csvUpload: false,
        scenarioCompare: false,
      },
      openModal: (modalName) => 
        set((state) => ({
          modals: { ...state.modals, [modalName]: true }
        })),
      closeModal: (modalName) => 
        set((state) => ({
          modals: { ...state.modals, [modalName]: false }
        })),

      // Active scenario
      activeScenario: null,
      setActiveScenario: (scenario) => set({ activeScenario: scenario }),

      // Sidebar state
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Toast notifications
      toasts: [],
      addToast: (toast) => 
        set((state) => ({
          toasts: [...state.toasts, { id: Date.now(), ...toast }]
        })),
      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter(toast => toast.id !== id)
        })),

      // Loading states
      loading: {
        simulation: false,
        scenarios: false,
        reports: false,
        billing: false,
      },
      setLoading: (key, value) =>
        set((state) => ({
          loading: { ...state.loading, [key]: value }
        })),
    }),
    {
      name: 'cfo-helper-ui',
      partialize: (state) => ({ 
        isDarkMode: state.isDarkMode,
        sidebarOpen: state.sidebarOpen 
      }),
    }
  )
);