"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "../store/settings-store";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { MonthPicker } from "@/components/ui/month-picker";

export function AcademicBackgroundCard() {
  const { educations, educationDrafts, addEducation } = useSettingsStore();

  // Combined list of IDs to render
  const allIds = Array.from(
    new Set([...educations.map((e) => e.id), ...Object.keys(educationDrafts)]),
  );

  return (
    <section className="lg:col-span-12">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
        <div className="flex justify-between items-center mb-lg">
          <div className="flex items-center gap-md">
            <h5 className="text-xl font-bold text-foreground">
              Academic Background
            </h5>
          </div>
          <button
            onClick={addEducation}
            className="flex items-center gap-xs bg-primary-container text-on-primary-container px-md py-sm rounded-lg font-label-md text-label-md hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined">add</span> Add Education
          </button>
        </div>

        <div className="space-y-lg">
          {allIds.map((id) => (
            <EducationItem key={id} id={id} />
          ))}
          {allIds.length === 0 && (
            <div className="flex flex-col items-center justify-center p-xl bg-primary-container/5 border border-dashed border-primary/20 rounded-xl text-center space-y-md">
              <div className="space-y-xs">
                <h5 className="font-headline-md text-primary font-bold">
                  Your academic journey
                </h5>

                <p className="font-body-md text-secondary max-w-md mx-auto">
                  Add your degrees and certifications to showcase your
                  educational foundation.
                </p>
              </div>

              <button
                onClick={addEducation}
                className="mt-md inline-flex items-center gap-xs text-primary border-b border-transparent hover:border-current transition-colors"
              >
                <span className="material-symbols-outlined">add_circle</span>
                <span>Add your first education</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EducationItem({ id }: { id: string }) {
  const {
    educations,
    educationDrafts,
    expandedEducationIds,
    updateEducationDraft,
    confirmEducation,
    clearEducation,
    toggleEducation,
    removeEducation,
  } = useSettingsStore();

  const confirmed = educations.find((e) => e.id === id);
  const draft = educationDrafts[id];
  const isOpen = expandedEducationIds.includes(id);

  // Use draft if editing, otherwise confirmed
  const displayData = draft || confirmed;

  if (!displayData) return null;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => toggleEducation(id)}
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
                    {confirmed?.institution || "Untitled Institution"}
                  </span>
                  <span className="text-body-sm text-secondary">
                    {confirmed?.degree || "Untitled Degree"}
                    {confirmed?.field_of_study &&
                      ` • ${confirmed.field_of_study}`}
                    {confirmed?.start_date && ` • ${confirmed.start_date}`}
                    {confirmed?.start_date &&
                      ` - ${confirmed.is_current ? "Present" : confirmed.end_date || "..."}`}
                  </span>
                </>
              ) : (
                <span className="font-bold text-primary">
                  {confirmed ? "Edit Education" : "New Education"}
                </span>
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <div className="flex items-center gap-sm">
          {!isOpen && (
            <button
              onClick={() => removeEducation(id)}
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
              Institution
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-md transition-all"
              type="text"
              value={draft?.institution || ""}
              onChange={(e) =>
                updateEducationDraft(id, { institution: e.target.value })
              }
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Degree
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-md transition-all"
              type="text"
              value={draft?.degree || ""}
              onChange={(e) =>
                updateEducationDraft(id, { degree: e.target.value })
              }
            />
          </div>
          <div className="space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Field of Study
            </label>
            <input
              className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-md transition-all"
              type="text"
              value={draft?.field_of_study || ""}
              onChange={(e) =>
                updateEducationDraft(id, {
                  field_of_study: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-muted-foreground block">
                Start Date
              </label>
              <MonthPicker
                value={draft?.start_date || ""}
                onChange={(date) =>
                  updateEducationDraft(id, { start_date: date })
                }
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-muted-foreground block">
                End Date
              </label>
              <MonthPicker
                disabled={draft?.is_current}
                value={draft?.end_date || ""}
                onChange={(date) =>
                  updateEducationDraft(id, { end_date: date })
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
                  updateEducationDraft(id, {
                    is_current: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded-sm border-border text-primary focus:ring-primary focus:ring-2 bg-background cursor-pointer"
              />
              <span className="font-label-md text-label-md text-foreground">
                Currently studying here
              </span>
            </label>
          </div>

          <div className="md:col-span-2 space-y-xs">
            <label className="font-label-md text-label-md text-muted-foreground block">
              Description (Optional)
            </label>
            <textarea
              className="w-full px-md py-sm border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-sm transition-all resize-none"
              rows={2}
              value={draft?.description || ""}
              onChange={(e) =>
                updateEducationDraft(id, { description: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-md mt-sm">
            <Button
              variant="outline"
              size="sm"
              onClick={() => clearEducation(id)}
              className="px-lg"
            >
              Clear
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => confirmEducation(id)}
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
