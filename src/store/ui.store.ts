import { create } from 'zustand';

type ModalKey = 'create-listing' | 'schedule' | 'celebration' | null;

interface UIState {
  sidebarOpen: boolean; // For mobile drawer
  sidebarCollapsed: boolean; // For desktop collapse
  activeModal: ModalKey;
  modalData: unknown;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  toggleSidebarCollapse: () => void;
  openModal: (key: Exclude<ModalKey, null>, data?: unknown) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false, // Default false for mobile
  sidebarCollapsed: false,
  activeModal: null,
  modalData: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar: (open) => set({ sidebarOpen: open }),
  toggleSidebarCollapse: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  openModal: (key, data) => set({ activeModal: key, modalData: data ?? null }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));
