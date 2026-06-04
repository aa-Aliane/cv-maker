# Tree View:
```
src/features
├── auth
│   ├── components
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── hooks
│   │   └── use-auth.ts
│   ├── queries
│   │   └── use-auth-mutations.ts
│   └── types.ts
├── cv-builder
│   ├── components
│   │   ├── form-wizard
│   │   │   └── index.tsx
│   │   ├── resume-sections
│   │   │   ├── education.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── index.tsx
│   │   │   ├── personal-info.tsx
│   │   │   └── skills.tsx
│   │   └── section-sorter.tsx
│   ├── hooks
│   │   ├── use-autosave.ts
│   │   └── use-cv-history.ts
│   ├── schemas
│   │   └── cv.ts
│   ├── store
│   │   ├── cv-builder-store.ts
│   │   └── ui.ts
│   ├── types.ts
│   └── utils
│       ├── json-exporter.ts
│       └── pdf-generator.ts
├── cv-viewer
│   ├── components
│   │   ├── cv-render-engine.tsx
│   │   └── profile-header.tsx
│   ├── templates
│   │   ├── creative.tsx
│   │   ├── minimalist.tsx
│   │   └── modern.tsx
│   └── types.ts
└── social
    ├── actions.ts
    ├── components
    │   ├── comment-section.tsx
    │   ├── like-button.tsx
    │   └── review-card.tsx
    ├── queries
    │   ├── use-comments-query.ts
    │   └── use-like-mutation.ts
    └── types.ts

```

# Content:

## auth/components/login-form.tsx

```tsx
export function LoginForm() {
  return <div>LoginForm Placeholder</div>;
}

```


## auth/components/register-form.tsx

```tsx
export function RegisterForm() {
  return <div>RegisterForm Placeholder</div>;
}

```


## auth/hooks/use-auth.ts

```ts
export const useAuth = () => ({});

```


## auth/queries/use-auth-mutations.ts

```ts
export const useAuthMutations = () => ({});

```


## auth/types.ts

```ts
export type AuthUser = any;

```


## cv-builder/components/form-wizard/index.tsx

```tsx
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const FormWizard: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={`w-full max-w-3xl mx-auto py-12 px-6 space-y-6 ${props.className || ""}`}
    >
      {/* Dynamic Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-2xl font-bold text-foreground">Editor</h2>
          <span className="text-sm font-semibold text-primary">
            65% Complete
          </span>
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: "65%" }}
          />
        </div>
      </div>

      {/* Render Current Section Step Form Component */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default FormWizard;

```


## cv-builder/components/resume-sections/education.tsx

```tsx
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
    defaultValues: { institution: edu.institution, degree: edu.degree },
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

```


## cv-builder/components/resume-sections/experience.tsx

```tsx
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

```


## cv-builder/components/resume-sections/index.tsx

```tsx
"use client";

import PersonalInfoSection from "./personal-info";
import EducationSection from "./education";
import SkillsSection from "./skills";
import ExperienceSection from "./experience";

export default function ResumeSections() {
  return (
    <div className="space-y-6 p-6">
      <PersonalInfoSection />

      <EducationSection />
      <SkillsSection />

      <ExperienceSection />
    </div>
  );
}

```


## cv-builder/components/resume-sections/personal-info.tsx

```tsx
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

        <FieldWrapper
          label="Location"
          error={errors.location?.message}
          className="sm:col-span-2"
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
      </CollapsibleContent>
    </Collapsible>
  );
}

```


## cv-builder/components/resume-sections/skills.tsx

```tsx
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

```


## cv-builder/components/section-sorter.tsx

