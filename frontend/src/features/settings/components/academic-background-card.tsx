"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "../store/settings-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { MonthPicker } from "@/components/ui/month-picker";

export function AcademicBackgroundCard() {
  const educations = useSettingsStore((state) => state.educations);
  const educationDrafts = useSettingsStore((state) => state.educationDrafts);
  const expandedEducationIds = useSettingsStore(
    (state) => state.expandedEducationIds,
  );
  const addEducation = useSettingsStore((state) => state.addEducation);
  const toggleEducation = useSettingsStore((state) => state.toggleEducation);
  const updateEducationDraft = useSettingsStore(
    (state) => state.updateEducationDraft,
  );
  const confirmEducation = useSettingsStore((state) => state.confirmEducation);
  const clearEducation = useSettingsStore((state) => state.clearEducation);
  const removeEducation = useSettingsStore((state) => state.removeEducation);

  // Derived state from the store
  const activeId =
    expandedEducationIds.length > 0
      ? expandedEducationIds[expandedEducationIds.length - 1]
      : null;
  const isOpen = !!activeId;
  const currentDraft = activeId ? educationDrafts[activeId] : null;
  const isEditing = activeId ? educations.some((e) => e.id === activeId) : false;

  const handleOpenChange = (open: boolean) => {
    if (!open && activeId) {
      toggleEducation(activeId);
    }
  };

  return (
    <section className="lg:col-span-12">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
        <div className="flex justify-between items-center mb-lg">
          <div className="flex items-center gap-md">
            <h5 className="text-xl font-bold text-foreground">
              Academic Background
            </h5>
          </div>
          <Button
            onClick={() => addEducation()}
            className="flex items-center gap-xs bg-primary-container text-on-primary-container hover:opacity-90 border-none shadow-none"
          >
            <span className="material-symbols-outlined">add</span> Add Education
          </Button>
        </div>

        <div className="space-y-lg">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="group relative bg-muted/30 border border-border rounded-xl transition-all hover:bg-muted/50 overflow-hidden p-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex-1 flex items-center gap-md cursor-pointer select-none"
                  onClick={() => toggleEducation(edu.id)}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">
                      {edu.institution || "Untitled Institution"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {edu.degree || "Untitled Degree"}
                      {edu.field_of_study && ` • ${edu.field_of_study}`}
                      {edu.start_date && ` • ${edu.start_date}`}
                      {edu.start_date &&
                        ` - ${edu.is_current ? "Present" : edu.end_date || "..."}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleEducation(edu.id)}
                    className="h-8 w-8 p-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEducation(edu.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      delete_outline
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {educations.length === 0 && (
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
              <Button
                variant="ghost"
                onClick={() => addEducation()}
                className="text-primary hover:bg-primary/5 h-auto py-2"
              >
                <span className="material-symbols-outlined mr-xs">
                  add_circle
                </span>
                Add your first education
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px] gap-0 p-0">
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold">
                {isEditing ? "Edit Education" : "New Education"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update your education details below."
                  : "Add a new education entry to your profile."}
              </DialogDescription>
            </DialogHeader>

            {activeId && currentDraft && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Institution
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
                    type="text"
                    placeholder="e.g. Stanford University"
                    value={currentDraft.institution || ""}
                    onChange={(e) =>
                      updateEducationDraft(activeId, {
                        institution: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Degree
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
                      type="text"
                      placeholder="e.g. Bachelor of Arts"
                      value={currentDraft.degree || ""}
                      onChange={(e) =>
                        updateEducationDraft(activeId, {
                          degree: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Field of Study
                    </label>
                    <input
                      className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
                      type="text"
                      placeholder="e.g. Graphic Design"
                      value={currentDraft.field_of_study || ""}
                      onChange={(e) =>
                        updateEducationDraft(activeId, {
                          field_of_study: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Start Date
                    </label>
                    <MonthPicker
                      value={currentDraft.start_date || ""}
                      onChange={(date) =>
                        updateEducationDraft(activeId, { start_date: date })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      End Date
                    </label>
                    <MonthPicker
                      disabled={currentDraft.is_current}
                      value={currentDraft.end_date || ""}
                      onChange={(date) =>
                        updateEducationDraft(activeId, { end_date: date })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id="is_current"
                    checked={currentDraft.is_current || false}
                    onChange={(e) =>
                      updateEducationDraft(activeId, {
                        is_current: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="is_current"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Currently studying here
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Description (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                    rows={4}
                    placeholder="Briefly describe your coursework, achievements, or research focus..."
                    value={currentDraft.description || ""}
                    onChange={(e) =>
                      updateEducationDraft(activeId, {
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 py-4 bg-muted/50 border-t rounded-b-xl flex sm:justify-end gap-3 m-0">
            <Button
              variant="outline"
              onClick={() => activeId && clearEducation(activeId)}
              className="bg-background"
            >
              Clear
            </Button>
            <Button
              onClick={() => activeId && confirmEducation(activeId)}
              className="bg-primary hover:opacity-90"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
