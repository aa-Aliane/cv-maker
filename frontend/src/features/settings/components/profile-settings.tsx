"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PersonalIdentityCard } from "./personal-identity-card";
import { ProfessionalDetailsCard } from "./professional-details-card";
import { SocialPresenceCard } from "./social-presence-card";
import { WorkExperienceCard } from "./work-experience-card";
import { AcademicBackgroundCard } from "./academic-background-card";
import { useProfile, useEducations, useExperiences, useUpdateProfileMutation, useUpdateEducationMutation, useUpdateExperienceMutation } from "../queries/use-settings-queries";
import { useCurrentUser, useUpdateUserMutation } from "@/features/auth/queries/use-auth-mutations";
import { useSettingsStore } from "../store/settings-store";

export function ProfileSettings() {
  // Queries now handle store synchronization via side effects in queryFn
  const { refetch: refetchUser } = useCurrentUser();
  const { refetch: refetchProfile } = useProfile();
  const { refetch: refetchEducations } = useEducations();
  const { refetch: refetchExperiences } = useExperiences();

  const { user, profile, educations, experiences, hasChanges, discard } = useSettingsStore();

  const updateUser = useUpdateUserMutation();
  const updateProfile = useUpdateProfileMutation();
  const updateEducation = useUpdateEducationMutation();
  const updateExperience = useUpdateExperienceMutation();

  const handleSave = async () => {
    try {
      // 1. Update User (first_name, last_name)
      await updateUser.mutateAsync({
        first_name: user.first_name,
        last_name: user.last_name,
      });

      // 2. Update Profile
      await updateProfile.mutateAsync(profile);

      // 3. Update Educations
      for (const edu of educations) {
        await updateEducation.mutateAsync(edu);
      }

      // 4. Update Experiences
      for (const exp of experiences) {
        await updateExperience.mutateAsync(exp);
      }

      discard();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDiscard = async () => {
    // Re-fetching data will trigger the side effects in queryFn and reset the store
    await Promise.all([
      refetchUser(),
      refetchProfile(),
      refetchEducations(),
      refetchExperiences()
    ]);
    discard();
  };

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-64px)] w-full">
      {/* Profile Content */}
      <div className="p-lg max-w-5xl mx-auto w-full animate-in fade-in duration-500 pb-[100px] outline-none">
        <div className="mb-lg">
          <h3 className="text-2xl font-bold text-foreground">
            Profile Management
          </h3>
          <p className="font-body-md text-body-md text-muted-foreground mt-xs">
            Manage your professional identity and career history across the
            platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          <div className="lg:col-span-8 space-y-lg">
            <PersonalIdentityCard />
            <ProfessionalDetailsCard />
          </div>
          <div className="lg:col-span-4">
            <SocialPresenceCard />
          </div>
          <div className="lg:col-span-12 space-y-lg">
            <WorkExperienceCard />
            <AcademicBackgroundCard />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-background/80 backdrop-blur-md border-t border-border p-md flex justify-end gap-md z-30 px-lg">
        <Button 
          variant="ghost" 
          className="font-label-md"
          onClick={handleDiscard}
          disabled={!hasChanges}
        >
          Discard Changes
        </Button>
        <Button 
          variant="default" 
          className="font-label-md px-xl shadow-sm"
          onClick={handleSave}
          disabled={!hasChanges || updateProfile.isPending || updateUser.isPending}
        >
          {updateProfile.isPending || updateUser.isPending ? "Saving..." : "Save Profile Changes"}
        </Button>
      </div>
    </div>
  );
}
