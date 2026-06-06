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
│   │   ├── header.tsx
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
├── dashboard
│   └── components
│       ├── global-nav-links.tsx
│       ├── shell.tsx
│       ├── sidebar-footer.tsx
│       ├── sidebar-header.tsx
│       ├── sidebar.tsx
│       ├── top-bar.tsx
│       └── ui
│           └── profile.tsx
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
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "../queries/use-auth-mutations";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const loginMutation = useLoginMutation();

  const isRegistered = searchParams.get("registered") === "true";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setError(null);
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/builder");
      },
      onError: (err: any) => {
        setError(
          err.response?.data?.detail || "Invalid email or password. Please try again."
        );
      },
    });
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-md">
      <main className="w-full max-w-[420px] mx-auto relative z-10">
        <div className="glass-panel border border-outline-variant rounded-xl p-lg md:p-[32px] w-full">
          {/* Header */}
          <div className="text-center mb-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant mb-md">
              <span className="material-symbols-outlined text-primary text-[28px]">
                architecture
              </span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">
              CV Architect
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Sign in to organize your career data.
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-md p-sm bg-destructive/10 border border-destructive/20 rounded-DEFAULT text-destructive text-xs">
              {error}
            </div>
          )}
          {isRegistered && !error && (
            <div className="mb-md p-sm bg-primary/10 border border-primary/20 rounded-DEFAULT text-primary text-xs font-medium">
              Account created successfully! Please sign in.
            </div>
          )}

          {/* Form Elements */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-md"
          >
            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label
                className="font-label-md text-label-md text-on-surface"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                {...register("email")}
                className={cn(
                  "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-[12px] py-[10px] font-body-md text-body-md outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  errors.email &&
                    "border-destructive focus:border-destructive focus:ring-destructive/20"
                )}
                id="email"
                type="email"
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <div className="flex items-center justify-between">
                <label
                  className="font-label-md text-label-md text-on-surface"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  className="font-label-sm text-label-sm text-primary hover:underline transition-all"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  className={cn(
                    "w-full bg-surface-container-lowest border border-outline-variant rounded-DEFAULT px-[12px] py-[10px] pr-10 font-body-md text-body-md outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary",
                    errors.password &&
                      "border-destructive focus:border-destructive focus:ring-destructive/20"
                  )}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors p-1"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-0.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              className="w-full mt-sm bg-primary text-on-primary font-label-md text-label-md py-[12px] rounded-DEFAULT hover:bg-[#2d1ea6] active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Dividers and Third-Party Oauth Hooks */}
          <div className="flex items-center gap-sm my-lg">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="font-body-sm text-body-sm text-on-surface-variant px-sm">
              Or continue with
            </span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>

          <div className="flex flex-col gap-sm">
            <button
              className="w-full flex items-center justify-center gap-sm border border-outline-variant rounded-DEFAULT py-[10px] bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined">account_circle</span>{" "}
              Google
            </button>
            <button
              className="w-full flex items-center justify-center gap-sm border border-outline-variant rounded-DEFAULT py-[10px] bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-low transition-colors active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined">work</span> LinkedIn
            </button>
          </div>

          {/* Secondary Action */}
          <div className="mt-lg pt-md border-t border-outline-variant text-center">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Don't have an account?{" "}
              <Link
                className="font-label-md text-label-md text-primary ml-xs hover:underline transition-all"
                href="/register"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

```


## auth/components/register-form.tsx

```tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "../queries/use-auth-mutations";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      terms: false as any,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    setError(null);
    registerMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          // Registration successful, redirect to login
          router.push("/login?registered=true");
        },
        onError: (err: any) => {
          setError(
            err.response?.data?.detail || "Registration failed. Please try again."
          );
        },
      }
    );
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md md:p-lg antialiased selection:bg-primary selection:text-on-primary">
      <main className="w-full max-w-[440px]">
        {/* Branding & Header */}
        <div className="text-center mb-lg">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-fixed mb-md">
            <span 
              className="material-symbols-outlined text-[24px] text-primary" 
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              architecture
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs tracking-tight">
            Create an account
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Start building your professional resume.
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg md:p-[32px]">
          {error && (
            <div className="mb-md p-sm bg-destructive/10 border border-destructive/20 rounded-DEFAULT text-destructive text-xs">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
            
            {/* Full Name */}
            <div className="flex flex-col gap-xs">
              <label 
                className="block font-label-md text-label-md text-on-surface" 
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[20px] text-text-outline">
                    person
                  </span>
                </div>
                <input 
                  {...register("fullName")}
                  className={cn(
                    "block w-full pl-[36px] pr-md py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-text-outline focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-shadow",
                    errors.fullName && "border-destructive focus:ring-destructive focus:border-destructive"
                  )}
                  id="fullName" 
                  placeholder="Jane Doe" 
                  type="text"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-destructive mt-0.5">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-xs">
              <label 
                className="block font-label-md text-label-md text-on-surface" 
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[20px] text-text-outline">
                    mail
                  </span>
                </div>
                <input 
                  {...register("email")}
                  className={cn(
                    "block w-full pl-[36px] pr-md py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-text-outline focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-shadow",
                    errors.email && "border-destructive focus:ring-destructive focus:border-destructive"
                  )}
                  id="email" 
                  placeholder="jane@example.com" 
                  type="email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive mt-0.5">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <label 
                className="block font-label-md text-label-md text-on-surface" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-[20px] text-text-outline">
                    lock
                  </span>
                </div>
                <input 
                  {...register("password")}
                  className={cn(
                    "block w-full pl-[36px] pr-md py-[10px] bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-text-outline focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-shadow",
                    errors.password && "border-destructive focus:ring-destructive focus:border-destructive"
                  )}
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive mt-0.5">{errors.password.message}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex flex-col gap-xs mt-xs">
              <div className="flex items-start gap-sm">
                <div className="flex items-center h-5">
                  <input 
                    {...register("terms")}
                    className={cn(
                      "w-4 h-4 rounded-sm border-outline-variant text-primary focus:ring-primary focus:ring-2 bg-surface-container-lowest cursor-pointer transition-colors",
                      errors.terms && "border-destructive"
                    )}
                    id="terms" 
                    type="checkbox"
                  />
                </div>
                <label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="terms">
                  I agree to the <a className="text-primary hover:underline font-label-md text-label-md inline" href="#">Terms of Service</a> and <a className="text-primary hover:underline font-label-md text-label-md inline" href="#">Privacy Policy</a>.
                </label>
              </div>
              {errors.terms && (
                <p className="text-xs text-destructive">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              disabled={isSubmitting}
              className="w-full mt-sm flex items-center justify-center gap-sm bg-primary hover:bg-[#2c1eb0] active:scale-[0.98] text-on-primary font-label-md text-label-md py-[12px] px-lg rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-70 disabled:cursor-not-allowed" 
              type="submit"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-lg my-xs">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink-0 mx-md font-body-sm text-body-sm text-text-outline">or continue with</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-sm">
            <button 
              className="w-full flex items-center justify-center gap-md bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-on-surface font-label-md text-label-md py-[10px] px-md rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-outline-variant active:scale-[0.98]" 
              type="button"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Google
            </button>
            <button 
              className="w-full flex items-center justify-center gap-md bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-on-surface font-label-md text-label-md py-[10px] px-md rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-outline-variant active:scale-[0.98]" 
              type="button"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" fill="#0A66C2"></path>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-lg text-center font-body-sm text-body-sm text-on-surface-variant">
          Already have an account? 
          <Link className="font-label-md text-label-md text-primary hover:underline ml-xs transition-all" href="/login">Sign In</Link>
        </p>
      </main>
    </div>
  );
}

```


## auth/hooks/use-auth.ts

```ts
export const useAuth = () => ({});

```


## auth/queries/use-auth-mutations.ts

```ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/client";

// 1. Login (The backend sets the cookie automatically)
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const formData = new URLSearchParams();
      formData.append("username", data.email);
      formData.append("password", data.password);

      // The response header will contain 'Set-Cookie'
      return await apiClient.post("/auth/jwt/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    },
  });
};

