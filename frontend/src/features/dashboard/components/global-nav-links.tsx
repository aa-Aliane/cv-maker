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
