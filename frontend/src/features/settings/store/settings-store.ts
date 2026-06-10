import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Education,
  WorkExperience,
  PersonalInfo,
} from "@/features/cv-builder/types";
import { AuthUser } from "@/features/auth/types";

interface SettingsState {
  user: Partial<AuthUser>;
  profile: Partial<PersonalInfo>;
  educations: Education[];
  experiences: WorkExperience[];
  hasChanges: boolean;

  // Draft & UI State
  experienceDrafts: Record<string, WorkExperience>;
  educationDrafts: Record<string, Education>;
  expandedExperienceIds: string[];
  expandedEducationIds: string[];

  // Basic Actions
  setUser: (user: Partial<AuthUser>) => void;
  setUserField: (field: keyof AuthUser, value: any) => void;
  setProfile: (profile: Partial<PersonalInfo>) => void;
  updateProfileField: (field: keyof PersonalInfo, value: any) => void;

  // Experience Actions
  setExperiences: (experiences: WorkExperience[]) => void;
  addExperience: () => void;
  updateExperienceDraft: (id: string, updates: Partial<WorkExperience>) => void;
  confirmExperience: (id: string) => void;
  clearExperience: (id: string) => void;
  toggleExperience: (id: string) => void;
  removeExperience: (id: string) => void;

  // Education Actions
  setEducations: (educations: Education[]) => void;
  addEducation: () => void;
  updateEducationDraft: (id: string, updates: Partial<Education>) => void;
  confirmEducation: (id: string) => void;
  clearEducation: (id: string) => void;
  toggleEducation: (id: string) => void;
  removeEducation: (id: string) => void;

  discard: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      user: {},
      profile: {},
      educations: [],
      experiences: [],
      hasChanges: false,

      experienceDrafts: {},
      educationDrafts: {},
      expandedExperienceIds: [],
      expandedEducationIds: [],

      setUser: (user) => set({ user, hasChanges: false }),
      setUserField: (field, value) =>
        set((state) => ({
          user: { ...state.user, [field]: value },
          hasChanges: true,
        })),

      setProfile: (profile) => set({ profile, hasChanges: false }),
      updateProfileField: (field, value) =>
        set((state) => ({
          profile: { ...state.profile, [field]: value },
          hasChanges: true,
        })),

      // Experiences
      setExperiences: (experiences) => set({ experiences, hasChanges: false }),
      addExperience: () => {
        const id = crypto.randomUUID();
        const newExp: WorkExperience = {
          id,
          company: "",
          position: "",
          start_date: "",
          is_current: false,
          description: "",
        };
        set((state) => ({
          experienceDrafts: { ...state.experienceDrafts, [id]: newExp },
          expandedExperienceIds: [...state.expandedExperienceIds, id],
        }));
      },
      updateExperienceDraft: (id, updates) =>
        set((state) => ({
          experienceDrafts: {
            ...state.experienceDrafts,
            [id]: { ...state.experienceDrafts[id], ...updates },
          },
        })),
      confirmExperience: (id) => {
        const draft = get().experienceDrafts[id];
        if (!draft) return;
        if (!draft.company?.trim() || !draft.position?.trim()) return;
        set((state) => {
          const exists = state.experiences.find((e) => e.id === id);
          const newExperiences = exists
            ? state.experiences.map((e) => (e.id === id ? draft : e))
            : [...state.experiences, draft];

          const { [id]: _, ...remainingDrafts } = state.experienceDrafts;
          return {
            experiences: newExperiences,
            experienceDrafts: remainingDrafts,
            expandedExperienceIds: state.expandedExperienceIds.filter(
              (eid) => eid !== id
            ),
            hasChanges: true,
          };
        });
      },
      clearExperience: (id) =>
        set((state) => {
          const { [id]: _, ...remainingDrafts } = state.experienceDrafts;
          return {
            experienceDrafts: remainingDrafts,
            expandedExperienceIds: state.expandedExperienceIds.filter(
              (eid) => eid !== id
            ),
          };
        }),
      toggleExperience: (id) =>
        set((state) => {
          const isExpanded = state.expandedExperienceIds.includes(id);
          if (isExpanded) {
            return {
              expandedExperienceIds: state.expandedExperienceIds.filter(
                (eid) => eid !== id
              ),
            };
          } else {
            // Start editing existing
            const existing = state.experiences.find((e) => e.id === id);
            return {
              expandedExperienceIds: [...state.expandedExperienceIds, id],
              experienceDrafts: {
                ...state.experienceDrafts,
                [id]: existing ? { ...existing } : state.experienceDrafts[id],
              },
            };
          }
        }),
      removeExperience: (id) =>
        set((state) => ({
          experiences: state.experiences.filter((e) => e.id !== id),
          expandedExperienceIds: state.expandedExperienceIds.filter(
            (eid) => eid !== id
          ),
          hasChanges: true,
        })),

