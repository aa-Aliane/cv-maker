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

export function WorkExperienceCard() {
  const experiences = useSettingsStore((state) => state.experiences);
  const experienceDrafts = useSettingsStore((state) => state.experienceDrafts);
  const expandedExperienceIds = useSettingsStore(
    (state) => state.expandedExperienceIds,
  );
  const addExperience = useSettingsStore((state) => state.addExperience);
  const toggleExperience = useSettingsStore((state) => state.toggleExperience);
  const updateExperienceDraft = useSettingsStore(
    (state) => state.updateExperienceDraft,
  );
  const confirmExperience = useSettingsStore(
    (state) => state.confirmExperience,
  );
  const clearExperience = useSettingsStore((state) => state.clearExperience);
  const removeExperience = useSettingsStore((state) => state.removeExperience);

  // Derived state from the store
  const activeId =
    expandedExperienceIds.length > 0
      ? expandedExperienceIds[expandedExperienceIds.length - 1]
      : null;
  const isOpen = !!activeId;
  const currentDraft = activeId ? experienceDrafts[activeId] : null;
  const isEditing = activeId
    ? experiences.some((e) => e.id === activeId)
    : false;

  const handleOpenChange = (open: boolean) => {
    if (!open && activeId) {
      toggleExperience(activeId);
    }
  };

  const isValid = !!(
    currentDraft?.company?.trim() && currentDraft?.position?.trim()
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
          <Button
            onClick={() => addExperience()}
            className="flex items-center gap-xs bg-primary-container text-on-primary-container hover:opacity-90 border-none shadow-none"
          >
            <span className="material-symbols-outlined">add</span> Add
            Experience
          </Button>
        </div>

        <div className="space-y-lg">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group relative bg-muted/30 border border-border rounded-xl transition-all hover:bg-muted/50 overflow-hidden p-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex-1 flex items-center gap-md cursor-pointer select-none"
                  onClick={() => toggleExperience(exp.id as string)}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">
                      {exp.company || "Untitled Company"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {exp.position || "Untitled Position"}
                      {exp.start_date && ` • ${exp.start_date}`}
                      {exp.start_date &&
                        ` - ${exp.is_current ? "Present" : exp.end_date || "..."}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-sm">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExperience(exp.id)}
                    className="h-8 w-8 p-0"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      edit
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
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

          {experiences.length === 0 && (
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
              <Button
                variant="ghost"
                onClick={() => addExperience()}
                className="text-primary hover:bg-primary/5 h-auto py-2"
              >
                <span className="material-symbols-outlined mr-xs">
                  add_circle
                </span>
                Add your first experience
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px] gap-0 p-0 overflow-hidden">
          <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-bold">
                {isEditing ? "Edit Experience" : "New Experience"}
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? "Update your professional experience details below."
                  : "Add a new work experience entry to your profile."}
              </DialogDescription>
            </DialogHeader>

            {activeId && currentDraft && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Company
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
                    type="text"
                    placeholder="e.g. Google"
                    value={currentDraft.company || ""}
                    onChange={(e) =>
                      updateExperienceDraft(activeId, {
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Position
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all placeholder:text-muted-foreground/50"
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    value={currentDraft.position || ""}
                    onChange={(e) =>
                      updateExperienceDraft(activeId, {
                        position: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">
                      Start Date
                    </label>
                    <MonthPicker
                      value={currentDraft.start_date || ""}
                      onChange={(date) =>
                        updateExperienceDraft(activeId, { start_date: date })
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
                        updateExperienceDraft(activeId, { end_date: date })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 py-1">
                  <input
                    type="checkbox"
                    id="is_current_role"
                    checked={currentDraft.is_current || false}
                    onChange={(e) =>
                      updateExperienceDraft(activeId, {
                        is_current: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="is_current_role"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Currently in this role
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                    rows={3}
                    placeholder="Briefly describe your role and impact..."
                    value={currentDraft.description || ""}
                    onChange={(e) =>
                      updateExperienceDraft(activeId, {
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground block">
                    Highlights
                  </label>
                  <div className="space-y-2">
                    {(currentDraft.bullets || []).map((bullet, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
                        <input
                          className="flex-1 px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-sm transition-all placeholder:text-muted-foreground/50"
                          type="text"
                          value={bullet}
                          placeholder="e.g. Led a team of 5 engineers"
                          onChange={(e) => {
                            const updated = [...(currentDraft.bullets || [])];
                            updated[index] = e.target.value;
                            updateExperienceDraft(activeId, {
                              bullets: updated,
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            const updated = (currentDraft.bullets || []).filter(
                              (_, i) => i !== index,
                            );
                            updateExperienceDraft(activeId, {
                              bullets: updated,
                            });
                          }}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            close
                          </span>
                        </button>
                      </div>
                    ))}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateExperienceDraft(activeId, {
                          bullets: [...(currentDraft.bullets || []), ""],
                        })
                      }
                      className="text-primary hover:bg-primary/5 p-0 h-auto font-medium text-sm flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        add
                      </span>
                      Add bullet
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 py-4 bg-muted/50 border-t rounded-b-xl flex sm:justify-end gap-3 m-0">
            <Button
              variant="outline"
              onClick={() => activeId && clearExperience(activeId)}
              className="bg-background"
            >
              Clear
            </Button>
            <Button
              onClick={() => activeId && confirmExperience(activeId)}
              disabled={!isValid}
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
