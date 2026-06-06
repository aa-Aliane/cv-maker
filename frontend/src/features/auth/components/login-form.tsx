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
