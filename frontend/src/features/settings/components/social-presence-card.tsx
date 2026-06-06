"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "../store/settings-store";

export function SocialPresenceCard() {
  const { profile, updateProfileField } = useSettingsStore();

  return (
    <section className="bg-card border border-border rounded-xl p-lg shadow-sm sticky top-24">
      <div className="flex items-center gap-md mb-lg">
        <span className="material-symbols-outlined text-primary text-[32px]">
          public
        </span>
        <h5 className="text-xl font-bold text-foreground">Social Presence</h5>
      </div>

      <div className="space-y-lg">
        <div className="space-y-xs">
          <label className="font-label-md text-label-md text-muted-foreground flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">link</span>{" "}
            LinkedIn
          </label>
          <input
            className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-sm transition-all"
            type="url"
            value={profile?.linkedin_url || ""}
            onChange={(e) => updateProfileField("linkedin_url", e.target.value)}
          />
        </div>
        <div className="space-y-xs">
          <label className="font-label-md text-label-md text-muted-foreground flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">code</span>{" "}
            GitHub
          </label>
          <input
            className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-sm transition-all"
            type="url"
            value={profile?.github_url || ""}
            onChange={(e) => updateProfileField("github_url", e.target.value)}
          />
        </div>
        <div className="space-y-xs">
          <label className="font-label-md text-label-md text-muted-foreground flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">
              language
            </span>{" "}
            Website
          </label>
          <input
            className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-sm transition-all"
            type="url"
            value={profile?.website_url || ""}
            onChange={(e) => updateProfileField("website_url", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-xl pt-lg border-t border-border text-center">
        <p className="font-body-sm text-body-sm text-muted-foreground mb-md">
          These links will be displayed in your resume header.
        </p>
        <Button
          variant="outline"
          className="w-full text-primary border-primary hover:bg-primary/5"
        >
          Preview Web Profile
        </Button>
      </div>
    </section>
  );
}
