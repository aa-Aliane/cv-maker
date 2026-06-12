"use client";

import { Button } from "@/components/ui/button";
import {
  useProfile,
  useEducations,
  useExperiences,
  useUpdateProfileMutation,
  useCreateEducationMutation,
  useCreateExperienceMutation,
  useUpdateEducationMutation,
  useUpdateExperienceMutation,
} from "../queries/use-settings-queries";
import {
  useCurrentUser,
  useUpdateUserMutation,
} from "@/features/auth/queries/use-auth-mutations";
import { useSettingsStore } from "../store/settings-store";
import { useQueryClient } from "@tanstack/react-query";
import { Education, WorkExperience } from "@/features/cv-builder/types";

export function ProfileSaveBar() {
  const queryClient = useQueryClient();

  const { refetch: refetchUser } = useCurrentUser();
  const { refetch: refetchProfile } = useProfile();
  const { refetch: refetchEducations } = useEducations();
  const { refetch: refetchExperiences } = useExperiences();

  const { user, profile, educations, experiences, hasChanges, discard } =
    useSettingsStore();

  const updateUser = useUpdateUserMutation();
  const updateProfile = useUpdateProfileMutation();
  const updateEducation = useUpdateEducationMutation();
  const updateExperience = useUpdateExperienceMutation();
  const createEducation = useCreateEducationMutation();
  const createExperience = useCreateExperienceMutation();

  const isSaving =
    updateProfile.isPending ||
    updateUser.isPending ||
    updateEducation.isPending ||
    updateExperience.isPending;

  const handleSave = async () => {
    try {
      await updateUser.mutateAsync({
        first_name: user.first_name,
        last_name: user.last_name,
      });
      await updateProfile.mutateAsync(profile);

      const cachedEducations =
        queryClient.getQueryData<Education[]>(["educations"]) ?? [];
      const existingEducationIds = new Set(cachedEducations.map((e) => e?.id));
      for (const { id, ...fields } of educations) {
        if (id && existingEducationIds.has(id)) {
          await updateEducation.mutateAsync({ id, ...fields });
        } else {
          await createEducation.mutateAsync(fields);
        }
      }

      const cachedExperiences =
        queryClient.getQueryData<WorkExperience[]>(["experiences"]) ?? [];
      const existingExperienceIds = new Set(
        cachedExperiences.map((e) => e?.id),
      );
      for (const { id, ...fields } of experiences) {
        if (id && existingExperienceIds.has(id)) {
          await updateExperience.mutateAsync({ id, ...fields });
        } else {
          await createExperience.mutateAsync(fields);
        }
      }

      discard();
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleDiscard = async () => {
    await Promise.all([
      refetchUser(),
      refetchProfile(),
      refetchEducations(),
      refetchExperiences(),
    ]);
    discard();
  };

  return (
    <div className="fixed bottom-0 right-0 left-0 md:left-[calc(64px+208px)] bg-background/80 backdrop-blur-md border-t border-border p-md flex items-center justify-between gap-md z-30 px-lg">
      {hasChanges ? (
        <p className="text-sm text-muted-foreground">Unsaved changes</p>
      ) : (
        <span />
      )}
      <div className="flex gap-md">
        <Button variant="ghost" onClick={handleDiscard} disabled={!hasChanges}>
          Discard
        </Button>
        <Button
          variant="default"
          className="px-xl shadow-sm"
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
