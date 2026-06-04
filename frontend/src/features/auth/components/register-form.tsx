"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

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

  const onSubmit = async (data: RegisterFormValues) => {
    console.log("Registration attempt:", data);
    // Implementation for registration logic would go here
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
