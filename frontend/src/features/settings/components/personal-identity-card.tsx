"use client";

import React from "react";
import { useSettingsStore } from "../store/settings-store";

export function PersonalIdentityCard() {
  const { user, profile, setUserField, updateProfileField } =
    useSettingsStore();

  return (
    <section className="bg-card border border-border rounded-xl p-lg shadow-sm">
      <div className="flex items-center gap-md mb-lg">
        <h5 className="text-xl font-bold text-foreground">Personal Identity</h5>
      </div>

      <div className="flex flex-col md:flex-row gap-lg">
        {/* Avatar Setup */}
        <div className="flex-shrink-0 flex flex-col items-center gap-sm">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-muted shadow-inner group">
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              {profile?.picture_url ? (
                <img
                  src={profile.picture_url}
                  alt={`${user?.first_name} ${user?.last_name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[48px]">
                  account_circle
                </span>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-white">
                photo_camera
              </span>
            </div>
          </div>
          <button className="font-label-md text-label-sm text-primary hover:underline">
            Change Photo
          </button>
        </div>

        {/* Inputs */}
        <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              First Name
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all"
              type="text"
              value={user?.first_name || ""}
              onChange={(e) => setUserField("first_name", e.target.value)}
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Last Name
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all"
              type="text"
              value={user?.last_name || ""}
              onChange={(e) => setUserField("last_name", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2 space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Headline
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all"
              type="text"
              value={profile?.headline || ""}
              onChange={(e) => updateProfileField("headline", e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