// 2. Fetch Current User (To check if logged in)
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/users/me");
      return data;
    },
    retry: false, // Don't retry if user is not logged in (401)
  });
};

// 3. Register (Expects JSON)
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      // FastAPI-Users expects a JSON body for registration
      const response = await apiClient.post("/auth/register", data);
      return response.data;
    },
  });
};

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


## cv-builder/components/header.tsx

```tsx
"use client";

import React from "react";
import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";

export function WorkspaceHeader() {
  // We can pull the draft status or user data from your existing store if needed later
  const cvData = useCvStore((state) => state.cvData);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-[64px] items-center justify-between border-b border-border bg-card px-6 shadow-sm">
      {/* Left Context: Branding & Status */}
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-tight text-primary">
          Resume Builder
        </h2>
        <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Draft
        </span>
      </div>

      {/* Right Context: Actions */}
      <div className="flex items-center gap-3">
        {/* Icon Tools */}
        <button
          className="flex items-center justify-center rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Version History"
        >
          <span className="material-symbols-outlined text-[20px]">history</span>
        </button>

        <button
          className="flex items-center justify-center rounded p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Preview Settings"
        >
          <span className="material-symbols-outlined text-[20px]">
            visibility
          </span>
        </button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-border"></div>

        {/* Primary Actions */}
        <button className="rounded border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Share Link
        </button>

        <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]">
          Export PDF
        </button>
      </div>
    </header>
  );
}

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


## dashboard/components/global-nav-links.tsx

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/builder", label: "Resumes", icon: "description" },
  { href: "/analytics", label: "Analytics", icon: "analytics" },
  { href: "/templates", label: "Templates", icon: "dashboard_customize" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export function GlobalNavLinks() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex-1 space-y-xs">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-md px-md py-sm transition-colors ${
            isActive(item.href)
              ? "text-primary font-bold border-r-2 border-primary"
              : "text-secondary hover:bg-surface-container-high"
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="font-body-md text-body-md">{item.label} Fdf</span>
        </Link>
      ))}
    </nav>
  );
}

```


