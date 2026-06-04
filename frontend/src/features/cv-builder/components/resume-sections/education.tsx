"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Plus, X, ChevronDown } from "lucide-react";

import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import { useUiStore } from "@/features/cv-builder/store/ui";
import { Education } from "@/features/cv-builder/types";
import {
  educationSchema,
  EducationFormData,
} from "@/features/cv-builder/schemas/cv";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import React from "react";

const inputClass =
  "w-full px-3 py-1.5 bg-background border border-input rounded text-sm outline-none " +
  "focus:ring-2 focus:ring-ring transition-all";

// ---------------------------------------------------------------------------
// Single education entry — owns its own RHF instance
// ---------------------------------------------------------------------------

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  edu: Education;
}
const EducationItem: React.FC<Props> = ({ edu }) => {
  const updateEducation = useCvStore((s) => s.updateEducation);
  const removeEducation = useCvStore((s) => s.removeEducation);

  const {
    control,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: { institution: edu.institution, degree: edu.degree, note: edu.note },
    mode: "onChange",
  });

  return (
    <div className="relative space-y-3 p-3 bg-muted/50 rounded-lg border border-border/50">
      {/* Remove button */}
      <button
        type="button"
        onClick={() => removeEducation(edu.id)}
        className="absolute top-2.5 right-2.5 text-muted-foreground/50 hover:text-destructive transition-colors"
        aria-label="Remove education"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Institution */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground">
          Institution
        </label>
        <Controller
          name="institution"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={inputClass}
              onChange={(e) => {
                field.onChange(e);
                updateEducation(edu.id, { institution: e.target.value });
              }}
            />
          )}
        />
        {errors.institution && (
          <p className="text-xs text-destructive">{errors.institution.message}</p>
        )}
      </div>

      {/* Degree */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground">Degree</label>
        <Controller
          name="degree"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={inputClass}
              onChange={(e) => {
                field.onChange(e);
                updateEducation(edu.id, { degree: e.target.value });
              }}
            />
          )}
        />
        {errors.degree && (
          <p className="text-xs text-destructive">{errors.degree.message}</p>
        )}
      </div>

      {/* Note */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-muted-foreground">Note (e.g. GPA, Honors)</label>
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={inputClass}
              onChange={(e) => {
                field.onChange(e);
                updateEducation(edu.id, { note: e.target.value });
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function EducationSection() {
  const isCollapsed = useUiStore((s) => s.collapsedSections["education"] ?? false);
  const toggleSection = useUiStore((s) => s.toggleSection);

  const education = useCvStore((s) => s.cvData.education);
  const addEducation = useCvStore((s) => s.addEducation);

  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={() => toggleSection("education")}
      className="bg-card p-6 border border-border rounded-xl space-y-4 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-card-foreground">Education</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addEducation();
            }}
            className="text-primary font-semibold text-xs flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
          <CollapsibleTrigger asChild>
            <button className="text-muted-foreground/50 hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent">
              <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isCollapsed && "-rotate-90")} />
              <span className="sr-only">Toggle section</span>
            </button>
          </CollapsibleTrigger>
        </div>
      </div>

      {/* List */}
      <CollapsibleContent className="space-y-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-200">
        {education.length === 0 && (
          <p className="text-xs text-muted-foreground italic">
            No education added yet.
          </p>
        )}
        {education.map((edu) => (
          <EducationItem key={edu.id} edu={edu} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
