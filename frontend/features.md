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
│   │   └── aurora
│   │       ├── index.tsx
│   │       ├── layout.module.css
│   │       ├── main.module.css
│   │       ├── sidebar.module.css
│   │       └── tokens.css
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
  photo:    z.string().optional(),
  linkedin: z.string().optional(),
  summary:  z.string().optional(),
});

export const educationSchema = z.object({
  institution: z.string().min(2, "Institution is required"),
  degree:      z.string().min(2, "Degree is required"),
  note:        z.string().optional(),
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
  level: z.number().min(0).max(100).optional(),
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
      photo: "",
      linkedin: "linkedin.com/in/alexmercer",
      summary: "Passionate UX Designer with 5+ years of experience...",
      languages: [{ name: "English", level: "Native" }, { name: "French", level: "Intermediate" }],
      interests: ["Photography", "Hiking", "Open Source"],
    },
    education: [{ id: "1", institution: "Design Institute", degree: "BFA", note: "GPA: 3.9/4.0" }],
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
export interface Language {
  name: string;
  level: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  photo?: string;
  linkedin?: string;
  summary?: string;
  languages?: Language[];
  interests?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  note?: string;
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
  skills: (string | Skill)[];
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
"use client";

import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import AuroraTemplate from "../templates/aurora";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const CvRenderEngine: React.FC<Props> = ({ className, ...props }) => {
  const cvData = useCvStore((state) => state.cvData);
  const [scale, setScale] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-calculate scale to fit the width on mount/resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 48; // padding
        const targetWidth = 794; // A4 at 96dpi
        setScale(containerWidth / targetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className={`w-[480px] bg-muted/30 border-l border-border sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-6 scrollbar-thin flex flex-col ${className || ""}`}
      {...props}
    >
      <div className="w-full flex justify-between items-center mb-6 flex-shrink-0">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Live Preview
        </span>
        <div className="flex gap-1.5">
          <button 
            onClick={() => setScale(s => Math.max(0.1, s - 0.1))}
            className="p-1.5 bg-card border border-border rounded text-muted-foreground hover:bg-accent transition-colors shadow-sm"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setScale(s => Math.min(2, s + 0.1))}
            className="p-1.5 bg-card border border-border rounded text-muted-foreground hover:bg-accent transition-colors shadow-sm"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center items-start flex-1 overflow-visible">
        <div 
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "794px", // Fixed A4 width
            flexShrink: 0
          }}
          className="transition-transform duration-200"
        >
          <AuroraTemplate data={cvData} />
        </div>
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


## cv-viewer/templates/aurora/index.tsx

```tsx
"use client";

import React from "react";
import { CvData } from "@/features/cv-builder/types";

// ── CSS: tokens first, then layout, then section modules ────────────────
import "./tokens.css";
import layout from "./layout.module.css";
import sidebar from "./sidebar.module.css";
import main from "./main.module.css";

interface Props {
  data: CvData;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Split a newline-delimited textarea value into non-empty bullet strings. */
function toBullets(text?: string): string[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Sub-components (flat, no extra files needed at this stage)
// ---------------------------------------------------------------------------

function SidebarSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className={sidebar.section}>
      <h3 className={sidebar.sectionHeading}>{heading}</h3>
      {children}
    </div>
  );
}

function MainSection({
  heading,
  icon,
  children,
}: {
  heading: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className={main.section}>
      <h3 className={main.sectionHeading}>
        <span className={`material-symbols-outlined ${main.sectionIcon}`}>
          {icon}
        </span>
        {heading}
      </h3>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Aurora Template
// ---------------------------------------------------------------------------

const AuroraTemplate: React.FC<Props> = ({ data }) => {
  const { personalInfo, skills, experience, education } = data;

  return (
    <div className={`aurora-root ${layout.canvas}`}>
      {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
      <aside className={layout.sidebar}>
        {/* Profile photo */}
        <div className={sidebar.photoWrap}>
          {personalInfo.photo ? (
            <img
              src={personalInfo.photo}
              alt={`${personalInfo.fullName} profile`}
              className={sidebar.photo}
            />
          ) : (
            <div className={sidebar.photoPlaceholder}>Photo</div>
          )}
        </div>

        {/* Contact */}
        <SidebarSection heading="Contact">
          <ul className={sidebar.contactList}>
            {personalInfo.phone && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  call
                </span>
                {personalInfo.phone}
              </li>
            )}
            {personalInfo.email && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  mail
                </span>
                {personalInfo.email}
              </li>
            )}
            {personalInfo.location && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  location_on
                </span>
                {personalInfo.location}
              </li>
            )}
            {personalInfo.linkedin && (
              <li className={sidebar.contactItem}>
                <span
                  className={`material-symbols-outlined ${sidebar.contactIcon}`}
                >
                  link
                </span>
                {personalInfo.linkedin}
              </li>
            )}
          </ul>
        </SidebarSection>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <SidebarSection heading="Skills">
            <div className={sidebar.skillList}>
              {skills.map((skill) =>
                typeof skill === "string" ? (
                  /* Plain string skill — render as tag */
                  <div key={skill} className={sidebar.skillItem}>
                    <div className={sidebar.skillMeta}>
                      <span>{skill}</span>
                    </div>
                  </div>
                ) : (
                  /* Skill object with level — render with progress bar */
                  <div key={(skill as any).name} className={sidebar.skillItem}>
                    <div className={sidebar.skillMeta}>
                      <span>{(skill as any).name}</span>
                      <span className={sidebar.skillPercent}>
                        {(skill as any).level}%
                      </span>
                    </div>
                    <div className={sidebar.skillTrack}>
                      <div
                        className={sidebar.skillFill}
                        style={{ width: `${(skill as any).level}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          </SidebarSection>
        )}

        {/* Languages */}
        {personalInfo.languages && personalInfo.languages.length > 0 && (
          <SidebarSection heading="Languages">
            <ul className={sidebar.langList}>
              {personalInfo.languages.map((lang: any) => (
                <li key={lang.name ?? lang} className={sidebar.langItem}>
                  <span className={sidebar.langName}>{lang.name ?? lang}</span>
                  {lang.level && (
                    <span className={sidebar.langLevel}>{lang.level}</span>
                  )}
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}

        {/* Interests */}
        {personalInfo.interests && personalInfo.interests.length > 0 && (
          <SidebarSection heading="Interests">
            <div className={sidebar.tagCloud}>
              {personalInfo.interests.map((interest: string) => (
                <span key={interest} className={sidebar.tag}>
                  {interest}
                </span>
              ))}
            </div>
          </SidebarSection>
        )}
      </aside>

      {/* ── RIGHT MAIN COLUMN ─────────────────────────────────────────── */}
      <div className={layout.main}>
        {/* Header */}
        <header className={main.header}>
          <h1 className={main.name}>{personalInfo.fullName || "Your Name"}</h1>
          <h2 className={main.title}>
            {personalInfo.title || "Professional Title"}
          </h2>
          {personalInfo.summary && (
            <p className={main.summary}>{personalInfo.summary}</p>
          )}
        </header>

        {/* Experience */}
        <MainSection heading="Professional Experience" icon="work">
          {experience && experience.length > 0 ? (
            <div className={main.timeline}>
              {experience.map((exp, i) => {
                const bullets = toBullets(exp.responsibilities);
                return (
                  <div
                    key={exp.id}
                    className={`${main.entry} ${i > 0 ? main.entrySecondary : ""}`}
                  >
                    <h4 className={main.entryTitle}>{exp.role}</h4>
                    <div className={main.entryMeta}>
                      <span className={main.entryOrg}>{exp.company}</span>
                      {exp.startDate && (
                        <>
                          <span className={main.entrySep}>•</span>
                          <span className={main.entryDates}>
                            {exp.startDate} — {exp.endDate || "Present"}
                          </span>
                        </>
                      )}
                    </div>
                    {bullets.length > 0 && (
                      <ul className={main.bulletList}>
                        {bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={main.empty}>No experience added yet.</p>
          )}
        </MainSection>

        {/* Education */}
        <MainSection heading="Education" icon="school">
          {education && education.length > 0 ? (
            <div className={main.timeline}>
              {education.map((edu) => (
                <div key={edu.id} className={main.eduEntry}>
                  <h4 className={main.entryTitle}>{edu.degree}</h4>
                  <div className={main.entryMeta}>
                    <span className={main.entryOrg}>{edu.institution}</span>
                  </div>
                  {(edu as any).note && (
                    <p className={main.eduNote}>{(edu as any).note}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={main.empty}>No education added yet.</p>
          )}
        </MainSection>
      </div>
    </div>
  );
};

export default AuroraTemplate;

```


## cv-viewer/templates/aurora/layout.module.css

```css
/**
 * Aurora — layout.module.css
 *
 * Owns the A4 canvas, the two-column split, and the scrollable wrapper.
 * No colour, typography, or section-level rules live here — only structure.
 */

/* ── Outer wrapper (the white A4 sheet) ───────────────────────────────── */
.canvas {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  /* A4: 210 × 297 mm */
  aspect-ratio: 210 / 297;
  max-width: 794px;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  font-family: var(--font-body);
  color: var(--color-on-surface);
  /* Prevent any child from leaking out */
  isolation: isolate;
}

/* ── Left sidebar (~34 % width) ───────────────────────────────────────── */
.sidebar {
  width: 34%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface-tinted);
  border-right: 1px solid var(--color-border-light);
  padding: var(--space-10) var(--space-6);
  overflow: hidden;
  gap: var(--space-8);
}

/* ── Right main column (~66 % width) ──────────────────────────────────── */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--space-10) var(--space-8);
  overflow: hidden;
  gap: var(--space-8);
}

```


## cv-viewer/templates/aurora/main.module.css

```css
/**
 * Aurora — main.module.css
 *
 * Styles every section that lives in the right column:
 *   • header block (name, title, summary)
 *   • shared section heading + timeline chrome
 *   • experience entries
 *   • education entries
 */

/* ── Header block ─────────────────────────────────────────────────────── */
.header {
  border-bottom: 2px solid var(--color-surface-high);
  padding-bottom: var(--space-5);
}

.name {
  font-size: var(--text-display);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-on-surface);
  line-height: var(--leading-tight);
  margin: 0 0 var(--space-1);
}

.title {
  font-size: var(--text-headline);
  font-weight: var(--weight-medium);
  color: var(--color-primary);
  line-height: var(--leading-tight);
  margin: 0 0 var(--space-3);
}

.summary {
  font-size: var(--text-body);
  color: var(--color-on-surface-muted);
  line-height: var(--leading-relaxed);
  max-width: 90%;
  margin: 0;
}

/* ── Shared section block ─────────────────────────────────────────────── */
.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ── Section heading ─────────────────────────────────────────────────── */
.sectionHeading {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-primary);
  padding-bottom: var(--space-1);
  border-bottom: 1px solid var(--color-primary);
  margin: 0;
}

.sectionIcon {
  font-size: 16px;
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 20;
}

/* ── Timeline list ────────────────────────────────────────────────────── */
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

/* ── Single timeline entry ────────────────────────────────────────────── */
.entry {
  position: relative;
  padding-left: var(--space-5);
  border-left: 2px solid var(--color-surface-high);
}

/* dot on the timeline rail */
.entry::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-surface);
}

/* secondary (older) entries get a grey dot */
.entrySecondary::before {
  background-color: var(--color-surface-high);
}

/* ── Entry header (role / company / dates) ────────────────────────────── */
.entryTitle {
  font-size: var(--text-body-lg);
  font-weight: var(--weight-semibold);
  color: var(--color-on-surface);
  margin: 0 0 var(--space-1);
  line-height: var(--leading-tight);
}

.entryMeta {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-body);
  color: var(--color-on-surface-muted);
  margin-bottom: var(--space-2);
  flex-wrap: wrap;
}

.entryOrg {
  font-weight: var(--weight-medium);
}

.entrySep {
  color: var(--color-on-surface-faint);
}

.entryDates {
  color: var(--color-on-surface-faint);
}

/* ── Bullet list inside an entry ─────────────────────────────────────── */
.bulletList {
  list-style: disc;
  padding-left: var(--space-4);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.bulletList li {
  font-size: var(--text-body);
  color: var(--color-on-surface-muted);
  line-height: var(--leading-relaxed);
}

/* ── Education entry (no bullets) ─────────────────────────────────────── */
.eduEntry {
  position: relative;
  padding-left: var(--space-5);
  border-left: 2px solid var(--color-surface-high);
}

.eduEntry::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background-color: var(--color-surface-high);
  box-shadow: 0 0 0 3px var(--color-surface);
}

.eduNote {
  font-size: var(--text-body);
  color: var(--color-on-surface-muted);
  margin: var(--space-1) 0 0;
  line-height: var(--leading-normal);
}

/* ── Empty-state placeholder ──────────────────────────────────────────── */
.empty {
  font-size: var(--text-body);
  color: var(--color-on-surface-faint);
  font-style: italic;
}

```


## cv-viewer/templates/aurora/sidebar.module.css

```css
/**
 * Aurora — sidebar.module.css
 *
 * Styles every section that lives in the left column:
 *   • profile photo
 *   • section headings (shared style via .sectionHeading)
 *   • contact list
 *   • skills with progress bars
 *   • languages
 *   • interests / hobbies
 */

/* ── Profile photo ────────────────────────────────────────────────────── */
.photoWrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.photo {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 2px solid var(--color-primary);
  background-color: var(--color-surface-high);
  display: block;
}

.photoPlaceholder {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-full);
  background-color: var(--color-surface-high);
  border: 2px dashed var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-micro);
  color: var(--color-on-surface-faint);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

/* ── Shared section block ─────────────────────────────────────────────── */
.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* ── Section heading ─────────────────────────────────────────────────── */
.sectionHeading {
  font-size: var(--text-label);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-primary);
  padding-bottom: var(--space-1);
  border-bottom: 1px solid var(--color-primary);
  margin: 0;
}

/* ── Contact list ─────────────────────────────────────────────────────── */
.contactList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contactItem {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-body);
  color: var(--color-on-surface-muted);
  line-height: var(--leading-normal);
}

.contactIcon {
  font-size: 14px;
  flex-shrink: 0;
  color: var(--color-on-surface-faint);
  /* Material Symbols sizing */
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 20;
}

/* ── Skills ────────────────────────────────────────────────────────────── */
.skillList {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skillItem {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.skillMeta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: var(--text-micro);
  font-weight: var(--weight-medium);
  color: var(--color-on-surface);
  line-height: 1;
}

.skillPercent {
  color: var(--color-on-surface-faint);
  font-weight: var(--weight-regular);
}

.skillTrack {
  width: 100%;
  height: 3px;
  background-color: var(--color-surface-high);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skillFill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  /* Width is set inline via style prop */
}

/* ── Languages ────────────────────────────────────────────────────────── */
.langList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.langItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-body);
  line-height: var(--leading-normal);
}

.langName {
  font-weight: var(--weight-medium);
  color: var(--color-on-surface);
}

.langLevel {
  font-size: var(--text-micro);
  color: var(--color-on-surface-faint);
}

/* ── Interests / Hobbies ──────────────────────────────────────────────── */
.tagCloud {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.tag {
  padding: 2px var(--space-2);
  background-color: var(--color-surface-low);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  font-size: var(--text-micro);
  font-weight: var(--weight-medium);
  color: var(--color-on-surface-muted);
  line-height: 1.6;
  white-space: nowrap;
}

```


## cv-viewer/templates/aurora/tokens.css

```css
/**
 * Aurora — Design tokens
 *
 * All colours, spacing, typography, and radii for this theme live here.
 * Override this file (or swap it for another theme's tokens.css) to change
 * the entire look of the CV without touching a single component.
 */

.aurora-root {
  /* ── Palette ────────────────────────────────────────────── */
  --color-primary: #3525cd;
  --color-primary-hover: #2a1db8;
  --color-primary-subtle: #e2dfff;

  --color-surface: #ffffff;
  --color-surface-tinted: #f7f9fb; /* sidebar background */
  --color-surface-low: #f2f4f6;
  --color-surface-high: #e6e8ea;

  --color-on-surface: #191c1e;
  --color-on-surface-muted: #464555;
  --color-on-surface-faint: #777587;

  --color-border: #c7c4d8;
  --color-border-light: #e0e3e5;

  /* ── Typography ─────────────────────────────────────────── */
  --font-body: "Inter", system-ui, sans-serif;

  --text-display: clamp(28px, 4vw, 40px);
  --text-headline: 18px;
  --text-body-lg: 14px;
  --text-body: 12px;
  --text-label: 11px;
  --text-micro: 10px;

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;

  --tracking-wide: 0.06em;
  --tracking-tight: -0.01em;

  /* ── Spacing ─────────────────────────────────────────────── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;

  /* ── Radii ───────────────────────────────────────────────── */
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-full: 999px;

  /* ── Shadows ─────────────────────────────────────────────── */
  --shadow-card:
    0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06);
  --shadow-ring: 0 0 0 3px rgb(53 37 205 / 0.15);
}

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