## dashboard/components/shell.tsx

```tsx
"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export const DashboardShell: React.FC<Props> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container antialiased">
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      <TopBar
        isMobileNavOpen={isMobileNavOpen}
        onMenuClick={() => setIsMobileNavOpen(true)}
      />

      <main className="md:pl-64 pt-16 min-h-screen">{children}</main>
    </div>
  );
};

```


## dashboard/components/sidebar-footer.tsx

```tsx
// src/features/dashboard/components/sidebar-footer.tsx
import Link from "next/link";
import { UserProfile } from "./ui/profile"; // Adjust relative path if needed

export function SidebarFooter() {
  return (
    <div className="mt-auto pt-lg border-t border-outline-variant">
      <Link
        href="/help"
        className="flex items-center gap-md px-md py-sm text-secondary hover:bg-surface-container-high transition-colors rounded"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          help
        </span>
        <span className="font-body-md text-body-md">Help Center</span>
      </Link>

      {/* Dynamic Profile Session Layer */}
      <UserProfile />
    </div>
  );
}

```


## dashboard/components/sidebar-header.tsx

```tsx
import Link from "next/link";

export function SidebarHeader() {
  return (
    <div className="mb-xl">
      <Link href="/dashboard" className="block">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          CV Architect
        </span>
      </Link>
      <p className="font-label-sm text-label-sm text-secondary mt-xs">
        Professional Plan
      </p>
    </div>
  );
}

```


