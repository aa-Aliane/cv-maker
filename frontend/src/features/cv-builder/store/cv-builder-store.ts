import { create } from "zustand";
import { CvData, Education, WorkExperience } from "@/features/cv-builder/types"; // single source of truth

// ---------------------------------------------------------------------------
// UI-only volatile state
// ---------------------------------------------------------------------------
interface UiState {
  currentStep: number;
  isDragging: boolean;
}

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------
interface CvStore {
  cvData: CvData;
  ui: UiState;

  // Personal info
  updatePersonalInfo: (info: Partial<CvData["personalInfo"]>) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;

  // Wizard
  updateStep: (step: number) => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useCvStore = create<CvStore>((set) => ({
  cvData: {
    personalInfo: {
      fullName: "Alex Mercer",
      title: "Lead UX Designer",
      email: "alex.mercer@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      photo: "",
      linkedin: "linkedin.com/in/alexmercer",
      summary: "Passionate UX Designer with 5+ years of experience...",
      languages: [{ name: "English", level: "Native" }, { name: "French", level: "Intermediate" }],
      interests: ["Photography", "Hiking", "Open Source"],
    },
    education: [{ id: "1", institution: "Design Institute", degree: "BFA", note: "GPA: 3.9/4.0" }],
    skills: ["Figma", "React", "Tailwind"],
    experience: [],
  },
  ui: {
    currentStep: 0,
    isDragging: false,
  },

  // ---------------------------------------------------------------------------
  // Personal info
  // ---------------------------------------------------------------------------
  updatePersonalInfo: (info) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        personalInfo: { ...state.cvData.personalInfo, ...info },
      },
    })),

  // ---------------------------------------------------------------------------
  // Education
  // ---------------------------------------------------------------------------
  addEducation: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: [
          ...state.cvData.education,
          { id: crypto.randomUUID(), institution: "", degree: "" },
        ],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.map((edu) =>
          edu.id === id ? { ...edu, ...data } : edu,
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.filter((edu) => edu.id !== id),
      },
    })),

  // ---------------------------------------------------------------------------
  // Skills
  // ---------------------------------------------------------------------------
  addSkill: (skill) =>
    set((state) => ({
      cvData: { ...state.cvData, skills: [...state.cvData.skills, skill] },
    })),

  removeSkill: (skillName) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.filter((s) => s !== skillName),
      },
    })),

  // ---------------------------------------------------------------------------
  // Experience
  // ---------------------------------------------------------------------------
  addExperience: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: [
          ...state.cvData.experience,
          {
            id: crypto.randomUUID(),
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
          },
        ],
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: state.cvData.experience.map((exp) =>
          exp.id === id ? { ...exp, ...data } : exp,
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: state.cvData.experience.filter((exp) => exp.id !== id),
      },
    })),

  // ---------------------------------------------------------------------------
  // Wizard
  // ---------------------------------------------------------------------------
  updateStep: (step) =>
    set((state) => ({ ui: { ...state.ui, currentStep: step } })),
}));
