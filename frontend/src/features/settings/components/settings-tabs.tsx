"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/settings", label: "Profile" },
  { href: "/settings/security", label: "Security" },
  { href: "/settings/preferences", label: "Preferences" },
];

export function SettingsTabs() {
  const pathname = usePathname();

  return (
    <div className="flex h-full items-center gap-lg ml-lg">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "h-full flex items-center border-b-2 text-sm font-medium transition-colors pt-[2px]",
              isActive
                ? "border-primary text-primary" // Active state
                : "border-transparent text-muted-foreground hover:text-foreground", // Inactive state
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
