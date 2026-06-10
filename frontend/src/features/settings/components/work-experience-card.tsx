"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "../store/settings-store";
import { WorkExperience } from "@/features/cv-builder/types";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function WorkExperienceCard() {
  const { experiences, experienceDrafts, addExperience } = useSettingsStore();

  // Combined list of IDs to render
  const allIds = Array.from(
    new Set([
      ...experiences.map((e) => e.id),
      ...Object.keys(experienceDrafts),
    ])
  );

  return (
    <section className="lg:col-span-12">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
        <div className="flex justify-between items-center mb-lg">
          <div className="flex items-center gap-md">
            <h5 className="text-xl font-bold text-foreground">
              Work Experience
            </h5>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-xs bg-primary-container text-on-primary-container px-md py-sm rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined">add</span> Add
            Experience
          </button>
        </div>

        <div className="space-y-lg">
          {allIds.map((id) => (
            <ExperienceItem key={id} id={id} />
          ))}
          {allIds.length === 0 && (
            <div className="flex flex-col items-center justify-center p-xl bg-primary-container/5 border border-dashed border-primary/20 rounded-xl text-center space-y-md">
              <div className="space-y-xs">
                <h5 className="font-headline-md text-primary font-bold">
                  Your professional journey starts here
                </h5>

                <p className="font-body-md text-secondary max-w-md mx-auto">
                  Add your first role to begin building your career timeline.
                  Our architect will help you structure it for maximum impact.
                </p>
              </div>

              <button
                onClick={addExperience}
                className="mt-md inline-flex items-center gap-xs text-primary border-b border-transparent hover:border-current transition-colors"
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add your first experience</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ id }: { id: string }) {
  const {
    experiences,
    experienceDrafts,
    expandedExperienceIds,
    updateExperienceDraft,
    confirmExperience,
    clearExperience,
    toggleExperience,
    removeExperience,
  } = useSettingsStore();

  const confirmed = experiences.find((e) => e.id === id);
  const draft = experienceDrafts[id];
  const isOpen = expandedExperienceIds.includes(id);

  // Use draft if editing, otherwise confirmed
  const displayData = draft || confirmed;

  if (!displayData) return null;

  const isValid = !!(draft?.company?.trim() && draft?.position?.trim());

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => toggleExperience(id)}
      className="group relative bg-muted/30 border border-border rounded-xl transition-all hover:bg-muted/50 overflow-hidden"
    >
      <div className="flex items-center justify-between p-md">
        <CollapsibleTrigger asChild>
          <div className="flex-1 flex items-center gap-md cursor-pointer select-none">
            <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab bg-card border border-border rounded shadow-sm p-1 text-muted-foreground">
              <span className="material-symbols-outlined text-[16px]">
                drag_indicator
              </span>
            </div>

            <div className="flex flex-col ml-sm">
              {!isOpen ? (
                <>
                  <span className="font-bold text-foreground">
                    {confirmed?.company || "Untitled Company"}
                  </span>
                  <span className="text-body-sm text-secondary">
                    {confirmed?.position || "Untitled Position"}
                    {confirmed?.start_date && ` • ${confirmed.start_date}`}
                    {confirmed?.start_date &&
                      ` - ${confirmed.is_current ? "Present" : confirmed.end_date || "..."}`}
                  </span>
                </>
              ) : (
                <span className="font-bold text-primary">
                  {confirmed ? "Edit Experience" : "New Experience"}
                </span>
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <div className="flex items-center gap-sm">
          {!isOpen && (
            <button
              onClick={() => removeExperience(id)}
              className="text-destructive hover:bg-destructive/10 p-xs rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                delete_outline
              </span>
            </button>
          )}
          <CollapsibleTrigger asChild>
            <button className="p-xs hover:bg-muted rounded transition-colors">
              <span
                className={`material-symbols-outlined transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                expand_more
              </span>
            </button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="px-md pb-md">
        <div className="h-[1px] bg-border/50 mb-md" />
        <div className="ml-sm grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Company
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-md transition-all"
              type="text"
              value={draft?.company || ""}
              onChange={(e) =>
                updateExperienceDraft(id, { company: e.target.value })
              }
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Position
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-md transition-all"
              type="text"
              value={draft?.position || ""}
              onChange={(e) =>
                updateExperienceDraft(id, { position: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-muted-foreground block">
                Start Date
              </label>
              <input
                className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-sm transition-all"
                type="month"
                value={draft?.start_date || ""}
                onChange={(e) =>
                  updateExperienceDraft(id, { start_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-muted-foreground block">
                End Date
              </label>
              <input
                className={`w-full px-md py-[8px] border border-border rounded-md outline-none text-body-sm transition-all ${
                  draft?.is_current
                    ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
                    : "bg-background focus:ring-2 focus:ring-ring"
                }`}
                disabled={draft?.is_current}
                type="month"
                value={draft?.end_date || ""}
                onChange={(e) =>
                  updateExperienceDraft(id, { end_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-md cursor-pointer">
              <input
                type="checkbox"
                checked={draft?.is_current || false}
                onChange={(e) =>
                  updateExperienceDraft(id, { is_current: e.target.checked })
                }
                className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary focus:ring-2 bg-background cursor-pointer"
              />
              <span className="font-label-md text-label-md text-foreground">
                Currently in this role
              </span>
            </label>
          </div>

          <div className="md:col-span-2 space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Description
            </label>
            <textarea
              className="w-full px-md py-sm border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-sm transition-all resize-none"
              rows={3}
              value={draft?.description || ""}
              onChange={(e) =>
                updateExperienceDraft(id, { description: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-md mt-sm">
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearExperience(id)}
              className="px-lg"
            >
              Clear
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => confirmExperience(id)}
              disabled={!isValid}
              className="px-lg"
            >
              Confirm
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
