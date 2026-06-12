"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Briefcase, History, GraduationCap } from "lucide-react";
import { ProfileSaveBar } from "@/features/settings/components/profile-save-bar";

const PROFILE_NAV = [
  {
    label: "Personal",
    href: "/settings/profile/personal",
    icon: User,
    description: "Identity & social links",
  },
  {
    label: "Professional",
    href: "/settings/profile/professional",
    icon: Briefcase,
    description: "Role, skills & details",
  },
  {
    label: "Experience",
    href: "/settings/profile/experience",
    icon: History,
    description: "Work history",
  },
  {
    label: "Education",
    href: "/settings/profile/education",
    icon: GraduationCap,
    description: "Academic background",
  },
] as const;

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-1 w-full">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-52 shrink-0 border-r border-border bg-background px-sm py-lg gap-xs sticky top-[109px] h-[calc(100vh-109px)]">
        {PROFILE_NAV.map(({ label, href, icon: Icon, description }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-start gap-sm rounded-md px-sm py-sm text-sm transition-colors",
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              />
              <span className="flex flex-col">
                {label}
                <span className="text-xs font-normal text-muted-foreground/70 hidden lg:block">
                  {description}
                </span>
              </span>
            </Link>
          );
        })}
      </aside>

      {/* Mobile pill nav */}
      <div className="md:hidden fixed top-[109px] left-0 right-0 z-20 bg-background border-b border-border flex gap-xs px-md py-xs overflow-x-auto">
        {PROFILE_NAV.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-xs rounded-full px-md py-xs text-sm whitespace-nowrap transition-colors shrink-0",
              pathname === href
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:bg-accent",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        ))}
      </div>

      {/* Content */}
      <main className="flex-1 min-w-0">
        <div className="p-lg  w-full mx-auto animate-in fade-in duration-300 pb-[100px]">
          {children}
        </div>
      </main>

      {/* All the logic lives in features */}
      <ProfileSaveBar />
    </div>
  );
}