      // Educations
      setEducations: (educations) => set({ educations, hasChanges: false }),
      addEducation: () => {
        const id = crypto.randomUUID();
        const newEdu: Education = {
          id,
          institution: "",
          degree: "",
          field_of_study: "",
          start_date: "",
          is_current: false,
          description: "",
        };
        set((state) => ({
          educationDrafts: { ...state.educationDrafts, [id]: newEdu },
          expandedEducationIds: [...state.expandedEducationIds, id],
        }));
      },
      updateEducationDraft: (id, updates) =>
        set((state) => ({
          educationDrafts: {
            ...state.educationDrafts,
            [id]: { ...state.educationDrafts[id], ...updates },
          },
        })),
      confirmEducation: (id) => {
        const draft = get().educationDrafts[id];
        if (!draft) return;
        if (!draft.institution?.trim() || !draft.degree?.trim()) return;
        set((state) => {
          const exists = state.educations.find((e) => e.id === id);
          const newEducations = exists
            ? state.educations.map((e) => (e.id === id ? draft : e))
            : [...state.educations, draft];

          const { [id]: _, ...remainingDrafts } = state.educationDrafts;
          return {
            educations: newEducations,
            educationDrafts: remainingDrafts,
            expandedEducationIds: state.expandedEducationIds.filter(
              (eid) => eid !== id
            ),
            hasChanges: true,
          };
        });
      },
      clearEducation: (id) =>
        set((state) => {
          const { [id]: _, ...remainingDrafts } = state.educationDrafts;
          return {
            educationDrafts: remainingDrafts,
            expandedEducationIds: state.expandedEducationIds.filter(
              (eid) => eid !== id
            ),
          };
        }),
      toggleEducation: (id) =>
        set((state) => {
          const isExpanded = state.expandedEducationIds.includes(id);
          if (isExpanded) {
            return {
              expandedEducationIds: state.expandedEducationIds.filter(
                (eid) => eid !== id
              ),
            };
          } else {
            const existing = state.educations.find((e) => e.id === id);
            return {
              expandedEducationIds: [...state.expandedEducationIds, id],
              educationDrafts: {
                ...state.educationDrafts,
                [id]: existing ? { ...existing } : state.educationDrafts[id],
              },
            };
          }
        }),
      removeEducation: (id) =>
        set((state) => ({
          educations: state.educations.filter((e) => e.id !== id),
          expandedEducationIds: state.expandedEducationIds.filter(
            (eid) => eid !== id
          ),
          hasChanges: true,
        })),

      discard: () => set({ hasChanges: false }),
    }),
    {
      name: "cv-settings-storage",
      partialize: (state) => ({
        profile: state.profile,
        educations: state.educations,
        experiences: state.experiences,
        experienceDrafts: state.experienceDrafts,
        educationDrafts: state.educationDrafts,
        expandedExperienceIds: state.expandedExperienceIds,
        expandedEducationIds: state.expandedEducationIds,
      }),
    }
  )
);
