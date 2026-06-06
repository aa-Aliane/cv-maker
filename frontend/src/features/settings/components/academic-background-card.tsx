"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useSettingsStore } from "../store/settings-store";
import { Education } from "@/features/cv-builder/types";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AcademicBackgroundCard() {
  const { educations, addEducation } = useSettingsStore();

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
          {educations?.map((edu: Education) => (
            <EducationItem key={edu.id} education={edu} />
          ))}
          {(!educations || educations.length === 0) && (
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

function EducationItem({ education }: { education: Education }) {
  const { updateEducation, removeEducation } = useSettingsStore();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
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
              <span className="font-bold text-foreground">
                {education.institution || "Untitled Institution"}
              </span>
              <span className="text-body-sm text-secondary">
                {education.degree || "Untitled Degree"}
                {education.field_of_study && ` • ${education.field_of_study}`}
                {education.start_date && ` • ${education.start_date}`}
                {education.start_date &&
                  ` - ${education.is_current ? "Present" : education.end_date || "..."}`}
              </span>
            </div>
          </div>
        </CollapsibleTrigger>

        <div className="flex items-center gap-sm">
          <button
            onClick={() => removeEducation(education.id)}
            className="text-destructive hover:bg-destructive/10 p-xs rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              delete_outline
            </span>
          </button>
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
              value={education.institution}
              onChange={(e) =>
                updateEducation(education.id, { institution: e.target.value })
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
              value={education.degree}
              onChange={(e) =>
                updateEducation(education.id, { degree: e.target.value })
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
              value={education.field_of_study}
              onChange={(e) =>
                updateEducation(education.id, {
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
              <input
                className="w-full px-md py-[8px] border border-border rounded-md bg-background focus:ring-2 focus:ring-ring outline-none text-body-sm transition-all"
                type="month"
                value={education.start_date}
                onChange={(e) =>
                  updateEducation(education.id, { start_date: e.target.value })
                }
              />
            </div>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-muted-foreground block">
                End Date
              </label>
              <input
                className={`w-full px-md py-[8px] border border-border rounded-md outline-none text-body-sm transition-all ${
                  education.is_current
                    ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
                    : "bg-background focus:ring-2 focus:ring-ring"
                }`}
                disabled={education.is_current}
                type="month"
                value={education.end_date || ""}
                onChange={(e) =>
                  updateEducation(education.id, { end_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-md cursor-pointer">
              <input
                type="checkbox"
                checked={education.is_current}
                onChange={(e) =>
                  updateEducation(education.id, {
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
              value={education.description || ""}
              onChange={(e) =>
                updateEducation(education.id, { description: e.target.value })
              }
            />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
