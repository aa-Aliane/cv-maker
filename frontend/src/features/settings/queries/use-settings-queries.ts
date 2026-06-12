import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/client";
import {
  Education,
  WorkExperience,
  PersonalInfo,
} from "@/features/cv-builder/types";
import { useSettingsStore } from "../store/settings-store";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await apiClient.get("/cv/profile");
      useSettingsStore.getState().setProfile(data);
      return data as PersonalInfo;
    },
  });
};

export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const { data } = await apiClient.get("/cv/experience");
      useSettingsStore.getState().setExperiences(data);
      return data as WorkExperience[];
    },
  });
};

export const useEducations = () => {
  return useQuery({
    queryKey: ["educations"],
    queryFn: async () => {
      const { data } = await apiClient.get("/cv/education");
      useSettingsStore.getState().setEducations(data);
      return data as Education[];
    },
  });
};

export const useCreateEducationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (education: Omit<Education, "id">) => {
      const { data } = await apiClient.post("/cv/education", education);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });
};

export const useCreateExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (experience: Omit<WorkExperience, "id">) => {
      const { data } = await apiClient.post("/cv/experience", experience);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Partial<PersonalInfo>) => {
      const { data } = await apiClient.patch("/cv/profile", profile);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};

export const useUpdateEducationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...education
    }: Partial<Education> & { id: string }) => {
      const { data } = await apiClient.patch(`/cv/education/${id}`, education);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
    },
  });
};

export const useUpdateExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...experience
    }: Partial<WorkExperience> & { id: string }) => {
      const { data } = await apiClient.patch(
        `/cv/experience/${id}`,
        experience,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });
};