```tsx
import { Briefcase, PlusCircle, GripVertical } from "lucide-react";

export default function SectionSorter() {
  return (
    <div className="bg-card p-6 border border-border rounded-xl space-y-6 shadow-sm">
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-card-foreground">Work Experience</h3>
        </div>
        <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
          <PlusCircle className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {/* Dynamic Draggable Item Unit */}
        <div className="p-4 border border-border rounded-lg bg-muted/50 group relative">
          {/* Context Sorting Drag Engine Handle Pin */}
          <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab p-1 bg-card border border-border rounded shadow-sm text-muted-foreground hover:text-foreground">
            <GripVertical className="w-4 h-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Company
              </label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="TechNova Systems"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Role</label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="Lead UX Designer"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Start Date
              </label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="Jan 2021"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                End Date
              </label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="Present"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Key Responsibilities
              </label>
              <textarea
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none resize-none leading-relaxed transition-all"
                rows={4}
                defaultValue={`• Spearheaded the redesign of the core SaaS platform, resulting in a 40% increase in user engagement.\n• Collaborated with cross-functional teams to define product vision and roadmap.\n• Managed a team of 4 junior designers and mentored them on design systems.`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```


## cv-builder/hooks/use-autosave.ts

```ts
export const useAutosave = () => ({});

```


## cv-builder/hooks/use-cv-history.ts

```ts
export const useCvHistory = () => ({});

```


## cv-builder/schemas/cv.ts

```ts
import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  title:    z.string().min(2, "Professional title is required"),
  email:    z.string().email("Invalid email address"),
  phone:    z.string().optional(),
  location: z.string().optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(2, "Institution is required"),
  degree:      z.string().min(2, "Degree is required"),
});

export const experienceSchema = z.object({
  company:          z.string().min(2, "Company is required"),
  role:             z.string().min(2, "Role is required"),
  startDate:        z.string().min(1, "Start date is required"),
  endDate:          z.string().optional(),
  responsibilities: z.string().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Cannot be empty").max(50, "Too long"),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type EducationFormData    = z.infer<typeof educationSchema>;
export type ExperienceFormData   = z.infer<typeof experienceSchema>;
export type SkillFormData        = z.infer<typeof skillSchema>;
```


## cv-builder/store/cv-builder-store.ts

```ts
import { create } from "zustand";
import { CvData, Education, WorkExperience } from "@/features/cv-builder/types"; // single source of truth

// ---------------------------------------------------------------------------
// UI-only volatile state
// ---------------------------------------------------------------------------
interface UiState {
  currentStep: number;
  isDragging: boolean;
}

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------
interface CvStore {
  cvData: CvData;
  ui: UiState;

  // Personal info
  updatePersonalInfo: (info: Partial<CvData["personalInfo"]>) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;

  // Wizard
  updateStep: (step: number) => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
export const useCvStore = create<CvStore>((set) => ({
  cvData: {
    personalInfo: {
      fullName: "Alex Mercer",
      title: "Lead UX Designer",
      email: "alex.mercer@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    },
    education: [{ id: "1", institution: "Design Institute", degree: "BFA" }],
    skills: ["Figma", "React", "Tailwind"],
    experience: [],
  },
  ui: {
    currentStep: 0,
    isDragging: false,
  },

  // ---------------------------------------------------------------------------
  // Personal info
  // ---------------------------------------------------------------------------
  updatePersonalInfo: (info) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        personalInfo: { ...state.cvData.personalInfo, ...info },
      },
    })),

  // ---------------------------------------------------------------------------
  // Education
  // ---------------------------------------------------------------------------
  addEducation: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: [
          ...state.cvData.education,
          { id: crypto.randomUUID(), institution: "", degree: "" },
        ],
      },
    })),

  updateEducation: (id, data) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.map((edu) =>
          edu.id === id ? { ...edu, ...data } : edu,
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        education: state.cvData.education.filter((edu) => edu.id !== id),
      },
    })),

  // ---------------------------------------------------------------------------
  // Skills
  // ---------------------------------------------------------------------------
  addSkill: (skill) =>
    set((state) => ({
      cvData: { ...state.cvData, skills: [...state.cvData.skills, skill] },
    })),

  removeSkill: (skillName) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        skills: state.cvData.skills.filter((s) => s !== skillName),
      },
    })),

  // ---------------------------------------------------------------------------
  // Experience
  // ---------------------------------------------------------------------------
  addExperience: () =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: [
          ...state.cvData.experience,
          {
            id: crypto.randomUUID(),
            company: "",
            role: "",
            startDate: "",
            endDate: "",
            responsibilities: "",
          },
        ],
      },
    })),

  updateExperience: (id, data) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: state.cvData.experience.map((exp) =>
          exp.id === id ? { ...exp, ...data } : exp,
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      cvData: {
        ...state.cvData,
        experience: state.cvData.experience.filter((exp) => exp.id !== id),
      },
    })),

  // ---------------------------------------------------------------------------
  // Wizard
  // ---------------------------------------------------------------------------
  updateStep: (step) =>
    set((state) => ({ ui: { ...state.ui, currentStep: step } })),
}));

```


