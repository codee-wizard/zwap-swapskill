import { create } from 'zustand';

type ModalKey = 'create-listing' | 'schedule' | 'celebration' | null;

interface UIState {
  sidebarOpen: boolean;
  activeModal: ModalKey;
  modalData: unknown;
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  openModal: (key: Exclude<ModalKey, null>, data?: unknown) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeModal: null,
  modalData: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar: (open) => set({ sidebarOpen: open }),
  openModal: (key, data) => set({ activeModal: key, modalData: data ?? null }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));
