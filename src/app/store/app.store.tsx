import { create } from "zustand";

interface AppStateStore {
  registerDialogOpen: boolean;
  setRegisterDialogOpen: (open: boolean) => void;
}

const useAppStateStore = create<AppStateStore>((set) => ({
  registerDialogOpen: false,
  setRegisterDialogOpen: (open: boolean) => set({ registerDialogOpen: open }),
}));

export default useAppStateStore;
