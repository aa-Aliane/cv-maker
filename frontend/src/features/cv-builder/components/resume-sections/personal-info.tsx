"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, ChevronDown } from "lucide-react";

import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import { useUiStore } from "@/features/cv-builder/store/ui";
import {
  personalInfoSchema,
  PersonalInfoFormData,
} from "@/features/cv-builder/schemas/cv";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import React from "react";

// ... primitives ...
const inputClass =
  "w-full px-3 py-2 bg-background border border-input rounded-md text-sm outline-none " +
  "focus:ring-2 focus:ring-ring focus:border-ring transition-all";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  error?: string;
}

const FieldWrapper: React.FC<Props> = ({
  label,
  error,
  className,
  children,
}) => {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <label className="text-sm font-semibold text-muted-foreground">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function PersonalInfoSection() {
  const isCollapsed = useUiStore((s) => s.collapsedSections["personal-info"] ?? false);
  const toggleSection = useUiStore((s) => s.toggleSection);
  
  const personalInfo = useCvStore((s) => s.cvData.personalInfo);
  const updatePersonalInfo = useCvStore((s) => s.updatePersonalInfo);

  const {
    control,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo, // seed once from store on mount
    mode: "onChange",
  });

  return (
    <Collapsible
      open={!isCollapsed}
      onOpenChange={() => toggleSection("personal-info")}
      className="bg-card p-6 border border-border rounded-xl space-y-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-card-foreground">
            Personal Information
          </h3>
        </div>
        <CollapsibleTrigger asChild>
          <button className="text-muted-foreground/50 hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent">
            <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isCollapsed && "-rotate-90")} />
            <span className="sr-only">Toggle section</span>
          </button>
        </CollapsibleTrigger>
      </div>

      {/* Grid */}
      <CollapsibleContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in duration-200">
        <FieldWrapper label="Full Name" error={errors.fullName?.message}>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e); // RHF: validate + track
                  updatePersonalInfo({ fullName: e.target.value }); // Zustand: push to preview
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="Professional Title" error={errors.title?.message}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g. Senior Product Designer"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ title: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="Email Address" error={errors.email?.message}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ email: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="Phone Number" error={errors.phone?.message}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="tel"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ phone: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="LinkedIn URL" error={errors.linkedin?.message}>
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="linkedin.com/in/username"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ linkedin: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper label="Photo URL" error={errors.photo?.message}>
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ photo: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Location"
          error={errors.location?.message}
        >
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={inputClass}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ location: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Professional Summary"
          error={errors.summary?.message}
          className="sm:col-span-2"
        >
          <Controller
            name="summary"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={4}
                className={`${inputClass} resize-none`}
                onChange={(e) => {
                  field.onChange(e);
                  updatePersonalInfo({ summary: e.target.value });
                }}
              />
            )}
          />
        </FieldWrapper>
      </CollapsibleContent>
    </Collapsible>
  );
}
