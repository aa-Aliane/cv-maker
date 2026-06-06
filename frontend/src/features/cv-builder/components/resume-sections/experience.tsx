"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Plus, X, GripVertical, ChevronDown } from "lucide-react";

import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import { useUiStore } from "@/features/cv-builder/store/ui";
import { WorkExperience } from "@/features/cv-builder/types";
import {
  experienceSchema,
  ExperienceFormData,
} from "@/features/cv-builder/schemas/cv";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full px-3 py-2 border border-input rounded bg-background text-sm outline-none " +
  "focus:ring-2 focus:ring-ring transition-all";

// ---------------------------------------------------------------------------
// Single experience entry — owns its own RHF instance
// ---------------------------------------------------------------------------

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  exp: WorkExperience;
}
const ExperienceItem: React.FC<Props> = ({ exp }) => {
  const updateExperience = useCvStore((s) => s.updateExperience);
  const removeExperience = useCvStore((s) => s.removeExperience);

  const {
    control,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: exp.company,
      role: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      responsibilities: exp.responsibilities,
    },
    mode: "onChange",
  });

  return (
    <div className="relative p-4 border border-border rounded-lg bg-muted/50 group">
      {/* Drag handle — wired to dnd-kit later */}
      <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab p-1 bg-card border border-border rounded shadow-sm text-muted-foreground hover:text-foreground">
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => removeExperience(exp.id)}
        className="absolute top-3 right-3 text-muted-foreground/30 hover:text-destructive transition-colors"
        aria-label="Remove experience"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Company</label>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updateExperience(exp.id, { company: e.target.value });
                }}
              />
            )}
          />
          {errors.company && (
            <p className="text-xs text-destructive">{errors.company.message}</p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">Role</label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updateExperience(exp.id, { role: e.target.value });
                }}
              />
            )}
          />
          {errors.role && (
            <p className="text-xs text-destructive">{errors.role.message}</p>
          )}
        </div>

        {/* Start Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Start Date
          </label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. Jan 2021"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updateExperience(exp.id, { startDate: e.target.value });
                }}
              />
            )}
          />
          {errors.startDate && (
            <p className="text-xs text-destructive">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            End Date
            <span className="ml-1 font-normal text-muted-foreground/50">
              (or leave blank for Present)
            </span>
          </label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. Mar 2024"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updateExperience(exp.id, { endDate: e.target.value });
                }}
              />
            )}
          />
        </div>

        {/* Responsibilities */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">
            Key Responsibilities
          </label>
          <Controller
            name="responsibilities"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                placeholder={
                  "• Describe your key achievements and responsibilities\n• One bullet per line"
                }
                className={`${inputClass} resize-none leading-relaxed`}
                onChange={(e) => {
                  field.onChange(e);
                  updateExperience(exp.id, {
                    responsibilities: e.target.value,
                  });
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function ExperienceSection() {
  const isCollapsed = useUiStore((s) => s.collapsedSections["experience"] ?? false);
  const toggleSection = useUiStore((s) => s.toggleSection);

  const experience = useCvStore((s) => s.cvData.experience);
  const addExperience = useCvStore((s) => s.addExperience);

  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={() => toggleSection("experience")}
      className="bg-card p-6 border border-border rounded-xl space-y-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-card-foreground">Work Experience</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addExperience();
            }}
            className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Experience
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
      <CollapsibleContent className="space-y-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-200">
        {experience.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No experience added yet.
          </p>
        )}
        {experience.map((exp) => (
          <ExperienceItem key={exp.id} exp={exp} />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
