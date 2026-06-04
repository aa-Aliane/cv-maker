import { create } from "zustand";

interface UiStore {
  collapsedSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
  setSectionCollapsed: (sectionId: string, isCollapsed: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  collapsedSections: {},
  toggleSection: (sectionId) =>
    set((state) => ({
      collapsedSections: {
        ...state.collapsedSections,
        [sectionId]: !state.collapsedSections[sectionId],
      },
    })),
  setSectionCollapsed: (sectionId, isCollapsed) =>
    set((state) => ({
      collapsedSections: {
        ...state.collapsedSections,
        [sectionId]: isCollapsed,
      },
    })),
}));