## cv-builder/store/ui.ts

```ts
import { create } from "zustand";

interface UiStore {
  collapsedSections: Record<string, boolean>;
  toggleSection: (sectionId: string) => void;
  setSectionCollapsed: (sectionId: string, isCollapsed: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  collapsedSections: {},
  toggleSection: (sectionId) =>
    set((state) => ({
      collapsedSections: {
        ...state.collapsedSections,
        [sectionId]: !state.collapsedSections[sectionId],
      },
    })),
  setSectionCollapsed: (sectionId, isCollapsed) =>
    set((state) => ({
      collapsedSections: {
        ...state.collapsedSections,
        [sectionId]: isCollapsed,
      },
    })),
}));

```


## cv-builder/types.ts

```ts
export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface CvData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: string[];
  experience: WorkExperience[];
}

```


## cv-builder/utils/json-exporter.ts

```ts
export const exportToJson = () => {};

```


## cv-builder/utils/pdf-generator.ts

```ts
export const generatePdf = async () => {};

```


## cv-viewer/components/cv-render-engine.tsx

```tsx
"use client"; // 🚨 Required to consume the client-side Zustand store hook

import React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import ModernTemplate from "../templates/modern";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const CvRenderEngine: React.FC<Props> = ({ className, ...props }) => {
  // 1. Snag the live CV content state directly from your store slice
  const cvData = useCvStore((state) => state.cvData);

  return (
    <section
      className={`w-[480px] bg-muted/30 border-l border-border sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-6 scrollbar-thin flex flex-col ${className || ""}`}
      {...props}
    >
      <div className="w-full flex justify-between items-center mb-6 flex-shrink-0">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Live Preview
        </span>
        <div className="flex gap-1.5">
          <button className="p-1.5 bg-card border border-border rounded text-muted-foreground hover:bg-accent transition-colors shadow-sm">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-1.5 bg-card border border-border rounded text-muted-foreground hover:bg-accent transition-colors shadow-sm">
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Render Selected A4 CSS Template Shell Content */}
      <div className="w-full flex justify-center items-start flex-1">
        {/* 2. Drop the template layout directly into the display slot with live store data */}
        <ModernTemplate data={cvData} />
      </div>
    </section>
  );
};

export default CvRenderEngine;

```


## cv-viewer/components/profile-header.tsx

```tsx
export function ProfileHeader() {
  return <div>ProfileHeader Placeholder</div>;
}

```


## cv-viewer/templates/creative.tsx

```tsx
export function CreativeTemplate() {
  return <div>Creative Template</div>;
}

```


## cv-viewer/templates/minimalist.tsx

```tsx
export function MinimalistTemplate() {
  return <div>Minimalist Template</div>;
}

```


## cv-viewer/templates/modern.tsx

