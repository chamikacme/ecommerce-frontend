import { create } from "zustand";

interface LoadingStore {
  isPageLoading: boolean;
  setLoading: (isPageLoading: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isPageLoading: false,
  setLoading: (isPageLoading) => set({ isPageLoading }),
}));

export default useLoadingStore;
