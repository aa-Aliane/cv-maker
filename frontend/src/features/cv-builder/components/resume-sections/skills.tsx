"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Zap, Plus, X, ChevronDown } from "lucide-react";

import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import { useUiStore } from "@/features/cv-builder/store/ui";
import { skillSchema, SkillFormData } from "@/features/cv-builder/schemas/cv";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export default function SkillsSection() {
  const isCollapsed = useUiStore((s) => s.collapsedSections["skills"] ?? false);
  const toggleSection = useUiStore((s) => s.toggleSection);

  const skills = useCvStore((s) => s.cvData.skills);
  const addSkill = useCvStore((s) => s.addSkill);
  const removeSkill = useCvStore((s) => s.removeSkill);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
  });

  const onSubmit = ({ name }: SkillFormData) => {
    const trimmed = name.trim();
    // Prevent duplicates (case-insensitive)
    if (!skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      addSkill(trimmed);
    }
    reset();
  };

  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={() => toggleSection("skills")}
      className="bg-card p-6 border border-border rounded-xl space-y-4 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="text-base font-bold text-card-foreground">Skills</h3>
        </div>
        <CollapsibleTrigger asChild>
          <button className="text-muted-foreground/50 hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent">
            <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isCollapsed && "-rotate-90")} />
            <span className="sr-only">Toggle section</span>
          </button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="space-y-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-200">
        {/* Tag cloud */}
        <div className="flex flex-wrap gap-2 min-h-[32px]">
          {skills.length === 0 && (
            <p className="text-xs text-muted-foreground italic self-center">
              No skills added yet.
            </p>
          )}
          {skills.map((skill) => (
            <span
              key={skill}
              className="group px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full border border-border flex items-center gap-1.5 transition-all hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-muted-foreground/50 group-hover:text-destructive transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add skill — RHF handles validation, no prompt() */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
          <div className="flex-1">
            <input
              {...register("name")}
              type="text"
              placeholder="e.g. TypeScript"
              className="w-full px-3 py-1.5 bg-background border border-input rounded-md text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all"
            />
            {errors.name && (
              <p className="text-xs text-destructive mt-0.5">{errors.name.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-md border border-primary/20 hover:bg-primary/20 transition-colors flex items-center gap-1 flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </form>
      </CollapsibleContent>
    </Collapsible>
  );
}