```tsx
import { Mail, Phone, MapPin } from "lucide-react";
import { CvData } from "@/features/cv-builder/types";
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  data: CvData;
}

const ModernTemplate: React.FC<Props> = ({ data, className, ...props }) => {
  const { personalInfo, skills, experience, education } = data;

  return (
    <div
      className={`w-full bg-white shadow-xl border border-slate-200 p-10 flex flex-col text-slate-800 aspect-[1/1.414] text-left ${className || ""}`}
      {...props}
    >
      {/* Profile Document Top Header area */}
      <div className="border-b-2 border-indigo-600 pb-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo?.fullName || "Your Name"}
        </h1>
        <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mt-1">
          {personalInfo?.title || "Professional Title"}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-500 font-medium">
          {personalInfo?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" /> {personalInfo.email}
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" /> {personalInfo.phone}
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />{" "}
              {personalInfo.location}
            </div>
          )}
        </div>
      </div>

      {/* Two-Column Core Layout Body */}
      <div className="grid grid-cols-3 gap-6 flex-1 items-start">
        {/* LEFT COLUMN: Experience & Education (Takes up 2/3 width) */}
        <div className="col-span-2 space-y-6">
          {/* Experience Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              Professional Experience
              <div className="flex-1 h-[1px] bg-slate-200" />
            </h2>

            <div className="space-y-4">
              {experience && experience.length > 0 ? (
                experience.map((exp) => {
                  // Split textarea string lines into separate bullet points safely
                  const bulletPoints = exp.responsibilities
                    ? exp.responsibilities
                        .split("\n")
                        .filter((p) => p.trim() !== "")
                    : [];

                  return (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-xs text-slate-900">
                            {exp.company}
                          </h3>
                          <p className="text-[11px] text-slate-500 italic">
                            {exp.role}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                          {exp.startDate} — {exp.endDate || "Present"}
                        </span>
                      </div>

                      {bulletPoints.length > 0 && (
                        <ul className="text-[11px] space-y-1 text-slate-600 list-disc pl-4 leading-relaxed">
                          {bulletPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-[11px] text-slate-400 italic">
                  No experience added yet.
                </p>
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              Education
              <div className="flex-1 h-[1px] bg-slate-200" />
            </h2>

            <div className="space-y-3">
              {education && education.length > 0 ? (
                education.map((edu) => (
                  <div
                    key={edu.id}
                    className="flex justify-between items-start"
                  >
                    <div>
                      <h3 className="font-bold text-xs text-slate-900">
                        {edu.institution}
                      </h3>
                      <p className="text-[11px] text-slate-500">{edu.degree}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[11px] text-slate-400 italic">
                  No education history added yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Skills Sidebar (Takes up 1/3 width) */}
        <div className="col-span-1 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2">
              Skills
              <div className="flex-1 h-[1px] bg-slate-200" />
            </h2>

            {skills && skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                No skills added yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Branding Token Tag */}
      <div className="mt-auto pt-4 border-t border-slate-100 text-right">
        <span className="text-[8px] uppercase tracking-widest text-slate-400 font-medium">
          Generated by cv-Builder
        </span>
      </div>
    </div>
  );
};

export default ModernTemplate;

```


## cv-viewer/types.ts

```ts
export type ViewerConfig = any;

```


## social/actions.ts

```ts
export const socialAction = async () => {};

```


## social/components/comment-section.tsx

```tsx
export function CommentSection() {
  return <div>CommentSection Placeholder</div>;
}

```


## social/components/like-button.tsx

```tsx
export function LikeButton() {
  return <div>LikeButton Placeholder</div>;
}

```


## social/components/review-card.tsx

```tsx
export function ReviewCard() {
  return <div>ReviewCard Placeholder</div>;
}

```


## social/queries/use-comments-query.ts

```ts
export const useCommentsQuery = () => ({});

```


## social/queries/use-like-mutation.ts

```ts
export const useLikeMutation = () => ({});

```


## social/types.ts

```ts
export type SocialInteraction = any;

```

