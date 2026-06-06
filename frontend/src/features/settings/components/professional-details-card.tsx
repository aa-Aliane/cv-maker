"use client";

import React from "react";
import { useSettingsStore } from "../store/settings-store";

export function ProfessionalDetailsCard() {
  const { profile, updateProfileField } = useSettingsStore();

  return (
    <section className="bg-card border border-border rounded-xl p-lg shadow-sm">
      <div className="flex items-center gap-md mb-lg">
        <h5 className="text-xl font-bold text-foreground">
          Professional Details
        </h5>
      </div>

      <div className="space-y-md">
        <div className="space-y-xs">
          <label className="font-label-md text-label-md text-muted-foreground block">
            Professional Bio
          </label>
          <textarea
            className="w-full px-md py-sm border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all resize-none"
            rows={4}
            value={profile?.bio || ""}
            onChange={(e) => updateProfileField("bio", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Phone Number
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all"
              type="tel"
              value={profile?.phone_number || ""}
              onChange={(e) =>
                updateProfileField("phone_number", e.target.value)
              }
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Location
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all"
              type="text"
              value={profile?.location || ""}
              onChange={(e) => updateProfileField("location", e.target.value)}
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Driving License
            </label>
            <select
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring focus:border-ring outline-none text-body-md transition-all"
              value={profile?.driving_license || "None"}
              onChange={(e) =>
                updateProfileField("driving_license", e.target.value)
              }
            >
              <option value="Class C (Standard)">Class C (Standard)</option>
              <option value="Class A (Commercial)">Class A (Commercial)</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
