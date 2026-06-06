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