## dashboard/components/sidebar.tsx

```tsx
import { GlobalNavLinks } from "./global-nav-links";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        id="main-sidebar"
        aria-label="Main navigation"
        className={`
          h-screen w-64 fixed left-0 top-0
          bg-background border-r border-outline-variant
          flex flex-col py-lg px-md z-40
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <SidebarHeader />

        <button
          aria-label="Create a new resume"
          className="mb-lg w-full bg-primary-container text-on-primary text-label-md font-label-md py-md rounded transition-all hover:opacity-90 flex items-center justify-center gap-sm"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            aria-hidden="true"
          >
            add
          </span>
          New Resume
        </button>

        <GlobalNavLinks />

        <SidebarFooter />
      </aside>
    </div>
  );
};

```


## dashboard/components/top-bar.tsx

```tsx
import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"nav"> {
  onMenuClick: () => void;
  isMobileNavOpen: boolean;
}

export const TopBar: React.FC<Props> = ({ onMenuClick, isMobileNavOpen }) => {
  return (
    <nav
      aria-label="Top toolbar"
      className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-lg h-16"
    >
      <div className="flex items-center gap-md">
        {/* Hamburger — mobile only */}
        <button
          aria-label="Open navigation menu"
          aria-controls="main-sidebar"
          aria-expanded={isMobileNavOpen}
          className="p-sm text-on-surface-variant hover:text-primary transition-colors md:hidden"
          onClick={onMenuClick}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            menu
          </span>
        </button>

        <span className="font-headline-md text-headline-md font-bold text-primary">
          Resume Builder
        </span>

        <span
          aria-label="Document status: Draft"
          className="px-sm py-[2px] bg-surface-container text-secondary text-label-xs font-bold rounded uppercase tracking-wider"
        >
          Draft
        </span>
      </div>

      <div className="flex items-center gap-md">
        <button
          aria-label="View edit history"
          className="p-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            history
          </span>
        </button>

        <button
          aria-label="Preview resume"
          className="p-sm text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            visibility
          </span>
        </button>

        <div
          className="h-6 w-[1px] bg-outline-variant mx-xs"
          aria-hidden="true"
        />

        <button className="px-md py-sm text-secondary border border-outline-variant text-label-md font-label-md rounded hover:bg-surface-container transition-colors">
          Share Link
        </button>

        <button className="px-md py-sm bg-primary text-on-primary text-label-md font-label-md rounded hover:opacity-90 transition-all">
          Export PDF
        </button>
      </div>
    </nav>
  );
};

```


## dashboard/components/ui/profile.tsx

```tsx
import { useCurrentUser } from "@/features/auth/queries/use-auth-mutations";

export const UserProfile = () => {
  // Pull data, loading state, and error state directly from the server query
  const { data: user, isLoading, isError } = useCurrentUser();

  // Fallbacks for loading states or guest sessions
  const displayName = user?.fullName || user?.username || "Guest";
  const userTier = user?.plan || "Standard User";

  if (isError) {
    // Handle authentication failure gracefully (e.g., fallback UI or redirect trigger)
    return <div className="text-label-xs text-error">Session Error</div>;
  }

  return (
    <button className="flex items-center gap-3 ...">
      {/* ... Avatar Container ... */}

      <div className="flex flex-col text-left">
        {isLoading ? (
          // Skeleton loader to prevent layout shifts while fetching
          <div className="space-y-1">
            <div className="h-4 w-24 animate-pulse rounded bg-surface-variant/40" />
            <div className="h-3 w-16 animate-pulse rounded bg-surface-variant/30" />
          </div>
        ) : (
          <>
            <span className="text-label-sm font-label-md text-on-surface">
              {displayName}
            </span>
            <span className="text-label-xs text-secondary">{userTier}</span>
          </>
        )}
      </div>
    </button>
  );
};

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

